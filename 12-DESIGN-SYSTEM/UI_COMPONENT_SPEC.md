# UI_COMPONENT_SPEC

**Phase:** Design System
**Purpose:** A repeatable template for specifying any UI component precisely enough that an AI tool can build it once, correctly, and consistently with every other component — instead of redesigning buttons three different ways across three different prompts. Three fully worked examples (Button, Form Input, Data Table) are included as references; copy the template for every new component listed in `DESIGN_SYSTEM.md` Section 9's checklist.

> Fill every section before handing a component to AI. A spec with blank Variants/States sections produces a component AI has to guess at — and guesses don't match the rest of your product.

---

## 0. Template (copy this block per component)

### Component Name
[Name — e.g. "Badge"]

### Purpose
[One sentence: what problem does this component solve for the user?]

### Usage
- **Use when:** [specific scenarios]
- **Don't use when:** [scenarios where a different component is correct — naming the alternative]

### Variants
| Variant | Visual difference | When to use |
|---|---|---|
| | | |

### States
| State | Trigger | Visual treatment |
|---|---|---|
| Default | | |
| Hover | | |
| Active/Pressed | | |
| Focus | | |
| Disabled | | |
| Loading (if applicable) | | |
| Error (if applicable) | | |

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| | | | |

### UX Rules
- [Behavioral rule 1]
- [Behavioral rule 2]

### Accessibility Rules
- [Keyboard behavior]
- [ARIA attributes required]
- [Contrast/focus requirement]

### AI Build Instructions
```
[Ready-to-paste prompt — see worked examples below for the expected shape]
```

---

## 1. Worked Example: Button

### Component Name
Button

### Purpose
The primary mechanism for triggering an action (submit, navigate, confirm, delete). Must instantly communicate hierarchy of importance relative to other actions on screen.

### Usage
- **Use when:** triggering a discrete action (submit form, open modal, navigate, confirm/cancel).
- **Don't use when:** the action is navigational between pages within the same flow with no decision being made — consider a Link/Tab instead. Don't use a Button styled as a link for actual navigation — use an anchor for semantics and SEO.

### Variants
| Variant | Visual difference | When to use |
|---|---|---|
| Primary | Solid `Primary` fill, white text | The single main action on the screen/section — max one visible at a time |
| Secondary | Outlined `Primary` border, `Primary` text, transparent fill | Alternative action alongside a Primary (e.g. "Cancel" next to "Save") |
| Ghost | No border/fill, text-only, `Neutral-900` | Low-emphasis actions (e.g. "Skip", toolbar icon actions) |
| Destructive | Solid `Error` fill, white text | Irreversible/dangerous actions (delete, remove, cancel subscription) — always paired with a confirmation step |

