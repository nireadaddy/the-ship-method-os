# DESIGN_TO_AI_PROMPTS

**Phase:** Design System
**Purpose:** A copy-paste prompt library for turning `DESIGN_SYSTEM.md` and `UI_COMPONENT_SPEC.md` into actual generated UI — design systems, components, full screens, and microcopy — without re-explaining your brand and conventions from scratch in every chat. Replace every `[bracket]` before running.

**Critical note on Cursor/Windsurf:** these tools are repo-aware — they read whatever files are open or @-mentioned and use that as real context, not just text you typed. For every prompt below marked for Cursor/Windsurf, **@-mention `DESIGN_SYSTEM.md`, `UI_COMPONENT_SPEC.md`, and any existing component/style files first** before running the prompt. Skipping this step turns a repo-aware tool into a worse version of a chat-only tool — you lose the entire advantage.

---

### Design System Generator from Brand Description
**Use when:** Section 1-7 of `DESIGN_SYSTEM.md` are still blank and you need a first-draft full design system (principles, colors, type, spacing) from a plain-language brand description.
**Best tool(s):** Claude — most reliable at producing an internally consistent, well-reasoned system rather than a generic template; Gemini as a second opinion on visual trend alignment.

```
Generate a complete design system draft for [product name], a [product description] for [target audience — paste from PROJECT.md Section 4].

Brand direction input: [paste your filled Brand Personality Worksheet from DESIGN_SYSTEM.md Section 2, or describe in plain language — e.g. "trustworthy but not corporate, calm, built for finance-anxious small business owners who get overwhelmed by complex software"]
Closest reference product (visually): [name a real product/site]
Chosen visual direction: [Minimal / Bold / Playful / Corporate — or ask me to recommend one based on the audience]

Generate, matching the exact table structure below:
1. 4-6 design principles, each with a one-line rationale
2. Color system: primary, secondary, accent, neutral scale, and semantic colors (success/warning/error/info) — real hex values, with a one-line usage rule per color, and a note on how each shifts for dark mode
3. Verify every text/background color pair meets WCAG AA (4.5:1 body, 3:1 large text) — flag and fix any that don't
4. Typography scale (xs through 4xl/5xl) with px/rem sizes, line heights, and suggested weights, plus a heading + body font pairing recommendation with reasoning
5. Spacing scale on a 4px base unit (4/8/12/16/24/32/48/64/96)
6. 12-column grid breakpoint table (mobile/tablet/desktop/wide) with container padding per breakpoint

Output as Markdown tables matching this structure exactly so it can be pasted directly into DESIGN_SYSTEM.md. Flag any place you made an assumption due to missing brand information.
```

---

### Component Generator from UI_COMPONENT_SPEC.md
**Use when:** A component has a filled-out spec (using the template in `UI_COMPONENT_SPEC.md`) and you need working code, matching every variant/state/prop exactly.
**Best tool(s):** Cursor/Windsurf strongly preferred — they can match your actual file structure, styling approach, and existing component patterns live in the repo. Claude/ChatGPT work for a first draft if you don't have code yet to match against.

```
Build the [component name] component in [React/Vue/Svelte + TypeScript + Tailwind — specify your stack] from this spec:

[paste the full filled-out spec section for this component from UI_COMPONENT_SPEC.md — Variants, States, Props, UX Rules, Accessibility Rules tables]

Match these existing conventions (reference the open/@-mentioned files): [@-mention an existing similar component for file structure, naming, and prop destructuring style — or state "no existing components yet, establish the pattern"]

Requirements:
- Implement every variant and every state listed — do not skip states marked "if applicable" without confirming they don't apply here
- Implement every prop in the Props table with the exact name, type, and default given
- Apply every UX Rule and Accessibility Rule as actual behavior/markup, not just a comment
- Use design tokens from DESIGN_SYSTEM.md (colors, spacing, type scale) rather than inventing new values

Output the full component code plus one usage example per variant, and explicitly call out any spec requirement you could not implement and why.
```

---

### Landing Page UI Generator
**Use when:** You have approved landing page copy (e.g. from `landing-page-builder`/Hormozi-Brunson-Edwards structure) and need it built as an actual UI matching your design system.
**Best tool(s):** Cursor/Windsurf for direct-to-code output matching your stack; Claude or ChatGPT for an HTML/Tailwind first draft if no codebase exists yet.

