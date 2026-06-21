# MVP_BUILD

## Purpose

Standardize the process of turning a filled `PROJECT.md` into a working MVP build, following the SHIP phases in order (Spec → Hypothesize → Implement → Polish, or your project's specific phase naming as defined in `01-STRUCTURE`). Prevents scope creep, undocumented architecture decisions, and "vibe coded" builds that can't be maintained.

## When to Run

- Immediately after `PROJECT.md` is filled out and validated (problem, audience, core feature, success metric all defined)
- Before any code is written
- Re-run the relevant steps if scope changes materially mid-build (new core feature added, target user redefined)

## Inputs

- Completed `PROJECT.md` (problem statement, target user, core feature, success metric, constraints)
- Any prior validation evidence (`VALIDATING_IDEA.md` outputs — interview notes, landing page signal data)
- Tech stack decision (or default stack from `11-STANDARDS`)
- Design references / wireframes if available (optional for MVP — not required to start)

## Step-by-Step Procedure

1. **Re-read `PROJECT.md` and confirm scope is MVP-sized.** Strip anything that isn't required to prove the core hypothesis. If in doubt, cut it — MVP means minimum, not "version 1 with everything."
2. **Define the single core user flow** the MVP must support end-to-end (e.g. "user signs up → creates one [object] → sees value"). Write it as one sentence. Every other feature is secondary.
3. **List explicit non-goals.** Write down what you are deliberately NOT building in this MVP (e.g. no team accounts, no billing, no mobile app). This prevents silent scope creep during implementation.
4. **Choose and lock the tech stack** (framework, database, auth provider, hosting). Don't re-decide mid-build — log the decision and move on.
5. **Design the minimum data model** required for the core flow only. Add tables/fields only as the core flow needs them.
6. **Scaffold the project** (repo, environment variables, CI if applicable, base folder structure per project conventions).
7. **Build authentication** (or explicitly decide the MVP doesn't need it yet, e.g. for a smoke-test landing page MVP).
8. **Build the core flow first, end-to-end, ugly is fine.** Get a working (not pretty) version of the single core flow live before touching any secondary feature or styling.
9. **Add the minimum UI polish needed for someone outside the team to use it without help** — not pixel-perfect, but not confusing.
10. **Wire up analytics events** for the core flow per `ANALYTICS.md` event taxonomy before any real user touches it.
11. **Run the QA checklist (`QA_CHECKLIST.md`)** scoped to MVP — functional core flow, basic error handling, security basics. Skip cross-browser/accessibility depth at this stage unless target users require it.
12. **Deploy to a real, shareable URL** (not localhost). An MVP that only the builder can see isn't shipped.
13. **Share with 3-5 real target users** and observe/collect first reactions (feeds into `USER_TESTING.md`).
14. **Log learnings and decide next step**: kill, pivot, or proceed to `SHIPPING_V1.md`.

## Outputs / Deliverables

- Deployed, shareable MVP URL
- Source repo with documented stack decisions
- Core flow working end-to-end with analytics instrumented
- MVP scope doc (core flow + explicit non-goals list)
- Initial user reactions log (informal, feeds into user testing)
- Go/kill/pivot recommendation

## Common Pitfalls

- **Building the secondary features before the core flow works.** Always finish one end-to-end path before widening scope.
- **Polishing UI before validating the flow.** Pixel-perfect designs on an unvalidated flow waste time.
- **Skipping analytics until "later."** If it's not instrumented at MVP, you won't have data to decide go/kill.
- **No explicit non-goals list.** Without one, "MVP" silently grows into "V1" and never ships.
- **Choosing a new tool/library mid-build because of a blog post.** Lock the stack at step 4 and resist swapping unless truly blocked.
- **Treating MVP QA as optional.** Even an ugly MVP must not lose user data or crash on the core flow.
