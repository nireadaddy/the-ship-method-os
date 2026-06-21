# Product Management Prompts

A copy-paste library for the product decisions that make or break a SHIP cycle: what to build, why, and whether it's actually ready to ship. Replace every `[bracket]` before running.

---

### PRD Section Writer
**Use when:** You have a rough feature idea and need a structured PRD section (Problem, Goals, Non-Goals, Requirements, Success Metrics) before handing off to design/dev.
**Best tool(s):** Claude — best at holding a long structured doc coherent and reasoning about tradeoffs without padding; ChatGPT is a solid second choice.

```
You are a senior product manager writing one section of a PRD for [product name], a [one-line product description].

Feature: [feature name]
Context: [why this feature is being considered now — user request, metric, competitive gap, etc.]
Target user: [primary persona/segment]

Write the following PRD section in this exact structure:

1. Problem Statement (2-3 sentences, user-centric, no solutioning)
2. Goals (3-5 bullets, measurable where possible)
3. Non-Goals (explicitly what this does NOT solve — prevents scope creep)
4. Requirements (numbered list, each tagged [Must] / [Should] / [Nice-to-have])
5. Success Metrics (leading indicator + lagging indicator, with a number/threshold)
6. Open Questions (things that need a decision before dev starts)

Constraints:
- Be specific. No vague phrases like "improve user experience."
- Every requirement must be testable by QA.
- Flag any requirement that conflicts with [known constraint, e.g. "our no-mobile-app policy"].

Output as Markdown.
```

---

### RICE Feature Scorer
**Use when:** You have a backlog of candidate features and need an objective first-pass prioritization before a roadmap debate.
**Best tool(s):** ChatGPT or Claude — both handle structured scoring tables well; use Gemini if you need it to cross-reference a pasted spreadsheet of analytics data.

```
Score the following features using the RICE framework (Reach, Impact, Confidence, Effort).

Scoring rules:
- Reach: number of users/customers affected per quarter (use the numbers I give you, or flag "unknown — needs data" if I didn't provide them)
- Impact: 3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal
- Confidence: 100% = high confidence, 80% = medium, 50% = low — justify the % in one clause
- Effort: person-weeks (your best estimate if not given, flagged as an estimate)
- RICE score = (Reach × Impact × Confidence) / Effort

Features:
1. [feature name] — [one-line description] — [any known reach/effort data]
2. [feature name] — [one-line description] — [any known reach/effort data]
3. [feature name] — [one-line description] — [any known reach/effort data]
[add more as needed]

Output a table: Feature | Reach | Impact | Confidence | Effort | RICE Score, sorted highest to lowest.
Then add a 2-sentence caveat for any score you're not confident in, and name what data would resolve the uncertainty.
```

---

### User Story + Acceptance Criteria Writer
**Use when:** A feature is roadmapped and needs to become dev-ready tickets with testable acceptance criteria.
**Best tool(s):** Claude — strongest at producing acceptance criteria that are genuinely testable rather than restating the story; Cursor/Windsurf if you want it written directly into your ticket-tracking repo or markdown backlog with surrounding context.

```
Convert this feature into user stories with acceptance criteria, ready to paste into [Linear/Jira/GitHub Issues].

Feature: [feature description]
User roles involved: [e.g. admin, end user, guest]
Edge cases to consider: [list known edge cases, or say "identify likely edge cases"]

For each story, use this format:

**Story:** As a [role], I want to [action], so that [benefit].
**Acceptance Criteria:** (Given/When/Then format, 3-6 criteria, each independently testable)
**Edge cases covered:** (bullet list)
**Out of scope:** (one line, to prevent scope creep on the ticket)

Break the feature into the smallest set of independently shippable stories. If a story has a hidden dependency on another story, call it out explicitly.
```

---

