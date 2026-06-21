# ANALYTICS

How to choose an analytics stack, define an event taxonomy, set up funnels/dashboards, and avoid drowning in vanity metrics.

## 1. Choosing an Analytics Stack

Pick one product analytics tool and one privacy-friendly web analytics tool (they often overlap — many teams run just one). Don't run four tools "just in case." Each one you add is a setup cost, a maintenance cost, and a place for data to disagree with itself.

| Tool | Best For | Pricing Model | Self-Host Option | Session Replay | Strength | Watch Out For |
|---|---|---|---|---|---|---|
| **PostHog** | Product analytics + feature flags + session replay in one tool | Usage-based, generous free tier | Yes | Yes | All-in-one (events, funnels, replay, A/B tests, surveys) | Can get pricey at scale if not careful with autocapture volume |
| **Plausible** | Lightweight, privacy-first web/marketing analytics | Flat monthly by pageview tier | Yes | No | Simple, GDPR-friendly, no cookie banner needed, fast | Not built for deep product/funnel analysis |
| **GA4** | Free web + basic marketing analytics, ad platform integration | Free | No | No | Free, integrates with Google Ads/Search Console | Steep learning curve, sampling on high volume, privacy concerns in EU |
| **Mixpanel** | Deep product analytics, cohort/retention analysis | Usage-based (event volume) | No | No | Best-in-class funnel/retention/cohort tooling | Can get expensive fast; event taxonomy discipline required |
| **Amplitude** | Enterprise-grade product analytics | Usage-based, enterprise-priced | No | No | Strong behavioral cohorts, predictive analytics | Overkill and costly for early-stage products |

**Recommendation for most SHIP Method builds:** PostHog (product events + funnels + session replay) as the primary tool, optionally paired with Plausible if you need a separate clean marketing-site dashboard without affecting product event volume.

### Decision checklist

- [ ] Tool supports the events you need without requiring engineering effort per event (no-code/autocapture option exists)
- [ ] Tool has a free or low-cost tier sufficient for pre-PMF volume
- [ ] Tool's data export options avoid lock-in (CSV, API, or warehouse sync)
- [ ] Tool complies with relevant privacy regulations for your audience (GDPR, CCPA)
- [ ] Tool integrates with your stack (Next.js, Supabase, Stripe, etc.) via existing SDK or webhook

## 2. Event Taxonomy

Naming convention: `object_action` in snake_case or Title Case Verb-Noun — pick one and never mix. Example below uses `Object Verbed` (PostHog/Mixpanel convention).

| Event Name | Trigger | Properties | Why It Matters |
|---|---|---|---|
| `Signup Started` | User lands on signup form | `source`, `referrer`, `utm_campaign` | Top of funnel — tells you which channels drive intent |
| `Signup Completed` | Account successfully created | `signup_method` (email/OAuth), `plan_selected` | Confirms funnel step 1 conversion; segments by acquisition path |
| `Onboarding Step Completed` | Each onboarding step finished | `step_name`, `step_number`, `time_on_step` | Finds drop-off points inside onboarding |
| `Activation Event Fired` | User completes the core "aha" action (define per product, e.g. "First Project Created") | `time_since_signup`, `feature_used` | This is your activation metric — the single best predictor of retention |
| `Feature Used` | Any core feature invoked | `feature_name`, `plan_tier` | Tells you what's actually used vs. ignored — informs roadmap |
| `Upgrade Started` | User clicks upgrade/checkout CTA | `from_plan`, `to_plan`, `trigger_location` | Top of monetization funnel |
| `Payment Completed` | Stripe webhook confirms charge | `plan`, `amount`, `currency`, `payment_method` | Revenue event — ground truth, not self-reported |
| `Session Started` | App session begins | `device_type`, `referrer` | Engagement frequency baseline |
| `Churn Risk Signal` | Defined inactivity threshold crossed (e.g. 14 days no login) | `days_inactive`, `plan_tier` | Trigger for retention/win-back campaigns |
| `Subscription Cancelled` | User cancels | `reason` (from cancellation survey), `tenure_days` | Direct churn measurement + qualitative reason |

