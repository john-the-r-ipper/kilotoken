import { getCollection } from 'astro:content';

export const url = (p = '') =>
  (import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + p.replace(/^\//, '')).replace(/([^/])$/, '$1/');

export async function posts() {
  return (await getCollection('posts', (p) => !p.data.draft)).sort(
    (a, b) => +b.data.pubDate - +a.data.pubDate
  );
}

export const fmt = (d: Date) =>
  d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
