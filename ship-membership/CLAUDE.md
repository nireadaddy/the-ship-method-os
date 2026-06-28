# SHIP Membership — Agent Rules

This is a **white-label membership backend** built with the SHIP Method.
It lets any product owner deploy their own membership site with admin panel, member portal, and Stripe subscriptions — without writing infrastructure code.

## Quick Orientation

Read these three files first, in order:

1. `config.ts` — product name, plans, content items, admin IDs (the only file users need to customize)
2. `.env.example` — all required environment variables
3. `lib/db/schema.ts` — database structure (users + content_access)

## Architecture

| Area | Path | Who uses it |
|------|------|-------------|
| Public site | `app/(marketing)/` | Visitors |
| Auth | `app/(auth)/` | Sign in / sign up via Clerk |
| Member portal | `app/(member)/` | Paying & free members |
| Admin panel | `app/admin/` | Product owner (IDs in config.ts) |
| Stripe webhooks | `app/api/webhooks/stripe/` | Stripe → updates DB |
| Config | `config.ts` | Everything white-label lives here |

## Slash Commands

| Command | What it does |
|---------|-------------|
| `/setup` | Full guided setup — Clerk → Supabase → Stripe → config → test locally |
| `/go-live` | Deploy to Vercel, set env vars, wire Stripe webhook, smoke test |
| `/add-content` | Add a new content item to config.ts with the right tier and type |
| `/add-plan` | Add a new Stripe plan and update config.ts + UI |

## Rules for Any AI Working Here

1. **Always read `config.ts` first** — product name, plans, and content live there. Don't hardcode these values anywhere else.
2. **Never store secrets in code.** All keys go in `.env.local` (gitignored). If a key is missing, prompt the user to add it.
3. **Admin access is Clerk user ID based** — check `PRODUCT.adminUserIds` in config.ts. Don't add role columns to the DB.
4. **Stripe webhook is the source of truth for plan changes** — don't update `users.plan` anywhere except `app/api/webhooks/stripe/route.ts`.
5. **Content access is controlled by `canAccess()` in config.ts** — don't add access checks anywhere else.
6. **If asked to add a new plan**: create it in config.ts → create the Stripe product/price → add the price ID to config.ts. In that order.
