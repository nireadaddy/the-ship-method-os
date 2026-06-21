# Membership / Subscription Content Site Template

The thing that makes membership sites different from regular SaaS: the product *is* access and belonging, not a tool. Retention depends as much on perceived ongoing value (new content, community activity) as on features. Plan content cadence and tier structure before writing code — a membership site with great gating logic but no content pipeline behind it will churn in month two. Build billing and access-control first; content can be added continuously after launch, but a broken paywall kills trust immediately.

## Feature Checklist

- [ ] User signup/login with email verification
- [ ] Subscription billing (recurring, via Stripe or similar)
- [ ] Multiple membership tiers with different access levels
- [ ] Content gating by tier (lock icon / paywall on restricted content)
- [ ] Content library (courses, posts, videos, downloads) with categories
- [ ] Progress tracking (for course-style content — completed/in-progress)
- [ ] Member profile / account settings (update card, change plan, cancel)
- [ ] Community space (comments, forum, or chat) — even basic threaded comments
- [ ] Trial period or free tier for top-of-funnel conversion
- [ ] Dunning/failed-payment handling (retry, grace period, downgrade)
- [ ] Email notifications (new content drop, billing receipt, payment failed)
- [ ] Admin panel: publish content, manage tiers, view member list
- [ ] Cancellation flow (self-serve, with retention offer optional)
- [ ] Search within gated content

## Data Model Starter

| Entity | Key Fields | Relationships |
|---|---|---|
| Member (User) | name, email, status (active/cancelled/past_due) | has one Subscription; has many Progress records, Comments |
| Subscription | tier_id, status, current_period_end, stripe_customer_id | belongs to Member; belongs to Tier |
| Tier | name, price, billing_interval, access_level | has many Subscriptions; gates Content |
| Content | title, type (post/video/course/download), tier_required, published_at | belongs to Category; has many Progress records, Comments |
| Category | name, order | has many Content |
| Progress | content_id, member_id, status, completed_at | belongs to Member and Content |
| Comment | body, member_id, content_id, created_at | belongs to Member and Content |

## Core User Flows

1. Visitor browses free/teaser content → hits paywall → signs up
2. Choose tier → enter payment → instant access to gated content
3. Member browses content library by category → consumes content → progress saved
4. Member engages community (comment/discuss) on a piece of content
5. Member upgrades/downgrades tier → access adjusts immediately
6. Payment fails → grace period → member updates card or gets downgraded
7. Member cancels → access continues until period end → then reverts to free/no access

## Monetization Pattern

Recurring subscription revenue, typically monthly and annual options (annual at a discount to improve cash flow and reduce churn). Tiering usually splits on content depth, community access, or live components (e.g., "Basic" content-only vs. "Pro" with community + live calls). A free or trial tier is the primary acquisition lever — most membership sites convert from free content, not cold ads, so plan a generous-but-bounded free layer.

## Build Order (MVP fastest path)

1. Auth (signup/login) + member account model
2. Stripe subscription integration with one paid tier (skip multi-tier at first)
3. Content model + manual admin publishing (no fancy CMS needed yet)
4. Tier-based gating logic (show/hide or blur content based on access)
5. Member dashboard showing accessible content
6. Basic email notifications (welcome, receipt, payment failed)
7. Defer: community/comments, progress tracking, multiple tiers, dunning automation

## Example AI Build Prompts

```
Build a content-gating system in [Next.js/Supabase] where each Content row has
a tier_required field, and the UI shows full content if the logged-in member's
active subscription tier meets or exceeds tier_required, otherwise shows a
blurred preview with an "Upgrade to unlock" CTA linking to the billing page.
```

```
Set up Stripe subscription billing for a membership site with two tiers
(Basic $19/mo, Pro $49/mo, both with annual options at 20% off). Implement
webhook handlers for subscription.created, updated, and payment_failed that
sync subscription status into our database, including a grace period of 5 days
on failed payment before downgrading access.
```

```
Build a member dashboard page that lists all content the member's tier grants
access to, grouped by category, with a progress indicator (not started / in
progress / completed) per item, and a "continue where you left off" section
at the top showing the 3 most recently accessed items.
```
