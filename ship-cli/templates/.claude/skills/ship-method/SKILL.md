---
name: ship-method
description: Use when starting any new product, feature, or "build me an app" request — before writing any application code. Walks through Structure, Human Flow, Instruction, Publish in order, using this repo's templates. Also use when asked to review whether a project is "ready to build" or "ready to ship."
---

# The SHIP Method

You are operating inside a project built with **The SHIP Method OS**. The method has four phases, run strictly in order:

```
S — STRUCTURE   →   H — HUMAN FLOW   →   I — INSTRUCTION   →   P — PUBLISH
(what & why)         (the experience)     (AI-ready specs)      (ship it)
```

The single most common reason AI-built products end up broken, scope-creeped, or unshippable: someone skips Structure and Human Flow and goes straight to "build me an app." This skill exists to stop that.

## When to Use This Skill

- The user describes a new product/feature idea and wants something built
- The user asks you to generate code for a feature that doesn't have a filled spec yet
- The user asks "is this ready to build?" or "is this ready to ship?"
- You're about to scaffold, design a schema, or write business logic and no `PROJECT.md` / `HUMAN_FLOW.md` exists yet for it

## The Checklist

Work through these gates in order. Do not let scope, urgency, or the user saying "just build it fast" skip a gate without at least naming what's being skipped.

- [ ] **Gate 1 — Structure exists.** Find or create `PROJECT.md` (template: `01-STRUCTURE/PROJECT.md` in this repo, or `docs/PROJECT.md` if this is a `ship-create`-generated project). Vision, Problem Statement, Target Audience, and MVP Scope must be filled — not placeholder brackets.
- [ ] **Gate 2 — Human Flow exists.** Find or create `HUMAN_FLOW.md`. Every core screen needs a happy path and at least one error/empty state defined before it gets built.
- [ ] **Gate 3 — Instruction exists.** Functional requirements, data model, and API contract are written somewhere concrete (`AI_BUILD_SPEC.md` / `docs/PROJECT.md`'s feature section) before you generate feature code.
- [ ] **Gate 4 — Theme & First Screen.** Once Gates 1-3 pass and before final polish/ship: derive 2-3 business-appropriate themes from `PROJECT.md`, let the user pick one, apply it (`app/globals.css`, `app/layout.tsx`), and record it in the design system; then read `HUMAN_FLOW.md` and replace the starter's generic `app/page.tsx` ("Pick your area") with the real entry point. See `theme-guide.md` in this skill folder.
- [ ] **Gate 5 — Publish readiness.** Before telling the user something is "done," check it against the relevant checklist (`QA_CHECKLIST.md`, `LAUNCH_CHECKLIST.md`) rather than declaring success from a clean build alone.

## How to Apply This

1. **If Gate 1 or 2 is missing or full of `[bracket placeholders]`:** stop, don't generate feature code. Instead, ask the user one specific question at a time to fill the gap — pull questions directly from the relevant template's section headers. Scaffolding, config, and boilerplate are fine to write anytime; business logic and feature code are gated.
2. **If the user insists on skipping a gate** ("just build it, skip the docs"): comply, but say once, briefly, what's being skipped and the most likely thing that breaks later as a result. Don't refuse repeatedly or lecture.
3. **If all gates are filled:** proceed normally — generate code straight from the spec, and flag if a code request contradicts what's already written in `PROJECT.md` or `HUMAN_FLOW.md` rather than silently overriding it.
4. **When asked "is this ready to build/ship?":** walk the checklist above explicitly and report which gates pass/fail, rather than giving a vague yes/no.

## Theme & First Screen (Gate 4)

Run this once Gates 1-3 pass, before final polish or shipping. The agent already
knows the business from `PROJECT.md`, so it can theme and build the front door
accurately.

1. **Derive & choose a theme.** From `PROJECT.md`, produce 2-3 candidate themes
   (palette as HSL token values + a font pairing). Present them and let the user
   pick — never pick silently, never require brand assets the user didn't give.
2. **Apply it.** Write the chosen tokens into `app/globals.css` (`:root` and
   `.dark`), set fonts in `app/layout.tsx`, and record the choice in
   `12-DESIGN-SYSTEM/DESIGN_SYSTEM.md` (or `docs/DESIGN_SYSTEM.md`).
3. **Build the first screen.** Read `HUMAN_FLOW.md`, decide the real entry point
   for this business, and replace the starter's `app/page.tsx` ("Pick your
   area") with it — landing/sale for marketing-led products, app home/dashboard
   redirect for tools. Adjust each area's main page to match.

Full procedure and the business-type → palette/font table: `theme-guide.md` in
this skill folder. (In this OS repo the app lives under `starter-kit/`.)

## Reference Files (when present in this repo)

| Need | File |
|---|---|
| Business goals, scope, MVP | `01-STRUCTURE/PROJECT.md`, `01-STRUCTURE/MVP_SCOPE.md` |
| User journeys, screens | `02-HUMAN-FLOW/HUMAN_FLOW.md`, `02-HUMAN-FLOW/SCREEN_PLANNING.md` |
| Specs, prompt chain | `03-INSTRUCTION/AI_BUILD_SPEC.md`, `03-INSTRUCTION/PROMPTS.md` |
| Pre-launch checks | `04-PUBLISH/QA_CHECKLIST.md`, `04-PUBLISH/LAUNCH_CHECKLIST.md` |
| Product-type starter pack | `06-TEMPLATES/<TYPE>_TEMPLATE.md` |
| Design consistency | `12-DESIGN-SYSTEM/DESIGN_SYSTEM.md` |
| Business-type → palette/font theme guide | `theme-guide.md` (this skill folder) |
| Stack decisions | `13-TECH-STACK/STACK_DECISION_MATRIX.md` |

If this is a project generated by `ship-create`, the same files exist under `docs/` instead of the numbered folders above.
