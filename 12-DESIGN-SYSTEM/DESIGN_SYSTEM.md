# DESIGN_SYSTEM

**Phase:** Design System
**Purpose:** Give a non-designer everything needed to define a coherent visual language — principles, colors, type, spacing, components, states — *before* prompting AI to build UI. Skipping this file is why AI-built products look like five different apps stitched together; every screen prompt downstream should be able to point back here instead of re-deciding color and spacing from scratch.

> Fill every bracket. "TBD" is allowed once on a first pass, not by the time you start writing prompts in `DESIGN_TO_AI_PROMPTS.md`.

---

## 1. Design Principles

> 4-6 principles, each one sentence + a one-line rationale. These are the rules you paste into every AI build prompt so output stays consistent across 50 separate chat sessions.

| Principle | Rationale |
|---|---|
| Clarity over decoration | Every pixel that doesn't help the user understand or act is a pixel competing for attention against the one that does. |
| Consistency over novelty | Reusing the same button, spacing, and pattern everywhere lets users build muscle memory instead of re-learning your UI per screen. |
| One primary action per screen | If three buttons look equally important, the user has to think — and "had to think" is where conversion and task completion die. |
| Fast feedback, always | Every action (click, submit, save) gets a visible response within 100ms (instant) or a loading state within 400ms — silence reads as broken. |
| Accessible by default, not by retrofit | Contrast, focus states, and keyboard support are cheaper to build in from prompt #1 than to bolt on after 40 screens exist. |
| [Your 6th principle, if needed] | |

## 2. Brand Personality Worksheet

> Pick a point on each slider (1-5). This worksheet is what you paste into an AI prompt as "brand direction" — vague words like "modern and clean" produce generic output; sliders force a specific position.

| Trait A | 1 | 2 | 3 | 4 | 5 | Trait B |
|---|---|---|---|---|---|---|
| Minimal | | | | | | Maximal / rich |
| Serious | | | | | | Playful |
| Corporate | | | | | | Indie / personal |
| Quiet / calm | | | | | | Loud / energetic |
| Premium / exclusive | | | | | | Accessible / mass-market |
| Technical / precise | | | | | | Warm / human |
| Traditional | | | | | | Experimental |

- **Three adjectives this product should feel like:** [e.g. "trustworthy, fast, unfussy"]
- **Three adjectives it should NEVER feel like:** [e.g. "corporate, loud, gimmicky"]
- **Closest reference product (visually):** [name a real product/site whose vibe is close]
- **One sentence brand voice summary:** [e.g. "Speaks like a competent senior coworker — direct, no jargon, no exclamation points."]

## 3. Visual Direction

> Pick ONE primary direction. Mixing directions is the #1 reason AI-generated UIs feel incoherent — every component prompt should restate this direction.

| Direction | When to pick it | Visual markers |
|---|---|---|
| **Minimal** | B2B tools, dashboards, productivity, anything used daily for long sessions | Lots of whitespace, neutral palette + 1 accent, thin borders (1px), low shadow elevation, sans-serif only |
| **Bold** | Consumer apps, creator tools, anything competing for attention in a crowded feed/market | High-contrast color blocks, large type scale jumps, saturated primary color, confident black text |
| **Playful** | Consumer/social, younger audience, low-stakes daily-use habit loops | Rounded corners (12px+), illustration/emoji accents, bouncy micro-interactions, 2-3 accent colors |
| **Corporate** | Enterprise B2B, finance, healthcare, anything sold to a procurement/legal team | Conservative palette (navy/gray/one accent), serif or geometric sans for headings, dense information, minimal animation |

- **Chosen direction:** [Minimal / Bold / Playful / Corporate]
- **Why this direction fits this product + audience:** [one sentence — tie back to Section 4 Target Audience in `PROJECT.md`]
- **Direction explicitly ruled out and why:** [e.g. "Not Playful — finance-anxious SMB owners read playful as 'not trustworthy with my money'"]

## 4. Color System

> Pick real hex values now. Every AI prompt for UI should include this table verbatim instead of saying "use a nice blue."

### 4.1 Core Palette

