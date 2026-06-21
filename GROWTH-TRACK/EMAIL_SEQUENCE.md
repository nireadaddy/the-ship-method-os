# SHIP Builder List — 6-Email Nurture Sequence

**Purpose:** Move a brand-new subscriber from "just signed up" to "engaged community member who is aware of The SHIP Method OS as the next step." This is a lead-nurture sequence for the free Growth Track list — it builds trust and delivers real value first. Only the Day 14 email introduces the paid repo, framed as an optional upgrade for people who want to go further, not a hard pitch.

**Audience:** People who opted in on the Thai landing page (`LANDING_PAGE_TH.md`) by joining the "SHIP Builder List."

**Tone:** Direct, practical, peer-to-peer. No hype. Every email delivers something usable on its own, even if the reader never buys anything.

---

## Email 1 — Day 0 (Welcome + Quick Win)

**Subject:** You're in — here's your first SHIP template
**Subject (Thai variant):** เข้าร่วมแล้ว — นี่คือ Template แรกของคุณ

**Goal:** Confirm signup, deliver immediate value (a real template/checklist), set expectations for what's coming over the next two weeks.

**Body:**

Hey — you're officially on the SHIP Builder List. Welcome.

Here's the deal: I'm not going to send you "tips" or generic AI-builder advice. Every email in this list ships you something you can use the same day — a template, a prompt, a real case study, or a tool review. That's it. No fluff, no daily sales pitches.

To start, here's a one-page checklist you can use right now: **"5 Questions to Answer Before You Open Any AI Chat."** Most people who get stuck building with AI skip straight to "build me an app" — and AI takes that literally. It builds exactly what you asked for, including the gaps in your own thinking. This checklist forces you to answer the questions AI can't answer for you: who is this for, what's the one problem it solves, what's explicitly NOT in version one, what does "done" look like, and what tool are you using to build it.

Print it. Tape it next to your screen. Answer it before your next ChatGPT, Claude, or Cursor session — even if it takes you 10 minutes. That 10 minutes will save you the 3 hours you'd otherwise spend redirecting AI mid-build because it guessed wrong about what you wanted.

Over the next two weeks, I'll send you a short series that walks through exactly how people go from "vague idea" to "shipped product" using a repeatable method called SHIP. You'll see real examples, not theory.

For now — go answer those 5 questions for whatever you're building right now. Reply to this email and tell me what you're building. I read every reply.

**CTA:** Reply with what you're currently trying to build (even if it's messy or half-formed).

---

## Email 2 — Day 1 (The Real Reason Builds Fail)

