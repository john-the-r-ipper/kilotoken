import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL, BASE_PATH } from './site.config.mjs';

// Paths that should get sitemap priority 1.0: the /onlyorders/ hub and its posts.
const HIGH_PRIORITY = [
  '/onlyorders/',
  '/blog/what-is-onlyorders/',
  '/blog/chat-first-messenger-stores/',
  '/blog/how-onlyorders-works/',
];

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      serialize(item) {
        item.changefreq = 'weekly';
        item.priority = HIGH_PRIORITY.some((p) => item.url.includes(p)) ? 1.0 : 0.6;
        return item;
      },
    }),
  ],
});
