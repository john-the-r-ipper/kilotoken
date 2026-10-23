import { test, expect, type APIRequestContext } from '@playwright/test';

test.describe('post-deploy checks', () => {
  test('home loads 200 with no noindex', async ({ request }) => {
    const res = await request.get('/');
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).not.toMatch(/noindex/i);
  });

  test('/about/ loads 200 with no noindex', async ({ request }) => {
    const res = await request.get('/about/');
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(html).not.toMatch(/noindex/i);
  });

  test('robots.txt reachable, allows all, points to sitemap index', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('User-agent: *');
    expect(body).toContain('Allow: /');
    expect(body).toMatch(/Sitemap:\s+\S+\/sitemap-index\.xml/);
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
  const idxRes = await request.get('/sitemap-index.xml');
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
