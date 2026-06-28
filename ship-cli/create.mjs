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
 */

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "templates");

// ─── ANSI helpers ────────────────────────────────────────────────────────────

const C = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  cyan:   "\x1b[36m",
  green:  "\x1b[32m",
  white:  "\x1b[37m",
  hideCursor: "\x1b[?25l",
  showCursor: "\x1b[?25h",
  clearLine:  "\x1b[2K",
  up: (n) => `\x1b[${n}A`,
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCT_TYPES = [
  { key: "SAAS",          name: "Web app / SaaS",              desc: "users sign up and use a tool online",                              file: "SAAS_TEMPLATE.md" },
  { key: "CRM",           name: "CRM / Sales pipeline",        desc: "track leads, deals, and customers",                               file: "CRM_TEMPLATE.md" },
  { key: "MEMBERSHIP",    name: "Membership / community",      desc: "paid access to content or a community",                           file: "MEMBERSHIP_TEMPLATE.md" },
  { key: "LEADGEN",       name: "Landing page",                desc: "showcase a product or service — sell, capture leads, or book calls", file: "LEADGEN_TEMPLATE.md" },
  { key: "DIRECTORY",     name: "Directory / listing site",    desc: "browse and find providers, products, or places",                  file: "DIRECTORY_TEMPLATE.md" },
  { key: "DASHBOARD",     name: "Dashboard / analytics",       desc: "visualise data and KPIs for a team or business",                  file: "DASHBOARD_TEMPLATE.md" },
  { key: "INTERNAL_TOOL", name: "Internal tool",               desc: "replaces a manual or spreadsheet-based process inside a company", file: "INTERNAL_TOOL_TEMPLATE.md" },
  { key: "MARKETPLACE",   name: "Marketplace",                 desc: "connects buyers and sellers; transactions happen on the platform", file: "MARKETPLACE_TEMPLATE.md" },
];

const LANGUAGES = [
  { code: "en", name: "English",         desc: "UI text, labels, and copy in English" },
  { code: "th", name: "Thai (ภาษาไทย)",  desc: "ข้อความ label และ copy ในระบบเป็นภาษาไทย" },
];

const REVENUE_MODELS = [
  { key: "SUBSCRIPTION",  name: "Subscription",       desc: "รายเดือน / รายปี — recurring revenue",                   descEn: "monthly or annual recurring payments" },
  { key: "ONE_TIME",      name: "One-time payment",   desc: "จ่ายครั้งเดียว เข้าถึงตลอด",                             descEn: "pay once, access forever" },
  { key: "FREEMIUM",      name: "Freemium",           desc: "ใช้ฟรีได้ + paid tier สำหรับ feature เพิ่ม",             descEn: "free tier + paid upgrade for more features" },
  { key: "MARKETPLACE",   name: "Marketplace fee",    desc: "เก็บ % จาก transaction ระหว่าง buyer กับ seller",        descEn: "take a % cut from each transaction" },
  { key: "FREE",          name: "Free / not yet",     desc: "ยังไม่มี monetization ตอนนี้",                           descEn: "no monetization planned yet" },
];

