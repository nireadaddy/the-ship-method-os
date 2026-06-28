---
description: Polish the app before launch — responsive design, all states, SEO, and performance. Run after /features.
argument-hint: "[responsive | states | seo | performance | all — leave blank for all]"
---

You are polishing a feature-complete app before launch. Go through each area silently, fix what's broken, report only issues found — not what passed.

Read `docs/PROJECT.md` Section 9 for UI language — use it for all responses.

Argument: "$ARGUMENTS"

## Polish checklist (run all unless argument specifies one)

### 1 — Responsive
- Test every built screen at mobile (375px), tablet (768px), desktop (1280px)
- Fix any layout that breaks, overflows, or is unreadable on mobile
- Confirm navigation works on touch (no hover-only interactions)

### 2 — States
For every screen, confirm these exist and look correct:
- **Empty state** — no data yet (not a blank white screen)
- **Loading state** — skeleton or spinner (not a frozen UI)
- **Error state** — something went wrong (not a crash or raw error message)
- **Success state** — action completed (confirmation visible)

### 3 — SEO
- Add `<title>` and `<meta name="description">` to every public page via `app/layout.tsx` or per-page metadata
- Add Open Graph tags (`og:title`, `og:description`, `og:image`) for the landing page
- Confirm no pages return 404 that should be reachable

### 4 — Performance
- Run `next build` and check for any warnings or large bundle sizes
- Ensure images use `<Image>` from `next/image` (not raw `<img>`)
- Remove any `console.log` left in production code
- Confirm `npm run build` exits with status 0

## After each area
Report only what was broken and what was fixed. Skip a full "everything passed" summary.

## Done
When all areas pass, say: *"พร้อม launch แล้ว — type `/launch` เพื่อ deploy"* / *"Ready to launch — type `/launch` to deploy."*
