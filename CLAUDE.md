# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static Astro portfolio site for illustrator Lara Bordalo. It replicates the old Adobe Portfolio site, keeping the same layout, URLs and content. It is deployed as a static-assets-only Cloudflare Worker. There is no server code, test suite or linter.

## Commands

Uses pnpm 12.6.0 (pinned via `packageManager`) and Node >=22.

```sh
pnpm install
pnpm dev                 # http://localhost:4321 (drafts are visible in dev)
pnpm build               # static output in dist/ — the only real correctness check
pnpm preview
pnpm astro sync          # regenerate content-collection types after schema changes
pnpm import:portfolio    # re-scrape the old Adobe site into src/content (overwrites index.md files; --force re-downloads images)
```

Deploy: every push to `main` triggers a Cloudflare Workers build (`pnpm build`, then `npx wrangler deploy`). Don't deploy manually unless asked.

## Architecture

- **Content is the source of truth.** Every project is a folder `src/content/projects/<slug>/` containing `index.md` (frontmatter only, no body) plus its images. The folder name becomes the URL (`/<slug>`). The About page uses the same format in `src/content/pages/about/`.
- **Schema** (`src/content.config.ts`): both collections share a `blocks` array, a discriminated union of `image | grid | text | embed`. `text` and `embed` take raw trusted HTML rendered with `set:html`. Projects also need `order` (position on the home grid) and `cover`. Setting `draft: true` hides a project in production builds only (`src/lib/projects.ts`).
- **Rendering**: `src/components/Blocks.astro` renders blocks for both project pages (`src/pages/[slug].astro`) and About. Grid blocks rebuild Adobe Portfolio's justified "photo grid" using flex-grow based on the aspect ratio (base row height 260px). Every image links to a full-size WebP opened by `Lightbox.astro`. Astro generates responsive WebP variants at build time, so source images should be large originals (around 2000–2600px wide).
- **URL compatibility**: `build.format: 'file'` and `trailingSlash: 'never'` produce `/chameleon` → `chameleon.html` to match the old Adobe URLs, and `wrangler.jsonc` uses `html_handling: drop-trailing-slash` plus `not_found_handling: 404-page` to match. `/work` redirects to `/` (in both `astro.config.mjs` and `public/_redirects`). Keep all of these consistent with each other. A project slug must not collide with the static pages (`about`, `contact`, `404`).
- **Site-wide config**: `src/consts.ts` holds `SITE` metadata, `NAV`, `SOCIAL` links and the Web3Forms key. All styling lives in one file, `src/styles/global.css`. Fonts are Figtree and Bitter (via Fontsource), chosen as stand-ins for Proxima Nova and Adelle.
- **Contact form** (`src/pages/contact.astro`): posts to Web3Forms using `PUBLIC_WEB3FORMS_KEY`. This is a *build-time* variable (set in Cloudflare build settings or `.env`). Without it the form falls back to `mailto:`.
