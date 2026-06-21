# SHIP Agent Rules

**This file is the canonical ruleset.** Copies of this exact content live at `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and `.windsurfrules` so that whichever AI coding tool opens this repository, it picks up these rules automatically — no manual prompt-pasting required. If you edit this file, copy the change into the other four so they stay identical.

---

## What This Repository Is

This is a project built using **The SHIP Method** — a four-phase discipline for building products with AI:

```
S — STRUCTURE   →   H — HUMAN FLOW   →   I — INSTRUCTION   →   P — PUBLISH
(what & why)         (the experience)     (AI-ready specs)      (ship it)
```

Full reference docs live in: `01-STRUCTURE/`, `02-HUMAN-FLOW/`, `03-INSTRUCTION/`, `04-PUBLISH/`, `05-SOP/`, `06-TEMPLATES/`, `07-PROMPTS/`, `08-EXAMPLES/`, `09-CASE-STUDIES/`, `10-LAUNCH/`, `11-STANDARDS/`, `12-DESIGN-SYSTEM/`, `13-TECH-STACK/`.

## Mandatory Behavior for Any AI Agent Working in This Repo

1. **Check Structure and Human Flow before generating application code.**
   - Look for `01-STRUCTURE/PROJECT.md` and `02-HUMAN-FLOW/HUMAN_FLOW.md`.
   - If either is missing, or still contains unfilled `[bracket placeholders]` in its core sections (Vision, Problem Statement, MVP Scope; Happy Path, Core Screens), **do not generate product code**. Instead, help the user fill in the missing sections first, asking one question at a time.
   - Exception: scaffolding, boilerplate, config files, and infra setup (package.json, folder structure, CI config) are fine to generate at any time — the gate is on *feature/business logic* code.

2. **Treat `03-INSTRUCTION/AI_BUILD_SPEC.md` as the source of truth** for functional requirements, data model, and API contract once it exists. If a user's code request conflicts with it, point out the conflict instead of silently overriding the spec.

3. **Use the right reference file for the job:**
   | Need | File |
   |---|---|
   | Product type starter (CRM, SaaS, marketplace, etc.) | `06-TEMPLATES/*_TEMPLATE.md` |
   | Database schema | `03-INSTRUCTION/DATABASE_SPEC.md` |
   | Stack choice | `13-TECH-STACK/STACK_DECISION_MATRIX.md` |
   | UI/component consistency | `12-DESIGN-SYSTEM/DESIGN_SYSTEM.md`, `UI_COMPONENT_SPEC.md` |
   | Pre-launch checks | `04-PUBLISH/QA_CHECKLIST.md`, `LAUNCH_CHECKLIST.md` |

4. **After generating a new feature**, remind the user to add relevant test cases to `04-PUBLISH/QA_CHECKLIST.md` and update `01-STRUCTURE/FEATURE_MATRIX.md` if scope changed.

5. **If the user explicitly insists on skipping the gate** ("just build it, skip the docs"), comply — but say once, briefly, what's being skipped and why it usually causes rework later. Don't refuse repeatedly or lecture.

6. **Never invent business facts** (market size, pricing, real metrics, real user quotes) into these docs. Draft clearly-labeled placeholders or ask the user instead.

7. **Once the spec is complete, run the "Theme & First Screen" step before polishing or shipping.** When `01-STRUCTURE/PROJECT.md`, `02-HUMAN-FLOW/HUMAN_FLOW.md`, and `03-INSTRUCTION/AI_BUILD_SPEC.md` are filled (no `[bracket placeholders]`), and before calling anything ship-ready:
   - **Theme:** Derive 2-3 theme candidates (color palette as HSL token values + a font pairing) from the business in `PROJECT.md`, present them, let the user pick one, then apply it to the app's `app/globals.css` and `app/layout.tsx` and record the choice in `12-DESIGN-SYSTEM/DESIGN_SYSTEM.md`.
   - **Home:** Read `02-HUMAN-FLOW/HUMAN_FLOW.md`, determine the real entry point for this business, and replace the starter kit's generic `app/page.tsx` ("Pick your area") with it.
   - Don't pick a theme silently and don't require brand assets the user didn't provide. See the `ship-method` skill's `theme-guide.md` for the business-type → palette/font reference. (In `ship-create` projects these docs live under `docs/`; in this OS repo the app lives under `starter-kit/`.)

## Quick Orientation for a New Agent Session

If you (the AI agent) are opening this repo for the first time in a session:
1. Read `01-STRUCTURE/PROJECT.md` and `02-HUMAN-FLOW/HUMAN_FLOW.md` first to learn what's being built.
2. Read `03-INSTRUCTION/AI_BUILD_SPEC.md` if it exists, for the technical contract.
3. Then proceed with whatever the user asked, applying the rules above.

## Source

These rules are part of **The SHIP Method OS**. See `README.md` and `START-HERE.md` at the repo root for the full system this project was built from.
