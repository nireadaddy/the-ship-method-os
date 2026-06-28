---
name: ship-method
description: Use when starting any new product, feature, or "build me an app" request — before writing any application code. Walks through Structure, Theme, Instruction, Publish in order, using this repo's templates. Also use when asked to review whether a project is "ready to build" or "ready to ship."
---

# The SHIP Method

```
S — STRUCTURE  →  H — HUMAN FLOW  →  I — INSTRUCTION  →  P — PUBLISH
```

## Phase 1 — Build (runs automatically on first open, no prompts)

**Do not ask anything. Do not show a menu. Just build.**

### Step 1 — Read & decide (silent, no output)
Read `docs/PROJECT.md` and `docs/HUMAN_FLOW.md`. Extract:
- Product type, idea, target user, problem, value prop
- UI language from Section 10 — switch language now, use it for everything after this
- Auto-select the best color palette from `theme-guide.md` for this product type — do not ask

### Step 1.5 — Ask light or dark (one question, then continue)
Ask the user one question before writing any code:

> Thai: "จะใช้ธีม **Light** หรือ **Dark**? (กด Enter หรือไม่ตอบ = Light)"
> English: "Light or Dark theme? (Press Enter or no reply = Light)"

Wait for the reply. If the user does not answer within one exchange, or replies with anything other than "dark" / "มืด" / "dark mode", treat it as **Light**.

### Step 2 — Build docs + flow diagram
Write `docs/AI_BUILD_SPEC.md` — 1 page max, structured as:

```markdown
## Features
| # | Feature | Screens | Notes |
|---|---|---|---|

## Data Model
| Table | Key fields |
|---|---|

## API
| Method | Route | Purpose |
|---|---|---|
```

Then generate `docs/FLOW.md` — a Mermaid flowchart from `HUMAN_FLOW.md`:

```markdown
# User Flow
> เปิด Preview ใน VS Code หรือวางใน https://mermaid.live

```mermaid
flowchart TD
    ...
```
```

Diagram rules: `([text])` entry/exit · `[text]` screens · `{text}` decisions · `-->|label|` paths · 3–5 word labels.

### Step 3 — Build prototype
Overwrite `:root` and `.dark` in `app/globals.css` with fresh values from `theme-guide.md`. Never reuse starter kit colors.

- **Light** (or no answer): `<html>` without `class="dark"`
- **Dark**: `<html class="dark">` in `app/layout.tsx`

Record palette + mode in `docs/DESIGN_SYSTEM.md`.

Build in this order:
1. **Home screen** — replace `app/page.tsx` with the real entry point from `HUMAN_FLOW.md`
2. **Revenue screen** — from Section 8 of `PROJECT.md`:
   - Subscription → pricing page + Stripe stub
   - One-time → product page + Stripe stub
   - Freemium → free vs paid comparison + upgrade CTA
   - Marketplace → transaction page with fee structure
   - Free / not yet → skip, build next most important screen

### Step 4 — Run
Run `npm run dev` (or `bun dev` / `pnpm dev`). Confirm it compiles at localhost:3000.

### Step 5 — Show & ask one question
In the correct language, say:
- What was built and why (2–3 sentences)
- Which palette was chosen and why (1 sentence)
- "ดู flow ได้ที่ `docs/FLOW.md`"
- "เปิด localhost:3000 ดูได้เลย — ชอบทิศทางนี้ไหม?" / "Open localhost:3000 — does this feel right?"

**Wait for the user's answer before doing anything else.**

---

## Phase 2 — Review

**Changes wanted:** Ask "What feels off?" → fix only that → re-run → show.

**Looks good:** Say "เปิด session ใหม่แล้วพิมพ์ `/foundation` ได้เลย" / "Start a fresh session and type `/foundation`."

Next commands (one at a time):

| Command | What it does |
|---|---|
| `/foundation` | Wire auth + database + payments |
| `/features` | Build features from spec |
| `/polish` | Responsive, states, SEO, performance |
| `/uat` | End-to-end user acceptance testing |
| `/pentest` | Security audit |
| `/quality` | TypeScript, lint, dead code |
| `/launch` | Deploy to Vercel, domain, analytics |

---

## Hard rules

- **No task list.** Build directly.
- **No questions before Step 5.** The only pre-Step-5 interaction is Step 1.5.
- **Color palette chosen by agent.** Light vs Dark chosen by user — ask in Step 1.5, default Light.
- **Never reuse starter kit colors.** Overwrite `:root` and `.dark` completely.
- **Run before showing results.** Never say "done" without confirming it compiles.
- **One question at a time.**

## Speed rules (non-negotiable)

- **New session per phase.** After each phase, tell the user to open a fresh session. Clears context, cuts cost.
- **No recap.** Never summarize what you just did.
- **Responses ≤ 5 sentences** unless writing code.
- **Spec stays at 1 page.** Trim if the user writes more.
- **No subagents** unless the skill explicitly requires one.

---

## Reference files

| Need | File |
|---|---|
| Vision, audience, MVP | `docs/PROJECT.md` |
| User flow, screens | `docs/HUMAN_FLOW.md` |
| Flow diagram | `docs/FLOW.md` |
| Functional spec | `docs/AI_BUILD_SPEC.md` |
| Stack choices | `docs/tech-stack/STACK_DECISION_MATRIX.md` |
| UI guidance | invoke `ui-ux-pro-max` skill |
| Theme palette | `theme-guide.md` (this skill folder) |
| QA | `docs/QA_CHECKLIST.md` |