**Subject:** Why your AI-built app keeps breaking (it's not the AI)
**Subject (Thai variant):** ทำไมแอปที่ AI สร้างให้คุณพังตลอด (ไม่ใช่ความผิดของ AI)

**Goal:** Reframe the core belief — AI isn't the bottleneck, missing structure is. Build credibility by naming the exact failure pattern the reader has experienced.

**Body:**

Yesterday I asked what you're building. If you replied — thank you, I'm reading these.

Today I want to talk about the pattern almost every reply has in common, whether someone's building a CRM, a directory site, or an internal tool: they open a new AI chat, type something like "build me an app that does X," and three hours later they're debugging code that contradicts itself.

Here's what's actually happening. AI is an extremely fast, extremely literal builder. It does not fail because it can't code — it fails because it's building exactly what you asked, including everything you didn't think to specify. If you don't tell it who the user is, it guesses. If you don't tell it what's out of scope, it builds everything. If you don't give it the context from yesterday's session, it starts from zero today — and yesterday's code and today's code start fighting each other.

This is the single most common reason AI-built products end up half-broken, scope-creeped, or abandoned. Not bad prompting in the way most people think of "bad prompting" (typos, vague wording) — but missing structure. The thinking that should happen before the first prompt never happened at all.

The fix isn't a better prompt. It's a different order of operations: define the structure (who/what/why/scope) before you touch the experience design, design the experience before you write specs, write specs before you generate code, generate code before you publish. Skip a step, and AI fills the gap with its best guess — which is almost never your actual intent.

That order has a name: **SHIP** — Structure, Human Flow, Instruction, Publish. Tomorrow I'll show you what Structure actually looks like in practice, with a real before/after.

**CTA:** Hit reply and tell me — at which step did your last AI build go sideways: defining scope, designing the flow, briefing AI, or shipping it?

---

## Email 3 — Day 3 (Structure — Before/After Example)

**Subject:** The 4 sentences that would've saved my last 3 rebuilds
**Subject (Thai variant):** 4 ประโยคที่ถ้าเขียนไว้ก่อน จะช่วยให้ไม่ต้องสร้างใหม่ 3 รอบ

**Goal:** Teach the "Structure" (S) phase concretely with a real before/after prompt comparison. Deliver a usable mini-template.

**Body:**

Let's get concrete. Here's the difference between a prompt that produces three hours of confused back-and-forth, and one that produces something close to right on the first try.

**Before (no Structure):**
"Build me a booking app for meeting rooms."

That's it. That's the whole brief. AI will now make a dozen silent decisions for you: how many rooms, whether there's login, whether there's an approval flow, what happens on conflicts, what the tech stack is, whether there's a mobile app. None of those guesses will match what's in your head. You'll spend the next two hours discovering the mismatches one at a time.

**After (with Structure):**
"Build a meeting room booking tool for a single office team of 10-30 people. The problem: people currently double-book rooms over a group chat. MVP scope: view room availability, create a booking, cancel a booking. Explicitly NOT in v1: approval workflows, mobile app, recurring bookings. Stack: Next.js + Supabase."

Same request. Four extra sentences. The difference in output quality is not incremental — it's the difference between AI building your product and AI building its best guess at your product.

That's the entire idea behind the **S — Structure** phase of SHIP: before you open any AI chat, write down (1) who this is for, (2) what problem it solves, (3) what's in scope for v1, (4) what's explicitly NOT in scope yet. Four lines. Takes five minutes. Saves hours.

Try rewriting your current project brief using that four-line structure right now, before your next AI session. If you want, reply with your "before" version and I'll send back what I'd change.

**CTA:** Rewrite your project brief using the 4-line Structure format and paste it into your next AI prompt.

---

## Email 4 — Day 5 (Human Flow + Instruction)

**Subject:** Don't let AI design your UX for you
**Subject (Thai variant):** อย่าให้ AI ออกแบบ UX ให้คุณเอง

**Goal:** Introduce Human Flow (H) and Instruction (I) phases, show how skipping UX design before coding causes rework, deliver a mini-framework.

**Body:**

Once you've nailed Structure, there's a second trap that catches almost everyone: jumping straight from "I know what I'm building" to "AI, generate the code" — without ever drawing out how a real person moves through the product.

Here's why that matters. If you don't define the user's path first, AI will invent one — and it'll default to the most generic, feature-heavy version it can imagine. Login screens you didn't need. Dashboards nobody asked for. Settings pages for options that don't exist yet. You end up maintaining UI surface area that has nothing to do with your actual MVP.

This is the **H — Human Flow** phase: before any code, map the actual journey. Entry point → the one core action → what happens on success → what happens on failure or empty states → exit. For the meeting room example from Tuesday's email: user opens the app → sees today's room availability immediately, no login required → picks a room → enters name and time → confirms → gets a cancellation link by email. Five steps. No dashboard. No login. Because the Structure email already said those were out of scope — Human Flow just makes the path concrete.

Once that flow exists on paper (or in a rough sketch — it doesn't need to be pretty), you're ready for **I — Instruction**: turning the flow into a spec AI can build from without guessing. Instead of "build the booking logic," you write: "Bookings table has room_id, user_email, start_time, end_time, status. Reject any booking that overlaps an existing one for the same room. Stack: Next.js + Supabase." Specific enough that two different AI tools, given the same spec, would build functionally the same thing.

Structure tells AI what to build. Human Flow tells it how the user experiences it. Instruction tells it exactly how to build it. Skip either of the first two, and Instruction becomes guesswork dressed up as a spec.

**CTA:** Sketch your core user flow in 5 steps or fewer (pen and paper is fine) before your next build session — then reply and tell me how many steps you ended up with.

---

## Email 5 — Day 7 (Case Study + Community)

**Subject:** From "3 months, nothing shipped" to live in 2 weeks
**Subject (Thai variant):** จาก "3 เดือน ไม่มีอะไรเสร็จเลย" สู่การ Ship จริงใน 2 สัปดาห์

**Goal:** Build social proof and momentum through a real case study, reinforce the full SHIP arc, invite engagement to build community feel.

**Body:**

A clinic owner with zero coding background had been trying to build a simple appointment-booking tool for three months. Three different AI tools, dozens of restarted chat sessions, nothing ever reached "done." Every time she added a feature, something else broke. She told me it felt like the AI was actively working against her.

Here's what changed it: she stopped opening AI chats and started writing four lines of Structure first. Who is this for — her own clinic's patients. What problem — phone-tag scheduling that wasted staff time. MVP scope — book an appointment, get an SMS reminder. Explicitly not in v1 — multi-location support, staff logins, payment processing, a whole list of "nice to haves" she'd been quietly building toward for three months without realizing it.

That alone cut her build scope by more than half. Then she spent twenty minutes sketching the Human Flow — patient opens a link, picks a time slot, enters their phone number, confirms, done — before writing a single line of AI prompt. When she finally sat down to brief the AI tool she'd already been using for three months, the spec was four sentences instead of a vague paragraph.

Two weeks later, it was live. Same AI tool. Same person. The only thing that changed was the order of operations — Structure before Human Flow before Instruction before code.

This is the exact pattern across almost every "stuck for months, shipped in weeks" story I hear: the bottleneck was never the AI's capability. It was skipping the thinking that AI can't do for you.

If you've got a project that's been stuck, this is your sign to apply the same order to it this week — even just the Structure step alone.

**CTA:** Reply with one sentence describing what's been "almost done" the longest in your build queue — I want to know what's stuck.

---

## Email 6 — Day 14 (Soft Introduction to The SHIP Method OS)

**Subject:** When you're ready for the full system (no pressure)
**Subject (Thai variant):** เมื่อคุณพร้อมสำหรับระบบฉบับสมบูรณ์ (ไม่กดดัน)

**Goal:** Introduce the paid SHIP Method OS repo as a natural next step for people who want the complete system, without being pushy. Position it as an upgrade path for serious builders, not a hard sell.

**Body:**

Over the last two weeks, you've gotten the core ideas behind SHIP — Structure, Human Flow, Instruction, Publish — plus templates and a real example of someone applying it. If you've used even one piece of it on a real project, you already know the difference it makes versus opening a blank AI chat and hoping.

I want to be straightforward about something: everything I've sent you so far is the free version. It's enough to fundamentally change how you brief AI tools, and I'd rather you get real value from the free content than feel like you're missing something critical. That's genuinely the point of this list.

But if you're the kind of builder who wants the complete operating system — not just the concepts, but the actual scaffolding — that's what **The SHIP Method OS** is. It's the full repo: every template for the phases I've described (Structure, Human Flow, Instruction, Publish), product-type starter packs for SaaS, CRM, membership sites, directories, lead-gen sites, dashboards, internal tools, and marketplaces, a complete prompt library organized by role (product, UX, dev, marketing), worked end-to-end examples and case studies, plus the standards and design system docs that keep AI output consistent instead of generic.

It's built for the exact moment you're at right now: you understand why structure matters, and you're ready to stop reinventing the wheel for every new project. Instead of writing your own Structure docs from scratch each time, you start from a tested template. Instead of guessing which prompt sequence works, you use the 6-stage chain that's already mapped out: Idea → Product Spec → UX Spec → Tech Spec → Build Plan → Code Generation.

It's not for everyone on this list, and that's fine — plenty of people will keep building well with just the free content, and I'll keep sending it. But if you've got a real product you're trying to ship and you want the complete system behind it, this is the next step.

No pressure, no countdown timer. It'll be there when you're ready. In the meantime, keep replying — I read every one, and your next case study might be the one I feature.

**CTA:** If you want the complete system, check out The SHIP Method OS — link below. If not, just keep building with what you've got; more free templates and case studies are still coming.

---

## Sequence Summary

| Day | Subject (EN) | Goal | CTA |
|---|---|---|---|
| 0 | You're in — here's your first SHIP template | Deliver quick win, set expectations | Reply with current project |
| 1 | Why your AI-built app keeps breaking (it's not the AI) | Reframe belief: structure > AI capability | Reply: where did your build go sideways |
| 3 | The 4 sentences that would've saved my last 3 rebuilds | Teach Structure (S) with before/after | Rewrite your brief using 4-line Structure |
| 5 | Don't let AI design your UX for you | Teach Human Flow (H) + Instruction (I) | Sketch your flow in 5 steps or fewer |
| 7 | From "3 months, nothing shipped" to live in 2 weeks | Social proof, momentum, community | Reply with your stuck project |
| 14 | When you're ready for the full system (no pressure) | Soft intro to paid SHIP Method OS repo | Check out the full repo (optional) |
