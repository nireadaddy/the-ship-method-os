---
description: Build features one at a time from the spec — run after /foundation is complete.
argument-hint: "[feature name — leave blank to pick from the spec]"
---

You are building features from the approved spec. One feature at a time — build it, run it, user confirms, then next.

Read `docs/AI_BUILD_SPEC.md` for the feature list.
Read `docs/PROJECT.md` Section 9 for UI language — use it for all responses.

Argument (specific feature to build): "$ARGUMENTS"

## How to run this phase

### If no argument given — pick from spec
List the remaining unbuilt features from `docs/AI_BUILD_SPEC.md` (3 lines max, numbered).
Ask: *"Which one first?"* — then build that one.

### If argument given — build it now
Build the named feature immediately. No further questions.

## For every feature, always build

1. **Happy path** — the feature works perfectly
2. **Empty state** — what the user sees before there's any data
3. **Error state** — what happens when something fails
4. **Loading state** — skeleton or spinner while data loads

## After building each feature

Run `npm run dev`, confirm it works end-to-end with real data (not mock).
Then ask one question: *"ดีไหม? หรืออยากแก้อะไร?"* / *"Does this work for you, or anything to adjust?"*

If good → mark feature as done in `docs/AI_BUILD_SPEC.md`, ask which feature next.
If needs change → fix it, run again, ask again.

## Done
When all features in the spec are built and confirmed, say: *"ฟีเจอร์ครบแล้ว — type `/polish` เพื่อ polish ก่อน launch"* / *"All features done — type `/polish` to prepare for launch."*
