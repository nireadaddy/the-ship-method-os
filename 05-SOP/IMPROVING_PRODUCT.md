# IMPROVING_PRODUCT

## Purpose

Run a disciplined, recurring iteration cycle after launch — turning analytics signal and feedback into prioritized experiments, shipping them, and learning from outcomes — so the product compounds in value instead of drifting on ad hoc requests.

## When to Run

- Continuously post-launch, on a fixed cadence (recommended: weekly prioritization, bi-weekly or monthly retro)
- Whenever a North Star metric or key input metric (per `ANALYTICS.md`) plateaus or declines
- Whenever the feedback backlog (per `FEEDBACK_LOOP.md`) accumulates enough volume on a theme to warrant a decision

## Inputs

- Current analytics dashboard and North Star/input metric trends (`ANALYTICS.md`)
- Feedback backlog and monthly trend summary (`FEEDBACK_LOOP.md`)
- Prior experiment results/log
- Team capacity for the upcoming cycle

## Step-by-Step Procedure

1. **Open the cycle by reviewing the North Star metric and its input metrics** (per `ANALYTICS.md`) — identify which input metric most needs movement.
2. **Pull the top patterns from the feedback backlog** since the last cycle — bugs by severity, recurring feature requests, churn signal themes.
3. **Generate a candidate list of improvements/experiments** that could move the chosen input metric, drawing from both data and feedback — don't prioritize from feedback alone or data alone, triangulate both.
4. **Score each candidate** using a lightweight framework — Impact (1-5) × Confidence (1-5) ÷ Effort (1-5) is a reasonable default (ICE-style). Document the score, don't just rank by gut feel.
5. **Select the top 1-3 items for the cycle** based on score and team capacity. Resist the urge to start more than the team can finish — unfinished experiments produce no learning.
6. **Write a lightweight experiment design** for each selected item (template below) before building — define the hypothesis and success metric up front, not after seeing results.
7. **Build and ship the experiment** following the smallest viable version that can produce a valid read on the hypothesis (feature flag, percentage rollout, or A/B split where appropriate).
8. **Instrument the specific metric the experiment is meant to move** before shipping, per `ANALYTICS.md` conventions — don't ship first and instrument later.
9. **Let the experiment run for its predefined minimum duration** (set in the design template) before declaring a result — resist calling it early on noisy data.
10. **Read the result against the predefined success metric**, not against a vibe — was the hypothesis confirmed, rejected, or inconclusive?
11. **Decide next action**: ship fully / roll back / iterate and re-test. Document the decision and reasoning.
12. **Run the retro** (cadence below) reviewing the full cycle: what shipped, what moved metrics, what didn't, what's next.
13. **Feed unresolved or deprioritized candidates back into the backlog** for a future cycle rather than letting them disappear.

## Experiment Design — Lightweight Template

```
EXPERIMENT NAME: 
HYPOTHESIS: "We believe that [change] will cause [effect] for [user segment], 
            because [reasoning]."
INPUT METRIC TARGETED: 
SUCCESS METRIC + THRESHOLD: "We'll consider this validated if [metric] improves by 
            [X%] within [timeframe]."
MINIMUM RUN DURATION: 
ROLLOUT METHOD: [Feature flag % / A/B split / Full rollout to all users / Cohort-limited]
WHAT WE'RE NOT TESTING (scope boundary): 
OWNER: 
START DATE: 
RESULT (fill at end): 
DECISION (ship/rollback/iterate): 
LEARNING (true even if hypothesis was wrong): 
```

## Prioritization Cadence

| Cadence | Activity |
|---|---|
| Weekly | Review metrics dashboard + feedback intake; light re-prioritization if something urgent surfaces |
| Bi-weekly or Monthly | Full prioritization session — score candidates, select next cycle's 1-3 experiments |
| Monthly | Feedback trend review feeding into candidate generation |
| Quarterly | Step back from individual experiments — review whether the North Star metric itself and input metrics are still the right ones to chase |

## Retro Format

Run at the end of every cycle, 30-45 minutes, whole team.

```
1. WHAT DID WE SHIP THIS CYCLE?
   - [List experiments/changes shipped]

2. WHAT DID THE DATA SAY?
   - [Per experiment: result vs. predefined success metric]

3. WHAT DID WE LEARN (even from failed experiments)?
   - 

4. WHAT SURPRISED US?
   - 

5. WHAT'S BLOCKING FASTER ITERATION?
   - [Process, tooling, or scope issues to fix before next cycle]

6. TOP CANDIDATES FOR NEXT CYCLE:
   - 

7. ANYTHING TO ESCALATE OR REVISIT FROM PROJECT.md (pivot signal)?
   - 
```

## Outputs / Deliverables

- Scored candidate backlog, updated each cycle
- Experiment design docs for every shipped change (hypothesis, metric, result)
- Experiment results log (running history — ship/rollback/iterate decisions with reasoning)
- Cycle retro notes
- Updated North Star/input metric trend record

## Common Pitfalls

- **Running experiments without a predefined success metric.** Without one, every result can be rationalized as a win — define it before shipping.
- **Calling results too early.** Ending an experiment the moment it looks good (or bad) on day 2 produces false reads — respect the minimum run duration.
- **Prioritizing by whoever argues loudest in the room** instead of the ICE-style score — write the score down, reference it when discussions get circular.
- **Starting more experiments than the team can finish in a cycle.** Half-finished experiments produce zero learning and clutter the backlog.
- **Not instrumenting the metric before shipping** — then trying to reconstruct impact from incomplete data after the fact.
- **Skipping the retro when the cycle "went fine."** Retros catch process friction before it compounds — run them even on uneventful cycles.
- **Treating every failed experiment as wasted effort.** A clearly falsified hypothesis is a valid, valuable outcome — log the learning, don't just discard it.
