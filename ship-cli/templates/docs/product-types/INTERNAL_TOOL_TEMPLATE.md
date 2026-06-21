# Internal Tool Template

Internal tools have a captive, forgiving-on-design but unforgiving-on-correctness user base — your coworkers will tolerate ugly UI but will not tolerate a tool that loses data, skips an approval step, or can't explain who did what. Plan around the existing company process you're replacing or augmenting (the paper form, the spreadsheet, the Slack thread) — the fastest path to adoption is matching that mental model, not redesigning the process from scratch. Build the audit log and permission model early; internal tools routinely get audited later for "who approved this" and you do not want that to be undiscoverable.

## Feature Checklist

- [ ] Internal auth (SSO/company login preferred over public signup)
- [ ] Role-based permissions matching org structure (requester/approver/admin)
- [ ] Core workflow/form (the specific process being digitized)
- [ ] Approval flow with explicit states (submitted → approved/rejected → done)
- [ ] Audit log: every state change recorded with actor, timestamp, before/after
- [ ] Notifications to relevant people at each workflow step
- [ ] Search/filter over historical records
- [ ] Integration with existing systems (HR system, accounting, Slack, email)
- [ ] Admin override/escalation path for stuck items
- [ ] Reporting/export for compliance or management review
- [ ] Bulk actions (approve multiple, reassign multiple) for power users
- [ ] Comments/notes thread on each record for context
- [ ] Configurable approval rules (e.g., amount-based routing) if process varies

## Data Model Starter

| Entity | Key Fields | Relationships |
|---|---|---|
| User | name, email, role, department, manager_id | has many Requests (as requester or approver) |
| Request / Record | type, status, submitted_by, current_step, payload (JSON) | belongs to User (requester); has many Approvals, Comments |
| Approval Step | request_id, approver_id, status, decided_at, comment | belongs to Request and User (approver) |
| Audit Log Entry | actor_id, action, target_type, target_id, before, after, timestamp | belongs to User; references any entity |
| Integration Sync Log | system_name, request_id, status, synced_at | belongs to Request |
| Comment | body, author_id, request_id, created_at | belongs to Request and User |

## Core User Flows

1. Employee submits a request via form → enters approval queue
2. Approver gets notified → reviews → approves or rejects with comment
3. (If multi-step) request routes to next approver based on rules (e.g., amount threshold)
4. Requester gets notified of final decision → record marked done/closed
5. Admin searches historical requests → filters by status/date/department for review
6. Admin exports records for compliance/audit purposes
7. Stuck request escalated to admin → manually reassigned or force-resolved

## Monetization Pattern

No direct monetization — value is internal: hours saved vs. manual process (spreadsheet/email/paper), error reduction, and audit/compliance readiness. Justify build cost by estimating time currently spent per cycle of the manual process × frequency × number of people involved, and track that as the tool's "ROI metric" post-launch instead of revenue.

## Build Order (MVP fastest path)

1. Core request form + record model matching the existing process exactly
2. Single-step approval (submit → approve/reject) before building multi-step routing
3. Notifications for submission and decision (email is enough for MVP)
4. Audit log capturing every status change
5. Basic search/filter over records for admins
6. Defer: multi-step routing rules, integrations with other internal systems, bulk actions

## Example AI Build Prompts

```
Build a request/approval workflow data model in [Postgres/Supabase] with
requests, approval_steps, and audit_log tables as described below, where every
status change on a request automatically writes an audit_log entry with actor,
before-state, after-state, and timestamp via a database trigger or application
hook. [paste Data Model Starter table]
```

```
Build an approval queue page in [React/Next.js] that shows the logged-in
user's pending approvals (requests where they are the current approver),
with approve/reject buttons that require a comment on reject, and update the
request status and notify the requester immediately on decision.
```

```
Build an audit log viewer page for admins showing every action taken on
requests (submitted, approved, rejected, escalated) in a searchable, filterable
table with columns for actor, action, target request, timestamp, and an
expandable before/after diff for status or field changes.
```
