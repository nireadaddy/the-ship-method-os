# VALIDATING_IDEA

## Purpose

Validate that a problem is real, painful enough, and worth solving — before writing a line of code. This SOP exists to stop builders from spending weeks building something nobody wants. It produces a go/no-go decision backed by evidence, not gut feel.

## When to Run

- Before filling out `PROJECT.md` in earnest, or in parallel with an early draft of it
- Whenever considering a pivot or a new core feature direction
- Before any significant build investment (more than a few days of work)

## Inputs

- A problem hypothesis (one sentence: "I believe [audience] struggles with [problem] because [reason]")
- Access to at least 10-15 people who plausibly belong to the target audience
- A few hours/days for interviews and a small budget (optional) for ad spend on a smoke test

## Step-by-Step Procedure

1. **Write the problem hypothesis as a falsifiable statement**, not a solution. E.g. "Freelance designers lose track of client feedback across email/Slack/DMs" — not "I should build a feedback aggregator."
2. **Define your "go" signal thresholds before collecting any data** (see Signal Thresholds table below). Decide success criteria up front so you can't rationalize weak data later.
3. **Recruit 10-15 people matching the target audience** for problem interviews. Use warm network, relevant communities, or paid recruiting if needed. Avoid only interviewing friends/family — bias risk.
4. **Run problem interviews (not solution pitches).** Ask about their current behavior and pain, not whether they'd use your idea. Use a structured script:
   - "Walk me through the last time you dealt with [problem area]."
   - "What do you currently use/do to handle this?"
   - "What's frustrating about that?"
   - "How much time/money does this cost you?"
   - "If this got solved perfectly, what would that look like?"
   - Never pitch your solution during the interview — you'll bias every answer that follows.
5. **Tag each interview as Strong Signal / Weak Signal / No Signal** based on whether they described real pain, already pay for a workaround, or have tried to solve it themselves.
6. **Build a one-page landing page smoke test** describing the solution (not the product itself) with a clear CTA — "Join the waitlist" or "Get early access." No working product needed yet.
7. **Drive targeted traffic to the landing page** — small paid spend ($50-200), relevant communities, or direct outreach to interview participants. Track visitors and conversion to signup.
8. **Run a pre-sale or deposit test if the model supports it** — ask for a small deposit, a LOI (letter of intent), or a "pay what you'd pay" pledge. Money/commitment is the strongest signal; "interested" is the weakest.
9. **Tabulate results against the signal thresholds.** Be honest — don't move the goalposts after seeing the data.
10. **Make the go/no-go call** and document it, including what would need to change to revisit a "no-go" idea later.
11. **If go: proceed to `MVP_BUILD.md`** carrying forward the strongest interview quotes and the smoke-test conversion data as the seed of your core flow definition.

## Signal Thresholds for "Go"

| Signal | Weak | Strong (Go) |
|---|---|---|
| Problem interviews reporting real, frequent pain | <40% of interviews | ≥60% of interviews describe the problem unprompted, with specifics |
| Existing paid workaround / spend on the problem | Nobody pays for anything related | ≥30% already pay for a partial solution (tool, service, person) |
| Landing page conversion (visitor → signup) | <5% | ≥10-15% for cold traffic, ≥25% for warm traffic |
| Pre-sale / deposit commitment | $0 collected, no LOIs | At least 3-5 people commit money or a signed LOI |
| Outreach response/interest rate | <10% reply to cold outreach | ≥20-30% reply and engage meaningfully |

## Outputs / Deliverables

- Problem hypothesis (validated or invalidated) with supporting evidence
- Interview notes log (10-15 interviews, tagged by signal strength)
- Landing page smoke test with conversion data
- Pre-sale/waitlist numbers if applicable
- Documented go/no-go decision with reasoning
- Carried-forward insights (strongest quotes, clearest pain points) for `PROJECT.md` and `MVP_BUILD.md`

## Common Pitfalls

- **Pitching the solution during problem interviews.** This produces false-positive enthusiasm ("sounds cool!") that doesn't predict purchase behavior.
- **Only interviewing easy-to-reach people (friends, existing network)** who are polite rather than honest.
- **Treating "that's a great idea!" as a strong signal.** Only specific pain, existing spend, or money-on-the-table counts as a strong signal.
- **Setting thresholds after seeing the data.** Lock thresholds in step 2, before any interviews.
- **Skipping the smoke test because "I already know people want it."** Interviews measure stated preference; landing page conversion measures revealed preference — you need both.
- **Letting a "no-go" idea linger half-validated.** Make the call, document it, move on.
