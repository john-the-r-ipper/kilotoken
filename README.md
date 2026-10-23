# Kilotoken

Kilotoken is a static Astro blog about AI models, tokens, and developer tooling.

Operated by [OnlyOrders](https://onlyorders.tech) for educational / SEO content (see `/about`).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
SITE_URL=https://john-the-r-ipper.github.io BASE_PATH=/kilotoken/ npm run build
```

GitHub Pages deploys via `.github/workflows/pages.yml` on push to `main`.

## Google Search Console

Verification placeholder kept at `public/google-site-verification-PLACEHOLDER.html` (content: `google-site-verification: google-PLACEHOLDER.html`). When the real token file is supplied, replace it with `public/googleXXXX.html` (the actual `google<id>.html` file provided by Search Console). Optionally set env `GSC_VERIFICATION` to render the `<meta name="google-site-verification">` tag; omit it if unset.

## Live post-deploy checks

```bash
npm run check:live   # requires BASE_URL env
```

Uses Playwright (`tests/postdeploy.spec.ts`) against the deployed site to verify home, `/about/`, every sitemap post URL return 200, `robots.txt` and the sitemap index are reachable, and no `noindex` meta/header is present. Install the browser locally with `npx playwright install chromium` (not committed).
