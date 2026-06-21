# Development Prompts (Architecture, Frontend, Backend, QA)

A copy-paste library spanning technical architecture, frontend scaffolding, backend endpoints, and testing. Replace every `[bracket]` before running.

**Critical note on Cursor/Windsurf:** these tools are repo-aware — they read whatever files are open or @-mentioned and use that as real context, not just text you typed. For every prompt below marked for Cursor/Windsurf, **open or @-mention the actual relevant files first** (schema files, existing similar components/endpoints, types, config) before running the prompt. Skipping this step turns a repo-aware tool into a worse version of a chat-only tool — you lose the entire advantage.

---

### Stack Selection Given Constraints
**Use when:** Starting a new product/module and need a justified stack recommendation rather than a default choice.
**Best tool(s):** Claude — best at weighing tradeoffs explicitly rather than recommending "whatever's trendy"; Gemini if you want it to ground recommendations in current ecosystem/pricing data.

```
Recommend a technical stack for [product description] given these constraints:

- Team: [size, skill level, e.g. "solo founder, strong in React, weak in backend/infra"]
- Timeline: [e.g. "MVP in 3 weeks"]
- Expected scale: [e.g. "under 1,000 users for 6 months, must not require a rewrite to hit 50k"]
- Budget: [e.g. "must stay under $50/month until revenue"]
- Must-haves: [e.g. "real-time updates, file uploads, auth, payments"]
- Anything ruled out already: [e.g. "no Kubernetes, no self-hosted DB ops"]

For each layer (frontend, backend, database, auth, hosting, payments if relevant), recommend ONE primary choice and justify it against the constraints above — not against generic best practice. Name one viable alternative and the specific condition under which you'd switch to it.

End with: the single biggest technical risk in this stack given the constraints, and how to mitigate it.
```

---

### Database Schema Generator from Requirements
**Use when:** You have feature/data requirements in plain English and need a normalized schema (tables, relationships, indexes) before writing migrations.
**Best tool(s):** Claude for the reasoning/normalization; Cursor/Windsurf if you want it generated as an actual migration file matching your existing schema conventions — @-mention your existing schema/migration files first.

```
Generate a database schema for the following requirements. Target database: [Postgres/MySQL/SQLite/etc.].

Requirements:
[describe the entities and relationships in plain English — e.g. "Users can belong to multiple workspaces. Each workspace has projects. Each project has tasks assigned to one user. Tasks have a status and due date. We need to track who changed a task's status and when."]

Existing schema conventions to follow: [if applicable — e.g. "all tables use UUID primary keys, snake_case, created_at/updated_at on everything" — or @-mention existing schema files]

Output:
1. Entity-relationship summary (one line per table: purpose + relationships)
2. Full schema as CREATE TABLE statements, with appropriate foreign keys, NOT NULL constraints, and indexes on foreign keys and any field likely to be filtered/sorted on
3. Note any many-to-many relationships and the join table needed
4. Flag any requirement that's ambiguous and state the assumption you made to resolve it
5. One soft-delete vs. hard-delete recommendation per table, with reasoning
```

---

### API Contract Generator
**Use when:** A feature needs a defined API contract (endpoints, request/response shapes, error codes) before frontend and backend work can proceed in parallel.
**Best tool(s):** Claude for a clean, complete first draft; Cursor/Windsurf if you want it matched to existing API conventions in the repo — @-mention an existing endpoint file as the style reference.

```
Generate an API contract for [feature name].

Requirements: [describe the feature and what data operations it needs]
Existing API conventions: [e.g. "REST, /api/v1/ prefix, camelCase JSON, errors as { error: { code, message } }" — or @-mention an existing route file to match style]
Auth model: [e.g. "Bearer JWT required on all routes except /public"]

For each endpoint, output:
- Method + path
- Auth required (yes/no, required role/permission)
- Request body schema (with types and which fields are required vs optional)
- Success response shape + status code
- Error responses: list each realistic error case with status code and error code/message
- Rate limiting or idempotency notes if relevant (e.g. for POST/payment endpoints)

Cover all CRUD operations needed plus any non-CRUD actions (e.g. "archive", "bulk update"). End with a note on any endpoint that needs pagination and your recommended pagination style (cursor vs offset) with reasoning.
```

---

### Frontend Component Scaffold from UI Spec
**Use when:** You have a UI spec/design (from Figma, a screenshot, or a written description) and need a working component scaffold.
**Best tool(s):** Cursor or Windsurf — strongly preferred here since they can match your actual component patterns, prop conventions, and styling system live in the repo. Open/@-mention an existing similar component plus your design tokens/theme file before running.

