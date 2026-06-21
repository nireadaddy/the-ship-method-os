# AI_AGENT_WORKFLOW.md

**Phase:** I — Instruction
**Purpose:** A guide for orchestrating multiple AI tools across a build — when a single chat tool is enough, when a repo-aware agent (Cursor/Windsurf) earns its keep, and when you need a true multi-agent split (Planner/Builder/Reviewer). `03-INSTRUCTION/PROMPTS.md` gives you the prompt chain; this file gives you the *org chart* for which tool runs which stage of that chain, and how to keep them all reading from the same source of truth instead of drifting into contradictory context.

> If you're solo and the build is small, you don't need three agents — read Section 1 first and stop there if it tells you to.

---

## 1. Single Tool vs. Repo-Aware Agent vs. Multi-Agent Setup

| Setup | When it's the right call | When it backfires |
|---|---|---|
| **Single chat tool** (ChatGPT/Claude/Gemini, no repo access) | Pre-code stages — idea, product spec, UX spec, build plan. Also fine for an entire tiny MVP (<1 week) where you're hand-pasting code anyway. | Once a real codebase exists with more than a handful of files — you'll spend more time pasting context than the tool saves you. |
| **Repo-aware agent** (Cursor, Windsurf, Claude Code) | Any build where the codebase already exists and conventions matter — it reads real files via `@mentions`/context picker, runs the dev server, lints, and stays in sync with what's actually there. | Pre-spec stages, where there's no code yet to be "aware" of — it adds no advantage and risks generating code before specs are locked. |
| **Multi-agent setup** (separate Planner/Builder/Reviewer roles, same or different models) | Builds large enough that one continuous context window degrades quality — multi-week builds, multiple modules in parallel, or when you want a structurally independent reviewer that hasn't seen the builder's rationalizations. | Solo builder on an MVP under ~2 weeks — the coordination overhead (handoff docs, role-switching) costs more than it saves. Don't multi-agent a project that one disciplined session could finish. |

**Default recommendation:** start with a single chat tool through Stage 4 of `PROMPTS.md` (Build Plan), switch to a repo-aware agent for Stage 5-6 (Code Generation), and only add a formal multi-agent split once the build plan has more than ~15 tasks or more than one person/agent working in parallel.

---

## 2. Suggested Agent Role Split

> Use this when a build is big enough to warrant separating concerns. Each role can be a different chat/session, a different tool, or even a different model — the discipline matters more than the tooling.

| Role | Job | Reads | Writes | Must NOT do |
|---|---|---|---|---|
| **Planner** | Turns specs into an ordered, scoped task list. Owns sequencing and dependency mapping. | `01-STRUCTURE/`, `02-HUMAN-FLOW/`, `03-INSTRUCTION/TECH_SPEC.md`, `DATABASE_SPEC.md` | `03-INSTRUCTION/AI_BUILD_SPEC.md`, the task list | Write implementation code. Skip ahead to "just build it" when a spec gap appears — flag the gap back to the human instead. |
| **Builder** | Implements exactly one task at a time from the Planner's list. | The single task block, the relevant spec sections (schema, API contract, conventions) | Code, one task's worth at a time | Touch files outside the task's stated scope. Re-interpret the task's intent — ask the human if it's ambiguous rather than guessing. |
| **Reviewer** | Independently checks the Builder's output against the task's Definition of Done and the original specs — without having written the code itself. | The task's Definition of Done, the diff/output, the original spec sections | Pass/fail verdict + specific findings (not a rewrite) | Rubber-stamp. Fix the code itself (that re-introduces the same blind spots the Builder had) — findings go back to the Builder or human to fix. |

**Why Reviewer must be structurally separate:** an agent reviewing its own output tends to confirm its own assumptions. Use a fresh session/context (or a different tool entirely — e.g. Builder in Cursor, Reviewer in a clean Claude chat) so the review isn't contaminated by the Builder's reasoning trail.

---

## 3. Workflow Diagram — Handoffs Across the Chain

