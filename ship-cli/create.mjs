#!/usr/bin/env node
/**
 * ship-create — zero-dependency project scaffolder for The SHIP Method OS.
 *
 * Why no npm dependencies: the audience is non-developers. Requiring
 * extra packages before the very first command, or an API key before
 * anything works, is exactly the kind of friction that loses beginners.
 * This script uses only Node.js built-ins (fs, path, readline) and pastes
 * a ready prompt for the user to run in whichever AI chat tool they
 * already use — no API key, no extra setup.
 *
 * Usage:
 *   npx ship-create
 *
 * All templates this script needs (the starter-kit app, PROJECT.md,
 * HUMAN_FLOW.md, PROMPTS.md, product-type templates, and the agent rule
 * files) are bundled inside this package's own templates/ folder — nothing
 * is read from outside this package, so it works standalone via npx,
 * with no git clone required.
 */

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "templates");

const PRODUCT_TYPES = [
  { key: "SAAS", label: "SaaS product", file: "SAAS_TEMPLATE.md" },
  { key: "CRM", label: "CRM system", file: "CRM_TEMPLATE.md" },
  { key: "MEMBERSHIP", label: "Membership site", file: "MEMBERSHIP_TEMPLATE.md" },
  { key: "LEADGEN", label: "Lead generation website", file: "LEADGEN_TEMPLATE.md" },
  { key: "DIRECTORY", label: "Directory website", file: "DIRECTORY_TEMPLATE.md" },
  { key: "DASHBOARD", label: "Dashboard / internal analytics", file: "DASHBOARD_TEMPLATE.md" },
  { key: "INTERNAL_TOOL", label: "Internal tool", file: "INTERNAL_TOOL_TEMPLATE.md" },
  { key: "MARKETPLACE", label: "Marketplace", file: "MARKETPLACE_TEMPLATE.md" },
];

const AI_TOOLS = [
  { key: "ChatGPT", note: "Paste the prompt below into a new chat (or set up a Custom GPT for repeated use)." },
  { key: "Claude", note: "Paste into a new chat, or set up a Claude Project with your docs as Project knowledge." },
  { key: "Gemini", note: "Paste into a new chat, or set up a Gemini Gem for repeated use." },
  { key: "Cursor", note: "Open PROJECT.md in the editor and reference it with @PROJECT.md instead of pasting. Use Ask/Chat mode, not Agent mode, for this step." },
  { key: "Windsurf", note: "Same idea as Cursor — reference PROJECT.md directly via the editor's file context instead of pasting." },
];

function toKebabCase(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "my-product";
}

// Reading lines via the readline interface's async iterator (rather than
// the higher-level `question()` API) avoids a Node.js quirk where piped /
// redirected (non-TTY) stdin can stop delivering buffered lines after the
// first question() call resolves. The async-iterator pattern reliably
// delivers every line regardless of how stdin is supplied.
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

function fillProjectTemplate(rawTemplate, projectName, productTypeLabel) {
  return rawTemplate
    .replace(
      "## 1. Product Vision",
      `## 1. Product Vision\n\n> Project: **${projectName}** — a ${productTypeLabel}. Replace the rest of this section with your own one-paragraph vision.`
    )
    .replace(
      "## 4. Target Audience",
      `## 4. Target Audience\n\n> Product type: ${productTypeLabel}. See \`docs/${productTypeLabel}\`'s matching template file in this project for a starter feature checklist.`
    );
}

