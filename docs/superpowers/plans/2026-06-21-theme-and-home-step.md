# Theme & First Screen Step — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Theme & First Screen" step to The SHIP Method so that, once a project's spec is complete, the agent derives 2-3 business-appropriate themes for the user to choose, applies the choice, and replaces the starter's generic homepage with a real entry point.

**Architecture:** This is a documentation/instruction change, not application code. The behavior is agent-driven, defined in the `ship-method` skill plus the canonical ruleset files. A new `theme-guide.md` reference makes theme derivation repeatable. All synced copies (5 ruleset files in repo root, 4 in `ship-cli/templates/`, plus 2 skill copies) must stay byte-identical.

**Tech Stack:** Markdown docs. Verification is via `grep` and `diff` (no test runner). The target app is Next.js + Tailwind (HSL CSS-variable tokens in `app/globals.css`, fonts via `next/font/google` in `app/layout.tsx`).

## Global Constraints

- The canonical ruleset content MUST be byte-identical across all 9 copies: repo root `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.windsurfrules`, `SHIP_AGENT_RULES.md`, and `ship-cli/templates/{CLAUDE.md,AGENTS.md,.cursorrules,.windsurfrules}`. Edit one, then copy to the rest — never hand-edit each.
- The skill files MUST be byte-identical between `.claude/skills/ship-method/` and `ship-cli/templates/.claude/skills/ship-method/`.
- SHIP is a fixed acronym — do NOT introduce a 5th phase letter. The step is the first step of the existing **P — PUBLISH** phase.
- Theme token names referenced in docs MUST match those already in `starter-kit/app/globals.css`: `--background --foreground --card --card-foreground --primary --primary-foreground --secondary --secondary-foreground --accent --accent-foreground --muted --muted-foreground --destructive --destructive-foreground --success --success-foreground --border --input --ring --radius`. Font variables: `--font-sans --font-display --font-mono`.
- Do NOT modify `ship-cli/create.mjs`.
- Commit messages end with the Co-Authored-By trailer used in this repo.

---

### Task 1: Create the `theme-guide.md` reference

**Files:**
- Create: `.claude/skills/ship-method/theme-guide.md`

**Interfaces:**
- Produces: a reference doc that the SKILL.md and ruleset (Tasks 2-3) point to by filename `theme-guide.md`. Task 4 copies it into the template.

- [ ] **Step 1: Create the file with this exact content**

````markdown
# Theme & First Screen — Reference Guide

Used by the SHIP Method's **Theme & First Screen** step (first step of the
PUBLISH phase). It tells you how to turn the business described in `PROJECT.md`
into (a) 2-3 theme candidates the user can choose from, and (b) a real homepage.

## Where things live

In a `ship-create`-generated project the Next.js app is at the repo root:
- `app/globals.css` — theme tokens (HSL triplets) under `:root` and `.dark`
- `app/layout.tsx` — fonts via `next/font/google`, mapped to `--font-*` variables
- `app/page.tsx` — the root page (ships as a generic "Pick your area" screen)

In **this OS repo**, the same app lives under `starter-kit/` (e.g.
`starter-kit/app/globals.css`). Adjust paths accordingly.

Record the chosen theme in the design system doc:
`12-DESIGN-SYSTEM/DESIGN_SYSTEM.md` (or `docs/DESIGN_SYSTEM.md` in generated
projects).

## Step 1 — Derive 2-3 theme candidates

Read `PROJECT.md` (vision, business type, target audience, any stated brand
colors). Map the business to a palette direction and a font pairing using the
table below as a starting point — then tailor, don't copy blindly.

| Business / mood | Palette direction | Font pairing (display / sans) |
|---|---|---|
| Finance, B2B, trust | Cool navy/slate base, restrained single accent | Serif or grotesk display / neutral sans |
| Legal, premium, luxury | Deep neutral (ink/charcoal), gold or burgundy accent | Classic serif / humanist sans |
| Kids, play, consumer fun | Bright, high-saturation, multiple accents | Rounded geometric sans / rounded sans |
| Health, wellness, calm | Soft greens/teals, low saturation | Humanist serif / soft sans |
| Tech, SaaS, developer | Dark base, one electric accent | Geometric sans / mono accents |
| Food, hospitality, warm | Warm earth tones, appetizing accent | Editorial serif / friendly sans |
| Creative, agency, bold | High-contrast, expressive accent | Display serif or bold grotesk / clean sans |

