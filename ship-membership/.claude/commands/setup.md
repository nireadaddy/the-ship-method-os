---
description: Full guided setup — Clerk → Supabase → Stripe → config.ts → run locally. Run this first before anything else.
---

You are setting up a white-label membership backend for the first time. Work through these steps in order. After each step, confirm it worked before moving to the next. Do not ask multiple questions at once — one step at a time.

Read `config.ts` and `.env.example` first to understand what's needed.

---

## Step 1 — Customize config.ts

Open `config.ts` and ask the user:

> "What's the name of your product?"

Update `PRODUCT.name`, `PRODUCT.tagline`, `PRODUCT.description`, and `PRODUCT.supportEmail` with their answers. Save the file.

Then ask:

> "Do the plan names and prices look right? (Free / Pro $29/mo / Team $79/mo) — or do you want to change them?"

If they want changes, update `PLANS` in config.ts accordingly.

---

## Step 2 — Clerk (Auth)

Tell the user:

> "We need to set up Clerk for authentication. Go to https://dashboard.clerk.com → Create application → name it after your product → choose Email + Google as sign-in options."

Wait, then ask: "Do you have the Publishable Key and Secret Key from Clerk?"

When they paste the keys, write them to `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

Then ask: "What is your Clerk user ID? (Go to Clerk Dashboard → Users → click your account → copy the user_... ID)"

Add it to `PRODUCT.adminUserIds` in `config.ts` — this gives you access to `/admin`.

---

## Step 3 — Supabase (Database)

Tell the user:

> "Go to https://supabase.com → New project → name it after your product → choose a region close to your users → set a strong database password."

Wait, then ask: "Once the project is ready, go to Project Settings → Database → Connection string (URI) → copy it."

Write to `.env.local`:
```
DATABASE_URL=postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
```

Then run the database migration:
```bash
bun run db:generate
bun run db:migrate
```

Confirm the `users` and `content_access` tables were created in Supabase → Table Editor.

---

## Step 4 — Stripe (Payments)

Tell the user:

> "Go to https://dashboard.stripe.com → Make sure you're in Test mode → Products → Add product."

Create one product per paid plan:

For **Pro**:
- Name: "Pro" (or whatever `PLANS.pro.name` is in config.ts)
- Add two prices: monthly ($X/mo recurring) + annual ($Y/yr recurring)
- Copy both price IDs (price_...)

For **Team** (if enabled in config.ts):
- Same process

Write to `.env.local`:
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_ANNUAL_PRICE_ID=price_...
STRIPE_TEAM_MONTHLY_PRICE_ID=price_...
STRIPE_TEAM_ANNUAL_PRICE_ID=price_...
```

Also update `PLANS.pro.stripePriceId` and `PLANS.team.stripePriceId` in `config.ts` with these price IDs.

---

## Step 5 — App URL

Add to `.env.local`:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 6 — Test locally

Run:
```bash
bun run dev
```

Open http://localhost:3000 and verify:
- Landing page shows your product name ✓
- Sign up creates an account → redirects to /dashboard ✓
- /dashboard shows your name and "Free" plan ✓
- /admin redirects to /dashboard (you need to add your Clerk ID to config.ts first) — check Step 2
- /billing shows the pricing cards ✓

If any step fails, read the error and fix it before continuing.

---

## Done

*"Setup เสร็จแล้ว! ทดสอบ locally ผ่านแล้ว — พิมพ์ `/go-live` เพื่อ deploy ขึ้น Vercel"*
/ *"Setup complete — everything works locally. Type `/go-live` to deploy to Vercel."*