async function main() {
  const rl = readline.createInterface({ input, terminal: false });
  const nextLine = makeLineReader(rl);

  console.log("===========================================");
  console.log("  SHIP CLI — start a new project, the SHIP way");
  console.log("===========================================");
  console.log(
    "\nNo API key needed. This just sets up your files and gives you a\nready-to-paste prompt for ChatGPT, Claude, Gemini, Cursor, or Windsurf.\n"
  );

  const projectNameRaw = await ask(nextLine, "What's your project called?", "My Product");
  const projectSlug = toKebabCase(projectNameRaw);

  const productType = await pickFromList(
    nextLine,
    "What are you building?",
    PRODUCT_TYPES,
    (t) => t.label
  );

  const aiTool = await pickFromList(
    nextLine,
    "Which AI tool will you mainly use?",
    AI_TOOLS,
    (t) => t.key
  );

  // The project is created inside whatever folder you currently have open
  // (process.cwd()) — not inside the SHIP Method OS repo itself. This way
  // it behaves like `npx create-next-app`: open any empty folder, run the
  // command, get your project right there.
  const outDir = path.join(process.cwd(), projectSlug);
  if (fs.existsSync(outDir)) {
    console.log(`\n A folder already exists at ./${projectSlug} — pick a different name and run again.`);
    rl.close();
    return;
  }

  console.log(`\nCreating ./${projectSlug} ...`);

  // 1. Copy the working app shell (sale/member/backoffice UI on mock data)
  // from this package's bundled templates — nothing is read from outside
  // this package.
  const starterKitSrc = path.join(TEMPLATES_DIR, "starter-kit");
  if (!fs.existsSync(starterKitSrc) || !fs.existsSync(path.join(TEMPLATES_DIR, "docs"))) {
    console.log(
      "\nThis package's bundled templates are missing or incomplete.\n" +
        "Try reinstalling: npx ship-create@latest\n"
    );
    rl.close();
    process.exit(1);
  }
  copyRecursiveExcluding(
    starterKitSrc,
    outDir,
    new Set([
      "node_modules",
      ".next",
      "package-lock.json",
      "next-env.d.ts",
      "tsconfig.tsbuildinfo",
    ])
  );

  // 2. Copy the agent rule files so any coding tool enforces the SHIP order from day one.
  for (const ruleFile of ["AGENTS.md", "CLAUDE.md", ".cursorrules", ".windsurfrules"]) {
    const src = path.join(TEMPLATES_DIR, ruleFile);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(outDir, ruleFile));
    }
  }

  // 3. Create a docs/ folder with a pre-filled PROJECT.md and the matching product-type template.
  const docsDir = path.join(outDir, "docs");
  fs.mkdirSync(docsDir, { recursive: true });

  const projectMdSrc = path.join(TEMPLATES_DIR, "docs", "PROJECT.md");
  const rawProjectMd = fs.readFileSync(projectMdSrc, "utf8");
  fs.writeFileSync(
    path.join(docsDir, "PROJECT.md"),
    fillProjectTemplate(rawProjectMd, projectNameRaw, productType.label)
  );

  const templateSrc = path.join(TEMPLATES_DIR, "docs", "product-types", productType.file);
  if (fs.existsSync(templateSrc)) {
    fs.copyFileSync(templateSrc, path.join(docsDir, productType.file));
  }

  const humanFlowSrc = path.join(TEMPLATES_DIR, "docs", "HUMAN_FLOW.md");
  if (fs.existsSync(humanFlowSrc)) {
    fs.copyFileSync(humanFlowSrc, path.join(docsDir, "HUMAN_FLOW.md"));
  }

  // Copy the full prompt chain too, so this project is self-contained.
  const promptsSrc = path.join(TEMPLATES_DIR, "docs", "PROMPTS.md");
  if (fs.existsSync(promptsSrc)) {
    fs.copyFileSync(promptsSrc, path.join(docsDir, "PROMPTS.md"));
  }

  // 4. Build the ready-to-paste Stage 1 prompt (Idea -> Product Spec), pre-loaded with the template.
  const prompt = `You are helping me turn a raw product idea into a structured product spec.

My raw idea: [describe your idea in 2-5 sentences — audience, problem, what you imagine building]

I'm building a ${productType.label.toLowerCase()} called "${projectNameRaw}".

I want you to fill out the following template completely. Do not skip
sections. If you don't have enough information for a section, ask me a
specific clarifying question instead of writing a generic placeholder.

Push back on weak answers — if my problem statement is vague ("things are
hard"), ask me to quantify it. If my target audience is "everyone," force me
to pick a primary segment.

Here is the template to fill:

${rawProjectMd}

Output the completed template in the same markdown format, ready to save
back into docs/PROJECT.md.`;

  fs.writeFileSync(path.join(docsDir, "FIRST_PROMPT.txt"), prompt);

  const toolNote = aiTool.note;
  const nextSteps = `# Next Steps for ${projectNameRaw}

You're building: **${productType.label}**
Your AI tool: **${aiTool.key}**

## 1. Run the app shell (optional, do this anytime)

\`\`\`
cd ${projectSlug}
npm install
npm run dev
\`\`\`

Then open http://localhost:3000 — you'll see the sale page, member area, and
backoffice already wired up with placeholder/mock data.

## 2. Fill in your product spec (do this first, before changing code)

Open \`docs/PROJECT.md\`. It's pre-filled with your project name and product
type. Fill in sections 1-2 (Vision, Problem Statement) yourself, by hand —
this is the thinking only you can do.

## 3. Let AI fill in the rest

${toolNote}

The exact prompt to paste is saved in \`docs/FIRST_PROMPT.txt\` — open it,
fill in the [raw idea] bracket, and paste the whole thing into ${aiTool.key}.

## 4. Keep going

Once \`docs/PROJECT.md\` is fully filled (no more [brackets]):
- Move to \`docs/HUMAN_FLOW.md\` (Stage 2 in the prompt chain)
- Reference \`docs/${productType.file}\` for feature ideas specific to a ${productType.label.toLowerCase()}
- The full prompt chain (Stage 3-6: UX -> Tech -> Build Plan -> Code) is in
  \`docs/PROMPTS.md\` — already copied into this project

## 5. Coding agents are already configured

This folder includes AGENTS.md / CLAUDE.md / .cursorrules / .windsurfrules.
If you open this folder in Cursor, Windsurf, or Claude Code, those tools
will automatically enforce filling Structure and Human Flow before
generating feature code — you don't need to do anything extra.
`;

  fs.writeFileSync(path.join(outDir, "NEXT_STEPS.md"), nextSteps);

  console.log("\nDone! Your project is ready at:");
  console.log(`  ./${projectSlug}/`);
  console.log("\nOpen this file for what to do next:");
  console.log(`  ${projectSlug}/NEXT_STEPS.md`);
  console.log("\nOr just run:");
  console.log(`  cat "${projectSlug}/NEXT_STEPS.md"`);

  rl.close();
}

main().catch((err) => {
  console.error("\nSomething went wrong:", err.message);
  process.exit(1);
});
