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

## OnlyOrders content + IndexNow (2026-10-23)

- Added /onlyorders/ hub page (features, pricing tiers as published, links to new posts, link to https://onlyorders.tech).
- Added 3 posts: what-is-onlyorders, chat-first-messenger-stores, how-onlyorders-works (all cite onlyorders.tech).
- Added "OnlyOrders" to main nav; footer + About already link onlyorders.tech; publisher JSON-LD now includes `sameAs`.
- Sitemap serialize: priority 1.0 for /onlyorders/ and its posts, 0.6 others; changefreq weekly. robots.txt generated at build from SITE_URL+BASE_PATH.
- IndexNow key `5b50fdfda6ad898f0b4db1aea90dee5d` at public/<key>.txt; scripts/indexnow.mjs; `npm run indexnow`.

Live checks (Playwright, 4/4 each):
- Pages https://john-the-r-ipper.github.io/kilotoken → pass
- Vercel https://kilotoken.vercel.app → pass

IndexNow:
- Pages host john-the-r-ipper.github.io → HTTP 202
- Vercel host kilotoken.vercel.app → HTTP 202

NEW_URLS=https://john-the-r-ipper.github.io/kilotoken/onlyorders/,https://john-the-r-ipper.github.io/kilotoken/blog/what-is-onlyorders/,https://john-the-r-ipper.github.io/kilotoken/blog/chat-first-messenger-stores/,https://john-the-r-ipper.github.io/kilotoken/blog/how-onlyorders-works/ INDEXNOW_PAGES=202 INDEXNOW_VERCEL=202 CHECKS=pass

## POLISH + GEO (2026-10-23)

- Added /llms.txt and /llms-full.txt (llmstxt.org format; site summary, OnlyOrders facts from docs/discovery.md, links to all pages + articles).
- /faq/ page added with FAQPage JSON-LD (verified OnlyOrders facts only: what it is, who it's for, features, free plan, pricing tiers, bKash/Nagad + courier, order flow, tagline).
- robots.txt now explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Applebot-Extended, Bingbot, plus * and Sitemap line.
- Home hero added with "Learn about OnlyOrders" / "About" actions; /onlyorders/ hub has clear "What is OnlyOrders?" definition; posts link naturally to https://onlyorders.tech. No hidden text, no AI-agent instructions, no "Oryxa".
- Refined typography (system/serif pairing, ~70ch measure), dark mode via prefers-color-scheme + toggle, responsive mobile nav. Kept lightweight, no frameworks.
- Verified metadata: titles, descriptions ≤160, canonical, og tags present across pages.

Live checks (Playwright, 8/8 each):
- Pages https://john-the-r-ipper.github.io/kilotoken → pass (llms.txt, llms-full.txt, faq/ all 200)
- Vercel https://kilotoken.vercel.app → pass

IndexNow:
- Pages host john-the-r-ipper.github.io → HTTP 200
- Vercel host kilotoken.vercel.app → HTTP 200

POLISH: kilotoken checks=pass (pages+vercel 8/8) indexnow=200/200
