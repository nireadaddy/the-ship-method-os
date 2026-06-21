# `/ship` Orchestrator Command — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/ship` slash command that detects the project's SHIP phase and actively drives the user through Structure → Human Flow → Instruction → Publish, drafting answers into the docs.

**Architecture:** Docs-only. A Claude Code slash command (`.claude/commands/ship.md`) acts as a thin orchestrator that invokes the existing `ship-method` skill for gate logic and the Theme & First Screen step. A one-line pointer is added to the skill. Both files are mirrored into the ship-cli template so generated projects ship with `/ship`. Verification is via `grep`/`diff` (no test runner).

**Tech Stack:** Markdown. Claude Code slash-command format (YAML frontmatter + prompt body, `$ARGUMENTS` substitution).

## Global Constraints

- `/ship` is a thin orchestrator: it must NOT duplicate the gate definitions, the "never invent business facts" rule, or the Theme & First Screen procedure — those stay owned by the `ship-method` skill. The command references them.
- The command file and the skill file must each be byte-identical between `.claude/` and `ship-cli/templates/.claude/`.
- Path-aware: docs live at `docs/PROJECT.md` etc. in ship-create projects, and `01-STRUCTURE/PROJECT.md` etc. in the OS repo — the command handles both.
- Do NOT modify the 9 canonical ruleset files, `create.mjs`, or any starter-kit app code.
- Commit messages end with the Co-Authored-By trailer used in this repo.

---

### Task 1: Create the `/ship` command

**Files:**
- Create: `.claude/commands/ship.md`

**Interfaces:**
- Produces: the `/ship` command file. Task 3 copies it into the template by exact path.

- [ ] **Step 1: Create the directory and file with this exact content**

````markdown
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
````

- [ ] **Step 2: Verify the file exists with the required structure**

Run: `test -f .claude/commands/ship.md && grep -q "argument-hint" .claude/commands/ship.md && grep -q '\$ARGUMENTS' .claude/commands/ship.md && echo OK`
Expected: `OK`

Run: `grep -cE "S — Structure|H — Human Flow|I — Instruction|P — Publish" .claude/commands/ship.md`
Expected: `4`

Run: `grep -q "invoke the \`ship-method\` skill" .claude/commands/ship.md && echo "DELEGATES OK"`
Expected: `DELEGATES OK`

- [ ] **Step 3: Commit**

```bash
git add .claude/commands/ship.md
git commit -m "Add /ship orchestrator slash command

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Add a `/ship` pointer to the `ship-method` skill

**Files:**
- Modify: `.claude/skills/ship-method/SKILL.md`

**Interfaces:**
- Consumes: the `/ship` command name from Task 1.
- Produces: the updated SKILL.md. Task 3 copies it into the template.

- [ ] **Step 1: Add a bullet to the "When to Use This Skill" list**

Find this line in `.claude/skills/ship-method/SKILL.md`:

```markdown
- You're about to scaffold, design a schema, or write business logic and no `PROJECT.md` / `HUMAN_FLOW.md` exists yet for it
```

Replace it with:

```markdown
- You're about to scaffold, design a schema, or write business logic and no `PROJECT.md` / `HUMAN_FLOW.md` exists yet for it
- The user runs the `/ship` shortcut — drive them through the gates below one phase at a time, drafting their answers into the docs
```

- [ ] **Step 2: Verify the edit landed**

Run: `grep -q "The user runs the \`/ship\` shortcut" .claude/skills/ship-method/SKILL.md && echo OK`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/ship-method/SKILL.md
git commit -m "Point ship-method skill at the /ship shortcut

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Sync command + skill into the ship-cli template

**Files:**
- Create: `ship-cli/templates/.claude/commands/ship.md`
- Modify: `ship-cli/templates/.claude/skills/ship-method/SKILL.md`

**Interfaces:**
- Consumes: the finalized repo files from Tasks 1-2.
- Produces: byte-identical template copies so generated projects inherit `/ship`.

- [ ] **Step 1: Copy both files repo → template**

```bash
cd "/Users/nuttadechjunlawan/THE SHIP METHOD OS"
mkdir -p ship-cli/templates/.claude/commands
cp .claude/commands/ship.md ship-cli/templates/.claude/commands/ship.md
cp .claude/skills/ship-method/SKILL.md ship-cli/templates/.claude/skills/ship-method/SKILL.md
```

- [ ] **Step 2: Verify the copies are byte-identical**

```bash
cd "/Users/nuttadechjunlawan/THE SHIP METHOD OS"
diff -q .claude/commands/ship.md ship-cli/templates/.claude/commands/ship.md \
  && diff -q .claude/skills/ship-method/SKILL.md ship-cli/templates/.claude/skills/ship-method/SKILL.md \
  && echo "IN SYNC"
```
Expected: `IN SYNC`

- [ ] **Step 3: Commit**

```bash
git add ship-cli/templates/.claude/commands/ ship-cli/templates/.claude/skills/ship-method/SKILL.md
git commit -m "Sync /ship command and skill pointer into ship-cli template

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Single `/ship` orchestrator at `.claude/commands/ship.md` → Task 1. ✓
- Detect phase, path-aware (docs/ vs numbered folders) → Task 1 Steps 1-2. ✓
- Drive one question at a time, draft into docs, no invented facts → Task 1 Step 4 + Rules. ✓
- Full reach S→H→I→P incl. Theme & First Screen + feature code + checklist → Task 1 Step 4 (P). ✓
- Args: resume / status / `<phase>` → Task 1 Step 3. ✓
- DRY delegation to ship-method skill → Task 1 intro + verify "DELEGATES OK". ✓
- Pointer in SKILL.md → Task 2. ✓
- Mirror to template, byte-identical → Task 3. ✓
- No ruleset / create.mjs / app changes → none touched. ✓

**Placeholder scan:** No TBD/TODO in the plan itself; the `[TBD: ...]` string inside the command content is intentional command instruction text, not a plan gap. ✓

**Type consistency:** Filename `ship.md` and path `.claude/commands/ship.md` consistent across all tasks; phase labels ("S — Structure" etc.) identical between Task 1 content and verification grep. ✓
