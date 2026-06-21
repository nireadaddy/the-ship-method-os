# DB_PROVIDER_GUIDE.md

**Phase:** S — Structure
**Purpose:** Pick a database provider for `starter-kit/`'s `DB_PROVIDER` env var. All four start free; this is about which free tier fits your product and what happens when you outgrow it.

---

## Quick comparison

| | Supabase | Neon | Cloudflare D1 | Plain Postgres |
|---|---|---|---|---|
| **Free tier** | 500MB DB, 1GB storage, 50K monthly active users (auth) | 0.5GB storage, 1 project, scale-to-zero compute | 5GB storage, 5M rows read/day | Depends entirely on host — many hosts (Railway, Fly) have no permanent free tier |
| **Bundles auth?** | Yes (Supabase Auth) | No — use Auth.js (already wired in `lib/auth.ts`) | No — use Auth.js | No — use Auth.js |
| **Bundles storage?** | Yes (Supabase Storage, already wired in `lib/storage.ts`) | No | No | No |
| **Deploy target** | Any (Vercel, Cloudflare, self-host) | Any | **Cloudflare Workers/Pages only** | Any |
| **Outgrow signal** | DB > 500MB or > 50K MAUs — upgrade to Pro ($25/mo) | Storage > 0.5GB or need >1 project — upgrade to a paid plan | Reads > 5M/day or storage > 5GB — upgrade to paid D1 | Whatever your host's free-tier cap is |

## Which one to pick

- **Default to Supabase** if you're not sure. One platform for DB + auth + storage means less to wire up and fewer free-tier ceilings to track separately.
- **Pick Neon** if you specifically want serverless Postgres with database branching per preview deploy (e.g. a branch-per-PR workflow on Vercel), and you're fine wiring auth/storage yourself — both are already wired via Auth.js / the storage interface, just point them elsewhere.
- **Pick Cloudflare D1** only if this project is already deploying to Cloudflare Workers/Pages via `@opennextjs/cloudflare`. D1 will not work if you deploy to Vercel — there is no connection string for it; the database binding only exists inside the Cloudflare runtime.
- **Pick plain Postgres** if you already have a Postgres host for other reasons (e.g. consolidating infra) and don't want another vendor account.

## Scaling path

All four follow the same shape: start on the free tier, and the moment you hit the "Outgrow signal" in the table above, that provider's paid tier is a config change (new connection string / plan upgrade), not a migration to a different provider. You only need to actually switch providers if you picked Cloudflare D1 and later need to deploy somewhere other than Cloudflare, or if you picked a provider's free tier and the paid tier no longer makes business sense at your scale.

## Next step

Once you've picked a provider, set `DB_PROVIDER` in `starter-kit/.env` (copy from `.env.example`) and follow `starter-kit/README.md`'s "Next step: real data" section. For the data model itself (which tables, fields, relationships your product needs beyond the auth tables this kit already includes), use [`../03-INSTRUCTION/DATABASE_SPEC.md`](../03-INSTRUCTION/DATABASE_SPEC.md). For whether your product type needs this backend at all, check [`STACK_DECISION_MATRIX.md`](./STACK_DECISION_MATRIX.md) first.
