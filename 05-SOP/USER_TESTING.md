# USER_TESTING

## Purpose

Run structured moderated or unmoderated user testing sessions to surface usability problems, confusion points, and unmet expectations before and after launch — replacing guesswork with direct observation of real behavior.

## When to Run

- After MVP is deployed and shareable (per `MVP_BUILD.md`), before scaling user acquisition
- Before shipping any V1 (per `SHIPPING_V1.md`) on the core flows being changed
- Whenever activation or conversion metrics drop unexpectedly and the cause is unclear
- On a recurring cadence (e.g. monthly) even post-launch, to catch usability decay as features accumulate

## Inputs

- A working build (MVP, staging, or production) reachable by test participants
- 5-8 recruited participants matching the target audience per session round (5 is usually enough to surface most usability issues per Nielsen Norman Group research)
- A defined test script/task list
- A recording tool (screen + audio) for moderated sessions, or an unmoderated testing platform (Maze, UserTesting, Lookback) for unmoderated sessions

## Step-by-Step Procedure

1. **Decide moderated vs. unmoderated** based on what you need: moderated for deep qualitative "why," unmoderated for faster, larger-sample quantitative task-completion data.
2. **Define 3-5 core tasks to test**, tied directly to the core flow(s) (e.g. "Sign up and create your first [object]"). Don't test everything — test what matters most to activation/retention.
3. **Recruit participants matching the target audience.** Use existing waitlist/users where possible; supplement with a recruiting panel if the audience is hard to reach internally. Avoid testing only with team members or power users.
4. **Write the session script** using the template below. Keep it consistent across all participants so results are comparable.
5. **Run a pilot session internally** to catch script issues (confusing task wording, broken test environment) before burning a real participant slot.
6. **Run the sessions.** For moderated sessions: observe silently as much as possible, only intervene if the participant is fully stuck for >2 minutes or about to give up.
7. **Capture observations in real time**, not just from memory afterward — note exact moments of confusion, hesitation, wrong clicks, and verbatim quotes.
8. **Debrief immediately after each session** (within the hour) while details are fresh — write a 5-minute summary per session.
9. **Synthesize across all sessions** using the synthesis method below — look for patterns that repeat across ≥2 participants, not one-off quirks.
10. **Prioritize findings by severity and frequency** (use the same Blocker/Major/Minor/Cosmetic scale as `QA_CHECKLIST.md` where relevant, plus "Confusion" for usability-specific issues).
11. **Feed prioritized findings into the backlog** and decide which block the next release vs. which go to `FEEDBACK_LOOP.md` for longer-term tracking.

## Session Script Template

```
INTRO (2 min):
  "Thanks for doing this. I'm going to ask you to try a few things in this product.
  There's no wrong way to do this — if something is confusing, that's useful information for us,
  not a failure on your part. Please think out loud as you go. I won't be able to help much,
  so just do what feels natural."

WARM-UP QUESTION:
  "Before we start — how do you currently handle [problem area] today?"

TASK 1: [e.g. "Please sign up for an account."]
  Observe: time to complete, hesitation points, errors, verbatim reactions
TASK 2: [e.g. "Now create your first [core object]."]
  Observe: ...
TASK 3: [e.g. "Try to find/use [secondary feature]."]
  Observe: ...

CLOSING QUESTIONS:
  "What was confusing, if anything?"
  "What did you expect to happen that didn't?"
  "On a scale of 1-10, how likely are you to use this again? Why that number?"
  "Is there anything you wish it did that it doesn't?"

THANK YOU + INCENTIVE (if applicable)
```

## What to Observe

- Where the cursor/finger hesitates or moves back and forth (uncertainty)
- Tasks abandoned or given up on
- Wrong clicks / wrong assumptions about what an element does
- Verbal sighs, confusion, or surprise ("oh, I thought that would...")
- Time-to-complete per task vs. your internal expectation
- Whether they discover the core value without being told where to look

## Synthesis Method

1. List every observed issue from every session on a shared board, one per card.
2. Group cards into clusters by root cause (not by surface symptom).
3. Count how many distinct participants hit each cluster.
4. Rank clusters by (frequency × severity) — an issue 5/5 participants hit but rate Minor may outrank a Blocker only 1/5 hit.
5. Write a one-paragraph synthesis per top-3 cluster: what happened, why it likely happened, recommended fix.

## Outputs / Deliverables

- Session recordings (if moderated) and per-session debrief notes
- Synthesized findings doc, clustered and ranked by frequency × severity
- Top-3 usability issues with recommended fixes
- Updated backlog items, tagged with source ("user testing round N")
- Go/no-go recommendation if testing was gating a release

## Common Pitfalls

- **Helping the participant too much.** If you guide them past every confusion point, you'll never see where real users get stuck.
- **Testing with too few or too many participants.** 5-8 per round is the sweet spot — fewer misses patterns, many more has diminishing returns per round.
- **Asking leading questions** ("Don't you think this button is clear?") instead of open ones ("What do you think this button does?").
- **Only testing happy-path tasks.** Include at least one task that's likely to expose an edge case or error state.
- **Not debriefing immediately.** Memory of nuance fades fast — write the summary within the hour.
- **Treating a single participant's strong opinion as a mandate.** Look for patterns across ≥2 participants before prioritizing a fix.
