# Lead Capture Strategy — The SHIP Method OS Growth Track

**Purpose:** Define the full funnel system that turns cold audience attention into paying customers of The SHIP Method OS, without ever repositioning the core repo as free. The Growth Track (this `GROWTH-TRACK/` folder) is the lead-gen layer; the paid repo is the product. This document is the architecture connecting them.

**Core principle:** Every stage gives real value standalone — nobody should feel tricked at any point. But every stage is also intentionally incomplete in a specific way that the next stage (and eventually the paid repo) resolves. Content teaches the thinking; the lead magnet gives a taste of the system; the email sequence builds trust and proof; the repo is where the actual templates, SOPs, and prompt libraries live.

---

## The Funnel

```
┌─────────────────┐
│   1. CONTENT     │   TikTok / FB / LinkedIn / X / Threads / YouTube
│  (CONTENT_       │   Free, public, algorithm-distributed
│   SYSTEM.md)     │
└────────┬─────────┘
         │  CTA → link-in-bio or direct link
         ▼
┌─────────────────┐
│  2. LANDING PAGE │   LANDING_PAGE_TH.md
│                  │   Single offer: SHIP Canvas (SHIP_CANVAS.md)
│                  │   in exchange for email
└────────┬─────────┘
         │  Opt-in form submit
         ▼
┌─────────────────┐
│ 3. EMAIL CAPTURE │   Email service provider (ESP) list: "SHIP Builder List"
│                  │   Instant delivery of SHIP Canvas (PDF)
└────────┬─────────┘
         │  Welcome email fires automatically
         ▼
┌─────────────────┐
│ 4. GITHUB REPO   │   Public-facing GitHub repo (free tier / preview tier)
│  (free preview)  │   Shows real structure of The SHIP Method OS —
│                  │   proof of depth, not the full paid content
└────────┬─────────┘
         │  Reader explores repo, sees what's locked vs. open
         ▼
┌─────────────────┐
│ 5. EMAIL         │   EMAIL_SEQUENCE.md — 6 emails over ~14 days
│   SEQUENCE       │   Nurture → trust → proof → Day 14 paid intro
└────────┬─────────┘
         │  Click-through to purchase page OR community invite
         ▼
┌─────────────────┐
│ 6. COMMUNITY     │   Discord/Slack/Circle — for engaged non-buyers
│  (warm pool)     │   AND buyers (post-purchase upgrade path)
└──────────────────┘
         │
         └──► Loops back: community members become case studies
              and testimonials that feed back into Stage 1 content.
```

---

## Stage 1 — Content

**Purpose:** Generate cold-to-warm attention at scale and establish authority on the SHIP framework before asking for anything.

**What lives here:**
- `CONTENT_SYSTEM.md` — hook templates, content idea bank, 4-week calendar, platform-specific CTAs.
- Native content per platform: TikTok/YouTube Shorts videos, LinkedIn/Facebook posts and carousels, X/Threads threads, long-form YouTube.

