# SHIP Agent Rules

**This file is the canonical ruleset for this project.** Copies of this exact content live at `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and `.windsurfrules` so that whichever AI coding tool opens this repository, it picks up these rules automatically.

---

## What This Project Is

This project was scaffolded with **The SHIP Method** — a four-phase discipline for building products with AI:

```
S — STRUCTURE   →   H — HUMAN FLOW   →   I — INSTRUCTION   →   P — PUBLISH
(what & why)         (the experience)     (AI-ready specs)      (ship it)
```

All docs live under `docs/`:

| File | Purpose |
|---|---|
| `docs/PROJECT.md` | What & why — vision, audience, problem, MVP scope |
| `docs/HUMAN_FLOW.md` | How users move through the product, screen by screen |
| `docs/AI_BUILD_SPEC.md` | Functional requirements, data model, API contract (created at build time) |
| `docs/tech-stack/STACK_DECISION_MATRIX.md` | How to choose databases, auth, hosting, etc. |
| `docs/tech-stack/TECH_STACK.md` | Full stack reference for this project type |
| `docs/PROMPTS.md` | Full SHIP prompt chain (Stages 1-6) for reference |

**For UI/design decisions:** invoke the `ui-ux-pro-max` skill — it provides palette, typography, component patterns, and layout guidance specific to this project type. Do not rely on generic static design files.

## Mandatory Behavior for Any AI Agent Working in This Repo

1. **Check Structure and Human Flow before generating application code.**
   - Read `docs/PROJECT.md` and `docs/HUMAN_FLOW.md` at the start of every session.
   - If either is missing, or still contains unfilled `[fill in]` / `[bracket placeholders]` in its core sections (Vision, Problem Statement, MVP Scope; User Journey, Core Screens), **do not generate feature code**. Instead, run `/ship` to guide the user through filling the gaps.
   - Exception: scaffolding, config files, and infra setup are fine to generate at any time — the gate is on *feature/business logic* code only.

2. **Use `docs/AI_BUILD_SPEC.md` as the source of truth** for functional requirements, data model, and API contract once it exists. If a user's code request conflicts with it, flag the conflict instead of silently overriding the spec.

3. **Use the right reference file for the job:**
   | Need | File |
   |---|---|
   | Vision, audience, MVP scope | `docs/PROJECT.md` |
   | User flow, screens | `docs/HUMAN_FLOW.md` |
   | Functional requirements, data model | `docs/AI_BUILD_SPEC.md` |
   | Stack choice | `docs/tech-stack/STACK_DECISION_MATRIX.md` |
   | UI/design decisions | invoke `ui-ux-pro-max` skill — derives palette, font, components from the project context |
   | Product-type feature checklist | `docs/*_TEMPLATE.md` |

4. **After generating a new feature**, remind the user to update `docs/PROJECT.md` Section 6 (MVP Scope) if scope changed.

5. **If the user explicitly insists on skipping the gate** ("just build it, skip the docs"), comply — but say once, briefly, what's being skipped and why it usually causes rework later. Don't refuse repeatedly or lecture.

6. **Never invent business facts** (market size, pricing, real metrics, real user quotes). Draft clearly-labeled `[TBD: ...]` placeholders or ask the user.

7. **Once the spec is complete, apply white theme and replace the home screen — do this first, before any features.**
   When `docs/PROJECT.md` and `docs/HUMAN_FLOW.md` are filled and `docs/AI_BUILD_SPEC.md` exists:
   - **Home first:** Replace the starter kit's generic `app/page.tsx` immediately with the real entry point from `docs/HUMAN_FLOW.md`. This is always the first build output so the user sees something real right away.
   - **Theme (shadcn/ui):** Use Tailwind CSS v4 + shadcn/ui. Apply the user's chosen shadcn color palette (zinc/slate/blue/green/orange/rose/violet) via its CSS variable block in `app/globals.css`. Always white background. Font: modern (Inter/Geist) or luxury (Playfair Display + DM Sans). Do not write custom HSL tokens manually.
   - See `.claude/skills/ship-method/theme-guide.md` for product-type → palette reference.

## Quick Orientation for a New Agent Session

1. Read `docs/PROJECT.md` to learn what's being built and for whom.
2. Read `docs/HUMAN_FLOW.md` to understand the user experience.
3. Check if `docs/AI_BUILD_SPEC.md` exists — if yes, read it for the technical contract.
4. Then proceed with what the user asked, applying the rules above.

**Shortcut commands available:**
- `/ship` — interactive gate-by-gate guide through Structure → Human Flow → Instruction → Publish
- `/build` — assumes docs are filled, creates build spec and starts coding the MVP

## Source

This project was created with `npx ship-create`. The SHIP Method OS lives at github.com/nireadaddy/the-ship-method-os.
