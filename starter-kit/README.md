# SHIP Starter Kit

This is the code foundation for **The SHIP Method OS** — a Next.js 16 (App
Router) + TypeScript + Tailwind CSS starter that gives every downstream agent
a consistent, working UI shell to build on top of.

It is currently **mock-data only**. Backend code (`lib/db/`, `lib/auth.ts`,
`lib/storage.ts`) is included but has no live database connection configured
by default. Every list, table, and metric you see is sourced from
`lib/mock-data.ts`. That's intentional: the goal of this layer is a correct,
consistent shared foundation (design tokens, primitives, layout) that other
agents can build real features on without re-deciding button styles or color
values per screen.

## Running it

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The root page (`app/page.tsx`) is a
"pick your area" index linking to the three route groups below.

## Route groups (built by other agents on top of this foundation)

- **`/sale`** — the public-facing offer/sale page (headline, pitch, pricing,
  CTA).
- **`/member`** — the logged-in member area (course access, progress,
  account).
- **`/backoffice`** — the internal admin console (member management,
  metrics, ops tools).

None of these route directories exist yet in this scaffold — they'll be
added as `app/(sale)/`, `app/(member)/`, `app/(backoffice)/` (or similar)
route groups by the agents responsible for each area. They should reuse the
shared primitives in `components/ui/` and the `cn()` helper in
`lib/utils.ts` rather than introducing new component patterns.

## What's already here

- `app/` — root layout, global styles (Tailwind + shadcn-style CSS
  variables for light/dark themes), and the index page.
- `components/ui/` — Button, Card, Input, Badge, Table, Avatar, Tabs —
  shadcn/ui-pattern primitives built on Radix UI + class-variance-authority.
- `lib/utils.ts` — the standard `cn()` class-merging helper.
- `lib/mock-data.ts` — typed mock `users`, `members` (course/content), and
  `metrics` arrays shared across all three route groups.
- Design tokens (colors, radius) in `app/globals.css` and
  `tailwind.config.ts` are pulled from
  `../12-DESIGN-SYSTEM/DESIGN_SYSTEM.md` Section 4 (Color System).

## Next step: real data

This kit ships with a real, pluggable backend in `lib/db/`, `lib/auth.ts`,
and `lib/storage.ts` — but it has no live database connection configured
yet. To turn it on:

1. Copy `.env.example` to `.env` and pick a `DB_PROVIDER`: `supabase`,
   `neon`, `cloudflare-d1`, or `postgres`. Read
   `../13-TECH-STACK/DB_PROVIDER_GUIDE.md` first if you're unsure which —
   it covers free-tier limits and which providers can deploy where.
2. Fill in that provider's connection details in `.env` (see the comments
   in `.env.example`).
3. Run `npx drizzle-kit generate` then apply the generated migration to
   create the `user`/`account`/`session`/`verificationToken` tables.
4. Add at least one Auth.js provider (OAuth or credentials) to the empty
   `providers: []` array in `lib/auth.ts` — auth won't work until you do.
5. Replace the contents of `lib/mock-data.ts` (or its call sites) with
   real queries against `getDb()` from `lib/db`.

Before writing your own tables, also read
`../03-INSTRUCTION/DATABASE_SPEC.md` for the schema-design template this
app's data model should follow.
