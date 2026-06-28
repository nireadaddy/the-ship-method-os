---
description: Add a new content item to config.ts — link, file download, or video. Sets the right access tier automatically.
argument-hint: "[title of the content]"
---

You are adding a new content item to this membership site. All content is managed in `config.ts` → `CONTENT_ITEMS`.

Read `config.ts` first to see existing items and categories.

Argument (content title hint): "$ARGUMENTS"

Ask the user — one question at a time:

1. **Title** — what is this piece of content called? (use `$ARGUMENTS` if provided)
2. **Description** — one sentence describing what members get
3. **Type** — is it a link (opens a URL), a file download, or a video?
4. **URL** — the link or download URL
5. **Category** — which category? (show existing categories from CONTENT_ITEMS, or let them create a new one)
6. **Tier** — who can access it?
   - `free` — everyone, including free members
   - `pro` — Pro + Team members only
   - `team` — Team members only

Once you have all answers, add to `CONTENT_ITEMS` in `config.ts`:

```ts
{
  slug: "[kebab-case-slug-from-title]",
  title: "[title]",
  description: "[description]",
  type: "[link|file|video]",
  url: "[url]",
  tier: "[free|pro|team]",
  category: "[category]",
},
```

Then confirm: "Added '[title]' as a [tier] [type] under [category]. It will appear on /content immediately — no rebuild needed."