### Prioritization Devil's Advocate
**Use when:** The team is converging too fast on a roadmap decision and you want a structured argument against the current top pick before committing real engineering time.
**Best tool(s):** Claude — best at sustained, non-sycophantic counter-argument without breaking character; explicitly avoid ChatGPT's tendency to soften the pushback unless you reinforce the instruction.

```
Act as a skeptical co-founder reviewing this roadmap decision. Your job is not to be agreeable — it's to find the strongest reasons this is the WRONG thing to build next, even if you also think it's a good idea overall.

Decision under review: We are prioritizing [feature/initiative] over [alternative(s)] for [time period].
Reasoning given so far: [paste the team's stated reasoning]
Known constraints: [team size, runway, deadline, etc.]

Do the following:
1. Steelman the case AGAINST this decision — list the 3 strongest objections (opportunity cost, hidden complexity, weak evidence, wrong sequencing, etc.)
2. For each objection, state what evidence would prove it wrong
3. Identify what assumption this whole decision rests on that has NOT been validated
4. Give your honest verdict: proceed as planned / proceed with a modification / don't proceed — and the modification if applicable

Do not soften this for politeness. If the decision is genuinely sound, say so — but only after seriously trying to break it.
```

---

### User Feedback Theme Synthesizer
**Use when:** You have a pile of raw user feedback (support tickets, NPS comments, sales call notes, reviews) and need it distilled into actionable themes.
**Best tool(s):** Gemini — best for large-volume pasted text and long context windows when feedback exceeds a few thousand words; Claude is the better choice for nuanced qualitative tone-reading on smaller batches.

```
I'm going to paste a batch of raw user feedback below. Synthesize it into themes for a product review.

Feedback source: [support tickets / NPS / sales calls / app store reviews]
Time period: [date range]

Raw feedback:
[paste feedback — quotes, tickets, transcripts, whatever you have]

Output:
1. Top 5 themes, each with:
   - Theme name (short, specific — not "UX issues")
   - Frequency estimate (how many distinct mentions, roughly)
   - Severity (blocking / annoying / nice-to-have)
   - 2 representative verbatim quotes
2. One theme that's a single loud voice, not a pattern — flag if any "top theme" is actually 1-2 vocal users
3. A ranked action list: what to fix first based on frequency × severity, not who complained loudest
```

---

### Go/No-Go Launch Memo
**Use when:** A feature or product is approaching launch and you need a structured decision memo to force a real go/no-go call instead of drifting into launch.
**Best tool(s):** Claude — best at holding multiple weighted criteria in tension and giving a real recommendation rather than a hedge; ChatGPT works fine as a second-pass editor.

```
Write a go/no-go launch memo for [feature/product name], launching on [target date].

Inputs:
- Success criteria defined pre-build: [list them]
- Current status against each criterion: [fill in actuals, or "unknown"]
- Known risks: [list]
- Blast radius if wrong: [who/how many users affected, reversibility]

Structure the memo as:
1. Recommendation (one line: GO / NO-GO / GO WITH CONDITIONS — stated first, not buried)
2. Why (3 bullets max, the actual deciding factors)
3. What we're trading off (what we're accepting as not-yet-ready)
4. Rollback plan if this goes wrong post-launch
5. What would change this recommendation (specific, falsifiable)

Be decisive. Do not write "it depends" — if information is genuinely missing, say what's missing and give your best recommendation anyway, flagged as provisional.
```

---

### Competitive Feature Gap Analysis
**Use when:** You need to quickly understand where your product stands against 2-3 named competitors on a specific capability before deciding to build.
**Best tool(s):** Gemini — best at synthesizing across multiple competitor descriptions/URLs in one pass with up-to-date web knowledge; ChatGPT if you're pasting in your own research instead of asking the model to recall competitor info.

```
Compare [your product] against [competitor 1], [competitor 2], and [competitor 3] on the specific capability: [capability/feature area].

For each competitor, based on what you know or what I provide below, assess:
- Do they have this capability? (yes / partial / no)
- How do they implement it? (1-2 sentences)
- What's the weakest part of their implementation? (their gap = our opportunity)

[Optional: paste competitor docs/screenshots/descriptions here if you want grounded analysis instead of model recall]

Then answer directly: is this capability table-stakes (must match), a differentiator opportunity (can leapfrog), or not worth building (commoditized/low-value)? Justify in 3 sentences.
```

