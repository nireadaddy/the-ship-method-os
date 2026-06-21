# PROMPT_STANDARDS

**Phase:** Standards
**Purpose:** Define the required structure, placeholder convention, and tool-scoping rules for every prompt added to `07-PROMPTS/` or `03-INSTRUCTION/PROMPTS.md`, so prompts stay reusable instead of becoming one-off notes only their author can decode.

---

## 1. Required Structure

Every prompt entry follows this exact three-part shape:

```markdown
### [Prompt Name]

**Use when:** [The specific situation that should trigger reaching for this prompt — be concrete, not "when building stuff."]
**Best tool:** [Claude / ChatGPT / Cursor / Windsurf / v0 / Gemini / Tool-agnostic]

```text
[The actual prompt body, written exactly as the builder should paste it.]
```
```

- **Use when** must describe a trigger, not a topic. Bad: "For database design." Good: "When you've finished `PROJECT.md` and need a first-pass schema before writing `AI_BUILD_SPEC.md`."
- **Best tool** is a recommendation, not a restriction — most prompts in this repo should work in any modern chat-based AI tool. Only narrow this when the prompt depends on a tool-specific capability (see Section 3).
- The **prompt body** goes in its own fenced code block (` ```text `) so the builder can copy it verbatim without picking up surrounding Markdown formatting.

## 2. Placeholder Convention

Use square brackets inside the prompt body for anything the builder must replace before sending:

```text
You are a senior product strategist. Based on the attached PROJECT.md for
[product name], identify the 3 riskiest assumptions in the "Assumptions"
table and propose a cheap way to test each one in under [number] days.
```

- Bracket placeholders describe *what* goes there, never a bare `X` or `[insert here]`.
- If a prompt expects an attached file (common in this repo — most prompts assume `PROJECT.md` or `HUMAN_FLOW.md` is pasted/attached alongside it), say so explicitly in the prompt body itself, not just in "Use when." The builder should never have to guess what context to bring.
- Never leave a placeholder that looks like real content (e.g. `[Acme Corp]`) — it gets copy-pasted by mistake more often than you'd expect. Use clearly meta brackets (`[product name]`, `[your target audience]`).

## 3. Tool-Agnostic vs. Tool-Specific Prompts

**Default every prompt to tool-agnostic.** Write it as plain natural-language instructions that work whether pasted into Claude, ChatGPT, Gemini, or typed into Cursor's chat panel. Most strategy, writing, and planning prompts in this method have no reason to be tool-specific.

**Fork a tool-specific variant only when:**

- The prompt relies on a tool-specific feature that changes the prompt's actual wording — e.g. a Cursor/Windsurf prompt that references "the currently open file" or "@-mention the schema file," which has no equivalent phrasing in a ChatGPT web chat.
- The prompt is meant to configure a persistent system (a Claude Project's custom instructions, a Custom GPT's configuration, a Cursor `.cursorrules` file) rather than be pasted per-message — these are inherently tool-specific artifacts, not portable prompts.
- Output format differs meaningfully by tool (e.g. a prompt asking for a runnable code diff makes sense in Cursor/Windsurf but should ask for a full file in a plain chat tool).

When you do fork a variant, name it clearly and keep the tool-agnostic version as the canonical one:

```markdown
### Generate Implementation Plan (Tool-Agnostic)
### Generate Implementation Plan — Cursor Variant
```

Don't fork a variant just because a tool *can* do something differently — fork only when the prompt's wording or expected output actually has to change.

## 4. Prompt Versioning and Testing Tips

- **Version in place, don't duplicate.** If you improve a prompt, edit it directly and note the change in the repo's `CHANGELOG.md` (see `VERSIONING_STANDARDS.md`) rather than keeping "v1" and "v2" entries side by side cluttering the library.
- **Test every prompt against a real, filled-in example before publishing it** — run it against one of the worked examples in `08-EXAMPLES/`, not a placeholder-only template. A prompt that only works when fed perfect, idealized input is not done.
- **Watch for model drift.** A prompt tuned against one model version can behave differently months later as underlying models change. Re-validate prompts that haven't been touched in a while, especially ones with strict output-format requirements (JSON schemas, exact section headers).
- **Prefer instructing over demonstrating when possible** — a clear instruction ("respond only with a markdown table, no commentary") is more durable across model updates than a one-shot example the model might overfit to.
- **Keep prompts short enough to paste, long enough to be unambiguous.** If a prompt needs more than ~150 words to be unambiguous, consider whether it should instead be a structured template document (`06-TEMPLATES/`) that the AI is asked to fill in, rather than a single mega-prompt.

## Common Pitfalls

- A prompt with no "Use when" trigger, forcing every future reader to reverse-engineer when it's actually useful.
- Forking a tool-specific variant for cosmetic reasons (different greeting style) instead of an actual capability difference.
- Letting a prompt rot for a year without re-testing it against current model behavior.
- Writing placeholders that look like plausible real values, leading to accidental copy-paste-without-editing.

---

**Next step:** See [`KNOWLEDGE_BASE_STANDARDS.md`](./KNOWLEDGE_BASE_STANDARDS.md) for how the filled-in documents these prompts help generate should be maintained as a living source of truth.
