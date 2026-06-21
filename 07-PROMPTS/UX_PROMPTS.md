# UX & UI Design Prompts

A copy-paste library covering user research synthesis, flow design, copy, and visual systems. Replace every `[bracket]` before running. These prompts are tool-agnostic by default but include notes on where Cursor/Windsurf add real value (when design decisions need to land directly in component code).

---

### User Journey Mapper
**Use when:** You need to map an end-to-end user journey (awareness through retention, or a single task flow) before designing screens.
**Best tool(s):** Claude — best at holding a multi-stage journey coherent with consistent emotional/friction annotation; Gemini if you're feeding in real analytics/session data to ground the stages.

```
Map the user journey for [persona name/description] completing [goal/task] within [product name].

Context:
- Entry point: [how they arrive — ad, referral, search, in-app prompt]
- Current known pain points: [list any, or "unknown — infer likely ones"]
- Success state: [what "done" looks like for the user]

For each stage of the journey, output a table with columns:
Stage | User Action | User Thought | Emotion (1-5, 1=frustrated, 5=delighted) | Touchpoint (screen/channel) | Friction Risk | Opportunity

Stages to cover: Awareness → Consideration → Onboarding → First Use → Habitual Use → [Retention/Referral if relevant].

After the table, identify the single highest-friction moment and propose one concrete UX intervention for it (not a vague "improve onboarding" — a specific mechanism).
```

---

### Feature-to-User-Flow Generator
**Use when:** You have a feature description and need a step-by-step user flow (screens + decision points) before wireframing.
**Best tool(s):** Claude or ChatGPT for the flow logic; Cursor/Windsurf if you want it to also map flow steps to existing route/page files in your codebase.

```
Generate a complete user flow for this feature: [feature description].

User goal: [what they're trying to accomplish]
Entry points: [where the user can start this flow from — list all of them]
Constraints: [auth required? mobile-only? offline-capable? etc.]

Output the flow as a numbered sequence:
1. [Screen/state name] — what the user sees, what action they take, where each action leads
2. ...

Requirements:
- Mark every decision point explicitly (e.g. "IF user has no payment method → branch to X")
- Include error/empty states as flow nodes, not afterthoughts (no data, network failure, permission denied)
- Mark the happy path clearly vs. edge-case branches
- Note any step that requires backend validation before the user can proceed
- End with: "Exit points" — every way a user can leave this flow, intentionally or not, and what state that leaves them in

Output as a numbered list, then a simple text-based flow diagram (boxes and arrows using ASCII or Mermaid syntax).
```

---

### UX Microcopy Writer
**Use when:** You need button labels, empty states, error messages, tooltips, or onboarding copy that match a defined voice.
**Best tool(s):** Claude — best at sustaining a precise tone across many small copy instances without drifting generic; ChatGPT is a fast second pass for brainstorming variants.

```
Write UX microcopy for the following UI moments in [product name]. Voice: [e.g. "direct, encouraging, no corporate jargon" — describe your actual brand voice, or paste examples of existing copy to match].

Moments needing copy:
1. [e.g. Empty state: user has no projects yet]
2. [e.g. Error: payment failed]
3. [e.g. Success: action completed]
4. [e.g. Confirmation modal: destructive action — deleting X]
[add more as needed]

For each moment, give:
- Primary copy (1 short line, the main message)
- Secondary copy if needed (1 supporting line, optional — only if it adds real clarity)
- CTA button label(s) (2-4 words max)
- 2 alternate primary copy variants for A/B testing

Rules:
- No generic SaaS phrases ("Oops! Something went wrong", "You're all set!") unless that genuinely matches the brand voice
- Error messages must say what happened AND what to do next — never just "An error occurred"
- Match reading level to [target audience — e.g. "busy non-technical small business owner"]
```

---

### Component Inventory from Screen Description
**Use when:** You have a screen description, wireframe, or screenshot and need a structured list of every UI component required to build it — useful for scoping dev work or checking against an existing design system.
**Best tool(s):** Claude with image input (paste the screenshot) — strongest at exhaustive, structured extraction from visuals; Cursor/Windsurf if you want the output cross-checked against your actual component library files.