Each candidate MUST specify, as HSL triplets, values for every token in
`globals.css`: `--background --foreground --card --card-foreground --primary
--primary-foreground --secondary --secondary-foreground --accent
--accent-foreground --muted --muted-foreground --destructive
--destructive-foreground --success --success-foreground --border --input --ring`
plus a `--radius`, and a font pairing for `--font-display`, `--font-sans`,
`--font-mono`.

Present the candidates to the user (a one-line mood + the key colors each).
Let the user pick one. Do NOT pick silently. Do NOT require brand assets — use
them only if `PROJECT.md` provides them.

## Step 2 — Apply the chosen theme

1. In `app/globals.css`, set the token values under BOTH `:root` and `.dark`
   (this kit keeps them identical). Keep the HSL-triplet format (e.g.
   `--primary: 14 92% 58%;`) so `hsl(var(--x))` keeps working.
2. In `app/layout.tsx`, swap the `next/font/google` imports to the chosen
   fonts, keeping the variable names `--font-display`, `--font-sans`,
   `--font-mono`. The starter uses `Fraunces` (display), `Work_Sans` (sans),
   `JetBrains_Mono` (mono) as the reference pattern.
3. Record the final palette + fonts in the design system doc as the source of
   truth for later UI work.

## Step 3 — Build the real first screen

Read `HUMAN_FLOW.md` and decide the true entry point for THIS business:
- Marketing-led (course, membership, leadgen) → root `app/page.tsx` becomes the
  landing/sale page.
- Tool/dashboard/internal → root becomes the app home, or redirects to the
  primary dashboard route.

Replace the generic "Pick your area" content in `app/page.tsx` with real content
drawn from the spec (no lorem). Adjust the main page of each area's route to
match. Then remind the user to update `FEATURE_MATRIX.md` and `QA_CHECKLIST.md`
if scope changed.
````

- [ ] **Step 2: Verify the file exists and token coverage is complete**

Run: `grep -c -E -- "--primary|--accent|--background|--font-display|--radius" ".claude/skills/ship-method/theme-guide.md"`
Expected: a number ≥ 5 (all key token names present).

Run: `grep -q "HUMAN_FLOW.md" ".claude/skills/ship-method/theme-guide.md" && grep -q "DESIGN_SYSTEM.md" ".claude/skills/ship-method/theme-guide.md" && echo OK`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add ".claude/skills/ship-method/theme-guide.md"
git commit -m "Add theme-guide reference for SHIP Theme & First Screen step

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Add the step to the `ship-method` skill (SKILL.md)

**Files:**
- Modify: `.claude/skills/ship-method/SKILL.md`

**Interfaces:**
- Consumes: `theme-guide.md` from Task 1 (referenced by filename).
- Produces: a "Gate 4 — Theme & First Screen" checklist item, a dedicated section, and a reference-table row. Task 4 copies this file into the template.

- [ ] **Step 1: Insert the new gate and renumber Publish**

Find this block in `## The Checklist`:

```markdown
- [ ] **Gate 4 — Publish readiness.** Before telling the user something is "done," check it against the relevant checklist (`QA_CHECKLIST.md`, `LAUNCH_CHECKLIST.md`) rather than declaring success from a clean build alone.
```

Replace it with:

```markdown
- [ ] **Gate 4 — Theme & First Screen.** Once Gates 1-3 pass and before final polish/ship: derive 2-3 business-appropriate themes from `PROJECT.md`, let the user pick one, apply it (`app/globals.css`, `app/layout.tsx`), and record it in the design system; then read `HUMAN_FLOW.md` and replace the starter's generic `app/page.tsx` ("Pick your area") with the real entry point. See `theme-guide.md` in this skill folder.
- [ ] **Gate 5 — Publish readiness.** Before telling the user something is "done," check it against the relevant checklist (`QA_CHECKLIST.md`, `LAUNCH_CHECKLIST.md`) rather than declaring success from a clean build alone.
```

