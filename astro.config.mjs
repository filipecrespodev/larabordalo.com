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
  // Keep these in sync with public/_redirects.
  redirects: {
    '/work': '/',
    '/contact': '/about#contact',
  },
  image: {
    responsiveStyles: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(work|contact)$/.test(page),
      i18n: { defaultLocale: 'en', locales: { en: 'en', pt: 'pt', es: 'es', it: 'it' } },
    }),
  ],
});