| Role | Light mode hex | Usage rule |
|---|---|---|
| Primary | `#2563EB` | Main CTAs, active nav state, links, primary brand moments. Use on max 1-2 elements per screen — primary loses meaning if everything is primary. |
| Secondary | `#7C3AED` | Secondary emphasis only (badges, secondary CTA outline) — never compete with Primary on the same screen for the same action. |
| Accent | `#F59E0B` | Highlights, notifications dots, "new" badges — sparingly, 1 accent moment per screen max. |
| Neutral-900 | `#111827` | Primary body text. |
| Neutral-600 | `#4B5563` | Secondary text, captions, placeholder text. |
| Neutral-300 | `#D1D5DB` | Borders, dividers. |
| Neutral-100 | `#F3F4F6` | Page background, card hover background. |
| Neutral-0 | `#FFFFFF` | Card/surface background. |

### 4.2 Semantic Colors

| State | Hex | Usage |
|---|---|---|
| Success | `#16A34A` | Confirmations, completed states, positive deltas. |
| Warning | `#D97706` | Non-blocking issues, "needs attention" states. |
| Error / Destructive | `#DC2626` | Validation errors, destructive action buttons, failed states. |
| Info | `#0EA5E9` | Neutral informational banners, tooltips. |

### 4.3 Dark Mode Notes

- Don't invert colors mathematically (white-on-black is harsher than off-white-on-near-black). Use `Neutral-900` (`#111827`) → background, `Neutral-50` (`#F9FAFB`) → primary text.
- Desaturate Primary/Accent slightly in dark mode (e.g. `#2563EB` → `#3B82F6`) — saturated colors vibrate against dark backgrounds.
- Semantic colors (success/warning/error) should lighten by one step in dark mode for the same reason.
- Always re-check contrast ratios per mode — a pair that passes AA in light mode does not automatically pass in dark mode.

### 4.4 Contrast Rules (non-negotiable)

- Body text on background: **minimum 4.5:1** (WCAG AA).
- Large text (24px+/bold 19px+) on background: **minimum 3:1**.
- Icon-only buttons and form borders: **minimum 3:1** against adjacent background.
- Never convey state (error/success) through color alone — pair with icon + text label.

## 5. Typography System

| Token | Size (px / rem) | Line height | Weight | Usage |
|---|---|---|---|---|
| `text-xs` | 12px / 0.75rem | 16px | 400/500 | Captions, timestamps, helper text |
| `text-sm` | 14px / 0.875rem | 20px | 400/500 | Body small, table cells, form labels |
| `text-base` | 16px / 1rem | 24px | 400 | Default body text |
| `text-lg` | 18px / 1.125rem | 28px | 500 | Emphasized body, card titles |
| `text-xl` | 20px / 1.25rem | 28px | 600 | Section headers |
| `text-2xl` | 24px / 1.5rem | 32px | 600 | Page titles (dashboard/app context) |
| `text-3xl` | 30px / 1.875rem | 36px | 700 | Page titles (marketing context) |
| `text-4xl` | 36px / 2.25rem | 40px | 700 | Hero headline (mobile) |
| `text-5xl` | 48px / 3rem | 1.1 | 800 | Hero headline (desktop) |

- **Font pairing guidance:**
  - **Minimal/Corporate direction:** one font family for everything (e.g. Inter, IBM Plex Sans, Geist) — weight does the differentiation, not a second typeface.
  - **Bold/Playful direction:** a distinct display font for headings (e.g. Cal Sans, Clash Display) + a neutral workhorse for body (Inter, system-ui) — never use a display font below 18px or for paragraph text.
  - **Never pair two serif fonts or two display fonts** — pick one "voice" font (headings) and one "utility" font (everything else read in long stretches).
- **Chosen heading font:** [name + fallback stack, e.g. `"Inter", system-ui, sans-serif`]
- **Chosen body font:** [name + fallback stack]
- **Max line length for body text:** 60-75 characters (`max-w-[65ch]` in Tailwind terms) — longer lines hurt readability regardless of font choice.

## 6. Spacing System

> Base unit: **4px**. Every margin, padding, and gap value in the product should be a multiple of this scale — no arbitrary `13px` or `22px` values.

| Token | Value | Common usage |
|---|---|---|
| `space-1` | 4px | Icon-to-text gap, tight inline spacing |
| `space-2` | 8px | Form field internal padding, chip padding |
| `space-3` | 12px | Compact card padding, button vertical padding |
| `space-4` | 16px | Default card padding, default gap between form fields |
| `space-6` | 24px | Section internal padding, gap between related cards |
| `space-8` | 32px | Gap between distinct sections on a page |
| `space-12` | 48px | Page-level top padding, gap between major page regions |
| `space-16` | 64px | Marketing page section spacing |
| `space-24` | 96px | Hero section padding (desktop) |

