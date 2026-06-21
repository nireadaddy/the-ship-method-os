# LAUNCH_PLAN

Full launch plan template — copy this file per launch and fill it in. Covers pre-launch timeline, channel plan, launch-day runbook, rollback plan, and post-launch feedback collection.

## 0. Launch Overview

```
PRODUCT/FEATURE NAME: 
LAUNCH DATE: 
LAUNCH OWNER: 
LAUNCH TYPE: [Public launch / Beta / Soft launch / Feature release]
PRIMARY GOAL: [e.g. 100 signups in week 1, 20 paid conversions, press coverage]
SUCCESS METRIC + TARGET: 
GO/NO-GO DECISION OWNER: 
```

## 1. Pre-Launch Timeline

| Milestone | Timing | Tasks | Owner | Status |
|---|---|---|---|---|
| **T-30** | 30 days before | Finalize scope, lock feature set, begin content/asset creation, set up analytics events | | ☐ |
| **T-30** | 30 days before | Draft launch channel plan (see section 2), recruit beta/early-access users | | ☐ |
| **T-14** | 14 days before | Complete full QA pass (`QA_CHECKLIST.md`), fix all Blockers/Majors | | ☐ |
| **T-14** | 14 days before | Finalize SEO setup (`SEO_CHECKLIST.md`) — meta tags, sitemap, structured data | | ☐ |
| **T-14** | 14 days before | Draft all launch copy: landing page, emails, social posts, press materials | | ☐ |
| **T-7** | 7 days before | Run final regression QA on staging with production-like data | | ☐ |
| **T-7** | 7 days before | Confirm analytics events fire correctly end-to-end (test in production) | | ☐ |
| **T-7** | 7 days before | Brief support/community channels on FAQs and known issues | | ☐ |
| **T-7** | 7 days before | Schedule all launch-day content (social, email) in advance | | ☐ |
| **T-1** | 1 day before | Freeze code — no non-critical deploys until launch is stable | | ☐ |
| **T-1** | 1 day before | Confirm rollback plan is tested and ready (see section 4) | | ☐ |
| **T-1** | 1 day before | Final go/no-go call with all stakeholders | | ☐ |
| **T-1** | 1 day before | Pre-warm infrastructure if expecting a traffic spike (scale DB/server limits) | | ☐ |
| **Launch Day** | Day 0 | Execute launch-day runbook (see section 3) | | ☐ |
| **T+7** | 7 days after | Review metrics against success target, compile launch retro | | ☐ |
| **T+7** | 7 days after | Triage and respond to all collected feedback (see section 5) | | ☐ |
| **T+7** | 7 days after | Decide: double down on what worked, fix what underperformed, document learnings | | ☐ |

## 2. Launch Channel Plan

| Channel | Audience | CTA | Owner | Status |
|---|---|---|---|---|
| Product landing page | Cold organic + paid traffic | Sign up free | | ☐ |
| Email list / waitlist | Warm leads who opted in pre-launch | Get early access | | ☐ |
| Twitter/X | Builder/tech audience, existing followers | Try it now (link in thread) | | ☐ |
| LinkedIn | Professional/B2B audience | Read the launch story + try it | | ☐ |
| Product Hunt | Early adopters, tech enthusiasts | Upvote + comment + try | | ☐ |
| Relevant subreddit/community | Niche-specific audience | Soft mention, value-first post | | ☐ |
| Existing customer base (if upgrade/feature) | Current paying users | Try the new feature | | ☐ |
| Partner/affiliate network | Partner's audience | Use partner's referral link | | ☐ |
| Press/newsletter outreach | Journalists, niche newsletter writers | Cover the launch | | ☐ |
| Personal network / DMs | Warm 1:1 relationships | Personal ask to try + share | | ☐ |

## 3. Launch-Day Runbook

Run in order. Assign a single Launch Commander who owns the go/no-go calls during the day.

