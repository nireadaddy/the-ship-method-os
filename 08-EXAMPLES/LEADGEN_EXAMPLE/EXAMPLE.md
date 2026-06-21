# EXAMPLE: SunQuote — Lead-Gen Site for a Local Solar Installer

> Worked example of the SHIP Method applied end-to-end. Use this as a reference for how the templates in `01-04` translate into a real, fundable, buildable product.

## Structure

**Product Vision:** SunQuote is a lead-capture and qualification site that helps local solar installers fill their sales calendar with pre-qualified homeowners, by replacing generic "request a quote" forms with a guided estimate flow that filters out tire-kickers before a sales rep ever calls, without the installer paying $80-150 per lead to a national lead broker.

**Problem:** Local solar installers (5-30 employees) spend $3,000-8,000/month buying leads from Angi/EnergySage that are shared with 3-5 other installers and close at under 8%. Their own website typically has a single "Contact Us" form that captures almost nothing useful — no roof type, no electric bill, no homeownership status — so reps waste calls qualifying instead of selling.

**Target Audience:**

| Attribute | Description |
|---|---|
| Primary segment | Local/regional solar installation companies, 5-30 employees, single or multi-state |
| Secondary segment | Roofing or HVAC companies adding solar as a service line |
| Demographics / firmographics | Owner or sales manager, $2-15M annual revenue, currently buying leads from brokers |
| Where they hang out | Solar trade Facebook groups, Solar Power World, local trade shows |
| Currently pay for | EnergySage, Angi Leads, Modernize — $60-150 per shared lead |
| Buying trigger | Cost-per-acquisition from brokered leads crossed an unacceptable threshold |

**Personas:**

1. **Ray, 52, Owner of a 12-person solar install company** — Goal: cut cost-per-qualified-lead in half. Frustration: "I'm paying for the same lead my competitor across town is calling." Tech comfort: low. Success = a dashboard showing leads came from his own site, at a lower cost than brokered leads.
2. **Priya, 29, Homeowner researching solar** — Goal: get a real ballpark price without giving her info to five companies. Frustration: aggressive sales calls from lead-broker sites. Success = she gets a fast, specific estimate range and only one installer contacts her.

**MVP Scope:**
- In scope: multi-step quote estimator (address, roof type, electric bill range, homeownership confirmation), instant ballpark estimate, lead capture with qualification score, owner-facing lead inbox with score and contact info.
- Out of scope for MVP: live chat, financing calculator integration, automated SMS follow-up sequences, multi-location routing.
- MVP "done" definition: a homeowner can complete the estimator in under 90 seconds on mobile, and the installer receives a scored lead in their inbox within 60 seconds of submission.

## Human Flow

**Core User Flow:** Homeowner lands on page (from ad or organic) → Enters address → Answers 4 qualification questions (roof age, electric bill, ownership, timeline) → Sees instant estimate range → Submits contact info to "lock in" the estimate → Installer receives scored lead → Installer calls within their SLA window.

**Core Screens:**
1. **Landing Page** — single clear headline + "Get My Solar Estimate" CTA above the fold, social proof (installs completed, average savings), no navigation distractions.
2. **Multi-Step Estimator** — one question per screen (address autocomplete, roof type, monthly electric bill slider, own/rent toggle, timeline), progress bar, back button.
3. **Estimate Reveal + Contact Capture** — shows a savings range ("$140-180/mo estimated savings"), asks for name/phone/email to "send the full breakdown," includes a trust line ("We'll never sell your info").
4. **Installer Lead Inbox** — table of leads sorted by qualification score (high bill + own home + near-term timeline = hot), with one-click call/text and a status dropdown (new, contacted, quoted, won, lost).

## Instruction

**Functional Requirements:**
- FR1: System shall calculate a qualification score (0-100) per lead based on weighted inputs: homeownership (+40), electric bill >$150/mo (+30), timeline "within 3 months" (+20), roof age <15 years (+10).
- FR2: System shall send the installer an email and SMS notification within 60 seconds of a new lead submission, including the qualification score and a tel: link.
- FR3: System shall persist partial estimator completions (abandoned after question 2+) as "warm leads" distinct from full submissions, visible in a separate inbox tab.
- FR4: System shall display an estimate range computed from a simple formula (avg monthly bill × 0.75 × 12 months ÷ system cost assumption) rather than a generic static number, varying output per user input.

**AI Build Prompt:**
```
Build a Next.js 14 site called SunQuote for a local solar installer. Page 1: a high-converting landing page with hero, headline, CTA button "Get My Free Solar Estimate," and a testimonials section. Page 2: a 5-step multi-step form (address with Google Places autocomplete, roof type select, monthly electric bill slider $50-$500, own/rent radio, timeline select) using React state machine, with a progress bar and back navigation, saving partial progress to Supabase on every step so abandoned sessions are captured as "warm" leads. Final step: contact capture (name, phone, email) gated behind "see your estimate," then reveal an estimate range computed from bill × 0.75 × 12 / 25000 (rough payback heuristic). On submit: calculate a qualification score per the weighting above, insert into a `leads` table, and trigger a Resend email + Twilio SMS to the installer's notification number. Build an authenticated `/inbox` page listing leads sorted by score descending with status update dropdown. Use Tailwind, mobile-first, Lighthouse performance score target 90+.
```

## Publish

**Launch Checklist (excerpt):**
- [ ] Estimator completes end-to-end on a real mobile device (not just dev tools emulator) in under 90 seconds
- [ ] Lead notification (SMS + email) delivery tested and confirmed under 60 seconds from submission
- [ ] Abandoned/partial leads correctly tagged "warm" and excluded from hot-lead SLA timers
- [ ] Google Ads / Meta Ads pixel and conversion tracking fire correctly on lead submission, verified in ad platform event manager

**Success Metric:** Cost per qualified lead (qualification score ≥ 60) from paid traffic. Target: under $35/qualified lead within first 60 days, versus $80-150/lead from brokered sources.
