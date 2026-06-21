# SHIP CLI

A zero-dependency, zero-API-key project scaffolder for The SHIP Method OS. Built for non-developers — there's nothing to `npm install` and nothing to sign up for before your first command works.

## Run It

From the repo root:

```
node ship-cli/create.mjs
```

That's it. No `npm install` needed for the CLI itself (it only uses Node.js built-ins). You do need [Node.js](https://nodejs.org) installed (18 or newer) — if `node -v` works in your terminal, you're ready.

## What It Asks

1. **Project name** — e.g. "Acme CRM"
2. **What you're building** — pick from the 8 product types in [`../06-TEMPLATES/`](../06-TEMPLATES)
3. **Which AI tool you mainly use** — ChatGPT, Claude, Gemini, Cursor, or Windsurf

## What It Creates

A new folder at `projects/<your-project-slug>/` containing:

- The full [`starter-kit/`](../starter-kit) app shell (sale page, member area, backoffice — working Next.js code on mock data)
- `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.windsurfrules` — copied in, so Cursor/Windsurf/Claude Code enforce the SHIP order automatically the moment you open the folder
- `docs/PROJECT.md` — pre-filled with your project name and product type
- `docs/<TYPE>_TEMPLATE.md` — the starter pack matching what you're building
- `docs/HUMAN_FLOW.md` — blank template, ready for Stage 2
- `docs/FIRST_PROMPT.txt` — a ready-to-paste prompt for whichever AI tool you picked, with `PROJECT.md` already loaded into it
- `NEXT_STEPS.md` — plain-language instructions for what to do next, tailored to your AI tool choice

## Why No API Key

If you already pay for ChatGPT Plus, Claude Pro, or Gemini Advanced, requiring a *separate* API key (different billing, different signup, different rate limits) to use this CLI would be pure friction. Instead, the CLI prepares the exact prompt you need and tells you where to paste it — into the tool you already have open in a browser tab.

## Re-running

The CLI refuses to overwrite an existing `projects/<slug>/` folder — pick a different project name, or delete the old folder first if you want to start over.