- [ ] **Step 2: Add a dedicated section after "How to Apply This"**

Find the end of the `## How to Apply This` numbered list (item 4, which begins
`4. **When asked "is this ready to build/ship?"**`). Immediately after that
item's line, insert this new section:

```markdown

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
```

- [ ] **Step 3: Add the reference-table row**

Find this row in the `## Reference Files` table:

```markdown
| Design consistency | `12-DESIGN-SYSTEM/DESIGN_SYSTEM.md` |
```

Replace it with:

```markdown
| Design consistency | `12-DESIGN-SYSTEM/DESIGN_SYSTEM.md` |
| Business-type → palette/font theme guide | `theme-guide.md` (this skill folder) |
```

- [ ] **Step 4: Verify the edits landed**

Run: `grep -q "Gate 4 — Theme & First Screen" ".claude/skills/ship-method/SKILL.md" && grep -q "Gate 5 — Publish readiness" ".claude/skills/ship-method/SKILL.md" && grep -q "## Theme & First Screen (Gate 4)" ".claude/skills/ship-method/SKILL.md" && echo OK`
Expected: `OK`

Run: `grep -c "theme-guide.md" ".claude/skills/ship-method/SKILL.md"`
Expected: a number ≥ 3.

- [ ] **Step 5: Commit**

```bash
git add ".claude/skills/ship-method/SKILL.md"
git commit -m "Add Theme & First Screen gate to ship-method skill

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Add the mandatory rule to the canonical ruleset (and sync all 9 copies)

**Files:**
- Modify: `CLAUDE.md`
- Then copy to: `AGENTS.md`, `.cursorrules`, `.windsurfrules`, `SHIP_AGENT_RULES.md`, `ship-cli/templates/CLAUDE.md`, `ship-cli/templates/AGENTS.md`, `ship-cli/templates/.cursorrules`, `ship-cli/templates/.windsurfrules`

**Interfaces:**
- Consumes: the `theme-guide.md` name (Task 1) and the step concept (Task 2).
- Produces: identical "Theme & First Screen" rule in all 9 ruleset files.

- [ ] **Step 1: Add the new rule to `CLAUDE.md`**

Find this item in the `## Mandatory Behavior for Any AI Agent Working in This Repo`
list:

```markdown
6. **Never invent business facts** (market size, pricing, real metrics, real user quotes) into these docs. Draft clearly-labeled placeholders or ask the user instead.
```

Replace it with:

```markdown
6. **Never invent business facts** (market size, pricing, real metrics, real user quotes) into these docs. Draft clearly-labeled placeholders or ask the user instead.

7. **Once the spec is complete, run the "Theme & First Screen" step before polishing or shipping.** When `01-STRUCTURE/PROJECT.md`, `02-HUMAN-FLOW/HUMAN_FLOW.md`, and `03-INSTRUCTION/AI_BUILD_SPEC.md` are filled (no `[bracket placeholders]`), and before calling anything ship-ready:
   - **Theme:** Derive 2-3 theme candidates (color palette as HSL token values + a font pairing) from the business in `PROJECT.md`, present them, let the user pick one, then apply it to the app's `app/globals.css` and `app/layout.tsx` and record the choice in `12-DESIGN-SYSTEM/DESIGN_SYSTEM.md`.
   - **Home:** Read `02-HUMAN-FLOW/HUMAN_FLOW.md`, determine the real entry point for this business, and replace the starter kit's generic `app/page.tsx` ("Pick your area") with it.
   - Don't pick a theme silently and don't require brand assets the user didn't provide. See the `ship-method` skill's `theme-guide.md` for the business-type → palette/font reference. (In `ship-create` projects these docs live under `docs/`; in this OS repo the app lives under `starter-kit/`.)
```