const I18N = {
  en: {
    sectionIdea:     "── About your idea ────────────────────────────",
    qName:           "Project name?",
    qNameDefault:    "My Product",
    qIdea:           "Describe it in 1–3 sentences (who it's for and what it does)",
    qUser:           "Who is your primary user? (e.g. 'freelance designers', 'gym owners')",
    qUserDefault:    "small business owners",
    qProblem:        "What is the #1 problem they face today?",
    qValue:          "What makes them say 'I need this'? (the aha moment)",
    qRevenue:        "How will this make money?",
    scaffolding:     (slug) => `Scaffolding ./${slug} ...`,
    installing:      (pm) => `Installing packages with ${pm} ...`,
    installFail:     (slug, pm) => `${pm} install failed. Run it manually:\n  cd ${slug} && ${pm} install`,
    folderExists:    (slug) => `Folder ./${slug} already exists — pick a different name and run again.`,
    templatesMissing:"Bundled templates missing. Try: npx ship-create@latest",
    done:            (slug) => `
  ✔ Done!  Your project is at ./${slug}/

  docs/PROJECT.md          — product spec (pre-filled)
  docs/HUMAN_FLOW.md       — UX flow (pre-filled)
  docs/DESIGN_SYSTEM.md    — design tokens (filled by /build)

  ──────────────────────────────────────────
  Open in your AI coding tool and type /build

  Claude Code  →  claude ./${slug}
  Cursor       →  cursor ./${slug}
  Windsurf     →  windsurf ./${slug}

  Then type:  /build
`,
  },
  th: {
    sectionIdea:     "── เกี่ยวกับ idea ของคุณ ─────────────────────",
    qName:           "ชื่อโปรเจค?",
    qNameDefault:    "สินค้าของฉัน",
    qIdea:           "อธิบายในไม่เกิน 1–3 ประโยค (สำหรับใคร และทำอะไร)",
    qUser:           "ผู้ใช้หลักของคุณคือใคร? (เช่น 'ฟรีแลนซ์ดีไซเนอร์', 'เจ้าของยิม')",
    qUserDefault:    "เจ้าของธุรกิจขนาดเล็ก",
    qProblem:        "ปัญหาอันดับ 1 ที่พวกเขาเจออยู่ทุกวันคืออะไร?",
    qValue:          "อะไรทำให้พวกเขาบอกว่า 'ฉันต้องการสิ่งนี้!'? (จุด aha moment)",
    qRevenue:        "แผนหาเงินของโปรเจคนี้คืออะไร?",
    scaffolding:     (slug) => `กำลัง scaffold ./${slug} ...`,
    installing:      (pm) => `กำลังติดตั้ง packages ด้วย ${pm} ...`,
    installFail:     (slug, pm) => `${pm} install ล้มเหลว รันเองได้ที่:\n  cd ${slug} && ${pm} install`,
    folderExists:    (slug) => `โฟลเดอร์ ./${slug} มีอยู่แล้ว — เลือกชื่ออื่นแล้วรันใหม่`,
    templatesMissing:"ไม่พบ template ที่ bundle ไว้ ลองรัน: npx ship-create@latest",
    done:            (slug) => `
  ✔ เสร็จแล้ว!  โปรเจคของคุณอยู่ที่ ./${slug}/

  docs/PROJECT.md          — spec สินค้า (กรอกข้อมูลแล้ว)
  docs/HUMAN_FLOW.md       — UX flow (กรอกข้อมูลแล้ว)
  docs/DESIGN_SYSTEM.md    — design tokens (เติมโดย /build)

  ──────────────────────────────────────────
  เปิดใน AI coding tool แล้วพิมพ์ /build

  Claude Code  →  claude ./${slug}
  Cursor       →  cursor ./${slug}
  Windsurf     →  windsurf ./${slug}

  จากนั้นพิมพ์:  /build
`,
  },
};

// Pre-seeded journey stages per product type so HUMAN_FLOW.md has real content.
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

// ─── Interactive selector (arrow keys) ───────────────────────────────────────

function selectInteractive(title, items) {
  return new Promise((resolve) => {
    let idx = 0;

    const printItems = () => {
      items.forEach((item, i) => {
        const selected = i === idx;
        process.stdout.write(C.clearLine + "\r");
        if (selected) {
          process.stdout.write(
            `  ${C.cyan}${C.bold}❯ ${item.name}${C.reset}` +
            `  ${C.dim}${item.desc}${C.reset}\n`
          );
        } else {
          process.stdout.write(`  ${C.dim}  ${item.name}${C.reset}\n`);
        }
      });
      // hint line (no trailing newline so cursor stays here)
      process.stdout.write(
        C.clearLine + `\r  ${C.dim}↑↓ navigate  ·  Enter to select${C.reset}`
      );
    };

    // initial render
    process.stdout.write(`\n  ${C.bold}${title}${C.reset}\n\n`);
    process.stdout.write(C.hideCursor);
    printItems();

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    const onData = (key) => {
      if (key === "\x03") {                        // Ctrl+C
        process.stdout.write(C.showCursor + "\n");
        process.exit(0);
      }
      if (key === "\r" || key === "\n") {          // Enter
        process.stdin.removeListener("data", onData);
        process.stdin.setRawMode(false);
        process.stdin.pause();
        // replace hint line with confirmed selection
        process.stdout.write(
          "\r" + C.clearLine +
          `  ${C.green}${C.bold}✔ ${items[idx].name}${C.reset}\n`
        );
        process.stdout.write(C.showCursor);
        resolve(items[idx]);
        return;
      }
      const prev = idx;
      if (key === "\x1b[A") idx = Math.max(0, idx - 1);           // up
      if (key === "\x1b[B") idx = Math.min(items.length - 1, idx + 1); // down
      if (idx !== prev) {
        process.stdout.write(C.up(items.length));
        printItems();
      }
    };

    process.stdin.on("data", onData);
  });
}

// Fallback for non-TTY environments (CI, piped input)
async function selectFallback(title, items, nextLine) {
  console.log(`\n  ${title}`);
  items.forEach((item, i) =>
    console.log(`  ${i + 1}. ${item.name}  — ${item.desc}`)
  );
  while (true) {
    const raw = await nextLine(`  Pick a number (1-${items.length}): `);
    const n = parseInt(raw, 10) - 1;
    if (n >= 0 && n < items.length) return items[n];
    console.log("  Not a valid number, try again.");
  }
}

