// IndexNow submission script.
// Reads the sitemap index from the live BASE_URL, collects all URLs, and
// submits them to https://api.indexnow.org/indexnow. Prints the HTTP status.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = (process.env.BASE_URL || '').replace(/\/$/, '');
if (!BASE) {
  console.error('Set BASE_URL to the live site root (e.g. https://john-the-r-ipper.github.io/kilotoken).');
  process.exit(1);
}

// Locate the public key file: a 32-hex .txt file in public/.
const publicDir = join(process.cwd(), 'public');
const keyFile = readdirSync(publicDir).find(
  (f) => /^[0-9a-f]{32}\.txt$/.test(f) && /^[0-9a-f]{32}$/.test(f.replace(/\.txt$/, ''))
);
if (!keyFile) {
  console.error('No 32-hex key file found in public/. Generate one first.');
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/, '');
const keyLocation = `${BASE}/${keyFile}`;

async function collectUrls() {
  const idxRes = await fetch(`${BASE}/sitemap-index.xml`);
  if (!idxRes.ok) throw new Error(`sitemap index HTTP ${idxRes.status}`);
  const idxXml = await idxRes.text();
  const locs = [...idxXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = new Set();
  for (const loc of locs) {
    const res = await fetch(loc);
    if (!res.ok) throw new Error(`sitemap ${loc} HTTP ${res.status}`);
    const xml = await res.text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
  }
  return [...urls];
}

const urlList = await collectUrls();
const payload = { host: new URL(BASE).host, key, keyLocation, urlList };

console.log(`Submitting ${urlList.length} URLs for host ${payload.host}`);
console.log(`keyLocation: ${keyLocation}`);

const resp = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

console.log(`HTTP status: ${resp.status}`);
if (!resp.ok) {
  const text = await resp.text();
  console.log(`Response body: ${text}`);
  process.exit(1);
}