- [ ] **Step 2: Copy `CLAUDE.md` to the other 8 ruleset files**

```bash
cd "/Users/nuttadechjunlawan/THE SHIP METHOD OS"
for dest in AGENTS.md .cursorrules .windsurfrules SHIP_AGENT_RULES.md \
            ship-cli/templates/CLAUDE.md ship-cli/templates/AGENTS.md \
            ship-cli/templates/.cursorrules ship-cli/templates/.windsurfrules; do
  cp CLAUDE.md "$dest"
done
```

- [ ] **Step 3: Verify all 9 copies are byte-identical and contain the rule**

```bash
cd "/Users/nuttadechjunlawan/THE SHIP METHOD OS"
for f in CLAUDE.md AGENTS.md .cursorrules .windsurfrules SHIP_AGENT_RULES.md \
         ship-cli/templates/CLAUDE.md ship-cli/templates/AGENTS.md \
         ship-cli/templates/.cursorrules ship-cli/templates/.windsurfrules; do
  diff -q CLAUDE.md "$f" >/dev/null && grep -q "Theme & First Screen" "$f" \
    && echo "$f OK" || echo "$f FAIL"
done
```
Expected: every line ends in `OK` (9 lines).

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md AGENTS.md .cursorrules .windsurfrules SHIP_AGENT_RULES.md ship-cli/templates/
git commit -m "Add Theme & First Screen rule to canonical ruleset (all 9 copies)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Sync skill files into the ship-cli template

**Files:**
- Copy into: `ship-cli/templates/.claude/skills/ship-method/SKILL.md`, `ship-cli/templates/.claude/skills/ship-method/theme-guide.md`

**Interfaces:**
- Consumes: the repo skill files finalized in Tasks 1-2.
- Produces: byte-identical skill copies so generated projects inherit the step.

- [ ] **Step 1: Copy both skill files repo → template**

```bash
cd "/Users/nuttadechjunlawan/THE SHIP METHOD OS"
cp .claude/skills/ship-method/SKILL.md ship-cli/templates/.claude/skills/ship-method/SKILL.md
cp .claude/skills/ship-method/theme-guide.md ship-cli/templates/.claude/skills/ship-method/theme-guide.md
```

- [ ] **Step 2: Verify the skill copies are byte-identical**

```bash
cd "/Users/nuttadechjunlawan/THE SHIP METHOD OS"
diff -q .claude/skills/ship-method/SKILL.md ship-cli/templates/.claude/skills/ship-method/SKILL.md \
  && diff -q .claude/skills/ship-method/theme-guide.md ship-cli/templates/.claude/skills/ship-method/theme-guide.md \
  && echo "SKILL FILES IN SYNC"
```
Expected: `SKILL FILES IN SYNC`

- [ ] **Step 3: Commit**

```bash
git add ship-cli/templates/.claude/skills/ship-method/
git commit -m "Sync Theme & First Screen skill files into ship-cli template

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Mechanism = new step in ship-method skill → Task 2 (gate + section), Task 3 (rule). ✓
- Theme: derive 2-3, user picks, apply, record in DESIGN_SYSTEM.md → Task 1 (procedure), Tasks 2-3 (instruction). ✓
- Home: read HUMAN_FLOW.md, replace page.tsx, both root + area pages → Task 1, 2, 3. ✓
- Placement = first step of PUBLISH, after Gates 1-3 → Task 2 (Gate 4 before Gate 5). ✓
- theme-guide reference table → Task 1. ✓
- All 9 ruleset copies + 2 skill copies in sync → Task 3 (cp + diff), Task 4 (cp + diff). ✓
- No change to create.mjs → respected (not touched). ✓

**Placeholder scan:** No TBD/TODO; all content blocks are complete. ✓

**Type consistency:** Token names and font variable names match `globals.css`/`layout.tsx` verbatim; gate naming ("Gate 4 — Theme & First Screen", "Gate 5 — Publish readiness") consistent across Task 2 steps; filename `theme-guide.md` consistent across all tasks. ✓