- [ ] **00:00** — Final smoke test on production (signup → core action → payment, end-to-end)
- [ ] **00:00** — Confirm monitoring/alerting is live (error tracking, uptime, analytics dashboard open)
- [ ] **00:00** — Confirm support inbox/chat is staffed and FAQ doc is ready
- [ ] **T+0** — Flip feature flag / remove "coming soon" gate / make page public
- [ ] **T+0** — Publish landing page changes (if applicable)
- [ ] **T+0** — Send launch email to waitlist
- [ ] **T+0** — Post on primary social channels (Twitter/X, LinkedIn) per pre-scheduled content
- [ ] **T+0** — Submit to Product Hunt / relevant launch platforms (if applicable, mind timezone for optimal posting time)
- [ ] **T+0** — Post in relevant communities (value-first, not spammy)
- [ ] **T+0 to T+2h** — Actively monitor error rates, server load, signup funnel in real time
- [ ] **T+0 to T+2h** — Respond to every comment/question on launch posts within 15 minutes
- [ ] **T+2h** — First metrics check-in: signups, conversion rate, error rate vs. baseline
- [ ] **T+4h** — Second metrics check-in, escalate to rollback decision if thresholds breached (see section 4)
- [ ] **End of day** — Compile day-1 numbers, log any incidents and how they were resolved
- [ ] **End of day** — Thank-you posts/replies to early users and supporters

## 4. Rollback Plan

Define rollback triggers **before** launch day, not during a crisis.

```
ROLLBACK TRIGGERS (any one of these = rollback discussion):
  - Error rate exceeds: ____% of requests for ____ consecutive minutes
  - Payment failures exceed: ____% of attempts
  - Core flow (signup/activation/checkout) completion rate drops below: ____%
  - Data integrity issue confirmed (data loss, corruption, wrong charges)
  - Security vulnerability actively being exploited

ROLLBACK PROCEDURE:
  1. Launch Commander declares rollback decision — no single engineer rolls back unilaterally
  2. Revert deployment to last known-good version (document exact commit/tag before launch)
  3. Communicate status to users if outage is visible (status page / banner / social post)
  4. Disable affected feature flag if rollback is partial rather than full revert
  5. Verify rollback resolved the issue via the same smoke test used at launch
  6. Post-incident: write up what happened, root cause, and fix-forward plan before re-attempting launch

ROLLBACK OWNER: 
ROLLBACK TIME BUDGET (target time from decision to resolved): 
LAST KNOWN-GOOD VERSION/TAG (fill in day-of): 
STATUS PAGE / COMMS CHANNEL: 
```

## 5. Post-Launch Feedback Collection

- [ ] In-app feedback widget/prompt active for all new users in first 7 days
- [ ] Post-signup survey (1-2 questions max) asking "what brought you here" / "what were you expecting"
- [ ] Direct outreach (email or DM) to first 20-50 users asking for a 15-minute call or written feedback
- [ ] Monitor social mentions, Product Hunt comments, community threads for unsolicited feedback
- [ ] Support tickets tagged and categorized (bug / confusion / feature request / praise)
- [ ] Weekly feedback triage meeting scheduled for first 4 weeks post-launch (see `FEEDBACK_LOOP.md`)
- [ ] Net Promoter Score (NPS) or simple satisfaction prompt sent at day 7 and day 30
- [ ] All feedback logged in a single shared backlog, not scattered across Slack/DMs/email
- [ ] T+7 retro scheduled with full team: what worked, what didn't, what we'd do differently

## 6. Launch Retro Template (fill at T+7)

```
RESULT VS. TARGET: 
WHAT WORKED WELL: 
  - 
WHAT DIDN'T WORK: 
  - 
SURPRISES (positive or negative): 
  - 
TOP 3 ACTIONS FOR NEXT 30 DAYS: 
  1. 
  2. 
  3. 
WOULD WE DO ANYTHING DIFFERENTLY NEXT LAUNCH: 
```
