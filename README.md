<h1 align="center">🚢 The SHIP Method OS</h1>

<p align="center">
  <strong>A Product Operating System for AI Builders</strong><br/>
  Build real products with AI — without being a developer.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ship-create"><img src="https://img.shields.io/npm/v/ship-create?color=0ea5e9&label=ship-create" alt="npm version"/></a>
  <a href="https://www.npmjs.com/package/ship-create"><img src="https://img.shields.io/npm/dm/ship-create?color=38bdf8&label=downloads" alt="npm downloads"/></a>
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white" alt="Next.js 15"/>
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen?logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/AI-Claude%20%7C%20GPT%20%7C%20Gemini-a855f7" alt="AI Tools"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/nireadaddy/the-ship-method-os/feat/blueprint-gallery-demos/ship-cli/demo.gif" alt="ship-create demo" width="700"/>
</p>

---

## ⚡ Start in One Command

From any empty folder, anywhere:

```bash
npx ship-create
```

No git clone. No API key. No signup. It asks 5 quick questions (arrow-key, no typing) and scaffolds a full Next.js 15 project — with your idea already in the docs, Claude Code rules pre-configured, and slash commands ready to guide you from prototype to launch.

---

## 🧭 The SHIP Framework

The core insight: **AI is an extremely fast, extremely literal builder.** It fails not because it can't code — it fails because the human skips thinking and jumps straight to "build me an app." SHIP forces the right thinking to happen in writing, in the right order, before a single line of code is generated.

| Letter | Phase | What You Do |
|--------|-------|-------------|
| **S** | Structure | Define business goals, requirements, scope, constraints — before building anything |
| **H** | Human Flow | Design user journeys, screens, and experiences — before generating code |
| **I** | Instruction | Turn flows into AI-ready specs and implementation plans |
| **P** | Publish | Launch, collect feedback, iterate, scale |

---

## 🛠️ What `npx ship-create` Sets Up

A new project folder with everything pre-wired:

| What | Details |
|------|---------|
| **Working app shell** | Next.js 15 + Tailwind CSS v4 + shadcn/ui — sale page, member area, backoffice |
| **Docs pre-filled** | `docs/PROJECT.md` with your product type, language, revenue model, and idea |
| **Agent rules** | `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.windsurfrules` — SHIP order enforced automatically |
| **Slash commands** | `/build` → `/foundation` → `/features` → `/polish` → `/uat` → `/pentest` → `/quality` → `/launch` |

### 🚀 Slash commands — from idea to launch

| Command | What it does |
|---------|-------------|
| `/build` | Claude builds prototype automatically from your idea |
| `/foundation` | Wire auth (Clerk), database (Supabase), payments (Stripe) |
| `/features` | Build features one at a time from the spec |
| `/polish` | Responsive, empty states, SEO, performance |
| `/uat` | Full user acceptance testing |
| `/pentest` | Security audit — OWASP Top 10 |
| `/quality` | TypeScript, lint, dead code, duplication |
| `/launch` | Deploy to Vercel, domain, analytics 🚀 |

---

## 🤖 AI Tool Compatibility

Works with the tools builders actually use:

| Tool | How it fits in |
|------|---------------|
| **Claude Code** | Primary build agent — reads CLAUDE.md + slash commands automatically |
| **Cursor** | Reads `.cursorrules` on open — full SHIP spec awareness |
| **Windsurf** | Reads `.windsurfrules` — same spec, different editor |
| **ChatGPT / Gemini** | Doc drafting, idea refinement, prompt chain reference |

---

## 👥 Who This Is For

- Non-technical founders building their first product
- Product Managers who want a repeatable AI-build process
- UX/UI Designers moving into full-stack "vibe coding"
- Marketers and solopreneurs shipping their own tools
- Freelancers who want a sellable, repeatable client process
- Anyone doing "vibe coding" who wants fewer rebuilds and more ships

---

## 📦 Tech Stack (per generated project)

| Layer | Tool |
|-------|------|
| Framework | [Next.js 15](https://nextjs.org) App Router |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com) |
| Auth | [Clerk](https://clerk.com) |
| Database | [Supabase](https://supabase.com) + Drizzle ORM |
| Payments | [Stripe](https://stripe.com) |
| Deploy | [Vercel](https://vercel.com) |

---

## 🗂️ Repository Structure

```
THE SHIP METHOD OS/
├── ship-cli/              npx ship-create — the scaffolder (published to npm)
├── starter-kit/           Working Next.js app shell (sale, member, backoffice)
│
├── 01-STRUCTURE/          S — business goals, requirements, scope
├── 02-HUMAN-FLOW/         H — user journeys, screens, UX flows
├── 03-INSTRUCTION/        I — AI specs, prompts, implementation plans
├── 04-PUBLISH/            P — launch, QA, analytics, feedback
│
├── 05-SOP/                Repeatable operating procedures
├── 06-TEMPLATES/          Product-type starter packs (SaaS, CRM, Membership…)
├── 07-PROMPTS/            Role-based prompt libraries
├── 08-EXAMPLES/           Worked end-to-end examples
├── 09-CASE-STUDIES/       Narrative case studies
├── 10-LAUNCH/             Deploy guides — Vercel, domain, analytics
├── 11-STANDARDS/          Repo conventions — naming, versioning, prompts
├── 12-DESIGN-SYSTEM/      Design system for AI-built UI
└── 13-TECH-STACK/         Stack selection for non-developers
```

---

## 🧱 Core Philosophy

> **Structure before Flow. Flow before Instruction. Instruction before code. Code before launch.**

Every file in this repository exists to enforce that ordering. Skipping a phase is the #1 reason AI-built products end up broken, scope-creeped, or unshippable.

---

## 📄 License

See [`LICENSE.md`](./LICENSE.md). Commercial product — see license terms before redistributing.

---

<p align="center">Built with ❤️ — <a href="https://www.npmjs.com/package/ship-create">npm install ship-create</a></p>