### Worked Example Funnel: Signup → Activation → Retention

```
STEP 1 — ACQUISITION
  Event: Signup Started
  Definition: Visitor reaches /signup and the form renders
  Properties: source, utm_campaign, referrer

STEP 2 — CONVERSION
  Event: Signup Completed
  Definition: Account record created in DB
  Drop-off to watch: Signup Started → Signup Completed
    (If <40% convert, the form itself is the problem — check field count, friction, trust signals)

STEP 3 — ACTIVATION
  Event: Activation Event Fired
  Definition: [Product-specific — e.g. "created first project," "sent first message," "connected first integration"]
  Target: 80% of activated users should hit this within 24 hours of signup
  Drop-off to watch: Signup Completed → Activation Event Fired
    (If users sign up but don't activate, onboarding is the problem, not acquisition)

STEP 4 — HABIT / RETENTION
  Event: Session Started (recurrence)
  Definition: User returns and triggers a session at least 3x in first 14 days
  Target: Define your "retained" cohort — e.g. W1 retention ≥ 25% is a reasonable early bar for most SaaS
  Drop-off to watch: Activation Event Fired → Returns within 7 days
    (If users activate once and never come back, the core loop isn't sticky — value isn't being re-delivered)

STEP 5 — MONETIZATION
  Event: Payment Completed
  Definition: First successful charge
  Target: Track time-to-first-payment from signup — shorter is healthier
```

## 3. Setting Up Funnels & Dashboards

- [ ] Build one funnel per critical flow (signup→activation, trial→paid, activation→retention)
- [ ] Set funnel conversion window realistically (e.g. 7 days for signup→activation, not "all time")
- [ ] Build a single "Health Dashboard" with: new signups (daily), activation rate, W1/W4 retention, MRR, churn rate — reviewed weekly
- [ ] Segment every funnel by acquisition source at minimum (organic vs. paid vs. referral)
- [ ] Set up an alert/notification for sudden funnel drop-offs (>20% week-over-week) — don't rely on manually checking
- [ ] Tag internal/test/team accounts and exclude them from all dashboards
- [ ] Document every event's exact firing condition in a shared taxonomy doc (this file) so engineering and product agree on definitions
- [ ] Re-audit event tracking after every major release — UI changes silently break autocapture-based tracking

## 4. Metrics That Matter

### North Star Metric
Pick **one** metric that best represents the core value your product delivers, recurring over time. Examples: "Weekly Active Projects," "Messages Sent Per Week," "Active Paid Seats."

```
OUR NORTH STAR METRIC: ___________________________
WHY THIS METRIC: __________________________________
CURRENT BASELINE: _________________________________
TARGET (next 90 days): ____________________________
```

### Input Metrics (the levers that move the North Star)

| Input Metric | How It Drives North Star | Owner |
|---|---|---|
| Signup → Activation rate | More activated users = more North Star events | Product |
| Time-to-activation | Faster activation = higher chance of habit forming | Product/Onboarding |
| W1 retention | Retained users generate recurring North Star events | Product |
| Feature adoption (core feature) | Direct driver of usage frequency | Product |
| Paid conversion rate | Funds growth that drives more North Star usage | Growth |

### Vanity Metric Warning List

Track these for context only — never present them as proof of success, and never let them drive a roadmap decision alone.

| Vanity Metric | Why It's Misleading |
|---|---|
| Total signups (all-time) | Doesn't account for churn — a number that only goes up tells you nothing about health |
| Page views | High views with low conversion can mean confusion, not interest |
| Social media followers | No correlation with revenue or retention without a conversion path |
| App downloads | Means nothing if activation rate is low |
| Total registered users | Same issue as signups — distinguish active from dormant |
| "Time on page" alone | Could mean engagement or could mean confusion/struggling to find something |
| Press mentions / PR count | Vanity unless tied to a tracked traffic/signup spike |

**Rule of thumb:** every metric on a dashboard should answer "so what should we do differently if this number changes?" If it can't answer that, it's vanity — keep it out of the weekly review.
