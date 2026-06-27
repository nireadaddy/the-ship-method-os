# STACK_DECISION_MATRIX.md

**Phase:** S — Structure
**Purpose:** A fast lookup so a non-developer can confidently pick a stack for their specific product type instead of defaulting to the full stack in `TECH_STACK.md` for everything — including for products simple enough that Supabase/auth/payments would be overkill. Find your use case below, copy the recommended stack, and paste the AI Build Prompt to get started.

> **Rule of thumb:** Don't add a piece of the stack until the product actually needs it. A landing page does not need a database. A lead-gen site does not need Stripe. Match the table below before defaulting to everything in `TECH_STACK.md`.

---

## Quick Reference Table

| Use Case | Recommended Stack | Complexity | Cost | Time to MVP |
|---|---|---|---|---|
| Landing Page | Next.js + Tailwind + shadcn/ui, no backend | Low | $ | 2-4 days |
| Lead Generation Website | Next.js + Tailwind + shadcn/ui + Resend + Plausible | Low | $ | 3-5 days |
| CRM | Next.js + Tailwind + shadcn/ui + Supabase + Supabase Auth + PostHog | High | $$ | 4-6 weeks |
| Dashboard | Next.js + Tailwind + shadcn/ui + Supabase + Supabase Auth + PostHog | Medium | $$ | 2-4 weeks |
| SaaS | Full stack (`TECH_STACK.md`) — Next.js, Tailwind, shadcn/ui, Supabase, Supabase Auth, Supabase Storage, Stripe, Resend, PostHog, Sentry | High | $$$ | 6-10 weeks |
| Membership Site | Next.js + Tailwind + shadcn/ui + Supabase + Supabase Auth + Stripe + Resend | Medium-High | $$ | 4-6 weeks |
| Booking System | Next.js + Tailwind + shadcn/ui + Supabase + Supabase Auth + Stripe + Resend + n8n/Make | High | $$ | 4-7 weeks |
| Directory Website | Next.js + Tailwind + shadcn/ui + Supabase + Sanity (or Directus) | Medium | $$ | 3-5 weeks |
| Internal Tool | Next.js + Tailwind + shadcn/ui + Supabase + Supabase Auth | Medium | $ | 1-3 weeks |

---

## 1. Landing Page

**Recommended Stack:** Next.js + Tailwind CSS + shadcn/ui (a few components only). No backend, no database, no auth.

**Why this stack:** A landing page exists to convert visitors with copy and design, not to store data. Supabase/auth/payments add setup time and cost with zero benefit here. Next.js + Vercel still gives fast load times and easy deployment; shadcn/ui covers the occasional interactive element (FAQ accordion, contact form UI).

**Complexity:** Low
**Cost:** $ (Vercel free tier + domain only)
**Time to MVP:** 2-4 days

**AI Build Prompt:**
```
Build a single-page marketing landing page using Next.js (App Router) and Tailwind CSS, no backend or database needed.

Product: [one-line description]
Sections needed: [e.g. "hero, problem/solution, features, social proof, pricing teaser, FAQ, final CTA"]
Brand: [colors/fonts, or "recommend a clean modern palette"]
Form handling: [e.g. "email signup form that posts to [Resend/Mailchimp/Google Sheet] — specify provider" or "no form needed yet"]

Output:
1. Full page structure as one Next.js page (or split into components if it gets long)
2. Tailwind styling matching the brand input above
3. Mobile-responsive by default — confirm breakpoints used
4. If a form is needed, the simplest working integration for the provider specified — do not add a database for this
```

---

## 2. Lead Generation Website

**Recommended Stack:** Next.js + Tailwind + shadcn/ui + Resend (for lead notification emails) + Plausible (traffic analytics). No Supabase unless leads must be queryable/searchable later — a simple lead-gen site can pipe form submissions straight to email or a spreadsheet via n8n/Make.

**Why this stack:** The job here is capturing and routing leads, not managing user accounts. Resend handles the "notify me/the lead" emails; Plausible tells you which traffic sources actually convert. Add Supabase only once you need a searchable leads database instead of an inbox/spreadsheet.