- **Rule:** if a spacing value isn't on this table, round to the nearest token — don't introduce a new one without adding it here first.

## 7. Layout Grid

- **Grid:** 12-column grid, max content width **1280px** (centered, with side gutters that scale per breakpoint).
- **Gutter:** 24px between columns (desktop), 16px (mobile).

| Breakpoint | Min width | Container padding | Typical column usage |
|---|---|---|---|
| `xs` (mobile) | 0px | 16px | Full-width, single column (12/12) |
| `sm` | 640px | 24px | Single column, may split 6/6 for simple cards |
| `md` (tablet) | 768px | 32px | 2-column layouts begin (6/6, 4/8) |
| `lg` (desktop) | 1024px | 40px | Sidebar layouts (3/9, 2/10), 3-up card grids (4/4/4) |
| `xl` (wide desktop) | 1280px | 40px (capped container) | Dashboard layouts, 4-up grids (3/3/3/3) |

## 8. Component Principles

- **One component, one definition.** A "primary button" looks and behaves identically everywhere it appears — never restyle it per-page.
- **States are part of the spec, not an afterthought.** Default/hover/active/disabled/loading/error are designed *with* the component, not patched in after a bug report.
- **No orphan styling.** If a screen needs a button that doesn't match an existing variant, that's a new variant added to this file — not a one-off inline style.
- **Composition over duplication.** Build small primitives (Button, Input, Badge) and compose larger patterns (Form, Card, Table) from them — don't hand-build a "form" from scratch each time.
- **Every interactive element has a visible focus state.** No exceptions, including custom checkboxes/toggles.

## 9. UI Component Checklist

> Inventory every product needs before AI starts building screens. Check off as each is specified in `UI_COMPONENT_SPEC.md` and built.

- [ ] Button (primary, secondary, ghost, destructive)
- [ ] Input (text, email, password, number, textarea)
- [ ] Select / Dropdown
- [ ] Checkbox / Radio / Toggle
- [ ] Form layout + validation/error pattern
- [ ] Card
- [ ] Modal / Dialog
- [ ] Drawer / Slide-over panel
- [ ] Toast / Notification
- [ ] Badge / Tag / Pill
- [ ] Avatar
- [ ] Top navigation bar
- [ ] Sidebar navigation
- [ ] Tabs
- [ ] Breadcrumbs
- [ ] Data table (sort, pagination, empty state)
- [ ] Pagination control (standalone)
- [ ] Stat card / KPI tile
- [ ] Chart container (line/bar/pie)
- [ ] Filter bar / search input
- [ ] Empty state
- [ ] Error state / error boundary
- [ ] Loading state (skeleton + spinner)
- [ ] Tooltip / popover
- [ ] Dropdown menu (kebab/context menu)
- [ ] Pricing table (if SaaS/paid product)
- [ ] File upload
- [ ] Date picker

## 10. Button System

| Variant | Default | Hover | Active | Disabled | Loading |
|---|---|---|---|---|---|
| **Primary** | `bg-Primary text-white` | `bg-Primary darkened 8%` | `bg-Primary darkened 15%`, scale 0.98 | `bg-Neutral-300 text-Neutral-600`, no pointer events | Text replaced/accompanied by spinner, button width locked to prevent layout shift |
| **Secondary** | `border border-Primary text-Primary bg-transparent` | `bg-Primary/5` | `bg-Primary/10` | `border-Neutral-300 text-Neutral-300` | Spinner in Primary color |
| **Ghost** | `text-Neutral-900 bg-transparent` | `bg-Neutral-100` | `bg-Neutral-300/50` | `text-Neutral-300` | Spinner in Neutral-600 |
| **Destructive** | `bg-Error text-white` | `bg-Error darkened 8%` | `bg-Error darkened 15%` | `bg-Neutral-300 text-Neutral-600` | Spinner in white |

- **Sizing:** sm (32px height, 12px/14px padding), md (40px height, default), lg (48px height, used for hero/marketing CTAs only).
- **Rule:** only one Primary button visible per screen/section. Secondary or Ghost for everything else competing for attention.
- **Destructive actions** (delete, cancel subscription) always require a confirmation step (modal or inline "are you sure") — never a single-click destructive action.