```
Build a landing page UI in [HTML+Tailwind / React+Tailwind / Next.js — specify] for [product name], implementing this approved copy:

[paste the full landing page copy — headline, subheadline, problem/PAS, offer stack, bullets, social proof, price reveal, guarantee, FAQ, final CTA]

Design system to follow: [@-mention DESIGN_SYSTEM.md, or paste: chosen visual direction, primary/accent hex values, heading/body fonts, spacing scale]

Section-by-section requirements:
- Hero: headline at text-5xl/text-4xl (desktop/mobile) per type scale, primary CTA button (single, most prominent element above the fold)
- Problem/PAS section: readable line length (max ~65ch), generous vertical spacing (space-16/space-24 between sections)
- Offer stack: card-based layout, one card per stack item, consistent card padding/radius per Card System
- Social proof: avatar + name + role + quote pattern, or logo strip if B2B
- Price reveal + guarantee: visually distinct section (background tint), guarantee in its own bordered/badged callout
- FAQ: accordion pattern, one open at a time by default
- Final CTA: repeats the primary button styling exactly from the hero — same variant, same color, no new button style introduced

Make it fully responsive mobile-first per the breakpoint table in DESIGN_SYSTEM.md Section 20. Output the full code.
```

---

### Dashboard UI Generator
**Use when:** You need a dashboard screen (stat cards, charts, filters, tables) built from your design system rather than a generic admin template.
**Best tool(s):** Cursor/Windsurf for direct-to-code, especially if a Data Table/Stat Card component already exists to reuse; Claude for a structural first draft.

```
Build a dashboard UI in [React/Next.js + Tailwind — specify] for [dashboard purpose, e.g. "a SaaS admin's billing/usage overview"], for the persona: [paste relevant persona from PROJECT.md].

Layout: [sidebar navigation / top nav — specify, see DESIGN_SYSTEM.md Section 13 for the decision rule] on the [left/top], main content area max-width per the 12-column grid.

Content to include:
1. Stat cards row: [list 3-5 KPIs, e.g. "MRR, Active users, Churn rate, Trial conversions"] — each per Stat Card spec (label, big number, delta indicator, no number without comparison context)
2. Chart section: [specify chart type and what it shows, e.g. "line chart, MRR over last 90 days"] — labeled axes, Primary color for main series, explicit "no data" state if applicable
3. Filter bar: [list filters needed, e.g. "date range, plan tier"] — pinned above the table, shows active filter count, one-click clear-all
4. Data table: [specify columns] — sortable, paginated at 25 rows, distinct true-empty vs filtered-empty states per DESIGN_SYSTEM.md Section 14

Use existing components if available: [@-mention existing StatCard/DataTable/Button components]. Reuse design tokens (colors/spacing/type) from DESIGN_SYSTEM.md rather than inventing new values. Include loading states (skeleton for stat cards and table) and make the layout responsive per Section 20 (sidebar collapses to drawer on mobile, stat cards stack to 1-2 columns).

Output the full screen code.
```

---

### SaaS App UI Generator
**Use when:** Building a core in-app screen for a SaaS product (settings, billing, team management, main workspace view) that needs to feel native to the rest of the product, not like a one-off page.
**Best tool(s):** Cursor/Windsurf for consistency with existing screens; Claude for a first structural pass when no other screens exist yet to match.

```
Build a [screen name, e.g. "Team Settings"] screen in [stack — specify] for [product name], a SaaS product for [audience].

User goal on this screen: [what the user is trying to accomplish here]
Key actions available: [list — e.g. "invite teammate, change role, remove member"]
Data shown: [describe the data/objects on this screen]

Design system to follow: [@-mention DESIGN_SYSTEM.md] — navigation pattern: [sidebar/top nav, per Section 13], primary action: [name the one primary CTA on this screen — there should be exactly one]

Requirements:
- Reuse existing components for this product where applicable: [@-mention Button, Input, Table, Modal etc. if they exist]
- Destructive actions (e.g. "Remove member") require a confirmation step per the Button System destructive rule
- Include empty state (e.g. "no team members yet besides you") and loading state for any async data
- Form sections (if any) follow the Form System validation rules — inline errors, validate on blur/submit not per-keystroke
- Responsive per Section 20 — specify how this layout reflows on mobile

Output the full screen code plus a one-line note on which existing components you reused vs. which you had to create new (and why).
```

---

### CRM UI Generator
**Use when:** Building CRM-specific views (contact list, pipeline/kanban, deal detail, activity timeline) that need to handle relational data and bulk actions cleanly.
**Best tool(s):** Cursor/Windsurf for matching existing data table/card patterns; Claude for structuring the pipeline/kanban interaction model first if it's not yet defined.

