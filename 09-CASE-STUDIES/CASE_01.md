# Case Study 01: A Solo, Non-Technical Founder Ships a SaaS Dashboard in 6 Weeks

**Founder:** Solo (1 person, non-technical background — former operations manager, no prior coding experience)
**Product:** RouteMetric — a SaaS dashboard for small logistics/delivery companies to track driver routes, on-time rates, and fuel cost per delivery
**Tools:** Cursor (primary IDE), Claude (Sonnet, via Cursor + standalone chat for planning), Supabase (database/auth), Vercel (hosting), Stripe (billing)
**Timeline:** 6 weeks, roughly 25-30 hours/week
**Rough cost:** ~$430 total (Cursor Pro $20/mo x 2mo, Claude usage ~$150 across the build, Supabase free tier, Vercel free tier, domain $14, Stripe — no upfront cost)

## Situation

The founder, Lena, had spent four years as an operations manager at a regional courier company and kept seeing the same problem: small delivery companies (5-30 drivers) tracked on-time performance and fuel cost in spreadsheets that nobody updated consistently, so owners had no real-time view of which routes were bleeding money. She had no engineering background and had previously tried to hire a freelance developer for a similar idea — it cost $8,000 and the contractor disappeared after the wireframe stage. She decided to attempt building it herself using AI tools after seeing other non-technical founders ship products this way.

## SHIP Process Applied

**Structure (Days 1-3):** Lena used the `PROJECT.md` template, working through it in a Claude chat — describing the problem in plain language and letting Claude help her turn vague frustration ("owners don't know what's losing them money") into a specific vision, two personas (a 12-driver courier owner and his dispatcher), and an MVP scope cut down to exactly three things: route entry, on-time/late logging, and a cost-per-route dashboard. She explicitly cut driver mobile app, route optimization, and customer notifications from MVP — all of which she had originally wanted to build first.

**Human Flow (Days 4-7):** She sketched the core flow on paper first (dispatcher logs a route → marks it on-time/late → owner views dashboard), then asked Claude to turn that into a screen list and a simple flow diagram in Markdown. She did not use a dedicated design tool — she described each of the 4 core screens in detail in the spec doc instead, deciding wireframing tools would slow her down at this stage.

**Instruction (Days 8-12):** This was the highest-leverage phase. She wrote functional requirements as plain English bullet points, then asked Claude to convert them into one large AI build prompt covering data model, pages, and business logic (cost-per-route = fuel_cost + driver_hourly_rate × hours, computed per route then aggregated). She fed this prompt into Cursor, working feature-by-feature rather than asking for the whole app at once — first the data model and auth, then the route entry form, then the dashboard.

**Build (Days 13-35, woven through Instruction and into Publish):** Lena worked in Cursor with Claude doing the implementation, with her role shifting to reviewing diffs, running the app locally after each change, and reporting bugs back in plain language ("when I mark a route late, the dashboard total doesn't update until I refresh"). She hit two significant blockers: Supabase Row Level Security policies (resolved by asking Claude to explain RLS in the context of her specific tables, then having it write and test the policies) and Stripe webhook handling for subscription status (resolved similarly — she described the bug symptom, Claude traced it to a missing webhook signature verification step).

**Publish (Days 36-42):** She ran through the `QA_CHECKLIST.md` template, manually tested with two beta logistics companies recruited from a Facebook group for small courier business owners, fixed a timezone bug in the on-time calculation (drivers in different timezones threw off the daily summary), and launched a simple landing page with a 14-day free trial.

## Outcome

- Shipped to first paying customer on day 44 (slightly past the 6-week internal target, due to the timezone bug)
- 3 paying customers within 30 days post-launch, at $49/mo per company
- Total build cost ~$430, versus the $8,000 quote from the prior failed contractor attempt
- Lena estimates she would not have been able to scope the MVP correctly without the Structure phase — her first instinct was to build route optimization first, which the persona/JTBD exercise revealed was a "nice to have," not the thing owners were actually losing sleep over

## Lessons Learned

- **Cutting scope in Structure saved the most time, not Instruction.** The biggest time savings didn't come from AI writing code fast — it came from not building the wrong things in the first place.
- **Working feature-by-feature in Cursor outperformed one giant prompt.** Early attempts to generate the whole app in one shot produced code Lena couldn't debug because she didn't understand it. Smaller, sequential prompts kept her able to verify each piece.
- **RLS and billing webhooks were the two places "vibe coding" broke down** — both required her to actually understand the underlying concept (not just accept the AI's output) before she could verify it was correct, confirming that even non-technical founders need a baseline of comprehension for security- and money-related code.
- **Real beta users caught a bug spec review never would have** (the timezone issue), reinforcing that the Publish phase's manual QA with real users is non-negotiable, even for a 1-person team on a tight timeline.
