# PROJECT.md

**Phase:** S — Structure
**Purpose:** The single source of truth for *what* you're building and *why*, before any UX or code work starts. Every AI build prompt in `03-Instruction/` should be able to point back to this file instead of re-explaining the product from scratch.

> Fill every section. "TBD" is allowed once, on a first pass — it is not allowed by the time you move to `02-Human-Flow/HUMAN_FLOW.md`.

---

## 1. Product Vision

*One paragraph. What does this product become if it succeeds in 2 years? Write it like a mission statement, not a feature list.*

```
[Product Name] is a [category] that helps [target audience]
[achieve outcome] by [core mechanism], without [the old painful way].
```

## 2. Problem Statement

- **Who has this problem:**
- **What is the problem, specifically (not "things are hard"):**
- **How do they solve it today (workarounds, competitors, spreadsheets, manual labor):**
- **Why do existing solutions fail them:**
- **Cost of the problem** (time, money, missed opportunity, stress) — quantify if possible:

## 3. Opportunity

- **Why now** (market shift, new tech, behavior change, regulation, AI cost drop, etc.):
- **Market size / addressable audience** (rough is fine — TAM/SAM/SOM or just a number you trust):
- **Unfair advantage** (your access, audience, data, speed, niche knowledge):
- **Why AI makes this newly buildable by you, solo or with a small team:**

## 4. Target Audience

| Attribute | Description |
|---|---|
| Primary segment | |
| Secondary segment | |
| Demographics / firmographics | |
| Where they hang out (channels) | |
| What they currently pay for adjacent solutions | |
| Buying trigger (what makes them search for this *today*) | |

## 5. User Personas

> Create 1 primary persona minimum, up to 3. Do not skip this even for B2B/internal tools — "the admin" and "the end user" are personas too.

### Persona 1: [Name / Role]
- **Goal:**
- **Frustration:**
- **Tech comfort level:**
- **Quote that sounds like them:** "______"
- **What "success" looks like for them in this product:**

### Persona 2: [Name / Role]
- **Goal:**
- **Frustration:**
- **Tech comfort level:**
- **Quote that sounds like them:** "______"
- **What "success" looks like for them in this product:**

## 6. Jobs To Be Done

> Format: *When I [situation], I want to [motivation], so I can [expected outcome].*

| # | Job Statement | Priority (H/M/L) |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

## 7. Business Goals

- **Primary business goal (pick one):** Revenue / Users / Retention / Strategic positioning / Cost reduction
- **Specific target:** (e.g., "$10k MRR by Q3" / "500 active orgs by launch+90d")
- **Secondary goals:**
- **Non-goals** (explicitly out of scope for the business right now):

## 8. Success Metrics

| Metric | Definition | Target | How Measured |
|---|---|---|---|
| North Star Metric | | | |
| Activation metric | | | |
| Retention metric | | | |
| Revenue metric | | | |
| Leading indicator (early signal) | | | |

## 9. Revenue Model

- **Model type:** Subscription / Usage-based / One-time / Freemium / Marketplace take-rate / Ads / Services
- **Pricing tiers (draft):**
  | Tier | Price | Who it's for | What's included |
  |---|---|---|---|
  | | | | |
- **Unit economics assumption** (CAC, LTV, gross margin — rough is fine at this stage):
- **What converts a free/trial user to paid:**

## 10. Feature Prioritization

> Score every candidate feature. Use RICE (Reach × Impact × Confidence ÷ Effort) or MoSCoW. Pick one method and stay consistent.

| Feature | Reach | Impact | Confidence | Effort | Score | Decision |
|---|---|---|---|---|---|---|
| | | | | | | Must / Should / Could / Won't |

## 11. MVP Scope

- **MVP hypothesis:** "If we build X for Y, then Z will happen."
- **In scope (the absolute minimum to test the hypothesis):**
  - [ ]
  - [ ]
  - [ ]
- **Explicitly out of scope for MVP:**
  - [ ]
  - [ ]
- **MVP "done" definition:**

## 12. V1 Scope

> V1 = first version you charge money for / put in front of real, non-friendly users at scale.

- **Adds on top of MVP:**
  - [ ]
  - [ ]
- **Quality bar for V1** (performance, design polish, support, legal/compliance):

## 13. V2 Scope

> Park ideas here so they stop competing for attention in MVP/V1 planning.

- **Candidate features (not committed):**
  - [ ]
  - [ ]
- **Trigger to revisit this list:** (e.g., "after 100 paying customers" / "after MVP retention > 30%")

## 14. Risks

| Risk | Type (Market/Tech/Team/Legal/Financial) | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| | | | | |

## 15. Assumptions

> List every assumption this plan depends on. Each one is a thing that could be wrong and should eventually be tested.

| Assumption | Confidence (H/M/L) | How / when we'll validate it |
|---|---|---|
| | | |

---

**Next step:** Once this file has no unresolved TBDs, move to [`02-Human-Flow/HUMAN_FLOW.md`](../02-Human-Flow/HUMAN_FLOW.md).
