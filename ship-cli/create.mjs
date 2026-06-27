#!/usr/bin/env node
/**
 * ship-create — zero-dependency project scaffolder for The SHIP Method OS.
 *
 * Why no npm dependencies: the audience is non-developers. Requiring
 * extra packages before the very first command, or an API key before
 * anything works, is exactly the kind of friction that loses beginners.
 * This script uses only Node.js built-ins (fs, path, readline,
 * child_process) — no API key, no extra setup.
 *
 * Usage:
 *   npx ship-create
 *
 * All templates (starter-kit app, agent rule files, Claude skill) are
 * bundled inside this package's own templates/ folder — nothing is read
 * from outside, so it works standalone via npx.
 *
 * What changed from v1.3.1 → v1.4.0:
 *  - Removed the AI-tool picker (no longer needed)
 *  - Added 4 idea questions so PROJECT.md + HUMAN_FLOW.md are pre-filled
 *    with real content (no [bracket placeholders] in the core sections)
 *  - Runs `npm install` automatically so the project is ready to open
 *  - End message tells the user exactly how to start building in their
 *    AI coding tool — no intermediate manual steps
 */

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "templates");

const PRODUCT_TYPES = [
  { key: "SAAS",          label: "SaaS product",                   file: "SAAS_TEMPLATE.md" },
  { key: "CRM",           label: "CRM system",                     file: "CRM_TEMPLATE.md" },
  { key: "MEMBERSHIP",    label: "Membership site",                 file: "MEMBERSHIP_TEMPLATE.md" },
  { key: "LEADGEN",       label: "Lead generation website",         file: "LEADGEN_TEMPLATE.md" },
  { key: "DIRECTORY",     label: "Directory website",               file: "DIRECTORY_TEMPLATE.md" },
  { key: "DASHBOARD",     label: "Dashboard / internal analytics",  file: "DASHBOARD_TEMPLATE.md" },
  { key: "INTERNAL_TOOL", label: "Internal tool",                   file: "INTERNAL_TOOL_TEMPLATE.md" },
  { key: "MARKETPLACE",   label: "Marketplace",                     file: "MARKETPLACE_TEMPLATE.md" },
];

// Pre-seeded journey stages per product type so HUMAN_FLOW.md has real
// content the moment the project is created.
const JOURNEY_SEEDS = {
  SAAS: {
    discovery: "Googles a pain they have, or sees a post about the tool from someone they follow",
    firstUse:  "Signs up, sets up their workspace, completes onboarding in under 5 minutes",
    habitual:  "Comes back daily — it's now the default tool for this part of their work",
    advocacy:  "Invites teammates, shares a screenshot publicly, or recommends it unprompted",
  },
  CRM: {
    discovery: "Frustrated with spreadsheets or outgrowing their current CRM",
    firstUse:  "Imports contacts, creates their first deal, moves it through the pipeline",
    habitual:  "Logs every interaction, tracks deals from lead to close without thinking about it",
    advocacy:  "Gets their whole sales team on it, pushes for it in team meetings",
  },
  MEMBERSHIP: {
    discovery: "Finds the creator/brand through content, a recommendation, or an ad",
    firstUse:  "Signs up for free or paid tier, accesses their first piece of content",
    habitual:  "Returns regularly for new content and engages in the community",
    advocacy:  "Refers friends, shares content, or upgrades to a higher tier",
  },
  LEADGEN: {
    discovery: "Finds the page via search, ad, or referral while actively looking for a solution",
    firstUse:  "Reads the page, fills out a form or books a call",
    habitual:  "Becomes a paying customer after the follow-up sequence",
    advocacy:  "Refers others in their network who need the same service",
  },
  DIRECTORY: {
    discovery: "Searches for a specific provider or category in the niche",
    firstUse:  "Browses listings, contacts or books a provider directly",
    habitual:  "Returns when they need another provider, or to leave a review",
    advocacy:  "Shares the directory with their network when someone asks for a recommendation",
  },
  DASHBOARD: {
    discovery: "Team lead or ops person is tired of copy-pasting data into spreadsheets",
    firstUse:  "Connects data sources, sees the first charts populate automatically",
    habitual:  "Checks the dashboard every morning as the first thing in their routine",
    advocacy:  "Shares views with stakeholders, adds more team members as viewers",
  },
  INTERNAL_TOOL: {
    discovery: "Team identifies a manual, repetitive process that's slowing them down",
    firstUse:  "First team member completes the core task in the tool, faster than before",
    habitual:  "Whole team uses it as the default — the old process is gone",
    advocacy:  "Other teams ask if they can get a version for their workflow too",
  },
  MARKETPLACE: {
    discovery: "Buyer searches for a product or service and lands on a listing",
    firstUse:  "Browses listings, makes first purchase or sends first inquiry",
    habitual:  "Returns to buy again, or becomes a repeat seller",
    advocacy:  "Refers buyers and sellers in their network",
  },
};

