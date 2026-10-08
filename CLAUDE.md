# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static Astro portfolio for illustrator and picture book author Lara Bordalo. It is deployed as a static-assets-only Cloudflare Worker, with no server code, no test suite and no linter. The v3 design ports the "moodboard / museum" template Lara made with Claude (`docs/Nome Sobrenome.html`, the design reference). The previous Adobe Portfolio replica is the `v2.0` git tag/release.

## Commands

Uses pnpm 12.6.0 (pinned via `packageManager`) and Node >=22.

```sh
pnpm install
pnpm dev                 # http://localhost:4321 (drafts are visible in dev)
pnpm build               # static output in dist/ — the only real correctness check
pnpm preview
npx wrangler dev         # serve dist/ exactly like production (redirects, 404, drop-trailing-slash); restart it after a rebuild
pnpm astro sync          # regenerate content-collection types after schema changes
```

Deploy: every push to `main` triggers a Cloudflare Workers build (`pnpm build`, then `npx wrangler deploy`). Don't deploy manually unless asked.

## Architecture

- **Content**:
  - Each project is a folder `src/content/projects/<slug>/` with `index.md` (frontmatter only) and its images. The folder name is the URL.
  - `kind` (`book` or `illustration`) routes a project to `/books` or `/illustration`.
  - Translations live in optional `pt:`, `es:` and `it:` objects. `localize()` in `src/lib/projects.ts` falls back to the English fields.
  - The schema is in `src/content.config.ts`. The About page (`src/content/pages/about/`) is structured `en`/`pt`/`es`/`it` frontmatter, not blocks.
- **Moodboard**: `src/data/moodboard.ts` positions every home item by hand: desktop `x/y/w`, phone `mx/my/mw`, rotation, parallax depth and tape/pin/frame style. Images are resolved by project slug and file name through `import.meta.glob`, so a typo fails the build.
- **i18n**:
  - Done by hand, without Astro's i18n routing. English sits at the root (`src/pages/*.astro`); the other languages come from `src/pages/[lang]/*.astro`, whose `getStaticPaths` lists every non-English entry of `LANGS`. Both are thin wrappers around a view in `src/views/` that takes `lang`.
  - UI strings, `LANGS`, `LOCALES` and the `href(path, lang)` / `splitPath` helpers are in `src/i18n/ui.ts`.
  - To add a language: add it to `LANGS`/`LOCALES` with a full UI dictionary, add a translation object to the project schema and a bio to the About schema in `src/content.config.ts`, then fill in the content and the sitemap `i18n` locales.
  - When adding a page, add the root and the `[lang]` wrappers plus a nav key.
- **Client behaviour**:
  - Site-wide scripts live in `src/layouts/Base.astro`: fitting `.fit` titles to the full width, the blue page wipe (via `sessionStorage` plus `html.wiping`), the cursor pill (`data-cursor`) and copy-to-clipboard (`data-copy`).
  - `Lightbox.astro` opens any `a[data-lb]`, browses within the closest `[data-lb-group]`, and takes its caption from `data-title`/`data-meta`/`data-href`. Without JS the links simply open the image.
  - Page-specific scripts (drag and parallax, book accordion and preview, wall filters) sit in their views.
- **Styling**: everything is in `src/styles/global.css`, using the template's tokens (`--paper`, `--ink`, `--accent`, `--f-display` …). The condensed titles depend on `font-stretch` with the Archivo **wdth** variable font (`@fontsource-variable/archivo/wdth.css`).
- **URL compatibility**: `build.format: 'file'` plus `trailingSlash: 'never'` turns `/chameleon` into `chameleon.html`, matching the old Adobe URLs, and `wrangler.jsonc` uses `drop-trailing-slash` plus `404-page`. Redirects (`/work` → `/`, `/contact` → `/about#contact`) live in both `astro.config.mjs` and `public/_redirects`; keep them in sync. A project slug must not collide with `about`, `books`, `illustration`, a language code (`pt`, `es`, `it`) or `404`.
- **Contact form** (`src/components/ContactForm.astro`): posts to Web3Forms using `PUBLIC_WEB3FORMS_KEY`. This is a *build-time* variable (set in Cloudflare build settings or `.env`). Without it the form falls back to `mailto:`.
- `scripts/import-portfolio.mjs` is a legacy scraper for the old Adobe site and predates the v3 schema.