```
Build a [CRM view name — e.g. "Deal Pipeline (Kanban)" / "Contact List" / "Contact Detail"] in [stack — specify] for [product name].

View-specific requirements:
[For Pipeline/Kanban:] Columns = pipeline stages [list stages]. Cards show [fields to show per card, e.g. "deal name, value, contact, days in stage"]. Support drag-and-drop between stages with optimistic UI update and a visible error/revert state if the backend update fails. Show a stage total ($ sum + count) in each column header.
[For Contact List:] Table per Data Table spec — columns: [list]. Support bulk select (checkbox column) with a bulk action bar that appears when ≥1 row is selected (e.g. "Add to list", "Delete", "Export").
[For Contact/Deal Detail:] Two-column layout — left: core fields + edit-in-place, right: activity timeline (notes, emails, status changes) in reverse-chronological order with relative timestamps ("2 hours ago").

Design system to follow: [@-mention DESIGN_SYSTEM.md], reuse existing Table/Card/Button components: [@-mention if they exist]

Requirements:
- Empty states distinct per context (no contacts yet vs. no contacts matching filter vs. empty pipeline stage)
- Bulk/destructive actions require confirmation
- Loading states: skeleton matching real layout, not a generic spinner

Output the full view code.
```

---

### Mobile UI Generator
**Use when:** Building a native-feeling mobile screen (iOS/Android/React Native/Flutter) or a mobile web view, where touch ergonomics and platform conventions matter more than desktop patterns.
**Best tool(s):** Claude or Cursor/Windsurf depending on stack — for React Native/Flutter, Cursor/Windsurf with the relevant platform files open; for a single screen mockup, Claude works well as a first pass.

```
Build a [screen name] mobile screen in [React Native / Flutter / SwiftUI / mobile web (Tailwind) — specify] for [product name].

Screen purpose: [what the user does here]
Key content/actions: [list]

Design system to follow: [@-mention DESIGN_SYSTEM.md] — adapt for mobile per Section 20: single-column layout, bottom nav or hamburger instead of sidebar, primary actions reachable within thumb zone (bottom half of screen preferred for frequent actions).

Mobile-specific requirements:
- All tappable elements minimum 44x44px hit area, even if the visual element is smaller
- No hover-only interactions — anything that was a hover affordance on desktop needs a tap-visible equivalent here
- Forms: native keyboard type matched to input (numeric keyboard for numbers, email keyboard for email)
- Use platform-appropriate motion/transitions [specify iOS-style push vs. Android-style fade, or "match existing screens" if @-mentioning others]
- Safe area insets respected (notch/home indicator) if this is a full-screen view

Output the full screen code plus a note on any desktop pattern from DESIGN_SYSTEM.md you had to adapt for mobile and how.
```

---

### Responsive Layout Generator from Desktop Design
**Use when:** A desktop screen/component already exists and you need it correctly re-flowed for tablet and mobile — not just shrunk.
**Best tool(s):** Cursor/Windsurf — @-mention the existing desktop component file so the output is an actual responsive variant of real code, not a fresh reinterpretation.

```
Adapt this existing desktop layout for mobile and tablet, following the breakpoint table in DESIGN_SYSTEM.md Section 20 (and Section 7 for the grid):

[@-mention the existing component/screen file, or paste its code/screenshot]

Required re-flow per breakpoint (do not just scale down — restructure):
- Mobile (<768px): [specify — e.g. "sidebar becomes a bottom drawer triggered by a hamburger icon; the 3-column card grid becomes a single stacked column; the data table becomes a card-list per the Table System mobile fallback"]
- Tablet (768-1023px): [specify — e.g. "2-column card grid; sidebar becomes a collapsible icon-only rail"]
- Desktop (≥1024px): unchanged from the existing layout

Requirements:
- Preserve all functionality at every breakpoint — nothing should become unreachable on mobile (e.g. row actions hidden in a table must still be reachable in the card-list fallback)
- Hover-only interactions on desktop need a tap-accessible equivalent at mobile/tablet
- Touch targets at mobile/tablet meet the 44x44px minimum even where the desktop equivalent is smaller
- Use the same design tokens (colors, spacing, type) at every breakpoint — only layout/structure changes, not the visual language

Output the updated component code with the responsive logic (Tailwind breakpoint classes, CSS media queries, or platform-specific layout — match what the existing file already uses).
```

---

### UX Writing / Microcopy for a Given Screen
**Use when:** A screen is structurally built but the copy is still placeholder ("Lorem ipsum", "Button text") and needs real, on-voice microcopy for every label, button, and message.
**Best tool(s):** Claude — most reliable at sustaining a defined brand voice across many short strings consistently; ChatGPT as a fast alternative for less voice-sensitive copy.

