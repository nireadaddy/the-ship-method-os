# PROMPT_LIBRARY.md

**Purpose:** The single index for every prompt in The SHIP Method OS. Instead of hunting across six files to find "the right prompt," start here — find the discipline, jump to the file and section. This file also fills four gaps that don't have a dedicated file yet (Discovery, QA Testing, SEO, Content Creation) with a short prompt set directly inline, in the same format as the other prompt files.

> Replace every `[bracket]` before running, same rule as every other file in `07-PROMPTS/`.

---

## 1. Where Everything Lives

| Discipline | File | What it covers |
|---|---|---|
| Product management | [`PRODUCT_PROMPTS.md`](./PRODUCT_PROMPTS.md) | PRD sections, RICE scoring, user stories + acceptance criteria, prioritization devil's advocate, feedback theme synthesis, go/no-go memos, competitive gap analysis, feature kill decisions |
| UX/UI design | [`UX_PROMPTS.md`](./UX_PROMPTS.md) | User journey mapping, flow design, screen/component copy, visual system prompts |
| Development | [`DEV_PROMPTS.md`](./DEV_PROMPTS.md) | Stack selection, architecture, frontend scaffolding, backend endpoints, testing — with explicit Cursor/Windsurf repo-context notes |
| Marketing / SEO / content | [`MARKETING_PROMPTS.md`](./MARKETING_PROMPTS.md) | Positioning, headline generation (4U formula), launch comms, SEO, content repurposing |
| SHIP GPT persona setup | [`SHIP_GPT_PROMPTS.md`](./SHIP_GPT_PROMPTS.md) | System/persona prompts to turn the whole repo into a persistent coaching assistant in ChatGPT Custom GPTs, Claude Projects, Gemini Gems, or a pinned Cursor/Windsurf system message |
| Build-stage prompt chain | [`../03-INSTRUCTION/PROMPTS.md`](../03-INSTRUCTION/PROMPTS.md) | The ordered Idea → Product Spec → UX Spec → Tech Spec → Build Plan → Code Generation chain, with per-tool adaptation notes for every stage |
| Multi-agent orchestration | [`../03-INSTRUCTION/AI_AGENT_WORKFLOW.md`](../03-INSTRUCTION/AI_AGENT_WORKFLOW.md) | When to use a single tool vs. repo-aware agent vs. full Planner/Builder/Reviewer split across a build |
| Discovery, QA Testing, SEO, Content Creation | This file (Sections 2-5 below) | No dedicated file yet — short prompt sets included directly below |

---

## 2. Discovery Prompts

> For the earliest stage — before `PROJECT.md` even has a draft. Use these to pressure-test a raw idea or surface a market/problem before committing words to the Structure docs.

### Problem Validation Interview Guide
**Use when:** You have a hunch about a problem worth solving and need a structured set of questions to validate it in real conversations before building anything.
**Best tool(s):** Claude — best at generating genuinely open-ended, non-leading questions; avoid ChatGPT's tendency to write questions that fish for a "yes."

```
I'm validating a problem hypothesis before building a product. Generate a
15-minute customer discovery interview guide.

Problem hypothesis: [the problem you think exists, in one sentence]
Target interviewee: [who you think has this problem]

Requirements:
- Open with context-setting questions about their current workflow, not
  about your idea
- Include at least 5 questions designed to surface whether the problem is
  painful enough to pay to solve (frequency, cost of current workaround,
  what they've already tried)
- Do NOT include any question that pitches or describes my solution —
  this interview is about the problem, not validating my idea on a deadline
- Include 2 "red flag" questions whose answers would indicate I'm talking
  to the wrong person (e.g. they don't actually have this problem, or
  already have a free/good-enough fix)
- End with: "what would have to be true for you to pay for a solution to this"
```

---

### Market Sizing Sanity Check
**Use when:** You need a rough, defensible TAM/SAM/SOM estimate for `PROJECT.md` Section 3 without commissioning real market research.
**Best tool(s):** Gemini — best for grounding in current, real-world data via web knowledge; Claude/ChatGPT if you already have hard numbers and just need the math structured.

