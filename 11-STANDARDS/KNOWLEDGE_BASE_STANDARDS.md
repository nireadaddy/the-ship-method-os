# KNOWLEDGE_BASE_STANDARDS

**Phase:** Standards
**Purpose:** Define how the filled-in SHIP documents (your real `PROJECT.md`, `HUMAN_FLOW.md`, etc. — not the blank templates) stay accurate as your product evolves, so they remain trustworthy AI context months or years after launch instead of becoming an archived artifact nobody updates.

---

## 1. Where Source-of-Truth Lives

- Your filled-in SHIP documents are the **single source of truth for product intent and rationale** — not Slack threads, not a founder's memory, not scattered Notion pages. If a decision about *why* the product works the way it does isn't in these documents, it doesn't reliably exist.
- Code comments and technical docs are the source of truth for **how** something is implemented. SHIP documents are the source of truth for **why** it exists and **what** it's supposed to do. Keep this boundary clean — don't let `PROJECT.md` accumulate implementation detail that belongs in `03-INSTRUCTION/AI_BUILD_SPEC.md` instead.
- One canonical copy per document, in this repo's folder structure, under version control (git). Never let a "working copy" fork off into someone's local Google Doc that quietly becomes the real one while the repo version goes stale.

## 2. Keeping AI Context in Sync as the Product Evolves

The whole value of these documents is that you can hand them to an AI tool and get coherent, context-aware help. That value decays the moment the documents stop matching reality.

- **Trigger points to update the knowledge base** (not a fixed schedule — update on these events):
  - A pricing tier changes
  - A persona's behavior is disproven by real usage data
  - A feature originally scoped for V2 ships early (or a planned MVP feature gets cut)
  - The business goal or success metric changes (e.g. pivoting from growth to retention focus)
  - A significant risk in the `Risks` table materializes or is resolved
- **Update the document, not just your head.** The failure mode this repo exists to prevent is a founder who "knows" the product changed but never updates the document an AI (or a new teammate) would read to get context — every future AI session then works from stale assumptions.
- **Re-attach updated documents to persistent AI context** (Claude Projects, Custom GPTs, Cursor rules) after a meaningful update — see `CONTEXT_MANAGEMENT_STANDARDS.md` for exactly how to do this per tool. A document updated in the repo but not re-synced to your AI tool's persistent memory is functionally still stale to that tool.

## 3. Deprecating Stale Sections Instead of Deleting Them

When a section of a filled-in document becomes outdated, don't erase it — the history of "what we used to believe and why we changed our minds" is itself valuable context for future decisions (and for an AI helping you avoid re-making the same mistake).

**Pattern to use:**

```markdown
## 9. Revenue Model

> **Superseded 2026-06-20** — original freemium model is archived below.
> Current model: usage-based billing, see note below.

- **Model type:** Usage-based (changed from Freemium — see archived version)
- **Pricing tiers (draft):** ...

<details>
<summary>Archived: original Freemium model (2026-01-10 to 2026-06-20)</summary>

- **Model type:** Freemium
- **Pricing tiers (draft):** [original content preserved here]
- **Why it changed:** Free tier users never converted past 14 days; usage-based
  pricing in early customer interviews tested better.

</details>
```

- Use a collapsible `<details>` block to archive superseded content inline, so the document stays scannable but the history isn't lost.
- Always state **why** it changed, not just that it changed — "why" is the part that prevents repeating a mistake.
- Date every supersession. Undated history is nearly as useless as no history.
- For changes significant enough to affect the document's overall validity (a pivot, not a tweak), also bump the document version per `VERSIONING_STANDARDS.md`.

## 4. What Counts as "Living" vs. "Historical Record"

| Document type | Treatment |
|---|---|
| `PROJECT.md`, `HUMAN_FLOW.md`, `FEATURE_MATRIX.md`, `BUSINESS_MODEL.md` | Living — update in place, archive superseded sections inline, never let them go stale |
| `09-CASE-STUDIES/` entries | Historical record — a case study describes what happened at a point in time; don't retroactively edit it to look like you knew the outcome in advance. Add a dated postscript instead if you want to note what changed later |
| `08-EXAMPLES/` worked examples | Reference material — update only if the method itself changes, not because a real product based loosely on the example evolved |

## Common Pitfalls

- Letting `PROJECT.md` go stale for a year while the actual product pivots twice, then feeding the outdated file to an AI tool and getting confidently wrong advice back.
- Deleting a superseded section entirely, losing the rationale that would have prevented a repeated mistake 6 months later.
- Forking a "real" working copy outside the repo (a Google Doc, a Notion page) that becomes the de facto source of truth while the repo version rots.
- Updating the document in the repo but forgetting to re-sync it into the persistent AI context where you actually do most of your thinking — see the next file for how to avoid this.

---

**Next step:** See [`CONTEXT_MANAGEMENT_STANDARDS.md`](./CONTEXT_MANAGEMENT_STANDARDS.md) for how to actually load these living documents into ChatGPT, Claude, Gemini, and Cursor/Windsurf without blowing your context budget.
