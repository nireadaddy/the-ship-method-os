# HUMAN_FLOW.md

**Phase:** H — Human Flow
**Purpose:** Maps how a real person actually moves through your product — screen by screen, decision by decision — before you write a single AI build prompt. Skipping this step is the #1 reason AI-generated apps feel disjointed: the AI builds beautiful screens with no idea how they connect.

> Every screen named here should eventually exist as a route in `INFORMATION_ARCHITECTURE.md`. If you can't name the screen here, the AI can't build it with intent there.

---

## 1. User Journey

> The macro view: what does the user experience from "never heard of this" to "can't live without this"? Detailed stage-by-stage mapping lives in `USER_JOURNEY.md` — this section is the compressed version that anchors everything below it.

### Template

| Stage | What the user is trying to do | Where they are emotionally |
|---|---|---|
| Discovery | [describe X] | [describe X] |
| First use | [describe X] | [describe X] |
| Habitual use | [describe X] | [describe X] |
| Advocacy | [describe X] | [describe X] |

### Worked Mini-Example: Signup → First Value

| Stage | What the user is trying to do | Where they are emotionally |
|---|---|---|
| Discovery | Sees a tweet showing the product solving a problem they have | Skeptical but curious — "does this actually work or is it another tool I'll abandon" |
| First use | Signs up, expects to be productive in under 2 minutes | Impatient, evaluating — will bounce at the first confusing screen |
| Habitual use | Comes back daily because it's now part of their workflow | Comfortable, trusting — starts inviting teammates |
| Advocacy | Recommends it unprompted because it saved them real time | Proud to be an early adopter |

---

## 2. User Flow

> The sequence of *steps* a user takes to complete one specific task — more granular than the journey, less granular than a wireframe. Map one flow per core task.

### Template

```
[Entry point] → [Step 1: action] → [Step 2: action] → [Decision point?]
                                                          ├─ Yes → [Step 3a]
                                                          └─ No  → [Step 3b]
→ [Outcome / success state]
```

- **Flow name:** [describe X]
- **Entry point(s):** [where can a user start this flow — homepage CTA, email link, in-app nudge]
- **Steps required to reach value:** [count them — every extra step is a drop-off risk]
- **Exit points** (where can they bail, and is that okay?): [describe X]

### Worked Mini-Example: Signup → First Value

```
Landing page CTA → Email entered → Magic link sent → Link clicked
→ Account created → Onboarding question: "What are you trying to do?"
                                                ├─ "Track leads"     → Pre-filled CRM template loaded
                                                └─ "Manage projects" → Pre-filled project template loaded
→ User sees their first populated screen with sample data already in it
→ "Aha" moment: user edits the sample data to make it theirs
```

