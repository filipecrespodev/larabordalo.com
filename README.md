# larabordalo.com

Portfolio site of Lara Bordalo. A static [Astro](https://astro.build) site that replicates the old Adobe Portfolio version (same layout, URLs and content), hosted for free on Cloudflare Workers.

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static site in dist/
pnpm preview
```

## Content

Each project is a folder holding its images and an `index.md` file:

```
src/content/projects/chameleon/
├── index.md
├── cover.jpg      # thumbnail on the home grid (cropped to 1.28:1)
├── 01.jpg
└── 02.jpg
```

```yaml
---
title: "CHAMELEON"
year: 2025
category: "Book published"   # shown on hover (desktop)
medium: "mixed media"        # shown on hover (desktop)
order: 1                     # position on the home grid
cover: "./cover.jpg"
description: "Optional intro text under the title."
draft: false                 # true = hidden in production
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

To add a project: create a folder in `src/content/projects/` (the folder name is the URL, e.g. `/my-new-book`), add the images and an `index.md`, then commit and push. Cloudflare publishes it automatically. Upload large originals: Astro makes the responsive WebP versions at build time, so 2000–2600px wide images are ideal.

The About page lives in `src/content/pages/about/`. Contact, menu and social links are in `src/pages/contact.astro` and `src/consts.ts`.

### Re-importing from Adobe Portfolio

`pnpm import:portfolio` downloads every project from the old site (https://larabordalo.com while it is still on Adobe) into `src/content`. It only works while that site is online, and it overwrites the `index.md` files.

### Behance

Adobe Portfolio pulled projects from Behance. Here the repository is the source of truth instead. Behance blocks automated access to its project pages, so syncing from it would break often. To publish a new Behance project on the site, add it as a project folder (the same images work).

## Hosting: Cloudflare Workers (free)

The site is deployed as a Cloudflare Worker that serves only static files (`wrangler.jsonc` points to `dist/`). Static file requests are free and unlimited, served from Cloudflare's global CDN with HTTPS.

- Project: **larabordalo-com** (Workers & Pages), connected to this repo. Every push to `main` builds (`pnpm build`) and deploys (`npx wrangler deploy`) automatically.
- Live URL: https://larabordalo-com.filipesoares-crespo.workers.dev
- `public/_redirects` keeps the old `/work` URL working (301 → `/`). Unknown paths serve `404.html`.

Custom domain: in the worker, open **Domains** (or Settings → Domains & Routes) and add `larabordalo.com` and `www.larabordalo.com`. For that the domain's DNS needs to be on Cloudflare: add the site in Cloudflare (free plan) and switch the nameservers at the registrar. Once the domain shows the new site, disconnect it in Adobe Portfolio and cancel the plan.

## Contact form

The form posts to [Web3Forms](https://web3forms.com) (free, 250 messages/month, no backend). Create an access key with `art@larabordalo.com` and set it as `PUBLIC_WEB3FORMS_KEY` in the worker's **Settings → Build → Variables and secrets** (build variable, not runtime), or in `.env` locally. Without a key the form opens the visitor's mail app instead.

## Fonts

The Adobe site used Proxima Nova and Adelle (Adobe Fonts, licensed through the Portfolio plan). This site uses the free lookalikes **Figtree** and **Bitter**, self-hosted through Fontsource. With a Creative Cloud plan you could load the originals from an Adobe Fonts web project instead.
