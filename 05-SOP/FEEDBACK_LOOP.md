# FEEDBACK_LOOP

## Purpose

Establish a continuous, low-friction system for collecting, triaging, and responding to user feedback so that signal doesn't get lost in scattered Slack messages, DMs, and support tickets — and so the team can act on patterns instead of the loudest single voice.

## When to Run

- Continuously, starting from MVP share (informally) and formalized at V1 launch (per `SHIPPING_V1.md`)
- Weekly triage cadence at minimum; daily during the first 30 days post-launch
- Whenever a new feedback channel is added (new support tool, new community, new survey)

## Inputs

- Active feedback channels (see below)
- A single shared intake location (spreadsheet, Notion/Linear/Airtable board — pick one, do not split across tools)
- Defined triage categories and response SLAs (below)

## Step-by-Step Procedure

1. **Set up feedback channels** appropriate to the product stage — at minimum: in-app feedback widget, support email/chat, and a way to capture social/community mentions. Don't open more channels than you can monitor.
2. **Funnel every channel into one intake location.** No exceptions — feedback that lives only in someone's inbox or DMs is feedback that gets lost.
3. **Log every piece of feedback using the intake template** (below) immediately upon receipt, even if it will be triaged later.
4. **Tag each item by triage category** (Bug / Confusion / Feature Request / Praise / Churn Signal) at intake time, even roughly — refine during the triage meeting.
5. **Run a recurring triage session** (weekly minimum, daily during first 30 days post-launch) where the team reviews all new intake items together.
6. **Assign severity and priority** during triage using the same Blocker/Major/Minor/Cosmetic scale as `QA_CHECKLIST.md` for bugs, and a separate Now/Next/Later bucket for feature requests.
7. **Apply response SLAs** (below) and assign an owner to respond to the user, even if the answer is "not now, but thank you" — every piece of direct feedback deserves a reply.
8. **Look for repeated patterns across multiple users**, not just one-off requests — weight recurring themes higher than any single loud request.
9. **Route actionable items to the right destination**: bugs to the engineering backlog, feature requests to the product roadmap, usability confusion to `USER_TESTING.md` for deeper investigation if unclear, churn signals to direct outreach.
10. **Close the loop with users** whose feedback led to a shipped change — a short "you asked, we built it" message drives loyalty and more future feedback.
11. **Review feedback trends monthly** as part of `IMPROVING_PRODUCT.md` prioritization cadence — feedback volume/category shifts are a leading indicator of product health.

## Feedback Channels

| Channel | Best For | Monitoring Frequency |
|---|---|---|
| In-app feedback widget | Contextual, in-the-moment friction points | Daily |
| Support email/chat | Account/billing issues, bugs | Daily (or per SLA) |
| Onboarding survey (1-2 questions) | Expectation mismatch, first impressions | Weekly review |
| NPS / satisfaction prompt (day 7, day 30) | Overall sentiment trend | Monthly review |
| Social media mentions / community threads | Public sentiment, unsolicited reactions | 2-3x/week |
| Direct user interviews / calls | Deep qualitative insight | Ongoing, scheduled |
| Cancellation/churn survey | Why users leave | Reviewed at each triage |

## Intake Template

```
DATE RECEIVED: 
SOURCE CHANNEL: 
USER (name/email/account ID, anonymized if needed): 
RAW FEEDBACK (verbatim where possible): 
CATEGORY: [Bug / Confusion / Feature Request / Praise / Churn Signal]
SEVERITY (if bug): [Blocker / Major / Minor / Cosmetic]
PRIORITY (if feature request): [Now / Next / Later]
RELATED FLOW/FEATURE: 
OWNER ASSIGNED: 
RESPONSE SENT? [Y/N + date]
RESOLUTION/OUTCOME: 
```

## Triage Categories & Response SLAs

| Category | Definition | Response SLA | Routed To |
|---|---|---|---|
| **Bug** | Something is broken or behaves incorrectly | Blocker: same day. Major: 48h. Minor: 1 week | Engineering backlog |
| **Confusion** | User didn't understand how to do something the product supports | 48h acknowledgment | `USER_TESTING.md` if recurring |
| **Feature Request** | User wants new capability | 1 week acknowledgment (even if "not now") | Product roadmap (`IMPROVING_PRODUCT.md`) |
| **Praise** | Positive feedback, testimonial-worthy | 48h (thank + ask permission to use as testimonial) | Marketing/social proof library |
| **Churn Signal** | User expressing intent to leave or reduce usage | Same day outreach | Direct founder/CS outreach |

## Outputs / Deliverables

- Single, current feedback intake log
- Weekly triage notes with assigned owners and statuses
- Backlog items tagged with originating feedback source for traceability
- Monthly feedback trend summary feeding into `IMPROVING_PRODUCT.md`
- "Closed the loop" log of users notified when their feedback shipped

## Common Pitfalls

- **Letting feedback live in scattered tools** (some in Slack, some in email, some in someone's head) — funnel to one place, no exceptions.
- **Responding only to the loudest or most senior-sounding users.** Weight by pattern frequency, not volume of any one voice.
- **No SLA, so feedback sits unanswered for weeks.** Even "no" deserves a timely reply — silence reads as not caring.
- **Treating every feature request as a roadmap commitment.** Log it, categorize it, but prioritization happens in `IMPROVING_PRODUCT.md`, not ad hoc.
- **Not closing the loop after shipping a requested fix.** Users who feel heard become repeat feedback-givers and advocates; users who feel ignored stop bothering to tell you anything.
- **Skipping triage cadence when busy.** Feedback backlogs that go unreviewed for a month lose their signal value and bury real bugs among noise.
