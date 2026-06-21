# FEEDBACK_SYSTEM.md

**Phase:** P — Publish
**Purpose:** The system design for how feedback gets collected, structured, and routed back into product decisions — distinct from `05-SOP/FEEDBACK_LOOP.md`, which is the *operating procedure* (the weekly ritual). This file is the *architecture*: which tools/channels you actually wire up, the data schema that intake gets logged into, the triage rubric that turns raw text into a severity/priority decision, and exactly how a recurring theme gets back into `01-STRUCTURE/FEATURE_MATRIX.md` as a re-score, not just a Slack message that fades.

> Set this up once, before launch. Retrofitting a feedback system after 200 pieces of scattered feedback already exist is a much worse weekend than building it first.

---

## 1. Tools & Channels

> Pick the smallest set of channels you can actually monitor at your current stage. Every unmonitored channel is worse than no channel — it creates the appearance of listening without the substance.

| Tool/Channel | What it's for | Stage to add it | Cost/effort to set up |
|---|---|---|---|
| **In-app feedback widget** (e.g. a simple modal/Typeform embed, or a tool like Canny/Featurebase) | Contextual, in-the-moment friction — "I was right here when it went wrong" | MVP / first users | Low — a single embedded form is enough at MVP |
| **Support email/inbox** (e.g. a dedicated `support@` or `feedback@` address) | Direct, often higher-intent feedback; account/billing issues | MVP / first users | Low — one inbox, one person checking it |
| **Post-signup survey** (1-2 questions, e.g. via the app or a lightweight form) | Expectation mismatch — what they thought they were getting | MVP / first users | Low — 1-2 questions max, more gets ignored |
| **NPS / satisfaction prompt** (day 7, day 30) | Trend-level sentiment over time, not individual fires | V1 launch | Low-medium — needs a trigger/scheduling mechanism |
| **Community channel** (Discord/Slack community, or a subreddit/forum you own) | Unsolicited, often more candid feedback; peer-to-peer validation of pain points | V1 / once there's an active user base worth gathering | Medium — requires ongoing moderation/presence |
| **Direct user interviews/calls** | Deep qualitative insight that text feedback can't surface | Ongoing, scheduled — start at MVP with 5-10 friendly users | Medium — time cost per call, but highest signal per hour spent |
| **Social/public mentions monitoring** (manual search or a tool like a saved Twitter/X search) | Public, unsolicited sentiment — what people say when they don't think you're watching | V1 launch | Low — manual check 2-3x/week is enough pre-scale |

**Stage rule:** at MVP, you need exactly three channels — in-app widget, support inbox, and the post-signup survey. Resist adding more until those three are consistently monitored.

---

## 2. Feedback Intake Schema

> Every piece of feedback, regardless of source channel, gets normalized into this schema in one shared location (spreadsheet, Airtable, Linear/Notion — pick one tool, do not split across tools). This is the data model `05-SOP/FEEDBACK_LOOP.md`'s triage ritual operates on.

| Field | Type | Example |
|---|---|---|
| **Source** | Enum: In-app widget / Email / Survey / Community / Social / Interview / Churn survey | `In-app widget` |
| **Date** | Date received | `2026-06-14` |
| **User** | Name/email/account ID (anonymized if needed for sensitive feedback) | `user_8821` |
| **Raw text** | Verbatim quote, not paraphrased | `"I couldn't figure out how to add a second teammate"` |
| **Theme** | Short, specific tag — not "UX issues" | `Team invite flow unclear` |
| **Severity** | Blocker / Major / Minor / Cosmetic (bugs) or N/A (non-bug feedback) | `Minor` |
| **Status** | New / Triaged / In progress / Shipped / Won't fix / Closed | `Triaged` |
| **Linked feature (if any)** | Pointer to the row in `FEATURE_MATRIX.md`, if this feedback maps to an existing or candidate feature | `Team invites` |
| **Owner** | Who's responsible for the next action | `you` |

```
INTAKE ROW TEMPLATE:
Source:        [In-app widget / Email / Survey / Community / Social / Interview / Churn survey]
Date:          [YYYY-MM-DD]
User:          [name/email/ID, anonymized if needed]
Raw text:      "[verbatim quote]"
Theme:         [short, specific tag]
Severity:      [Blocker / Major / Minor / Cosmetic / N/A]
Status:        [New / Triaged / In progress / Shipped / Won't fix / Closed]
Linked feature: [FEATURE_MATRIX.md row, if applicable]
Owner:         [name]
```

