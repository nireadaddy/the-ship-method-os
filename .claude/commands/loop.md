---
description: Build the project one feature at a time — pick the next feature from the spec, implement, test, check off, then pause for review.
argument-hint: "[status | <feature name or rank>]"
---

You are driving an iterative **feature build loop** via the `/loop` shortcut. Each run does exactly **one feature**, then stops for review. This command is a thin orchestrator on top of the SHIP Method — FIRST invoke the `ship-method` skill so the gate definitions, the "spec is source of truth" rule, and the "never invent business facts" rule are in scope. Do not duplicate or contradict the skill.

Argument passed: "$ARGUMENTS"

## Step 1 — Locate the docs

Use whichever set exists:
- `ship-create`-generated project: `docs/PROJECT.md`, `docs/HUMAN_FLOW.md`, `docs/AI_BUILD_SPEC.md`, `docs/FEATURE_MATRIX.md`, `docs/QA_CHECKLIST.md`.
- The SHIP Method OS repo itself: `01-STRUCTURE/PROJECT.md`, `02-HUMAN-FLOW/HUMAN_FLOW.md`, `03-INSTRUCTION/AI_BUILD_SPEC.md`, `01-STRUCTURE/FEATURE_MATRIX.md`, `04-PUBLISH/QA_CHECKLIST.md`.

## Step 2 — Check the gate before building

The loop only builds feature/business-logic code when Gates 1-3 pass. A gate is unsatisfied if its file is missing OR its core sections still contain `[bracket placeholders]` or unedited template content:

1. **S — Structure** — `PROJECT.md`: Vision, Problem Statement, Target Audience, MVP Scope.
2. **H — Human Flow** — `HUMAN_FLOW.md`: Core Screens, Happy Path, at least one error/empty state.
3. **I — Instruction** — `AI_BUILD_SPEC.md` exists with functional requirements, data model, and API contract.

If any gate is unsatisfied, STOP and tell the user to run `/ship` first (name which gate is missing). Do not start building.

## Step 3 — Handle the argument

- `status` → read `FEATURE_MATRIX.md` and the codebase, then report each feature as **built / pending / blocked** (one line each, in ranked order) and STOP. Do not build.
- a feature name or rank number → make that the target feature for this run.
- empty → the target is the **highest-ranked feature that is not yet built**.

## Step 4 — Build one feature

1. **Announce the target**: name the feature and quote its acceptance criteria / requirements from `AI_BUILD_SPEC.md` (and its rank/score from `FEATURE_MATRIX.md`). If no clear criteria exist in the spec, ask the user to clarify before writing code — do not invent them.
2. **Implement it.** The spec is the source of truth — if the user's request or the existing code conflicts with `AI_BUILD_SPEC.md`, point out the conflict instead of silently overriding it. Follow existing code patterns.
3. **Verify.** Run the project's tests / lint / build for what you changed and report the real output. Never claim passing without having run it. If something fails, debug it within this same run before stopping.
4. **Record.** Remind the user to add the relevant test cases to `QA_CHECKLIST.md`, and update `FEATURE_MATRIX.md` (mark this feature built; adjust scope if it changed).

## Step 5 — Stop for review (every round)

After the feature is built and verified, STOP and report:
- **Done:** what was implemented and where (files touched).
- **Verification:** the actual test/lint/build result.
- **Next up:** the next highest-ranked unbuilt feature, so the user knows what one more `/loop` will do.

Then wait. The user runs `/loop` again to build the next feature. This is a hard checkpoint — never roll straight into the next feature in the same run.

## Rules

- One feature per run. Always pause for review at Step 5 — do not chain features.
- Do not build feature/business-logic code until Gates 1-3 pass (scaffolding/config is fine anytime).
- Never invent business facts (market size, pricing, metrics, quotes) into docs or code — ask or leave a clearly-labeled `[TBD: ...]`.
- Keep no saved state — re-detect the next feature from `FEATURE_MATRIX.md` and the codebase every run, so the loop always resumes correctly.
- If you hit a blocker you cannot resolve (failing test you can't fix, missing decision, ambiguous spec), STOP and surface it rather than guessing.
