# ship-create

A zero-dependency, zero-API-key project scaffolder for The SHIP Method OS. Published on npm as [`ship-create`](https://www.npmjs.com/package/ship-create) — no git clone, no API key, nothing to sign up for before your first command works.

## Run It

From anywhere — an empty folder, your desktop, wherever you want the new project to land:

```
npx ship-create
```

That's it. No global install needed. You do need [Node.js](https://nodejs.org) installed (18 or newer) — if `node -v` works in your terminal, you're ready.

> Prefer a permanent global command? `npm install -g ship-create`, then just run `ship-create`.

## What It Asks

1. **Project name** — e.g. "Acme CRM"
2. **What you're building** — one of 8 product types (SaaS, CRM, membership, lead-gen, directory, dashboard, internal tool, marketplace)
3. **Which AI tool you mainly use** — ChatGPT, Claude, Gemini, Cursor, or Windsurf

## What It Creates

A new folder at `./<your-project-slug>/`, in whatever directory you ran the command from, containing:

- The full starter-kit app shell (sale page, member area, backoffice — working Next.js + Tailwind code on mock data)
- `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.windsurfrules` — copied in, so Cursor/Windsurf/Claude Code enforce the SHIP order automatically the moment you open the folder
- `docs/PROJECT.md` — pre-filled with your project name and product type
- `docs/<TYPE>_TEMPLATE.md` — the starter pack matching what you're building
- `docs/HUMAN_FLOW.md` — blank template, ready for Stage 2
- `docs/PROMPTS.md` — the full Idea → Code prompt chain
- `docs/FIRST_PROMPT.txt` — a ready-to-paste prompt for whichever AI tool you picked, with `PROJECT.md` already loaded into it
- `NEXT_STEPS.md` — plain-language instructions for what to do next, tailored to your AI tool choice

Everything it needs is bundled inside this package's own `templates/` folder — nothing is read from the SHIP Method OS repo at runtime, so it works standalone via `npx` for anyone, without access to that (private) repo.

## Why No API Key

If you already pay for ChatGPT Plus, Claude Pro, or Gemini Advanced, requiring a *separate* API key (different billing, different signup, different rate limits) to use this CLI would be pure friction. Instead, the CLI prepares the exact prompt you need and tells you where to paste it — into the tool you already have open in a browser tab.

## Re-running

The CLI refuses to overwrite an existing `./<slug>/` folder in your current directory — pick a different project name, or delete the old folder first if you want to start over.

## Maintaining This Package

This folder lives inside the private `the-ship-method-os` repo but publishes as a separate public package. If the source templates change (`starter-kit/`, `01-STRUCTURE/PROJECT.md`, `02-HUMAN-FLOW/HUMAN_FLOW.md`, `03-INSTRUCTION/PROMPTS.md`, `06-TEMPLATES/*.md`, or the root agent rule files), re-sync them into `templates/` and bump the version before publishing:

```
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
