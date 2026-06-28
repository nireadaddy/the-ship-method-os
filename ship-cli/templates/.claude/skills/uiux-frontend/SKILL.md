---
name: uiux-frontend
description: UI/UX design guidance for Next.js + Tailwind v4 + shadcn/ui projects. Invoke before building any screen. Fetches current trends, auto-selects the best one for the project, then applies layout, component, and copy guidance.
---

# UI/UX Frontend Skill

Design guidance for **Next.js + Tailwind CSS v4 + shadcn/ui** projects. Runs in 3 phases: (0) fetch current trends, (1) auto-select + declare, (2) implement.

---

## Phase 0 — Fetch current trends (every invocation, no skipping)

Before designing any screen, do a web search to get the freshest UI/UX trend signal:

```
search: "UI UX design trends 2025 site:nngroup.com OR site:smashingmagazine.com OR site:awwwards.com OR site:uxdesign.cc"
```

Scan the results for any trends that have risen or fallen since the base catalog below. Note any new entrant that appears in ≥ 2 sources. This keeps designs current — do not skip this step.

---

## Phase 1 — Auto-select the trend (do not ask the user)

Read `docs/PROJECT.md` for product type, audience, and tone. Cross-reference with the **Trend Catalog** below. Pick **one primary trend** and optionally one supporting micro-trend. Announce the choice in one sentence before writing any code:

> "Using **[Trend Name]** — suits [product type] for [audience reason]."

### Trend Catalog

#### 🎨 Visual & Tactile Aesthetics

**Tactile Maximalism (Squishy UI)**
Soft 3D shapes, inflated elements, playful depth, bold saturated colors, spring-like hover states.
- Best for: consumer apps, gaming, creative tools, young (18–30) audience
- Avoid: finance, healthcare, enterprise admin
- Tailwind implementation: `rounded-3xl shadow-2xl scale-[1.02] hover:scale-105 transition-transform duration-200`, bold `bg-[color]` fills, thick borders `border-4`

**Intentional Imperfection**
Hand-drawn strokes, organic shapes, slight rotation/misalignment, textured backgrounds, ink-style illustrations.
- Best for: creative agencies, cultural brands, portfolios, artisan products
- Avoid: SaaS dashboards, fintech, legal
- Tailwind implementation: `rotate-[-1deg]`, `skew-x-1`, SVG hand-drawn border overlays, `bg-[url('/texture.png')] bg-repeat opacity-10`

**Liquid Glass & Glassmorphism**
Frosted glass panels, translucent cards, blur backdrop, subtle borders on glass surface.
- Best for: premium apps, fintech, luxury SaaS, iOS-style products
- Avoid: heavy data tables, accessibility-critical flows (low contrast risk — add `backdrop-blur` + solid text)
- Tailwind implementation: `bg-white/10 backdrop-blur-md border border-white/20 shadow-lg`, ensure text contrast with `text-white drop-shadow-sm` or `text-gray-900` on light blur

**Retrofuturism**
Neon accents on dark base, grid/scanline overlays, monospace fonts mixed with modern sans, CRT glow effects.
- Best for: AI tools, dev products, tech startups, edgy consumer apps
- Avoid: healthcare, legal, conservative brands
- Tailwind implementation: `bg-gray-950 text-green-400`, `font-mono`, `shadow-[0_0_20px_rgba(74,222,128,0.5)]`, CSS `::before` scanline overlay

---

#### ⚙️ Function & Experience

**Spatial Design**
Elements appear to exist in 3D space — parallax layers, perspective transforms, depth through scale + shadow, immersive scrolling.
- Best for: product showcases, portfolio sites, hero sections, tech launches
- Avoid: CRUD admin panels, form-heavy apps
- Tailwind implementation: `perspective-1000` (custom CSS), `translate-z-[40px]` on hover via `transform-gpu`, `shadow-2xl` depth layers, scroll-driven animation with CSS `@keyframes`

**Calm Design & Strategic Minimalism**
Maximum whitespace, restrained palette (2–3 colors), no decorative elements, typography as the main visual element.
- Best for: healthcare, productivity, focus tools, wellness, legal SaaS
- Avoid: marketing pages that need energy, entertainment
- Tailwind implementation: `max-w-prose mx-auto`, `text-gray-500` for supporting text, `border-b border-gray-100` dividers, avoid shadows — use whitespace for separation

**Command Palettes & Unified Search**
Global `⌘K` search overlay that routes to any action, page, or record. Reduces nav depth, enables power-user flow.
- Best for: SaaS dashboards, dev tools, data products with many entities
- Avoid: simple forms, landing pages, consumer apps with < 10 routes
- Tailwind implementation: Use `cmdk` library + shadcn `Command` component, `fixed inset-0 bg-black/50 flex items-start justify-center pt-32`, trigger via `useEffect` on `⌘K`