// ─── helpers ────────────────────────────────────────────────────────────────

function toKebabCase(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "my-product";
}

// Use the readline async iterator rather than the `question()` API to avoid
// a Node.js quirk where piped / non-TTY stdin stops delivering buffered
// lines after the first question() call resolves.
function makeLineReader(rl) {
  const it = rl[Symbol.asyncIterator]();
  return async function nextLine(promptText) {
    output.write(promptText);
    const { value, done } = await it.next();
    if (done) throw new Error("Input ended before all questions were answered.");
    return value.trim();
  };
}

async function ask(nextLine, question, defaultValue) {
  const suffix = defaultValue ? ` (${defaultValue})` : "";
  const answer = await nextLine(`${question}${suffix}: `);
  return answer || defaultValue || "";
}

async function pickFromList(nextLine, title, items, labelFn) {
  console.log(`\n${title}`);
  items.forEach((item, i) => console.log(`  ${i + 1}. ${labelFn(item)}`));
  while (true) {
    const raw = await nextLine(`Pick a number (1-${items.length}): `);
    const idx = parseInt(raw, 10) - 1;
    if (idx >= 0 && idx < items.length) return items[idx];
    console.log("  Not a valid number, try again.");
  }
}

function copyRecursiveExcluding(src, dest, excludeNames) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (excludeNames.has(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursiveExcluding(srcPath, destPath, excludeNames);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// ─── doc builders ───────────────────────────────────────────────────────────

function buildProjectMd(projectName, productTypeLabel, { targetUser, problem, valueProp, idea }) {
  return `# PROJECT.md

**Phase:** S — Structure
**Purpose:** Single source of truth for *what* you're building and *why*. Every AI build prompt should point here instead of re-explaining the product from scratch.

---

## 1. Product Vision

${projectName} is a ${productTypeLabel.toLowerCase()} that helps **${targetUser}** ${valueProp}.

> *Expand this into a fuller paragraph before moving to HUMAN_FLOW.md — what does this product become in 2 years if it succeeds?*

---

## 2. Problem Statement

- **Who has this problem:** ${targetUser}
- **What is the problem, specifically:** ${problem}
- **How do they solve it today** (workarounds, competitors, spreadsheets, manual labor): [fill in]
- **Why do existing solutions fail them:** [fill in]
- **Cost of the problem** (time, money, missed opportunity, stress — quantify if possible): [fill in]

---

## 3. Opportunity

- **Why now** (market shift, new tech, behavior change, AI cost drop, etc.): [fill in]
- **Market size / addressable audience** (rough is fine): [fill in]
- **Unfair advantage** (your access, audience, data, speed, niche knowledge): [fill in]
- **Why AI makes this newly buildable by you, solo or with a small team:** [fill in]

---

## 4. Target Audience

| Attribute | Description |
|---|---|
| Primary segment | ${targetUser} |
| Secondary segment | [fill in] |
| Demographics / firmographics | [fill in] |
| Where they hang out (channels) | [fill in] |
| What they currently pay for adjacent solutions | [fill in] |
| Buying trigger (what makes them search for this *today*) | [fill in] |

---

## 5. User Personas

### Persona 1: Primary User
- **Goal:** ${valueProp}
- **Frustration:** ${problem}
- **Tech comfort level:** [fill in]
- **Quote that sounds like them:** "[fill in]"
- **What "success" looks like for them in this product:** [fill in]

---

## 6. MVP Scope

> Smallest version that delivers real value to Persona 1. 3–5 features max.

- [fill in]
- [fill in]
- [fill in]

### Out of scope for MVP
- [fill in — things you explicitly will NOT build yet]

---

## 7. Success Metrics

| Metric | Target (Month 1) | Target (Month 3) |
|---|---|---|
| [fill in] | | |

---

## 8. Revenue Model

- **Pricing model:** [subscription / one-time / freemium / marketplace fee / etc.]
- **Price point:** [fill in]
- **Revenue goal (Month 3):** [fill in]

---

## 9. Original Idea (keep for reference)

> *Your words from when you scaffolded this project.*

${idea || "(not provided)"}
`;
}

function buildHumanFlowMd(projectName, productType, { targetUser, problem, valueProp }) {
  const seed = JOURNEY_SEEDS[productType.key] || JOURNEY_SEEDS.SAAS;

  return `# HUMAN_FLOW.md

**Phase:** H — Human Flow
**Purpose:** Maps how a real ${targetUser} moves through ${projectName} — screen by screen, decision by decision — before any code is written. Skipping this is the #1 reason AI-generated apps feel disjointed.

---

## 1. User Journey

| Stage | What the user is trying to do | Where they are emotionally |
|---|---|---|
| Discovery | ${seed.discovery} | Curious but skeptical — "does this actually work?" |
| First use | ${seed.firstUse} | Evaluating — will bounce at the first confusing screen |
| Habitual use | ${seed.habitual} | Comfortable and trusting |
| Advocacy | ${seed.advocacy} | Proud to recommend it |

---

## 2. User Flow — Core Task

> Map the step-by-step sequence for the most important action a user takes. Fill in the blanks.

\`\`\`
[Entry point] → [Step 1: action] → [Step 2: action] → [Decision point?]
                                                          ├─ Yes → [Step 3a]
                                                          └─ No  → [Step 3b]
→ [Outcome / success state]
\`\`\`

- **Flow name:** [e.g. "New user signs up and reaches first value"]
- **Entry point(s):** [homepage CTA / email link / referral / etc.]
- **Steps to reach value:** [count them — every extra step is a drop-off risk]
- **Exit points:** [where can they bail, and is that OK?]

---

## 3. Core Screens

> One section per screen. Every screen needs a happy path and at least one error/empty state before it gets built.

### Screen 1: [Name — e.g. Landing page]
- **Purpose:** [what does the user do or decide here?]
- **Happy path:** [what happens when everything works]
- **Empty state:** [what the user sees on first visit with no data]
- **Error state:** [what happens if something goes wrong]

### Screen 2: [Name — e.g. Dashboard]
- **Purpose:**
- **Happy path:**
- **Empty state:**
- **Error state:**

### Screen 3: [Name — e.g. Settings]
- **Purpose:**
- **Happy path:**
- **Empty state:**
- **Error state:**

> Add more screens until every route in Section 4 has a matching entry here.

---

## 4. Information Architecture

| Route | Screen name | Who can access |
|---|---|---|
| / | Landing / Home | Public |
| /dashboard | Main app view | Logged-in user |
| /settings | Account settings | Logged-in user |
| [fill in] | | |

---

## 5. Key UX Decisions

> Record decisions that affect the whole product so the AI agent doesn't re-litigate them each session.

- Auth method: [magic link / OAuth / password — pick one]
- Mobile-first or desktop-first: [fill in]
- [fill in any other non-obvious decisions]
`;
}

// ─── main ───────────────────────────────────────────────────────────────────

async function main() {
  const rl = readline.createInterface({ input, terminal: false });
  const nextLine = makeLineReader(rl);

  console.log("===========================================");
  console.log("  SHIP CLI — scaffold your project in 60 s");
  console.log("===========================================\n");

  // ── 1. Core questions ──────────────────────────────────────────────────
  const projectNameRaw = await ask(nextLine, "Project name?", "My Product");
  const projectSlug    = toKebabCase(projectNameRaw);

  const productType = await pickFromList(
    nextLine,
    "What are you building?",
    PRODUCT_TYPES,
    (t) => t.label
  );

  // ── 2. Idea questions (fills the docs without needing a separate AI step)
  console.log("\n── About your idea ─────────────────────────");
  const idea = await ask(
    nextLine,
    "Describe it in 1-3 sentences (who it's for and what it does)",
    ""
  );
  const targetUser = await ask(
    nextLine,
    "Who is your primary user? (e.g. 'freelance designers', 'gym owners')",
    "small business owners"
  );
  const problem = await ask(
    nextLine,
    "What is the #1 problem they face today?",
    ""
  );
  const valueProp = await ask(
    nextLine,
    "What makes them say 'I need this'? (the aha moment)",
    ""
  );

  // Close readline before any child processes touch stdin
  rl.close();

  // ── 3. Guard: don't overwrite an existing folder ───────────────────────
  const outDir = path.join(process.cwd(), projectSlug);
  if (fs.existsSync(outDir)) {
    console.log(`\n  Folder ./${projectSlug} already exists — pick a different name and run again.`);
    process.exit(1);
  }

  console.log(`\nScaffolding ./${projectSlug} ...`);

  const starterKitSrc = path.join(TEMPLATES_DIR, "starter-kit");
  if (!fs.existsSync(starterKitSrc) || !fs.existsSync(path.join(TEMPLATES_DIR, "docs"))) {
    console.log("\nBundled templates missing. Try: npx ship-create@latest\n");
    process.exit(1);
  }

  // ── 4. Copy app shell ──────────────────────────────────────────────────
  copyRecursiveExcluding(
    starterKitSrc,
    outDir,
    new Set(["node_modules", ".next", "package-lock.json", "next-env.d.ts", "tsconfig.tsbuildinfo"])
  );

  // ── 5. Copy agent rule files (CLAUDE.md, AGENTS.md, .cursorrules, etc.)
  for (const ruleFile of ["AGENTS.md", "CLAUDE.md", ".cursorrules", ".windsurfrules"]) {
    const src = path.join(TEMPLATES_DIR, ruleFile);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(outDir, ruleFile));
  }

  // ── 6. Copy Claude Code skill so agents can invoke it as a skill ───────
  const claudeSkillSrc = path.join(TEMPLATES_DIR, ".claude");
  if (fs.existsSync(claudeSkillSrc)) {
    copyRecursiveExcluding(claudeSkillSrc, path.join(outDir, ".claude"), new Set());
  }

  // ── 7. Write pre-filled docs (no bracket placeholders in core sections)
  const docsDir = path.join(outDir, "docs");
  fs.mkdirSync(docsDir, { recursive: true });

  fs.writeFileSync(
    path.join(docsDir, "PROJECT.md"),
    buildProjectMd(projectNameRaw, productType.label, { targetUser, problem, valueProp, idea })
  );

  fs.writeFileSync(
    path.join(docsDir, "HUMAN_FLOW.md"),
    buildHumanFlowMd(projectNameRaw, productType, { targetUser, problem, valueProp })
  );

  // Product-type feature checklist
  const templateSrc = path.join(TEMPLATES_DIR, "docs", "product-types", productType.file);
  if (fs.existsSync(templateSrc)) {
    fs.copyFileSync(templateSrc, path.join(docsDir, productType.file));
  }

  // Full prompt chain (Stages 3-6) for users who want it
  const promptsSrc = path.join(TEMPLATES_DIR, "docs", "PROMPTS.md");
  if (fs.existsSync(promptsSrc)) {
    fs.copyFileSync(promptsSrc, path.join(docsDir, "PROMPTS.md"));
  }

  // Tech-stack reference — agent reads this when making stack decisions.
  const techStackSrc = path.join(TEMPLATES_DIR, "docs", "tech-stack");
  if (fs.existsSync(techStackSrc)) {
    copyRecursiveExcluding(techStackSrc, path.join(docsDir, "tech-stack"), new Set());
  }

  // Design system + spec templates — filled by /build after user picks theme/font/trend.
  for (const f of ["DESIGN_SYSTEM.md", "DESIGN_SPEC.md"]) {
    const src = path.join(TEMPLATES_DIR, "docs", f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(docsDir, f));
  }

  // ── 8. npm install ─────────────────────────────────────────────────────
  console.log("\nInstalling packages (this takes ~30 seconds)...");
  const install = spawnSync("npm", ["install"], {
    cwd: outDir,
    stdio: "inherit",
    shell: true,
  });
  if (install.status !== 0) {
    console.log(`\n  npm install failed. Run it manually:\n  cd ${projectSlug} && npm install`);
  }

  // ── 9. Done ────────────────────────────────────────────────────────────
  console.log(`
Done! Your project is at: ./${projectSlug}/

  docs/PROJECT.md                           — product spec (pre-filled)
  docs/HUMAN_FLOW.md                        — UX flow (pre-filled)
  docs/DESIGN_SYSTEM.md                     — design tokens & decisions (filled by /build)
  docs/DESIGN_SPEC.md                       — screen-by-screen design spec (filled by /build)
  docs/tech-stack/STACK_DECISION_MATRIX.md  — stack choices reference

── Open in your AI coding tool and type /build ─────────────────

  Claude Code  →  claude ./${projectSlug}
  Cursor       →  cursor ./${projectSlug}
  Windsurf     →  windsurf ./${projectSlug}

Then type:  /build

The agent will read your docs, create the build spec, pick a theme,
and start coding the MVP — no copy-paste, no extra setup.
`);
}

main().catch((err) => {
  console.error("\nSomething went wrong:", err.message);
  process.exit(1);
});