**Complexity:** Low
**Cost:** $ (Vercel + Resend + Plausible free/low tiers)
**Time to MVP:** 3-5 days

**AI Build Prompt:**
```
Build a lead generation website using Next.js, Tailwind, and shadcn/ui.

Product/offer: [one-line description]
Lead capture form fields: [list, e.g. "name, email, company size"]
What happens after submission: [e.g. "send me an email notification via Resend" / "send to a Google Sheet via n8n webhook"]
Lead magnet (if any): [e.g. "free PDF download after form submit"]
Analytics: add Plausible for pageview/traffic tracking, no cookie banner needed

Output:
1. Page structure (hero, value prop, lead capture form, optional lead magnet delivery)
2. Form validation (required fields, valid email format) before submission
3. The exact integration code for the "what happens after submission" step specified above
4. Plausible script installation
5. A thank-you state/page after successful submission
```

---

## 3. CRM

**Recommended Stack:** Next.js + Tailwind + shadcn/ui + Supabase (database + Auth) + PostHog (usage analytics).

**Why this stack:** A CRM is fundamentally a structured database (contacts, deals, activities) with role-based permissions (who can see/edit which records) — exactly what Supabase + RLS is built for. shadcn/ui's table and form components cover the bulk of CRM UI needs. PostHog matters here because CRM adoption (do people actually log activity?) is the real risk, not traffic.

**Complexity:** High
**Cost:** $$
**Time to MVP:** 4-6 weeks

**AI Build Prompt:**
```
Build a CRM MVP using Next.js, Tailwind, shadcn/ui, and Supabase (database + Auth).

Core entities: [e.g. "contacts, companies, deals (with stages), activities/notes logged against a contact or deal"]
Pipeline stages (if deals exist): [list, e.g. "New, Contacted, Qualified, Proposal, Won, Lost"]
Roles/permissions: [e.g. "admin sees everything, rep only sees their own assigned contacts/deals"]
Views needed: [e.g. "contact list with search/filter, deal kanban board by stage, contact detail page with activity timeline"]

Output:
1. Database schema (SQL) for the entities above, with RLS policies matching the roles described
2. Folder structure for the Next.js app covering each view listed
3. The kanban/pipeline view component (if applicable) using shadcn/ui, with drag-to-change-stage behavior described even if implemented as a simple dropdown for v1
4. Auth setup restricting each view by role
5. Flag any permission rule that's ambiguous before writing the RLS policy for it
```

---

## 4. Dashboard

**Recommended Stack:** Next.js + Tailwind + shadcn/ui + Supabase (database + Auth) + PostHog.

**Why this stack:** A dashboard's core job is querying and visualizing existing data (yours or a connected source) and gating it by user/role — Supabase covers both the data layer and the access control in one place. PostHog is included specifically to track which charts/views users actually look at, since dashboards are often built on guesses about what matters.

**Complexity:** Medium
**Cost:** $$
**Time to MVP:** 2-4 weeks

**AI Build Prompt:**
```
Build a dashboard using Next.js, Tailwind, shadcn/ui, and Supabase.

Data being visualized: [describe, e.g. "weekly sales totals, top 10 products, customer signups over time"]
Data source: [e.g. "already in Supabase from our app" / "needs to be synced in from [external tool/API]"]
Who sees this dashboard: [e.g. "only logged-in admins" / "each customer sees only their own data"]
Key widgets needed: [list, e.g. "line chart of signups over time, table of top customers, summary stat cards"]

Output:
1. Data queries (SQL or Supabase client calls) for each widget listed, including any aggregation needed
2. RLS policies enforcing who sees what, matching the access rule above
3. Component structure using shadcn/ui for cards/tables + a charting library recommendation (state which one and why) for the charts
4. Loading and empty states for every widget (what shows before data loads / if there's no data yet)
5. Refresh strategy: does data need to update live, or is a periodic refresh acceptable? Recommend one and explain why for this use case
```

