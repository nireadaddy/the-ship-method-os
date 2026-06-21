---
description: Drive this project through the SHIP Method — Structure, Human Flow, Instruction, Publish.
argument-hint: "[status | structure | human-flow | instruction | publish]"
---

You are driving this project through **The SHIP Method** via the `/ship` shortcut. FIRST invoke the `ship-method` skill — it owns the gate definitions, the "never invent business facts" rule, and the Theme & First Screen procedure. This command is a thin orchestrator on top of it; do not duplicate or contradict the skill.

Argument passed: "$ARGUMENTS"

## Step 1 — Locate the docs

Determine where this project's SHIP docs live and use whichever set exists:
- `ship-create`-generated project: `docs/PROJECT.md`, `docs/HUMAN_FLOW.md`, `docs/AI_BUILD_SPEC.md`.
- The SHIP Method OS repo itself: `01-STRUCTURE/PROJECT.md`, `02-HUMAN-FLOW/HUMAN_FLOW.md`, `03-INSTRUCTION/AI_BUILD_SPEC.md`.

## Step 2 — Detect the current phase

Walk the gates in order and find the FIRST one not yet satisfied. A gate is unsatisfied if its file is missing OR its core sections still contain `[bracket placeholders]` or unedited template / "Worked Mini-Example" content instead of this project's real content.

1. **S — Structure** — `PROJECT.md` core sections filled: Vision, Problem Statement, Target Audience, MVP Scope.
2. **H — Human Flow** — `HUMAN_FLOW.md` core sections filled: Core Screens, Happy Path, and at least one error/empty state.
3. **I — Instruction** — `AI_BUILD_SPEC.md` exists with functional requirements, data model, and API contract.
4. **P — Publish** — Theme & First Screen done, feature code built from the spec, and the pre-launch checklist walked.

## Step 3 — Handle the argument

- `status` → report each gate as pass/fail with one line on what's missing, then STOP (do not drive).
- `structure`/`s`, `human-flow`/`h`, `instruction`/`i`, `publish`/`p` → jump to that phase regardless of detection (used to revisit an earlier phase).
- empty or anything else → resume at the first incomplete gate from Step 2.

## Step 4 — Drive the phase

Announce the phase and what is missing, e.g. "You're at **S — Structure**. `PROJECT.md` has N unfilled sections — let's fill them."

Then, **one question at a time** (pull questions from the relevant section headers):
- Ask → wait for the answer → **draft the real content into the doc** for that section.
- Never invent business facts (market size, pricing, metrics, quotes). If the user doesn't know, write a clearly-labeled placeholder like `[TBD: ...]` and move on.
- When the phase's required sections are filled, summarize what was written, confirm with the user, then advance to the next phase by re-running this flow.

For **P — Publish**, follow the `ship-method` skill's Theme & First Screen step (use `theme-guide.md`): derive 2-3 themes from `PROJECT.md`, let the user pick one, apply it, build the real homepage from `HUMAN_FLOW.md`, then build the remaining feature code from the spec, then walk `QA_CHECKLIST.md` / `LAUNCH_CHECKLIST.md`.

## Rules

- Ask exactly one question per message.
- Do not generate feature/business-logic code until Gates 1-3 pass (scaffolding/config is fine anytime).
- `/ship` keeps no saved state — it re-detects the phase every run, so it always resumes correctly.
