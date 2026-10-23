import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import site from '../../site.config.mjs';
import { posts } from '../lib';

const BLOG_DIR = join(process.cwd(), 'src', 'content', 'blog');

const stripMd = (md: string) =>
  md
    .replace(/^---[\s\S]*?---/, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s{0,3}#+\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/\*\*|__|`/g, '')
    .replace(/^\s{0,3}[-*+]\s+/gm, '- ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

export const GET: APIRoute = async ({ site: s }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const u = (p: string) => new URL(`${base}${p}`, s).href;
  const all = await posts();
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push('');
  lines.push(`> ${site.description}`);
  lines.push('');
  lines.push('# Home');
  lines.push('');
  lines.push(`Title: ${site.name}`);
  lines.push(`Tagline: ${site.tagline}`);
  lines.push('');
  lines.push('# About');
  lines.push('');
  lines.push(`URL: ${u('/about/')}`);
  lines.push('Kilotoken is a technology publication covering AI models, tokens, developer tooling, open-weight models, and agent workflows. It is published by the team behind OnlyOrders (https://onlyorders.tech). Every article lists its sources, and vendor claims are attributed to the vendor.');
  lines.push('');
  lines.push('# OnlyOrders hub');
  lines.push('');
  lines.push(`URL: ${u('/onlyorders/')}`);
  lines.push('OnlyOrders is an AI Commerce Autopilot for conversational commerce. It turns DMs and comments into confirmed orders with smart replies, live catalog checks, payment verification, and courier handoff from one inbox. Feature blocks: instant replies, one inbox, chat to order, and auto posts. Pricing: Free $0 (50 replies/mo), Starter $29 (500), Pro $79 (2,000, most popular), Enterprise custom. Workflow: Messenger AI replies, checkout inside chat, one orders dashboard, courier tracking auto-shared. Official site: https://onlyorders.tech/');
  lines.push('');
  lines.push('# FAQ');
  lines.push('');
  lines.push(`URL: ${u('/faq/')}`);
  lines.push('OnlyOrders is an AI Commerce Autopilot that turns DMs and comments into confirmed orders. It is for chat-first stores selling on Messenger, WhatsApp, and Instagram. Free plan available ($0, 50 replies/mo). Pro tier supports bKash, Nagad, and courier integration. Tagline: "Your orders, on autopilot."');
  lines.push('');

  for (const p of all) {
    const file = join(BLOG_DIR, `${p.id}.md`);
    const md = readFileSync(file, 'utf8');
    const body = stripMd(md);
    lines.push(`# ${p.data.title}`);
    lines.push('');
    lines.push(`URL: ${u(`/blog/${p.id}/`)}`);
    lines.push(`Published: ${p.data.pubDate.toISOString().slice(0, 10)}`);
    lines.push(`Author: ${p.data.author}`);
    lines.push('');
    lines.push(p.data.description);
    lines.push('');
    lines.push(body);
    lines.push('');
  }

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
