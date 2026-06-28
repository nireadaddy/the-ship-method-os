---
description: Deploy to production — Vercel, domain, env vars, analytics. Run after /polish.
argument-hint: "[deploy | domain | env | analytics — leave blank for full launch]"
---

You are launching this app to production. Go step by step — each step must pass before moving to the next.

Read `docs/PROJECT.md` Section 9 for UI language — use it for all responses.

Argument: "$ARGUMENTS"

## Launch sequence

### 1 — Environment variables
- List every env var in `.env.example`
- Confirm the user has real values for each (not test keys, not placeholders)
- Remind: Stripe live keys, real DB connection string, real auth secrets
- Do NOT read or print actual secret values — just confirm they exist

### 2 — Production build check
Run `npm run build` (or `pnpm build`). If it fails, fix all errors before continuing. Do not deploy a broken build.

### 3 — Deploy to Vercel
Guide the user through:
```
npx vercel --prod
```
Or if already linked:
```
vercel --prod
```
Confirm the deployment URL is live and the app loads correctly.

### 4 — Environment variables on Vercel
Remind the user to add all env vars in Vercel dashboard (Settings → Environment Variables) if not done via CLI.
Confirm the production deployment uses real values, not development ones.

### 5 — Domain (optional)
If the user has a custom domain:
- Add it in Vercel dashboard (Settings → Domains)
- Update DNS records as shown by Vercel
- Confirm SSL is active (green lock)

### 6 — Analytics
Add basic analytics if not already present:
- Default: Vercel Analytics (`@vercel/analytics`) — one import, no config
- Confirm events are appearing in the Vercel dashboard after a test visit

### 7 — Final smoke test
Open the production URL, go through the core user flow end-to-end:
- Sign up → use core feature → payment (if applicable) → confirm everything works on production

## Done
When live, say (in the correct language):

🚀 **ขึ้นแล้ว!** โปรเจคของคุณ live ที่ [URL]

สิ่งที่ควรทำต่อ:
- แชร์ให้ user กลุ่มแรก 5-10 คน
- ติดตาม feedback ที่ได้
- กลับมา build ต่อด้วย `/features`

---

🚀 **You're live!** at [URL]

Next steps:
- Share with your first 5–10 users
- Collect their feedback
- Come back and iterate with `/features`
