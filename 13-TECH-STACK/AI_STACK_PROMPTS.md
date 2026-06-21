# AI_STACK_PROMPTS.md

**Phase:** S — Structure
**Purpose:** A copy-paste prompt library for going from "I have an idea" to "I have a stack, an architecture, a schema, and a deployment plan" — written for someone vibe-coding with no developer background. Every prompt tells you exactly what to type and what to paste/attach. Replace every `[bracket]` before running. Use alongside `TECH_STACK.md` (what each tool is) and `STACK_DECISION_MATRIX.md` (which tools for which product type).

> **If you've never written a technical prompt before:** these are designed to be pasted exactly as-is, with only the bracketed parts filled in using plain, everyday language — no code, no jargon required from you. The AI will ask clarifying questions if something is missing; answer in plain English.

---

### Choosing a Tech Stack (Given Constraints)
**Use when:** You have an idea but no stack decided yet, and want a justified recommendation instead of guessing.
**Best tool(s):** Claude — best at weighing tradeoffs honestly instead of recommending whatever's trendy; Gemini if you also want current pricing/ecosystem grounding.

```
I am not a developer. I'm building [describe your product idea in plain English — what it does and who it's for].

Help me choose a tech stack. Here's what I know:
- My skill level: [e.g. "no coding background, using AI tools to build everything"]
- Timeline: [e.g. "want something live in 4 weeks"]
- Budget: [e.g. "under $50/month until I have paying customers"]
- Expected number of users in the first 6 months: [rough number]
- Things this product MUST have: [e.g. "user accounts, payments, file uploads"]
- Things I want to avoid: [e.g. "no servers I have to manage myself"]

Please:
1. Recommend ONE specific tool for each layer (website/frontend, database/backend, login/auth, hosting, payments if needed) — name actual products, not categories
2. Explain WHY each one fits MY situation specifically, not generic best practice
3. Tell me the single biggest risk with this stack given my constraints, and how to avoid it
4. Confirm whether this matches the default stack in this project's TECH_STACK.md, and if not, why you're recommending something different

Explain everything in plain language — assume I will hand your answer to another AI tool to actually build it, not that I'll read the code myself.
```

---

### Generating an Architecture Overview
**Use when:** Before any building starts — you need a plain-English map of how the pieces of your product connect, to sanity-check it and to brief your build tools later.
**Best tool(s):** Claude — best at producing a clear, logically consistent system overview; good to also run through ChatGPT for a second opinion.

```
I'm building [product name/description] using this stack: [paste your stack, e.g. "Next.js, Tailwind, shadcn/ui, Supabase, Stripe, Resend" — or say "use the default stack from TECH_STACK.md"].

Generate a plain-English architecture overview I can use to brief other AI tools and sanity-check the plan myself.

Include:
1. A simple diagram-in-words: what talks to what (e.g. "browser → Next.js app → Supabase database" and "Next.js app → Stripe for payments → webhook back to Supabase")
2. For each major piece, one sentence on what it's responsible for and what it's NOT responsible for
3. The 3-5 most important data flows in the product (e.g. "what happens, step by step, when a user signs up" / "what happens when a payment is made")
4. Anything in my stack choice that seems mismatched to my product, and why

Write this so someone with zero technical background can read it and catch a mistake (like "wait, why does the email tool need access to payment data?") — avoid unexplained jargon.
```

---

### Generating a Database Schema
**Use when:** You know what data your product needs to store and need it turned into actual tables before any building happens.
**Best tool(s):** Claude for the reasoning and normalization; Cursor/Windsurf if you want it written directly as a Supabase migration file — open/@-mention your project folder first so it matches existing conventions.

```
I'm building [product name] and need a database schema. I'm not a developer — describe things back to me in plain English before showing code.

What this product needs to store, in my own words:
[describe every type of "thing" your product tracks and how they relate — e.g. "Users can create projects. Each project has tasks. Each task is assigned to one user and has a status (todo/in progress/done) and a due date. I need to know who changed a task's status and when."]

Database: PostgreSQL (via Supabase)

Please:
1. First, restate my data back to me as a simple list of "tables" and what each one is for, in plain English — let me confirm this is right before generating code
2. Then generate the actual SQL to create these tables, with relationships (foreign keys) between them
3. Tell me which fields should be required vs. optional, and why
4. Flag anything I described that was ambiguous, and tell me what assumption you made
5. Recommend Row Level Security (RLS) policies for who can see/edit each table, in plain English first, then as SQL
```

