# The SHIP Canvas

**What this is:** A one-page lead magnet that compresses the thinking from `01-STRUCTURE/PROJECT.md`, `02-HUMAN-FLOW/HUMAN_FLOW.md`, `03-INSTRUCTION/AI_BUILD_SPEC.md`, and `04-PUBLISH/LAUNCH_PLAN.md` into 16 fill-in prompts across 4 quadrants — one per SHIP letter. It takes 15 minutes and turns a vague idea into a usable first plan.

**What this is NOT:** It is not the full SHIP Method OS. It is a taste of the thinking, not the system. Someone who finishes this canvas will have a real plan and will also feel exactly where they'd benefit from the full templates, SOPs, and prompt libraries in the paid repo — that gap is the conversion moment, not a flaw to fix.

**Distributed via:** The SHIP Builder List opt-in (see `LANDING_PAGE_TH.md`). This is the primary lead magnet referenced in `LEAD_CAPTURE_STRATEGY.md`.

---

## The Canvas Layout (single page, 4 quadrants)

Design note for whoever builds the final PDF/Notion/Figma version: this should fit on ONE page in landscape orientation, 4 equal quadrants in a 2x2 grid, one SHIP letter per quadrant, top-left to bottom-right reading order (S top-left, H top-right, I bottom-left, P bottom-right). Title bar across the top: "THE SHIP CANVAS — Idea to Product Plan in 15 Minutes." Footer strip: "Built with The SHIP Method OS — full system at [link]."

```
┌─────────────────────────────────────────────────────────────────────┐
│                     THE SHIP CANVAS                                 │
│           Idea → Product Plan in 15 Minutes                         │
├───────────────────────────────┬───────────────────────────────────┤
│  S — STRUCTURE  (4 min)        │  H — HUMAN FLOW  (4 min)            │
│                                 │                                     │
│  1. One-sentence product       │  1. Who opens this product first,   │
│     vision:                    │     and why TODAY (their trigger)? │
│     "[Product] helps [who]     │                                     │
│     do [what] without          │  2. List the 3 screens/steps        │
│     [old painful way]."        │     they MUST go through to get     │
│                                 │     value the first time:           │
│  2. Who has this problem,      │     1) ____  2) ____  3) ____       │
│     specifically?               │                                     │
│                                 │  3. What's the ONE moment they      │
│  3. How do they solve it       │     think "okay, this works"?       │
│     today (without you)?       │                                     │
│                                 │  4. What happens if something      │
│  4. What is explicitly OUT     │     goes wrong here (error/empty    │
│     of scope for version one?  │     state) — what do they see?      │
│                                 │                                     │
├───────────────────────────────┼───────────────────────────────────┤
│  I — INSTRUCTION  (4 min)      │  P — PUBLISH  (3 min)               │
│                                 │                                     │
│  1. What's the single most     │  1. Where will this live when it    │
│     important screen/feature   │     ships (domain, platform)?       │
│     to brief AI on first?      │                                     │
│                                 │  2. What's the ONE metric that      │
│  2. Write the prompt you'd     │     tells you it's working in       │
│     give AI for that feature   │     week one?                       │
│     (1-3 sentences, be          │                                     │
│     specific about who/what/   │  3. How will you collect feedback   │
│     constraints):              │     from the first 10 users?        │
│                                 │                                     │
│  3. What tool will you build   │  4. What's your "ship it even if    │
│     with (ChatGPT/Claude/      │     it's not perfect" deadline?     │
│     Gemini/Cursor/Windsurf)?   │                                     │
│                                 │                                     │
└───────────────────────────────┴───────────────────────────────────┘
        Built with The SHIP Method OS — full system at [link]
```

---

## How to Use This Canvas in 15 Minutes

1. **Set a timer for 15 minutes.** This canvas is intentionally too small to overthink — that's the point. Speed beats polish here.
2. **Minutes 0-4 — Structure (top-left).** Write your one-sentence vision first, even if it's rough. Then answer who/how-today/out-of-scope in short phrases, not paragraphs. If you can't answer #2 (who has this problem) in one sentence, your idea is still too vague to build — stop and narrow it before continuing.
3. **Minutes 4-8 — Human Flow (top-right).** Picture one specific person opening your product for the first time. Walk through their first 3 steps like you're narrating a screen recording. Don't design anything — just list the steps and the one "this works" moment.
4. **Minutes 8-12 — Instruction (bottom-left).** Pick the single most important feature from your Human Flow quadrant — usually the one tied to the "this works" moment. Write the actual prompt you'd paste into AI for it. Be specific: name the user, the constraint, what's NOT included. A vague prompt here is the #1 reason AI builds go sideways.
5. **Minutes 12-15 — Publish (bottom-right).** Answer where it'll live, what you'll watch in week one, how you'll get feedback, and pick a real deadline — a date, not "soon."
6. **When the timer ends, stop.** You now have a one-page plan. This is enough to start a real AI build session. If you find yourself wanting more depth — more personas, a full feature matrix, a real database spec, a launch checklist — that's exactly what the full SHIP Method OS gives you in `01-STRUCTURE/` through `04-PUBLISH/`.

---

## Worked Example: "Streak" — a Habit-Tracking App

