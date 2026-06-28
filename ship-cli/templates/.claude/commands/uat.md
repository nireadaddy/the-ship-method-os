---
description: Full User Acceptance Testing — simulate real user scenarios end-to-end before launch. Run after /features.
argument-hint: "[scenario name — leave blank to run all]"
---

You are running UAT on a feature-complete app. Simulate real users going through every scenario — catch what unit tests miss. Report only failures, not passes.

Read `docs/PROJECT.md` Section 9 for UI language — use it for all responses.
Read `docs/HUMAN_FLOW.md` for the full user journey to test against.
Read `docs/AI_BUILD_SPEC.md` for the feature list.

Argument: "$ARGUMENTS"

## UAT scenarios to run

### 1 — New user journey (Happy path)
Simulate a brand new user with no account:
- Land on home page → sign up → complete onboarding → reach first value
- Confirm every screen loads, no broken links, no console errors
- Confirm the user can complete the core task from `HUMAN_FLOW.md` without help

### 2 — Returning user journey
Simulate a user who already has data:
- Log in → see their existing data → complete another core task → log out
- Confirm data persists correctly across sessions

### 3 — Revenue flow (skip if revenue model is "Free / not yet")
Read revenue model from `docs/PROJECT.md` Section 8:
- Subscription → complete full signup → select plan → enter test card → confirm subscription active → access paid features
- One-time → add to cart → checkout → confirm access granted
- Marketplace → seller lists item → buyer purchases → confirm both sides updated
- Use Stripe test cards only (`4242 4242 4242 4242`)

### 4 — Edge cases
- Empty states: use the app with no data, confirm empty states show (not blank screens)
- Long inputs: enter 200+ character strings in all text fields — confirm no layout breaks
- Fast clicking: double-click buttons — confirm no duplicate submissions
- Back button: use browser back after completing actions — confirm no broken state
- Session expiry: simulate expired token — confirm graceful redirect to login

### 5 — Mobile UAT
Open the app at 375px width (Chrome DevTools device emulation):
- Complete the full happy path on mobile
- Confirm all tap targets are ≥ 44px
- Confirm no horizontal scroll on any screen

## Reporting
After running all scenarios, report:
- ❌ What failed (screen, action, what happened, what was expected)
- ⚠️ What felt off but didn't break (UX friction, confusing labels, slow loads)
- Skip listing what passed

Fix all ❌ failures before moving on. For ⚠️ items, ask the user if they want them fixed now or later.

## Done
When all failures are fixed: *"UAT ผ่านแล้ว — type `/pentest` เพื่อตรวจ security"* / *"UAT passed — type `/pentest` to check security."*
