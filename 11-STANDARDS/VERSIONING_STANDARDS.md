# VERSIONING_STANDARDS

**Phase:** Standards
**Purpose:** Define how both the products you build with this method and the SHIP documents themselves should track version history — so "what changed and why" is always answerable, months after the fact.

---

## 1. Semantic Versioning for Your Product Releases

Use standard **MAJOR.MINOR.PATCH** (semver) for any product you ship, starting the moment it's live for real users:

```
1.4.2
│ │ └─ PATCH — bug fixes, no behavior/contract change
│ └─── MINOR — new features, backward-compatible
└───── MAJOR — breaking changes, incompatible API/data/UX shift
```

| Bump | When to use it | Example |
|---|---|---|
| **PATCH** (`1.0.0` → `1.0.1`) | Bug fix, typo fix, performance tweak, no new capability | Fixed a broken password-reset link |
| **MINOR** (`1.0.1` → `1.1.0`) | New feature added, existing features still work the same way | Added CSV export to the dashboard |
| **MAJOR** (`1.1.0` → `2.0.0`) | Breaking change — old integrations break, data model changed incompatibly, a core flow was replaced | Migrated from project-based to workspace-based data model |

- **Pre-launch (MVP/internal testing):** stay under `0.x.x` (e.g. `0.3.0`). Crossing to `1.0.0` is a deliberate signal: "this is the first version we'd put in front of paying strangers." Don't tag `1.0.0` casually.
- **Where to put the version number:** `package.json` `"version"` field is the source of truth for code; surface it in your app's footer/settings page if it helps support conversations ("what version are you on?").
- **Tag releases in git** matching the version: `git tag v1.4.2 && git push --tags`. This gives you an instant rollback target that matches a specific, documented state — pairs directly with the rollback procedure in `10-LAUNCH/DEPLOY_TO_VERCEL.md`.

## 2. Logging Changes in CHANGELOG.md

Keep one `CHANGELOG.md` at the repo root of the product (not this method repo — your *product's* repo). Format, newest at top:

```markdown
# Changelog

## [1.4.2] - 2026-06-20
### Fixed
- Password reset link expired after 5 minutes instead of 24 hours

## [1.4.1] - 2026-06-12
### Added
- CSV export on the Reports page
### Changed
- Default trial length extended from 7 to 14 days

## [1.0.0] - 2026-05-01
### Added
- Initial public launch
```

- Group entries under `Added` / `Changed` / `Fixed` / `Removed` / `Deprecated` / `Security` — this is the [Keep a Changelog](https://keepachangelog.com) convention; don't invent your own categories.
- Write entries for the **user**, not for yourself — "Fixed a bug where invoices double-charged annual plans" not "fixed billing.ts line 204."
- Update the changelog **in the same PR/commit as the change**, not retroactively from memory a week later — you will not remember accurately.
- A changelog entry with no user-visible effect (internal refactor, dependency bump with no behavior change) doesn't need an entry at all — this file is for users and future-you, not a commit log duplicate.

## 3. Versioning SHIP Method Documents (PROJECT.md, etc.)

The filled-in SHIP documents (`PROJECT.md`, `HUMAN_FLOW.md`, `FEATURE_MATRIX.md`, etc.) are living documents, not one-time outputs — they drift out of date as the real product evolves post-launch. Version them deliberately:

1. **Add a version line to the top of the Phase/Purpose callout** once the document has shipped its first real product:
   ```markdown
   **Phase:** S — Structure
   **Purpose:** ...
   **Document version:** v1.2 — last meaningfully updated 2026-06-20
   ```
2. **Bump the document version when the change is meaningful**, not on every typo fix:
   - A new persona added because real user research contradicted the original assumption → bump.
   - A pricing model change after launch data showed the original tier structure didn't convert → bump.
   - Fixing a typo in Section 3 → don't bump, just fix.
3. **Use the same MAJOR.MINOR logic loosely**: MAJOR bump = the core business model, target audience, or product vision changed; MINOR bump = a section was meaningfully revised but the core thesis is intact.
4. **Don't silently overwrite history.** When a section changes meaningfully post-launch, move the old content to a dated subsection rather than deleting it outright — see `KNOWLEDGE_BASE_STANDARDS.md` for the exact "deprecate, don't delete" pattern this repo follows.

## 4. When to Re-Version vs. When to Just Edit

| Situation | Action |
|---|---|
| Fixing a typo, broken link, or formatting issue | Just edit, no version bump |
| Filling in a previously-TBD section | Edit, no version bump (this is completing v1, not creating v2) |
| Changing an answer because reality proved the original wrong | Bump MINOR, log it in the document's own changelog note or a repo-level CHANGELOG if one exists for the SHIP docs |
| Pivoting the product's core mechanism, audience, or business model | Bump MAJOR, and explicitly flag every downstream document (`HUMAN_FLOW.md`, `AI_BUILD_SPEC.md`, etc.) as needing a re-read, since they were built on the now-outdated version |

## Common Pitfalls

- Treating `1.0.0` as "whenever I feel proud of it" instead of "whenever it's actually in front of paying strangers" — this breaks the signal value of the major version for support/debugging later.
- Letting `CHANGELOG.md` rot while shipping for months — reconstructing it from git log later is painful and lossy.
- Bumping the SHIP document version on every minor wording tweak, which trains everyone to ignore version numbers because they change too often to mean anything.
- Deleting outdated sections of `PROJECT.md` instead of marking them deprecated — losing the "why we used to think X" context that explains later decisions.

---

**Next step:** See [`PROMPT_STANDARDS.md`](./PROMPT_STANDARDS.md) for how to write and version the prompts that drive AI-built changes in the first place.
