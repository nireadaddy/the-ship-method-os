# TECH_STACK.md

**Phase:** S — Structure
**Purpose:** The default, recommended technical stack for every product built under The SHIP Method OS. Other files in this repo (architecture briefs, build prompts, the decision matrix) assume this stack unless a project explicitly deviates. You don't need to know how any of these tools work internally — you need to know *what each one is for*, *whether it fits your product*, and *what to paste into ChatGPT/Claude/Gemini/Cursor/Windsurf* to set it up correctly.

> This is a **default**, not a law. `STACK_DECISION_MATRIX.md` tells you when to swap a piece out (e.g. a landing page doesn't need Supabase). When in doubt, ship with the default — it is chosen specifically because AI tools have the most training data and the fewest hallucinated APIs for these exact tools.

---

## How to read this file

For each layer: **What it's for** → **Best fit** → **Pros** → **Limitations** → a ready-to-paste **AI Prompt** to scaffold or configure it. Replace every `[bracket]` before pasting.

---

## 1. Frontend — Next.js

**What it's for:** The framework that renders your product's pages and UI in the browser — buttons, forms, dashboards, navigation, everything the user sees and clicks.

**Best fit for:** SaaS, dashboards, membership sites, marketplaces, booking systems, internal tools, lead-gen sites — effectively everything except a single static page (where plain HTML may be simpler).

**Pros:**
- Most widely used React framework — every AI tool has deep training data on it, fewer hallucinated APIs
- One codebase serves marketing pages, app pages, and API routes — no separate backend needed for simple products
- Deploys natively to Vercel with zero config
- Built-in routing, image optimization, and server-side rendering for SEO

**Limitations:**
- Steeper learning curve than plain HTML if you ever need to read the code yourself
- Server/client component split (App Router) confuses AI tools occasionally — always specify which you want
- Overkill for a true one-page static landing page with no logic

**AI Prompt — Scaffold a Next.js app:**
```
Scaffold a new Next.js application for [product name/description].

Requirements:
- Next.js (latest stable, App Router)
- TypeScript
- Tailwind CSS pre-configured
- Folder structure: /app for routes, /components for shared UI, /lib for utilities, /types for shared types
- A basic layout with header and footer placeholder
- Environment variable setup for: [list known env vars, e.g. Supabase URL/key, Stripe key]

Output:
1. Full folder/file structure
2. Contents of every config file (next.config, tsconfig, tailwind config)
3. A starter page.tsx that confirms the app runs
4. The exact terminal commands to install and run it locally

Do not add any UI library, state management library, or backend integration I haven't asked for — keep this scaffold minimal and clean.
```

---

## 2. Styling — Tailwind CSS

**What it's for:** Controls the visual design — spacing, color, layout, responsiveness — written directly as classes in your markup instead of separate CSS files.

**Best fit for:** Every product type. It is the default styling layer across the entire stack.

**Pros:**
- AI tools are extremely fluent in Tailwind — it's the most common styling approach in their training data
- No separate CSS files to keep in sync; styling lives next to the markup
- Built-in responsive design utilities (`sm:`, `md:`, `lg:`)
- Pairs natively with shadcn/ui

**Limitations:**
- Markup can look cluttered with long class lists — not a problem if you're not reading the code yourself
- Requires a build step (already handled by Next.js)
- Custom design systems still need a defined theme (colors, fonts) or output will look generic — see `12-DESIGN-SYSTEM/`

**AI Prompt — Configure Tailwind theme:**
```
Configure Tailwind CSS for this Next.js project with a custom design theme.

Brand inputs:
- Primary color: [hex code or "pick one that fits a {industry} SaaS product"]
- Secondary/accent color: [hex code or let AI propose 1]
- Font for headings: [name, or "recommend one"]
- Font for body text: [name, or "recommend one"]
- Border radius style: [sharp / soft-rounded / pill-rounded]

Output:
1. Updated tailwind.config (or CSS-based theme tokens if using Tailwind v4) with the colors above as named tokens (e.g. `primary`, `accent`), not hardcoded hex values used directly in components
2. Font loading setup (next/font or equivalent) for the chosen fonts
3. A short style guide comment block listing every token and when to use it
4. One example component (a button) using only the new tokens, to confirm the theme works
```

---

## 3. UI Components — shadcn/ui

**What it's for:** Pre-built, accessible UI components (buttons, dialogs, dropdowns, forms, tables) that you own and can edit — not a locked-in component library you import as a black box.

**Best fit for:** SaaS, dashboards, internal tools, CRMs, membership sites — any product with forms, tables, and interactive UI beyond a marketing page.

**Pros:**
- Components are copied into your codebase, not installed as a dependency — AI tools can read and edit the actual component code
- Built on Radix UI primitives — accessibility (keyboard nav, ARIA) handled correctly by default
- Matches Tailwind natively, no styling conflicts
- Huge ecosystem of extra blocks/templates that extend it

**Limitations:**
- Not a true "package" — updates to the library don't auto-update your copied components
- Requires Tailwind + a few setup steps before first use (not zero-config)
- Overkill for a pure marketing/landing page with no interactive elements

**AI Prompt — Add and configure shadcn/ui:**
```
Set up shadcn/ui in this existing Next.js + Tailwind project.

Steps to perform:
1. Run the shadcn/ui init process and configure it to match this project's existing folder structure (components in /components/ui)
2. Install these components: [list, e.g. "button, input, dialog, dropdown-menu, card, table, form, toast"]
3. Confirm the theme tokens from our Tailwind config (see tailwind config) are wired into shadcn's CSS variables, not left as shadcn's defaults

Output:
1. The exact CLI commands to run
2. Any config file changes (components.json, globals.css)
3. A confirmation checklist: which components were added and where they live
4. One example page combining 3 of the installed components, styled with our brand tokens
```

---

## 4. Backend — Supabase

**What it's for:** The backend-as-a-service that gives you a database, authentication, file storage, and auto-generated APIs without writing or hosting your own server.

**Best fit for:** SaaS, CRM, dashboards, membership sites, booking systems, directories, internal tools — any product that needs to store and query user data, accounts, or permissions.

**Pros:**
- One platform covers database + auth + storage + realtime — fewer services to wire together
- Auto-generated REST and client libraries from your schema — less hand-written backend code
- Row Level Security (RLS) lets you enforce "who can see/edit what" at the database level, not just in app code
- Free tier is generous enough for a real MVP

**Limitations:**
- RLS policies are easy to get wrong if you don't ask AI tools to generate and explain them explicitly — a missing policy can expose data publicly
- Not ideal for extremely complex custom backend logic (long-running jobs, heavy compute) — pair with Edge Functions or a separate worker for that
- Vendor lock-in is moderate — migrating off Supabase later means rebuilding auth + RLS elsewhere

**AI Prompt — Set up a Supabase project:**
```
Help me set up Supabase for [product name/description].

Data this product needs to store: [list entities in plain English, e.g. "users, their workspaces, projects inside workspaces, tasks inside projects"]
Who can see/edit what: [describe access rules in plain English, e.g. "users can only see workspaces they belong to; only the workspace owner can delete it"]

Output:
1. A plain-English data model (one paragraph per entity, relationships explained simply)
2. The SQL to create these tables in Supabase, with appropriate foreign keys and indexes
3. Row Level Security (RLS) policies for every table, written out as SQL, with a plain-English explanation of what each policy actually allows/blocks
4. A checklist of things to verify in the Supabase dashboard after running this (e.g. "confirm RLS is enabled, not just policies written")

Flag explicitly if any access rule I described is ambiguous before writing the policy for it — do not guess at security rules.
```

---

## 5. Database — PostgreSQL

**What it's for:** The actual database engine underneath Supabase that stores all your product's data in structured tables.

**Best fit for:** Every product type using Supabase (it comes bundled — you rarely choose this separately).

**Pros:**
- Industry-standard relational database — best-documented, most AI-training-data-rich database there is
- Supports complex queries, relationships, and constraints that keep data consistent
- Free, open-source, no licensing cost ever

**Limitations:**
- Relational schema design requires some planning up front — bad schema design compounds into pain later (see `AI_STACK_PROMPTS.md` for a schema-generation prompt)
- Not the right choice for pure document/unstructured data at extreme scale (rare for SHIP Method products)

**AI Prompt — Review/normalize a schema:**
```
Review this database schema for normalization and integrity issues. Target: PostgreSQL (via Supabase).

Schema (as plain English or paste existing SQL): [paste]

Check for:
1. Repeated/duplicated data that should be a separate table
2. Missing foreign key constraints
3. Missing indexes on columns that will likely be filtered/sorted/joined on
4. Nullable columns that should probably be required
5. Missing created_at/updated_at audit columns

Output: a list of issues found (or confirmation none exist), followed by the corrected SQL.
```

---

## 6. Authentication — Supabase Auth

**What it's for:** Handles user sign-up, login, password reset, social login (Google, etc.), and session management — without you building any of that from scratch.

**Best fit for:** Any product with user accounts: SaaS, CRM, membership sites, booking systems, dashboards, internal tools.

**Pros:**
- Built directly into Supabase — no separate service or extra integration to wire up
- Supports email/password, magic links, and OAuth providers (Google, GitHub, etc.) out of the box
- Ties directly into Row Level Security — `auth.uid()` is available in every policy

**Limitations:**
- Default email templates are plain — plan to customize them before launch (looks unpolished otherwise)
- Multi-tenant permission logic (e.g. "admin vs. member vs. viewer" inside one workspace) is on you to design via RLS, not provided automatically
- Self-hosting email sending for auth at scale eventually needs a custom SMTP provider (or pair with Resend)

**AI Prompt — Build an auth flow:**
```
Implement authentication for [product name] using Supabase Auth in this Next.js (App Router) project.

Requirements:
- Sign-up and login with: [email/password / Google OAuth / magic link — list which]
- After login, redirect to: [page/route]
- Protect these routes so only logged-in users can access them: [list routes]
- Role/permission levels needed (if any): [e.g. "owner, admin, member" — or "none, single role for now"]

Output:
1. The auth setup code (client + server, matching App Router conventions)
2. Middleware or route protection logic for the protected routes listed
3. The RLS policy changes needed in Supabase to match these roles, if any
4. A plain checklist of manual steps to do in the Supabase dashboard (enabling providers, setting redirect URLs)

Flag anywhere you had to assume a behavior I didn't specify (e.g. what happens on failed login) rather than silently picking one.
```

---

## 7. File Storage — Supabase Storage

**What it's for:** Stores and serves files — profile photos, uploaded documents, product images — with the same permission system as your database.

**Best fit for:** Any product with file/image uploads: directories, marketplaces, membership sites, CRMs, internal tools with document upload.

**Pros:**
- Same project, same auth, same RLS-style access rules as your database — one mental model
- Built-in image transformation (resizing) for common cases
- Public and private buckets supported natively

**Limitations:**
- Large-scale media-heavy products (e.g. a video platform) may eventually outgrow it and need a dedicated CDN/storage provider
- Storage policies are separate from table RLS policies — easy to forget to lock down a bucket

**AI Prompt — Set up file upload with storage rules:**
```
Set up file upload for [feature, e.g. "user profile photos" / "document uploads in a CRM"] using Supabase Storage in this Next.js project.

Requirements:
- File types allowed: [e.g. "jpg, png only" / "pdf, docx, jpg"]
- Max file size: [e.g. "5MB"]
- Who can upload: [e.g. "any logged-in user, only to their own folder"]
- Who can view/download: [e.g. "only the uploader and admins"]

Output:
1. Bucket setup (public or private, and why)
2. Storage policies (SQL) enforcing the upload/view rules above, in plain English first then as SQL
3. The upload component/function code (client-side) with file-type and size validation before upload
4. Error handling for: file too large, wrong file type, upload failure, network failure
```

---

## 8. Deployment — Vercel

**What it's for:** Hosts your live, deployed product on the internet, builds it automatically from your code, and gives you a URL — including preview URLs for every change before it goes live.

**Best fit for:** Every product type built with Next.js. This is the native deployment target.

**Pros:**
- Zero-config deployment for Next.js — built by the same team
- Automatic preview deployments per branch/commit — test before merging to production
- Built-in analytics, edge functions, and image optimization
- Free tier sufficient for most MVPs and early-stage products

**Limitations:**
- Costs scale with traffic/bandwidth — watch usage once you have real users
- Long-running background jobs (e.g. heavy batch processing) need a separate worker, not Vercel functions
- Custom domain + DNS setup still requires a few manual steps outside any AI tool

**AI Prompt — Plan and prep a deployment:**
```
I'm about to deploy [product name] (Next.js + Supabase) to Vercel for the first time. Help me prepare.

Output:
1. A pre-deployment checklist: environment variables needed (list what to find from Supabase, Stripe, etc. and where), build command, any config that differs between local and production
2. The exact steps to connect this repo to Vercel and deploy
3. How to set up a custom domain and what DNS records to expect
4. What to verify immediately after the first deploy (e.g. "test signup flow on the live URL, not just locally")
5. One rollback instruction in case the deploy breaks something — how to revert to the previous working deployment in Vercel specifically
```

---

## 9. Analytics — PostHog or Plausible

**What it's for:** Tracks how real users behave in your product — what they click, where they drop off, which features get used — so you can make decisions with data instead of guesses.

**Best fit for:**
- **PostHog** — SaaS, dashboards, products needing event-level funnels, feature flags, session replay
- **Plausible** — landing pages, lead-gen sites, marketing pages needing simple, privacy-friendly pageview/traffic stats without cookie banners

**Pros:**
- PostHog: free self-serve tier, funnels, feature flags, and session replay in one tool — good for product-led growth decisions
- Plausible: extremely lightweight script, no cookie consent banner required in most jurisdictions, dead simple dashboard

**Limitations:**
- PostHog: more setup than you need if you only want pageviews — don't reach for it on a pure landing page
- Plausible: no event-level funnel/behavior tracking — not enough once you need to understand in-app usage, not just traffic

**AI Prompt — Add analytics tracking:**
```
Add [PostHog / Plausible] analytics to this Next.js project.

What I need to track: [list key events, e.g. "signup completed, first project created, upgrade to paid plan" for PostHog — or "just pageviews and top referral sources" for Plausible]

Output:
1. Installation steps (script/SDK setup for Next.js App Router)
2. Where to place the tracking code so it fires correctly (client vs server, layout vs page)
3. The exact event-tracking code for each event listed above, with a clear event name and any properties worth attaching
4. A short note on what NOT to track (avoid logging personal data like raw emails/names as event properties)
```

---

## 10. Error Tracking — Sentry

**What it's for:** Automatically catches and reports bugs/crashes that happen in production — so you find out about errors from real users before they email you (or before they silently leave).

**Best fit for:** SaaS, dashboards, CRMs, booking systems — any product live with real users where silent failures are costly.

**Pros:**
- Captures the full error, stack trace, and the user/session context automatically
- Free tier covers early-stage volume
- Integrates directly with Next.js and Vercel with minimal setup

**Limitations:**
- Noise: without filtering, you'll get alerted on minor/expected errors too — needs tuning after first week
- Not useful pre-launch with no real traffic — add it right before or at launch, not on day one of building

**AI Prompt — Set up error tracking:**
```
Set up Sentry error tracking for this Next.js project, deployed on Vercel.

Output:
1. Installation and config steps (Sentry's Next.js SDK)
2. Where error boundaries should be added in this app structure to catch UI errors, not just unhandled exceptions
3. How to make sure errors include useful context (current user ID if logged in, the route/page it happened on) without logging sensitive personal data
4. How to set up an alert (email/Slack) so I'm notified when a new error type appears, not on every single occurrence of an existing one
```

---

## 11. Payments — Stripe

**What it's for:** Handles charging customers — one-time payments, subscriptions, invoices — and manages the billing logic (upgrades, downgrades, cancellations, failed payments).

**Best fit for:** SaaS, membership sites, booking systems with paid bookings, any product with a paid tier.

**Pros:**
- Industry standard — best documentation and AI training data of any payment provider
- Stripe Checkout/Billing handles most subscription logic (proration, dunning, invoices) so you don't build it yourself
- Webhooks let your app stay in sync with payment events automatically

**Limitations:**
- Webhook handling is the #1 source of subtle bugs (missed events, double-processing) — always ask AI tools to make webhook handlers idempotent
- Test mode vs. live mode mistakes are common — always explicitly state which mode in prompts
- Tax/VAT handling needs Stripe Tax or a manual decision — don't assume it's automatic

**AI Prompt — Set up Stripe billing:**
```
Set up Stripe payments for [product name] using Next.js + Supabase.

Pricing model: [e.g. "two subscription tiers, $19/mo and $49/mo, both with a 7-day free trial" / "one-time payment of $X per booking"]
What happens on successful payment: [e.g. "mark user as 'pro' in the users table"]
What happens on failed payment / cancellation: [e.g. "downgrade to free tier after grace period"]

Output:
1. Stripe product/price setup steps (dashboard, in plain language)
2. Checkout session creation code (server-side) for this pricing model
3. Webhook handler code covering: checkout completed, subscription updated, subscription canceled, payment failed — and how each updates Supabase
4. Explicitly make the webhook handler idempotent (safe if Stripe sends the same event twice) and explain how
5. A test-mode checklist: which Stripe test cards to use and what each one simulates (success, decline, requires authentication)
```

---

## 12. Email — Resend

**What it's for:** Sends transactional emails — welcome emails, password resets, receipts, notifications — programmatically from your app.

**Best fit for:** SaaS, CRM, membership sites, booking systems — any product that needs to email users automatically, not just market to them.

**Pros:**
- Built for developers/AI tools to integrate quickly — simple API, good Next.js support
- Supports React-based email templates (React Email) so styling matches your app's design system
- Reasonable free tier and clear deliverability tooling (domain verification, SPF/DKIM)

**Limitations:**
- Marketing/bulk email campaigns are not its focus — pair with a dedicated ESP (e.g. for a newsletter at scale)
- Requires domain verification (SPF/DKIM records) before production sending — a manual DNS step, not something AI can do for you

**AI Prompt — Set up transactional email:**
```
Set up transactional email using Resend for [product name] (Next.js + Supabase backend).

Emails needed: [list, e.g. "welcome email on signup, password reset, booking confirmation, payment receipt"]
Brand voice for emails: [e.g. "friendly, short, matches our landing page tone" — or paste a sample]

Output:
1. Resend setup steps including domain verification requirements (what DNS records to add, in plain language)
2. A React Email template for each email listed, matching our brand colors/fonts from the Tailwind theme
3. The server-side trigger code for each email (where in the app it should be called from, e.g. "after Supabase Auth signup webhook")
4. How to avoid sending duplicate emails if a trigger fires twice (idempotency)
```

---

## 13. Automation — n8n or Make

**What it's for:** Connects your product/tools together for workflows that don't need custom code — e.g. "when a new lead fills the form, add them to the CRM, send a Slack alert, and email them a welcome sequence."

**Best fit for:**
- **n8n** — teams comfortable self-hosting or wanting full control/lower long-term cost at higher volume; more flexible, more technical
- **Make** — non-technical teams wanting a faster visual setup with no hosting to manage; better for simpler, lower-volume automations

**Pros:**
- Avoids writing/maintaining custom glue code for cross-tool workflows
- Visual builder — easy to reason about even without dev background
- Large library of pre-built integrations (Slack, Gmail, Google Sheets, CRMs, Stripe, etc.)

**Limitations:**
- Make: cost scales with operations/runs — can get expensive at volume
- n8n: self-hosted version requires basic server management; cloud version has its own cost tier
- Complex conditional logic across many steps gets hard to debug visually past a certain complexity — consider a real backend function instead

**AI Prompt — Design an automation workflow:**
```
Design an automation workflow for [n8n / Make] to handle: [describe the trigger and desired outcome in plain English, e.g. "when someone submits our signup form, create a Supabase user record, send them a welcome email via Resend, and post a notification to our team Slack channel"]

Output:
1. The trigger (what starts the workflow) and the exact data it receives
2. Each step in order, naming the specific node/module type to use (e.g. "HTTP Request node", "Supabase node", "Slack node")
3. Any data transformation needed between steps (field mapping) written out explicitly
4. Error handling: what should happen if one step fails (e.g. "if Slack notification fails, don't block the user record creation — log it separately instead")
5. A test plan: how to verify each step worked before trusting the workflow with real data
```

---

## 14. CMS — Notion / Sanity / Directus

**What it's for:** Lets non-developers (often the founder, or a content/marketing person) manage editable content — blog posts, FAQ entries, directory listings, marketing page copy — without touching code.

**Best fit for:**
- **Notion (as CMS via API)** — fastest to set up, ideal for a solo founder managing blog/changelog/FAQ content with no separate admin UI needed
- **Sanity** — structured content with custom fields, image handling, and a real editing UI — good for directories, marketplaces, content-heavy marketing sites
- **Directus** — when content needs to live in your own Postgres/Supabase database with a generated admin UI on top, not a separate hosted content store

**Pros:**
- Notion: zero extra infrastructure — content team already knows the tool
- Sanity: purpose-built content modeling, real-time preview, strong image/media pipeline
- Directus: content lives in the same database as your product data — no syncing two sources of truth

**Limitations:**
- Notion: API rate limits and slower fetch times at scale; not built for high-traffic content delivery
- Sanity: another service/cost to manage; some learning curve for schema setup
- Directus: most setup effort of the three; only worth it if content truly needs to live alongside product data

**AI Prompt — Wire up a CMS:**
```
Connect [Notion / Sanity / Directus] as a CMS for [content type, e.g. "blog posts" / "directory listings" / "FAQ entries"] in this Next.js project.

Content fields needed: [list, e.g. "title, slug, cover image, body content, published date, category"]
Where this content displays: [route/page, e.g. "/blog/[slug]"]

Output:
1. The content model/schema for the CMS chosen, matching the fields listed
2. The fetch code to pull this content into the Next.js page (server-side, with appropriate caching/revalidation strategy)
3. How updates in the CMS should reach the live site (on-demand revalidation vs. scheduled rebuild — recommend one and explain why for this content type)
4. A fallback/empty-state for when content is missing or the CMS fetch fails
```

---

**Next step:** Use [`STACK_DECISION_MATRIX.md`](./STACK_DECISION_MATRIX.md) to pick which pieces of this stack apply to your specific product type, then use [`AI_STACK_PROMPTS.md`](./AI_STACK_PROMPTS.md) to generate the architecture, schema, and deployment plan before handing anything to Cursor/Windsurf for implementation.