```
Help me build a rough but defensible market size estimate for [product/idea].

Target audience: [as specific as possible — role, company size, geography, etc.]
What I already know: [any numbers you have — industry reports, competitor
user counts, your own audience size]

Structure the estimate as:
1. TAM (total addressable market) — broadest reasonable definition, with
   your reasoning and source/assumption stated
2. SAM (serviceable addressable market) — narrowed to who you could
   realistically reach with your current channels/positioning
3. SOM (serviceable obtainable market) — realistic capture in year 1,
   given a stated assumption about conversion/market share

For each number, state the confidence level (High/Medium/Low) and exactly
what assumption it rests on, so I know which number to go validate first
if the whole estimate turns out to be wrong.
```

---

### Idea Stress-Test (Pre-PROJECT.md)
**Use when:** You have an idea you're excited about and want a structured gut-check before spending time writing the full `PROJECT.md`.
**Best tool(s):** Claude — sustains genuine pushback without softening for politeness; explicitly instruct it to find the strongest objections, not hedge.

```
Stress-test this product idea before I invest time writing a full spec.

Idea: [2-4 sentences — audience, problem, what you'd build]

Answer directly:
1. What's the single strongest reason this might not work? (market, timing,
   competition, or your own unfair disadvantage — pick the real one, not
   a generic risk)
2. Who would NOT pay for this, and why might that be most of your assumed
   audience rather than a fringe case?
3. What's the cheapest possible test that would prove or kill this in
   under a week, without building anything?
4. If this works, what does it look like in 2 years — is that outcome
   actually big enough to be worth building, or is this a feature, not
   a product?

Be honest even if the honest answer is "this seems solid" — but only after
genuinely trying to find the holes first.
```

---

### Competitor/Alternative Landscape Scan
**Use when:** Filling `PROJECT.md` Section 3 ("why now," unfair advantage) and you need a fast scan of who else occupies this space, including non-software alternatives.
**Best tool(s):** Gemini — best for live web knowledge across many competitors at once; ChatGPT as a fast second pass on structuring the output.

```
Scan the competitive/alternative landscape for [product idea/category].

Include not just direct competitors but indirect alternatives — spreadsheets,
manual processes, hiring a person, adjacent tools being mis-used for this
purpose.

For each, give:
- Name
- How target users currently use it for this problem (even if it's not
  built for this)
- Where it falls short specifically for [target audience]
- Their likely response if I succeed (ignore me / copy the feature / try
  to acquire me — your best guess with reasoning)

Close with: is there a real gap here, or is this market already well-served
by something good enough that switching costs will kill adoption?
```

---

## 3. QA Testing Prompts

> Companion prompts to `04-PUBLISH/QA_CHECKLIST.md` — use these to generate the actual test cases and edge cases the checklist tells you to run.

### Edge Case Generator for a Feature
**Use when:** A feature is built and you need a thorough list of edge cases before manual QA, beyond what the generic `QA_CHECKLIST.md` items cover.
**Best tool(s):** Claude — most thorough at generating genuinely non-obvious edge cases rather than restating the happy path with minor variations; Cursor/Windsurf if you want cases grounded in the actual code (e.g. real validation rules, real DB constraints).

```
Generate edge cases for QA testing this feature: [feature name/description]

Feature inputs/data involved: [list fields, file types, user roles, etc.]
Known business rules: [e.g. "only one active subscription per account",
"dates must be in the future"]

Generate edge cases across these categories, at least 3 per category:
1. Boundary values (empty, zero, max length, max number, exactly-at-limit)
2. Concurrent/race conditions (two actions at once, double-submit, stale data)
3. Permission/role edge cases (wrong role attempts the action, deleted/
   suspended account attempts the action)
4. Data integrity edge cases (orphaned references, partially-completed
   multi-step flows, duplicate submissions)
5. Integration/third-party failure (the upstream service is down, slow,
   or returns malformed data mid-flow)

For each edge case: what should happen (the correct behavior), and how
to set up the test condition to trigger it.
```

