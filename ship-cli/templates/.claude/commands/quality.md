---
description: Code quality review — TypeScript strictness, component hygiene, duplication, dead code. Run after /pentest.
argument-hint: "[types | components | duplication | dead-code | all — leave blank for all]"
---

You are doing a code quality pass before launch. Find and fix what will slow down the next developer (or the next AI session). Report only what needs fixing — not what's already clean.

Read `docs/PROJECT.md` Section 9 for UI language — use it for all responses.

Argument: "$ARGUMENTS"

## Quality checks

### 1 — TypeScript
Run:
```bash
npx tsc --noEmit
```
Fix every type error. If `any` types exist, replace with proper types where the shape is known. Acceptable to keep `any` only where the type genuinely cannot be known at compile time — leave a comment explaining why.

### 2 — Linting
Run:
```bash
npm run lint
```
Fix all errors. For warnings, fix those that indicate real problems (unused vars, missing deps in useEffect). Suppress warnings that are intentional with inline comments explaining why.

### 3 — Component hygiene
Scan all files under `app/` and `components/`:
- Components over 200 lines → split into smaller components
- Props that are passed down 3+ levels → consider moving to context or co-location
- Hardcoded strings that should be constants or config → extract them
- Inline styles (`style={{}}`) → replace with Tailwind classes

### 4 — Duplication
Find blocks of code that appear 3+ times and are more than 5 lines:
- Extract to a shared utility function in `lib/`
- Extract to a shared component in `components/`
- Report what was extracted and where

### 5 — Dead code
Find and remove:
- Unused imports in every file
- Unused exported functions or components (grep for their names — if nothing imports them, delete)
- Commented-out code blocks older than the current feature (not TODO comments — actual dead code)
- `console.log` statements left in production code

### 6 — Build check
Run a final build to confirm all fixes compile cleanly:
```bash
npm run build
```
Must exit with status 0 before this phase is complete.

## Reporting
After each check area, report:
- What was found and fixed
- Anything intentionally left as-is and why

## Done
*"Code quality ผ่านแล้ว — พร้อม launch แล้ว type `/launch`"* / *"Code quality done — ready to ship, type `/launch`."*
