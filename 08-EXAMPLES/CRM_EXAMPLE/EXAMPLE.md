# EXAMPLE: PolicyPilot — CRM for Independent Insurance Agents

> Worked example of the SHIP Method applied end-to-end. Use this as a reference for how the templates in `01-04` translate into a real, fundable, buildable product.

## Structure

**Product Vision:** PolicyPilot is a lightweight CRM that helps independent insurance agents stop losing renewals and commissions to spreadsheets and sticky notes, by surfacing every lead and every policy renewal that needs attention today, without the bloat and per-seat pricing of enterprise insurance CRMs like AgencyBloc.

**Problem:** Independent agents (1-5 person agencies) juggle 200-800 active policies across carriers. Renewal dates live in carrier portals, Excel, and memory. Agents report losing 8-12% of renewals annually simply because no one followed up in time — at an average commission of $400/policy, that's $15-30k/year in silent churn for a typical solo agent.

**Target Audience:**

| Attribute | Description |
|---|---|
| Primary segment | Independent P&C/life insurance agents, solo or 2-4 person agencies |
| Secondary segment | Agency office managers running CRM for a small team |
| Demographics | Age 35-60, non-technical, currently using Excel/Google Sheets + email |
| Where they hang out | Facebook groups for independent agents, NAIFA/PIA associations, carrier conferences |
| Currently pay for | AMS360 or QQCatalyst (enterprise, $150-300/mo) or nothing at all |
| Buying trigger | Just missed a renewal and lost the client to a competitor |

**Personas:**

1. **Denise, 48, Solo P&C Agent** — Goal: never miss a renewal again. Frustration: "I have renewal dates in four different places and I still forget." Tech comfort: low-medium, lives in Gmail and Excel. Success = opens the app once a day, sees exactly who to call.
2. **Marcus, 34, Growing Agency Owner (3 agents)** — Goal: see his team's pipeline without micromanaging. Frustration: "I find out a lead went cold three weeks too late." Tech comfort: medium. Success = a dashboard that shows stalled leads/renewals across his whole team.

**MVP Scope:**
- In scope: lead intake (manual + CSV import), pipeline stages (New → Quoted → Bound → Renewal Due), renewal countdown view, one-click call/email logging, single-user and small-team accounts.
- Out of scope for MVP: carrier API integrations, commission tracking/reconciliation, e-signature, SMS automation.
- MVP "done" definition: an agent can import their book of business, see every renewal due in the next 30/60/90 days ranked by commission value, and log an outreach action in under 10 seconds.

## Human Flow

**Core User Flow:** Sign up → Import leads/policies (CSV upload) → Land on Renewal Dashboard → Filter by "due in 30 days" → Click a policy → Log a call/email → Mark renewed or move to lost.

**Core Screens:**
1. **Renewal Dashboard** — sortable table of policies due for renewal, color-coded by urgency (red <14 days, yellow <30, green >30), commission value column, "Call Now" quick action.
2. **Lead/Policy Detail** — contact info, policy history, carrier, premium, notes timeline, log-activity button.
3. **Pipeline Board (Kanban)** — drag-and-drop leads through New → Quoted → Bound stages.
4. **Import Wizard** — CSV upload with column mapping (name, policy number, renewal date, premium, carrier) and a preview/confirm step before commit.

## Instruction

**Functional Requirements:**
- FR1: System shall calculate days-until-renewal for every policy and sort the Renewal Dashboard by urgency by default.
- FR2: System shall allow CSV import of policies with required columns (client name, renewal date, premium) and reject rows missing required fields, surfacing row-level errors before commit.
- FR3: System shall log every call/email/note against a policy with a timestamp and the logged-in agent's name, visible in a reverse-chronological activity timeline.
- FR4: System shall restrict team members to viewing only their own assigned leads unless they hold the "agency owner" role, which sees all.

**AI Build Prompt:**
```
Build a Next.js 14 + Supabase app called PolicyPilot. Core entities: Agency, Agent (belongs to Agency, role: owner|agent), Client, Policy (belongs to Client, fields: carrier, premium, renewal_date, status enum [new, quoted, bound, renewal_due, lost]), Activity (belongs to Policy, fields: type [call, email, note], body, created_by, created_at).
Build: (1) a Renewal Dashboard page that queries policies where renewal_date is within 90 days, sorted ascending, with a color-coded badge for <14/<30/>30 days; (2) a CSV import flow using a file upload, client-side parsing with PapaParse, a column-mapping step, and a Supabase RLS-safe bulk insert; (3) a policy detail page with an activity timeline and a quick-log form; (4) RLS policies so agents only see policies where created_by = auth.uid() unless their agent.role = 'owner'. Use Tailwind + shadcn/ui for UI. Seed with 20 fake policies for local testing.
```

## Publish

**Launch Checklist (excerpt):**
- [ ] CSV import tested against 3 real agent exports (different column orders/formats)
- [ ] RLS policies verified — agent A cannot query agent B's policies via API
- [ ] Renewal countdown timezone-tested (agent in EST vs PST sees correct "days left")
- [ ] Onboarding flow takes a new agent from signup to first dashboard view in under 5 minutes, tested with 3 non-technical users

**Success Metric:** Activation rate — % of new signups who import at least 10 policies and view the Renewal Dashboard within 48 hours. Target: 60% in first 90 days post-launch.
