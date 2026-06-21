# FOLDER_NAMING_STANDARDS

**Phase:** Standards
**Purpose:** Keep every top-level and nested folder in this repo predictable, so a contributor or AI tool can navigate by pattern recognition alone, without reading a map every time.

---

## 1. The Top-Level Convention

Every top-level folder follows: `[two-digit number]-[UPPERCASE-WITH-HYPHENS]`

```
01-STRUCTURE
02-HUMAN-FLOW
03-INSTRUCTION
04-PUBLISH
05-SOP
06-TEMPLATES
07-PROMPTS
08-EXAMPLES
09-CASE-STUDIES
10-LAUNCH
11-STANDARDS
```

- **Two-digit number prefix** (`01`, `02`, ... `11`): forces correct alphabetical/file-explorer sort order matching the order a builder should actually move through the method. Always zero-pad single digits (`01`, not `1`) so sort order holds past folder #9.
- **UPPERCASE**: signals "this is a structural folder of the method," visually distinct from lowercase files inside it (like `assets/`, which is intentionally lowercase because it's support material, not a phase folder).
- **Hyphens, not underscores or spaces**: hyphens are URL-safe, git-diff-friendly, and match the convention used inside filenames too (see `DOCUMENTATION_STANDARDS.md`).

## 2. Numbering Rules

- Numbers represent **sequence through the method**, not category or importance. `10-LAUNCH` and `11-STANDARDS` are appended after the core 01-09 phase/support folders — `11-STANDARDS` is meta (about the repo itself), so it sits at the end, not interleaved with the phases.
- Never reuse a number. If a folder is deprecated, see `VERSIONING_STANDARDS.md` for how to retire it without breaking the sequence for everything after it.
- Leave gaps only if you have a concrete, already-planned next folder — otherwise number contiguously. Don't pre-allocate `15-` through `19-` "just in case."
- If you need to insert a folder *between* two existing numbers (e.g. between `04` and `05`), don't renumber everything downstream — re-letter or pick the next available top-level slot and cross-link it contextually instead. Renumbering breaks every existing relative link in every file.

## 3. File Naming Inside Folders

Files inside each folder follow: `SCREAMING_SNAKE_CASE.md`

```
01-STRUCTURE/PROJECT.md
01-STRUCTURE/BUSINESS_MODEL.md
04-PUBLISH/QA_CHECKLIST.md
```

- Use underscores inside filenames (not hyphens) — this is the one place underscores are correct, to visually distinguish "this is a specific document" from "this is a folder level."
- Name files for what they *are*, not for their position (`PROJECT.md`, not `01-PROJECT.md` — the folder already carries the sequence).

## 4. Subfolders — When to Create One

Create a subfolder inside a numbered top-level folder only when:

- The parent folder would otherwise hold more than ~6-8 files covering genuinely different sub-domains (e.g. `08-EXAMPLES/` holding `CRM_EXAMPLE/`, `DIRECTORY_EXAMPLE/`, etc. — each is a self-contained worked example, not a flat document).
- The content is a *set* that belongs together and would be confusing flattened (a worked example with its own PROJECT.md, HUMAN_FLOW.md, etc. needs its own folder so it doesn't collide with the real top-level ones).

Subfolder naming: `UPPERCASE_WITH_UNDERSCORES` for self-contained sets (e.g. `CRM_EXAMPLE/`), matching the file-naming convention, since a subfolder at this depth is conceptually closer to "a named thing" than "a sequence stage."

**Do not** create a subfolder for a single file, or to "organize" fewer than 4 related files — that's premature structure. A flat folder with a few well-named files beats a folder-of-one.

## 5. When to Create a New Top-Level Folder vs. a Subfolder

Ask, in order:

1. **Does this content represent a new phase in the SHIP sequence, or a new category of repo-wide support material** (like launch playbooks or repo standards)? → New top-level folder, next available number.
2. **Does this content belong entirely inside an existing phase, just needs grouping** (e.g. a new worked example inside `08-EXAMPLES/`)? → Subfolder.
3. **Is this a single new document that fits an existing folder's purpose** (e.g. a new checklist that belongs in `04-PUBLISH/`)? → Just a new file, no new folder at all.

If you're unsure, default to **not creating a new top-level folder**. Top-level folders are structural commitments — every one you add is a new thing every contributor has to learn the purpose of. Files and subfolders are cheap; top-level folders are not.

## Common Pitfalls

- Lowercase or mixed-case top-level folders (`Launch/`, `launch-guides/`) breaking the visual scan pattern of the repo.
- Skipping the zero-pad on single-digit numbers, which silently breaks sort order once you pass folder 9.
- Creating a subfolder for one file "to be safe" — resist it.
- Renumbering existing folders to "make room," which breaks every relative markdown link (`../04-PUBLISH/...`) across the repo.

---

**Next step:** See [`DOCUMENTATION_STANDARDS.md`](./DOCUMENTATION_STANDARDS.md) for how the content inside each file should be structured.
