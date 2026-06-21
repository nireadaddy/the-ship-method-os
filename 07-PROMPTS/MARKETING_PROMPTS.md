# Marketing, SEO & Content Prompts

A copy-paste library covering positioning, launch comms, SEO, and content repurposing. Replace every `[bracket]` before running.

---

### Landing Page Headline/Subhead Set (4U Formula)
**Use when:** You need a batch of headline + subhead options for a landing page or ad, scored against the 4U formula (Urgent, Unique, Ultra-specific, Useful).
**Best tool(s):** Claude — best at generating genuinely distinct angles rather than minor rewordings of the same headline; ChatGPT works well as a fast volume generator for a first pass.

```
Generate landing page headline + subhead pairs for [product/offer name] using the 4U formula (Urgent, Unique, Ultra-specific, Useful).

Product: [one-line description]
Target customer: [specific persona — role, pain, context]
Core promise/outcome: [the #1 result this delivers]
Proof point (if any): [specific number, timeframe, or credibility marker — e.g. "used by 200 agencies", "in 14 days"]
Differentiator vs. alternatives: [what makes this not-the-same-as competitors/DIY]

Generate 8 headline + subhead pairs, each emphasizing a different one of the 4Us as primary:
- 2 headlines leading with Urgency (time/cost of inaction)
- 2 headlines leading with Uniqueness (the mechanism/differentiator)
- 2 headlines leading with Ultra-specificity (exact numbers/outcomes)
- 2 headlines leading with Usefulness (the clear benefit, no cleverness)

For each pair, score it 1-4 on how many U's it actually hits (not just the primary one), and flag the single strongest pair for an A/B test starting point.

No generic SaaS phrasing ("the all-in-one platform for..."). Every headline must be specific enough that a competitor's headline couldn't accidentally be true for this product too.
```

---

### Launch Announcement (Multi-Channel)
**Use when:** Shipping a feature/product and need launch copy across Twitter/X, LinkedIn, and email without rewriting from scratch per channel.
**Best tool(s):** ChatGPT — fast and reliable for channel-tone adaptation; Claude if the launch story needs more narrative nuance (e.g. a pivot or a hard-won feature).

```
Write a launch announcement for [feature/product name] across three channels, adapted for each platform's native tone — not the same copy reformatted.

What's launching: [description]
Why it matters to the user: [the real benefit, not the feature list]
Who this is for: [target audience]
Proof/detail to include if relevant: [metric, customer quote, before/after]
Link: [URL placeholder]

1. Twitter/X thread (4-6 tweets): Hook tweet must work as a standalone if it's the only one read. Build with a problem → mechanism → result structure. Last tweet is the CTA + link.

2. LinkedIn post (150-250 words): More narrative/credibility-driven tone than Twitter. Open with a specific moment or insight, not "Excited to announce." Include one concrete detail (number, quote, or before/after) for credibility. End with a soft CTA.

3. Email (subject line + body, under 150 words): Subject line must earn the open without being clickbait — specific benefit or curiosity, not hype. Body: lead with the "so what" for the reader, not the feature description. One clear CTA button text.

Tone overall: [confident but not hypey / casual / technical-credible — specify]. Avoid: "we're thrilled," "game-changer," "revolutionary," exclamation-point stacking.
```

---

### SEO Keyword & Content Brief Generator
**Use when:** Planning a blog post/landing page and need a content brief grounding it in real search intent before writing.
**Best tool(s):** Gemini — best for current SERP/keyword landscape knowledge and live web grounding; ChatGPT as a second pass for brief structuring.

```
Generate an SEO content brief for the target keyword: [primary keyword].

Context: [your product/site, target audience, and what page type this is — blog post, landing page, comparison page]
Secondary keywords to consider: [list any you already know, or ask the model to suggest 5-8 based on the primary keyword]

Output:
1. Search intent classification (informational / commercial / transactional / navigational) and what that means for content structure
2. Primary keyword + 5-8 secondary/related keywords to naturally incorporate, with estimated intent for each
3. Recommended title tag (under 60 characters) — 3 options
4. Recommended H1 (can differ slightly from title tag)
5. Content outline: H2/H3 structure that would satisfy search intent better than a generic listicle — base this on what someone searching this term actually needs to walk away knowing/doing
6. Word count target with reasoning (based on intent and likely competition, not an arbitrary number)
7. Internal linking suggestions: what existing pages on [site/product] this should link to/from, if known
8. One thing competing content on this keyword is likely missing or getting wrong, that this piece should do better

Do not pad the outline with generic sections ("Introduction," "Conclusion," "FAQ") unless they genuinely serve the search intent — justify each section's inclusion.
```

