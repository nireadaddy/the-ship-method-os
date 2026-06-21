# SCREEN_PLANNING.md

**Phase:** H — Human Flow
**Purpose:** A screen-by-screen planning template that goes one level deeper than `HUMAN_FLOW.md`'s Core Screens table. Where `HUMAN_FLOW.md` names *what screens exist*, this file specifies *what each screen must do* — every entry/exit point, every UI state, every mobile-vs-desktop difference — before it becomes a build-spec line item in `03-INSTRUCTION/AI_BUILD_SPEC.md`. Skipping this is how AI builders generate a gorgeous screen that has no idea where its data comes from or where the user goes next.

> Create one block per screen in your MVP. If a screen can't fill out every field below, it isn't specified enough to build yet.

---

## Screen Planning Template

> Copy this block once per screen.

### Screen: [Screen Name]

- **Purpose (one sentence):** [What job does this screen do for the user? Not "shows data" — "lets the user decide whether to follow up on a lead today."]

**Entry points** (where do users arrive from?)

| From | Trigger | What they expect to see on arrival |
|---|---|---|
| [e.g. Dashboard] | [e.g. clicks a row] | [e.g. that exact record, already loaded] |
| [e.g. Email notification] | [e.g. clicks link] | [e.g. deep-link directly to the relevant item, not the generic list] |
| [e.g. Direct URL/bookmark] | [e.g. typed/saved URL] | [e.g. same as above, even without prior navigation state] |

**Exit points** (where do they go next?)