// ─── Text question helper ─────────────────────────────────────────────────────

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
  const suffix = defaultValue ? `  ${C.dim}(${defaultValue})${C.reset}` : "";
  output.write(`  ${question}${suffix}\n  ${C.cyan}›${C.reset} `);
  const answer = await nextLine("");
  return answer || defaultValue || "";
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

function detectPackageManager() {
  // shell: false avoids spawning through /bin/sh — safer and avoids security scanner flags.
  // On Windows, npm/pnpm are .cmd files so we fall back to shell:true only there.
  const useShell = process.platform === "win32";
  const result = spawnSync("pnpm", ["--version"], { shell: useShell, encoding: "utf8" });
  return result.status === 0 ? "pnpm" : "npm";
}

function toKebabCase(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "my-product";
}

// ─── Doc builders ─────────────────────────────────────────────────────────────

const REVENUE_SCREENS = {
  SUBSCRIPTION:  "Pricing page with tier comparison + Stripe subscription checkout",
  ONE_TIME:      "Product page with one-time payment CTA + Stripe checkout",
  FREEMIUM:      "Free vs paid tier comparison page + upgrade flow",
  MARKETPLACE:   "Transaction page showing platform fee + seller/buyer checkout",
  FREE:          "No payment screens needed for MVP",
};

