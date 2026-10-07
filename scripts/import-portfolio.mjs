#!/usr/bin/env node
/**
 * One-off importer: copies every page of the Adobe Portfolio site
 * (https://larabordalo.com) into local content collections.
 *
 *   pnpm import:portfolio            # import everything (keeps already-downloaded images)
 *   pnpm import:portfolio --force    # re-download images
 *
 * Output:
 *   src/content/projects/<slug>/index.md   frontmatter with metadata + blocks
 *   src/content/projects/<slug>/*.jpg|png  images (max 2560px, recompressed)
 *   src/content/pages/<slug>/...           same for standalone pages (about)
 *   src/assets/logo.png
 */
import { mkdir, writeFile, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'node-html-parser';
import sharp from 'sharp';

const SITE = process.env.PORTFOLIO_URL ?? 'https://larabordalo.com';
const ROOT = path.resolve(import.meta.dirname, '..');
const FORCE = process.argv.includes('--force');
const STANDALONE_PAGES = ['about'];
// Originals can be 20MB+ PNGs. Sources are capped at this size (long edge)
// and recompressed; Astro then derives the responsive AVIF/WebP variants.
const MAX_SOURCE_EDGE = 2560;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url);
    if (res.ok) return res.text();
    if (attempt >= 3) throw new Error(`${res.status} ${url}`);
    await sleep(1000 * attempt);
  }
}

async function fetchBuffer(url) {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    if (attempt >= 3) throw new Error(`${res.status} ${url}`);
    await sleep(1000 * attempt);
  }
}

/**
 * Download an image as `<dir>/<base>.jpg` (or `.webp` when it has
 * transparency), downscaled and recompressed. Returns the file name.
 */
async function saveImage(url, dir, base) {
  const existing = (await readdir(dir)).find((f) => path.parse(f).name === base);
  if (existing && !FORCE) return existing;
  if (existing) await rm(path.join(dir, existing));

  const input = sharp(await fetchBuffer(url), { limitInputPixels: false }).rotate();
  const { hasAlpha } = await input.stats().then((s) => ({ hasAlpha: !s.isOpaque }));
  const resized = input.resize({
    width: MAX_SOURCE_EDGE,
    height: MAX_SOURCE_EDGE,
    fit: 'inside',
    withoutEnlargement: true,
  });
  const file = `${base}${hasAlpha ? '.webp' : '.jpg'}`;
  const out = hasAlpha
    ? resized.webp({ quality: 92, alphaQuality: 100, effort: 6 })
    : resized.flatten({ background: '#fff' }).jpeg({ quality: 85, mozjpeg: true, chromaSubsampling: '4:4:4' });
  await out.toFile(path.join(dir, file));
  return file;
}

/** Largest candidate of a srcset attribute. */
function largestFromSrcset(srcset) {
  return srcset
    .split(',')
    .map((s) => s.trim().split(/\s+/))
    .filter(([u]) => u)
    .map(([u, w]) => ({ u, w: parseInt(w, 10) || 0 }))
    .sort((a, b) => b.w - a.w)[0]?.u;
}

const text = (el) => el?.text.replace(/\s+/g, ' ').trim() ?? '';

function decode(s) {
  return parse(`<div>${s}</div>`).text.replace(/​/g, '').trim();
}

/**
 * Adobe's rich text is a soup of nested divs with inline styles. Turn each
 * leaf line into a <p>, keeping only bold/italic/links and a "lead" class for
 * oversized text.
 */
function cleanRichText(el) {
  const paragraphs = [];
  const inline = (node) => {
    if (node.nodeType === 3) return node.rawText.replace(/​/g, '');
    const tag = node.rawTagName?.toLowerCase();
    const inner = node.childNodes.map(inline).join('');
    if (tag === 'br') return '<br>';
    if (tag === 'a') {
      const href = node.getAttribute('href');
      return `<a href="${href}" target="_blank" rel="noopener">${inner}</a>`;
    }
    const cls = node.getAttribute?.('class') ?? '';
    if (/\bbold\b/.test(cls) || tag === 'b' || tag === 'strong') return `<strong>${inner}</strong>`;
    if (/\bitalic\b/.test(cls) || tag === 'i' || tag === 'em') return `<em>${inner}</em>`;
    return inner;
  };
  const walk = (node) => {
    const blockChildren = node.childNodes.filter(
      (c) => c.nodeType === 1 && ['div', 'p'].includes(c.rawTagName.toLowerCase()),
    );
    if (blockChildren.length === 0) {
      const html = inline(node).trim();
      const size = node.innerHTML.match(/font-size:\s*(\d+)px/);
      const lead = size && parseInt(size[1], 10) >= 24;
      if (html && html !== '<br>') paragraphs.push(lead ? `<p class="lead">${html}</p>` : `<p>${html}</p>`);
      return;
    }
    // Mixed content: inline text directly inside a block wrapper.
    let buffer = '';
    for (const child of node.childNodes) {
      if (blockChildren.includes(child)) {
        if (buffer.trim()) paragraphs.push(`<p>${buffer.trim()}</p>`);
        buffer = '';
        walk(child);
      } else {
        buffer += inline(child);
      }
    }
    if (buffer.trim()) paragraphs.push(`<p>${buffer.trim()}</p>`);
  };
  walk(el);
  return paragraphs.join('\n');
}

