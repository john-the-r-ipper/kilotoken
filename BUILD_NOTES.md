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
- GitHub Actions workflow "Deploy GitHub Pages" on `main` completed **success** (run 39976671209)
- Pages URL live, HTTP 200
- Vercel production URL live, HTTP 200 (preview behind Vercel deployment protection)
- `/about` discloses publication by OnlyOrders (https://onlyorders.tech); no "Oryxa" anywhere
- Secret scan clean: no API keys, no sk_, no ghp_, no .env committed
- `.gitignore` excludes node_modules/, dist/, .astro/, .env*, logs
