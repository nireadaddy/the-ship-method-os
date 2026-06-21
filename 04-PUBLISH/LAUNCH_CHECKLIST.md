# LAUNCH_CHECKLIST.md

**Phase:** P — Publish
**Purpose:** A literal pre-flight checklist — distinct from `LAUNCH_PLAN.md`, which is the strategic timeline, channel plan, and runbook. This file is the final, no-narrative gate: every box checked or explicitly waived before you flip the switch. Run this in full in the 24-48 hours before launch, alongside the `LAUNCH_PLAN.md` Section 1 (T-1) timeline.

> Default rule: every unchecked box at T-1 is a blocker to discuss in the go/no-go call (`LAUNCH_PLAN.md` Section 0). "We'll fix it after launch" is a valid call sometimes — but it must be a stated decision, not a silently skipped checkbox.

---

## 1. Product Readiness

- [ ] Core "aha moment" flow works end-to-end with no manual workarounds (matches `QA_CHECKLIST.md` Section 1)
- [ ] Zero open Blocker bugs, zero open Major bugs (or explicit written sign-off per `QA_CHECKLIST.md` Severity Triage Table)
- [ ] Empty states exist for every primary screen/object, not just the dashboard
- [ ] Error states are specific and actionable, not raw error codes
- [ ] Tested on real production-like data volume, not just seed/demo data
- [ ] Mobile experience tested on at least one real device per platform (not just browser devtools emulation)
- [ ] Pricing/plans are final and match what's displayed at checkout (no placeholder prices live)
- [ ] Onboarding flow tested start-to-finish by someone outside the build team

## 2. Legal / Compliance Basics

- [ ] Terms of Service published and linked from signup/footer
- [ ] Privacy Policy published and linked from signup/footer, accurately describing actual data collection (not a generic template that overstates or understates what you collect)
- [ ] Cookie consent banner implemented if serving EU/UK users or using non-essential tracking cookies
- [ ] Data processing agreement (DPA) available if selling to businesses that will ask for one
- [ ] Refund/cancellation policy stated clearly, matching what billing actually does
- [ ] Age/eligibility requirements stated if applicable (e.g. 18+, business-only)
- [ ] Any required industry-specific disclosures included (e.g. AI-generated content disclosure, financial/health data handling notices)
- [ ] Company/legal entity name and contact address present somewhere in the product (often required for ToS validity in many jurisdictions)

## 3. Payments / Billing Readiness

- [ ] Payment provider (Stripe or equivalent) is in live mode, not test mode
- [ ] Test transactions run successfully in live mode with a real card (small real charge, then refunded)
- [ ] Failed payment / card decline flow tested and shows a clear, actionable message
- [ ] Subscription upgrade/downgrade/cancel flows tested end-to-end against the live billing provider
- [ ] Invoices/receipts are generated correctly and sent to the right email
- [ ] Tax handling configured if applicable (VAT/sales tax via Stripe Tax or equivalent)
- [ ] Webhooks (payment success/failure/subscription events) are received and processed correctly in production, not just staging
- [ ] Billing support contact path exists for payment disputes/questions

## 4. Support Readiness

- [ ] Help docs/FAQ published covering the top 10 anticipated questions
- [ ] Support contact channel is live and monitored (email, chat widget, or both)
- [ ] Support response SLA defined internally, even if informal (e.g. "within 24h")
- [ ] Known issues/limitations documented somewhere the team can reference when answering tickets
- [ ] Support inbox/tool access granted to everyone who might need to respond on launch day
- [ ] A canned-response template exists for the most likely first-week question (usually: "how do I get started")

## 5. Marketing Assets Readiness

- [ ] Landing page copy and visuals finalized, no placeholder/lorem ipsum text remaining
- [ ] Launch announcement (email, social posts) drafted and scheduled per `LAUNCH_PLAN.md` Section 2
- [ ] Product screenshots/demo video reflect the actual current product, not an outdated mockup
- [ ] Open Graph / social share preview images and metadata set correctly (test the actual link preview on Twitter/X, LinkedIn, Slack)
- [ ] Favicon, app icon, and any platform-store assets finalized
- [ ] Testimonials/social proof (if any) have been verified and permission obtained to use them publicly
- [ ] UTM tracking parameters set on all launch links so traffic source is attributable in analytics

## 6. Technical Go-Live

- [ ] DNS records point to the production environment and have propagated (verify with a DNS lookup tool, not just "it loaded for me")
- [ ] SSL/TLS certificate is valid and auto-renewing (no manual renewal step that will be forgotten)
- [ ] Error monitoring/alerting (e.g. Sentry) is live and a test error has been confirmed to trigger an alert
- [ ] Uptime monitoring is live and pointed at the production URL, not staging
- [ ] Database backups are configured and a restore has been test-run at least once (matches `QA_CHECKLIST.md` Section 9)
- [ ] Environment variables/secrets are set correctly in production (and confirmed absent from any client-side bundle)
- [ ] Rate limiting is active on auth and payment endpoints
- [ ] CDN/caching configured correctly — verify a cache-busted deploy actually serves the latest version, not a stale cached one
- [ ] Rollback plan from `LAUNCH_PLAN.md` Section 4 is tested, not just written down
- [ ] Production environment can handle the expected traffic spike (load-tested or scaled preemptively if a large launch is expected)

## 7. Team / Communication Readiness

- [ ] Launch Commander assigned (per `LAUNCH_PLAN.md` Section 3) and everyone knows who it is
- [ ] Everyone involved knows their launch-day role and time commitment
- [ ] A shared real-time channel (Slack/Discord thread, war room) is set up for launch-day coordination
- [ ] Escalation path is clear: who gets paged if something breaks at 2am
- [ ] Go/no-go decision owner confirmed and has reviewed this entire checklist
- [ ] Post-launch retro time is already on the calendar (per `LAUNCH_PLAN.md` Section 6), not "we'll schedule it later"
- [ ] Everyone knows where the single source of feedback intake lives (per `FEEDBACK_SYSTEM.md`) so nothing gets lost in personal DMs on launch day

---

## Sign-off

```
TOTAL ITEMS:            [count]
CHECKED:                [count]
EXPLICITLY WAIVED:       [count] — list each with reason and owner who approved the waiver
GO / NO-GO DECISION:    [GO / NO-GO / GO WITH CONDITIONS]
DECISION OWNER:         
DATE/TIME:              
```

---

**Next step:** Once this checklist clears, execute the Launch-Day Runbook in [`LAUNCH_PLAN.md`](./LAUNCH_PLAN.md) Section 3.