function buildProjectMd(projectName, productTypeName, { targetUser, problem, valueProp, idea, uiLanguage, revenueModel }) {
  return `# PROJECT.md

**Phase:** S — Structure
**Purpose:** Single source of truth for *what* you're building and *why*. Every AI build prompt should point here instead of re-explaining the product from scratch.

---

## 1. Product Vision

${projectName} is a ${productTypeName.toLowerCase()} that helps **${targetUser}** ${valueProp}.

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

- **Pricing model:** ${revenueModel ? revenueModel.name : "[fill in]"}
- **How it works:** ${revenueModel ? revenueModel.descEn : "[fill in]"}
- **Revenue screen to build:** ${revenueModel ? (REVENUE_SCREENS[revenueModel.key] || "[fill in]") : "[fill in]"}
- **Price point:** [fill in]
- **Revenue goal (Month 3):** [fill in]

---

## 9. Technical Decisions

- **UI language:** ${uiLanguage || "English"}
- **Auth method:** [magic link / OAuth / password — fill in]
- **Hosting:** [Vercel / Railway / other — fill in]

---

## 10. Original Idea (keep for reference)

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

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const isTTY = process.stdin.isTTY;

  // ── Banner ─────────────────────────────────────────────────────────────────
  console.log("");
  console.log(`${C.bold}${C.cyan}  ███████╗██╗  ██╗██╗██████╗ ${C.reset}`);
  console.log(`${C.bold}${C.cyan}  ██╔════╝██║  ██║██║██╔══██╗${C.reset}`);
  console.log(`${C.bold}${C.cyan}  ███████╗███████║██║██████╔╝${C.reset}`);
  console.log(`${C.bold}${C.cyan}  ╚════██║██╔══██║██║██╔═══╝ ${C.reset}`);
  console.log(`${C.bold}${C.cyan}  ███████║██║  ██║██║██║     ${C.reset}`);
  console.log(`${C.bold}${C.cyan}  ╚══════╝╚═╝  ╚═╝╚═╝╚═╝     ${C.reset}`);
  console.log("");
  console.log(`  ${C.bold}The SHIP Method${C.reset}  ${C.dim}·  scaffold your project${C.reset}`);
  console.log(`  ${C.dim}──────────────────────────────────────────${C.reset}`);
  console.log("");

  // ── Interactive selections (no readline needed) ────────────────────────────
  let productType, uiLanguage;

  let revenueModel;

  if (isTTY) {
    productType   = await selectInteractive("What type of system are you building?", PRODUCT_TYPES);
    uiLanguage    = await selectInteractive("UI language — what will your app display to users?", LANGUAGES);
    revenueModel  = await selectInteractive(
      uiLanguage.code === "th" ? "แผนหาเงินของโปรเจคนี้คืออะไร?" : "How will this make money?",
      REVENUE_MODELS.map(r => ({ ...r, desc: uiLanguage.code === "th" ? r.desc : r.descEn }))
    );
  }

  // ── Text questions (readline) — switch language after uiLanguage is known ──
  const rl = readline.createInterface({ input, terminal: false });
  const nextLine = makeLineReader(rl);

  if (!isTTY) {
    productType  = await selectFallback("What type of system are you building?", PRODUCT_TYPES, nextLine);
    uiLanguage   = await selectFallback("UI language — what will your app display to users?", LANGUAGES, nextLine);
    revenueModel = await selectFallback("How will this make money?", REVENUE_MODELS, nextLine);
  }

  const t = I18N[uiLanguage.code] ?? I18N.en;

  console.log(`\n  ${C.dim}${t.sectionIdea}${C.reset}`);
  const projectNameRaw = await ask(nextLine, t.qName, t.qNameDefault);
  const projectSlug    = toKebabCase(projectNameRaw);
  const idea       = await ask(nextLine, t.qIdea, "");
  const targetUser = await ask(nextLine, t.qUser, t.qUserDefault);
  const problem    = await ask(nextLine, t.qProblem, "");
  const valueProp  = await ask(nextLine, t.qValue, "");

  rl.close();

  // ── Guard: don't overwrite an existing folder ──────────────────────────────
  const outDir = path.join(process.cwd(), projectSlug);
  if (fs.existsSync(outDir)) {
    console.log(`\n  ${C.dim}${t.folderExists(projectSlug)}${C.reset}`);
    process.exit(1);
  }

  console.log(`\n  ${C.dim}${t.scaffolding(projectSlug)}${C.reset}\n`);

  const starterKitSrc = path.join(TEMPLATES_DIR, "starter-kit");
  if (!fs.existsSync(starterKitSrc) || !fs.existsSync(path.join(TEMPLATES_DIR, "docs"))) {
    console.log(`\n  ${t.templatesMissing}\n`);
    process.exit(1);
  }

  // ── Copy app shell ─────────────────────────────────────────────────────────
  copyRecursiveExcluding(
    starterKitSrc,
    outDir,
    new Set(["node_modules", ".next", "package-lock.json", "next-env.d.ts", "tsconfig.tsbuildinfo"])
  );

  // ── Copy agent rule files ──────────────────────────────────────────────────
  for (const ruleFile of ["AGENTS.md", "CLAUDE.md", ".cursorrules", ".windsurfrules"]) {
    const src = path.join(TEMPLATES_DIR, ruleFile);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(outDir, ruleFile));
  }

  // ── Copy Claude Code skill ─────────────────────────────────────────────────
  const claudeSkillSrc = path.join(TEMPLATES_DIR, ".claude");
  if (fs.existsSync(claudeSkillSrc)) {
    copyRecursiveExcluding(claudeSkillSrc, path.join(outDir, ".claude"), new Set());
  }

  // ── Write pre-filled docs ──────────────────────────────────────────────────
  const docsDir = path.join(outDir, "docs");
  fs.mkdirSync(docsDir, { recursive: true });

  fs.writeFileSync(
    path.join(docsDir, "PROJECT.md"),
    buildProjectMd(projectNameRaw, productType.name, { targetUser, problem, valueProp, idea, uiLanguage: uiLanguage.name, revenueModel })
  );

  fs.writeFileSync(
    path.join(docsDir, "HUMAN_FLOW.md"),
    buildHumanFlowMd(projectNameRaw, productType, { targetUser, problem, valueProp })
  );

  const templateSrc = path.join(TEMPLATES_DIR, "docs", "product-types", productType.file);
  if (fs.existsSync(templateSrc)) {
    fs.copyFileSync(templateSrc, path.join(docsDir, productType.file));
  }

  const promptsSrc = path.join(TEMPLATES_DIR, "docs", "PROMPTS.md");
  if (fs.existsSync(promptsSrc)) {
    fs.copyFileSync(promptsSrc, path.join(docsDir, "PROMPTS.md"));
  }

  const techStackSrc = path.join(TEMPLATES_DIR, "docs", "tech-stack");
  if (fs.existsSync(techStackSrc)) {
    copyRecursiveExcluding(techStackSrc, path.join(docsDir, "tech-stack"), new Set());
  }

  for (const f of ["DESIGN_SYSTEM.md", "DESIGN_SPEC.md"]) {
    const src = path.join(TEMPLATES_DIR, "docs", f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(docsDir, f));
  }

  // ── install ────────────────────────────────────────────────────────────────
  const pm = detectPackageManager();
  console.log(`  ${C.dim}${t.installing(pm)}${C.reset}\n`);
  const useShell = process.platform === "win32";
  const install = spawnSync(pm, ["install"], {
    cwd: outDir,
    stdio: "inherit",
    shell: useShell,
  });
  if (install.status !== 0) {
    console.log(`\n  ${t.installFail(projectSlug, pm)}`);
  }

  // ── Done ───────────────────────────────────────────────────────────────────
  const doneLines = t.done(projectSlug).split("\n");
  const styledDone = doneLines.map((line, i) => {
    if (i === 1) return `  ${C.green}${C.bold}${line.trim()}${C.reset}`;
    if (line.includes("/build")) return line.replace("/build", `${C.cyan}${C.bold}/build${C.reset}`);
    return `${C.dim}${line}${C.reset}`;
  }).join("\n");
  console.log(styledDone);
}

main().catch((err) => {
  process.stdout.write(C.showCursor);
  console.error(`\n  ${C.dim}Something went wrong:${C.reset}`, err.message);
  process.exit(1);
});
