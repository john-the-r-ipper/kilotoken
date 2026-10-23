# Kilotoken — Build Notes

**Blog:** Kilotoken
**Theme:** AI models, tokens, developer tooling, open-weight models, agent workflows
**Agent:** Codex CLI (mercury-3 via Inception bridge)
**Stack:** Astro 5 + @astrojs/sitemap
**Repo:** https://github.com/john-the-r-ipper/kilotoken
**Pages URL:** https://john-the-r-ipper.github.io/kilotoken/
**Vercel preview:** https://kilotoken-rb0q3rxfe-john-the-r-ippers-projects.vercel.app
**Vercel production:** https://kilotoken.vercel.app

## Articles (6)

1. reflection-beam-open-weight-models.md
2. php2shell-ai-discovered-php-vulnerabilities.md
3. gemini-agentic-browsing-developers.md
4. anthropic-safety-self-replication-research.md
5. tokens-for-developers-context-and-cost.md
6. smb-messaging-automation-chat-orders.md

## Checks

- Local build green: `SITE_URL=https://john-the-r-ipper.github.io BASE_PATH=/kilotoken/ npm run build`
- GitHub Actions workflow "Deploy GitHub Pages" on `main` completed **success** (run 39978215553)
- Pages URL live, HTTP 200
- Vercel production URL live, HTTP 200 (preview behind Vercel deployment protection)
- `/about` discloses publication by OnlyOrders (https://onlyorders.tech); no "Oryxa" anywhere
- Secret scan clean: no API keys, no sk_, no ghp_, no .env committed
- `.gitignore` excludes node_modules/, dist/, .astro/, .env*, logs
- GSC placeholder present at `public/google-site-verification-PLACEHOLDER.html`; README documents real-token replacement (`googleXXXX.html`) and optional `GSC_VERIFICATION` meta
- `robots.txt` allows all; `Sitemap:` links to `sitemap-index.xml` for both targets (Pages base `/kilotoken/`, Vercel base `/`)
- No `noindex` anywhere in source or served pages (removed from 404 and category pages)
- `npm run check:live` (Playwright) added; verifies home, `/about/`, all sitemap URLs load 200 with no `noindex`, plus robots.txt and sitemap index reachable
- Pages live check: **4/4 pass** (`BASE_URL=https://john-the-r-ipper.github.io/kilotoken`)
- Vercel production live check: **4/4 pass** (`BASE_URL=https://kilotoken.vercel.app`)

CHECKS_PAGES=pass CHECKS_VERCEL=pass
