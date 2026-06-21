# FixQueue — Maintenance Request Tracker for Property Managers

## Idea
FixQueue is a B2B SaaS tool for small-to-mid property management companies to log, assign, and track maintenance requests across their rental portfolio, replacing the email-and-spreadsheet chaos that causes slow repairs and angry tenants.

## Problem
Property managers handling 20-200+ units get maintenance requests via phone, text, and email with no central record. Requests get lost, vendors aren't tracked, and managers can't prove response times when tenants or owners complain — a real liability and churn risk.

## Target User
Property managers and small property management companies (2-15 staff) managing residential or mixed-use portfolios, currently using email, spreadsheets, or a generic helpdesk tool not built for property workflows.

## Revenue Model
Tiered monthly SaaS subscription based on number of units managed (e.g., $49/mo up to 50 units, $149/mo up to 250 units), with a free 14-day trial.

## MVP Features
- Property and unit roster with tenant contact info
- Maintenance request intake form (tenant-facing or staff-entered)
- Request status pipeline (new, assigned, in progress, completed)
- Vendor assignment with contact info and cost tracking per request
- Response-time tracking and SLA flag for overdue requests
- Tenant notification on status change (email)

## Human Flow
1. Tenant or staff submits a maintenance request via intake form
2. Manager reviews the request and assigns it to a vendor/staff member
3. Vendor updates status as work moves from assigned to in progress
4. Manager logs cost and notes once work is completed
5. Tenant receives an automated notification when status changes
6. Manager reviews the overdue/SLA dashboard weekly to catch stalled requests

## AI Instructions
Build a Next.js + Supabase B2B SaaS called FixQueue for property managers to track maintenance requests. Core entities: Property, Unit (belongs to Property, has tenant_name and tenant_contact), Vendor, MaintenanceRequest (belongs to Unit, fields: description, status enum [new, assigned, in_progress, completed], assigned_vendor, cost, created_at, sla_due_at). Build a tenant-facing public intake form per unit, a manager dashboard with a status pipeline (kanban or table), automatic SLA due date calculation with red flagging for overdue requests, and an email notification (via Resend or similar) triggered on status change. Use Stripe for tiered subscription billing based on unit count. Use Tailwind + shadcn/ui.
