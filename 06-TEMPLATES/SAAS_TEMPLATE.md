# General SaaS Product Template

Generic SaaS is the hardest type to template precisely because the "core workflow" is unique to your product — but the scaffolding around it (auth, billing, settings, multi-tenancy) is almost identical across every SaaS ever built. Plan the boring scaffolding fast and cheaply (most of it is now solvable with off-the-shelf tools/templates) so you can spend your real design effort on the one workflow that makes your product different. Decide your multi-tenancy model (single-user accounts vs. team/org accounts with multiple seats) before writing a single migration — retrofitting org-level data isolation later is one of the most expensive mistakes in SaaS.

## Feature Checklist

- [ ] Signup/login (email+password and/or OAuth)
- [ ] Email verification and password reset
- [ ] Organization/workspace model (if multi-user) with invite flow
- [ ] Subscription billing (plans, trial, upgrade/downgrade, cancel)
- [ ] Usage metering (if usage-based pricing) — track and enforce limits
- [ ] The core workflow (the actual reason the product exists — define explicitly)
- [ ] Settings: account, billing, team members, API keys/integrations
- [ ] Role-based permissions within an organization (owner/admin/member)
- [ ] Notifications (in-app and/or email) for key events
- [ ] Onboarding flow (first-run experience guiding to first value)
- [ ] Empty states for every list/dashboard (new accounts have no data yet)
- [ ] Audit/activity log for account-level actions (helps support & trust)
- [ ] API (if applicable) with documentation and key management
- [ ] Data export / account deletion (for compliance and trust)

## Data Model Starter

| Entity | Key Fields | Relationships |
|---|---|---|
| Organization (Tenant) | name, plan_id, status, created_at | has many Users, Subscriptions, core-workflow entities |
| User | name, email, role, organization_id | belongs to Organization; has many Sessions |
| Subscription | plan_id, status, current_period_end, stripe_customer_id | belongs to Organization |
| Plan | name, price, billing_interval, limits (JSON) | has many Subscriptions |
| Invite | email, role, organization_id, status, token | belongs to Organization |
| Core Workflow Entity | (product-specific — e.g., "Project," "Document," "Campaign") | belongs to Organization; owned/edited by Users |
| Audit Log | actor_id, action, target, timestamp | belongs to Organization |

## Core User Flows

1. Visitor signs up → verifies email → lands in onboarding
2. New user completes onboarding → reaches "aha moment" of core workflow
3. User invites teammate → teammate joins organization with assigned role
4. User starts free trial → uses core workflow → hits paywall or trial expiry
5. User upgrades plan → billing processed → limits/features unlock
6. Admin manages team (roles, removal) and billing in settings
7. User integrates via API or third-party app (if applicable)

## Monetization Pattern

Recurring subscription, usually tiered by usage (seats, volume, feature access) or a hybrid of seat-based + usage overage. Freemium or free-trial is the dominant acquisition motion for self-serve SaaS; sales-assisted SaaS instead gates pricing behind a "Contact Us" for higher tiers. Annual billing at a discount improves cash flow and reduces churn — offer it from day one even with just one tier.

## Build Order (MVP fastest path)

1. Auth + single-tenant account model (add org/multi-user later if needed for MVP)
2. The one core workflow that is the entire reason to use the product — nothing else
3. Minimal settings (account info, password change)
4. Stripe integration with one paid plan + trial (skip tiering complexity at first)
5. Basic onboarding (a 2-3 step guided first action)
6. Defer: team/org multi-user, roles/permissions, API, audit log, usage metering

## Example AI Build Prompts

```
Build a multi-tenant SaaS data model in [Postgres/Supabase] with organizations,
users (belonging to one organization with a role: owner/admin/member),
subscriptions, and plans. Add row-level security so users can only ever query
data scoped to their own organization_id.
```

```
Build a self-serve onboarding flow in [Next.js] for a new signup: after email
verification, walk the user through 3 steps (create first [core entity],
invite a teammate (optional/skippable), see their first piece of real data)
ending on the main app dashboard, with a progress indicator across all 3 steps.
```

```
Integrate Stripe Billing with a 14-day free trial, one monthly/annual plan,
and a customer portal link for self-serve plan management. Implement webhook
handlers for checkout.session.completed, customer.subscription.updated, and
customer.subscription.deleted that keep our organizations table's
subscription_status field in sync.
```