**Bento Grids**
Asymmetric card grid where different-sized cells showcase features, metrics, or media — like a magazine layout.
- Best for: dashboards, feature showcases, portfolios, SaaS landing pages
- Avoid: long-form content, step-by-step flows
- Tailwind implementation: `grid grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]`, mix `col-span-2 row-span-2` for hero cells, shadcn `Card` in each cell

---

#### 🤖 Typography & AI

**Expressive Typography**
Large (100px+) hero type, variable font weights, type as graphic element, kinetic text on scroll, tight tracking on display sizes.
- Best for: landing pages, marketing sites, portfolios, brand-forward products
- Avoid: data-dense UIs, forms, admin panels
- Tailwind implementation: `text-7xl lg:text-9xl font-black tracking-tighter leading-none`, variable fonts via CSS `font-variation-settings`, `mix-blend-multiply` for type overlays

**Seamless AI Infrastructure**
Streaming text (typewriter), skeleton-to-real transitions, inline AI suggestions, confidence indicators, generative placeholders.
- Best for: AI SaaS, copilot tools, any product with AI-generated content
- Avoid: non-tech products, forms where instant response is expected
- Tailwind implementation: `animate-pulse` for streaming state, word-by-word reveal via JS interval, `border-l-2 border-primary pl-3` for AI response thread, `opacity-50` for low-confidence content

---

### Auto-selection decision matrix

| Project type | Primary trend | Supporting |
|---|---|---|
| AI / copilot SaaS | Seamless AI Infrastructure | Command Palettes |
| B2B dashboard / admin | Calm Design & Strategic Minimalism | Bento Grids |
| Consumer app (young) | Tactile Maximalism | Expressive Typography |
| Premium / luxury brand | Liquid Glass | Expressive Typography |
| Creative agency / portfolio | Intentional Imperfection | Spatial Design |
| Dev tool / CLI product | Retrofuturism | Command Palettes |
| Healthcare / wellness | Calm Design & Strategic Minimalism | — |
| Feature showcase landing page | Bento Grids | Expressive Typography |
| Tech startup landing | Spatial Design | Expressive Typography |
| Marketplace / e-commerce | Tactile Maximalism | Bento Grids |

---

## Phase 2 — Implement the screen

After announcing the trend:

1. **Update `docs/DESIGN_SYSTEM.md`** — fill in the `UI Trend` section (trend name, reason, implementation rules, scope) if not already done.
2. **Update `docs/DESIGN_SPEC.md`** — add a screen entry for the screen being built. Fill all fields before writing code. Mark `Status: in-progress`.
3. Build the screen.
4. After screen is done, update the DESIGN_SPEC entry: mark `Status: done`, tick off states (`✓`), fill in notes.

Then apply all sections below.

---

## A. Think user-first before touching code

Answer these before laying out any screen:
- Who is the user and what state are they in when they arrive?
- What is the ONE thing they must accomplish on this screen?
- Where do they come from, and where do they go next?
- What does "success" look like for them (not the business)?

If you can't answer these from `docs/HUMAN_FLOW.md` → reread it, don't guess.

---

## B. Layout patterns by screen type

### Landing page (public)
```
Hero → Value props (3 columns) → Social proof → CTA section → Footer
```
- Hero: full-width, headline + subheadline + primary button. Apply trend here most visibly.
- Value props: shadcn `Card` or Bento grid cells
- CTA: high-contrast button
- Mobile: single column, buttons full width

### Dashboard (member system)
```
Sidebar nav (md+) | Top bar | Main content area
```
- Sidebar: 240px, `bg-sidebar` token, active state via `aria-current="page"`
- Top bar: breadcrumb left, avatar/action right + optional `⌘K` trigger
- Content: `max-w-screen-xl px-6 py-8`. Bento grid for KPI cards, shadcn `Table` for lists

### Login / auth screen
```
Centered card (max-w-sm) — logo → heading → form → submit → helper link
```
- shadcn `Card` + `CardContent`. Apply trend subtly (background, not form itself).
- Form: `Label` + `Input` stacked, `Button` full-width

### Form / settings screen
```
Page heading → section groups → save action at bottom
```
- Group fields with section cards. Inline errors via shadcn `FormMessage`.
- Save button: primary, right-aligned

### List / table screen
```
Toolbar (search + filter + action) → Table or card grid → Pagination
```
- shadcn `Table` for structured data, card grid for visual items
- Empty state: centered icon + message + CTA
- Loading: shadcn `Skeleton` rows

---

## C. Typography rules

### Thai fonts (Prompt / IBM Plex Thai / Noto Sans Thai / Anuphan)
Single-font stack, `font-sans` everywhere.

| Element | Class |
|---------|-------|
| Page title h1 | `text-3xl font-bold` |
| Section heading h2 | `text-xl font-semibold` |
| Body | `text-base font-normal leading-relaxed` |
| Caption | `text-sm text-muted-foreground` |
| Button | `text-sm font-medium` |

