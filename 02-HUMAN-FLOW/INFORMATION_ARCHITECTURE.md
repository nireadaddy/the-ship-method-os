# INFORMATION_ARCHITECTURE.md

**Phase:** H — Human Flow
**Purpose:** The structural skeleton of the product — every screen, where it lives in the hierarchy, how a user navigates to it, and what its URL looks like. This is the file an AI coding tool should read before generating routes, so it doesn't invent its own (inconsistent) structure.

> If a screen exists in `HUMAN_FLOW.md` but isn't placed here, it has no address yet — the AI will guess, and guesses produce inconsistent route naming across a codebase.

---

## 1. Sitemap Template (Hierarchy Tree Notation)

> Use indentation to show parent/child relationship. Mark access level inline so the AI build prompt knows what gating logic to generate.

```
/ (marketing site — public)
├── /pricing (public)
├── /login (public)
├── /signup (public)
└── /app (authenticated — requires login)
    ├── /app/dashboard (default landing screen post-login)
    ├── /app/[primary-object-plural] (e.g., projects, leads, listings)
    │   ├── /app/[primary-object-plural]/new
    │   └── /app/[primary-object-plural]/[id]
    │       ├── /app/[primary-object-plural]/[id]/edit
    │       └── /app/[primary-object-plural]/[id]/[sub-resource]
    ├── /app/settings
    │   ├── /app/settings/profile
    │   ├── /app/settings/billing (admin-role only)
    │   └── /app/settings/team (admin-role only)
    └── /app/reports (gated — requires minimum data threshold or paid tier)
```

- **Fill in your own hierarchy below, following the same nesting pattern:**

```
/
├── [describe X]
└── /app
    ├── [describe X]
    ├── [describe X]
    └── [describe X]
```

---

## 2. Navigation Pattern Decision Guide

> Pick the pattern that matches your screen count and hierarchy depth — don't default to sidebar just because it "looks professional." A 4-screen tool with a sidebar looks over-engineered; a 20-screen dashboard with only a top nav becomes unusable.

| Pattern | Use when... | Avoid when... | Examples |
|---|---|---|---|
| **Top nav (horizontal)** | 3-6 top-level destinations, shallow hierarchy (1-2 levels deep), marketing sites, simple tools | You have more than ~6 top-level items or deep nested sub-navigation | Marketing site, simple SaaS with few core objects |
| **Sidebar (vertical)** | Dashboard-style products with 5+ top-level sections, multi-level nesting, desktop-first usage, frequent context-switching between sections | Mobile-first product (sidebar competes with limited width), very few sections (overkill) | Internal tools, admin panels, B2B SaaS, CRMs |
| **Tab bar (bottom, mobile)** | Mobile app or mobile-first web app, 3-5 primary destinations, flat hierarchy | Desktop-first product, more than 5 destinations (forces a cluttered "more" tab) | Mobile apps, PWAs |
| **Command palette (Cmd+K)** | Power-user product, many actions/destinations, users who value keyboard-driven speed | New/non-technical users as the *only* nav method (must supplement, not replace, visible nav) | Dev tools, internal tools, supplement to sidebar |
| **Breadcrumbs** | Deep hierarchy (3+ levels), users need to understand "where am I" | Flat 1-2 level hierarchy (unnecessary) | Any deeply nested object structure (e.g., Project → Task → Subtask) |

- **Pattern chosen for this product:** [name it]
- **Why it fits this hierarchy and persona:** [describe X]
- **Secondary pattern used alongside it (if any):** [e.g., "sidebar + breadcrumbs for deep nesting"]

---

## 3. URL / Route Naming Conventions

> Consistency here matters more than any individual choice — pick rules and apply them everywhere, especially since AI tools will pattern-match off your first few routes.

