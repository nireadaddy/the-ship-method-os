# CRM Template

A CRM lives or dies on one thing: does it make the next action obvious? Unlike most SaaS, the core unit isn't a "user session" — it's a **relationship over time** (a contact, a deal, a thread of activity). Plan around the pipeline, not the screen. Build the activity log before you build the dashboard — without a reliable history, every other feature (reminders, reporting, automation) has nothing to read from. Launch with one pipeline that matches how your first customer actually sells, not a generic "Lead → Qualified → Closed" template nobody asked for.

## Feature Checklist

- [ ] Contact records (people) with custom fields
- [ ] Company/account records, linked to multiple contacts
- [ ] Deal / opportunity records with stage + value
- [ ] Pipeline view (kanban by stage) — at least one, configurable later
- [ ] Activity log (calls, emails, notes, meetings) attached to contact/deal
- [ ] Tasks & reminders (due date, assignee, overdue flagging)
- [ ] Email integration or logging (manual log at minimum for MVP)
- [ ] Search across contacts/companies/deals
- [ ] Filters & saved views (e.g., "my open deals," "stale > 14 days")
- [ ] Reporting: pipeline value by stage, win rate, activity volume
- [ ] Import (CSV) and export
- [ ] User roles (admin, rep, read-only) if multi-user from day one
- [ ] Notifications (in-app and/or email) for assigned tasks and deal changes
- [ ] Duplicate detection/merge for contacts (becomes painful fast without it)

## Data Model Starter

| Entity | Key Fields | Relationships |
|---|---|---|
| Contact | name, email, phone, title, source, owner_id | belongs to Company; has many Activities, Deals |
| Company | name, domain, industry, size, owner_id | has many Contacts, Deals |
| Deal | name, value, stage, probability, close_date, owner_id | belongs to Contact/Company; has many Activities |
| Pipeline / Stage | name, order, pipeline_id | belongs to Pipeline; has many Deals |
| Activity | type (call/email/note/meeting), body, timestamp, user_id | belongs to Contact and/or Deal |
| Task | title, due_date, status, assignee_id | belongs to Contact/Deal (optional) |
| User | name, email, role | has many Deals (as owner), Activities, Tasks |

## Core User Flows

1. Add contact → enrich with company → log first activity
2. Create deal → assign stage → move through pipeline via drag/dropdown
3. Log activity (call/email/note) → auto-timestamp → visible on contact timeline
4. Create task with due date → get reminded → mark complete
5. Filter pipeline view → spot stale/at-risk deals → take action
6. Run report → export pipeline summary for a sales meeting
7. Import contact list (CSV) → dedupe → assign owner

## Monetization Pattern

Per-seat subscription (price per user/month) is the dominant model — value scales with team size, and usage (deals, contacts) is rarely the metering unit at small scale. Common tiering: limit seats, pipelines, or automation/integrations by plan rather than contact count, since artificially capping contacts feels punitive and erodes trust. Add-on revenue from integrations (email sync, calling, enrichment) is common at scale but skip for MVP.

## Build Order (MVP fastest path)

1. Contact + Company CRUD (the system of record)
2. Deal model + single pipeline kanban view
3. Activity log attached to contact/deal (manual entry first)
4. Task/reminder with due date and "my tasks" view
5. Basic search + filter
6. Minimal reporting (pipeline value by stage)
7. Defer: email sync, automation rules, multiple pipelines, advanced permissions

## Example AI Build Prompts

```
Build a CRM contact and deal data model in [Postgres/Supabase], with tables for
contacts, companies, deals, pipeline_stages, activities, and tasks as described
in the data model below. Include foreign keys, indexes on owner_id and stage,
and a soft-delete column. [paste Data Model Starter table]
```

```
Build a kanban-style pipeline view in [React/Next.js] that shows deals grouped
by stage as draggable cards. Dragging a card to a new column updates the deal's
stage via API call. Each card shows deal name, value, and days since last activity.
Highlight cards with no activity in 14+ days in a warning color.
```

```
Build an activity timeline component that shows all activities (calls, emails,
notes, meetings) for a given contact or deal, newest first, with the ability to
quickly log a new activity via an inline form (type, body, optional follow-up task).
```
