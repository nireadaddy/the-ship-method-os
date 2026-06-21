# DOCUMENTATION_STANDARDS

**Phase:** Standards
**Purpose:** Define the Markdown style every file in this repo follows, so a new document feels like it was written by the same hand as every existing one — and so AI tools ingesting this repo as context can rely on a consistent shape.

---

## 1. The Standard File Skeleton

Every substantive file in this repo (templates, SOPs, checklists, guides) opens with this exact shape:

```markdown
# FILE_NAME

**Phase:** [SHIP letter or category — e.g. "S — Structure" or "P — Publish" or "Standards"]
**Purpose:** [One sentence: what this file does and why it exists in the method, not just what topic it covers.]

---

## 1. First Section
...

## 2. Second Section
...

---

**Next step:** [One sentence pointing to the next file in the sequence, with a relative markdown link.]
```

- **H1 title** matches the filename exactly, in `SCREAMING_SNAKE_CASE` without the `.md` extension (`# PROJECT.md` style is acceptable when the filename itself is the title, as seen in `01-STRUCTURE/PROJECT.md`; `# QA_CHECKLIST` without `.md` is also acceptable — pick one and be consistent within a folder).
- **Phase/Purpose callout** is bold-labeled, plain text, sits directly under the H1, before the first horizontal rule. This is the single most important convention in the repo — it lets a reader (human or AI) understand a file's role in 5 seconds without reading further.
- **Horizontal rule (`---`)** separates the header block from content, and again separates content from the footer "Next step" line.

## 2. Heading Hierarchy

- **H1 (`#`)**: exactly one per file — the title. Never use a second H1.
- **H2 (`##`)**: top-level numbered sections (`## 1. Product Vision`, `## 2. Problem Statement`). Numbering is mandatory for templates and guides with sequential steps; optional (but still ordered logically) for reference/standards docs.
- **H3 (`###`)**: sub-items within a section that need their own heading (e.g. `### Persona 1: [Name / Role]` inside a `## 5. User Personas` section). Don't number H3s separately from their parent H2 — `### Persona 1` not `### 5.1 Persona 1`.
- Never skip a level (no H3 directly under H1). Never use H4+ in this repo — if content needs that much nesting, it should be a table or a separate file.

## 3. Tables vs. Lists — When to Use Which

| Use a table when... | Use a list when... |
|---|---|
| Each row needs the same set of attributes (a persona, a feature, a risk) | Items are sequential steps or a flat enumeration |
| You want side-by-side comparison (tool A vs. tool B) | Items are checkboxes / actionable items |
| The content is naturally tabular (pricing tiers, metrics, DNS record types) | The content is prose-adjacent (a paragraph broken into bullets for scanability) |

Default to **tables for structured/comparable data**, **numbered lists for sequential instructions**, **bullet lists with checkboxes for action items**. Don't force a 2-column comparison into a table if one side is empty most of the time — that's a list with bold labels instead (see `PROJECT.md` Section 2, "Problem Statement," which uses bold-label bullets rather than a table because each item is prose, not a comparable attribute).

## 4. Fillable Placeholder Syntax

Use square brackets for anything the reader must fill in themselves:

```markdown
[Product Name] is a [category] that helps [target audience]...
```

- Placeholders are written in plain English describing what goes there, not a generic `X` or `___`.
- Inside a quote/example block, an underscore blank (`"______"`) is acceptable specifically for a verbatim quote field (see `PROJECT.md` persona "Quote that sounds like them").
- Never leave a placeholder unresolved in a *filled-in* document that's meant to ship as a deliverable — `PROJECT.md`'s own instructions explicitly forbid "TBD" surviving past the first pass.
- In template files (anything in `06-TEMPLATES/`), placeholders are the entire point — leave them all in.

## 5. Checklist Syntax

Use GitHub-flavored Markdown checkboxes for anything meant to be checked off during real execution, not just read:

```markdown
- [ ] Required fields are enforced both client-side and server-side
```

- Each checklist item is a single, independently-verifiable claim — not a paragraph, not "and" two things in one box.
- Group related checklist items under an H2/H3 section (see `04-PUBLISH/QA_CHECKLIST.md`'s numbered sections like "Functional Testing," "Accessibility").
- Don't use checkboxes for narrative content or for items that are informational rather than actionable — that's a bullet list without checkboxes instead.

## 6. Code Block Usage

- Always tag the language for syntax highlighting (` ```bash `, ` ```ts `, ` ```html `, ` ```markdown `) — never an untagged ` ``` ` block for actual code/commands.
- Use ` ```markdown ` blocks specifically when showing *the structure of another markdown file or fill-in template*, so the placeholder brackets render as literal text instead of being parsed.
- Inline code (single backticks) for filenames, folder paths, variable/event names, and short commands referenced mid-sentence (`PROJECT.md`, `npm run build`, `signed_up`).
- Comment generously inside code blocks meant to be copy-pasted — a builder using this repo is often not a developer; a `# what this line does` comment is not optional politeness, it's load-bearing documentation.

## 7. The "Phase/Purpose" Callout Pattern

This is the repo's signature pattern and should never be omitted from a substantive file:

```markdown
**Phase:** [S/H/I/P letter and name, or category like "Standards" / "Launch"]
**Purpose:** [What this file does, and how it connects to the file before/after it in sequence.]
```

- **Phase** anchors the file to the SHIP framework or to its category folder (`Standards`, `Launch`) if it sits outside the four core phases.
- **Purpose** is always written as a single sentence that could stand alone if someone only read that line and nothing else — assume that's exactly what an AI tool skimming the repo for relevant context will do.

## 8. The "Next Step" Footer Pattern

Every file ends with a final horizontal rule followed by exactly one "Next step" line:

```markdown
---

**Next step:** Once this file has no unresolved TBDs, move to [`02-HUMAN-FLOW/HUMAN_FLOW.md`](../02-HUMAN-FLOW/HUMAN_FLOW.md).
```

- Always a relative markdown link to the actual next file, never a bare folder reference.
- States the **condition** for moving on when relevant ("once X is true, move to Y"), not just the destination — this enforces the repo's core philosophy that phases gate each other.
- Reference docs that don't sit in a strict sequence (like this file) still get a "Next step" pointing to the most logically adjacent file, to keep the pattern unbroken even where the literal sequencing is looser.

## Common Pitfalls

- Writing a file without the Phase/Purpose callout — instantly reads as "not part of this repo."
- Using H4 headings because a section "needed more nesting" — restructure into a table or split the file instead.
- Mixing checkbox lists and plain bullet lists inside the same section for the same kind of content.
- Forgetting the "Next step" footer, leaving the reader (or an AI agent traversing the repo) without a clear path forward.
- Untagged code blocks that render without syntax highlighting and are easy to misread as plain prose.

---

**Next step:** See [`VERSIONING_STANDARDS.md`](./VERSIONING_STANDARDS.md) for how documents and products built from this repo should track change over time.
