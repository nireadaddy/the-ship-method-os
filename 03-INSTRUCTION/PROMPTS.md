# PROMPTS.md

**Phase:** I — Instruction
**Purpose:** The complete prompt chain that turns a raw idea into shipped code, one AI conversation at a time. Each stage builds on the output of the one before it. Skipping a stage (e.g. jumping from "idea" straight to "code generation") is the single most common reason AI-built products end up broken, scope-creeped, or unshippable. Run the stages **in order**, every time.

> Every prompt below is copy-pasteable as-is. Replace bracketed placeholders, paste in the referenced SHIP Method file, and run it. Each stage also tells you exactly how to adapt it for ChatGPT, Claude, Gemini, and Cursor.

---

## The Chain

```
1. Idea            → rough concept, problem, audience
2. Product Spec    → 01-STRUCTURE/PROJECT.md filled out
3. UX Spec         → 02-HUMAN-FLOW/HUMAN_FLOW.md filled out
4. Technical Spec  → TECH_SPEC.md + DATABASE_SPEC.md filled out
5. Build Plan      → ordered, scoped task list from AI_BUILD_SPEC.md
6. Code Generation → actual code, one task at a time
```

Each stage's **output is the next stage's input.** Do not let an AI tool skip ahead and generate code in stage 2 "to save time" — that's exactly the shortcut SHIP exists to prevent.

---

## Stage 1 — Idea → Product Spec

**Goal:** Turn a vague idea into a filled `01-STRUCTURE/PROJECT.md`.

```
You are helping me turn a raw product idea into a structured product spec.

My raw idea: [describe your idea in 2-5 sentences — audience, problem, what
you imagine building]

I want you to fill out the following template completely. Do not skip
sections. If you don't have enough information for a section, ask me a
specific clarifying question instead of writing a generic placeholder.

Push back on weak answers — if my problem statement is vague ("things are
hard"), ask me to quantify it. If my target audience is "everyone," force me
to pick a primary segment.

Here is the template to fill (from PROJECT.md):

[PASTE THE FULL CONTENTS OF 01-STRUCTURE/PROJECT.md HERE]

Output the completed template in the same markdown format, ready to save
back into my repo as 01-STRUCTURE/PROJECT.md.
```

**Adapting per tool:**

- **ChatGPT:** Paste the full prompt + template in one message. If you have ChatGPT Projects, save `PROJECT.md`'s blank template as a Project file once — then you only need to paste your raw idea in new chats within that Project.
- **Claude:** Same approach. If you have Claude Projects, add the blank `PROJECT.md` template and `README.md` (for SHIP philosophy context) as Project knowledge — then every new chat in that Project already has the template loaded; you just paste your idea.
- **Gemini:** Paste the full prompt in one message. Gemini Gems can hold the template as a persistent system instruction the same way Projects work in ChatGPT/Claude — set this up once if you'll run this stage repeatedly.
- **Cursor:** This stage is conceptual, not code — Cursor adds little value here over a chat tool unless your repo is already initialized. If you do use it, open `01-STRUCTURE/PROJECT.md` in the editor and reference it with `@PROJECT.md` in chat instead of pasting; Cursor will read the file directly. Use Cursor's Ask/Chat mode, not Agent mode — you don't want it editing files autonomously yet.

---

## Stage 2 — Product Spec → UX Spec

**Goal:** Turn the completed `PROJECT.md` into a filled `02-HUMAN-FLOW/HUMAN_FLOW.md` (user journeys, screens, flows).

```
You are a senior product designer. I have a completed product spec below.
Your job is to design the human-facing flow: every screen, every user
journey, every decision point — before any code gets written.

Here is my completed product spec:

[PASTE YOUR COMPLETED 01-STRUCTURE/PROJECT.md HERE]

For each persona and each Job To Be Done listed above, map out:
1. The end-to-end user journey (entry point → goal achieved → what happens next)
2. Every screen needed, named clearly (e.g. "Lead Detail", not "Screen 3")
3. For each screen: what the user sees, what actions are available, what
   happens on success and on error/empty state
4. Navigation: how does the user get from screen to screen?
5. Call out any screen that serves more than one persona differently

Flag anything in the product spec that doesn't translate cleanly into a flow
— that's usually a sign the product spec itself is underspecified, not a
design problem to paper over.

Output as a structured markdown document I can save as
02-HUMAN-FLOW/HUMAN_FLOW.md.
```

**Adapting per tool:**

- **ChatGPT / Claude / Gemini:** Chat-first tools are ideal here — this stage is pure reasoning and writing, no code. If you have screens sketched (Figma, paper, screenshots), attach images; Claude and Gemini both handle multi-image reasoning well for "does this flow match what I drew" checks.
- **Cursor:** If `01-STRUCTURE/PROJECT.md` already exists in your repo, reference it with `@01-STRUCTURE/PROJECT.md` instead of pasting — Cursor pulls the live file so it's always in sync with edits. Still use Chat mode; this is a planning document, not code.
- **Windsurf:** Same pattern as Cursor — use its Cascade chat with the file referenced via the repo context picker rather than pasted text, so the model always sees the latest saved version.

