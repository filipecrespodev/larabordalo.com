# larabordalo.com

Portfolio site of Lara Bordalo, illustrator and picture book author. A static [Astro](https://astro.build) site, hosted for free on Cloudflare Workers.

The design (v3) follows the "moodboard / museum" layout Lara made with Claude (`docs/Nome Sobrenome.html`). It has an off-white paper background and a home page where the illustrations are scattered like a physical moodboard: taped, pinned and draggable. Titles use full-width condensed museum lettering, with mono labels, hairlines and a blue curtain between pages. The previous Adobe Portfolio replica is preserved as the `v2.0` release.

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static site in dist/
pnpm preview
```

## Pages

| URL | Content |
|---|---|
| `/` | Moodboard (edit `src/data/moodboard.ts`) |
| `/books` | Projects with `kind: book` |
| `/illustration` | Projects with `kind: illustration`, filterable by `category` |
| `/about` | Bio, facts and contact (`src/content/pages/about/index.md`) |
| `/<project>` | One page per project folder (old Adobe URLs still work) |

Every page also exists in Portuguese (`/pt/…`), Spanish (`/es/…`) and Italian (`/it/…`). Interface texts are in `src/i18n/ui.ts`.

## Content

Each project is a folder holding its images and an `index.md` file:

```
src/content/projects/chameleon/
├── index.md
├── cover.jpg      # thumbnail used on the moodboard, wall and books list
├── 01.jpg
└── 02.jpg
```

```yaml
---
title: "CHAMELEON"
kind: "book"                 # "book" -> /books, "illustration" -> /illustration
year: 2025
category: "Picture book"     # filter chip on /illustration, label on /books
medium: "oil, graphite and colored pencils"
order: 1                     # position in listings
cover: "./cover.jpg"
bookCover: "./front.jpg"     # optional: front cover for the 3D book on /books
description: "Short intro shown on the project page."
author: "Anna Claudia Ramos" # books only, optional
publisher: "Perabook (Brazil)"
format: "Books of the World collection"
size: "m"                    # s | m | l: relative size on the /illustration wall
draft: false                 # true = hidden in production
pt:                          # Portuguese; `es:` and `it:` work the same. Missing fields fall back to English
  title: "Camaleão"
  description: "…"
  category: "Livro ilustrado"
  medium: "óleo, grafite e lápis de cor"
blocks:
  - type: image              # full-width image
    src: ./01.jpg
  - type: grid               # justified row of images
    width: 80                # optional, % of the page width
    images:
      - ./02.jpg
      - ./03.jpg
  - type: text
    html: "<p>Some text with <strong>bold</strong> and <a href='https://…'>links</a>.</p>"
---
```

On `/books`, the two first images of a book (after the cover) are shown as spreads.

To add a project: create a folder in `src/content/projects/` (the folder name is the URL, e.g. `/my-new-book`), add the images and an `index.md`, then commit and push. Cloudflare publishes it automatically. Upload large originals: Astro makes the responsive WebP versions at build time, so 2000–2600px wide images are ideal. To show it on the home page too, add an entry to `src/data/moodboard.ts`.

The About page (text and facts list in each language, portrait) lives in `src/content/pages/about/index.md`. E-mail and social links are in `src/consts.ts`.

### Re-importing from Adobe Portfolio

`pnpm import:portfolio` downloads every project from the old site (https://larabordalo.com while it is still on Adobe) into `src/content`. It only works while that site is online, and it overwrites the `index.md` files. It predates the v3 schema: imported projects need `kind` (and translations) added by hand, and it writes the About page in the old format.

### Behance

Adobe Portfolio pulled projects from Behance. Here the repository is the source of truth instead. Behance blocks automated access to its project pages, so syncing from it would break often. To publish a new Behance project on the site, add it as a project folder (the same images work).

## Hosting: Cloudflare Workers (free)

The site is deployed as a Cloudflare Worker that serves only static files (`wrangler.jsonc` points to `dist/`). Static file requests are free and unlimited, served from Cloudflare's global CDN with HTTPS.

- Project: **larabordalo-com** (Workers & Pages), connected to this repo. Every push to `main` builds (`pnpm build`) and deploys (`npx wrangler deploy`) automatically.
- Live URL: https://larabordalo-com.filipesoares-crespo.workers.dev
- `public/_redirects` keeps the old `/work` (→ `/`) and `/contact` (→ `/about#contact`) URLs working. Unknown paths serve `404.html`.

Custom domain: in the worker, open **Domains** (or Settings → Domains & Routes) and add `larabordalo.com` and `www.larabordalo.com`. For that the domain's DNS needs to be on Cloudflare: add the site in Cloudflare (free plan) and switch the nameservers at the registrar. Once the domain shows the new site, disconnect it in Adobe Portfolio and cancel the plan.

## Contact form

The form posts to [Web3Forms](https://web3forms.com) (free, 250 messages/month, no backend). Create an access key with `art@larabordalo.com` and set it as `PUBLIC_WEB3FORMS_KEY` in the worker's **Settings → Build → Variables and secrets** (build variable, not runtime), or in `.env` locally. Without a key the form opens the visitor's mail app instead.

## Fonts

Archivo (variable, with the width axis used for the condensed titles), Libre Franklin and IBM Plex Mono, self-hosted through Fontsource.
