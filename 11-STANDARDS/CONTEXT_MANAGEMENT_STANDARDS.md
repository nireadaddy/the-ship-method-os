# CONTEXT_MANAGEMENT_STANDARDS

**Phase:** Standards
**Purpose:** Define practical rules for feeding this repo's documents into ChatGPT Projects, Claude Projects, Gemini Gems, and Cursor/Windsurf codebase context — so your AI tools always reason from current, relevant context instead of stale or bloated dumps.

---

## 1. Persistent Context vs. Per-Session Paste

Two different jobs, don't conflate them:

- **Persistent context** (uploaded once, read every session automatically): documents that define *what the product is and why* — your filled-in `PROJECT.md`, `HUMAN_FLOW.md`, `BUSINESS_MODEL.md`, `FEATURE_MATRIX.md`. These rarely change session-to-session and should always be "in the room."
- **Per-session paste** (pasted fresh into a single conversation): the specific task at hand — a single prompt from `07-PROMPTS/`, a specific bug, a single screen's spec, a Slack thread you need summarized. These are disposable; pasting them persistently just adds noise to every future unrelated session.

**Rule of thumb:** if you'd want the AI to remember it next week without you re-explaining, it's persistent. If it's only relevant to the next 10 minutes, it's per-session.

## 2. Token Budget Awareness

Every tool has a real ceiling on how much it can hold in context at once, and performance often degrades well before the hard limit (a model reasoning over 150k tokens of mixed-relevance text is worse than one reasoning over 20k tokens of exactly-relevant text).

- **Don't upload your entire repo "just in case."** A 40-page filled-in `PROJECT.md` plus every example in `08-EXAMPLES/` plus every prompt in `07-PROMPTS/` is rarely all relevant to today's task — it dilutes the signal the model needs.
- **Persistent context should be your living documents only** (Section 1) — not historical case studies, not the full prompt library, not every template.
- **Rough sizing intuition:** 1 page of dense markdown ≈ 500-800 tokens. A fully filled-in `PROJECT.md` (15 sections) is typically 2,000-4,000 tokens. Three to four core living documents together rarely exceed 15,000 tokens — well within persistent-context budgets on every major tool as of mid-2026.

## 3. Chunking vs. Summarizing Large Documents

- **Chunk** when you need the AI to work with the *exact original wording* of a long document (e.g. a legal contract, a full transcript) — split by natural section breaks (the H2 headings this repo already uses), and feed one chunk at a time for tasks like detailed review or extraction.
- **Summarize** when you need the AI to *carry the gist forward* into many future tasks without re-reading the full original every time — write a 1-2 paragraph summary of `PROJECT.md`'s key facts (audience, business model, MVP scope) and use that as the lightweight persistent anchor, keeping the full document available for per-session deep-dives only when needed.
- For this repo specifically: most SHIP documents are already short enough (a few thousand tokens) that chunking is unnecessary — summarize only once a document has grown large through accumulated deprecated/archived sections (see `KNOWLEDGE_BASE_STANDARDS.md` Section 3); in that case, summarize the *current* state and leave the archived history out of the persistent summary.

## 4. Tool-by-Tool Comparison

| Tool | Persistent context method | Best for | Limit to watch |
|---|---|---|---|
| **ChatGPT Projects / Custom GPTs** | Upload files to a Project's file store, or configure a Custom GPT's "Knowledge" files + instructions | Long-running product work where you return to the same project repeatedly; Custom GPTs are good for sharing a fixed configuration with a team | Custom GPT knowledge files are retrieved via search, not always fully read in full — very large files may be partially referenced rather than holistically reasoned over |
| **Claude Projects** | Upload files/folders to a Project's knowledge base; Project-level custom instructions | Deep reasoning across multiple related documents at once (e.g. `PROJECT.md` + `HUMAN_FLOW.md` + `FEATURE_MATRIX.md` together) since Claude's context window comfortably holds several SHIP documents in full | Project knowledge is most reliable when total uploaded content stays well under the model's max context — don't treat the knowledge base as unlimited storage |
| **Gemini Gems** | Configure a Gem with persistent instructions + attached files | Lightweight, narrowly-scoped assistants (e.g. a "Launch Helper" Gem that only knows your launch checklist) | Gems are best kept single-purpose; stuffing one Gem with your entire repo defeats the purpose of having a focused assistant |
| **Cursor / Windsurf** | `.cursorrules` / `.windsurfrules` (or workspace-level rules files) plus the live, indexed codebase context | In-editor coding work where the AI needs to know your conventions (naming, folder standards, stack choices) while writing actual code | Rules files should stay short and directive (conventions, not full documents) — paste the relevant SHIP document section into chat per-task rather than dumping it into the rules file permanently |

## 5. Practical Setup Recipe

1. Pick **one** persistent-context home per active product (a Claude Project is the default recommendation for this method, given its larger context window and ability to hold multiple full documents).
2. Upload exactly: `PROJECT.md`, `HUMAN_FLOW.md`, `FEATURE_MATRIX.md`, `BUSINESS_MODEL.md` — the four living documents, current versions only, no archived/historical material.
3. Add a short custom instruction pointing the AI at the SHIP method itself: *"This product follows the SHIP Method (Structure → Human Flow → Instruction → Publish). Reference the attached documents as source of truth. Flag if a request conflicts with documented scope or business goals."*
4. Re-upload (replace, don't append) whenever a living document is meaningfully updated per `KNOWLEDGE_BASE_STANDARDS.md` — stale persistent context is worse than no persistent context, because it's wrong with confidence.
5. For Cursor/Windsurf, additionally drop your folder-naming and documentation conventions (`FOLDER_NAMING_STANDARDS.md`, `DOCUMENTATION_STANDARDS.md`) into the rules file so AI-generated code and docs match repo conventions automatically, without you re-explaining them every session.

## Common Pitfalls

- Uploading the entire repo to persistent context "to be thorough," degrading every future response with irrelevant noise.
- Letting persistent context go stale after a pivot — see `KNOWLEDGE_BASE_STANDARDS.md` for the update discipline this depends on.
- Using a rules file (Cursor/Windsurf) to store full product narrative instead of conventions — rules files should be short and directive, not a knowledge dump.
- Re-pasting the same large document into a fresh chat every session in a tool that actually supports persistent project memory — wasted effort and inconsistent context across sessions.

---

**Next step:** You've now covered the full standards set for this repo. Return to [`README.md`](../README.md) for the overall method, or to [`10-LAUNCH/`](../10-LAUNCH/) if you're actively shipping.