---

## 5. SaaS

**Recommended Stack:** Full default stack — Next.js, Tailwind, shadcn/ui, Supabase (database + Auth + Storage), Stripe, Resend, PostHog, Sentry. See `TECH_STACK.md` for every piece.

**Why this stack:** SaaS is the use case the default stack is built around — it needs accounts, billing, transactional email, usage tracking, and error visibility all at once. Skipping any one of these (especially Sentry and Stripe webhook idempotency) is the most common cause of post-launch fires.

**Complexity:** High
**Cost:** $$$
**Time to MVP:** 6-10 weeks

**AI Build Prompt:**
```
Build a SaaS MVP using the full stack: Next.js, Tailwind, shadcn/ui, Supabase (database + Auth + Storage), Stripe, Resend, PostHog, Sentry.

Product: [one-line description]
Core feature(s) the paid plan unlocks: [describe]
Pricing model: [e.g. "free tier with limits + $X/mo pro tier" — see AI_STACK_PROMPTS.md for a dedicated pricing/billing prompt]
Key user flows: [list, e.g. "sign up → onboarding → create first [thing] → invite teammate → upgrade to paid"]

Output, in this order:
1. Database schema + RLS policies for the core entities and the multi-tenant/account structure (workspace/team if applicable)
2. Auth flow (signup, login, protected routes) per the user flows listed
3. Stripe billing integration matching the pricing model, including idempotent webhook handling
4. Resend email triggers for: welcome, payment receipt, payment failed
5. PostHog events for each step in the key user flows listed, so activation/drop-off is measurable from day one
6. Sentry setup with error boundaries on the core flows

Build this in stages, not all files at once — confirm each stage works before moving to the next.
```

---

## 6. Membership Site

**Recommended Stack:** Next.js + Tailwind + shadcn/ui + Supabase (database + Auth) + Stripe + Resend.