> Thai script needs `leading-relaxed` or higher. Never go below `text-base` on mobile.

### English — Modern (Inter / Geist)
| Element | Class |
|---------|-------|
| Page title h1 | `text-3xl font-bold tracking-tight` |
| Section heading h2 | `text-xl font-semibold` |
| Body | `text-base font-normal leading-relaxed` |
| Caption | `text-sm text-muted-foreground` |
| Button | `text-sm font-medium` |

### English — Luxury (Playfair Display + DM Sans)
| Element | Class |
|---------|-------|
| Page title h1 | `font-serif text-3xl font-bold tracking-wide` |
| Section heading h2 | `font-serif text-xl font-semibold tracking-wide` |
| Body | `text-base font-normal leading-relaxed` |
| Caption | `text-sm text-muted-foreground` |
| Button | `text-sm font-medium tracking-wide uppercase` |

For **Expressive Typography** trend: override h1 to `text-7xl lg:text-9xl font-black tracking-tighter leading-none` on hero sections only.

---

## D. Spacing & sizing

- Page padding: `px-4 sm:px-6 lg:px-8`
- Section gap: `space-y-8` or `gap-8`
- Card padding: `p-6`
- Form fields: `space-y-4`
- Min touch target: `h-11` (44px)
- Min body text: `text-base` on mobile

---

## E. shadcn/ui component map

| Need | Component |
|------|-----------|
| Navigation | `NavigationMenu` or `<nav>` + Link |
| Data entry | `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup` |
| Form | `Form` (react-hook-form + zod) |
| Actions | `Button` (default / outline / ghost / destructive) |
| Feedback | `Toast`, `Alert` |
| Modals | `Dialog`, `AlertDialog` |
| Data display | `Table`, `Card`, `Badge` |
| Loading | `Skeleton` |
| Sidebar (mobile) | `Sheet` |
| Global search | `Command` (cmdk) |
| Dropdowns | `DropdownMenu` |

Do not build custom versions of anything shadcn covers.

**Library rule — always check before installing:**

| Need | Use this — NOT a new library |
|------|------------------------------|
| HTTP requests | Native `fetch` |
| Date formatting | `Intl.DateTimeFormat` |
| Array/object utilities | Native JS (`.map`, `.filter`, `.reduce`) |
| Icons | `lucide-react` (already in shadcn) |
| Animation | CSS `transition` + Tailwind classes first; CSS `@keyframes` for complex |
| Forms + validation | `react-hook-form` + `zod` (already in shadcn `Form`) |
| Global search / cmd palette | shadcn `Command` (uses cmdk internally — do not install cmdk separately) |
| Fonts | `next/font/google` |

Only install a new library if no existing solution covers the need. Mention it explicitly when you do.

---

## F. UI copy rules

### Thai
- ปุ่ม: กริยาสั้น — "บันทึก", "เข้าสู่ระบบ", "ดูเพิ่มเติม"
- หัวข้อ: ≤ 10 คำ
- Placeholder: ตัวอย่างจริง — "กรอกชื่อ-นามสกุล" ไม่ใช่ "กรอกข้อมูล"
- Error: บอกปัญหาและวิธีแก้ — "กรุณากรอกอีเมลให้ถูกต้อง"
- Empty: สั่งทำได้ทันที — "ยังไม่มีรายการ — กด 'เพิ่มรายการ' เพื่อเริ่มต้น"

### English
- Buttons: verb-first — "Save changes", "Sign in", "View all"
- Headings: ≤ 8 words, sentence case
- Placeholders: real example — "Enter your full name"
- Error: what + fix — "Email already in use. Try signing in instead."
- Empty: actionable — "No items yet — click 'Add item' to get started"

---

## G. States (all 4 required on every screen)

| State | Implementation |
|-------|----------------|
| Loading | `Skeleton` matching real content shape |
| Empty | Centered icon + message + primary CTA |
| Error | `Alert` destructive + retry action |
| Success | `Toast` or inline confirmation |

---

## H. Accessibility minimum

- Keyboard-navigable (`Tab` order = visual order)
- Icon-only buttons have `aria-label`
- Every input has a visible `<Label>`
- Color contrast ≥ 4.5:1 (shadcn defaults pass; glassmorphism — verify manually)
- Images have `alt` (or `alt=""` if decorative)

---

## I. Revenue link check (before closing any screen)

| Screen | Revenue connection |
|--------|--------------------|
| Landing page | Conversion — CTA → sign-up / purchase |
| Login / sign-up | Activation — user reaches product |
| Dashboard | Retention — user sees value, returns |
| Settings / billing | Revenue — upgrade path, churn prevention |
| Empty state | Activation — first action drives retention |

If a screen has no revenue link, flag it before spending time on it.
