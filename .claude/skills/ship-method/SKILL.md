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
- Product type, idea, target user, problem, value prop (already filled by `ship-create`)
- UI language from Section 9 — switch language now, use it for everything after this
- Auto-select the best color palette from `theme-guide.md` for this product type — do not ask

### Step 1.5 — Ask light or dark (one question, then continue)
Ask the user one question before writing any code:

> Thai: "จะใช้ธีม **Light** หรือ **Dark**? (กด Enter หรือไม่ตอบ = Light)"
> English: "Light or Dark theme? (Press Enter or no reply = Light)"

Wait for the reply. If the user does not answer within one exchange, or replies with anything that is not "dark" / "มืด" / "dark mode", treat it as **Light**. Store the choice and use it throughout Step 3.

### Step 2 — Build docs + flow diagram
Write `docs/AI_BUILD_SPEC.md` immediately — functional requirements for the 2–3 core MVP features + data model. Keep it tight, 1 page max.

Then generate `docs/FLOW.md` — a Mermaid flowchart of the full user journey from `HUMAN_FLOW.md`. Include every screen, decision point, happy path, and key error/empty states. Format:

```markdown
# User Flow

> แก้ได้โดยตรงในไฟล์นี้ — เปิด Preview ใน VS Code (Cmd+Shift+P → "Mermaid Preview") หรือวางใน https://mermaid.live

```mermaid
flowchart TD
    ...
```
```

Rules for the diagram:
- Use `([text])` for entry/exit points (stadium shape)
- Use `[text]` for screens/pages
- Use `{text}` for decision points
- Use `-->|label|` for conditional paths
- Show the happy path left-to-right or top-to-bottom
- Keep node labels short (3–5 words max)

### Step 3 — Build prototype
Generate a fresh theme from scratch based on the product type — **never reuse the default colors already in `app/globals.css`**. Overwrite the entire `:root` and `.dark` blocks with new values derived from `theme-guide.md` and the product context. Apply to `app/globals.css` and `app/layout.tsx`.

- If the user chose **Light** (or gave no answer): set `<html>` without `class="dark"` — light is the default mode.
- If the user chose **Dark**: set `<html class="dark">` in `app/layout.tsx`.

Record the theme choice (palette name + light/dark) in `docs/DESIGN_SYSTEM.md`.

Build these screens (in priority order):
1. **Home screen** — replace `app/page.tsx` with the real entry point from `HUMAN_FLOW.md`
2. **Revenue screen** — read Section 8 of `PROJECT.md` for the revenue model, then build the matching screen:
   - Subscription → pricing page with tier comparison + Stripe checkout stub
   - One-time → product page with buy CTA + Stripe checkout stub
   - Freemium → free vs paid tier comparison + upgrade CTA
   - Marketplace fee → transaction page showing platform fee structure
   - Free / not yet → skip, build the next most important screen instead

### Step 4 — Run
Run `npm run dev` (or `pnpm dev` if pnpm is available). Confirm the app compiles and is accessible at localhost:3000.

### Step 5 — Show & ask one question
Tell the user (in the correct language):
- What was built and why (2–3 sentences max)
- Which theme was chosen and why (1 sentence)
- Where to see the flow diagram: `docs/FLOW.md` (เปิด Preview ใน VS Code หรือ https://mermaid.live)
- "เปิด localhost:3000 ดูได้เลย — ชอบทิศทางนี้ไหม?" (Thai) or "Open localhost:3000 — does this feel right?" (English)

**That's Phase 1. Wait for the user's answer before doing anything else.**

---

## Phase 2 — Review (after user responds)

**If the user wants changes:**
Ask one focused question: "What feels off?" Make the adjustment, re-run, show again. Change only what they point to — do not rebuild everything.

**If the user likes it:**
Say: *"ดีมาก — ต่อไปจะ wire auth, database และ payment จริง พิมพ์ `/foundation` ได้เลย"*
/ *"Great — next we'll wire real auth, database, and payments. Type `/foundation` to continue."*

Then guide them through the full journey in order:

| Command | What it does |
|---|---|
| `/foundation` | Wire auth + database + payments |
| `/features` | Build features one at a time from the spec |
| `/polish` | Responsive, states, SEO, performance |
| `/uat` | End-to-end user acceptance testing (happy path, edge cases, mobile) |
| `/pentest` | Security audit — auth, injection, data exposure, headers |
| `/quality` | Code quality — TypeScript, lint, duplication, dead code |
| `/launch` | Deploy to Vercel, domain, analytics, go live |

Each command picks up where the last one left off. The user types one at a time — never give them all seven at once.

---

## Hard rules

- **No task list, ever.** Build directly — tasks are invisible internal steps, not output.
- **No questions before the prototype exists.** The only interaction before Step 5 is code being written.
- **Color palette is chosen by the agent** — pick the best fit from `theme-guide.md` for the product type and explain briefly after. **Light vs Dark is chosen by the user** — always ask in Step 1.5; default to Light if no answer.
- **Never reuse starter kit colors.** Always overwrite `app/globals.css` `:root` and `.dark` completely. The default palette in the template is a placeholder — treat it as if it does not exist.
- **Run the app before showing results.** Never say "done" without confirming it compiles.
- **One question at a time.** Never give a list of options or ask multiple things at once.

## Speed rules (non-negotiable)

These exist because slow AI = abandoned tool. Every rule here protects response time and token cost.

- **One session per phase.** After each phase completes, tell the user: "เปิด session ใหม่แล้วพิมพ์ `/[next-command]` ต่อได้เลย" / "Start a fresh session and type `/[next-command]` to continue." A new session clears context and cuts cost dramatically.
- **No recap, no summary unless asked.** Never summarize what you just did. The user can read the diff.
- **No verbose output.** Responses stay under 5 sentences unless writing code. Explanations are earned — default to silence.
- **Docs stay tight.** `AI_BUILD_SPEC.md` is capped at 1 page. If the user writes more, trim it before using it as context.
- **No subagents unless the skill explicitly requires one.** Every spawned agent doubles cost and latency.

---

## Reference files

| Need | File |
|---|---|
| Vision, audience, MVP | `docs/PROJECT.md` |
| User flow, screens | `docs/HUMAN_FLOW.md` |
| Visual flow diagram (Mermaid) | `docs/FLOW.md` |
| Functional spec | `docs/AI_BUILD_SPEC.md` |
| Stack choices | `docs/tech-stack/STACK_DECISION_MATRIX.md` |
| UI guidance | invoke `ui-ux-pro-max` skill |
| Theme palette table | `theme-guide.md` (this skill folder) |
| QA before ship | `docs/QA_CHECKLIST.md` |
