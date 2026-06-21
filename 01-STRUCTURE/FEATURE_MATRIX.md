# FEATURE_MATRIX.md

**Phase:** S — Structure
**Purpose:** A scoring system that turns "everything feels important" into a ranked, defensible build order. This is the file you point to when a stakeholder (or your own excitement) tries to add a feature mid-sprint.

> Score every candidate feature with the same method, every time. Switching methods mid-list makes scores incomparable and the whole exercise pointless.

---

## 1. Choose Your Method

| Method | Best for | How it scores |
|---|---|---|
| **RICE** | Comparing many features with different scopes, when you can estimate numbers | (Reach × Impact × Confidence) ÷ Effort |
| **MoSCoW** | Fast triage with a small team, less precision needed | Must / Should / Could / Won't — bucket only, no math |

> Default recommendation for solo builders and small teams: **RICE**. It forces you to write down *why* something is prioritized, not just *that* it is. Switch to MoSCoW only when you need a quick gut-check pass before a release cutoff.

---

## 2. RICE Scoring Definitions

| Factor | Question it answers | Scale |
|---|---|---|
| **Reach** | How many users/customers does this touch in a given period (e.g., per month)? | Raw number, e.g., 500 (users/month affected) |
| **Impact** | How much does this move the needle for each user who's reached? | 3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal |
| **Confidence** | How sure are you about your Reach/Impact estimates? | 100% = high confidence, 80% = medium, 50% = low |
| **Effort** | How much time/work to ship (person-weeks is a good unit) | Raw number, e.g., 2 (person-weeks) |
| **Score** | The output that ranks features | (Reach × Impact × Confidence) ÷ Effort |

---

## 3. Feature Scoring Table

| Feature | User Story | Reach | Impact | Confidence | Effort | Score | Bucket (MVP / V1 / V2) |
|---|---|---|---|---|---|---|---|
| *Example:* Magic-link login | *As a new user, I want to sign up without creating a password so I can start using the product in under 30 seconds.* | 800 | 2 | 90% | 1.5 | **960** | MVP |
| [Feature name] | As a [persona], I want to [action], so that [outcome]. | | | | | | |
| [Feature name] | As a [persona], I want to [action], so that [outcome]. | | | | | | |
| [Feature name] | As a [persona], I want to [action], so that [outcome]. | | | | | | |
| [Feature name] | As a [persona], I want to [action], so that [outcome]. | | | | | | |
| [Feature name] | As a [persona], I want to [action], so that [outcome]. | | | | | | |

> **Worked example math:** (800 reach × 2 impact × 0.90 confidence) ÷ 1.5 effort = 960. Compare this score against every other row — higher score ships first, all else (dependencies, risk) being equal.

---

## 4. MoSCoW Cross-Check (Optional Second Pass)

> Run this after RICE to sanity-check that your top-scored features actually match gut feel. If a "Must Have" scores low on RICE, one of your estimates is probably wrong — investigate before trusting the number blindly.

| Feature | Must / Should / Could / Won't | Reasoning |
|---|---|---|
| [Feature name] | Must | [e.g., "product doesn't function as a business without this"] |
| [Feature name] | Should | [e.g., "expected by users, but workaround exists short-term"] |
| [Feature name] | Could | [e.g., "delights users but no one churns without it"] |
| [Feature name] | Won't (this cycle) | [e.g., "real need, wrong time — revisit at V2 trigger"] |

---

## 5. Dependency Check

> A high RICE score doesn't mean a feature can ship first if something else must exist for it to work. Map this before locking the sequence.

| Feature | Depends on | Blocks |
|---|---|---|
| [Feature name] | [e.g., "needs auth system shipped first"] | [e.g., "blocks team invites feature"] |

---

## 6. How to Run a Prioritization Session

### Solo Builder (30-45 min, by yourself)

1. **Brain-dump first, score second.** List every feature idea without judging it — get them all out of your head and onto this table.
2. **Write the user story before the score.** If you can't write "As a [persona], I want to..." in one sentence, the feature isn't well-defined enough to score yet — fix that first.
3. **Score Reach and Effort first** (the two you can estimate with the least bias), then Impact, then Confidence last — Confidence is the easiest number to fool yourself on, so anchor it against the other three.
4. **Sort by score.** Take the top 5-8 for MVP, next 8-12 for V1, park the rest in V2.
5. **Sleep on it.** Re-read the top 5 the next day before committing — solo prioritization is vulnerable to whatever excited you most recently.

### Small Team (60-90 min, async + live)

1. **Async pre-work:** Each person scores independently (without seeing others' scores) using the same template, 48 hours before the session.
2. **Live session — surface disagreement, not just averages:** For any feature where scores differ by more than 2x, discuss *why* before averaging. Disagreement on Confidence usually means someone has data the others don't.
3. **One owner per feature:** Whoever scored it highest doesn't automatically own it — assign based on who will actually build/validate it.
4. **Timebox debate to 5 minutes per feature.** If you can't agree in 5 minutes, park it and move on — revisit at the end with fresh eyes.
5. **Lock the list and write down what would change it.** E.g., "If churn data shows X, re-prioritize Y." This prevents re-litigating the list every week.

### Anti-patterns to avoid

- [ ] Scoring Impact based on how excited *you* are about the feature, not the user
- [ ] Letting the loudest stakeholder's request skip the scoring process entirely
- [ ] Re-scoring every week instead of committing to a cycle (weekly re-scoring = no sequencing, just vibes)
- [ ] Using Effort estimates from before you understood the technical approach (re-estimate after a spike if needed)
- [ ] Treating V2 as "no," when it should mean "not now, with a stated trigger to revisit"

---

**Next step:** With features scored and bucketed, move to [`../02-HUMAN-FLOW/HUMAN_FLOW.md`](../02-HUMAN-FLOW/HUMAN_FLOW.md) to map how users actually move through the MVP feature set.