---

### Generating an API Plan
**Use when:** You need to define what actions your app's backend needs to support (create/read/update/delete things, special actions like "send invite" or "cancel subscription") before handing off to a build tool.
**Best tool(s):** Claude for a clean, complete first pass; Cursor/Windsurf to match it to Supabase's auto-generated API conventions if you're using Supabase directly instead of custom API routes.

```
I'm building [product name] using [Next.js + Supabase / your stack]. I'm not a developer — explain in plain English first.

Here's what users need to be able to DO in this product:
[list every action in plain English — e.g. "create an account, create a project, invite a teammate to a project, mark a task done, cancel their subscription, delete their account"]

Please:
1. Group these into a simple list: for each "thing" (project, task, etc.) — what can be created, viewed, edited, deleted, and by whom
2. For any action that's more than basic CRUD (e.g. "invite a teammate", "cancel subscription"), describe what needs to happen step by step
3. Tell me which of these Supabase can handle automatically (its auto-generated API) vs. which need a custom backend function, and why
4. List anything that needs special permission checks (e.g. "only the project owner can delete it") so I make sure those are enforced at the database level, not just hidden in the UI
```

---

### Generating a Frontend Folder/Component Structure
**Use when:** Before scaffolding begins — you want a sensible file/folder layout and component breakdown so Cursor/Windsurf builds something organized instead of one giant file.
**Best tool(s):** Cursor or Windsurf — preferred since they can actually create the folder structure live in your project; Claude if you just want the plan written out first to review.

```
I'm building [product name] using Next.js (App Router), Tailwind, and shadcn/ui. I'm not a developer — explain folder/file choices in plain English.

Pages/screens this product needs: [list, e.g. "landing page, login, signup, dashboard, settings, a project detail page"]
Shared UI elements used across screens: [list, e.g. "navigation bar, a card component for projects, a modal for confirmations"]

Please:
1. Propose a folder structure (which folders, what goes in each, named simply — e.g. "/app/dashboard — the main dashboard page")
2. List the components I'll need as reusable pieces vs. ones that are page-specific, and explain the difference in plain English
3. Briefly explain why this structure scales as I add more screens later (so I don't have to restructure everything when the product grows)
4. If using Cursor/Windsurf: actually create this folder/file structure now with placeholder content in each file, so I can see it in my project
```

---

### Generating an Auth Flow
**Use when:** You need to plan exactly how sign-up, login, password reset, and access control will work before building it — especially the "who can see what" part, which is the easiest thing to get wrong.
**Best tool(s):** Claude for the planning/reasoning on access rules; Cursor/Windsurf to implement it against your actual Supabase project — @-mention your schema file first.

```
I'm building [product name] using Supabase Auth. I'm not a developer — explain access rules back to me in plain English before showing code so I can catch mistakes.

How users sign up/log in: [e.g. "email + password, plus Google login"]
What happens right after signup: [e.g. "they land on an onboarding screen", "they're added to a free trial automatically"]
Who can see/do what (describe every role even if there's only one): [e.g. "anyone logged in can see their own data only; an 'admin' role can see everyone's data"]
Pages that should NOT be accessible without logging in: [list]

Please:
1. Restate my access rules back in plain English as a simple table: Role | Can do this | Cannot do this — let me check this before you write any code
2. Then generate the actual auth setup code and the route protection logic
3. Generate the Row Level Security (RLS) policies in Supabase matching this table exactly
4. Tell me the #1 mistake people make when setting this up (e.g. forgetting to actually enable RLS on a table) and how to verify I avoided it
```

---

### Generating a Deployment Plan
**Use when:** Your product works locally/in development and you're ready to put it live on the internet for the first time, or for an upcoming launch.
**Best tool(s):** Claude or ChatGPT for the plan itself; Cursor/Windsurf if you want help editing actual config files (env vars, build settings) to match.

