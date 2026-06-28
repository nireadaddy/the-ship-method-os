---
description: Add a new pricing plan — creates the Stripe product, updates config.ts, and wires it to the billing page.
argument-hint: "[plan name]"
---

You are adding a new pricing plan. This requires changes in three places: Stripe, `config.ts`, and optionally the DB schema if seats/limits are needed.

Read `config.ts` → `PLANS` to see existing plans first.

Argument (plan name hint): "$ARGUMENTS"

Ask the user — one at a time:

1. **Plan name** — e.g. "Starter", "Business", "Enterprise" (use `$ARGUMENTS` if provided)
2. **Monthly price** — in USD
3. **Annual price** — in USD (suggest ~20% discount off monthly × 12)
4. **Features** — list the features included (bullet by bullet, ask "anything else?" after each)
5. **Who can access gated content?** — same as Pro, or a new tier?

Once you have the answers:

### Step 1 — Create on Stripe

Tell the user:

> "Go to Stripe Dashboard (Test mode) → Products → Add product → name it '[plan name]' → add two prices: $[monthly]/month recurring and $[annual]/year recurring → copy both price IDs."

Wait for price IDs.

### Step 2 — Update config.ts

Add to `PLANS` in `config.ts`:

```ts
[planKey]: {
  key: "[planKey]",
  name: "[Plan Name]",
  price: { monthly: [X], annual: [Y] },
  stripePriceId: {
    monthly: "[price_monthly_id]",
    annual:  "[price_annual_id]",
  },
  features: [
    "[feature 1]",
    "[feature 2]",
    // ...
  ],
},
```

Also add the new Stripe price IDs to `.env.local` and `.env.example`:
```
STRIPE_[PLANKEY]_MONTHLY_PRICE_ID=price_...
STRIPE_[PLANKEY]_ANNUAL_PRICE_ID=price_...
```

### Step 3 — Update Stripe webhook

In `app/api/webhooks/stripe/route.ts`, make sure `planFromPriceId()` maps the new price IDs to the new plan key.

### Step 4 — Test

- Restart dev server
- Go to /billing — confirm the new plan appears
- Click upgrade — confirm Stripe checkout opens with the right price
- Complete with test card 4242 4242 4242 4242 — confirm plan updates in /dashboard

Done: "New '[Plan Name]' plan is live at $[monthly]/mo. Type `/go-live` when ready to push to production."
