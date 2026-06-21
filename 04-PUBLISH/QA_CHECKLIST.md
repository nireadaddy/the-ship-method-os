# QA_CHECKLIST

Pre-launch quality assurance checklist for AI-built products. Run this in full before any public launch, and re-run the relevant sections after every significant release.

## 1. Functional Testing — Core Flows

- [ ] Signup flow completes end-to-end (email, OAuth, magic link — whichever you support)
- [ ] Login / logout works, including "remember me" and session expiry
- [ ] Password reset flow sends email, link works, new password takes effect
- [ ] Core "aha moment" flow (the action your product exists for) works with no errors
- [ ] Payment / checkout flow completes with test cards (success, decline, 3D Secure)
- [ ] Subscription upgrade/downgrade/cancel flows work and reflect correctly in billing provider
- [ ] CRUD operations (create/read/update/delete) work for every primary data object
- [ ] Search/filter/sort functions return correct, expected results
- [ ] Notifications (email, in-app, push) fire on the correct triggers, not duplicated
- [ ] Multi-step flows (onboarding wizards, multi-page forms) preserve state on back/refresh
- [ ] File upload/download works for all supported formats and size limits
- [ ] Pagination/infinite scroll loads correct data without duplicates or gaps
- [ ] Permission-gated actions are actually blocked for unauthorized roles
- [ ] Webhooks (Stripe, third-party integrations) are received and processed idempotently

## 2. Cross-Browser / Cross-Device Testing