```
I'm ready to deploy [product name] to Vercel for the first time. Stack: [e.g. "Next.js + Supabase + Stripe + Resend" or paste your stack].

I'm not a developer — walk me through this like I've never deployed anything before.

Please give me:
1. A checklist of everything I need BEFORE deploying (accounts to create, API keys/environment variables to collect, and exactly where in each tool's dashboard to find them)
2. The exact steps to connect my project to Vercel and trigger the first deploy
3. What "going live" actually changes (e.g. "Stripe needs to switch from test mode to live mode — here's how and what to check first")
4. A short list of things to manually test on the LIVE site right after deploying (not just locally) — e.g. "actually sign up with a real email and confirm the welcome email arrives"
5. What to do if something breaks after deploying — the simplest way to undo the deploy and go back to the last working version
```

---

### Generating a Security Checklist
**Use when:** Before launch, or before handling real user data/payments — a final pass to catch the most common, costly mistakes non-developers make when shipping with AI-generated code.
**Best tool(s):** Claude — most thorough and direct about flagging real risk rather than giving generic reassurance; run this fresh, not in the same conversation that built the feature, for an unbiased check.

```
I'm about to launch [product name]. Stack: [paste your stack]. I'm not a developer, so assume I won't catch subtle security issues myself — be direct and specific, not generic.

What this product handles: [e.g. "user accounts, payment info via Stripe, uploaded files, an admin role that can see other users' data"]

Please give me a security checklist specific to MY product, not a generic list. For each item, tell me exactly what to check and where (e.g. "in your Supabase dashboard, go to Authentication > Policies and confirm RLS is ENABLED, not just that policies exist — these are different things and it's the #1 mistake").

Cover at minimum:
1. Row Level Security — is it actually enabled on every table with sensitive data, and do the policies match who should see what
2. Are any API keys or secrets exposed in frontend code instead of kept server-side only
3. Is user input (forms, file uploads) validated before it reaches the database, not just validated in the UI
4. Are Stripe webhooks verified (checking the signature) so anyone can't fake a "payment succeeded" event
5. Is there a way for one user to access another user's data by guessing/changing an ID in the URL
6. Are error messages shown to users leaking internal details (database errors, stack traces) that shouldn't be public

End with a plain-English severity ranking: which issues would let someone steal data or money (fix before launch, no exceptions) vs. which are lower-risk and can be fixed shortly after.
```

---

## Compatibility Notes

| Tool | Strengths | How to feed context | Gotchas |
|---|---|---|---|
| ChatGPT | Fast for first-draft architecture sanity checks, general explanations in plain language | Paste your idea/constraints directly into chat | Has no awareness of your actual project files — will sound confident about "your database" or "your code" even if it's never seen them; always paste the real thing |
| Claude | Best for stack selection, schema design, security checklists, and anything requiring honest tradeoff reasoning rather than flattery | Paste full context in one message (constraints, requirements, existing schema) — handles long, detailed prompts well | Will still occasionally invent a plausible-sounding but nonexistent library feature — ask it to flag anything it's not fully certain is real |
| Gemini | Good for stack research grounded in current pricing/ecosystem info, and digesting multiple long documents at once | Paste or attach multiple docs/files together if comparing options | Needs more explicit formatting instructions (tables, headers) than Claude to produce clean output |
| Cursor | The right tool once you're ready to actually generate files/folders/code that need to match your real project | @-mention actual files/folders in your project (not just describe them) so it reads real content | If you haven't opened/@-mentioned the right files, it will guess at conventions instead of matching what's really there — always reference real files for anything beyond a first draft |
| Windsurf | Same core strength as Cursor — best when code must match and update your actual project structure | Use its codebase-wide search to confirm context before big changes (e.g. before an auth flow touches many files) | Review multi-file changes file-by-file before accepting — don't accept a big change you haven't actually looked at, even if you can't read code, ask it to explain each file's change in plain English first |

---

**Next step:** Run these prompts in order — stack, architecture, schema, API plan, frontend structure, auth flow — before writing a single line of implementation code. Save the outputs; they become the brief you hand to Cursor/Windsurf. Run the Security Checklist prompt again right before launch, not just once during planning.
