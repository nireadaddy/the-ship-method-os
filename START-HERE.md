# START HERE

**Read time:** ~10 minutes. **Goal:** know exactly which file to open next, no matter where you are.

---

## 1. What This Repo Actually Does

The SHIP Method OS turns "I have an idea" into a built, launched product by forcing four phases **in order**:

```
S — STRUCTURE     →   H — HUMAN FLOW   →   I — INSTRUCTION   →   P — PUBLISH
(what & why)           (the experience)      (AI-ready specs)      (ship it)
```

You cannot skip a phase and expect AI to fill the gap. AI is a literal, fast builder — it builds exactly what you specify, including your missing thinking. SHIP makes you do the thinking first, in writing, in this repo.

## 2. The 15-Minute Quick Start

| Step | Do this | File |
|---|---|---|
| 1 | Write your one-paragraph vision + problem statement | [`01-STRUCTURE/PROJECT.md`](./01-STRUCTURE/PROJECT.md) — sections 1-2 only for now |
| 2 | Pick your product type and grab its starter pack | [`06-TEMPLATES/`](./06-TEMPLATES) |
| 3 | Define your MVP cut-list | [`01-STRUCTURE/MVP_SCOPE.md`](./01-STRUCTURE/MVP_SCOPE.md) |
| 4 | Sketch your single core user flow | [`02-HUMAN-FLOW/HUMAN_FLOW.md`](./02-HUMAN-FLOW/HUMAN_FLOW.md) |
| 5 | Generate your first AI build prompt | [`03-INSTRUCTION/PROMPTS.md`](./03-INSTRUCTION/PROMPTS.md) — Stage 1: Idea → Product Spec |

That's enough to have a real, AI-ready brief. Everything else in this repo deepens or extends these five files.

## 3. Full Phase-by-Phase Path

### S — Structure (`01-STRUCTURE/`)
Define what you're building and why before touching UX or code.
- `PROJECT.md` — vision, problem, personas, JTBD, goals, metrics, scope
- `BUSINESS_MODEL.md` — pricing, GTM motion, positioning, moat
- `FEATURE_MATRIX.md` — RICE/MoSCoW feature scoring
- `MVP_SCOPE.md` — the minimum that proves your hypothesis

**Gate to move on:** no unresolved `[brackets]` left in `PROJECT.md`.

### H — Human Flow (`02-HUMAN-FLOW/`)
Design the experience before generating any code.
- `HUMAN_FLOW.md` — journey, flow, navigation, happy path, edge cases
- `USER_JOURNEY.md` — Awareness → Referral stage mapping
- `INFORMATION_ARCHITECTURE.md` — sitemap, nav pattern, routes
- `SCREEN_PLANNING.md` — screen-by-screen entry/exit/states

**Gate to move on:** every core screen has a defined happy path + at least one error/empty state.

### I — Instruction (`03-INSTRUCTION/`)
Turn the above into specs an AI tool can build from.
- `AI_BUILD_SPEC.md` — functional/non-functional/technical/DB/API/UI requirements
- `TECH_SPEC.md`, `DATABASE_SPEC.md` — architecture and schema detail
- `PROMPTS.md` — the 6-stage prompt chain: Idea → Product Spec → UX Spec → Tech Spec → Build Plan → Code Generation
- `AI_AGENT_WORKFLOW.md` — how to split work across ChatGPT/Claude/Gemini/Cursor/Windsurf

**Gate to move on:** you have a build prompt you could paste into Cursor or Windsurf right now.

### P — Publish (`04-PUBLISH/`)
Ship it, then keep shipping.
- `QA_CHECKLIST.md`, `LAUNCH_CHECKLIST.md` — pre-flight checks
- `SEO_CHECKLIST.md`, `ANALYTICS.md` — visibility and measurement
- `LAUNCH_PLAN.md` — the actual launch timeline and channel plan
- `FEEDBACK_SYSTEM.md` — how feedback flows back into `FEATURE_MATRIX.md`

## 4. Supporting Modules (use as needed, not in strict order)

| Module | When to use it |
|---|---|
| [`05-SOP/`](./05-SOP) | You want a repeatable procedure (validating an idea, running user tests, shipping V1) |
| [`06-TEMPLATES/`](./06-TEMPLATES) | You know your product type (CRM, SaaS, marketplace, etc.) and want a tailored starting point |
| [`07-PROMPTS/`](./07-PROMPTS) | You're about to brief an AI tool for any role — product, UX, dev, marketing, or via `SHIP_GPT_PROMPTS.md` |
| [`08-EXAMPLES/`](./08-EXAMPLES) & [`09-CASE-STUDIES/`](./09-CASE-STUDIES) | You want to see the method applied end-to-end before doing your own |
| [`10-LAUNCH/`](./10-LAUNCH) | You're deploying — Vercel, domain, analytics setup |
| [`11-STANDARDS/`](./11-STANDARDS) | You're unsure how this repo expects naming, docs, versioning, or prompts to be structured |
| [`12-DESIGN-SYSTEM/`](./12-DESIGN-SYSTEM) | You need a design system or UI component specs before generating UI |
| [`13-TECH-STACK/`](./13-TECH-STACK) | You need to pick or brief a tech stack |

## 4.5 If You're Handing This to Someone Else

This repo already has `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and `.windsurfrules` at the root, so anyone who opens it in Cursor, Windsurf, or Claude Code gets the SHIP discipline applied automatically — they don't need to read this file before their AI tool starts behaving correctly. Point them here for the *thinking*, not the setup.

## 5. The One Rule

> If you're tempted to ask AI to "just build it" before Structure and Human Flow exist in writing — don't. Open `01-STRUCTURE/PROJECT.md` first.

---

**Next step:** open [`01-STRUCTURE/PROJECT.md`](./01-STRUCTURE/PROJECT.md) and start filling in section 1.