**Why this stack:** A membership site is gated content behind a paid subscription — the core mechanics are Supabase Auth (who's logged in) + RLS (what content their plan unlocks) + Stripe (recurring billing) + Resend (renewal/payment-failed emails). PostHog/Sentry are optional at MVP stage unless content volume/users are already large.

**Complexity:** Medium-High
**Cost:** $$
**Time to MVP:** 4-6 weeks

**AI Build Prompt:**
```
Build a membership site MVP using Next.js, Tailwind, shadcn/ui, Supabase, Stripe, and Resend.

Content type being gated: [e.g. "video courses", "downloadable templates", "community posts"]
Membership tiers: [list, e.g. "free preview tier, $X/mo full access tier"]
What free vs. paid members can each access: [describe clearly]

Output:
1. Database schema for content + membership tier tracking per user
2. RLS policies enforcing tier-based access to content (free users cannot query/see paid content rows, not just UI-hidden)
3. Stripe subscription setup matching the tiers, with webhook handling that updates the user's tier in Supabase on subscribe/cancel/payment failure
4. Resend emails for: welcome, payment failed/card declined (with a clear call-to-action to update payment), subscription canceled
5. The content-gating UI pattern (e.g. blurred/locked preview for non-members) using shadcn/ui
```

---

## 7. Booking System

**Recommended Stack:** Next.js + Tailwind + shadcn/ui + Supabase (database + Auth) + Stripe (if paid bookings) + Resend (confirmations/reminders) + n8n or Make (calendar sync / reminder automation).

**Why this stack:** Booking systems hinge on correctly handling time slots, availability, and double-booking prevention (a database-level concern — Supabase + proper constraints) plus reliable confirmation/reminder emails. n8n/Make is included specifically for calendar sync (Google Calendar, etc.) and reminder scheduling, which is painful to hand-code but a standard automation pattern.

**Complexity:** High
**Cost:** $$
**Time to MVP:** 4-7 weeks

**AI Build Prompt:**
```
Build a booking system MVP using Next.js, Tailwind, shadcn/ui, Supabase, Stripe (if paid), and Resend.

What's being booked: [e.g. "1-hour consultation slots", "equipment rental by day"]
Availability rules: [e.g. "Mon-Fri 9am-5pm, 1-hour slots, 1 booking per slot, 24hr cancellation cutoff"]
Payment required at booking: [yes/no — if yes, describe pricing]
Confirmation/reminder emails needed: [e.g. "confirmation immediately, reminder 24hrs before"]

Output:
1. Database schema preventing double-booking at the database level (not just app-level checks) — explain the constraint used
2. Availability query logic (how the app determines which slots show as bookable)
3. Booking flow UI using shadcn/ui (calendar/slot picker, confirmation step)
4. Stripe integration if paid, including what happens if payment fails after a slot was tentatively held
5. Resend confirmation email immediately on booking; note where a reminder automation (n8n/Make scheduled trigers) would plug in for the 24hr-before reminder
6. Cancellation flow respecting the cutoff rule stated above
```

---

## 8. Directory Website

**Recommended Stack:** Next.js + Tailwind + shadcn/ui + Supabase (database) + Sanity or Directus (for listing content management). Auth only if listings need owner-editable profiles or paid listings.

**Why this stack:** A directory is mostly structured, searchable/filterable listing data. Supabase handles search/filter at the database level; Sanity/Directus gives whoever manages listings a real editing UI without touching code. Skip Stripe/Auth entirely if listings are submitted manually by you, not self-service by listing owners.

**Complexity:** Medium
**Cost:** $$
**Time to MVP:** 3-5 weeks

**AI Build Prompt:**
```
Build a directory website MVP using Next.js, Tailwind, shadcn/ui, Supabase, and [Sanity / Directus] for content management.

What's being listed: [e.g. "local service providers", "SaaS tools by category"]
Listing fields: [list, e.g. "name, category, description, location, contact info, image, rating"]
Filtering/search needed: [e.g. "filter by category and location, search by name"]
Who manages listings: [e.g. "only me via the CMS" / "listing owners can self-submit and edit their own listing"]

Output:
1. Content model/schema in the chosen CMS matching the fields above
2. Database/query setup for filtering and search (server-side, with pagination)
3. Listing card and detail page components using shadcn/ui
4. If self-service editing is needed: the auth + ownership model so a listing owner can only edit their own listing
5. SEO basics for listing pages (meta tags, structured data) since directories live or die on search traffic
```

---

## 9. Internal Tool

**Recommended Stack:** Next.js + Tailwind + shadcn/ui + Supabase (database + Auth). Skip Stripe, Resend, PostHog, and Sentry at MVP stage — these are for external users and paying customers, not your own team.

**Why this stack:** Internal tools serve a small, known, trusted user base (your team) — the priority is fast build time and basic access control, not billing, marketing email, or public-facing polish. Supabase Auth still matters because internal tools often touch sensitive operational data.

**Complexity:** Medium
**Cost:** $
**Time to MVP:** 1-3 weeks

**AI Build Prompt:**
```
Build an internal tool MVP using Next.js, Tailwind, shadcn/ui, and Supabase (database + Auth).

What this tool needs to do: [describe the core operational task, e.g. "let ops team update order status and see daily shipment counts"]
Who uses it: [e.g. "5 internal team members, 2 roles: ops and admin"]
Data source: [e.g. "new Supabase tables" / "existing data already in our main app's Supabase project"]

Output:
1. Database schema (or confirmation of reuse if data already exists elsewhere) and RLS policies matching the 2 roles
2. Core screens needed for the task described, kept as simple as possible — no marketing polish needed
3. Auth setup restricted to known team members only (e.g. invite-only, no public signup)
4. Skip Stripe, Resend, and analytics entirely unless I ask for them — keep this lean
```

---

**Next step:** Once you've picked your row, paste the matching AI Build Prompt into Claude or Cursor/Windsurf to scaffold it, then use [`AI_STACK_PROMPTS.md`](./AI_STACK_PROMPTS.md) to generate the supporting architecture, schema, and security checklist before handing off implementation.
