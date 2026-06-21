# TECH_SPEC.md

**Phase:** I — Instruction
**Purpose:** The architecture decision record for the build. Where `AI_BUILD_SPEC.md` says *what* to build, this file locks in *how* it's built and *why* — so every AI prompt afterward generates code that fits one coherent system instead of five incompatible ones.

> Fill every bracket. Revisit this file any time you're tempted to add a new tool/service mid-build — if it's not in this doc, ask "why am I introducing this now?" before you do.

---

## 1. Chosen Stack

| Layer | Choice | Version/Notes |
|---|---|---|
| Frontend | [e.g. Next.js] | [e.g. 14, App Router] |
| Styling/UI kit | [e.g. Tailwind CSS + shadcn/ui] | |
| Backend | [e.g. Next.js Route Handlers / NestJS / Supabase Edge Functions] | |
| Database | [e.g. PostgreSQL] | [e.g. via Supabase] |
| Auth | [e.g. Supabase Auth / Clerk / NextAuth] | |
| Payments | [e.g. Stripe] | [e.g. Checkout + Billing Portal] |
| Hosting | [e.g. Vercel] | |
| File/asset storage | [e.g. Supabase Storage / S3] | |
| Background jobs | [e.g. Supabase Cron / Inngest / QStash] | |
| Email | [e.g. Resend] | |

**Worked example:**

| Layer | Choice | Version/Notes |
|---|---|---|
| Frontend | Next.js | 14, App Router, Server Components default |
| Styling/UI kit | Tailwind CSS + shadcn/ui | |
| Backend | Next.js Route Handlers | Co-located with frontend, no separate service |
| Database | PostgreSQL | Supabase-managed, RLS enabled on every table |
| Auth | Supabase Auth | Email/password + Google OAuth |
| Payments | Stripe | Checkout for upgrade, Billing Portal for self-serve cancel |
| Hosting | Vercel | Preview deploys per PR |
| Background jobs | Supabase Cron | Used for the reminder-dispatch job |
| Email | Resend | Transactional only, no marketing emails in MVP |

---

## 2. Architecture Diagram (text/ASCII)

> Describe the request path end to end. AI builders that can "see" the shape of the system make fewer structural mistakes than ones told to "use React and a database."

```
[Worked example — replace with your own]

                    ┌────────────────────────┐
                    │        Browser          │
                    │  Next.js Client (RSC +  │
                    │  Client Components)     │
                    └───────────┬─────────────┘
                                │ HTTPS
                    ┌───────────▼─────────────┐
                    │   Vercel Edge / Node     │
                    │  Next.js Route Handlers  │
                    │  (API: /api/*)           │
                    └───────────┬─────────────┘
                                │ Supabase client (service role
                                │ for server, anon+RLS for client)
                    ┌───────────▼─────────────┐
                    │   Supabase Postgres      │
                    │  (RLS on every table)    │
                    └───────────┬─────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                  │
    ┌─────────▼──────┐ ┌────────▼───────┐ ┌────────▼───────┐
    │  Supabase Auth  │ │  Supabase Cron │ │  Stripe Webhook │
    │  (sessions/JWT) │ │ (reminder job) │ │  (subscription) │
    └─────────────────┘ └───────┬────────┘ └─────────────────┘
                                │
                       ┌────────▼────────┐
                       │  Resend (email) │
                       └─────────────────┘
```

**Your diagram:**
```
[Replace with your system's request path — client → server/API → database →
 external services. Keep it ASCII so it pastes cleanly into any AI chat.]
```

---

## 3. Key Technical Decisions

| Decision | Options Considered | Choice | Rationale |
|---|---|---|---|
| [e.g. Monolith vs. microservices] | [option A, option B] | [chosen] | [why] |
| | | | |

**Worked example:**

| Decision | Options Considered | Choice | Rationale |
|---|---|---|---|
| App architecture | Monolith (Next.js full-stack) vs. separate API service | Monolith | Solo builder, MVP scale, fewer moving parts to deploy/debug |
| Auth provider | Supabase Auth vs. Clerk vs. NextAuth | Supabase Auth | Already using Supabase for DB; avoids syncing two user tables |
| Multi-tenancy model | Separate DB per org vs. shared DB with `org_id` + RLS | Shared DB + RLS | Cheaper at MVP scale; RLS gives real isolation without infra overhead |
| State management | Redux vs. React Query/SWR + server state | React Query | Most app state is server data; avoids redundant client store |
| Background jobs | Self-hosted worker vs. Supabase Cron vs. Inngest | Supabase Cron | One due-reminder check every 5 min is too simple to justify Inngest cost/complexity |

---

## 4. Third-Party Integrations

| Service | Purpose | Critical to MVP? | Notes |
|---|---|---|---|
| [Stripe] | [billing] | [Yes/No] | [webhook events needed, test mode plan] |
| [Resend] | [transactional email] | | |
| [PostHog/Plausible] | [analytics] | | |

**Worked example:**

| Service | Purpose | Critical to MVP? | Notes |
|---|---|---|---|
| Stripe | Subscription billing | Yes | Need `checkout.session.completed`, `customer.subscription.deleted` webhooks |
| Resend | Reminder + welcome emails | Yes | Domain verification required before going live |
| PostHog | Product analytics (activation funnel) | No (V1) | Add after MVP validates core loop |

---

## 5. Scalability / Performance Budget

| Metric | Budget | Notes |
|---|---|---|
| Concurrent users (MVP target) | [e.g. 500] | |
| API p95 latency | [e.g. < 300ms] | |
| DB connection strategy | [e.g. pooled via Supabase pgbouncer] | |
| Largest expected table + row count at 12mo | [table: rows] | |
| Caching strategy | [e.g. ISR for marketing pages, no cache on dashboard data] | |
| CDN/static assets | [e.g. Vercel Edge Network] | |

**Worked example:**

| Metric | Budget | Notes |
|---|---|---|
| Concurrent users (MVP target) | 500 | Single Vercel region acceptable |
| API p95 latency | < 300ms for CRUD endpoints | Measured via Vercel Analytics |
| DB connection strategy | Supabase pooled connection (pgbouncer transaction mode) | Avoid exhausting connections from serverless functions |
| Largest expected table at 12mo | `leads`: ~2M rows across all orgs | Needs index on `(org_id, created_at)` |
| Caching strategy | ISR (60s) for public pages, no cache on `/app/*` | |

---

## 6. Security Considerations Checklist

- [ ] Row-Level Security (RLS) enabled on every table containing tenant data
- [ ] All secrets (API keys, service-role keys) stored in environment variables, never in client bundle
- [ ] Auth tokens use short-lived JWTs + secure refresh flow
- [ ] All user input validated server-side (not just client-side form validation)
- [ ] Rate limiting on public/auth endpoints (login, signup, password reset)
- [ ] Stripe webhook signatures verified before processing
- [ ] CORS restricted to known origins on any public API
- [ ] No PII or secrets logged to console/log aggregator
- [ ] Dependency audit run before launch (`npm audit` / `pnpm audit`)
- [ ] HTTPS enforced everywhere (no mixed content)
- [ ] File uploads validated for type/size, scanned or restricted by bucket policy
- [ ] Admin/internal routes gated by role check, not just "logged in"
- [ ] [Add your own as risks surface — this list is a floor, not a ceiling]

---

**Next step:** Pair this file with `DATABASE_SPEC.md` for full schema detail, then feed both into the Technical Spec and Build Plan stages of [`PROMPTS.md`](./PROMPTS.md).