| Rule | Convention | Example |
|---|---|---|
| Casing | lowercase, kebab-case for multi-word segments | `/app/team-members`, not `/app/TeamMembers` |
| Pluralization | Plural for collection/list views, singular + ID for detail views | `/app/projects` (list) → `/app/projects/123` (detail) |
| Nesting depth | Max 3-4 levels deep before flattening with query params | `/app/projects/123/tasks/45`, not 6 levels deep |
| Action routes | Verb suffix for non-CRUD actions | `/app/projects/123/duplicate`, `/app/invoices/55/send` |
| New/create | `/new` suffix on the collection route | `/app/projects/new` |
| Edit | `/edit` suffix on the detail route, or inline modal (no route change) — pick one and stay consistent | `/app/projects/123/edit` |
| IDs in URLs | Use slugs for public/shareable pages, opaque IDs for internal/private pages | `/blog/how-to-launch` (slug) vs. `/app/projects/a1b2c3` (ID) |
| Auth-gated prefix | Single consistent prefix for all authenticated routes | `/app/*` for everything requiring login |
| Query params vs. path segments | Path segments for required/hierarchical state, query params for optional filters/sort | `/app/projects?status=active&sort=recent` |

- **Your chosen prefix for authenticated routes:** [e.g., `/app`, `/dashboard`, `/console`]
- **Your chosen primary object name(s) and their plural form:** [describe X]
- **Any legacy/redirect routes to maintain:** [describe X]

---

## 4. Worked Example: Dashboard-Style Product (Internal Tool / CRM)

### Sitemap

```
/ (public marketing site)
├── /pricing
├── /login
└── /app (authenticated)
    ├── /app/dashboard                      → default post-login screen, KPI summary
    ├── /app/leads                          → collection view (table/board toggle)
    │   ├── /app/leads/new
    │   └── /app/leads/[id]
    │       ├── /app/leads/[id]/edit
    │       └── /app/leads/[id]/activity     → activity log sub-resource
    ├── /app/reports
    │   └── /app/reports/[report-slug]      → e.g., /app/reports/pipeline-velocity
    ├── /app/settings
    │   ├── /app/settings/profile
    │   ├── /app/settings/billing            → admin-role only
    │   ├── /app/settings/team               → admin-role only
    │   │   └── /app/settings/team/invite
    │   └── /app/settings/integrations
    └── /app/search                          → global search results (?q=)
```

### Navigation Pattern Used

| Element | Pattern | Why |
|---|---|---|
| Primary navigation | Left sidebar | 5 top-level sections (Dashboard, Leads, Reports, Settings, +Search icon), desktop-first usage pattern, daily-return tool |
| Within Leads | Tabs (List view / Board view) | Two equally common ways to view the same collection, no need for separate routes |
| Lead detail → Activity | Breadcrumb (`Leads / Acme Corp / Activity`) | 3 levels deep, user needs to know how to get back |
| Quick actions | Command palette (Cmd+K) | Power users (daily-active sales reps) benefit from keyboard-driven navigation to skip clicking through sidebar |
| Mobile | Bottom tab bar (Dashboard, Leads, Search, Settings) collapses sidebar items to 4 | Sidebar doesn't translate to mobile width; tab bar covers the 4 most-used destinations |

### Route Naming Applied

| Screen | Route |
|---|---|
| Lead list | `/app/leads` |
| New lead | `/app/leads/new` |
| Lead detail | `/app/leads/a1b2c3` |
| Edit lead | `/app/leads/a1b2c3/edit` |
| Lead activity log | `/app/leads/a1b2c3/activity` |
| Pipeline velocity report | `/app/reports/pipeline-velocity` |
| Team invite | `/app/settings/team/invite` |
| Filtered lead view | `/app/leads?status=qualified&sort=newest` |

---

## 5. IA Checklist Before Handing to Build Prompts

- [ ] Every screen in `HUMAN_FLOW.md` Core Screens table has a route here
- [ ] Every route has a defined access level (public / authenticated / role-gated)
- [ ] Navigation pattern is chosen and justified, not defaulted
- [ ] Route naming is consistent (casing, pluralization, nesting depth)
- [ ] Mobile navigation behavior is defined, not assumed to "just collapse"
- [ ] Empty/loading/error states (from `HUMAN_FLOW.md`) are mapped to specific routes, not left implicit

---

**Next step:** With structure and human flow fully mapped, move to `03-INSTRUCTION/` to translate this into AI build prompts — each prompt should reference the exact route, screen, and flow defined in this file.
