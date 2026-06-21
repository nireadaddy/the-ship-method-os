# OpsDeck — Client & Project Tracker for Small Agencies

## Idea
OpsDeck is an internal system for small agencies (5-20 people) to track clients, projects, and deliverables in one place, replacing a patchwork of spreadsheets, email threads, and project management tools that weren't built for client services work.

## Problem
Small agencies lose visibility fast: who owns which deliverable, what's overdue, and which client is at risk of churning. Generic PM tools (Asana, Trello) don't tie tasks back to client health or billable status, so account managers end up rebuilding that view manually every week.

## Target User
Agency owners and account managers at small marketing, design, or dev agencies who currently stitch together Notion, Google Sheets, and Slack to track client work and deliverable deadlines.

## Revenue Model
N/A — internal tool. Could later be packaged as a flat-fee SaaS per agency seat ($20-40/mo per user) if generalized beyond a single agency's internal use.

## MVP Features
- Client roster with status (active, paused, churned) and contract value
- Project list per client with deliverables and due dates
- Deliverable status tracking (not started, in progress, review, delivered)
- Team workload view showing who owns what across all active clients
- Overdue/at-risk flagging for deliverables past due date
- Simple activity log per client (notes, calls, decisions)

## Human Flow
1. Account manager adds a new client and logs contract details
2. AM creates a project under the client with a deliverable list and due dates
3. Deliverables get assigned to team members
4. Team member updates deliverable status as work progresses
5. Manager checks the workload dashboard to spot overdue or overloaded items
6. AM logs client notes/decisions in the activity log after each touchpoint

## AI Instructions
Build a Next.js + Supabase internal tool called OpsDeck for a small agency to manage clients, projects, and deliverables. Core entities: Client (status enum [active, paused, churned], contract_value), Project (belongs to Client), Deliverable (belongs to Project, fields: title, owner, due_date, status enum [not_started, in_progress, review, delivered]), ActivityLog (belongs to Client, notes with timestamp and author). Build a client roster page, a project/deliverable kanban-style board, a team workload dashboard that groups deliverables by owner and flags overdue items in red, and simple role-based access (admin sees all clients, team member sees only assigned deliverables). Use Tailwind + shadcn/ui.