```
Scaffold a [React/Vue/Svelte — specify] component for: [component name/purpose].

Spec: [paste description, or attach screenshot/Figma export]
Props needed: [list expected props and types, or say "infer from spec"]
States to handle: [e.g. loading, error, empty, disabled — list which apply]

Match these existing conventions (reference the open/@-mentioned files):
- Styling approach: [Tailwind / CSS modules / styled-components — match @[existing component]]
- Component structure pattern: match @[existing similar component] for file organization, naming, and prop destructuring style
- Accessibility: include proper ARIA attributes and keyboard handling for any interactive elements

Output the full component code plus a one-line usage example. Do not introduce a new styling approach or state management pattern not already used in the files I've shown you — flag it instead if you think the existing pattern is wrong for this case.
```

---

### Backend Endpoint Scaffold with Validation
**Use when:** You need to implement a backend endpoint with proper input validation, error handling, and auth checks matching existing patterns.
**Best tool(s):** Cursor or Windsurf — repo awareness matters a lot here for matching validation library, error format, and auth middleware already in use. @-mention an existing endpoint plus your validation schema file before running.

```
Implement the [METHOD] [/path] endpoint for [feature/purpose].

Behavior: [describe what the endpoint should do]
Input: [request body/params/query — list fields and types]
Auth: [who can call this — match the auth middleware pattern in @[existing endpoint file]]
Validation rules: [list business rules, e.g. "email must be unique", "amount must be positive", "date cannot be in the past"]

Match these existing conventions from the open files:
- Validation library/approach already used in this codebase
- Error response format already used (status codes + error body shape)
- Database access pattern already used (ORM/query builder/raw SQL — match what's there)
- Logging pattern, if one exists

Requirements:
- Validate all inputs before any database/business logic runs; return 400 with field-level errors on validation failure
- Handle the "not found" and "forbidden" cases explicitly, not just the happy path
- Make the database operation atomic if it involves more than one write (transaction)
- Add a comment marking any place you made an assumption due to missing information

Output the full implementation plus the validation schema if a separate file/object is the convention here.
```

---

### Test Cases from Acceptance Criteria
**Use when:** A ticket has acceptance criteria and you need a complete test plan (and/or actual test code) before or during implementation.
**Best tool(s):** Claude for thorough test-case enumeration; Cursor/Windsurf if you want runnable test code matching your existing test framework/conventions — @-mention an existing test file first.

```
Generate test cases from these acceptance criteria for [feature/ticket name].

Acceptance criteria:
[paste the Given/When/Then criteria or plain-language AC]

Test framework in use: [Jest/Vitest/Pytest/etc. — or @-mention an existing test file to match style/conventions]

Output:
1. A test case table: Test ID | Description | Type (happy path/edge case/negative) | Given | When | Then | Priority (P0/P1/P2)
2. Explicitly include: at least one negative test per input field, one boundary value test, one concurrent/race-condition test if the feature involves shared state, and one permission/auth test if relevant
3. Then write the actual test code for all P0 cases, matching the framework and conventions shown/specified

Do not skip edge cases just because the acceptance criteria didn't mention them — flag any edge case you added that wasn't explicitly in the AC, and why you think it matters.
```

---

### Bug Report Generator from Description
**Use when:** Someone reports a bug informally (Slack message, voice note transcript, vague complaint) and you need it turned into a structured, reproducible bug report.
**Best tool(s):** ChatGPT or Claude — both handle this well; use Cursor/Windsurf if you also want it to point at the likely culprit file/function by searching the open codebase.

```
Convert this informal bug report into a structured ticket.

Raw report: [paste the Slack message/email/voice transcript/whatever was said]
Product area: [where in the product this likely occurred]
Reporter context: [user role, plan tier, browser/device if known]

Output:
1. Title (specific, searchable — not "app broken")
2. Severity (Blocker/Major/Minor/Cosmetic) with one-line justification
3. Steps to reproduce (numbered, as specific as the raw report allows — mark any step you had to infer)
4. Expected behavior
5. Actual behavior
6. Environment (browser/OS/device, account type — fill what's known, mark unknown)
7. Information still needed from the reporter to fully reproduce (if any)

If the raw report is too vague to produce real repro steps, say so explicitly rather than inventing plausible-sounding steps — list the 2-3 clarifying questions needed instead.
```

---

### AI-Generated Code Review
**Use when:** You (or another AI tool) generated a chunk of code and need a critical review before merging — specifically catching AI-typical failure modes (hallucinated APIs, missed edge cases, over-engineering).
**Best tool(s):** Claude — best at catching subtle correctness issues and over-engineering without being deferential to "AI wrote this so it must be fine"; run this as a second model/fresh context from whatever generated the code originally, never the same conversation.

