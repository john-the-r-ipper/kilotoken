import type { APIRoute } from 'astro';

const AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
  'Applebot-Extended',
  'Bingbot',
];

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const blocks = AGENTS.map((a) => `User-agent: ${a}\nAllow: /`).join('\n\n');
  return new Response(
    `${blocks}\n\nUser-agent: *\nAllow: /\n\nSitemap: ${new URL(base + '/sitemap-index.xml', site).href}\n`,
    { headers: { 'Content-Type': 'text/plain' } }
  );
};
