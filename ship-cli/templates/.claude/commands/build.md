---
description: Read docs, create build spec, and build the MVP fast — home screen first, white theme by default.
argument-hint: "[feature name — leave blank to build the full MVP]"
---

You are building this app using The SHIP Method. Move fast — the goal is a working MVP the user can see and react to. Refine later.

Argument passed (optional feature focus): "$ARGUMENTS"

## Step 1 — Read the project docs

Read both files now:
- `docs/PROJECT.md` — what we're building and for whom
- `docs/HUMAN_FLOW.md` — how users move through the product

## Step 2 — Quick sanity check

If PROJECT.md or HUMAN_FLOW.md is missing OR still has `[fill in]` placeholders in Vision, Problem Statement, or Core Screens — stop and say: "Run `/ship` first — I need a filled spec to build from." Otherwise proceed immediately.

## Step 2.5 — Four quick choices (one message, one reply)

Ask all four in a single message. Wait for one reply, then proceed immediately — no follow-up questions.

**1. Site type**
- `A` Landing page — public, no login needed to browse
- `B` Member system — login wall, users must sign in first

**2. Language**
- `A` Thai (ภาษาไทย)
- `B` English

**3. Font style**
- If Thai (choice 2A): `T1` Prompt · `T2` IBM Plex Thai · `T3` Noto Sans Thai · `T4` Anuphan
- If English (choice 2B): `E1` Modern — Inter / Geist · `E2` Luxury — Playfair Display + DM Sans

**4. Color theme** — shadcn/ui standard palettes:
- `1` Zinc (neutral gray — most common default)
- `2` Slate (cool blue-gray)
- `3` Blue (blue accent)
- `4` Green (green accent)
- `5` Orange (warm orange accent)
- `6` Rose (pink/red accent)
- `7` Violet (purple accent)

Defaults if skipped: B · B · T1 (Prompt) for Thai / E1 (Modern) for English · 1 (Zinc).

---

## Step 3 — Create the build spec (no waiting)

Check if `docs/AI_BUILD_SPEC.md` exists. If not, create it now from the docs:

```markdown
# AI Build Spec

## Functional Requirements
[features from MVP Scope in PROJECT.md — one bullet per feature]

## Data Model
[tables/collections derived from features — fields, types, relations]

## API Contract
[routes/actions needed — method, path, purpose, auth required]

## Auth
[derived from HUMAN_FLOW.md Section 5 Key UX Decisions]

## Out of scope
[from PROJECT.md "Out of scope for MVP"]
```

Write it and move on — do not wait for user confirmation.

## Step 4 — Apply shadcn/ui theme + font (no waiting)

**Stack: Tailwind CSS v4 + shadcn/ui. Do not write custom HSL tokens manually.**

1. Confirm `shadcn/ui` is initialized in the project. If `components/ui/` doesn't exist, run:
   ```
   npx shadcn@latest init
   ```
   Select the color palette chosen in Step 2.5 during init (or patch `components.json` + `app/globals.css` to match the chosen palette after the fact).

2. Apply the chosen color theme to `app/globals.css` using shadcn's CSS variable block for that palette. Palettes available: `zinc` · `slate` · `blue` · `green` · `orange` · `rose` · `violet`. Always use white background (`--background: 0 0% 100%`).

3. Apply the chosen font in `app/layout.tsx` and `app/globals.css` via `next/font/google`:

   **Thai fonts** — set `subsets: ["thai", "latin"]` on all:
   - `T1` Prompt: `weights: ["400","500","600","700"]`
   - `T2` IBM Plex Thai: `weights: ["400","500","600","700"]`
   - `T3` Noto Sans Thai: `weights: ["400","500","600","700"]`
   - `T4` Anuphan: `weights: ["400","500","600","700"]`
   
   Assign to `--font-sans`, apply `font-sans` on `<body>`. Thai fonts are single-font stacks — no separate serif needed.

   **English fonts:**
   - `E1` Modern: Keep Geist if present, otherwise `Inter`. `font-sans` on `<body>`.
   - `E2` Luxury: `Playfair_Display` → `--font-serif` (headings), `DM_Sans` → `--font-sans` (body). Apply `--font-serif` to `h1`–`h3` in global CSS.

4. Install any needed shadcn components now: `npx shadcn@latest add button card input label` (add more as needed per HUMAN_FLOW.md screens). Do not build custom components for things shadcn already covers.

5. **Fill `docs/DESIGN_SYSTEM.md`** — replace all `[FILL: ...]` placeholders with the actual choices made above (palette name, font, language). Leave the trend section blank for now — it gets filled by the `uiux-frontend` skill in Step 5.

6. **Fill `docs/DESIGN_SPEC.md` global decisions** — fill site type, language, font, and palette rows.

Do not ask for approval. Proceed immediately.

## Step 5 — 5-minute MVP: home screen first, data later

**Target: user sees a real-looking screen within 5 minutes. Build UI with static placeholder data first. Wire real data after.**

**Before building each screen, apply the `.claude/skills/uiux-frontend/SKILL.md` guidelines** — layout pattern, component selection, typography, states, and copy rules. Do not skip this for any screen.

Apply choices from Step 2.5 to every screen built:
- **Landing page:** `app/page.tsx` is a public page — hero section, features, CTA. No auth.
- **Member system:** `app/page.tsx` redirects to `/login`. Build login page + middleware. First visible screen = the main dashboard with placeholder data.
- **Thai:** All labels, headings, buttons, nav, and placeholder copy in Thai.
- **English:** All copy in English.

Build in this order — **stop after step 1 and show the user, then continue:**
1. **Home/entry screen** — replace `app/page.tsx` with static placeholder UI. Announce: "MVP home screen done — here's what it looks like. Continuing with data layer…"
2. **Database schema** (`lib/db/schema.*.ts`)
3. **Server actions / API routes**
4. **Remaining pages** — one screen at a time per HUMAN_FLOW.md
5. **Wire real data** — replace placeholders with real data layer calls

After each screen: one line on what was built, one line on what's next. No long summaries.

## Rules

- Never invent business logic not in the spec — if unclear, make a reasonable assumption and note it.
- If a code change conflicts with `docs/AI_BUILD_SPEC.md`, flag it in one sentence and proceed with the most reasonable interpretation.
- Speed over perfection — working UI with placeholder data beats perfect code the user can't see yet.
- **No unnecessary libraries** — before adding any `npm install`, ask: "does Next.js, Tailwind, or shadcn already cover this?" If yes, use what's already there. Allowed additions: `next/font/google` (fonts), `zod` + `react-hook-form` (forms, included with shadcn), `lucide-react` (icons, included with shadcn). Everything else requires explicit justification. Never add: `axios` (use `fetch`), `lodash` (use native JS), `moment`/`dayjs` (use `Intl`), `framer-motion` (use CSS transforms + Tailwind transitions first), `styled-components`/`emotion` (Tailwind is the CSS layer).
