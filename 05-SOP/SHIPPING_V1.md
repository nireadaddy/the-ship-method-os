# SHIPPING_V1

## Purpose

Take validated MVP learnings and turn them into a properly scoped, QA-gated, coordinated V1 release — the first version intended for sustained real-world use and growth, not just a validation experiment.

## When to Run

- After MVP has demonstrated activation/retention signal worth building on (per `MVP_BUILD.md` outputs and `USER_TESTING.md` findings)
- Before any push for broader user acquisition or paid marketing spend
- When moving from "we're testing if this works" to "we're committing to support this"

## Inputs

- MVP usage data and analytics (per `ANALYTICS.md`)
- User testing synthesis (per `USER_TESTING.md`)
- Outstanding feedback backlog (per `FEEDBACK_LOOP.md` if already running)
- Updated `PROJECT.md` reflecting any pivots learned from MVP stage

## Step-by-Step Procedure

1. **Review all MVP-stage evidence together**: analytics funnels, user testing findings, qualitative feedback. Identify what's working (keep/expand) vs. what's broken (fix) vs. what's unused (cut).
2. **Set V1 scope explicitly**, distinguishing it from MVP scope: V1 should be reliable and complete enough to support real, possibly paying, users — not just prove a hypothesis. Write the scope as a list of committed features and an explicit non-goals list (same discipline as MVP_BUILD step 3).
3. **Prioritize the backlog** using a lightweight framework (e.g. impact vs. effort) — fix the highest-impact usability/bug issues found in testing before adding any new feature.
4. **Define V1 done criteria** up front: what must be true for V1 to be considered ready to ship (e.g. "core flow works with zero Blockers, mobile responsive, billing live, support channel staffed").
5. **Build/fix in priority order**, keeping the core flow stable — don't refactor architecture and add features simultaneously without a safety net (tests, staging environment).
6. **Set up or upgrade the production environment**: proper staging/production separation, backups, monitoring/alerting, error tracking — MVP-stage shortcuts get hardened here.
7. **Run the full QA gate** (`QA_CHECKLIST.md`, all sections, not just MVP-scoped subset) — including cross-browser, accessibility, security, and data integrity sections.
8. **Run the SEO checklist** (`SEO_CHECKLIST.md`) if V1 includes public-facing pages intended to drive organic traffic.
9. **Confirm analytics instrumentation matches the V1 event taxonomy** (`ANALYTICS.md`) including any new flows added since MVP.
10. **Coordinate the launch** using `LAUNCH_PLAN.md` — timeline, channel plan, runbook, rollback plan.
11. **Ship V1** following the launch-day runbook.
12. **Open the feedback loop formally** (`FEEDBACK_LOOP.md`) from day one of V1 — this is no longer informal MVP-stage feedback gathering.

## Outputs / Deliverables

- Documented V1 scope (committed features + non-goals)
- Updated/hardened production environment with monitoring and backups
- QA sign-off (per `QA_CHECKLIST.md`) with zero open Blockers/Majors
- Completed `LAUNCH_PLAN.md` for the V1 release
- Live V1 product with full analytics instrumentation
- Formalized feedback intake process running from launch day

## Common Pitfalls

- **Treating V1 as "MVP but prettier."** V1 means production-grade reliability — backups, monitoring, real QA — not just visual polish.
- **Adding new scope based on excitement rather than evidence.** Every new V1 feature should trace back to MVP data or testing findings, not founder intuition alone.
- **Skipping the QA gate because "it worked in MVP."** MVP-stage QA was intentionally scoped down; V1 requires the full checklist.
- **Launching V1 without a rollback plan**, assuming "it's just a bit more polished, what could go wrong" — V1 usually carries more user trust and more at stake than MVP.
- **Not closing the loop on user testing findings** — shipping V1 without addressing the top usability issues found in `USER_TESTING.md` wastes the research investment.
- **Conflating "feature complete" with "done."** Done criteria must include reliability, support readiness, and analytics — not just feature checklist completion.