```
┌─────────────────────┐     ┌──────────────────────┐     ┌─────────────────────────┐     ┌──────────────────┐
│   01-STRUCTURE/      │     │   02-HUMAN-FLOW/      │     │   03-INSTRUCTION/        │     │  04-PUBLISH/      │
│   PROJECT.md          │     │   HUMAN_FLOW.md        │     │   TECH_SPEC.md           │     │  QA_CHECKLIST.md  │
│   FEATURE_MATRIX.md   │ --> │   SCREEN_PLANNING.md   │ --> │   DATABASE_SPEC.md       │ --> │  LAUNCH_CHECKLIST │
│   MVP_SCOPE.md        │     │   USER_JOURNEY.md      │     │   AI_BUILD_SPEC.md       │     │                    │
│                       │     │                        │     │                          │     │                    │
│   [Single chat tool]  │     │   [Single chat tool]   │     │   [PLANNER agent]        │     │   [REVIEWER agent] │
└─────────────────────┘     └──────────────────────┘     └────────────┬─────────────┘     └────────▲──────────┘
                                                                       │                              │
                                                                       v                              │
                                                          ┌─────────────────────────┐                 │
                                                          │  Cursor / Windsurf /     │                 │
                                                          │  Claude Code             │                 │
                                                          │  [BUILDER agent]         │                 │
                                                          │  one task per prompt     │ ────────────────┘
                                                          └─────────────────────────┘
                                                                       │
                                                                       v
                                                          per-task verification loop:
                                                          Builder ships task → Reviewer checks
                                                          against Definition of Done → pass:
                                                          next task / fail: back to Builder
```

**Reading the diagram:** documents flow left to right and never backward — a Builder agent should never be the one editing `PROJECT.md` to "make the spec match what got built." If reality and spec diverge, that's a human decision, logged back into the Structure docs explicitly (see Section 4).

---

## 4. Keeping Agents in Sync via Shared Source of Truth

The single biggest failure mode in multi-agent/multi-tool builds is **context drift** — one agent's session has stale or contradictory information relative to another's. The SHIP Method docs exist specifically to prevent this. Rules to enforce it:

1. **The repo files are the source of truth, not any agent's memory.** If a chat session and a repo file disagree, the file wins — update the file, don't carry the correction only in a chat transcript that will eventually be lost.
2. **Every agent reads from the file, not from another agent's paraphrase of the file.** If your Builder agent's context came from "the Planner told me," that's a drift risk — have it `@mention`/open the actual `AI_BUILD_SPEC.md` instead.
3. **Spec changes mid-build get written back immediately**, not just remembered. If a Builder discovers the database schema needs a column the spec didn't anticipate, that gets added to `DATABASE_SPEC.md` in the same sitting — the next agent session (or the Reviewer) needs to see it.
4. **One owner decides when a doc is "locked" for a build phase.** Don't let a Builder agent silently treat a spec as mutable mid-task — if something's wrong, it should stop and flag it back to the Planner/human rather than improvising a fix that never gets recorded.
5. **Use the same template language across tools.** If `AI_BUILD_SPEC.md` calls something "Definition of Done," every agent's prompt should use that exact phrase — synonyms ("acceptance criteria," "success state") across different agents make it harder to verify everyone is talking about the same bar.
6. **Re-paste/re-open source docs at the start of every new session**, even within the same tool. Chat history is not a reliable substitute for the current file state — files get edited; old chat context doesn't know that.

---

## 5. Quick Decision Checklist

- [ ] Is there a codebase yet? No → single chat tool. Yes → repo-aware agent for code stages.
- [ ] Is the build plan under ~15 tasks, solo builder? Yes → skip formal multi-agent roles, just follow the Stage 1-6 chain in `PROMPTS.md` directly.
- [ ] Is the build large/parallel enough to need role separation? Yes → assign Planner/Builder/Reviewer explicitly, even if all three are "you" using different sessions.
- [ ] Did a Builder agent discover a spec gap mid-task? Stop, write the fix back into the relevant `01-STRUCTURE/`, `02-HUMAN-FLOW/`, or `03-INSTRUCTION/` file, then resume — don't let the fix live only in chat history.
- [ ] Is the Reviewer using a context that's contaminated by the Builder's own reasoning? If yes, start a fresh session/tool for review.

---

**Next step:** Once your agent setup is decided, run the build using the exact stage prompts in [`PROMPTS.md`](./PROMPTS.md) — this file tells you *who* runs each stage, that file tells you *what* to paste.