## 11. Form System

| Input type | Notes |
|---|---|
| Text | Default. Label always above the field, never placeholder-only (placeholders disappear on focus and fail accessibility). |
| Email | Validate format on blur, not on every keystroke. |
| Password | Include show/hide toggle; show strength indicator only on signup, not login. |
| Number | Use `inputmode="numeric"`; show unit (e.g. "$", "kg") outside the input, not inside the value. |
| Textarea | Min 3 rows visible; show character count if there's a max length. |
| Select | Use native select for <10 options; custom dropdown only when search/multi-select is needed. |

**Validation states:**

| State | Visual treatment | Copy rule |
|---|---|---|
| Default | `border-Neutral-300` | — |
| Focus | `border-Primary` + 2px ring in Primary/20 | — |
| Valid (after interaction) | `border-Success`, small check icon | No message needed unless field is non-obvious (e.g. password strength) |
| Invalid | `border-Error`, error icon, error text below field | Specific and actionable — "Enter a valid email address" not "Invalid input." Never blame the user ("You forgot...") — state the requirement. |
| Disabled | `bg-Neutral-100 text-Neutral-600`, no pointer events | — |

- **Validate on blur for individual fields, validate all on submit** — never validate-as-you-type for anything beyond simple length/format hints (it punishes users mid-typing).
- **Error messages appear directly below the field they describe**, never only in a summary banner at the top (banner is a supplement, not a replacement).

## 12. Card System