---

## Stage 3 — UX Spec → Technical Spec

**Goal:** Turn the human flow into `TECH_SPEC.md` and `DATABASE_SPEC.md` — stack decisions and data model.

```
You are a pragmatic solutions architect advising a non-technical/solo
founder. I have a product spec and a UX flow below. Your job is to produce
two things: a technical architecture decision record, and a database schema
— both scoped to what this product actually needs, not what's impressive.

Bias toward boring, proven, cheap-to-operate technology unless there's a
specific reason (stated in the product spec) to do otherwise. Call out when
I'm over-engineering.

Product spec:
[PASTE COMPLETED 01-STRUCTURE/PROJECT.md HERE]

UX / flow spec:
[PASTE COMPLETED 02-HUMAN-FLOW/HUMAN_FLOW.md HERE]

Fill out these two templates completely, including the worked-example
sections (replace the examples with my actual product):

TECH_SPEC.md template:
[PASTE THE FULL CONTENTS OF 03-INSTRUCTION/TECH_SPEC.md HERE]

DATABASE_SPEC.md template:
[PASTE THE FULL CONTENTS OF 03-INSTRUCTION/DATABASE_SPEC.md HERE]

For the database schema, write real SQL (or your stated ORM's schema syntax)
in a code block, not prose description. Include indexes and RLS/auth
constraints if the stack uses Postgres + RLS.
```

**Adapting per tool:**

- **Claude:** Strong at holding two large templates plus two prior specs in context at once and producing long, structured SQL — this is the best chat-first tool for this stage if you're choosing one.
- **ChatGPT:** Equally capable; if using GPT-4-class models, ask it to "think step by step about the schema before writing it" to reduce missed relationships — explicit reasoning requests measurably improve schema completeness.
- **Gemini:** Good for this stage especially if your specs are long (large context window) — paste both full specs without trimming.
- **Cursor:** This is where Cursor starts adding real value — open the repo, reference `@01-STRUCTURE/PROJECT.md` and `@02-HUMAN-FLOW/HUMAN_FLOW.md`, and ask it to write `TECH_SPEC.md`/`DATABASE_SPEC.md` directly into `03-INSTRUCTION/` using Agent mode. It can also grep your existing codebase (if one exists) to keep stack choices consistent with what's already there — chat-only tools can't do that.
- **Windsurf:** Same advantage as Cursor (codebase-aware). Use Cascade in Write mode if you want it to save the files directly; review the diff before accepting.

---

## Stage 4 — Technical Spec → Build Plan

**Goal:** Turn the specs into a filled `AI_BUILD_SPEC.md` and an ordered, scoped task list — the Build Plan.

```
You are a technical project manager preparing work for an AI code generator.
Your job is NOT to write code yet. Your job is to turn the specs below into
(a) a completed AI_BUILD_SPEC.md, and (b) an ordered build plan: a numbered
list of discrete, independently testable tasks, each small enough to
generate and review in one sitting (roughly: one task = one PR).

For each task in the build plan, specify:
- Task name
- What files/modules it touches
- Dependencies (which earlier tasks must be done first)
- Definition of done (how I verify it works before moving to the next task)

Order tasks so that: data layer → API layer → UI layer → integration/polish,
and so that nothing depends on a task that comes later in the list.

Product spec:
[PASTE 01-STRUCTURE/PROJECT.md]

UX spec:
[PASTE 02-HUMAN-FLOW/HUMAN_FLOW.md]

Tech spec:
[PASTE 03-INSTRUCTION/TECH_SPEC.md]

Database spec:
[PASTE 03-INSTRUCTION/DATABASE_SPEC.md]

AI_BUILD_SPEC.md template to fill:
[PASTE THE FULL CONTENTS OF 03-INSTRUCTION/AI_BUILD_SPEC.md HERE]
```

**Adapting per tool:**

- **ChatGPT / Claude / Gemini:** All three handle this planning stage well since it's still reasoning-heavy, not code-heavy. Ask explicitly for the task list in a format you can paste into a task tracker (table or checklist) — don't accept prose paragraphs.
- **Cursor:** Strong choice if you want the build plan to live in the repo and reference real file paths it can already see (e.g. "Task 3 touches `app/api/leads/route.ts`" — Cursor can confirm that path exists). Use Agent mode to write `AI_BUILD_SPEC.md` directly, but stay in plan/ask mode for the task list itself — don't let it start coding yet.
- **Windsurf:** Same as Cursor. Its Planning mode (if available in your version) is built exactly for this stage — use it instead of free-form chat if present.

---

## Stage 5 — Build Plan → Code Generation

**Goal:** Generate real, working code — one task at a time, never the whole build plan in one prompt.

