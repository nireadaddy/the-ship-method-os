# AI_BUILD_SPEC.md

**Phase:** I — Instruction
**Purpose:** The single document you hand to an AI builder (Claude, ChatGPT, Cursor, Windsurf, v0, Replit, Lovable, Bolt) before it generates a single line of code. It translates `01-STRUCTURE/PROJECT.md` (the *why*) and `02-HUMAN-FLOW/HUMAN_FLOW.md` (the *flow*) into something literal and buildable. If a requirement isn't in this file, the AI will guess — and guesses are how rebuilds happen.

> Fill every bracket. Each section below has a short worked example (CRM "follow-up reminder" feature) so you can see the expected level of specificity before you write your own.

---

## 0. Context

> Do not re-explain the product from scratch. Point back to the source files so the AI builder reads them first.

- **Source of truth — Product:** [`01-STRUCTURE/PROJECT.md`](../01-STRUCTURE/PROJECT.md) — paste relevant sections (Vision, Target Audience, MVP Scope) into the AI tool before this spec.
- **Source of truth — Flow:** [`02-HUMAN-FLOW/HUMAN_FLOW.md`](../02-HUMAN-FLOW/HUMAN_FLOW.md) — paste the relevant user journey / screen flow before this spec.
- **This spec covers:** [feature name / module / full MVP — be specific, e.g. "Lead capture + follow-up reminder module"]
- **Spec version:** [v1.0]
- **Last updated:** [YYYY-MM-DD]
- **Owner:** [your name / role]

**Worked example:**
```
This spec covers: "Follow-Up Reminder" module for a solo-consultant CRM.
Source: PROJECT.md MVP Scope item #2 ("never let a lead go cold").
Source: HUMAN_FLOW.md Flow 3 ("Lead detail screen → set reminder → notification").
```

---

## 1. Product Summary

*Two to four sentences. What is this build, in plain language, assuming the AI has never seen the product before — even though you pasted the context above. This re-anchors it.*

```
[Product Name] is a [type of app] for [audience]. This build adds/creates
[feature], which lets the user [action] so that [outcome]. It must integrate
with [existing module/data, if any] and follow the [design system / stack]
already in use.
```

**Worked example:**
```
ConsultCRM is a lightweight CRM for solo consultants. This build adds a
Follow-Up Reminder module, which lets a user set a date+time reminder on any
lead so that no lead goes more than 7 days without contact. It must integrate
with the existing Leads table and send reminders via email and in-app toast.
```

---

## 2. Functional Requirements

> Every row must be testable. If you can't write acceptance criteria, the requirement is too vague to build.

| ID | Requirement | Priority (Must/Should/Could) | Acceptance Criteria |
|---|---|---|---|
| FR-01 | [requirement] | [Must] | [Given/When/Then or bullet conditions] |
| FR-02 | | | |
| FR-03 | | | |

**Worked example:**

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-01 | User can set a reminder on a lead with a date, time, and optional note | Must | Given a lead detail page, when user clicks "Set Reminder" and picks a future date/time, then a reminder record is saved and visible on the lead card within 1 second |
| FR-02 | User receives a notification when a reminder is due | Must | Given a reminder is due (server time ≥ reminder time), when the due time passes, then an email is sent within 5 minutes AND an in-app badge appears on next login |
| FR-03 | User can snooze a reminder by 1/3/7 days | Should | Given a due/overdue reminder, when user clicks "Snooze 3 days", then reminder.due_at updates to now+3d and notification status resets to "pending" |

---

## 3. Non-Functional Requirements

| Category | Target | Notes |
|---|---|---|
| Performance | [e.g. p95 page load < 2s, API response < 300ms] | [specify which pages/endpoints] |
| Security | [e.g. all data scoped per-tenant via RLS; passwords hashed with bcrypt/argon2; no PII in logs] | |
| Accessibility | [e.g. WCAG 2.1 AA; keyboard navigable; color contrast ≥ 4.5:1] | |
| Scalability | [e.g. must support 10k orgs / 1M rows in leads table without query degradation] | |
| Availability | [e.g. 99.5% uptime target for MVP] | |
| Data retention / privacy | [e.g. GDPR-style delete-on-request within 30 days] | |
| Browser/device support | [e.g. latest 2 versions Chrome/Safari/Firefox, mobile-responsive down to 360px] | |

**Worked example:**

| Category | Target | Notes |
|---|---|---|
| Performance | API response < 300ms p95 for reminder CRUD | Reminder list query must use an index on `due_at` |
| Security | Row-level security: a user can only read/write reminders on leads in their own org | Enforced at DB layer, not just app layer |
| Accessibility | WCAG 2.1 AA on the "Set Reminder" modal | Date picker must be keyboard operable |
| Scalability | Support 50k reminders per org without list view slowdown | Paginate at 50/page |