- **Default card:** `bg-Neutral-0`, `border border-Neutral-300` OR `shadow-sm` (pick one elevation method per product, don't mix border+shadow on every card), `rounded-lg` (8px), padding `space-4` to `space-6`.
- **Interactive card** (clickable, e.g. list item): add hover state (`shadow-md` or `border-Primary/30`) and cursor pointer — if it's clickable, it must visibly say so on hover.
- **Card anatomy:** optional header (title + optional action/menu top-right) → body content → optional footer (meta info or actions, divided by a `border-t`).

## 13. Navigation System

| Pattern | When to use |
|---|---|
| **Top nav** | Marketing sites, simple apps with ≤5 top-level sections, mobile-first products |
| **Sidebar** | Apps/dashboards with >5 sections, nested navigation (sections with sub-items), desktop-primary usage (admin panels, internal tools, B2B SaaS) |
| **Tabs** | Switching between views of the *same* object/context (e.g. a record's "Overview / Activity / Settings") — never use tabs for unrelated top-level sections |

- **Sidebar default state:** expanded on desktop (≥1024px), collapsible to icon-only; auto-collapses to a drawer behind a hamburger on mobile.
- **Active state rule:** the current section is always visually distinct (Primary color text/icon + background tint) — never rely on bold-only, which fails users who can't perceive the weight difference.

## 14. Table System

- **Sorting:** clickable column header with a sort icon that appears on hover and stays visible (filled vs outline) once active; only one sort column active at a time unless multi-sort is an explicit product requirement.
- **Pagination:** for >25 rows, paginate (don't infinite-scroll admin/data tables — infinite scroll is for feeds, not data users need to scan/reference). Show row count ("1-25 of 340") and page controls.
- **Empty state (no data at all):** see Section 15 — icon + "No [objects] yet" + primary CTA to create the first one.
- **Empty state (filtered to zero results):** different from above — "No results match your filters" + a "Clear filters" action, never the same copy as true-empty.
- **Row actions:** kebab menu (⋮) for 3+ actions, inline icon buttons for ≤2 frequent actions (e.g. edit/delete).
- **Loading:** skeleton rows matching the real row height and column count — never a centered spinner replacing the whole table (it causes layout jump when data arrives).

## 15. Dashboard Components

- **Stat card (KPI tile):** label (Neutral-600, `text-sm`) → big number (`text-2xl`/`text-3xl`, Neutral-900) → delta indicator (▲/▼ + % in Success/Error color) → optional sparkline. Never show a number with no comparison context (a delta, a target, or a time period label).
- **Charts:** always label axes and units; use Primary color for the main series, Neutral-300 for gridlines, semantic colors only when the data itself is semantic (e.g. success/error breakdown). Show a "no data" state identical in spirit to table empty states — never an empty chart canvas with no explanation.
- **Filter bar:** pinned above the content it filters, shows active filter count as a badge, always includes a one-click "Clear all" when ≥1 filter is active.

## 16. Empty States

> Every list/table/dashboard needs one. Never ship a blank screen.

**Structure:** icon or small illustration → headline (what's missing, plainly) → one supporting sentence (why it matters or what happens next) → primary CTA.

| Context | Example copy |
|---|---|
| First-time, no data created yet | "No [projects] yet. Create your first one to start tracking [outcome]." + button "Create [project]" |
| Filtered to zero results | "No results match your filters." + button "Clear filters" |
| Search with zero results | "No matches for '[query]'. Try a different term or check your spelling." |
| Empty because of a dependency (e.g. no team members invited) | "Invite your team to start collaborating." + button "Invite teammate" |

## 17. Error States

- **Form-level errors:** see Section 11 — inline, specific, actionable.
- **Page/request-level errors:** icon + plain-language headline ("Something went wrong loading this page") + one retry action + (optional) a support/contact link if retry fails repeatedly. Never show a raw stack trace or error code to the end user as the *only* information — log it, show a human message, optionally show a reference ID for support.
- **Network/offline errors:** distinct from generic errors — "You're offline. Changes will sync when you reconnect" is more useful and less alarming than a generic failure message.
- **Never auto-retry destructive operations silently** — if a save/submit fails, the user must be told before any retry happens.

## 18. Loading States

| Use skeleton when... | Use spinner when... |
|---|---|
| Loading a known layout (table rows, card grid, profile page) — skeleton previews the shape of what's coming, reducing perceived wait | Loading time is short and layout is unknown/dynamic (e.g. a button's own loading state, a small async action) |
| The wait is likely >400ms and content has a predictable structure | The action is a discrete, single operation (submit, save, delete confirmation) rather than a page/section load |

- **Never show a loading indicator for waits under ~200ms** — it causes more perceived flicker than it prevents perceived delay.
- **Full-page loads:** skeleton matching the real layout. **Inline actions:** spinner inside the triggering button, button stays the same width.

## 19. Accessibility Guidelines

- **Contrast:** body text 4.5:1 minimum, large text 3:1 minimum (see Section 4.4) — check every text/background pair, not just the obvious ones (placeholder text and disabled states are commonly missed).
- **Focus states:** every interactive element gets a visible focus ring (`ring-2 ring-Primary/50` or equivalent) — never `outline: none` without a replacement. Focus order follows visual/logical order, not DOM order if they diverge.
- **Keyboard support:** every action reachable by mouse must be reachable by keyboard (Tab/Shift+Tab/Enter/Space/Escape). Modals trap focus and return it to the trigger element on close.
- **ARIA basics:** label icon-only buttons (`aria-label`), associate form labels with inputs (`<label for>` / `aria-labelledby`), announce dynamic content changes that aren't user-triggered (e.g. toast notifications) via `aria-live="polite"`.
- **Touch targets:** minimum 44x44px tappable area on mobile, even if the visible icon is smaller (pad the hit area).
- **Don't rely on color alone** to convey meaning — pair with text/icon (see Section 4.4).

## 20. Responsive Design Guidelines

- **Mobile-first:** design and build the smallest breakpoint first, then add complexity (more columns, sidebars, secondary content) as width increases — not the reverse.
- **Never just shrink a desktop layout** — re-flow content (sidebar → bottom nav or drawer, multi-column → stacked, data table → card list on mobile if columns >4).
- **Touch vs. pointer:** hover-only interactions (tooltips, hover menus) must have a tap-accessible equivalent on touch devices.

| Breakpoint | Min width | Key layout shift |
|---|---|---|
| Mobile | 0px | Single column, bottom nav or hamburger, stacked forms, tables become card lists |
| Tablet | 768px | 2-column where it makes sense, sidebar may become collapsible drawer |
| Desktop | 1024px | Full sidebar, multi-column dashboards, hover states become primary affordance |
| Wide | 1280px | Max content width caps out — don't stretch content edge-to-edge on large monitors |

---

**Next step:** Once principles, colors, type, and spacing are filled in, move to [`UI_COMPONENT_SPEC.md`](./UI_COMPONENT_SPEC.md) to spec individual components, then [`DESIGN_TO_AI_PROMPTS.md`](./DESIGN_TO_AI_PROMPTS.md) to generate them.
