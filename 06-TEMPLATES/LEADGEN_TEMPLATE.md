# Lead Generation Website Template

A lead-gen site isn't a product you log into — it's a conversion machine where the "user" converts once (becomes a lead) and then exits to a sales or nurture process. Plan the *funnel*, not the app: traffic source → landing page → form → lead scoring → handoff/follow-up. The build is judged on conversion rate and lead quality, not feature richness. Build the form-to-CRM handoff before you polish design — a beautiful landing page that drops leads into a void is worse than a plain one that reliably notifies sales.

## Feature Checklist

- [ ] Landing page(s) with clear single CTA (one offer per page, no nav distractions)
- [ ] Lead capture form (name, email, phone, qualifying questions)
- [ ] Form validation + spam/bot protection (honeypot or captcha)
- [ ] Thank-you page / confirmation step (with next-step instruction)
- [ ] Lead storage (database or direct CRM push)
- [ ] Lead scoring rules (basic: based on answers, source, or company size)
- [ ] Email confirmation / autoresponder on submission
- [ ] Follow-up sequence (drip emails, typically 3-7 touches)
- [ ] CRM handoff/integration (webhook, Zapier, or native API push)
- [ ] UTM/source tracking on every lead (know which campaign drove it)
- [ ] A/B testing capability for headline/CTA/form length
- [ ] Analytics: conversion rate by page/source, form abandonment tracking
- [ ] Calendar booking integration (if next step is a sales call)
- [ ] Admin view: list of leads with status (new/contacted/qualified/converted)

## Data Model Starter

| Entity | Key Fields | Relationships |
|---|---|---|
| Lead | name, email, phone, source, utm_campaign, status, score | belongs to Campaign; has many FollowUp events |
| Campaign / Landing Page | slug, headline, offer, traffic_source | has many Leads |
| Form Submission | raw form fields (JSON), submitted_at, ip_address | converts into Lead |
| FollowUp Event | type (email/call/sms), sent_at, sequence_step | belongs to Lead |
| Scoring Rule | field, condition, points | applied to Lead at submission time |
| Integration Log | destination (CRM/webhook), payload, status, sent_at | belongs to Lead |

## Core User Flows

1. Visitor arrives from ad/search/social → lands on offer-specific page
2. Visitor reads offer → fills lead capture form → submits
3. System scores lead, tags source, pushes to CRM/webhook
4. Visitor sees thank-you page → receives confirmation email immediately
5. Lead enters follow-up sequence (automated emails over days/weeks)
6. Sales/admin reviews lead list → marks contacted/qualified/converted
7. (Optional) Lead books a call directly via embedded calendar on thank-you page

## Monetization Pattern

The site itself rarely charges money directly — it generates leads that get monetized downstream: (a) internal sales team closes them into a paid product/service, (b) leads are sold/transferred to a third party (lead-gen-as-a-business, common in insurance/legal/home-services niches), or (c) leads feed a SaaS/membership funnel where the real monetization happens after signup. Plan and report on cost-per-lead and lead-to-customer rate as the core economics, not direct site revenue.

## Build Order (MVP fastest path)

1. Single landing page with one offer and one form (no CMS, hardcode content)
2. Form submission → store lead in database + send confirmation email
3. UTM/source capture on form submission
4. Simple admin list view of leads with status field
5. One CRM/webhook integration (even a basic Zapier-style webhook push)
6. Defer: lead scoring rules, multi-step follow-up sequences, A/B testing, calendar booking

## Example AI Build Prompts

```
Build a lead capture landing page in [Next.js/HTML+Tailwind] with a single
headline, 3 benefit bullets, a lead form (name, email, phone, one qualifying
dropdown question), and a thank-you state shown inline after submit without
a page reload. Include UTM parameter capture from the URL into hidden form fields.
```

```
Build a lead intake API endpoint that accepts form submissions, validates
input, calculates a lead score based on the qualifying answer (e.g.,
budget > $5k = +30 points), stores the lead in the database with status=new,
sends a confirmation email via [Resend/SendGrid], and pushes the lead payload
to a configurable webhook URL for CRM handoff.
```

```
Build an admin leads dashboard showing all captured leads in a table with
columns for name, email, source/UTM campaign, score, status, and submitted
date, sortable by score and date, with a status dropdown per row (new/contacted/
qualified/converted) that updates inline without a page reload.
```