```
Write all UI microcopy for the [screen name] screen of [product name].

Brand voice: [paste your one-sentence brand voice summary from DESIGN_SYSTEM.md Section 2, e.g. "Speaks like a competent senior coworker — direct, no jargon, no exclamation points."]
Screen context: [describe what the screen does and the user's state of mind arriving at it — e.g. "user just failed to upload a file due to size limit"]

Provide copy for every one of these, only where applicable to this screen:
- Page/section title
- Every button label (verb-first, specific — not "Submit"/"OK")
- Every form field label + helper text (if any)
- Every validation error message (specific and actionable, never blame-phrased)
- Empty state headline + supporting line + CTA label (if this screen can be empty)
- Confirmation/success message after the primary action completes
- Any tooltip text

Output as a table: Element | Copy | Notes (character limit if relevant, or tone reasoning if non-obvious). Flag anywhere the brand voice and a UX-clarity requirement might be in tension (e.g. "playful voice would normally use an exclamation point here, but error messages should stay neutral") and tell me which you prioritized and why.
```

---

### Microcopy for Error & Empty States
**Use when:** You need a complete, consistent set of error and empty-state copy across an entire flow or feature, not just one screen — to avoid each screen inventing its own tone/structure for these moments.
**Best tool(s):** Claude — strongest at applying a consistent structural pattern (the empty/error state templates from DESIGN_SYSTEM.md Sections 16-17) across many instances at once without drifting.

```
Write error and empty-state copy for every state listed below, for [product name]. Brand voice: [paste one-sentence brand voice summary].

Follow this structure for every empty state (per DESIGN_SYSTEM.md Section 16): icon/illustration cue (describe, don't render) → headline (what's missing, plainly) → one supporting sentence (why it matters / what happens next) → primary CTA label.

Follow this structure for every error state (per Section 17): plain-language headline (no jargon, no error codes as the primary message) → one supporting sentence (what happened, in non-technical terms) → recovery action label.

States needed:
1. [e.g. "No projects created yet (true empty)"]
2. [e.g. "Search returned zero results"]
3. [e.g. "Filtered list returned zero results"]
4. [e.g. "Page failed to load (network/server error)"]
5. [e.g. "Form submission failed validation"]
6. [e.g. "User lacks permission to view this"]
7. [e.g. "Offline / lost connection"]
[add/remove rows as needed for your product]

Output as a table: State | Headline | Supporting line | CTA/Action label. Explicitly distinguish true-empty from filtered-empty copy (these must never be identical) and never surface a raw error code or stack trace as the primary message — if a reference ID is useful for support, add it as a small secondary line, not the headline.
```

---

## Compatibility Notes

| Tool | Strengths | How to feed context | Gotchas |
|---|---|---|---|
| ChatGPT | Fast for copy variants and quick first-draft layouts; decent general design sense | Paste DESIGN_SYSTEM.md sections and copy directly into the chat | Produces a code block to paste manually — no direct repo awareness; double-check generated values match your actual hex/spacing tokens rather than approximations |
| Claude | Strongest for systematic, internally consistent output across many components/strings at once (design systems, microcopy sets); best at sustained brand voice | Paste full relevant DESIGN_SYSTEM.md/UI_COMPONENT_SPEC.md sections, or upload the files to a Project for persistent reference across a session | Produces a code block to paste manually, same as ChatGPT — verify the output actually got pasted into the right file/location afterward |
| Gemini | Good second opinion on visual trend alignment; handles long mixed text+image input well (e.g. multiple screenshots for a responsive audit) | Paste screenshots of existing screens alongside the spec text | Less consistent at matching exact table/structure formatting you request — double-check output structure before treating it as final |
| Cursor | Can scaffold actual component/screen files directly in your repo, matching real existing code conventions live | @-mention `DESIGN_SYSTEM.md`, `UI_COMPONENT_SPEC.md`, and an existing similar component file before prompting | Without an @-mentioned design system file, it will default to generic Tailwind defaults instead of your actual tokens — always @-mention, never assume it "remembers" your palette |
| Windsurf | Same direct-to-code advantage as Cursor — writes real files, not just chat code blocks | Open the relevant component/style files in the editor before prompting so it infers real conventions from open context | Can silently reuse stale tokens/patterns if outdated files are left open — close unrelated/old component files to avoid contaminating the generation |

---

**Next step:** Generated UI should be checked against the UI Component Checklist in `DESIGN_SYSTEM.md` Section 9 — mark each component off only once it's built *and* matches its spec in `UI_COMPONENT_SPEC.md`.