---

### Test Plan From a User Story
**Use when:** You have a user story with acceptance criteria (from `PRODUCT_PROMPTS.md`'s story writer) and need it converted into an executable manual or automated test plan.
**Best tool(s):** Cursor/Windsurf — can write actual test files (Jest/Playwright/Cypress) directly into the repo, matching existing test conventions; Claude/ChatGPT for a manual test-script version if no automated test suite exists yet.

```
Convert this user story + acceptance criteria into a test plan.

Story: [paste story]
Acceptance criteria: [paste criteria]
Test type needed: [manual test script / automated unit test / automated
e2e test — state which]

For manual: output numbered steps, each with an expected result, written
so a non-technical tester could execute it without guessing intent.

For automated: write the actual test file in [framework — Jest/Playwright/
Cypress/etc.], following the structure/naming conventions in [@reference
an existing test file if one exists in the repo].

Cover the happy path AND at least 2 negative/edge cases drawn directly from
the acceptance criteria, not generic ones.
```

---

### Bug Report Reproduction Steps Cleanup
**Use when:** You have a messy, vague bug report (from a user, support ticket, or your own quick note) and need it turned into clean, reproducible steps before it goes into the engineering backlog.
**Best tool(s):** ChatGPT or Claude — both handle this reformatting task well; speed matters more than reasoning depth here.

```
Clean up this bug report into a structured, reproducible format.

Raw report: [paste the messy report/ticket/note as-is]

Output:
1. Summary (one line, specific — not "thing is broken")
2. Steps to reproduce (numbered, assume nothing about prior context)
3. Expected behavior
4. Actual behavior
5. Environment (browser/OS/account type — mark "unknown, needs follow-up"
   if not stated in the raw report)
6. Severity guess (Blocker/Major/Minor/Cosmetic, per QA_CHECKLIST.md scale)
   with one sentence of reasoning
7. Any information missing that's needed before this is actionable —
   list it explicitly so I know what to ask the reporter
```

---

### Regression Test Checklist for a Release
**Use when:** Preparing a release and need a scoped regression checklist that covers what this specific change could have broken, not the entire `QA_CHECKLIST.md` from scratch every time.
**Best tool(s):** Cursor/Windsurf — can inspect the actual diff/changed files and reason about real blast radius; Claude as a second pass on anything touching shared/critical paths (auth, payments, data models).

```
I'm about to release this change: [describe the change/diff, or @-mention
the actual changed files if using a repo-aware tool]

Generate a scoped regression checklist:
1. What existing flows could this change have broken, even indirectly
   (shared components, shared API endpoints, shared data models)?
2. What's the highest-risk area touched (auth, payments, data integrity) —
   call it out explicitly if any of these are touched at all
3. A prioritized checklist: test these first, in this order, before doing
   a full QA_CHECKLIST.md pass

Be specific about WHY each item is at risk from this particular change —
a generic regression checklist is not useful; I need the items this exact
diff makes newly risky.
```

---

## 4. SEO Prompts

> Companion prompts to `04-PUBLISH/SEO_CHECKLIST.md` — use these to generate the actual content/metadata the checklist tells you to have in place.

### Keyword Cluster + Content Brief Generator
**Use when:** Planning SEO content and need a keyword cluster mapped to a content brief, rather than a flat keyword list with no structure.
**Best tool(s):** Gemini — best for grounding keyword/search-intent guesses in current real-world search behavior; ChatGPT as a fast second pass on the brief structure.

```
Generate a keyword cluster and content brief for [topic/product area].

Target audience: [persona]
Business goal for this content: [e.g. "drive trial signups," "rank for a
comparison query," "build topical authority"]

Output:
1. A primary keyword + 5-8 related/long-tail keywords, grouped by search
   intent (informational / comparison / transactional)
2. For the primary keyword, a content brief: target word count, the top
   3 subtopics it must cover to satisfy search intent, and the single
   differentiated angle that makes this piece better than what currently
   ranks (don't just restate generic SEO advice — be specific to this topic)
3. Internal linking suggestions — what other pages on the site should
   link to/from this piece
4. One explicit warning if any keyword in the cluster is too competitive
   for a new/low-authority site to realistically rank for soon
```

---

### Meta Title/Description Batch Writer
**Use when:** You need meta titles and descriptions for multiple pages at once, sized correctly and distinct from each other.
**Best tool(s):** Claude or ChatGPT — both reliable for this; Claude slightly better at avoiding repetitive phrasing across a batch.

```
Write SEO meta titles and descriptions for these pages. Constraints:
title ≤ 60 characters, description ≤ 155 characters, each must be
genuinely distinct (no near-duplicate phrasing across pages), and each
must include the page's primary keyword naturally (not keyword-stuffed).

Pages:
1. [page name] — primary keyword: [keyword] — page purpose: [one line]
2. [page name] — primary keyword: [keyword] — page purpose: [one line]
[add more as needed]

Output as a table: Page | Title (char count) | Description (char count).
Flag any title/description that exceeds the character limit instead of
silently truncating it.
```

---

### Structured Data (Schema.org) Generator
**Use when:** Implementing structured data for a page type (Product, FAQ, Article, Organization) per `SEO_CHECKLIST.md` and need valid JSON-LD without hand-writing the spec.
**Best tool(s):** Cursor/Windsurf — can write the JSON-LD directly into the actual page component, matching the real rendered content; Claude/ChatGPT if you're pasting page content manually.

```
Generate valid JSON-LD structured data (schema.org) for this page.

Page type: [Product / FAQPage / Article / Organization / SoftwareApplication]
Page content to reflect accurately: [paste the actual content — name,
price, FAQ Q&As, author, publish date, etc. — do not invent values]

Requirements:
- Output only valid JSON-LD, ready to drop into a <script type=
  "application/ld+json"> tag
- Every field must reflect content that's actually visible on the page —
  do not include schema fields whose values aren't real/verifiable
- Flag any required field for this schema type that I haven't given you
  data for, rather than inventing a placeholder value
```

---

### Existing Content SEO Audit
**Use when:** A page already exists and underperforms in search — need a structured audit before rewriting.
**Best tool(s):** Claude — best for holding the full page content plus competitive context and giving a structured, non-generic audit; Gemini if you want live competitor-ranking context folded in.

```
Audit this page for SEO performance issues.

Page content: [paste the full current page copy]
Target keyword: [keyword]
Current ranking (if known): [position, or "unranked"]
Top 3 currently-ranking competitors for this keyword (if known): [list, or
say "research likely top competitors"]

Audit against:
1. Search intent match — does this page actually answer what someone
   searching this keyword wants, or does it talk about something adjacent?
2. Content gaps vs. what's likely ranking above it
3. On-page basics (heading structure, keyword placement, internal links)
4. The single highest-leverage fix — not a list of 20 minor tweaks, the
   one change most likely to move the ranking
```

---

## 5. Content Creation Prompts

> General content prompts distinct from `MARKETING_PROMPTS.md`'s launch/positioning focus — use these for ongoing content production (blog, social, newsletter) once launch is behind you.

### Long-Form to Multi-Format Repurposing Pack
**Use when:** You have one long-form piece (blog post, video transcript, podcast) and need it broken into a week's worth of shorter derivative content.
**Best tool(s):** Gemini — best for ingesting a long transcript/article in one pass; Claude for the actual rewriting quality of each derivative.

```
Repurpose this long-form piece into a multi-format content pack.

Source content: [paste full article/transcript]
Platforms needed: [e.g. LinkedIn, Twitter/X, Instagram caption, email
newsletter blurb]

For each platform, extract ONE distinct angle from the source (not the
same summary reworded 4 times) and write a native-feeling post:
- LinkedIn: 150-250 words, a specific insight + a question to drive comments
- Twitter/X: a 5-7 tweet thread, hook tweet must work standalone without
  the rest of the thread
- Instagram caption: punchier, more personal tone, ends with a clear CTA
- Email newsletter blurb: 2-3 sentences teasing the full piece with a link

Each derivative must stand alone — someone who only sees the LinkedIn post
should get real value, not just a teaser for the original.
```

---

### Content Calendar from a Theme
**Use when:** You know the topic/theme you want to cover this month but need it broken into a schedulable content calendar.
**Best tool(s):** ChatGPT — fast at generating structured calendars; Claude if you want each entry to include a more developed angle rather than just a title.

```
Build a [2-4]-week content calendar around this theme: [theme/topic area]

Audience: [persona]
Platforms: [list — blog, LinkedIn, Twitter/X, YouTube, etc.]
Posting frequency: [e.g. "3x/week on LinkedIn, 1 blog post/week"]

For each calendar slot, give:
- Date/day
- Platform
- Specific angle (not just the theme restated — the actual unique take)
- Format (text post / carousel / short video script / long-form article)
- One-line hook (the literal first line that would stop a scroll)

Vary the angle across the calendar — flag if more than 2 entries are
making essentially the same point so I can swap one out.
```

---

### "Steal This" Swipe File Builder
**Use when:** You want to build a reusable swipe file of hooks/openers for a specific content type, rather than writing one-off content each time.
**Best tool(s):** Claude — best at generating genuinely varied hook structures rather than minor rewordings of the same pattern.

```
Generate a swipe file of 15 hooks/opening lines for [content type — e.g.
LinkedIn posts about AI product building] aimed at [audience].

Use a different hook STRUCTURE for each one (not just different topics)
— include at minimum: a contrarian claim, a specific number/stat lead,
a mini-story opener, a direct question, a "most people get this wrong"
framing, a before/after framing, and a blunt confession/admission opener.

For each hook, also state in one clause which structure it's using, so
this becomes a reusable reference, not just 15 one-off lines.
```

---

### Newsletter Issue Drafter
**Use when:** You need a complete newsletter issue draft from a rough set of notes/links/updates, in a consistent recurring format.
**Best tool(s):** Claude or ChatGPT — both handle structured recurring-format writing well; use whichever you've used for previous issues so tone stays consistent issue-to-issue.

```
Draft this week's newsletter issue in our established format.

Format (from previous issues): [paste a previous issue, or describe the
recurring sections — e.g. "1 main story, 3 quick links, 1 personal note"]
This week's raw notes/links/updates: [paste your rough notes]
Tone: [match previous issues / describe if this is the first issue]

Write the full draft, filling in section transitions and connective prose
so it doesn't read like a bulleted list of unrelated items — but do not
invent facts or claims beyond what's in my raw notes. Flag any section
where my notes are too thin to write convincingly and need more input
before sending.
```

---

## 6. Compatibility Notes (Sections 2-5)

| Tool | Strengths for Discovery/QA/SEO/Content | Gotchas |
|---|---|---|
| ChatGPT | Fast structured outputs for calendars, meta tags, bug report cleanup | Tends to soften stress-test/devil's-advocate prompts unless explicitly told not to |
| Claude | Best for sustained critical reasoning (idea stress-tests, edge case generation, audits) and consistent long-form tone (newsletters) | None significant for these use cases — main limitation is no live web access by default |
| Gemini | Best for large-context ingestion (long transcripts, big keyword research, live web grounding for market sizing/SEO) | Double-check structured output (tables/JSON-LD) for formatting compliance |
| Cursor/Windsurf | Best when output needs to land directly in the repo as real code/tests/structured data (JSON-LD, Playwright tests, regression checklists scoped to a real diff) | Don't use for pure-writing tasks (newsletters, social posts) — no advantage over a chat tool and adds setup overhead |

---

**Next step:** Pick the discipline you need, jump to the linked file or the inline section above, and run the prompt. If a discipline you need still isn't covered anywhere in this repo, that's a signal to add a new file under `07-PROMPTS/` rather than improvising one-off prompts that never get reused.
