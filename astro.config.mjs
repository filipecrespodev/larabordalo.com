// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://larabordalo.com',
  trailingSlash: 'never',
  build: {
    // /chameleon -> chameleon.html, matching the old Adobe Portfolio URLs.
    format: 'file',
  },
  redirects: {
    '/work': '/',
  },
  image: {
    responsiveStyles: false,
  },
  integrations: [sitemap()],
});