**Conversion goal/metric:** Click-through rate from content to landing page (or bio link visit rate where platforms don't allow direct links). Target: 2-4% CTR on content with a clear CTA.

**Handoff mechanism:** Every piece of content ends in one of the 8 CTA templates from `CONTENT_SYSTEM.md`, routing either to a link-in-bio (TikTok, Instagram, Threads) or a direct link (LinkedIn, X, Facebook, YouTube description) — both ultimately landing on the same single URL: the landing page.

---

## Stage 2 — Landing Page

**Purpose:** Convert a content-warmed visitor into an email subscriber by making one specific, low-friction offer — not a generic newsletter signup.

**What lives here:**
- `LANDING_PAGE_TH.md` — the Thai-language landing page copy and structure.
- The single lead magnet offered: the SHIP Canvas (full spec in `SHIP_CANVAS.md`), positioned as "turn your idea into a product plan in 15 minutes."

**Conversion goal/metric:** Visitor-to-signup conversion rate. Target: 25-35% (single, specific lead magnet pages should convert well above generic "subscribe to our newsletter" pages, which typically sit at 2-5%).

**Handoff mechanism:** Opt-in form submission writes the email to the ESP under the "SHIP Builder List" tag/segment, which triggers the welcome automation immediately — no manual step.

---

## Stage 3 — Email Capture

**Purpose:** Lock in the lead as an owned audience asset (not rented, like a social following) and deliver the promised value instantly so trust starts on the right foot.

**What lives here:**
- ESP list: "SHIP Builder List" (referenced by name in `EMAIL_SEQUENCE.md`).
- Automated delivery email containing the SHIP Canvas PDF (per the PDF spec in `SHIP_CANVAS.md`).

**Conversion goal/metric:** Email deliverability/open rate on the delivery email. Target: 60%+ open rate (this email is expected and wanted, so it should outperform later sequence emails).

**Handoff mechanism:** ESP automation enrolls the new subscriber into the 6-email nurture sequence starting Day 0, no manual triggering required.

---

## Stage 4 — GitHub Repository (Free Preview)

**Purpose:** Let the subscriber self-verify that the depth they were promised actually exists, building credibility for the paid ask later — without giving away the paid content itself.

**What lives here:**
- A public-facing version of the repo structure (folder names, README, table of contents visible) with the actual templates/SOPs/prompt libraries either gated, stubbed, or limited to one fully-open example folder (e.g., one example from `08-EXAMPLES/` fully visible, others locked).
- This is referenced inside the email sequence and on the landing page as "see the real structure behind this."

**Conversion goal/metric:** Repo visit rate from email/content links, and % of repo visitors who return to the email list or landing page (a soft signal of genuine interest vs. drive-by curiosity). Target: 15-20% of subscribers visit the repo at least once during the sequence.

**Handoff mechanism:** Repo README and any open example end with a clear, non-pushy link back to "join the SHIP Builder List" (for those who arrived at the repo without opting in first, e.g., via GitHub search/stars) and a link to the purchase page (for those ready to buy without further nurture).

---

## Stage 5 — Email Sequence

**Purpose:** Build trust through value-first emails, demonstrate the SHIP framework with real teaching content, and introduce the paid product exactly once, late, and as an optional upgrade — not a hard pitch.

**What lives here:**
- `EMAIL_SEQUENCE.md` — the full 6-email, ~14-day sequence (Day 0 welcome through Day 14 paid intro).
- Cross-references to `CONTENT_SYSTEM.md` ideas (emails often repurpose or extend a content idea into long-form) and `SHIP_CANVAS.md` (the canvas is referenced as "what you already have" before introducing "what comes after it").

**Conversion goal/metric:** Click-through rate on the Day 14 paid-intro email, and ultimately email-to-purchase conversion rate. Target: 8-12% CTR on the Day 14 email; 1-3% of the original list converting to paid within 30 days of the sequence completing.

**Handoff mechanism:** Day 14 email links directly to the purchase/checkout page for The SHIP Method OS. Subscribers who don't convert immediately are moved to a lower-frequency "evergreen nurture" list and invited to the community (Stage 6) regardless of purchase status — the relationship doesn't end at a missed sale.

---

## Stage 6 — Community

**Purpose:** Keep warm, non-converted leads engaged long enough to convert later, and give buyers a place to get support, share progress, and generate case studies — which feeds new raw material back into Stage 1 content.

**What lives here:**
- A Discord/Slack/Circle community, open to both free-list members and paying customers (with a clearly better experience — dedicated channels, direct access, templates discussion — reserved for paying customers, so the free tier never feels equal to paid).
- Prompts for members to share what they're building, referencing the SHIP Canvas or repo.

**Conversion goal/metric:** % of community members who convert to paid within 90 days (target: higher than the cold email-only conversion rate, since community members are self-selected as engaged — target 5-8%), and number of member stories collected per month that can become new case-study content (target: 2-4/month).

**Handoff mechanism:** This stage has no further "next stage" — it's the retention/advocacy loop. Member wins and questions get turned into new content ideas (closing the loop back to Stage 1), and member upgrade moments get turned into testimonials used on the landing page and in content.

---

## Metrics Dashboard Template

Track monthly. Update "Current" each review cycle; revisit "Target" quarterly as baseline data comes in.

| Stage | Metric | Target | Current |
|---|---|---|---|
| 1. Content | Click-through rate to landing page | 2-4% | |
| 1. Content | Posts published per week (all platforms) | 6-7 | |
| 2. Landing Page | Visitor-to-signup conversion rate | 25-35% | |
| 3. Email Capture | Delivery email open rate | 60%+ | |
| 3. Email Capture | New subscribers per month | (set per traffic volume) | |
| 4. GitHub Repo | % of subscribers visiting repo | 15-20% | |
| 5. Email Sequence | Day 14 (paid intro) email CTR | 8-12% | |
| 5. Email Sequence | List-to-purchase conversion (30-day) | 1-3% | |
| 6. Community | Community join rate (of subscribers) | 10-15% | |
| 6. Community | Community-to-paid conversion (90-day) | 5-8% | |
| 6. Community | New case studies sourced/month | 2-4 | |
| Overall | Cost per acquired email (if running paid content/ads) | (set per budget) | |
| Overall | Cost per paying customer (blended) | (set per margin target) | |

---

## Staying Distinct From — and Feeding — the Paid Repo

- **The Growth Track never contains the actual system.** The SHIP Canvas is a compressed, one-page version of `01-STRUCTURE/PROJECT.md` alone — it does not touch Human Flow journey maps, AI build specs, database specs, SOPs, or the prompt libraries in `07-PROMPTS/`. Free content teaches *why* structure matters; it never hands over the *templates* that make structure repeatable across projects.
- **The free GitHub preview is a window, not a door.** It proves the depth of the real repo exists (folder structure, one open example) without making the rest accessible. Anyone who wants the other 90% has exactly one path: buy the OS.
- **The email sequence sells trust, not hype.** Five of six emails deliver standalone value with zero pitch. Only the Day 14 email introduces the paid product, and it's framed as "for people who want to go further," never as something the free content failed to deliver. This protects the perceived completeness of the free tier while still making the paid upgrade feel like the obvious next step for serious builders.
- **The community has a two-tier experience by design.** Free members get peer support and visibility into what's possible; paying members get the deeper access (direct support, full template discussion, faster help). This tier gap is the ongoing, evergreen conversion mechanism after the email sequence ends — and it's also the source of new proof (testimonials, case studies) that goes back into Stage 1 content, keeping the whole funnel self-reinforcing instead of a one-time campaign.
