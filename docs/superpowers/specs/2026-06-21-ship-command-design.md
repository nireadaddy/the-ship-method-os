# Design: `/ship` orchestrator slash command

**Date:** 2026-06-21
**Status:** Approved (design), pending implementation plan

## Problem

The SHIP Method is documented across many files and enforced passively by the
`ship-method` skill (it checks gates and points at templates). A user still has
to know the method, open the right docs, and fill them by hand. There is no
single shortcut that *drives* a user from idea to shipped system.

## Goal

A `/ship` slash command that, on each invocation, detects where the project is
in the SHIP flow and actively drives the next step — asking one question at a
time and drafting real content into the docs — all the way from an empty
project to a built, themed, shippable system.

## Decisions (locked during brainstorming)

1. **Shape:** A single `/ship` orchestrator (not per-phase commands, not a
   start-only command).
2. **Reach:** Drives the full flow S → H → I → P, including building feature
   code from the spec, the Theme & First Screen step, and the pre-launch
   checklist — not stopping at the spec.
3. **Doc authoring:** Drafts content into the docs directly from the user's
   answers. Never invents business facts; unknowns become clearly-labeled
   placeholders.

## Design

### Location & distribution

- Create `.claude/commands/ship.md` (repo).
- Copy to `ship-cli/templates/.claude/commands/ship.md` so every generated
  project ships with `/ship`.
- Slash commands are Claude-Code-specific. This is consistent with the existing
  `ship-method` skill, which already lives under `.claude/` and is not mirrored
  into the cross-tool ruleset files. Cross-tool behavior stays in
  `CLAUDE.md`/`.cursorrules`/etc.; Claude-specific tooling stays in `.claude/`.

### Command frontmatter

```markdown
---
description: Drive this project through the SHIP Method — Structure, Human Flow, Instruction, Publish.
argument-hint: "[status | structure | human-flow | instruction | publish]"
---
```

### Behavior on `/ship` (no argument)

1. **Detect phase.** Read the project's docs and find the first SHIP gate not
   yet satisfied. Path-aware: `docs/PROJECT.md`, `docs/HUMAN_FLOW.md`,
   `docs/AI_BUILD_SPEC.md` in `ship-create` projects; the numbered folders
   (`01-STRUCTURE/`, `02-HUMAN-FLOW/`, `03-INSTRUCTION/`) in the OS repo. A gate
   is unsatisfied if its file is missing or its core sections still contain
   `[bracket placeholders]` / unfilled template content.
2. **Announce status.** State the current phase and what is missing, e.g.
   "You're at **S — Structure**. `PROJECT.md` has 6 unfilled sections — let's
   fill them."
3. **Drive that phase, one question at a time.** Pull questions from the
   relevant template's section headers. After each answer, **draft the real
   content into the doc** (no invented facts; unknowns → labeled placeholders).
   When the phase's required sections are filled, confirm with the user and
   advance to the next phase.
4. **Phase order = the SHIP gates** (delegated to the `ship-method` skill, not
   re-specified here):
   - **S — Structure:** fill `PROJECT.md` core sections (Vision, Problem,
     Target Audience, MVP Scope).
   - **H — Human Flow:** fill `HUMAN_FLOW.md` core sections (Core Screens,
     Happy Path, at least one error/empty state).
   - **I — Instruction:** produce `AI_BUILD_SPEC.md` (functional requirements,
     data model, API contract).
   - **P — Publish:** run the **Theme & First Screen** step (via the skill's
     `theme-guide.md` — derive 2-3 themes, user picks, apply, build the real
     homepage), then build feature code from the spec, then walk the relevant
     pre-launch checklist (`QA_CHECKLIST.md` / `LAUNCH_CHECKLIST.md`).
5. **Resumable.** Every invocation re-detects the phase, so `/ship` always
   continues from where the user left off — no internal state to maintain.

### Arguments

- `/ship` — resume: drive from the first incomplete gate (default).
- `/ship status` — report each gate's pass/fail and stop; do not drive.
- `/ship <phase>` — jump to a named phase: `structure` | `human-flow` |
  `instruction` | `publish` (also accept `s` | `h` | `i` | `p`). Used to revisit
  an earlier phase deliberately.

### DRY relationship to the `ship-method` skill

`/ship` is a thin orchestrator. The gate definitions, the "don't invent business
facts" rule, and the Theme & First Screen procedure remain owned by the
`ship-method` skill and `theme-guide.md`. The command references them rather
than duplicating their text, so there is one source of truth.

## Files to change

| File | Change |
|---|---|
| `.claude/commands/ship.md` (new) + `ship-cli/templates/.claude/commands/ship.md` (new) | The `/ship` orchestrator command, identical in both. |
| `.claude/skills/ship-method/SKILL.md` + `ship-cli/templates/.claude/skills/ship-method/SKILL.md` | Add one line noting that users can run `/ship` to be driven through these gates. Keep both copies byte-identical. |

No change to the 9 canonical ruleset files, `create.mjs`, or any starter-kit
app code.

## Out of scope

- Cursor/Windsurf/other-tool command equivalents (those tools don't read
  `.claude/commands/`).
- Persisting orchestrator state between runs (re-detection makes it unnecessary).
- Changing the gate definitions or the Theme & First Screen step (owned by the
  skill).

## Success criteria

- Typing `/ship` in a fresh `ship-create` project detects "Structure" and starts
  asking Structure questions one at a time, writing answers into
  `docs/PROJECT.md`.
- Typing `/ship` again later resumes at the first still-incomplete gate.
- `/ship status` reports gate pass/fail without driving.
- The command and skill copies are byte-identical across repo and template.
- No business facts are invented; unknowns appear as labeled placeholders.
