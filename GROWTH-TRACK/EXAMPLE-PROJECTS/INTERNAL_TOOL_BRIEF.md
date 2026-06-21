# TimeOffHub — PTO Request Tracker for Mid-Size Companies

## Idea
TimeOffHub is an internal tool that replaces the shared spreadsheet most mid-size companies use to track PTO requests, giving employees a simple request form and managers a clear approval queue with real-time balance tracking.

## Problem
A shared spreadsheet for PTO requests breaks down past ~30 employees: double bookings, stale balances, no audit trail, and managers approving requests via email reply that never make it back into the sheet. HR ends up reconciling everything manually at month-end.

## Target User
HR/People Ops managers and team leads at mid-size companies (50-300 employees) who outgrew a spreadsheet but aren't ready to buy a full HRIS suite just for time-off tracking.

## Revenue Model
N/A — internal tool. If generalized, could become a per-employee monthly SaaS add-on ($2-4/employee/mo) sold to companies in the 50-500 headcount range.

## MVP Features
- Employee PTO balance tracking (accrued, used, remaining)
- Request submission form (date range, type: vacation/sick/unpaid)
- Manager approval queue with approve/deny and comment
- Team calendar view showing approved time off to spot overlap
- Automatic balance deduction on approval
- Email notification to employee on approval/denial

## Human Flow
1. Employee submits a PTO request with date range and type
2. System checks remaining balance and flags if request exceeds it
3. Request lands in the employee's manager's approval queue
4. Manager reviews team calendar for overlap, then approves or denies
5. System deducts balance and notifies employee by email
6. HR reviews company-wide PTO calendar for planning and audit purposes

## AI Instructions
Build a Next.js + Supabase internal tool called TimeOffHub to replace a company's PTO spreadsheet. Core entities: Employee (manager_id, pto_balance_days), PTORequest (belongs to Employee, fields: start_date, end_date, type enum [vacation, sick, unpaid], status enum [pending, approved, denied], reviewer_comment), accrual logic that increments pto_balance_days monthly via a scheduled function. Build an employee request form with balance validation, a manager approval queue scoped to direct reports via RLS, a team calendar view (react-big-calendar or similar) showing approved time off, and automatic balance deduction on approval with an email notification (Resend). Use Tailwind + shadcn/ui.