function widthFromStyle(style = '') {
  const m = style.match(/(?:^|[;\s])width:\s*(\d+)%/);
  return m ? parseInt(m[1], 10) : undefined;
}

/** Parse a project/page body into blocks and download its images. */
async function importPage(slug, dir) {
  const html = await fetchText(`${SITE}/${slug}`);
  const doc = parse(html);
  await mkdir(dir, { recursive: true });

  const title = text(doc.querySelector('.page-header .title'));
  const description = decode(doc.querySelector('.page-header .description')?.innerHTML ?? '');
  const blocks = [];
  let n = 0;
  const nextName = () => String(++n).padStart(2, '0');

  for (const mod of doc.querySelectorAll('#project-modules > .project-module')) {
    const cls = mod.getAttribute('class');
    const width = widthFromStyle(mod.getAttribute('style'));

    if (/\bmodule image\b/.test(cls)) {
      const original = mod.querySelector('.js-lightbox')?.getAttribute('data-src');
      const fallback = mod.querySelector('img')?.getAttribute('data-src');
      const url = original ?? fallback;
      if (!url) continue;
      const base = nextName();
      let file;
      try {
        file = await saveImage(url, dir, base);
      } catch (err) {
        if (!fallback || url === fallback) throw err;
        file = await saveImage(fallback, dir, base);
      }
      blocks.push({ type: 'image', src: `./${file}`, ...(width ? { width } : {}) });
    } else if (/\bmodule text\b/.test(cls)) {
      const rich = mod.querySelector('.rich-text');
      const body = rich ? cleanRichText(rich) : '';
      if (body) blocks.push({ type: 'text', html: body });
    } else if (/\bmodule media_collection\b/.test(cls)) {
      const images = [];
      for (const item of mod.querySelectorAll('.grid__item-container')) {
        const tpl = item.querySelector('script.js-lightbox-slide-content');
        const big = tpl ? parse(tpl.innerHTML).querySelector('img') : null;
        const url =
          (big && (largestFromSrcset(big.getAttribute('srcset') ?? '') ?? big.getAttribute('src'))) ??
          item.querySelector('img')?.getAttribute('data-src');
        if (!url) continue;
        const file = await saveImage(url, dir, nextName());
        images.push(`./${file}`);
      }
      if (images.length) blocks.push({ type: 'grid', images, ...(width ? { width } : {}) });
    } else if (/\bmodule (embed|video)\b/.test(cls)) {
      const iframe = mod.querySelector('iframe');
      if (iframe) blocks.push({ type: 'embed', html: iframe.toString() });
    } else if (!/\bmodule form\b/.test(cls)) {
      console.warn(`  ! ${slug}: unsupported module "${cls}"`);
    }
  }
  return { title, description, blocks };
}

function yamlString(s) {
  return JSON.stringify(s ?? '');
}

function toFrontmatter(data) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === '') continue;
    if (key === 'blocks') {
      lines.push('blocks:');
      for (const b of value) {
        lines.push(`  - type: ${b.type}`);
        if (b.width) lines.push(`    width: ${b.width}`);
        if (b.src) lines.push(`    src: ${b.src}`);
        if (b.images) {
          lines.push('    images:');
          for (const i of b.images) lines.push(`      - ${i}`);
        }
        if (b.html) lines.push(`    html: ${yamlString(b.html)}`);
      }
    } else {
      lines.push(`${key}: ${typeof value === 'number' ? value : yamlString(value)}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

async function main() {
  console.log(`Importing ${SITE} …`);
  const home = parse(await fetchText(`${SITE}/work`));

  // Logo
  const logo = home.querySelector('.logo img');
  if (logo) {
    await mkdir(path.join(ROOT, 'src/assets'), { recursive: true });
    const dir = path.join(ROOT, 'src/assets');
    await writeFile(path.join(dir, 'logo.png'), await fetchBuffer(logo.getAttribute('src')));
  }

  // Projects, in gallery order
  const covers = home.querySelectorAll('.project-covers .project-cover');
  let order = 0;
  for (const cover of covers) {
    const slug = cover.getAttribute('href').replace(/^\//, '');
    const dir = path.join(ROOT, 'src/content/projects', slug);
    console.log(`→ ${slug}`);

    const img = cover.querySelector('.cover__img');
    const coverUrl =
      largestFromSrcset(img.getAttribute('data-srcset') ?? '') ?? img.getAttribute('data-src');
    const page = await importPage(slug, dir);
    const coverFile = await saveImage(coverUrl, dir, 'cover');

    const data = {
      title: text(cover.querySelector('.details .title')) || page.title,
      year: parseInt(text(cover.querySelector('.details .date')), 10) || undefined,
      category: text(cover.querySelector('.details .custom1')),
      medium: text(cover.querySelector('.details .custom2')),
      order: ++order,
      cover: `./${coverFile}`,
      description: page.description,
      blocks: page.blocks,
    };
    await writeFile(path.join(dir, 'index.md'), toFrontmatter(data));
  }

  for (const slug of STANDALONE_PAGES) {
    console.log(`→ page: ${slug}`);
    const dir = path.join(ROOT, 'src/content/pages', slug);
    const page = await importPage(slug, dir);
    await writeFile(path.join(dir, 'index.md'), toFrontmatter(page));
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