```
Analyze this screen [paste screenshot/wireframe, or describe it in detail below] and produce a complete component inventory.

Screen: [name/purpose, e.g. "Billing settings page"]
Existing design system: [name it, e.g. "shadcn/ui" — or say "none yet, recommend generic component types"]

Output a table: Component | Type (e.g. button, input, modal, card) | Variant/State needed (e.g. "primary, disabled state") | Existing in design system? (yes/no/needs new variant) | Notes

Then list:
- Any component used more than 3 times on this screen (candidate for extraction/reuse)
- Any component that doesn't exist in the stated design system and needs to be created
- Any inconsistency you notice (e.g. two different button styles doing the same job)
```

---

### Wireframe/Screenshot Usability Critique
**Use when:** You have a wireframe, mockup, or live screenshot and want a structured usability pass before it goes to dev or a stakeholder review.
**Best tool(s):** Claude or Gemini with image input — both handle visual critique well; Claude tends to give more actionable, less generic feedback. Use Gemini if you need to critique many screens in one batch.

```
Critique this screen [paste screenshot/image] for usability issues. Act as a senior UX reviewer doing a heuristic evaluation, not a cheerleader.

Context: [what this screen is for, who uses it, what they're trying to do]

Evaluate against:
1. Visual hierarchy — is the primary action obvious within 2 seconds?
2. Cognitive load — count distinct decisions/inputs required; flag if too many for the task
3. Nielsen heuristics — call out any specific violations (e.g. "no visibility of system status", "error prevention missing")
4. Accessibility red flags — contrast, touch target size, reliance on color alone
5. Consistency — does this match conventional patterns users already know, or does it invent unnecessary novelty?

Output format:
- Top 3 issues, ranked by how much they'll hurt conversion/task completion, each with a specific fix (not "improve hierarchy" — say exactly what to change)
- 1 thing that's working well (so the fix list isn't mistaken for "redo everything")
- A severity tag per issue: Blocker / Major / Minor
```

---

### Design Token Generator from Brand Description
**Use when:** You're starting a new product or rebrand and need a structured design token set (color, type, spacing) to hand to dev/design tools, derived from a brand description or mood reference.
**Best tool(s):** Claude — best at producing systematic, internally consistent token sets with rationale; Cursor/Windsurf to directly output as a `tailwind.config` or CSS variables file inside your repo.

```
Generate a design token set for [product name], a [product description] targeting [audience].

Brand direction: [describe — e.g. "trustworthy but not corporate, calm, for finance-anxious small business owners" — or paste reference brands/screenshots you like]

Generate:
1. Color tokens: primary, secondary, accent, success, warning, error, neutral scale (50-900), each with hex value and a one-line rationale for the primary/accent choices specifically
2. Type tokens: font family recommendation (with reasoning + fallback stack), type scale (e.g. xs/sm/base/lg/xl/2xl/3xl with px and line-height), weight usage rules (when to use 400/500/600/700)
3. Spacing tokens: base unit and scale (e.g. 4px base: 4/8/12/16/24/32/48/64)
4. Radius and shadow tokens: 2-3 radius sizes, 2-3 elevation levels

Constraints:
- Verify all primary text/background color pairs meet WCAG AA contrast (4.5:1) — flag any that don't and adjust
- Output as both a human-readable table AND a copy-pasteable code block in [CSS variables / Tailwind config / JSON — specify which]
```

---

### Accessibility Review Prompt
**Use when:** You need a structured accessibility pass on a screen, component, or flow before or after building it — catches issues a visual-only review misses.
**Best tool(s):** Claude — most reliable at applying WCAG criteria specifically rather than generic "make it accessible" advice; Cursor/Windsurf if reviewing actual rendered HTML/JSX so it can check real markup, not just a description.

