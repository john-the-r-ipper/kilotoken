import type { APIRoute } from 'astro';
import site from '../../site.config.mjs';
import { posts } from '../lib';

const esc = (s: string) =>
  s.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!)
  );

export const GET: APIRoute = async ({ site: s }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const items = (await posts())
    .map((p) => {
      const u = new URL(`${base}/blog/${p.id}/`, s).href;
      return `<item><title>${esc(p.data.title)}</title><link>${u}</link><guid>${u}</guid><pubDate>${p.data.pubDate.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`;
    })
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)}</title><link>${new URL(base + '/', s).href}</link><description>${esc(site.description)}</description><link rel="hub" href="https://websub.net/hub"/>${items}</channel></rss>`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