### S — Structure

1. **One-sentence vision:** "Streak helps busy professionals build one keystone habit by making the cost of skipping a day higher than the cost of doing it, without 47 features they'll never open."
2. **Who has this problem, specifically:** Professionals aged 25-40 who've downloaded 3+ habit apps, used each for under 2 weeks, and still don't have a consistent habit.
3. **How do they solve it today:** Notes app reminders, generic habit apps (Habitica, Streaks), or nothing — they just keep "trying to remember."
4. **Out of scope for V1:** Social features, habit suggestions/AI coaching, multiple simultaneous habits, gamified badges beyond a simple streak counter.

### H — Human Flow

1. **Who opens it first, and why today:** Someone who just failed at a habit (missed gym 3 days in a row) and is searching "simple habit tracker" out of frustration — not browsing casually.
2. **3 required steps:** 1) Pick ONE habit and a daily check-in time. 2) See today's single check-in button (nothing else on screen). 3) Tap it and see their streak count go up.
3. **"This works" moment:** The streak number increments and a small animation/sound confirms it — instant, tangible proof of progress.
4. **Error/empty state:** If they miss a day, the app shows "Streak reset to 0 — that's okay, restart today" instead of guilt-tripping copy or a broken/blank screen.

### I — Instruction

1. **Most important feature to brief AI on first:** The single daily check-in screen and streak logic — everything else is secondary.
2. **Prompt for AI:** "Build a single-screen mobile-first web app. The user has exactly one habit (text they set once during onboarding). The main screen shows today's date, the habit name, a large button labeled 'Done today,' and the current streak count. Tapping the button increments the streak by 1 and disables itself until midnight local time. If the user misses a day, reset the streak to 0 and show the message 'Streak reset — restart today' the next time they open the app. Do not add multiple habits, social features, or notifications in this version."
3. **Tool:** Cursor, using a Next.js + Supabase starter for auth and streak storage.

### P — Publish

1. **Where it lives:** A subdomain (streak.[mydomain].com), deployed on Vercel.
2. **Week-one metric:** % of signups who check in on day 2 (a proxy for whether the core loop is sticky at all).
3. **Feedback from first 10 users:** Direct message each one personally after day 3 asking "what almost made you stop using it?"
4. **Ship deadline:** This Friday — whatever state it's in, real users see it Friday, not "when it's ready."

---

## Available Formats

This file is the content spec. None of the actual PDF/Notion/Figma assets are generated here — a designer or no-code builder should use this section to produce each version.

### PDF (primary lead magnet asset)
- Single page, landscape, 2x2 grid layout matching the ASCII canvas above exactly.
- Branded header/footer per The SHIP Method OS visual identity (see `12-DESIGN-SYSTEM/DESIGN_SYSTEM.md` for colors/type if reused, but this asset can have lighter, friendlier styling than the core product docs since it's the free-tier touchpoint).
- Each prompt should have visible blank lines or boxes sized for handwriting/typing (3-4 lines per prompt, more space for Instruction quadrant prompt #2 since it's the longest answer).
- Include a tiny "15:00" timer icon or note in the corner of each quadrant with the suggested time allocation (4/4/4/3 min).
- Footer CTA: "Want the full system behind this canvas? Get The SHIP Method OS at [link]."
- Deliver as a downloadable, fillable PDF (form fields) so it can be typed into directly, plus a flat/printable version.

### Notion (interactive version)
- A single Notion template page, duplicable via "Duplicate to my workspace" button.
- Structure as a database OR a single page with 4 toggle/callout-block quadrants (database is better if users will run this canvas repeatedly for multiple ideas — give it columns for Idea Name, Date, Status, and a relation/sub-page per canvas).
- Each of the 16 prompts becomes its own text block with a placeholder/ghost text example pulled from the worked example above, so users see what a good answer looks like before they write their own.
- Add a built-in 15-minute checklist at the top (4 checkboxes, one per quadrant) so users can track their own progress through the exercise.
- Include a linked callout at the bottom: "Done? This is Phase 1 thinking. The full SHIP Method OS goes deeper into Structure, Human Flow, Instruction, and Publish — [link]."

### FigJam / Miro (collaborative/workshop version)
- 4 large sticky-note clusters arranged in the same 2x2 layout, one cluster per SHIP letter, color-coded (suggest: S=blue, H=green, I=orange, P=purple) for fast visual scanning in a workshop.
- Each cluster contains 4 (or 3-4) individual sticky notes pre-labeled with the quadrant's prompts as headers, with empty space below each for participants to add their own sticky notes with answers.
- Designed for team/workshop use: multiple people can add sticky notes simultaneously to the same quadrant (e.g., multiple personas' "who has this problem" answers clustered together), which the solo PDF/Notion versions don't support.
- Include a built-in 15-minute timer widget/frame note at the top of the board, and a "facilitator notes" sticky in the corner with instructions matching the "How to Use" steps above, adapted for group pacing (e.g., "2 min silent writing per quadrant, 2 min share-out").
- Bottom of board: a frame/section titled "Next Step" linking out to the SHIP Builder List signup and the paid repo, so teams that just ran this as a workshop have an obvious path to go deeper.