```
Review this code as a skeptical senior engineer. It was AI-generated, so check specifically for AI-typical failure modes, not just general code quality.

Code:
[paste code]

Context: [what this code is supposed to do, what it's called by/calls]

Check specifically for:
1. Hallucinated APIs/methods — does every library call actually exist with these parameters? Flag anything you're not certain is real.
2. Missing error handling — what happens on null/undefined/empty input, network failure, or unexpected types?
3. Over-engineering — is there abstraction or configurability here that nothing in this codebase actually needs yet?
4. Silent failure modes — anywhere that swallows an error or returns a default that masks a real problem
5. Security — injection risk, missing auth check, secrets/credentials handling, unvalidated user input reaching a sensitive operation
6. Whether this duplicates logic that likely already exists elsewhere in the codebase (flag for me to check, since you may not have full repo visibility)

Output: a numbered list of issues by severity (Blocker/Major/Minor), each with the exact line/snippet and the fix. End with a one-line merge recommendation: merge as-is / merge with required fixes / do not merge.
```

---

### Refactor for Clarity
**Use when:** Working code has accumulated complexity (deep nesting, unclear names, duplicated logic) and needs a clarity-focused refactor without changing behavior.
**Best tool(s):** Cursor or Windsurf strongly preferred — refactors are far safer when the tool can see and update all call sites across the repo. @-mention every file that calls the function/component being refactored, not just the file itself.

```
Refactor this code for clarity. Do not change its external behavior — same inputs must produce same outputs.

Code:
[paste code, or @-mention the file]

Known call sites: @[list every file that imports/calls this, so the refactor doesn't break them — or instruct: "search the codebase for all usages before changing the signature"]

Refactor goals, in priority order:
1. Reduce nesting depth (extract guard clauses / early returns)
2. Name things by what they mean, not what they do mechanically (e.g. not `processData` — name the actual transformation)
3. Eliminate duplicated logic by extracting shared helpers — but only if duplicated 3+ times; don't over-abstract 2 occurrences
4. Shorten functions that do more than one job — split by responsibility, not arbitrarily by line count

Constraints:
- If you change a function signature, update every call site shown to you
- Do not introduce new dependencies/libraries
- Do not "improve" things outside the stated goals (no drive-by changes to unrelated code)
- After the refactor, list what behavior you verified is unchanged and what you couldn't verify without running tests
```

---

### Technical Debt Audit Prompt
**Use when:** Before a sprint planning session, you want a structured pass identifying the highest-leverage technical debt to pay down, rather than vague "the code is messy" sentiment.
**Best tool(s):** Cursor or Windsurf — needs real repo access to be useful at all; open/@-mention the directory or key files for the area under review.

```
Audit [module/directory/feature area] for technical debt. I want a prioritized list, not a general complaint.

Files in scope: @[mention the relevant files/directories]
Known pain points already felt by the team: [list any, e.g. "this file gets touched in almost every PR and breaks something unrelated"]

For each piece of debt found, output:
- Location (file/function)
- What's wrong (specific, not "messy")
- What it's costing us concretely (e.g. "every new endpoint duplicates this validation logic", "this function has 4 unrelated responsibilities making it untestable")
- Effort to fix (S/M/L)
- Risk of NOT fixing it soon (does it compound, or is it static?)

Rank the list by (cost × compounding risk) / effort — highest first. Limit to the top 8 so this is actionable, not exhaustive.
```

---

## Compatibility Notes

| Tool | Strengths | How to feed context | Gotchas |
|---|---|---|---|
| ChatGPT | Fast for bug report cleanup, quick architecture sanity checks, general scripting help | Paste code/specs directly; use Code Interpreter if you want it to actually execute snippets | Has no awareness of your actual repo — will invent plausible-but-wrong file/API names if asked about "your codebase" without you pasting it |
| Claude | Best for schema/API contract design, deep code review, and refactor reasoning that requires holding a lot of logic in mind at once | Paste full files or multiple related files in one message — handles long technical context well | Without explicit "use only real APIs" instruction, can still occasionally hallucinate niche library methods — verify anything unfamiliar |
| Gemini | Good for stack research grounded in current ecosystem/pricing info, large multi-file pastes | Paste multiple files/docs at once; useful for cross-referencing many docs simultaneously | Output structure (tables, schemas) needs more explicit formatting instructions than Claude/ChatGPT |
| Cursor | The right tool whenever code needs to match real, existing repo conventions — components, endpoints, refactors, debt audits | @-mention specific files (not just "the codebase") so the model reads real content, not summaries; open the file you're editing plus 1-2 reference files | Will confidently match wrong patterns if the wrong reference file is open — close unrelated/stale files before running |
| Windsurf | Same core strength as Cursor — repo-aware scaffolding and refactors with multi-file awareness | Use its codebase-wide search/context features to confirm all call sites before a refactor, not just what's open | Multi-file edits should be reviewed file-by-file before accepting — don't blanket-accept a sweeping refactor across many files unread |
