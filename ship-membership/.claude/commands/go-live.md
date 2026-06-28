---
description: Deploy to Vercel, set production env vars, wire Stripe webhook, smoke test. Run after /setup.
---

You are deploying this membership app to production. Work through these steps in order — one at a time.

Confirm `/setup` is already complete (`.env.local` exists and `bun run dev` works) before starting.

---

## Step 1 — Push to GitHub

Check if this project has a git remote:
```bash
git remote -v
```

If not, tell the user:

> "Go to https://github.com/new → create a private repo named after your product → don't initialize it."

Then run:
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/[username]/[repo].git
git push -u origin main
```

---

## Step 2 — Deploy to Vercel

Tell the user:

> "Go to https://vercel.com/new → Import the GitHub repo you just pushed → Framework: Next.js → Root directory: leave blank (it's at the root) → click Deploy."

Wait for them to confirm it deployed (even if it fails — that's expected, env vars aren't set yet).

---

## Step 3 — Set Environment Variables on Vercel

Tell the user:

> "Go to your Vercel project → Settings → Environment Variables → add all of these:"

Read every key from `.env.local` (excluding placeholder values). List them:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
DATABASE_URL
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET        ← set this after Step 4
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_PRO_MONTHLY_PRICE_ID
STRIPE_PRO_ANNUAL_PRICE_ID
STRIPE_TEAM_MONTHLY_PRICE_ID
STRIPE_TEAM_ANNUAL_PRICE_ID
NEXT_PUBLIC_APP_URL          ← use your Vercel URL (https://yourapp.vercel.app)
```

For `STRIPE_WEBHOOK_SECRET` — leave it blank for now, we'll get it in Step 4.

After all vars are added: **Deployments → Redeploy** (select "Redeploy with existing build settings").

---

## Step 4 — Wire Stripe Webhook

Tell the user:

> "Go to https://dashboard.stripe.com → Developers → Webhooks → Add endpoint."

Endpoint URL: `https://[your-vercel-url]/api/webhooks/stripe`

Select these events:
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `customer.subscription.deleted`

Click "Add endpoint" → copy the **Signing secret** (whsec_...).

Go back to Vercel → Settings → Environment Variables → add:
```
STRIPE_WEBHOOK_SECRET=whsec_...
```

Redeploy again.

---

## Step 5 — Update Clerk Allowed Origins

Tell the user:

> "Go to Clerk Dashboard → your app → Settings → Domains → add your Vercel URL (https://yourapp.vercel.app)"

---

## Step 6 — Smoke Test

Open the production URL and verify:

- [ ] Landing page loads with your product name
- [ ] Sign up → email verification → /dashboard
- [ ] /billing → click Upgrade → Stripe test checkout opens (use card 4242 4242 4242 4242)
- [ ] After payment → /dashboard shows Pro plan
- [ ] /content → previously locked items now show "Open" button
- [ ] /admin → shows your admin panel (you are in `PRODUCT.adminUserIds`)
- [ ] /admin/members → shows your account as a Pro member

If Stripe checkout doesn't work, check: Stripe dashboard → Developers → Webhooks → recent events — look for errors.

---

## Done

*"🚀 Live แล้ว! ระบบ membership ของคุณพร้อมใช้งานแล้ว"*
/ *"🚀 You're live! Your membership system is ready."*

Next steps to consider:
- Add a custom domain (Vercel → Domains)
- Switch Stripe from Test mode to Live mode (update all `sk_test_`/`pk_test_` keys to `sk_live_`/`pk_live_`)
- Add your real content items to `CONTENT_ITEMS` in `config.ts`