- **Flow name:** First-time signup to first edit (activation)
- **Entry point(s):** Landing page hero CTA, referral link, Product Hunt listing
- **Steps required to reach value:** 5 (email → link click → account → template choice → first edit)
- **Exit points:** User can abandon at email entry (no commitment yet, acceptable) or at template choice (concerning — means the templates don't match their need)

---

## 3. Navigation Structure

> How does a user get from any screen to any other screen? This is the connective tissue — detailed sitemap notation lives in `INFORMATION_ARCHITECTURE.md`.

### Template

| Nav element | Location | Items it contains | Visible to which persona/role |
|---|---|---|---|
| Primary nav | [describe X] | [list screens] | [describe X] |
| Secondary nav | [describe X] | [list screens] | [describe X] |
| User/account menu | [describe X] | [list items] | [describe X] |

### Worked Mini-Example

| Nav element | Location | Items it contains | Visible to which persona/role |
|---|---|---|---|
| Primary nav | Left sidebar | Dashboard, Projects, Reports, Settings | All logged-in users |
| Secondary nav | Top bar within Projects | List view / Board view toggle | All logged-in users |
| User/account menu | Top-right avatar dropdown | Profile, Billing, Invite team, Log out | All logged-in users; Billing hidden from non-admin roles |

---

## 4. Core Screens

> List every screen that exists in the MVP. If a screen isn't on this list, it shouldn't be in the build prompt yet.

### Template

| Screen name | Purpose (one sentence) | Primary action available | Persona who uses it most |
|---|---|---|---|
| [Screen name] | [describe X] | [describe X] | [describe X] |

### Worked Mini-Example

| Screen name | Purpose (one sentence) | Primary action available | Persona who uses it most |
|---|---|---|---|
| Landing page | Convince a visitor to start a trial | "Start free trial" CTA | First-time visitor |
| Signup | Capture email and create account with zero friction | Submit email for magic link | First-time visitor |
| Onboarding question | Route the user to a relevant starter template | Select use-case | New user, day 0 |
| Dashboard | Show the user their current state at a glance | Open a project / create new | Returning user |
| Project detail | Let the user do the core task (add/edit records) | Add record, edit record | Returning user, daily |
| Settings → Billing | Let the user manage their subscription | Upgrade, cancel, update card | Account admin |

---

## 5. Happy Path

> The single sequence where everything goes right — no errors, no hesitation, no edge cases. This is what your demo video shows.

### Template

```
1. [Step]
2. [Step]
3. [Step]
4. [Outcome: user has achieved value]
```

### Worked Mini-Example

```
1. User clicks "Start free trial" from landing page
2. User enters email, receives magic link instantly, clicks it
3. User answers one onboarding question ("Track leads")
4. User lands on dashboard pre-loaded with a sample lead pipeline
5. User edits one sample lead to reflect a real one
6. Outcome: user has created their first real record within 90 seconds
   of landing on the page — activation achieved
```

---

## 6. Error States

> Every screen with user input needs a defined error state. "The AI will figure it out" is how you get a blank white screen in production.

### Template

| Trigger | What the user sees | Recovery action available |
|---|---|---|
| [e.g., invalid input] | [describe X] | [describe X] |
| [e.g., network/API failure] | [describe X] | [describe X] |
| [e.g., permission denied] | [describe X] | [describe X] |

### Worked Mini-Example

| Trigger | What the user sees | Recovery action available |
|---|---|---|
| Magic link expired (>15 min old) | "This link has expired. We've sent you a new one." | New link auto-sent, no re-typing email |
| API/server error while saving a record | Inline toast: "Couldn't save — check your connection and try again" with the edited data preserved on screen | Retry button; data is not lost from the form |
| Non-admin tries to access Billing | Redirected to Dashboard with a toast: "Ask your account admin to manage billing" | Link to "Request admin access" (sends notification to admin) |

---

## 7. Empty States

> The first thing a new user sees before they have any data. A bad empty state (literally empty) kills activation. A good one teaches and invites action.

### Template

| Screen | What's shown when there's no data yet | Call to action |
|---|---|---|
| [Screen name] | [describe X] | [describe X] |

### Worked Mini-Example

| Screen | What's shown when there's no data yet | Call to action |
|---|---|---|
| Dashboard, brand-new account | Pre-loaded sample data with a banner: "This is sample data — try editing it" | "Edit this lead" highlighted with a subtle pulse animation |
| Project detail, after user deletes all records | Illustration + text: "No records yet. Add your first one to get started." | "+ Add record" button, large and centered |
| Reports, before enough data exists | "Reports unlock once you have 5+ records. You have 2." | Progress indicator (2/5) + "Add more records" link back to project |

---

## 8. Edge Cases

> The situations that aren't errors, but aren't the happy path either — they will happen, and "we'll deal with it later" is how trust erodes.

### Template

| Edge case | Why it matters | How the product should handle it |
|---|---|---|
| [describe X] | [describe X] | [describe X] |

### Worked Mini-Example

| Edge case | Why it matters | How the product should handle it |
|---|---|---|
| User signs up twice with the same email on different devices | Confusing if they think they have two accounts | Detect existing account on email entry, send login link instead of creating a duplicate |
| User on Free tier hits their usage cap mid-task | Hard usage walls mid-task feel punitive and kill trust | Soft warning at 80% usage ("You're close to your limit"), graceful upgrade prompt at 100% rather than a silent block |
| Team admin removes a user who has records assigned to them | Orphaned data breaks reports and ownership history | Reassign records to admin by default, prompt for reassignment instead of deleting silently |
| User's session expires while mid-edit on a long form | Losing unsaved work is one of the most trust-destroying UX failures | Autosave drafts client-side every 10s; restore draft on re-login |

---

**Next step:** Move to [`USER_JOURNEY.md`](./USER_JOURNEY.md) to map the full Awareness → Referral lifecycle in detail, stage by stage.