---

### Roadmap Tradeoff Narrative for Stakeholders
**Use when:** You need to explain a roadmap sequencing decision to non-technical stakeholders (investors, leadership, sales team) without it sounding like an excuse.
**Best tool(s):** ChatGPT — strong at adapting tone for a non-technical audience quickly; Claude if the stakeholder audience needs more nuance/diplomacy (e.g. a frustrated enterprise customer).

```
Write a short stakeholder update explaining why we're building [Feature A] before [Feature B], even though [stakeholder group] has been asking for Feature B.

Audience: [investors / sales team / specific customer / leadership]
Tone: [confident and direct / diplomatic / concise and data-led]
Real reason for the sequencing: [the actual tradeoff — technical dependency, revenue impact, risk, etc.]

Constraints:
- Do not bury the decision — state it in the first sentence
- Acknowledge the other side's want explicitly, don't dismiss it
- Give a real timeframe or trigger for when Feature B gets reconsidered
- Max 150 words
```

---

### Feature Kill Decision Memo
**Use when:** A shipped feature isn't earning its keep and you need a clear-eyed memo on whether to sunset, fix, or leave it.
**Best tool(s):** Claude — best for unemotional analysis of sunk-cost-laden decisions; avoids the "just give it more time" default that chat models tend toward.

```
Write a kill/keep/fix decision memo for [feature name], which has been live since [launch date].

Data:
- Usage: [adoption %, DAU/MAU contribution, or "unknown"]
- Cost to maintain: [eng hours/month, infra cost, support burden]
- Strategic fit: [does it still match current product direction?]
- Sunk cost so far: [investment to date]

Structure:
1. Recommendation: KILL / FIX / KEEP AS-IS (first line)
2. The data point that matters most (just one — force a real signal, not a vibe)
3. What "fix" would require if that's the call, with a rough effort estimate
4. What we lose if we kill it (be honest, including reputational/contractual risk)
5. Sunset/communication plan if KILL (who needs to be told, how much notice)

Explicitly disregard sunk cost as a reason to keep something — note if sunk cost is the only argument being made for KEEP.
```

---

## Compatibility Notes

| Tool | Strengths | How to feed context | Gotchas |
|---|---|---|---|
| ChatGPT | Fast structured docs, good default tone for stakeholder-facing memos, strong at quick reformatting/tables | Paste raw data, briefs, or prior docs directly into the prompt; use a fresh chat per decision to avoid context bleed | Tends to hedge ("it depends") on tradeoff questions — explicitly instruct it to be decisive |
| Claude | Best for nuanced reasoning, sustained counter-argument, and long structured docs (PRDs, memos) that stay coherent | Paste full context (prior PRD versions, feedback dumps) directly — handles long inputs well; Projects/long context retains prior decisions across a thread | Can over-qualify recommendations if not told explicitly to commit to one answer |
| Gemini | Best for very large pasted volumes (feedback dumps, competitor research) and synthesis across many sources at once | Paste large raw text blocks or multiple docs in one message; good with live web knowledge for competitive analysis | Less reliable at strict output formatting — double-check table/structure compliance |
| Cursor | Not typically used for pure PM artifacts, but useful when a PRD or story needs to reference actual code/data models | @-mention relevant schema/type files so acceptance criteria match real field names and constraints | Will default to code-first framing; explicitly tell it you want product prose, not implementation |
| Windsurf | Same use case as Cursor — best when stories/PRDs need to be grounded in the existing repo structure | Open the relevant feature's existing files/folders so it infers real constraints (existing patterns, naming) | Can over-index on what currently exists in code rather than what the product should become — push back on existing-pattern bias when intentionally changing direction |
