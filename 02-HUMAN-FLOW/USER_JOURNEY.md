# USER_JOURNEY.md

**Phase:** H — Human Flow
**Purpose:** A stage-by-stage map of the full customer lifecycle — from never having heard of you to actively referring others. Where `HUMAN_FLOW.md` maps screens and steps, this file maps the human experience around those steps: what they feel, where they get stuck, and what you can do about it.

> Fill every row with a real, specific answer drawn from actual user conversations where possible. "They feel good" is not an emotion entry — "relieved that it didn't require a credit card" is.

---

## 1. How to Use This File

1. Map each stage independently — don't let "Activation" bleed into "Onboarding" just because they're adjacent in time.
2. For every row, write the **Pain Point** before the **Opportunity** — you can't design a fix for a problem you haven't named precisely.
3. Revisit this file every time you ship a feature that touches the journey. It goes stale fast.
4. Cross-reference: every Touchpoint listed here should map to a screen or channel in `INFORMATION_ARCHITECTURE.md` or `BUSINESS_MODEL.md` (distribution channels).

---

## 2. Journey Map Template

### Awareness
*The user doesn't know your product exists yet, but may know they have the problem.*

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| [describe X] | [describe X] | [describe X] | [describe X] | [describe X] |

### Consideration
*The user knows your product exists and is deciding whether to try it.*

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| [describe X] | [describe X] | [describe X] | [describe X] | [describe X] |

### Onboarding
*The user has signed up and is taking their first steps inside the product.*

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| [describe X] | [describe X] | [describe X] | [describe X] | [describe X] |

### Activation
*The user has experienced the core value of the product for the first time ("aha moment").*

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| [describe X] | [describe X] | [describe X] | [describe X] | [describe X] |

### Retention
*The user has made the product part of their routine and keeps coming back.*

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| [describe X] | [describe X] | [describe X] | [describe X] | [describe X] |

### Referral
*The user is satisfied enough to tell someone else, with or without an incentive.*

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| [describe X] | [describe X] | [describe X] | [describe X] | [describe X] |

---

## 3. Worked Example: AI-Builder SaaS Tool (Solo Founder CRM)

### Awareness

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| Scrolls Twitter/X, sees a post comparing the tool to spreadsheets | Organic social post / founder's personal account | Mild curiosity, mostly skeptical of "yet another tool" | Doesn't trust founder-led tools to still exist in 6 months | Show a public roadmap or changelog link in the post to signal active development |
| Searches "CRM for solo founders" on Google | SEO blog post / comparison page | Overwhelmed by too many options that all look the same | Can't tell which tool is actually built for them vs. enterprise repackaged | Comparison page that names the exact persona ("not for sales teams of 50") |
| Asks ChatGPT for a CRM recommendation | LLM-generated answer (if indexed/cited) | Trusting — treats AI recommendation as vetted | Product isn't mentioned because no structured content exists for LLMs to cite | Publish clear, factual "what is X" content that's easy for models to ingest and cite |

### Consideration

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| Visits pricing page before signing up | Pricing page | Anxious about hidden costs or being locked into annual billing | Can't tell what happens after the trial ends | State trial-to-paid transition explicitly: "No credit card required, no surprise charges" |
| Reads reviews/testimonials | Landing page social proof section, Product Hunt page | Looking for someone "like them" who succeeded | Testimonials feel generic or from unrelated personas (enterprise quotes on a solo-founder product) | Use testimonials that name the specific use case and result, with real names/photos |
| Compares to free alternative (a spreadsheet template) | Mental comparison, no specific touchpoint | Guilty about paying for something "a spreadsheet could do" | Doesn't yet feel the cost of the manual workaround | Comparison content showing time cost of spreadsheet workarounds at scale |

### Onboarding

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| Signs up with email, no credit card | Signup form | Relieved — low commitment | None significant if frictionless | Reinforce the "no card needed" choice immediately after signup |
| Answers a setup question (use case selection) | Onboarding wizard | Slight impatience — wants to "just see the product" | Too many setup questions before reaching the product | Cap onboarding questions at 1-2; defer the rest to contextual prompts inside the product |
| Sees their first dashboard | Dashboard, pre-populated with sample data | Curious, slightly disoriented if data feels foreign | Sample data doesn't resemble their actual leads/contacts | Let users name their own sample record during onboarding ("Add your first real lead") |

### Activation

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| Adds their first real lead/contact | Project/record creation screen | Small win — "okay, this works" | Doesn't yet see the *advantage* over a spreadsheet | Surface a feature spreadsheets can't do (auto follow-up reminder) immediately after the first record is added |
| Receives first automated follow-up reminder | Email/in-app notification | Pleasantly surprised — "it's already working for me" | If the reminder timing feels random/irrelevant, trust drops fast | Make the first reminder demonstrably useful and well-timed — this is the core "aha moment" |

### Retention

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| Logs in weekly to update lead statuses | Dashboard, recurring use | Comfortable, routine — product has become "just part of the job" | Forgets to log in if no external trigger | Weekly digest email summarizing pipeline status to pull users back |
| Hits free tier limit, considers upgrading | In-app upgrade prompt | Slight friction/annoyance if poorly timed | Feels punished mid-task if blocked abruptly | Soft-warn at 80% capacity; let the upgrade decision happen on their terms, not mid-task |

### Referral

| User Action | Touchpoint | Emotion | Pain Point | Opportunity |
|---|---|---|---|---|
| Mentions the tool to a peer founder in a Slack community | Word of mouth, unprompted | Proud — feels like an "insider tip" | No easy way to share a referral link in the moment | In-app "Invite a friend, you both get a month free" surfaced after a clear win moment |
| Posts a screenshot of their dashboard on social media | Organic UGC | Showing off productivity/organization | Default UI may not be "shareable" (cluttered, not visually clean) | Design a clean, shareable dashboard view or a "share my setup" export |

---

## 4. Journey-Wide Metrics to Track

| Stage | Metric to instrument | Target |
|---|---|---|
| Awareness | Visitor → signup conversion rate | [X]% |
| Consideration | Pricing page → signup conversion rate | [X]% |
| Onboarding | Signup → first real action completion rate | [X]% |
| Activation | Time to "aha moment" | < [X] minutes |
| Retention | Week 4 retention rate (cohort) | [X]% |
| Referral | % of new signups attributed to referral | [X]% |

---

**Next step:** Move to [`INFORMATION_ARCHITECTURE.md`](./INFORMATION_ARCHITECTURE.md) to translate these touchpoints into an actual sitemap, navigation structure, and route naming convention.