```
Run an accessibility review on [screen/component/flow name] against WCAG 2.1 AA.

What I'm providing: [screenshot / HTML markup / component code / description — paste it below]
[paste here]

Check specifically for:
1. Color contrast (text/background, icon/background) — flag any pair below 4.5:1 (3:1 for large text)
2. Keyboard navigation — can every interactive element be reached and operated via keyboard alone, in a logical order?
3. Screen reader support — are there proper labels/alt text/ARIA roles for non-text content and custom components?
4. Touch target size — are tappable elements at least 44x44px (mobile)?
5. Motion/animation — is there a reduced-motion consideration for anything that auto-plays or auto-scrolls?
6. Form accessibility — are errors announced, are labels programmatically associated with inputs?

Output: a table of Issue | WCAG criterion violated | Severity (Blocker/Major/Minor) | Specific fix.
Then state a pass/fail verdict for AA compliance and the single highest-priority fix if only one thing could be fixed today.
```

---

### Onboarding Flow Friction Audit
**Use when:** Activation/onboarding completion rates are weak and you need a structured pass identifying where users are likely dropping off, before instrumenting analytics to confirm.
**Best tool(s):** Claude — strong at applying behavioral/UX heuristics systematically across a multi-step flow; ChatGPT works as a fast second opinion.

```
Audit this onboarding flow for friction that would cause drop-off, before we have analytics to confirm it.

Flow steps: [list every step in order, including what's required at each — e.g. "1. Email signup 2. Verify email 3. Connect [integration] 4. Create first [object] 5. Invite teammate"]
Required vs optional: [mark which steps are mandatory to reach value vs skippable]
Time to first value today: [estimate, e.g. "~6 minutes if nothing goes wrong"]

For each step, assess:
- Is this step actually necessary before the user experiences value, or can it be deferred?
- What's the most likely reason a user abandons here? (be specific — not "too many steps")
- Cognitive/technical effort required (low/medium/high)

Output:
1. Step-by-step friction table (Step | Necessary now? | Likely abandon reason | Effort)
2. Recommended new sequence — which steps to defer to after first value, which to cut, which to combine
3. The single step most likely responsible for the biggest drop-off, with your reasoning
```

---

### Empty State & Error State Designer
**Use when:** A feature has been designed for the happy path only and needs its empty/loading/error states defined before dev builds it.
**Best tool(s):** ChatGPT or Claude — both handle this well; Cursor/Windsurf if you want the states scaffolded directly as component variants in code alongside the happy-path component.

```
Design the non-happy-path states for [feature/screen name]. The happy path is already designed: [briefly describe it].

Generate specs for each of these states:
1. Empty state (first-time use, zero data) — what's shown, what copy, what CTA (should guide toward the first action, not just say "nothing here")
2. Loading state — skeleton vs. spinner decision (justify), max acceptable wait before showing it
3. Error state (request failed) — copy, recovery action, whether to auto-retry
4. Partial data state (some but not all data loaded/available) — how to indicate incompleteness
5. Permission-denied state (user lacks access) — copy, whether to show a request-access path

For each: describe the visual treatment in 1-2 sentences and write the actual copy (not placeholder text).
```

---

## Compatibility Notes

| Tool | Strengths | How to feed context | Gotchas |
|---|---|---|---|
| ChatGPT | Fast for copy variants and quick flow brainstorming; good general usability knowledge | Paste descriptions, briefs, or brand voice examples directly | Visual critique from images is less precise than Claude/Gemini — verify specific claims (e.g. contrast ratios) independently |
| Claude | Strongest for image-based critique (wireframes/screenshots), microcopy with sustained voice, and systematic accessibility/heuristic review | Paste screenshots directly into the chat; paste full brand guidelines or existing copy samples for voice-matching | Will sometimes ask clarifying questions before committing — explicitly say "make your best assumption and proceed" if you want one-shot output |
| Gemini | Good for batch image critique (multiple screens at once) and grounding analysis in current design trend knowledge | Paste multiple screenshots in one message; works well with long mixed text+image input | Output structure compliance is less consistent — double check tables/format match what you asked for |
| Cursor | Best when design decisions (tokens, component specs) need to land directly in code as the source of truth | @-mention your existing component files, tailwind config, or design token file so output matches real naming/structure | Will default to "what exists" rather than "what should be" — explicitly state when you want it to override existing patterns |
| Windsurf | Same strength as Cursor — direct-to-code token/component generation grounded in your actual repo | Open the relevant component and style files before prompting so it infers real conventions | Can silently reuse outdated patterns if stale files are open — close unrelated files to avoid contaminating context |
