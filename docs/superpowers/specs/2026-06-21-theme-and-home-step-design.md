# Design: "Theme & First Screen" step for The SHIP Method

**Date:** 2026-06-21
**Status:** Approved (design), pending implementation plan

## Problem

After a SHIP project's spec is complete (PROJECT.md, HUMAN_FLOW.md, AI_BUILD_SPEC
filled), two gaps remain before the product feels like the user's actual business:

1. **Generic homepage.** `starter-kit/app/page.tsx` ships a developer-facing
   "Pick your area" navigation screen. Nothing in the SHIP flow replaces it with
   a real front door for the user's business.
2. **One hardcoded theme.** The "Ember Editorial" warm-dark + ember-coral theme
   is baked into `app/globals.css`. Every generated project gets the same look
   regardless of whether it's a law firm, a kids' app, or a finance dashboard.
   `ship-cli/create.mjs` has no theming logic — it only copies the template.

The user wants: once the system they want is captured, the flow should
automatically (a) build the real homepage and (b) adapt the theme to the
business.

## Decisions (locked during brainstorming)

1. **Mechanism:** A new automatic step inside the `ship-method` skill (not a CLI
   prompt, not a separate slash command). At spec-completion time the agent
   already knows the business from `PROJECT.md`.
2. **Theme selection:** Agent derives **2-3 candidate themes** from the business
   and presents them; the user picks one; the agent applies it. The agent does
   not silently pick, and does not require the user to supply brand assets.
3. **Homepage scope:** Agent reads `HUMAN_FLOW.md` and decides the true entry
   point for *this* business — replacing both the root page and the primary page
   of each area as appropriate (marketing-led business → root = landing;
   tool/dashboard business → root = app home / redirect).

## Design

### Placement

SHIP is a fixed acronym (S-H-I-P), so this is **not** a 5th phase. It is the
**first step of the P — PUBLISH phase**, named **"Theme & First Screen."** It
triggers once Gates 1-3 pass (PROJECT.md + HUMAN_FLOW.md + spec filled, no
bracket placeholders) and before final polish / ship work.

### Step procedure (what the skill instructs the agent to do)

1. **Read context:** `PROJECT.md` (vision, business type, target audience, any
   brand hints) and the product-type template in use.
2. **Theme — derive & choose:**
   - Derive 2-3 candidate themes. Each candidate = a palette expressed as HSL
     triplets matching the existing token names in `globals.css`
     (`--background`, `--foreground`, `--primary`, `--secondary`, `--accent`,
     `--muted`, `--destructive`, `--success`, `--border`, `--input`, `--ring`,
     `--radius`) plus a font pairing (`--font-sans`, `--font-display`,
     `--font-mono`) and an overall mood description.
   - Present the candidates to the user (text descriptions; visual companion
     optional). User picks one.
   - **Apply** the chosen theme: edit token values in `app/globals.css` (both
     `:root` and `.dark`, which this kit keeps identical), set fonts in
     `app/layout.tsx` / `tailwind.config.ts`.
   - **Record** the chosen theme in `12-DESIGN-SYSTEM/DESIGN_SYSTEM.md`
     (or `docs/DESIGN_SYSTEM.md` for ship-create projects) as the source of
     truth, so later UI work stays consistent.
3. **Home — build the real front door:**
   - Read `HUMAN_FLOW.md` to determine the true entry point for this business.
   - Replace the "Pick your area" content in `app/page.tsx` with real content
     drawn from the spec (no lorem), and adjust the primary page of each area's
     main route accordingly.
   - Marketing-led business → root = landing/sale page. Tool/dashboard business
     → root = app home, or redirect to the dashboard.
4. **Close out:** Remind the user to update `FEATURE_MATRIX.md` and
   `QA_CHECKLIST.md` if scope changed.

### Repeatability: theme-guide reference

To keep theme derivation principled rather than random, add a reference doc
`theme-guide.md` in the skill folder containing:
- A table mapping business type / mood → palette direction and font-pairing
  guidance (e.g. finance/trust → cool navy + restrained serif; kids/play →
  bright high-saturation + rounded sans; legal/premium → deep neutral + classic
  serif).
- The concrete apply procedure (which token names to set, where fonts live).

## Files to change (repo + ship-cli template copies must stay in sync)

| File | Change |
|---|---|
| `.claude/skills/ship-method/SKILL.md` **and** `ship-cli/templates/.claude/skills/ship-method/SKILL.md` | Add the "Theme & First Screen" step to the checklist and a "How to Apply" subsection describing the procedure above. |
| `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.windsurfrules` at repo root **and** under `ship-cli/templates/` (8 files total) | Add one short mandatory-behavior rule pointing to the step, so every AI tool performs it. All copies of the canonical ruleset must remain byte-identical. |
| New: `.claude/skills/ship-method/theme-guide.md` **and** `ship-cli/templates/.claude/skills/ship-method/theme-guide.md` | The business-type → palette/font reference table plus apply procedure. |

No change to `ship-cli/create.mjs` — the behavior is agent-driven post-scaffold,
not part of CLI scaffolding.

## Out of scope

- Automatic brand-asset ingestion (logos, brand color extraction).
- A light/dark toggle — the kit intentionally commits to one theme.
- Changing the CLI scaffolder's behavior.
- Generating content for every screen — only the entry/home screens here.

## Success criteria

- Opening a finished-spec SHIP project, the agent proactively runs the Theme &
  First Screen step before declaring anything ship-ready.
- The user is shown 2-3 business-appropriate theme candidates and their pick is
  applied to `globals.css` and recorded in `DESIGN_SYSTEM.md`.
- `app/page.tsx` no longer shows "Pick your area"; it shows the real entry point
  derived from `HUMAN_FLOW.md`.
- The rule appears identically in all 8 ruleset files and both skill copies.
