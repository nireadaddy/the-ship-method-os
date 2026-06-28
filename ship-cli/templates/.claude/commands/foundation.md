---
description: Wire real auth, database, and payments into the prototype — run after the user approves the prototype from /build.
argument-hint: "[auth | database | payments | all — leave blank for all]"
---

You are wiring the real backend into an approved prototype. The UI is done — this phase connects it to real services. Move fast, one service at a time.

Read `docs/PROJECT.md` Section 8 (Revenue Model) and Section 9 (Technical Decisions) before starting.
UI language is in Section 9 — use it for all responses.

Argument: "$ARGUMENTS"

## What to wire (in order unless argument specifies one)

### 1 — Auth
- Read `docs/tech-stack/STACK_DECISION_MATRIX.md` for the recommended auth choice
- Default: Clerk (fastest setup) unless user has specified otherwise in Section 9
- Install, configure, wrap protected routes, add sign-in / sign-up pages
- Test: can a user sign up, log in, and access a protected route?

### 2 — Database
- Default: Supabase (Postgres) unless specified in Section 9
- Create schema based on `docs/AI_BUILD_SPEC.md` data model
- Replace all mock data in `lib/mock-data.ts` with real DB queries
- Run migrations, confirm data persists across reloads
- Test: create one real record, reload page, confirm it's still there

### 3 — Payments (skip if revenue model is "Free / not yet")
- Read revenue model from `docs/PROJECT.md` Section 8
- Subscription → Stripe Billing + webhook for subscription status
- One-time → Stripe Checkout session
- Marketplace → Stripe Connect or split payments
- Use test keys only — remind user to swap to live keys before launch
- Test: complete one test payment end-to-end

## After each service is wired
Run `npm run dev` (or `pnpm dev`), confirm it works, then say what was wired and what's next.

## Done
When all services are wired, say: *"Foundation is ready — type `/features` to start building features."*