---

## 3. Triage Rubric

> Applied during the recurring triage session defined in `05-SOP/FEEDBACK_LOOP.md`. The rubric exists so triage decisions are consistent across sessions and people, not vibes-based.

| Step | Question | Decision |
|---|---|---|
| 1. Is this a bug? | Does the product behave incorrectly vs. its intended behavior? | Yes → assign Severity (Blocker/Major/Minor/Cosmetic per `QA_CHECKLIST.md` scale), route to engineering backlog |
| 2. Is this a single voice or a pattern? | Has this exact theme appeared ≥3 times in the current intake window? | No → log it, don't act on it yet. Yes → escalate to "Theme" status, eligible for re-scoring (Section 4) |
| 3. Does it map to an existing feature? | Is there already a row for this in `FEATURE_MATRIX.md`? | Yes → attach feedback as supporting evidence for that row's next re-score. No → it's a new candidate feature, add a new row |
| 4. Is it urgent regardless of frequency? | Is this a churn signal, security concern, or data-integrity issue? | Yes → bypass frequency threshold, escalate same-day regardless of how many times it's been reported |
| 5. What's the cost of inaction? | If we do nothing for 30 days, what happens? | High cost (active churn, reputational risk) → prioritize now. Low cost (minor friction) → log and revisit at next monthly trend review |

**Severity/priority shorthand carried into intake:**

| Severity (bugs) | SLA |
|---|---|
| Blocker | Same day |
| Major | 48 hours |
| Minor | Within 1 week |
| Cosmetic | Backlog, no SLA |

---

## 4. How Feedback Themes Feed Back Into FEATURE_MATRIX.md Re-Scoring

> This is the loop that makes the feedback system actually matter — feedback that never changes a score is feedback that was collected for show.

1. **A theme crosses the pattern threshold** (≥3 independent mentions, or 1 urgent/churn-signal mention) during triage.
2. **Check if the theme maps to an existing `FEATURE_MATRIX.md` row.**
   - If yes: this feedback is new evidence for that row's **Reach** and **Confidence** inputs specifically — increased mention frequency raises Reach (more people affected than originally estimated) and raises Confidence (you now have real user signal, not a guess).
   - If no: add a new candidate row to `FEATURE_MATRIX.md` with an initial RICE estimate, citing the feedback theme as the source of the Reach/Impact estimate.
3. **Re-run the RICE score** for the affected row(s) with the updated inputs. Do not just bump the score intuitively — recalculate it the same way every other row was calculated, so the list stays comparable.
4. **Re-sort the feature list.** If the new score changes the row's bucket (e.g. from V2 to V1), that's the system working as intended — act on it in the next planning cycle, not immediately mid-sprint (see `FEATURE_MATRIX.md` Section 6 anti-patterns on re-scoring discipline).
5. **Log the link both ways**: the `FEATURE_MATRIX.md` row should note "re-scored on [date] based on feedback theme: [theme name]," and the feedback intake row should note the `FEATURE_MATRIX.md` row it informed. This traceability is what lets you answer "why did we build this" months later with a real answer instead of "it felt important."
6. **Monthly trend review** (per `05-SOP/IMPROVING_PRODUCT.md` cadence): pull every theme that crossed threshold in the last 30 days and confirm each one has either been re-scored into `FEATURE_MATRIX.md` or explicitly logged as "acknowledged, not actioned, because [reason]." No theme should silently disappear.

```
RE-SCORE LOG ENTRY TEMPLATE (append to the relevant FEATURE_MATRIX.md row's notes):
Date: [YYYY-MM-DD]
Feedback theme: [theme name, link to intake rows]
Mentions: [count]
Score before: [old RICE score]
Score after: [new RICE score]
Bucket change: [e.g. "V2 → V1" or "no change"]
```

---

**Next step:** With channels wired and the intake schema in place, hand the day-to-day operation of this system to [`../05-SOP/FEEDBACK_LOOP.md`](../05-SOP/FEEDBACK_LOOP.md) — that file runs the weekly ritual against the schema defined here.