### States
| State | Trigger | Visual treatment |
|---|---|---|
| Default | Rest | Per variant, see `DESIGN_SYSTEM.md` Section 10 |
| Hover | Pointer over (desktop only) | Fill darkens 8% (solid variants) or background tint appears (Ghost/Secondary) |
| Active/Pressed | Mouse down / touch down | Fill darkens 15%, `scale(0.98)` transform, transition 100ms |
| Focus | Keyboard tab to element | `ring-2 ring-Primary/50`, ring visible even if mouse-clicked (don't suppress focus ring on click) |
| Disabled | `disabled` prop true | `bg-Neutral-300 text-Neutral-600`, `cursor: not-allowed`, no hover/active treatment, `aria-disabled="true"` |
| Loading | `isLoading` prop true | Spinner replaces icon (or sits left of label), label may stay or be replaced by "Saving…" depending on context, button width locked to its loading-state width to prevent layout shift, button non-interactive during this state |

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "destructive"` | `"primary"` | Visual style, see Variants table |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height: sm=32px, md=40px, lg=48px |
| `disabled` | `boolean` | `false` | Disables interaction and applies disabled styling |
| `isLoading` | `boolean` | `false` | Shows spinner, disables interaction |
| `icon` | `ReactNode` | `undefined` | Optional leading icon |
| `iconPosition` | `"left" \| "right"` | `"left"` | Icon placement relative to label |
| `fullWidth` | `boolean` | `false` | Stretches to 100% of container width (mobile forms commonly need this) |
| `onClick` | `() => void` | — | Click handler |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Native HTML button type |

### UX Rules
- Only one Primary button visible per screen or logical section at a time.
- Destructive variant always requires a confirming second step (modal "Are you sure?" or inline confirm) before the destructive action actually fires.
- Button label is a verb phrase ("Save changes", "Delete project"), never a vague noun ("Submit", "OK") when a more specific label is available.
- Loading state locks button width to prevent the button (and surrounding layout) from jumping when the spinner appears/disappears.

### Accessibility Rules
- Native `<button>` element, never a styled `<div>` with an onClick — required for keyboard/screen-reader support out of the box.
- Icon-only buttons (no visible label) require `aria-label` describing the action.
- Disabled buttons use the native `disabled` attribute (removes from tab order correctly) plus `aria-disabled="true"`.
- Focus ring must remain visible on keyboard focus; minimum 3:1 contrast against adjacent background.
- Minimum 44x44px tap target on touch devices even at `size="sm"` (pad hit area beyond visible bounds if needed).

### AI Build Instructions
```
Build a Button component in [React + TypeScript + Tailwind — specify your stack] matching this spec:

Variants: primary, secondary, ghost, destructive — [paste hex values from DESIGN_SYSTEM.md Section 4 and 10]
Sizes: sm (32px height), md (40px height, default), lg (48px height)
States required: default, hover, active/pressed, focus (visible keyboard ring), disabled, loading (spinner replaces/accompanies label, button width locked during loading)

Props: variant, size, disabled, isLoading, icon (optional ReactNode), iconPosition ("left"|"right"), fullWidth (boolean), onClick, type ("button"|"submit"|"reset")

Requirements:
- Use a native <button> element
- Disabled state uses the native `disabled` attribute, not just a CSS class
- Icon-only usage must support an aria-label prop
- Only one focus ring style across all variants, always visible on keyboard focus, never suppressed via outline:none without a replacement
- Loading state must not change button width vs. its loaded state

Output the full component code plus one usage example per variant.
```

---

## 2. Worked Example: Form Input

### Component Name
Text Input (single-line)

### Purpose
Captures a single line of user-entered text (name, email, search query, etc.) with clear labeling and validation feedback so users always know what's expected and what went wrong.

### Usage
- **Use when:** capturing a single short value (text, email, password, number, URL).
- **Don't use when:** capturing multi-line content (use Textarea) or selecting from a fixed set of options (use Select/Radio).

### Variants
| Variant | Visual difference | When to use |
|---|---|---|
| Text | Standard input | Default text capture |
| Email | Same visual, `type="email"`, email icon optional | Email fields — enables native mobile keyboard + basic browser validation |
| Password | Adds show/hide toggle icon | Password fields |
| Search | Rounded pill shape optional, search icon left, clear (×) icon right when non-empty | Search/filter bars |

### States
| State | Trigger | Visual treatment |
|---|---|---|
| Default | Rest, empty or filled | `border-Neutral-300`, label above in `Neutral-900` |
| Focus | Click/tab into field | `border-Primary` + `ring-2 ring-Primary/20` |
| Valid | Field passes validation after blur/submit (optional to show) | `border-Success`, small check icon right-aligned |
| Invalid | Field fails validation after blur/submit | `border-Error`, error icon, error message below field in `Error` color |
| Disabled | `disabled` prop true | `bg-Neutral-100 text-Neutral-600`, no pointer events |
| Read-only | `readOnly` prop true | `bg-Neutral-100`, normal text color, no border-focus styling on click |

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Always visible above the field (never placeholder-only) |
| `type` | `"text" \| "email" \| "password" \| "number" \| "search" \| "url"` | `"text"` | Native input type |
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string) => void` | — | Change handler |
| `placeholder` | `string` | `undefined` | Supplementary hint only — never the only label |
| `error` | `string \| undefined` | `undefined` | Error message; presence triggers invalid styling |
| `helperText` | `string \| undefined` | `undefined` | Non-error supporting text shown below field when no error present |
| `disabled` | `boolean` | `false` | Disables input |
| `required` | `boolean` | `false` | Adds required indicator next to label and `required` attribute |
| `maxLength` | `number` | `undefined` | Enforces and optionally displays character count |

### UX Rules
- Label always rendered above the field, persistently visible — never rely on placeholder text alone as the label (it disappears on input and fails accessibility).
- Validate format-sensitive fields (email, etc.) on blur, not on every keystroke — keystroke-level validation interrupts typing and feels punitive.
- Validate all required fields on submit attempt, surfacing every error at once (not one at a time).
- Error copy is specific and actionable ("Enter a valid email address") — never generic ("Invalid input") and never blame-phrased ("You forgot to...").
- Error message appears directly below its field — a top-of-form error summary is a supplement, never a replacement.

### Accessibility Rules
- `<label>` is programmatically associated with the input via `htmlFor`/`id` (or `aria-labelledby`) — not just visually adjacent.
- On error, input gets `aria-invalid="true"` and `aria-describedby` pointing to the error message's id, so screen readers announce it.
- Error messages are announced via `aria-live="polite"` if they appear asynchronously (e.g. after an async availability check).
- Password show/hide toggle button has `aria-label="Show password"`/`"Hide password"` that updates with state.

### AI Build Instructions
```
Build a TextInput component in [React + TypeScript + Tailwind — specify your stack] matching this spec:

Variants: text, email, password (with show/hide toggle), search (with clear button when non-empty)
States: default, focus (border + ring per DESIGN_SYSTEM.md Section 11), valid (optional success border+icon), invalid (error border+icon+message below field), disabled, read-only

Props: label (string, always rendered, not placeholder), type, value, onChange, placeholder (optional, supplementary only), error (string|undefined — drives invalid state), helperText (shown when no error), disabled, required, maxLength

Requirements:
- <label> must use htmlFor/id association with the input
- On error: set aria-invalid="true" and aria-describedby referencing the error message element's id
- Validate-on-blur pattern: parent owns validation logic, this component just renders the error prop it's given
- Password variant includes an accessible show/hide toggle with aria-label that updates with state
- Search variant shows a clear (×) button only when value is non-empty, clearing onChange("") on click

Output the full component code plus one usage example showing the invalid/error state.
```

---

## 3. Worked Example: Data Table

### Component Name
Data Table

### Purpose
Displays a list of structured records (rows) with sortable columns, pagination, and row-level actions — the default way users scan, find, and act on multiple records of the same type.

### Usage
- **Use when:** displaying ≥2 records with shared structured fields that users need to scan, sort, filter, or compare.
- **Don't use when:** displaying a single record's detail (use a detail view/card) or an unstructured feed (use a list/feed component without column semantics).

### Variants
| Variant | Visual difference | When to use |
|---|---|---|
| Standard | Full table with header row, fixed columns | Desktop, ≥4 columns of data |
| Compact | Reduced row height/padding | Dense admin views where scan speed > breathing room |
| Card-list (responsive fallback) | Each row becomes a stacked card with label:value pairs | Mobile breakpoint — see `DESIGN_SYSTEM.md` Section 20 |

### States
| State | Trigger | Visual treatment |
|---|---|---|
| Default (populated) | Data loaded, ≥1 row | Standard rows, alternating or flat background, header row sticky on scroll for long tables |
| Loading | Initial fetch or refetch in progress | Skeleton rows matching real row height/column count — never a centered spinner over the whole table |
| Empty (no data ever created) | Zero records exist, no filters applied | Icon + "No [records] yet" + primary CTA to create first one (full row/table-height treatment, not a tiny inline message) |
| Empty (filtered to zero) | Filters/search applied, zero matches | "No results match your filters/search" + "Clear filters" action — visually distinct copy from true-empty |
| Error | Fetch failed | Inline error banner above table area + retry button, previous data (if any) stays visible if this is a refetch rather than initial load |
| Row hover | Pointer over row (if rows are interactive) | Background tint `Neutral-100`, cursor pointer if row click navigates somewhere |

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `Array<{ key: string; label: string; sortable?: boolean; align?: "left"\|"right"\|"center" }>` | — | Column definitions |
| `data` | `Array<Record<string, unknown>>` | `[]` | Row data |
| `isLoading` | `boolean` | `false` | Shows skeleton state |
| `sortBy` | `string \| undefined` | `undefined` | Currently active sort column key |
| `sortDirection` | `"asc" \| "desc"` | `"asc"` | Current sort direction |
| `onSortChange` | `(key: string, direction: "asc"\|"desc") => void` | — | Fired when a sortable header is clicked |
| `page` | `number` | `1` | Current page (1-indexed) |
| `pageSize` | `number` | `25` | Rows per page |
| `totalCount` | `number` | — | Total rows across all pages, for "X-Y of Z" display |
| `onPageChange` | `(page: number) => void` | — | Pagination handler |
| `rowActions` | `(row) => ReactNode` | `undefined` | Renders action buttons/kebab menu per row |
| `onRowClick` | `(row) => void` | `undefined` | Optional row-click handler (makes rows interactive) |
| `emptyState` | `{ icon, title, description, ctaLabel, onCtaClick }` | — | True-empty state config |

### UX Rules
- Paginate rather than infinite-scroll for data the user needs to scan/reference systematically (admin lists, records) — infinite scroll is for feeds, not for "find row 340."
- Only one column actively sorted at a time unless multi-column sort is an explicit, stated requirement.
- True-empty and filtered-empty states use different copy — conflating them tells users incorrectly that they have zero data when they actually just have an overly narrow filter.
- Row actions: inline icon buttons for ≤2 frequent actions, a kebab (⋮) menu for 3+ actions — don't let the action column visually overpower the data columns.
- On mobile, collapse to a card-list pattern rather than horizontally scrolling a cramped table.

### Accessibility Rules
- Use semantic `<table>`, `<thead>`, `<tbody>`, `<th scope="col">` — not divs styled to look like a table.
- Sortable column headers are buttons (or have `role="button"` + keyboard handlers) with `aria-sort="ascending"|"descending"|"none"` reflecting current state.
- Pagination controls are real buttons with `aria-label` (e.g. "Go to next page") and a disabled state on first/last page boundaries.
- Loading skeleton rows are marked `aria-hidden="true"` with a separate `aria-live="polite"` announcement (e.g. "Loading [records]…") so screen reader users aren't read a wall of empty skeleton cells.

### AI Build Instructions
```
Build a DataTable component in [React + TypeScript + Tailwind — specify your stack] matching this spec:

Columns are configurable: key, label, sortable flag, alignment.
States required: loading (skeleton rows matching real row/column dimensions), empty-true (icon + headline + CTA, full-height treatment), empty-filtered (different copy: "No results match your filters" + Clear filters action), error (inline banner + retry, preserves existing data on refetch failure), populated (default).

Features:
- Client-controlled sorting: clicking a sortable header calls onSortChange(key, direction); only one active sort column at a time
- Pagination: page, pageSize, totalCount props drive a "X-Y of Z" label and prev/next controls; disable prev on page 1 and next on last page
- Row actions slot: accepts a renderRowActions(row) function, render as inline icons if ≤2 actions, kebab menu if more
- Optional onRowClick making rows interactive with hover state and cursor pointer

Requirements:
- Use semantic table/thead/tbody/th markup, not div-based fake tables
- Sortable headers need aria-sort reflecting current state and must be operable via keyboard (Enter/Space)
- Pagination buttons need aria-label and correctly disable at boundaries
- On viewport <768px, render the responsive card-list fallback per DESIGN_SYSTEM.md Section 20 instead of a horizontally-scrolling table

Output the full component code, the column/data type definitions, and one usage example with mock data showing the empty-true state and one showing the populated+sorted state.
```

---

**Next step:** With Button, Form Input, and Data Table specs as the reference pattern, copy the Section 0 template for every remaining item in `DESIGN_SYSTEM.md` Section 9's checklist, then generate components using [`DESIGN_TO_AI_PROMPTS.md`](./DESIGN_TO_AI_PROMPTS.md).
