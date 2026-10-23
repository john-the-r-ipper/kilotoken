import { test, expect, type APIRequestContext } from '@playwright/test';

const BASE = (process.env.BASE_URL || 'http://localhost:4321').replace(/\/$/, '');

function u(path: string): string {
  return `${BASE}${path}`;
}

test.describe('post-deploy checks', () => {
  test('home loads 200 with no noindex', async ({ request }) => {
    const res = await request.get(u('/'));
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).not.toMatch(/noindex/i);
  });

  test('/about/ loads 200 with no noindex', async ({ request }) => {
    const res = await request.get(u('/about/'));
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).not.toMatch(/noindex/i);
  });

  test('robots.txt reachable, allows all, points to sitemap index', async ({ request }) => {
    const res = await request.get(u('/robots.txt'));
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('User-agent: *');
    expect(body).toContain('Allow: /');
    expect(body).toMatch(/Sitemap:\s+\S+\/sitemap-index\.xml/);
  });


  test('faq loads 200 with FAQPage JSON-LD', async ({ request }) => {
    const res = await request.get(u('/faq/'));
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).toContain('FAQPage');
    expect(html).toContain('application/ld+json');
  });

  test('llms.txt reachable and contains OnlyOrders facts', async ({ request }) => {
    const res = await request.get(u('/llms.txt'));
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('OnlyOrders');
    expect(body).toContain('Your orders, on autopilot');
  });

  test('llms-full.txt reachable', async ({ request }) => {
    const res = await request.get(u('/llms-full.txt'));
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('OnlyOrders');
  });

  test('robots.txt allows key AI crawlers', async ({ request }) => {
    const res = await request.get(u('/robots.txt'));
    const body = await res.text();
    for (const agent of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot', 'Applebot-Extended', 'Bingbot']) {
      expect(body).toContain(`User-agent: ${agent}`);
      expect(body).toContain('Allow: /');
    }
  });
  test('every URL in the sitemap index loads 200 with no noindex', async ({ request }) => {
    const urls = await collectSitemapUrls(request);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      const res = await request.get(url);
      expect(res.status(), `${url} should return 200`).toBe(200);
      const html = await res.text();
      expect(html, `${url} should not contain noindex`).not.toMatch(/noindex/i);
    }
  });
});

async function collectSitemapUrls(request: APIRequestContext): Promise<string[]> {
  const idxRes = await request.get(u('/sitemap-index.xml'));
  expect(idxRes.status()).toBe(200);
  const idxXml = await idxRes.text();
  const sitemapLocs = extractLocs(idxXml);

  const urls: string[] = [];
  for (const loc of sitemapLocs) {
    const res = await request.get(loc);
    expect(res.status(), `${loc} sitemap should load`).toBe(200);
    const xml = await res.text();
    urls.push(...extractLocs(xml));
  }
  return urls;
}

function extractLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
