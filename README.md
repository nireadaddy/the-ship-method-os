# The SHIP Method OS

**A Product Operating System for AI Builders**

> Build real products with AI — without being a developer.

---

## What This Is

The SHIP Method OS is a complete operating system — templates, SOPs, checklists, prompt libraries, product-type starter packs, and worked examples — for taking an idea from "I have a vague idea" to "I shipped a live product," using AI as your build partner instead of a development team.

It is not a course. It is not generic startup advice. It is the actual scaffolding professional product teams use, rewritten for non-technical builders working with AI tools — **ChatGPT, Claude, Gemini, Cursor, and Windsurf** — organized around one repeatable framework: **SHIP**.

Beginner friendly. AI friendly. Built to support SaaS products, CRM systems, membership sites, lead-generation websites, internal tools, directory websites, dashboards, and marketplace products.

## The SHIP Framework

| Letter | Phase | What You Do | Folder |
|---|---|---|---|
| **S** | Structure | Define business goals, requirements, scope, constraints, priorities — before building anything | [`01-STRUCTURE/`](./01-STRUCTURE) |
| **H** | Human Flow | Design user journeys, workflows, screens, and experiences — before generating code | [`02-HUMAN-FLOW/`](./02-HUMAN-FLOW) |
| **I** | Instruction | Turn flows into AI-ready specs, prompts, and implementation plans the AI can build from | [`03-INSTRUCTION/`](./03-INSTRUCTION) |
| **P** | Publish | Launch, collect feedback, iterate, scale | [`04-PUBLISH/`](./04-PUBLISH) |

The core insight: **AI is an extremely fast, extremely literal builder.** It does not fail because it can't code. It fails because the human skipped Structure and Human Flow and jumped straight to "build me an app." SHIP forces the thinking to happen in the right order, in writing, before a single prompt asks AI to generate anything.

## Who This Is For

- Non-technical founders building their first product
- Product Managers who want a repeatable AI-build process
- UX/UI Designers moving into full-stack "vibe coding"
- Marketers and solopreneurs shipping their own tools
- Freelancers who want a sellable, repeatable client process
- Startup teams standardizing how they brief AI tools
- Anyone doing "vibe coding" who wants fewer rebuilds and more ships

## AI Tool Compatibility

Every spec and prompt in this repo is written to work across the tools builders actually use:

| Tool | Role in the SHIP workflow |
|---|---|
| **ChatGPT** | Drafting Structure/Human Flow docs, running prompt chains, Custom GPT persona ("SHIP GPT") |
| **Claude** | Long-context spec drafting, Claude Projects as persistent knowledge base, code generation |
| **Gemini** | Fast iteration, Gemini Gems as persistent persona, multimodal screen/wireframe review |
| **Cursor** | Repo-aware code generation directly from `03-INSTRUCTION/` specs |
| **Windsurf** | Repo-aware code generation + Cascade multi-file workflows from the same specs |

See [`11-STANDARDS/CONTEXT_MANAGEMENT_STANDARDS.md`](./11-STANDARDS/CONTEXT_MANAGEMENT_STANDARDS.md) and [`07-PROMPTS/SHIP_GPT_PROMPTS.md`](./07-PROMPTS/SHIP_GPT_PROMPTS.md) for tool-specific setup.

