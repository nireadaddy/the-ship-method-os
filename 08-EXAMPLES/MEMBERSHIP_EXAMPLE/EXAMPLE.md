# EXAMPLE: IronTribe — Paid Membership Site for a Fitness Coach

> Worked example of the SHIP Method applied end-to-end. Use this as a reference for how the templates in `01-04` translate into a real, fundable, buildable product.

## Structure

**Product Vision:** IronTribe is a tiered membership platform that helps a niche fitness coach turn a one-off audience of social media followers into recurring revenue, by combining structured programming, drip content, and a real community in one place, without forcing the coach to stitch together five disconnected tools (Trainerize, Discord, Stan Store, Mailchimp).

**Problem:** Mid-tier fitness creators (15k-150k followers) earn inconsistent income from one-off PDF program sales and sporadic 1:1 coaching slots. They have demand for ongoing accountability but no recurring-revenue product, and existing tools either lack community (Trainerize) or lack structured programming (Discord/Skool alone). A creator with 40k followers and a 1% conversion to a $39/mo membership could be earning $15,600/mo recurring — most are earning a fraction of that from one-time sales.

**Target Audience:**

| Attribute | Description |
|---|---|
| Primary segment | Fitness coaches/creators with an existing audience (15k-150k followers), no current membership product |
| Secondary segment | Their most engaged followers — "always trying programs, never sticking with one" |
| Demographics | Coach: 25-40, content-savvy, time-poor. Member: 25-45, has tried 3+ fitness apps/programs before |
| Where they hang out | Instagram, TikTok, YouTube (coach); same platforms + the coach's existing Discord/email list (members) |
| Currently pay for | One-off PDF programs ($30-80), occasional 1:1 coaching ($150-300/mo) |
| Buying trigger | Follower has stalled on a free program and wants structure + accountability |

**Personas:**

1. **Coach Talia, 31, Fitness Creator (62k followers)** — Goal: convert followers into $39/mo recurring members without building tech herself. Frustration: "I sell a PDF, they disappear in a week." Tech comfort: medium, uses Canva/Linktree. Success = a dashboard showing MRR growing and members logging workouts weekly.
2. **Member Jess, 29, Has tried 4 fitness apps** — Goal: stick with a program for once, with real accountability. Frustration: free content has no structure, paid programs have no community. Tech comfort: medium. Success = she logs in 3x/week and posts a win in the community feed.
3. **Member Devon, 34, Time-crunched dad** — Goal: efficient 30-min workouts that fit his life. Frustration: most fitness content assumes 90 minutes of free time. Success = the workout-of-the-day view loads instantly and he never has to search for "what's today's workout."

**MVP Scope:**
- In scope: two-tier subscription (Core $19/mo, Pro $39/mo with 1:1 form review), drip-released weekly workout plans, a single community feed, progress logging (weight/reps), Stripe billing.
- Out of scope for MVP: live group coaching calls, mobile app (web-responsive only), wearable integrations, gamified leaderboards.
- MVP "done" definition: a paying member can log in, see this week's unlocked workouts, log a completed session, and post in the community feed — and the coach can see active vs. churned members in one view.

## Human Flow

**Core User Flow:** Follower clicks link in bio → Lands on pricing/sales page → Picks a tier → Stripe checkout → Onboarding (goals + experience level) → Dashboard shows this week's program → Completes workout, logs it → Posts a win in community feed → Following week, new content auto-unlocks.

**Core Screens:**
1. **Pricing/Sales Page** — tier comparison table (Core vs Pro), founder video, testimonials, single CTA per tier straight to Stripe Checkout.
2. **Member Dashboard ("This Week")** — current week's workouts as cards, completion checkmarks, a streak counter, and a "next unlock" countdown.
3. **Workout Detail / Logger** — exercise list with sets/reps/video demo links, an inline log form (weight, reps, RPE), "mark complete" button.
4. **Community Feed** — chronological posts from members (wins, questions, check-ins), like/comment, pinned coach announcements at top.

## Instruction

**Functional Requirements:**
- FR1: System shall drip-release workout content on a weekly cadence tied to each member's subscription start date (not a global calendar date), so a member who joins mid-month still gets "Week 1" content on day one.
- FR2: System shall gate Pro-tier-only content (form review submission) behind subscription tier, returning a clear upgrade prompt to Core members who attempt access.
- FR3: System shall log every completed workout with timestamp, exercises, and logged weights/reps, and expose a per-member streak count (consecutive weeks with ≥3 logged sessions).
- FR4: System shall handle Stripe subscription webhooks (payment_failed, subscription.deleted) by moving the member to a "past due" or "churned" state that restricts dashboard access while preserving their historical log data.

**AI Build Prompt:**
```
Build a Next.js 14 + Supabase + Stripe membership platform called IronTribe. Entities: Member (tier: core|pro, status: active|past_due|churned, subscription_start_date), WorkoutWeek (week_number, title), Workout (belongs to WorkoutWeek, exercises as JSON [name, sets, reps, video_url]), WorkoutLog (member_id, workout_id, completed_at, sets_logged JSON), CommunityPost (member_id, body, created_at).
Build: (1) Stripe Checkout integration for two price IDs (Core/Pro) with webhook handlers for checkout.session.completed, invoice.payment_failed, and customer.subscription.deleted that update Member.status; (2) a dashboard at /dashboard showing WorkoutWeek content unlocked based on (today - subscription_start_date) / 7 days, never showing future weeks; (3) a workout logger component that POSTs to WorkoutLog and updates a streak calculation (consecutive weeks with 3+ logs); (4) a community feed page with post creation and a simple like count, gated to active members only via RLS; (5) Pro-only content sections that show an upgrade CTA modal for Core members instead of a 403. Use Tailwind + shadcn/ui.
```

## Publish

**Launch Checklist (excerpt):**
- [ ] Stripe webhook signature verification tested in production mode, not just test mode
- [ ] Drip-unlock logic verified for a member joining on day 29 of a 31-day month (no off-by-one week skip)
- [ ] Past-due member correctly loses dashboard access but retains all historical logs (no data loss on churn)
- [ ] Community feed moderation: coach can delete/pin any post; members can only delete their own

**Success Metric:** 90-day retention rate (% of members still active/paying at day 90). Target: 55%, benchmarked against typical fitness-app cohort retention of 30-40%.
