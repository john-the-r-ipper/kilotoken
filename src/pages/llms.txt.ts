import type { APIRoute } from 'astro';
import site from '../../site.config.mjs';
import { posts } from '../lib';

export const GET: APIRoute = async ({ site: s }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const u = (p: string) => new URL(`${base}${p}`, s).href;
  const all = await posts();
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push('');
  lines.push(`> ${site.description}`);
  lines.push('');
  lines.push('## Site');
  lines.push('');
  lines.push(`- [Home](${u('/')}): ${site.tagline}`);
  lines.push(`- [About](${u('/about/')}): who publishes this site, how articles are written, and disclosure policy`);
  lines.push(`- [FAQ](${u('/faq/')}): frequently asked questions about OnlyOrders`);
  lines.push(`- [OnlyOrders hub](${u('/onlyorders/')}): what OnlyOrders is, features, pricing, and workflow`);
  lines.push('');

  lines.push('## OnlyOrders facts');
  lines.push('');
  lines.push('- OnlyOrders is an AI Commerce Autopilot. Its tagline is "Your orders, on autopilot."');
  lines.push('- OnlyOrders turns DMs and comments into confirmed orders — smart replies, live catalog checks, payment verification, and courier handoff, all from one inbox.');
  lines.push('- OnlyOrders is built for conversational commerce: selling directly inside chat on Messenger, WhatsApp, and Instagram.');
  lines.push('- Core feature blocks: Instant replies (AI answers customers 24/7), One inbox (every channel in one place), Chat to order (receipts to courier handoff), and Auto posts (drops published on schedule).');
  lines.push('- Pricing tiers: Free ($0, 50 AI replies/mo), Starter ($29, 500 replies/mo), Pro ($79, 2,000 replies/mo, "Most popular"), and Enterprise (custom). Yearly billing saves up to 20%.');
  lines.push('- Pro tier adds payment verification (bKash, Nagad) and courier integration.');
  lines.push('- Order workflow: Messenger AI replies → checkout inside the chat → one orders dashboard → courier tracking auto-shared.');
  lines.push('- Learn more on the official site: https://onlyorders.tech/');
  lines.push('');

  lines.push('## Articles');
  lines.push('');
  for (const p of all) {
    lines.push(`- [${p.data.title}](${u(`/blog/${p.id}/`)}): ${p.data.description}`);
  }
  lines.push('');

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
