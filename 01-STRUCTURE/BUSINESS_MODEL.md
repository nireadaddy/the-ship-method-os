# BUSINESS_MODEL.md

**Phase:** S — Structure
**Purpose:** The financial and go-to-market logic behind the product — how it makes money, what it costs to acquire and keep a customer, and why someone picks you over the alternative. `PROJECT.md` says *what* you're building; this file proves *it can be a business*.

> Fill this out with real numbers where you have them, honest estimates where you don't. A business model with "TBD" in every cell isn't a business model — it's a wish.

---

## 1. Revenue Model Deep Dive

- **Primary model:** Subscription / Usage-based / One-time / Freemium → Paid / Marketplace take-rate / Services + SaaS hybrid
- **Why this model fits this product** (not just "SaaS is standard" — explain the fit to your buyer's budget cycle and usage pattern):
  ```
  [explain why recurring vs one-time vs usage-based matches how your
  customer experiences and pays for value]
  ```
- **Billing cadence:** Monthly / Annual / Annual-only with monthly add-ons / Pay-as-you-go
- **Annual discount (if any):** [e.g., 2 months free on annual = ~17% discount]
- **Currency / market:** [primary billing currency and any multi-currency needs]
- **Payment processor:** Stripe / Paddle / LemonSqueezy / [other] — note if you need Merchant of Record for tax handling:
- **Revenue recognition note** (only matters once you have contracts or annual prepay): [describe X]

## 2. Pricing Tiers

> Anchor against value delivered, not against your costs. Price the outcome, not the feature count.

| Tier | Price (mo / yr) | Who it's for | Core limits (seats, usage, etc.) | Key features included | Upgrade trigger |
|---|---|---|---|---|---|
| Free / Trial | $0 | [first-time evaluator] | [e.g., 1 project, 100 records] | [core loop, watermarked export] | [hits usage cap] |
| [Starter name] | $[X] / $[Y] | [solo builder / small team] | [limits] | [features] | [needs more seats/usage] |
| [Pro name] | $[X] / $[Y] | [growing team, paying customer] | [limits] | [adds: integrations, priority support] | [needs admin controls] |
| [Business/Team name] | $[X] / $[Y] | [multi-team, internal tool buyer] | [limits] | [adds: SSO, audit log, SLA] | [needs custom contract] |
| Enterprise | "Contact us" | [procurement-led buyer] | Custom | [adds: dedicated support, custom contract, security review] | n/a |

- **Free tier purpose** (lead gen / product-led trial / loss leader — pick one and be honest about it): [describe X]
- **Most likely tier to convert from free → paid:** [tier name]
- **Price tested against:** [competitor price points or willingness-to-pay research, if any]
- **Discounting policy** (founder-led deals, annual prepay, nonprofit/student): [describe X]

## 3. Unit Economics

> Rough numbers beat no numbers. Revisit this every time you have 10 more real customers.

| Metric | Formula | Current estimate | Target (12 mo) |
|---|---|---|---|
| CAC (Customer Acquisition Cost) | Total S&M spend ÷ new customers | $[X] | $[Y] |
| LTV (Lifetime Value) | ARPU × avg. customer lifespan (months) | $[X] | $[Y] |
| LTV:CAC ratio | LTV ÷ CAC | [X]:1 | 3:1 minimum, 5:1+ healthy |
| Gross margin | (Revenue − COGS) ÷ Revenue | [X]% | 70-85% typical for SaaS |
| Payback period | CAC ÷ (ARPU × gross margin) | [X] months | < 12 months |
| Monthly churn (logo) | Customers lost ÷ customers at start of month | [X]% | < 5% for SMB, < 1% for enterprise |
| Net Revenue Retention | (Starting MRR + expansion − contraction − churn) ÷ Starting MRR | [X]% | > 100% |
| ARPU (Avg. Revenue Per User) | MRR ÷ active paying customers | $[X] | $[Y] |

- **Biggest cost driver in COGS** (AI/LLM API costs, hosting, third-party data, support headcount): [describe X]
- **Cost-to-serve risk** (does usage-based AI cost scale faster than revenue per customer?): [describe X]
- **What would break these unit economics** (e.g., support load if onboarding isn't self-serve, API cost spike): [describe X]

## 4. Go-To-Market Motion

> Pick a primary motion. You can layer a second one once the first is proven — running three from day one means none of them get done well.

| Motion | Fits when... | Primary metric | Your fit (Y/N + why) |
|---|---|---|---|
| **Product-Led Growth (PLG)** | Self-serve product, fast time-to-value, low price point, viral/network loop available | Activation rate, free→paid conversion | |
| **Sales-Led** | High price point, multi-stakeholder buying decision, custom onboarding needed | Win rate, sales cycle length | |
| **Content-Led / Inbound** | Founder has audience or domain credibility, problem is search/community-discussed | Organic traffic → signup, content → demo rate | |
| **Outbound / Founder-Led Sales** | Narrow ICP, high ACV, you can name the first 50 customers | Reply rate, meetings booked | |
| **Community-Led** | Product solves a problem people already gather to discuss | Community members → activated users | |

- **Primary motion chosen:** [name it]
- **Why this motion, given the persona and price point in PROJECT.md:** [describe X]
- **First 10 customers — how do you actually get them** (be specific: which DM, which post, which existing relationship):
  ```
  [describe X]
  ```
- **Repeatable channel hypothesis to test next:** [describe X]

## 5. Distribution Channels

| Channel | Stage it's best for | Cost (time/$) | Owner | Status |
|---|---|---|---|---|
| SEO / organic content | Awareness, long-term compounding | High time, low $ | | Not started / Testing / Scaling |
| Paid social ads | Awareness → Consideration, fast feedback | Low time, high $ | | |
| Cold outreach (DM/email) | Consideration → first customers | High time, low $ | | |
| Communities / forums (Reddit, Discord, Slack groups) | Awareness, credibility | Medium time, low $ | | |
| Partnerships / integrations | Distribution leverage, trust transfer | Medium time, low $ | | |
| Affiliate / referral program | Retention → Referral | Low time, % of revenue | | |
| Marketplace listing (e.g., AppSumo, Product Hunt, GPT Store) | Launch spike | Low time, low $ or % cut | | |
| Existing audience (newsletter, YouTube, X) | All stages if it exists | Already sunk | | |

- **Channel currently producing the most signal:** [name it]
- **Channel to kill if it's not working by [date]:** [name it]

## 6. Competitive Positioning

| Competitor / Alternative | Their core promise | Their weakness | Your wedge (why you win for this persona) | Price comparison |
|---|---|---|---|---|
| [Direct competitor 1] | | | | |
| [Direct competitor 2] | | | | |
| [Generic tool used as workaround, e.g., spreadsheets/Notion] | "It's flexible and free" | No structure, no automation, breaks at scale | | |
| [Do-nothing / status quo] | "It's not broken enough to fix yet" | Hidden cost of inaction | | |

- **One-sentence positioning statement:**
  ```
  For [target persona] who [need/problem], [Product Name] is the
  [category] that [key differentiator] — unlike [main alternative],
  we [unique mechanism/benefit].
  ```
- **Category you're claiming** (new category vs. existing category with a wedge): [describe X]

## 7. Moat / Defensibility

> Be skeptical of yourself here. "We'll just move faster" is not a moat once a competitor has funding or an existing audience.

| Moat type | Applies? (Y/N) | Evidence / plan |
|---|---|---|
| Proprietary data / network effects | | [describe X] |
| Switching costs (data lock-in, workflow embedding) | | [describe X] |
| Brand / community / founder audience | | [describe X] |
| Distribution advantage (existing channel access) | | [describe X] |
| Speed of execution / iteration loop | | [describe X — weakest moat, name only if paired with another] |
| Integration depth / ecosystem lock-in | | [describe X] |
| Regulatory / compliance barrier (acts as moat against fast-movers) | | [describe X] |

- **Most defensible moat, ranked #1:** [name it and why]
- **What happens if a well-funded competitor copies the feature set in 90 days:** [describe X]

---

**Next step:** Move to [`FEATURE_MATRIX.md`](./FEATURE_MATRIX.md) to score and sequence the features that deliver on this business model.