```
You are implementing ONE task from an approved build plan. Do not implement
any other task. Do not refactor unrelated code. Do not add features not
listed in the acceptance criteria.

Task: [paste the single task block from your build plan — name, files,
dependencies, definition of done]

Relevant specs (for context only — do not re-derive requirements, just use
these as ground truth for naming, types, and constraints):

Database schema for this task:
[PASTE the relevant table(s) from 03-INSTRUCTION/DATABASE_SPEC.md]

API contract for this task:
[PASTE the relevant rows from the API Requirements table in
03-INSTRUCTION/AI_BUILD_SPEC.md]

Stack constraints:
[PASTE relevant rows from 03-INSTRUCTION/TECH_SPEC.md, e.g. "Next.js 14 App
Router, Tailwind, shadcn/ui, Supabase client with RLS"]

Existing code conventions to follow: [paste a short example file from your
codebase showing naming/style conventions, or say "none yet — establish
conventions and state them in your response"]

After writing the code:
1. List every file you created or modified.
2. State explicitly how I verify this task is done, matching the Definition
   of Done above.
3. Flag anything you had to assume because the spec didn't cover it.
```

**Adapting per tool:**

- **Cursor (recommended default for this stage):** Use Agent mode inside the actual repo. Reference real files with `@filename` instead of pasting code conventions — it reads them directly and stays consistent with the existing codebase. Cursor can also run the dev server and lint/typecheck in the same session, so "verify this is done" can include "and confirm it builds," not just "here's how a human checks."
- **Windsurf:** Same strength as Cursor — codebase-aware Agent/Cascade mode, can run terminal commands to verify. Choose whichever editor you're already living in; the prompt is identical.
- **Claude:** Strong raw code quality and good at following constraints literally (useful when "don't touch unrelated code" matters). Without IDE integration, paste relevant existing files manually each time — Claude has no memory of your repo between chats unless you're using a tool with file access (e.g. Claude Code, which reads your repo directly the way Cursor does).
- **ChatGPT:** Similarly strong code generation; same caveat — chat-only ChatGPT has no repo access, so you must paste existing file contents for it to match conventions. If you have Code Interpreter/Canvas, use it to iterate on a single file in place rather than regenerating full files each time.
- **Gemini:** Capable, particularly for larger files thanks to context window — useful if a single task touches an unusually large existing file you'd rather not chunk.

**Universal rule for this stage:** one task per prompt, every time. A build plan with 12 tasks means 12 separate code-generation prompts (and 12 reviews), not one mega-prompt. This is the single highest-leverage discipline in the entire SHIP method — most "AI built it wrong" complaints trace back to skipping this.

---

## Compatibility Notes

| Tool | Strengths for this chain | How to feed it context | Gotchas |
|---|---|---|---|
| **ChatGPT** | Strong general reasoning at Stages 1-4; Projects feature gives persistent context across chats; Canvas useful for iterative single-file editing at Stage 6 | Paste full file contents into chat, or upload as a file attachment; use a Project with SHIP templates pre-loaded for repeat use | No native repo access — it cannot see your actual codebase unless you paste it; easy to accidentally let it "fill gaps" with invented requirements if your spec has holes — always ask it to flag assumptions |
| **Claude** | Excellent at holding multiple long documents in context at once (Stages 3-4); literal instruction-following at Stage 6 (good at "only do X, nothing else"); Projects hold persistent SHIP doc context | Paste full file contents, or use Claude Projects with templates as project knowledge; Claude Code (CLI) reads your repo directly like an IDE tool, closing the gap with Cursor/Windsurf | Same as ChatGPT for chat-only Claude.ai — no live repo access unless using Claude Code; very literal, so a vague task description produces a literal-but-wrong result rather than a creative guess |
| **Gemini** | Largest context window of the three chat tools — best for pasting very long specs without trimming; Gems provide persistent context similar to Projects | Paste full contents in one message; set up a Gem with blank SHIP templates for repeated use across multiple product builds | Output formatting (tables/code blocks) occasionally needs cleanup when copying back into markdown files; verify generated SQL/code blocks render cleanly before saving |
| **Cursor** | Best tool for Stages 3-6 once a repo exists — reads files via `@mentions`, can run terminal commands, lint, and typecheck in the same session as code generation; Agent mode can write spec files directly into `03-INSTRUCTION/` | Reference real files with `@filename` instead of pasting; keep specs as actual files in the repo so they're always current | Easy to let Agent mode run ahead and start generating code before specs are locked — explicitly stay in Ask/Chat mode for Stages 1-4, switch to Agent only at Stage 6; always review diffs before accepting |
| **Windsurf** | Comparable to Cursor for Stages 3-6 — Cascade mode is codebase-aware and can execute/verify; dedicated Planning mode (where available) maps well onto Stage 4 | Reference repo files via the built-in context picker rather than pasting; keep specs saved as files, not just chat history | Same discipline risk as Cursor — confirm you're in a planning/chat mode (not full auto-apply) until specs are finalized; review every auto-applied change before trusting "definition of done" claims |

---

**Next step:** Once Stage 6 code generation is complete for all build-plan tasks, move to `04-PUBLISH/` to prepare for launch.