---

### Meta Title & Description Set
**Use when:** You need a batch of meta title/description pairs for multiple pages, optimized for both SEO and click-through.
**Best tool(s):** ChatGPT — fast, reliable for character-count-constrained batch copy; Claude if descriptions need more nuanced differentiation across similar pages (e.g. a set of comparison pages).

```
Write meta title and meta description pairs for the following pages. Optimize for click-through, not just keyword stuffing — these compete against other blue links in a SERP.

Pages:
1. [page URL/topic] — target keyword: [keyword] — page type: [blog/product/landing/comparison]
2. [page URL/topic] — target keyword: [keyword] — page type: [blog/product/landing/comparison]
[add more as needed]

Rules:
- Title: 50-60 characters, target keyword near the front, no truncation risk
- Description: 140-155 characters, includes the keyword naturally, states a specific benefit or answer (not a vague teaser), ends with an implicit or explicit reason to click
- No duplicate titles/descriptions across pages even if topics are similar — each must be distinct enough to not look like the same page
- Avoid clickbait that the page content doesn't deliver on

Output as a table: Page | Title (char count) | Description (char count).
```

---

### Content Calendar from Positioning Doc
**Use when:** You have a positioning doc/brand brief and need a content calendar translating strategy into a concrete posting plan.
**Best tool(s):** Claude — best at deriving genuinely varied content angles from a single positioning doc rather than repeating the same point; Gemini if you want it informed by current trending topics in your niche.

```
Generate a [2-week/4-week] content calendar based on this positioning doc.

Positioning summary: [paste your positioning doc, or summarize: target audience, core promise, key differentiators, brand voice]
Channels: [e.g. LinkedIn + Twitter + email newsletter]
Posting frequency: [e.g. "3x/week per channel"]
Content pillars already defined (if any): [list, or ask model to propose 3-4 pillars from the positioning doc]

For each post, output:
- Date/slot
- Channel
- Content pillar it serves
- Format (text post, thread, carousel, short video script, email)
- Hook/headline (the actual first line, not a topic description)
- One-line content angle (what specific point it makes — not "talk about X")
- CTA (if any — not every post needs one)

Constraints:
- No two consecutive posts on the same channel should use the same pillar
- At least 30% of posts should be addressing an objection or misconception, not just stating benefits
- Flag any week where the calendar is overly promotional with no value-first content, and rebalance
```

---

### Cold Outreach Sequence Writer
**Use when:** Starting outbound for a specific offer/segment and need a multi-touch email or DM sequence, not just one message.
**Best tool(s):** Claude — best at writing sequences where later touches genuinely build on earlier ones instead of repeating the same pitch; ChatGPT for fast variant generation once the sequence structure is set.

```
Write a [4-5]-touch cold outreach sequence for [offer/product] targeting [specific persona/segment].

Offer: [one-line description of what you're offering]
Why this persona specifically: [their pain point this solves]
Channel: [email / LinkedIn DM]
Tone: [direct and short / consultative / casual — specify]
What you know about typical prospects in this segment: [any specifics — role, company size, what they're likely already trying]

Sequence structure:
1. Touch 1 (Day 0): Lead with a specific, relevant observation about them or their situation — not a generic opener. Make the ask small (a question or a yes/no, not "book a call" cold).
2. Touch 2 (Day 3): Different angle than touch 1 — add a proof point or reframe the problem, don't just "bumping this up."
3. Touch 3 (Day 7): Address the most likely objection to NOT replying (too busy / not a priority / already have a solution) directly.
4. Touch 4 (Day 12): Pattern interrupt — shorter, lower-pressure, genuinely okay with a "not now."
5. [Touch 5 if 5-touch (Day 18): Final breakup message — direct, no guilt, leaves door open.]

Rules:
- Every message under 100 words
- No "just following up" or "circling back" as an opening line
- Each message must be able to stand alone if it's the only one they read
- Include 1 subject line option per email touch (if email), under 50 characters, not clickbait
```

---

### Product Changelog Entry Writer
**Use when:** A feature/fix has shipped and needs a changelog entry that's clear to users, not just an internal commit summary.
**Best tool(s):** ChatGPT — fast and reliable for this lightweight, frequent task; Claude if the change is complex/behavior-altering and needs careful "what this means for you" framing.

