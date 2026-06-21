# MVP_SCOPE.md

**Phase:** S — Structure
**Purpose:** A focused worksheet for cutting a product idea down to the smallest thing that can prove or disprove your core hypothesis. `PROJECT.md` Section 11 asks *what's in scope* — this file forces the harder question: *what gets cut, and why, line by line.* If you can't defend a cut in one sentence, it isn't cut yet.

> Run this after `PROJECT.md` and `FEATURE_MATRIX.md` are filled, before any UX or build-spec work starts. An MVP scope that's still "TBD" by the time you open `02-HUMAN-FLOW/HUMAN_FLOW.md` will bloat every downstream doc.

---

## 1. Core Hypothesis

> One sentence. If this is wrong, the whole MVP was the wrong thing to build — say it plainly enough that it can fail.

```
If we build [the single core mechanism] for [specific audience],
then they will [specific behavior — sign up, return, pay, refer],
because [the underlying belief about their problem/motivation].
```

**Falsifiable test:** [What number, over what time window, proves or kills this? e.g. "20% of signups complete the core action within 48 hours, measured over the first 4 weeks."]

---

## 2. The One Flow That Must Work End-to-End

> MVPs fail when they have five half-working flows instead of one fully-working flow. Name exactly one. Every feature decision below gets measured against whether it serves this flow.

```
[Entry point] → [Step 1] → [Step 2] → [Step 3] → [Outcome: hypothesis-testing value delivered]
```

- **Flow name:**
- **Why this flow and not another:** [it's the one that, if broken, makes the whole product pointless]
- **What "works end-to-end" means here** (be literal — no mocked steps, no "the AI will figure it out"):
- **Who tests this first** (you, 1 friendly user, 5 cold users):

---

## 3. Feature Cut-List

> List every feature anyone has suggested — including your own ideas, stakeholder requests, and "just in case" additions. Cut ruthlessly. Default answer is **Y** (cut) unless it's required for the one flow above.

| Feature | Cut for MVP? (Y/N) | Why |
|---|---|---|
| [Feature name] | | |
| [Feature name] | | |
| [Feature name] | | |
| [Feature name] | | |
| [Feature name] | | |
| [Feature name] | | |

> **Rule of thumb:** if a feature exists to handle an edge case affecting <5% of early users, cut it. If it exists because "real products have this," cut it. If removing it breaks the one flow in Section 2, keep it — that's the only valid reason to keep something.

---

## 4. Build-Time Estimate

> Estimate in person-days, not person-weeks — MVP scope should be small enough that days, not weeks, is the right unit per item. If any single row exceeds 3-4 days, that item is probably not MVP-sized; split it or cut it.

| Component | Est. (person-days) | Confidence (H/M/L) | Notes |
|---|---|---|---|
| Auth / account creation | | | |
| Core data model + CRUD | | | |
| The one critical flow (Section 2) | | | |
| Minimal UI for the above | | | |
| Payment (if MVP charges money) | | | |
| Deployment + monitoring baseline | | | |
| **Total** | | | |

**Decision rule:** if the total exceeds your stated runway/patience by more than 50%, return to Section 3 and cut harder — don't pad the estimate to make the number look acceptable.

---

## 5. MVP "Done" Definition

> Write the exact bar that, once cleared, means you stop building and start putting this in front of real users. Vague answers here ("when it feels ready") are how MVPs become V1s without anyone deciding that on purpose.

```
MVP is done when:
1. [The one flow in Section 2] works end-to-end with no manual workarounds
2. [Specific quality bar — e.g. "doesn't crash on the 3 most common inputs"]
3. [Specific data bar — e.g. "survives one real signup without data loss"]
4. It has been used once, start to finish, by someone who is not you
```

**Explicitly NOT required for "done":** [list things people will be tempted to add before shipping — polish, edge cases, settings pages, admin tooling]

---

## 6. Worked Example

**Product:** Solo-consultant CRM (follow-up reminder tool)

**Core hypothesis:**
```
If we build a dead-simple "never forget a lead" reminder system for solo
consultants who currently track leads in spreadsheets/notes apps,
then they will set at least one reminder per week within their first
month, because their stated #1 problem is "I know I lost deals from
following up too late, but spreadsheets don't nudge me."
```

**Falsifiable test:** 30% of signups set at least 1 reminder in week 1, measured over the first 6 weeks of beta.

**The one flow:**
```
Add lead (name + note) → Set follow-up date → Get notified on that date
→ Mark as followed-up or snooze → Outcome: lead didn't go cold
```

**Feature cut-list (excerpt):**

| Feature | Cut for MVP? | Why |
|---|---|---|
| Add lead + set reminder | N | This is the entire hypothesis — cannot cut |
| Email + push notification on reminder | N | Without the nudge, it's just a spreadsheet again |
| Lead pipeline/stages (Kanban) | Y | Nice-to-have visualization, doesn't test the core nudge hypothesis |
| Team/multi-user accounts | Y | Solo consultants are the target; teams are a V1+ expansion |
| CSV import of existing leads | Y | Manual entry of 5-10 leads is acceptable friction for a hypothesis test |
| Custom reminder cadences (recurring) | Y | One-time reminders prove the hypothesis; recurring is an optimization |

**Build-time estimate (excerpt):** Auth (0.5d) + lead CRUD (1d) + reminder + notification (1.5d) + minimal UI (1d) + deploy (0.5d) = **4.5 days total**, Medium confidence (notification delivery is the riskiest unknown).

**MVP done definition:**
```
1. A user can add a lead, set a reminder, and receive a notification at
   the right time with zero manual intervention from us
2. Survives 10 leads + 10 reminders without data loss or duplicate notifications
3. One non-friendly user (not a friend, not us) has used it for a real lead
   and set at least one reminder unprompted
```

---

**Next step:** With MVP scope locked and the cut-list defended, move to [`../02-HUMAN-FLOW/HUMAN_FLOW.md`](../02-HUMAN-FLOW/HUMAN_FLOW.md) to map the one flow screen by screen.
