# 🚢 ship-create

[![npm version](https://img.shields.io/npm/v/ship-create?color=0ea5e9&label=npm)](https://www.npmjs.com/package/ship-create)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen?logo=node.js&logoColor=white)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![Bun](https://img.shields.io/badge/Bun-ready-f9f1e1?logo=bun&logoColor=black)](https://bun.sh)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Scaffold a new product the SHIP Method way — idea → prototype in minutes. No API key, no config, no git clone. One command.

![ship-create demo](https://raw.githubusercontent.com/nireadaddy/the-ship-method-os/main/ship-cli/demo.gif)

---

## ⚡ Run It

From anywhere — an empty folder, your Desktop, wherever you want the project to land:

```bash
npx ship-create
```

That's it. You need [Node.js 18+](https://nodejs.org) installed. If `node -v` works in your terminal, you're ready.

> Prefer a permanent global command? `npm install -g ship-create`, then just type `ship-create`.

---

## 🎯 What It Asks

The CLI walks you through 5 quick picks — all arrow-key, no typing required:

| Step | Question |
|------|----------|
| 1 | **Language** — English or ภาษาไทย |
| 2 | **Product type** — SaaS, CRM, Membership, Landing page, Directory, Dashboard, Internal tool, or Marketplace |
| 3 | **Revenue model** — Subscription, One-time, Freemium, Marketplace fee, or Free |
| 4 | **Project name** — e.g. "Acme CRM" |
| 5 | **Idea** — one sentence describing what it does |

Then it scaffolds everything and Claude builds your prototype automatically.

---

## 📦 What It Creates

A new folder `<your-project-slug>/` containing:

- **Full starter-kit** — Next.js 16 app with sale page, member area, and backoffice (working code, Tailwind CSS v4 + shadcn/ui)
- **Agent rules** — `CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.windsurfrules` so Claude Code / Cursor / Windsurf all pick up the SHIP order automatically
- **`docs/PROJECT.md`** — pre-filled with your product type, language, revenue model, and idea
- **`docs/HUMAN_FLOW.md`** — screen-by-screen user journey template
- **`docs/PROMPTS.md`** — the full SHIP prompt chain for reference
- **`.claude/commands/`** — slash commands for every phase of the build journey

### 🛠️ Slash commands included

Once you open the project in Claude Code, these commands guide you from prototype to launch:

| Command | What it does |
|---------|-------------|
| `/build` | Build prototype automatically from your idea (runs on first open) |
| `/foundation` | Wire auth (Clerk), database (Supabase), payments (Stripe) |
| `/features` | Build features one at a time from the spec |
| `/polish` | Responsive, empty states, SEO, performance |
| `/uat` | Full user acceptance testing — happy path, edge cases, mobile |
| `/pentest` | Security audit — OWASP Top 10, auth, data exposure, headers |
| `/quality` | Code quality — TypeScript, lint, duplication, dead code |
| `/launch` | Deploy to Vercel, domain, analytics, go live 🚀 |

---

## 🤔 Why No API Key?

If you already pay for Claude Pro, ChatGPT Plus, or Gemini Advanced, requiring a separate API key adds friction for no reason. Instead, the CLI sets up your project so Claude Code (or whichever AI tool you use) takes over the moment you open the folder — no extra signup, no extra billing.

---

## 🔁 Re-running

The CLI refuses to overwrite an existing `<slug>/` folder — pick a different project name, or delete the old folder first if you want to start over.

---

## 🏗️ Tech Stack

Projects created with `ship-create` use this stack by default:

| Layer | Tool |
|-------|------|
| Framework | [Next.js 16](https://nextjs.org) (App Router + Turbopack) |
| Package manager | [Bun](https://bun.sh) → pnpm → npm (auto-detected) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com) |
| Auth | [Clerk](https://clerk.com) (wired by `/foundation`) |
| Database | [Supabase](https://supabase.com) + Drizzle ORM |
| Payments | [Stripe](https://stripe.com) |
| Deploy | [Vercel](https://vercel.com) |

---

## 🏠 ship-membership — White-label Membership Backend

The SHIP Method OS also includes [`ship-membership/`](https://github.com/nireadaddy/the-ship-method-os/tree/main/ship-membership) — a ready-to-deploy membership backend you can white-label for your own product. Think WordPress admin, but for your SaaS.

| What | Details |
|------|---------|
| **Admin panel** | `/admin` — MRR, member list, content manager, settings |
| **Member portal** | `/dashboard`, `/content`, `/billing` |
| **Public site** | Landing page + pricing, reads from `config.ts` |
| **Payments** | Stripe subscriptions with webhook handler |
| **Auth** | Clerk |
| **Config** | One file (`config.ts`) to white-label everything |

AI-guided setup via slash commands:
- `/setup` — Clerk → Supabase → Stripe → local test, step by step
- `/go-live` — Vercel deploy → env vars → Stripe webhook → smoke test
- `/add-content` — add gated content interactively
- `/add-plan` — add a new Stripe plan end-to-end

---

## 🔧 Maintaining This Package

This folder lives inside the `the-ship-method-os` repo but publishes as a separate public package. If the source templates change, re-sync and publish:

```bash
# from the repo root
cp -R starter-kit ship-cli/templates/starter-kit
rm -rf ship-cli/templates/starter-kit/{node_modules,.next,package-lock.json,next-env.d.ts,tsconfig.tsbuildinfo}
cp 01-STRUCTURE/PROJECT.md 02-HUMAN-FLOW/HUMAN_FLOW.md 03-INSTRUCTION/PROMPTS.md ship-cli/templates/docs/
cp 06-TEMPLATES/*.md ship-cli/templates/docs/product-types/
cp AGENTS.md CLAUDE.md .cursorrules .windsurfrules ship-cli/templates/

cd ship-cli
npm version patch   # or minor/major
npm publish --access public
```

---

Built with ❤️ by [The SHIP Method](https://github.com/nireadaddy/the-ship-method-os)