**Zero-setup for coding agents:** this repo ships with `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and `.windsurfrules` at the root — identical copies of [`SHIP_AGENT_RULES.md`](./SHIP_AGENT_RULES.md). Cursor, Windsurf, Claude Code, and other agent-style tools auto-load whichever file they recognize, so the SHIP order is enforced the moment you open this folder — no copy-pasting a persona prompt required. Chat-only tools (ChatGPT/Gemini web) still need the manual Custom GPT / Gem setup in `SHIP_GPT_PROMPTS.md`.

## How to Use This Repository

1. Start with [`START-HERE.md`](./START-HERE.md) — the 10-minute orientation.
2. Run a new project through the four phase folders **in order**: `01-STRUCTURE` → `02-HUMAN-FLOW` → `03-INSTRUCTION` → `04-PUBLISH`.
3. Use [`05-SOP/`](./05-SOP) to run the process as a repeatable operating rhythm (solo or with a team).
4. If you're building a specific product type, grab its starter pack from [`06-TEMPLATES/`](./06-TEMPLATES) (CRM, membership, directory, lead-gen, dashboard, SaaS, internal tool, marketplace).
5. Use [`07-PROMPTS/`](./07-PROMPTS) any time you need to brief an AI tool — including [`SHIP_GPT_PROMPTS.md`](./07-PROMPTS/SHIP_GPT_PROMPTS.md) to set up a persistent AI coach.
6. Study [`08-EXAMPLES/`](./08-EXAMPLES) and [`09-CASE-STUDIES/`](./09-CASE-STUDIES) to see the whole method applied end-to-end.
7. Use [`10-LAUNCH/`](./10-LAUNCH) when you're ready to deploy, set up your domain, and wire up analytics.
8. Check [`11-STANDARDS/`](./11-STANDARDS) any time you're unsure how this repo expects you to name, write, version, or prompt.
9. Use [`12-DESIGN-SYSTEM/`](./12-DESIGN-SYSTEM) before generating any UI so AI output looks consistent, not generic.
10. Use [`13-TECH-STACK/`](./13-TECH-STACK) to pick and brief a stack before writing your `TECH_SPEC.md`.

## Start a New Project in One Command

```
node ship-cli/create.mjs
```

No `npm install`, no API key, nothing to sign up for — this is a zero-dependency script built for non-developers. It asks 3 short questions (project name, product type, which AI tool you use) and generates a ready-to-go project under `projects/<your-project>/`: a working app shell copied from `starter-kit/`, a pre-filled `docs/PROJECT.md`, the matching `06-TEMPLATES/` starter pack, a ready-to-paste first prompt, and `AGENTS.md`/`CLAUDE.md`/`.cursorrules`/`.windsurfrules` already in place. See [`ship-cli/README.md`](./ship-cli/README.md).

## Starter Kit (Working Code)

[`starter-kit/`](./starter-kit) is a real, runnable Next.js + Tailwind + shadcn-style app — not just docs. It ships with three working route groups on mock data, so you (or whoever you hand this to) can `npm install && npm run dev` and see a real product shell immediately:

| Route | What it is |
|---|---|
| `/sale` | Marketing/sales landing page (hero, problem, features, pricing, testimonials, FAQ) |
| `/member/login`, `/member/signup`, `/member/dashboard`, `/member/content`, `/member/billing`, `/member/settings` | Logged-in member area with sidebar nav |
| `/backoffice`, `/backoffice/users`, `/backoffice/content`, `/backoffice/settings` | Admin console for managing users and content |

It currently runs on mock data in `starter-kit/lib/mock-data.ts` — swapping that for real Supabase calls is the next step, per [`13-TECH-STACK/TECH_STACK.md`](./13-TECH-STACK/TECH_STACK.md) and [`03-INSTRUCTION/DATABASE_SPEC.md`](./03-INSTRUCTION/DATABASE_SPEC.md). See [`starter-kit/README.md`](./starter-kit/README.md) for setup.

## Repository Structure

```
THE SHIP METHOD OS/
├── README.md                         You are here
├── START-HERE.md                     10-minute orientation + quick-start path
├── LICENSE.md
├── CHANGELOG.md
│
├── 01-STRUCTURE/                     S — business goals, requirements, scope, priorities
│   ├── PROJECT.md
│   ├── BUSINESS_MODEL.md
│   └── FEATURE_MATRIX.md
│
├── 02-HUMAN-FLOW/                    H — journeys, flows, screens, UX
│   ├── HUMAN_FLOW.md
│   ├── USER_JOURNEY.md
│   └── INFORMATION_ARCHITECTURE.md
│
├── 03-INSTRUCTION/                   I — AI specs, prompts, implementation plans
│   ├── AI_BUILD_SPEC.md
│   ├── TECH_SPEC.md
│   ├── DATABASE_SPEC.md
│   └── PROMPTS.md                    Idea → Product Spec → UX Spec → Tech Spec → Build Plan → Code Gen
│
├── 04-PUBLISH/                       P — launch, feedback, iteration, scaling
│   ├── QA_CHECKLIST.md
│   ├── SEO_CHECKLIST.md
│   ├── ANALYTICS.md
│   └── LAUNCH_PLAN.md
│
├── 05-SOP/                           Repeatable operating procedures
│   ├── MVP_BUILD.md
│   ├── VALIDATING_IDEA.md
│   ├── USER_TESTING.md
│   ├── SHIPPING_V1.md
│   ├── FEEDBACK_LOOP.md
│   └── IMPROVING_PRODUCT.md
│
├── 06-TEMPLATES/                     Product-type starter packs
│   ├── CRM_TEMPLATE.md
│   ├── MEMBERSHIP_TEMPLATE.md
│   ├── DIRECTORY_TEMPLATE.md
│   ├── LEADGEN_TEMPLATE.md
│   ├── DASHBOARD_TEMPLATE.md
│   ├── SAAS_TEMPLATE.md
│   ├── INTERNAL_TOOL_TEMPLATE.md
│   └── MARKETPLACE_TEMPLATE.md
│
├── 07-PROMPTS/                       Role-based prompt libraries
│   ├── PRODUCT_PROMPTS.md
│   ├── UX_PROMPTS.md
│   ├── DEV_PROMPTS.md
│   ├── MARKETING_PROMPTS.md
│   └── SHIP_GPT_PROMPTS.md           Persona prompts: Custom GPT / Claude Project / Gemini Gem
│
├── 08-EXAMPLES/                      Worked end-to-end examples
│   ├── CRM_EXAMPLE/
│   ├── LEADGEN_EXAMPLE/
│   ├── MEMBERSHIP_EXAMPLE/
│   └── DIRECTORY_EXAMPLE/
│
├── 09-CASE-STUDIES/                  Narrative case studies
│   ├── CASE_01.md
│   └── CASE_02.md
│
├── 10-LAUNCH/                        Technical launch guides
│   ├── DEPLOY_TO_VERCEL.md
│   ├── DOMAIN_SETUP.md
│   └── ANALYTICS_SETUP.md
│
├── 11-STANDARDS/                     Repo conventions
│   ├── FOLDER_NAMING_STANDARDS.md
│   ├── DOCUMENTATION_STANDARDS.md
│   ├── VERSIONING_STANDARDS.md
│   ├── PROMPT_STANDARDS.md
│   ├── KNOWLEDGE_BASE_STANDARDS.md
│   └── CONTEXT_MANAGEMENT_STANDARDS.md
│
├── 12-DESIGN-SYSTEM/                 Design system for AI-built UI
│   ├── DESIGN_SYSTEM.md
│   ├── UI_COMPONENT_SPEC.md
│   └── DESIGN_TO_AI_PROMPTS.md
│
└── 13-TECH-STACK/                    Stack selection for non-developers
    ├── TECH_STACK.md
    ├── STACK_DECISION_MATRIX.md
    └── AI_STACK_PROMPTS.md
```

## Core Philosophy

> **Structure before Flow. Flow before Instruction. Instruction before code. Code before launch.**

Every file in this repository exists to enforce that ordering. Skipping a phase is the #1 reason AI-built products end up broken, scope-creeped, or unshippable.

## License

See [`LICENSE.md`](./LICENSE.md). This is a commercial product — see license terms before redistributing.

---

*The SHIP Method OS — v1.0*