- [ ] Chrome (latest) — desktop
- [ ] Safari (latest) — desktop
- [ ] Firefox (latest) — desktop
- [ ] Edge (latest) — desktop
- [ ] Safari — iOS (latest 2 major versions)
- [ ] Chrome — Android (latest 2 major versions)
- [ ] Responsive breakpoints checked: 320px, 375px, 768px, 1024px, 1440px, 1920px
- [ ] Touch targets are ≥44x44px on mobile
- [ ] No horizontal scroll/overflow on any breakpoint
- [ ] Tested with browser zoom at 125%/150%
- [ ] Tested with an ad-blocker / privacy extension enabled (analytics/payment scripts don't silently break the page)

## 3. Form Validation

- [ ] Required fields are enforced both client-side and server-side
- [ ] Email fields reject malformed input with clear inline error
- [ ] Password fields enforce stated complexity rules and show the rule, not just "invalid"
- [ ] Numeric fields reject non-numeric input and out-of-range values
- [ ] Max length limits are enforced and communicated before submission, not after
- [ ] Error messages are specific ("Email already in use" not "Error occurred")
- [ ] Validation errors are announced to screen readers (aria-live or role="alert")
- [ ] Submit button is disabled while request is in-flight (no double-submit)
- [ ] Form data is preserved if submission fails (no re-typing everything)
- [ ] Paste works in every input (no paste-blocking on password/confirm fields)

## 4. Error Handling

- [ ] Network failure (offline) shows a clear retry state, not a blank screen
- [ ] API 4xx errors show user-actionable messages (not raw JSON or stack traces)
- [ ] API 5xx errors show a generic "something went wrong, we've been notified" state
- [ ] Errors are logged to a monitoring tool (Sentry, etc.) with enough context to debug
- [ ] 404 page exists and links back to a working page
- [ ] Expired session redirects to login with intent preserved (return-to-URL)
- [ ] Rate-limited requests show a clear cooldown message, not a silent failure
- [ ] Third-party service outage (Stripe, email provider, AI API) degrades gracefully, doesn't crash the app

## 5. Empty States

- [ ] Every list/table/dashboard has a designed empty state (not a blank white box)
- [ ] Empty state explains why it's empty and what action to take next
- [ ] First-run / zero-data state for new users guides them toward the core action
- [ ] Search with no results shows a helpful message, not nothing
- [ ] Empty states are tested for every primary object, not just the dashboard

## 6. Performance

- [ ] Largest Contentful Paint (LCP) < 2.5s on a throttled mobile connection
- [ ] Time to Interactive < 3.5s on key pages
- [ ] No render-blocking scripts on the landing/marketing pages
- [ ] Images are compressed and served in modern formats (WebP/AVIF) with explicit width/height
- [ ] API responses on core flows return in < 500ms (p95), or show a loading state if longer
- [ ] No N+1 query patterns on list views with real data volume (test with 1,000+ rows, not 5)
- [ ] Bundle size audited — no unused libraries shipped to the client
- [ ] Lighthouse score ≥ 90 on Performance for marketing pages

## 7. Accessibility (WCAG 2.1 AA basics)

- [ ] All interactive elements reachable and operable via keyboard only (Tab/Shift+Tab/Enter/Esc)
- [ ] Visible focus indicator on all focusable elements
- [ ] Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- [ ] All images have meaningful alt text (or alt="" for decorative)
- [ ] Form inputs have associated `<label>` elements
- [ ] Headings follow logical hierarchy (one H1 per page, no skipped levels)
- [ ] Page is navigable and understandable with a screen reader (VoiceOver/NVDA quick pass)
- [ ] No content relies on color alone to convey meaning (e.g. error states)
- [ ] Modals trap focus and are dismissible with Esc
- [ ] `lang` attribute set on `<html>`

## 8. Security Basics

- [ ] No API keys, secrets, or service-role tokens present in client-side JS bundle
- [ ] Environment variables containing secrets are server-side only (never `NEXT_PUBLIC_` / client-exposed for sensitive values)
- [ ] All user input is sanitized/escaped before rendering (XSS check) and before DB queries (injection check)
- [ ] Row-Level Security (or equivalent authorization checks) enforced on every database table, not just at the API layer
- [ ] Auth tokens stored securely (httpOnly cookies preferred over localStorage for session tokens)
- [ ] HTTPS enforced everywhere, no mixed content warnings
- [ ] CORS configured to allow only expected origins
- [ ] File upload endpoints validate file type/size server-side, not just client-side
- [ ] Rate limiting in place on auth endpoints (login, signup, password reset)
- [ ] Admin/internal routes are not publicly discoverable or accessible without proper role checks
- [ ] Dependency vulnerability scan run (npm audit / equivalent) with no high/critical unresolved

## 9. Data Integrity

- [ ] Deleting a record doesn't orphan related records (cascade or soft-delete is intentional)
- [ ] Concurrent edits to the same record don't silently overwrite each other
- [ ] Timestamps are stored in UTC and displayed in user's local timezone
- [ ] Currency/number formatting is consistent and locale-correct
- [ ] Database backups are configured and a restore has been test-run at least once
- [ ] Migrations are reversible or have a documented rollback plan
- [ ] Test/seed data is fully purged from production before launch
- [ ] Duplicate-prevention logic exists where uniqueness matters (email, slug, SKU)

## Severity Triage Table

Use this table to classify every bug found during QA. Launch gating rule: **zero open Blockers, zero open Majors** unless explicitly accepted by the product owner in writing.

| Severity | Definition | Examples | Launch Gate |
|---|---|---|---|
| **Blocker** | Core flow is broken or data is at risk for any user | Signup fails, payment doesn't charge but grants access, data loss on save | Must fix before launch — no exceptions |
| **Major** | Core flow works but is degraded, or a non-core flow is broken | Slow checkout (>10s), broken password reset, incorrect totals | Must fix before launch, or explicit sign-off with mitigation plan |
| **Minor** | Functional but with a poor or confusing experience | Unclear error copy, missing empty state, validation message is vague | Fix before launch if time allows; otherwise log and schedule for T+7 |
| **Cosmetic** | Visual-only issue with no functional impact | Misaligned padding, inconsistent font weight, minor color mismatch | Backlog — fix post-launch |

## Sign-off

- [ ] All Blocker and Major issues resolved or explicitly accepted
- [ ] QA checklist fully run on staging with production-like data volume
- [ ] Product owner has signed off on remaining Minor/Cosmetic backlog
- [ ] Rollback plan confirmed (see `LAUNCH_PLAN.md`)
