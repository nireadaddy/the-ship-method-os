# Theme & First Screen — Reference Guide

Used by the SHIP Method's **Theme & First Screen** step (first step of the
PUBLISH phase). It tells you how to turn the business described in `PROJECT.md`
into (a) 2-3 theme candidates the user can choose from, and (b) a real homepage.

## Where things live

In a `ship-create`-generated project the Next.js app is at the repo root:
- `app/globals.css` — theme tokens (HSL triplets) under `:root` and `.dark`
- `app/layout.tsx` — fonts via `next/font/google`, mapped to `--font-*` variables
- `app/page.tsx` — the root page (ships as a generic "Pick your area" screen)

In **this OS repo**, the same app lives under `starter-kit/` (e.g.
`starter-kit/app/globals.css`). Adjust paths accordingly.

Record the chosen theme in the design system doc:
`12-DESIGN-SYSTEM/DESIGN_SYSTEM.md` (or `docs/DESIGN_SYSTEM.md` in generated
projects).

## Step 1 — Derive 2-3 theme candidates

Read `PROJECT.md` (vision, business type, target audience, any stated brand
colors). Map the business to a palette direction and a font pairing using the
table below as a starting point — then tailor, don't copy blindly.

| Business / mood | Palette direction | Font pairing (display / sans) |
|---|---|---|
| Finance, B2B, trust | Cool navy/slate base, restrained single accent | Serif or grotesk display / neutral sans |
| Legal, premium, luxury | Deep neutral (ink/charcoal), gold or burgundy accent | Classic serif / humanist sans |
| Kids, play, consumer fun | Bright, high-saturation, multiple accents | Rounded geometric sans / rounded sans |
| Health, wellness, calm | Soft greens/teals, low saturation | Humanist serif / soft sans |
| Tech, SaaS, developer | Dark base, one electric accent | Geometric sans / mono accents |
| Food, hospitality, warm | Warm earth tones, appetizing accent | Editorial serif / friendly sans |
| Creative, agency, bold | High-contrast, expressive accent | Display serif or bold grotesk / clean sans |

Each candidate MUST specify, as HSL triplets, values for every token in
`globals.css`: `--background --foreground --card --card-foreground --primary
--primary-foreground --secondary --secondary-foreground --accent
--accent-foreground --muted --muted-foreground --destructive
--destructive-foreground --success --success-foreground --border --input --ring`
plus a `--radius`, and a font pairing for `--font-display`, `--font-sans`,
`--font-mono`.

Present the candidates to the user (a one-line mood + the key colors each).
Let the user pick one. Do NOT pick silently. Do NOT require brand assets — use
them only if `PROJECT.md` provides them.

## Step 2 — Apply the chosen theme

1. In `app/globals.css`, set the token values under BOTH `:root` and `.dark`
   (this kit keeps them identical). Keep the HSL-triplet format (e.g.
   `--primary: 14 92% 58%;`) so `hsl(var(--x))` keeps working.
2. In `app/layout.tsx`, swap the `next/font/google` imports to the chosen
   fonts, keeping the variable names `--font-display`, `--font-sans`,
   `--font-mono`. The starter uses `Fraunces` (display), `Work_Sans` (sans),
   `JetBrains_Mono` (mono) as the reference pattern.
3. Record the final palette + fonts in the design system doc as the source of
   truth for later UI work.

## Step 3 — Build the real first screen

Read `HUMAN_FLOW.md` and decide the true entry point for THIS business:
- Marketing-led (course, membership, leadgen) → root `app/page.tsx` becomes the
  landing/sale page.
- Tool/dashboard/internal → root becomes the app home, or redirects to the
  primary dashboard route.

Replace the generic "Pick your area" content in `app/page.tsx` with real content
drawn from the spec (no lorem). Adjust the main page of each area's route to
match. Then remind the user to update `FEATURE_MATRIX.md` and `QA_CHECKLIST.md`
if scope changed.