```
Write a changelog entry for this release.

What changed: [describe the feature/fix/improvement, technical detail is fine — paste from the PR/ticket if available]
User-facing impact: [what the user will actually notice/experience differently]
Type: [New / Improved / Fixed / Deprecated]
Breaking change: [yes/no — if yes, what action users need to take]

Output:
- One-line summary (shows in a compact changelog list)
- Full entry (2-4 sentences): lead with what the user can now do or what's better, not with internal implementation detail
- If breaking change: a clearly separated "Action required" callout

Rules:
- Write for the user, not the engineering team — no internal ticket numbers, jargon, or "refactored X" unless it has a visible effect
- If this is a fix, briefly name what was broken without over-apologizing or being defensive
- No marketing fluff ("we're excited to bring you...") — changelogs are reference material, keep it factual and scannable
```

---

### Long-Form to Short-Form Repurposing
**Use when:** You have a long-form piece (blog post, newsletter, video transcript) and need it broken into 5 distinct short-form posts across platforms, not just chopped into chunks.
**Best tool(s):** Claude — best at extracting genuinely separate angles from one source rather than five versions of the same excerpt; Gemini if the source is very long (full transcript/long article) and needs large-context handling.

```
Repurpose this long-form piece into 5 distinct short-form posts. Each must work as a standalone post, not an obvious excerpt missing context.

Source content:
[paste the full long-form piece or transcript]

Target platforms: [e.g. 2 for LinkedIn, 2 for Twitter/X, 1 for Instagram caption — specify mix]

For each of the 5 posts:
- Pull a genuinely different angle/insight from the source — not the same point restated (e.g. one post on the core argument, one on a specific tactic mentioned, one on a counterintuitive point, one as a personal story/anecdote from the piece, one as a contrarian take)
- Write a hook line that would stop a scroll on its own
- Match the native format/length of the target platform (don't write a Twitter-length post for LinkedIn or vice versa)
- Include a CTA only where it makes sense for that platform's norms

Output each post fully written, labeled with platform and which "angle" it's pulling from the source. Flag if the source material genuinely doesn't support 5 distinct angles — don't force weak ones just to hit the count.
```

---

### Ad Copy Variant Generator
**Use when:** Running paid ads and need multiple genuinely different copy angles to test, not just headline swaps.
**Best tool(s):** ChatGPT — fast volume generation for ad variant testing; Claude if you want fewer but sharper, more differentiated angles for a smaller initial test.

```
Generate [6] ad copy variants for [product/offer] on [platform — Meta/Google/LinkedIn].

Offer: [description]
Target audience: [persona, including what they likely already tried/believe]
Primary outcome to promise: [specific result]
Constraint: [character limits per platform, or ask the model to apply correct defaults for the platform specified]

Generate variants across these distinct angles (one each, not 6 versions of the same angle):
1. Pain-first (names the problem viscerally before the solution)
2. Outcome-first (leads with the end result/transformation)
3. Curiosity/pattern-interrupt (unexpected angle or claim that earns a click to resolve)
4. Social proof-led (specific number/testimonial as the hook)
5. Direct offer (price/mechanism/guarantee stated plainly, no cleverness)
6. Objection-flip (names the reason people don't buy, then reframes it)

For each: headline, primary text, CTA button text (matching platform conventions). Mark which one you'd test first and why, based on likely audience sophistication.
```

---

## Compatibility Notes

| Tool | Strengths | How to feed context | Gotchas |
|---|---|---|---|
| ChatGPT | Fast, reliable for high-volume copy variants (ads, changelogs, meta tags) and channel-tone adaptation | Paste positioning/brand voice docs directly; use a fresh chat per campaign to avoid tone drift from prior unrelated work | Defaults to generic SaaS marketing phrasing unless explicitly told to avoid specific stock phrases — always ban the clichés in-prompt |
| Claude | Best for genuinely distinct angle generation (headlines, repurposing, sequences) without repeating the same idea reworded | Paste full source material (long-form posts, positioning docs) directly — handles long context well for repurposing tasks | Can be overly cautious about "hype" language — if you want more energy in the copy, say so explicitly |
| Gemini | Best for SEO/keyword work needing current search landscape knowledge, and very long source documents for repurposing | Paste full transcripts/long articles in one go; useful for grounding SEO briefs in live data rather than model recall alone | Less consistent at strict word/character-count constraints — always verify character counts manually for meta tags/ads |
| Cursor | Not typically used for marketing copy directly, but useful if changelogs or landing page copy need to be committed straight into a docs/CMS repo | @-mention the existing changelog/CMS content file to match format and tone of prior entries | Will focus on code/structure correctness over copy quality — treat its copy output as a draft, refine tone separately |
| Windsurf | Same use case as Cursor — useful for committing marketing copy directly into a markdown-based CMS or docs site in the repo | Open the content directory/existing entries so new copy matches established voice and frontmatter structure | Same caveat as Cursor — verify tone/persuasiveness separately from structural correctness |