| Action taken | Destination | Why this destination |
|---|---|---|
| [e.g. Save] | [e.g. back to list, with success toast] | [confirms the action landed, returns to the natural next task] |
| [e.g. Cancel] | [e.g. back to previous screen, no save] | [no surprise data loss, no surprise navigation] |
| [e.g. Delete] | [e.g. back to list, item removed] | [user shouldn't land on a now-nonexistent record] |

**Key components/elements**

| Component | Purpose | Notes |
|---|---|---|
| [e.g. Header with breadcrumb] | [orientation — where am I] | [should reflect real navigation depth] |
| [e.g. Primary action button] | [the one thing this screen wants the user to do] | [should be visually dominant — only one primary CTA per screen] |
| [e.g. Secondary actions] | [supporting tasks] | [de-emphasized — icon buttons, overflow menu, etc.] |

**States**

| State | What's shown | Notes |
|---|---|---|
| Loading | [skeleton/spinner — never a blank white screen] | [match the shape of the loaded content if using skeletons] |
| Empty | [explains why it's empty + a clear next action] | [see `HUMAN_FLOW.md` Section 7 for empty-state principles] |
| Error | [specific, actionable message + recovery action] | [see `HUMAN_FLOW.md` Section 6 for error-state principles] |
| Success | [confirmation — toast, inline message, or visual change] | [should be visible but not block the next action] |

**Mobile vs. desktop notes**

| Aspect | Desktop | Mobile |
|---|---|---|
| Layout | [e.g. multi-column, persistent sidebar] | [e.g. single column, sidebar becomes a drawer/tab bar] |
| Primary action placement | [e.g. top-right button] | [e.g. fixed bottom action bar / FAB] |
| Data density | [e.g. full table with all columns] | [e.g. condensed cards, progressive disclosure] |
| Input method assumptions | [mouse/keyboard — hover states usable] | [touch only — no hover-dependent affordances, larger tap targets ≥44px] |

---

## Worked Example: 3-Screen Flow (Dashboard List → Detail → Edit)

### Screen: Lead Dashboard (List)

- **Purpose:** Let the user see all their leads at a glance and decide which one needs attention today.

**Entry points**

| From | Trigger | What they expect to see on arrival |
|---|---|---|
| Login | Successful auth | Their full lead list, sorted by most urgent follow-up first |
| Primary nav | Clicks "Leads" | Same list, scroll position not preserved (fresh load is fine here) |
| Notification email | Clicks "View all leads" | Same list, with the relevant lead highlighted/scrolled into view |

**Exit points**

| Action taken | Destination | Why this destination |
|---|---|---|
| Clicks a lead row | Lead Detail screen | The natural next step is to see/act on that specific lead |
| Clicks "+ Add lead" | Add Lead modal (inline, not a new screen) | Adding a lead is fast and shouldn't interrupt the list context |
| Clicks logout | Login screen | Standard session-end behavior |

**Key components**

| Component | Purpose | Notes |
|---|---|---|
| Lead table/list | Core content — every lead with name, next follow-up date, status | Sortable by follow-up date by default |
| "+ Add lead" button | Primary action for this screen | Top-right on desktop, fixed bottom FAB on mobile |
| Filter/search bar | Narrow the list when it grows | Defer to V1 if MVP list size is small (<50 leads typical) |

**States**

| State | What's shown | Notes |
|---|---|---|
| Loading | Skeleton rows matching table shape | 3-5 skeleton rows, not a generic spinner |
| Empty | "No leads yet. Add your first one to get started." + prominent CTA | First-run state — see `HUMAN_FLOW.md` worked example |
| Error | "Couldn't load your leads — check your connection" + Retry button | Preserve any cached/previous list if one exists rather than blanking it |
| Success | N/A (list view has no save action) | — |

**Mobile vs. desktop notes**

| Aspect | Desktop | Mobile |
|---|---|---|
| Layout | Table with columns: Name, Status, Next Follow-up, Actions | Card list: name + status badge + follow-up date, tap to open |
| Primary action placement | Top-right "+ Add lead" button | Fixed bottom-right FAB |

---

### Screen: Lead Detail

- **Purpose:** Let the user review everything known about one lead and decide/take the next action (follow up, snooze, edit, delete).

**Entry points**

| From | Trigger | What they expect to see on arrival |
|---|---|---|
| Lead Dashboard | Clicks a row | That lead's full detail, already loaded — no second loading flash |
| Notification | Clicks "View lead" deep link | Same detail screen, directly, skipping the dashboard |

**Exit points**

| Action taken | Destination | Why this destination |
|---|---|---|
| Clicks "Edit" | Lead Edit screen | Explicit transition into edit mode |
| Clicks "Back" | Lead Dashboard | Returns to list context, scroll position restored if feasible |
| Clicks "Delete" | Lead Dashboard, with confirmation toast | Record no longer exists — don't leave user on a dead screen |
| Marks "Followed up" | Stays on Lead Detail, status updates inline | Confirms the action without losing context — no forced navigation |

**Key components**

| Component | Purpose | Notes |
|---|---|---|
| Lead info card | Name, contact info, notes, history | Read-only view; edits happen on the Edit screen, not inline here |
| "Mark followed up" / "Snooze" buttons | The core action this screen exists for | Equally weighted — neither should dominate, both are valid outcomes |
| "Edit" / "Delete" | Secondary actions | Icon buttons or overflow menu, de-emphasized vs. core actions |

**States**

| State | What's shown | Notes |
|---|---|---|
| Loading | Skeleton matching the info-card layout | — |
| Empty | N/A (detail screen always has a record, or 404s) | — |
| Error | "Lead not found" (404) or "Couldn't load this lead" (network) — distinct messages | 404 links back to dashboard; network error offers Retry |
| Success | Inline confirmation when status changes (e.g. checkmark animation) | No full-page reload needed |

**Mobile vs. desktop notes**

| Aspect | Desktop | Mobile |
|---|---|---|
| Layout | Two-column: info card left, action history/timeline right | Single column, stacked: info card, then actions, then history |
| Primary action placement | Inline buttons below info card | Fixed bottom action bar with "Mark followed up" as the dominant button |

---

### Screen: Lead Edit

- **Purpose:** Let the user change any field on a lead and save or discard those changes safely.

**Entry points**

| From | Trigger | What they expect to see on arrival |
|---|---|---|
| Lead Detail | Clicks "Edit" | Same lead, all fields pre-filled with current values, editable |

**Exit points**

| Action taken | Destination | Why this destination |
|---|---|---|
| Clicks "Save" | Lead Detail, with updated values + success toast | Confirms the save and shows the result immediately |
| Clicks "Cancel" | Lead Detail, no changes applied | No surprise data loss — and no surprise save either |
| Navigates away mid-edit (back button, link) | Confirmation prompt: "Discard unsaved changes?" | Prevents silent loss of in-progress edits |

**Key components**

| Component | Purpose | Notes |
|---|---|---|
| Editable form fields | Name, contact, notes, follow-up date | Follow-up date uses a date picker, not free text |
| "Save" / "Cancel" buttons | Commit or abandon the edit | Save disabled until at least one field has changed, to avoid no-op saves |

**States**

| State | What's shown | Notes |
|---|---|---|
| Loading | Form skeleton, fields disabled until data loads | — |
| Empty | N/A | — |
| Error | Inline field-level errors (e.g. invalid date) + a top-level save error if the API call fails | Form data is preserved on failed save — never force re-entry |
| Success | Toast on Lead Detail after redirect: "Lead updated" | — |

**Mobile vs. desktop notes**

| Aspect | Desktop | Mobile |
|---|---|---|
| Layout | Form fields in a centered card, max-width constrained | Full-width form, fields stacked, sticky Save/Cancel bar at bottom |
| Input method assumptions | Keyboard tabbing between fields expected to work cleanly | Date picker must be a native-feeling mobile picker, not a tiny desktop calendar widget |

---

**Next step:** With every MVP screen specified, fold these blocks into `03-INSTRUCTION/AI_BUILD_SPEC.md` as the screen-level requirements for your AI build prompts.