---

## 4. Technical Requirements

> Stack choices + the *why*, not just the *what*. AI builders make better decisions when they know your constraints.

| Layer | Choice | Why |
|---|---|---|
| Frontend | [e.g. Next.js 14 App Router + Tailwind + shadcn/ui] | [reason: matches existing codebase / fast to ship / team familiarity] |
| Backend | [e.g. Next.js API routes / Node Express / Supabase Edge Functions] | |
| Database | [e.g. PostgreSQL via Supabase] | |
| Auth | [e.g. Supabase Auth / Clerk] | |
| Hosting | [e.g. Vercel] | |
| Other services | [e.g. Resend for email, Stripe for billing] | |

**Worked example:**

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14 App Router + Tailwind + shadcn/ui | Already used elsewhere in ConsultCRM; reuse component library |
| Backend | Next.js Route Handlers | No need for a separate service at this scale |
| Database | PostgreSQL via Supabase | Already hosting Leads table there |
| Auth | Supabase Auth (existing) | Reminder must inherit existing org-scoped RLS |
| Other services | Resend (email), Supabase Cron (due-reminder check) | Cheapest reliable option for low email volume |

---

## 5. Database Requirements

- **Entities involved:** [list new and existing tables this feature touches]
- **Relationships:** [e.g. one lead has many reminders; one reminder belongs to one user]
- **New fields/tables needed:** [list]

```sql
-- Worked example: Follow-Up Reminder

create table reminders (
  id            uuid primary key default gen_random_uuid(),
  org_id        uuid not null references orgs(id) on delete cascade,
  lead_id       uuid not null references leads(id) on delete cascade,
  created_by    uuid not null references users(id),
  due_at        timestamptz not null,
  note          text,
  status        text not null default 'pending' check (status in ('pending','sent','snoozed','done')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index idx_reminders_due_at on reminders (due_at) where status = 'pending';
create index idx_reminders_lead_id on reminders (lead_id);

-- RLS: org-scoped access only
alter table reminders enable row level security;
create policy reminders_org_isolation on reminders
  using (org_id = current_setting('app.current_org_id')::uuid);
```

> For your spec: replace the table above with [your entities]. See `DATABASE_SPEC.md` for the full schema template if this feature spans multiple tables.

---

## 6. API Requirements

| Endpoint | Method | Purpose | Auth |
|---|---|---|---|
| [/api/...] | [GET/POST/PATCH/DELETE] | [what it does] | [required role/session] |

**Worked example:**

| Endpoint | Method | Purpose | Auth |
|---|---|---|---|
| `/api/leads/:leadId/reminders` | POST | Create a reminder on a lead | Authenticated, org member |
| `/api/leads/:leadId/reminders` | GET | List reminders for a lead | Authenticated, org member |
| `/api/reminders/:id` | PATCH | Update/snooze a reminder | Authenticated, must own org of parent lead |
| `/api/reminders/:id` | DELETE | Cancel a reminder | Authenticated, must own org of parent lead |
| `/api/cron/reminders/dispatch` | POST | Internal: find due reminders, send emails | Service-role key only, not user-facing |

---

## 7. UI Requirements

- **Component inventory:** [list new/reused components, e.g. ReminderModal, ReminderBadge, ReminderListItem]
- **Design system reference:** [link to design system / Figma / `02-HUMAN-FLOW` wireframes]
- **States to design for:** [empty, loading, error, success, overdue, disabled]
- **Responsive breakpoints:**

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | [< 640px] | [e.g. modal becomes full-screen sheet] |
| Tablet | [640–1024px] | [e.g. 2-column lead list] |
| Desktop | [> 1024px] | [e.g. 3-column with side panel] |

**Worked example:**
```
Components: ReminderModal (date/time/note form), ReminderBadge (red dot on
overdue lead card), ReminderListItem (row in "Upcoming Follow-Ups" panel).
Design reference: HUMAN_FLOW.md Flow 3, screen "Lead Detail."
States: empty ("No reminders set"), overdue (red badge + top of list sort),
snoozed (gray badge with new date).
Breakpoints: < 640px → modal becomes bottom sheet; ≥ 1024px → reminder panel
docks to right sidebar instead of modal.
```

---

**Next step:** Once every bracket above is filled and every FR has acceptance criteria, hand this file (plus `TECH_SPEC.md` and `DATABASE_SPEC.md`) to your AI builder using the prompt chain in [`PROMPTS.md`](./PROMPTS.md).
