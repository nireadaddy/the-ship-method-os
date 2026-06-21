# Pluggable Backend Core — Design

**Date:** 2026-06-21
**Status:** Approved

## Problem

The SHIP Method OS currently treats Supabase as *the* backend — `13-TECH-STACK/TECH_STACK.md` §4 documents only Supabase, and `starter-kit/` ships with no backend wiring at all (everything reads from `lib/mock-data.ts`). The user wants the backend to be a real, swappable core of the system: pick a DB provider (Supabase, Neon, Cloudflare D1, or plain Postgres), default to each provider's free tier, and have a documented path to scale.

## Goals

- Let a project pick its DB provider once, at setup, via a single env var.
- Support Supabase, Neon, Cloudflare D1, and plain (any-host) Postgres.
- Auth works the same way regardless of provider (Auth.js), since only Supabase bundles auth natively.
- Storage is left as a documented stub/interface, not implemented for every provider — wiring a specific storage backend is a follow-up, provider-specific decision.
- Update the doc layer (`13-TECH-STACK/`, `03-INSTRUCTION/DATABASE_SPEC.md`) so the decision is documented, not just coded.

## Non-goals

- Runtime switching between providers (a project commits to one provider at setup, not per-request).
- Implementing Storage for every provider — only Supabase Storage gets a real implementation; R2/Vercel Blob are left as stubs with setup notes.
- A schema that is 100% identical across SQL dialects — Postgres and SQLite (D1) get separate schema files, not one generated source. Unifying them would either lose Postgres-specific types or break on D1.

## Architecture

**ORM: Drizzle.** Chosen over Prisma (D1 support still experimental via driver adapters, heavier runtime, weaker edge-runtime fit) and over raw per-provider SQL (no type safety, ~4x hand-written code for an MVP starter kit). Drizzle has first-class drivers for all four targets and is lightweight enough for edge runtimes.

**Auth: Auth.js (`next-auth@beta`) + `@auth/drizzle-adapter`.** Auth.js's Drizzle adapter works against both the pg and sqlite dialects, so the auth layer doesn't change based on provider choice — only the underlying Drizzle client it's handed does.

**Provider selection:** one `DB_PROVIDER` env var (`supabase | neon | cloudflare-d1 | postgres`), read once in `lib/db/index.ts` to construct the right Drizzle client. This is a setup-time decision, not a runtime branch the app re-evaluates per request.

### Dialect split (important constraint)

Postgres-family providers (Supabase, Neon, plain Postgres) share one Drizzle schema (`pg-core`) because they're all real Postgres underneath. Cloudflare D1 is SQLite and needs a separate schema (`sqlite-core`) — no native `uuid`, `jsonb`, etc. Two schema files are maintained by hand:

- `lib/db/schema.pg.ts` — used by `supabase`, `neon`, `postgres`
- `lib/db/schema.sqlite.ts` — used by `cloudflare-d1`

They are kept *conceptually* in sync (same entities, same relationships) but are not derived from each other.

### Deployment constraint (must be documented, not just coded)

Cloudflare D1 only works if the Next.js app itself deploys to Cloudflare Workers/Pages (via `@opennextjs/cloudflare`), not Vercel. Picking D1 then deploying to Vercel will not work. This gets called out explicitly in `DB_PROVIDER_GUIDE.md` and in `.env.example` comments.

## File changes

### `starter-kit/` (code)

```
lib/db/
  index.ts            # reads DB_PROVIDER, returns the right Drizzle client instance
  schema.pg.ts         # Drizzle pg-core schema (supabase | neon | postgres)
  schema.sqlite.ts      # Drizzle sqlite-core schema (cloudflare-d1)
lib/auth.ts            # Auth.js config using @auth/drizzle-adapter against lib/db
lib/storage.ts          # Storage interface; Supabase Storage implemented, R2/Blob stubbed with TODO + links
drizzle.config.ts       # dialect/connection picked based on DB_PROVIDER, for `drizzle-kit` migrations
.env.example            # DB_PROVIDER switch + one connection-var block per provider, commented
```

`package.json` additions:
- `drizzle-orm`, `drizzle-kit`
- `next-auth@beta`, `@auth/drizzle-adapter`
- `postgres` (driver for supabase/neon-via-pg/plain postgres), `@neondatabase/serverless` (Neon's HTTP driver path)
- `@cloudflare/workers-types` (devDependency, only exercised on the D1 path)

`starter-kit/README.md`: replace the current "Next step: real data" section (which assumes Supabase) with a "Choosing your database" section pointing at `DB_PROVIDER_GUIDE.md` and explaining the `DB_PROVIDER` env var.

### Docs

- **`13-TECH-STACK/TECH_STACK.md` §4 (Backend):** rewritten from Supabase-only to present the 4-way choice, each with what it covers (DB only vs. DB+auth+storage) and a pointer to the new guide.
- **New `13-TECH-STACK/DB_PROVIDER_GUIDE.md`:** comparison table — free tier ceiling, what's bundled (auth/storage), deploy-target compatibility, the concrete signal that means "you've outgrown the free tier" per provider — plus a recommendation per product type that links back to `STACK_DECISION_MATRIX.md`.
- **`03-INSTRUCTION/DATABASE_SPEC.md` §6 (Migration Strategy):** tooling line updated to `drizzle-kit` consistently (currently lists Supabase CLI / Prisma / Drizzle Kit as alternatives — make Drizzle Kit the stated default to match the code).

## Testing / verification

- `npm install` succeeds in `starter-kit/` with the new dependencies.
- For each of the 4 `DB_PROVIDER` values, `lib/db/index.ts` constructs a client without throwing (driver-level smoke test, not a live DB connection — no live credentials are assumed to exist in this environment).
- `drizzle-kit` migration generation runs cleanly against both `schema.pg.ts` and `schema.sqlite.ts`.
- Docs cross-references resolve (links between `TECH_STACK.md`, `DB_PROVIDER_GUIDE.md`, `STACK_DECISION_MATRIX.md`, `DATABASE_SPEC.md` all point to real files/sections).
