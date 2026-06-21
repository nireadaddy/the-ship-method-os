# Case Study 02: A Small Product Team Replaces a Spreadsheet Ops Process with an Internal Tool

**Team:** 3 people (1 product manager, 1 ops lead/domain expert, 1 part-time engineer, ~10 hrs/week)
**Product:** ShiftBoard — an internal tool replacing a shared Google Sheet used to schedule and track warehouse shift coverage and swap requests for a 45-person warehouse team
**Tools:** ChatGPT (Plus, GPT-4-class model, used for planning and spec-writing), Windsurf (AI-native IDE, used for implementation), Airtable (initial prototype layer before migrating to Postgres), Retool (final internal UI layer)
**Timeline:** 4 weeks elapsed, roughly 60 total person-hours
**Rough cost:** ~$650 (ChatGPT Plus $20/mo x 1mo, Windsurf Pro $15/mo x 1mo, Retool free tier, Postgres hosting ~$25/mo, plus ~$580 in engineer time at a blended internal rate — tracked for the project's internal ROI case)

## Situation

The warehouse ops team managed shift coverage and swap requests in a shared Google Sheet that had grown to 14 tabs. Shift swaps were submitted via a separate Slack channel, approved manually by a supervisor, then someone had to remember to update the sheet — a process that broke down often enough that the ops lead estimated 3-4 scheduling errors per week (double-booked shifts, unapproved swaps that went through anyway, no-shows from missed updates). The team had tried to get this prioritized as an engineering project for over a year, but it always lost to customer-facing work. They decided to attempt it as a lightweight internal project using AI tools, explicitly scoped to avoid needing a full engineering sprint.

## SHIP Process Applied

**Structure:** The PM and ops lead spent a single 90-minute session filling out the `PROJECT.md` template together, with the ops lead describing the real workflow in detail (who submits swaps, who approves, what "approved" actually means operationally) while the PM translated it into the template's persona and JTBD format. This surfaced a requirement they hadn't articulated before: supervisors needed to see remaining headcount per shift in real time to approve a swap safely, not just approve/reject in isolation. MVP scope was cut to exactly: shift calendar view, swap request submission, supervisor approval queue, and a live headcount-per-shift indicator. Notification automation and historical reporting were explicitly pushed to V1.

**Human Flow:** They used ChatGPT to turn the swap-request workflow into a step-by-step flow (worker requests swap → system checks headcount impact → supervisor sees request in queue with headcount delta shown → approve/reject → calendar updates) and described 4 core screens (shift calendar, swap request form, supervisor approval queue, headcount dashboard) directly in the spec, skipping a separate design tool since this was an internal tool with no external brand requirements.

**Instruction:** The PM wrote functional requirements collaboratively with ChatGPT, with particular attention to the headcount-check logic (a swap can only be approved if resulting coverage stays at or above the minimum-staffing threshold per shift, configurable per shift type). This requirement was translated into a single AI build prompt with explicit business logic, then handed to the part-time engineer to execute in Windsurf rather than having ChatGPT generate code directly — the team had learned from a prior attempt that planning and implementation worked better when split across two surfaces (ChatGPT for spec clarity, Windsurf for grounded, codebase-aware generation).

**Build:** The engineer used Windsurf's agentic mode to implement against the spec, starting with an Airtable-backed prototype in week 1 to validate the workflow with 5 real supervisors before committing to a full Postgres + Retool build in weeks 2-4. This prototype step caught a flaw early: the original headcount logic didn't account for shifts that span midnight, which the warehouse runs regularly. Catching this in an Airtable prototype cost an afternoon; catching it post-launch would have caused real scheduling errors.

**Publish:** The team ran a 1-week pilot with a single warehouse zone (12 of the 45 staff) before full rollout, using a condensed version of the `QA_CHECKLIST.md`, and tracked swap-approval turnaround time and scheduling-error count as the core comparison metrics against the old Sheet+Slack process.

## Outcome

- Full rollout to all 45 staff in week 5 (one week past the 4-week build target, due to the pilot extension)
- Scheduling errors dropped from an estimated 3-4/week to 0 in the first 6 weeks post-launch
- Average swap-approval turnaround dropped from ~6 hours (Slack message sitting unseen) to under 20 minutes (in-app approval queue with notification)
- Total cost ~$650 versus an internal estimate of $15,000+ and a 6-8 week wait for a formal engineering sprint

## What We'd Do Differently

- **Start the Airtable prototype even earlier.** The midnight-shift bug was caught in week 1's prototype, but the team believes a prototype in days 1-2 (before any spec was even finalized) would have surfaced it sooner and cheaper.
- **Involve a second supervisor in Structure, not just the ops lead.** One supervisor's mental model of "approval" didn't match how a second shift's supervisor actually worked, which only surfaced during the pilot — a second perspective in the persona/JTBD step would have caught this earlier.
- **Don't skip a real design pass for internal tools that staff use all day.** The Retool UI was functional but cluttered; several pilot users found the approval queue hard to scan. The team treated "internal tool" as a reason to skip UX polish, and paid for it in adoption friction during week 1 of the pilot.
- **Track the time split between ChatGPT planning and Windsurf implementation more deliberately.** In retrospect, more of the early hours went into ChatGPT back-and-forth than expected; a tighter Structure/Instruction template would likely have compressed that planning phase by a third.
