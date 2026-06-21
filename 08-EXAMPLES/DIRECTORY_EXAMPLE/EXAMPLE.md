# EXAMPLE: AisleOne — Directory of Vetted Wedding Vendors

> Worked example of the SHIP Method applied end-to-end. Use this as a reference for how the templates in `01-04` translate into a real, fundable, buildable product.

## Structure

**Product Vision:** AisleOne is a curated local directory that helps engaged couples find wedding vendors they can trust without scrolling through hundreds of unvetted listings, by combining a hand-verified vendor list with a simple paid-featured-listing model for vendors, without the bloat, fake reviews, and pay-to-rank manipulation of The Knot or WeddingWire.

**Problem:** Couples planning a wedding (typically a 9-14 month process) report vendor discovery as one of their top stresses — existing directories are crowded with thousands of listings, inflated review counts, and "sponsored" results indistinguishable from organic ones. Local, high-quality vendors (photographers, florists, venues, caterers) in turn struggle to stand out against vendors who simply pay more for ad placement, regardless of quality.

**Opportunity:** A directory limited to one metro area (e.g., Austin, TX) with a strict vetting bar (minimum 3 verified real weddings, license/insurance check, response-rate tracking) can charge vendors a premium for a smaller, higher-intent audience — couples actively planning, not browsing.

**Target Audience:**

| Attribute | Description |
|---|---|
| Primary segment | Engaged couples in a single target metro, actively researching vendors (3-12 months out) |
| Secondary segment | Local wedding vendors (photographers, florists, venues, caterers, DJs) seeking qualified leads |
| Demographics | Couples: 25-35, household income $60k+. Vendors: small business owners, 1-10 employees |
| Where they hang out | Couples: Pinterest, Instagram, wedding subreddits, engagement-adjacent ads. Vendors: same platforms + local vendor Facebook groups |
| Currently pay for | Vendors pay $100-400/mo to The Knot/WeddingWire for listing placement with little ROI visibility |
| Buying trigger | Couples: just got engaged, starting vendor search. Vendors: current directory leads have gone cold/low-quality |

**Personas:**

1. **Couple: Mia & Sam, 28 & 29, recently engaged** — Goal: find 6-8 trustworthy vendors without wading through fake reviews. Frustration: "Every photographer has 200 five-star reviews, how do I tell who's actually good?" Success = they shortlist 3 vendors per category in under an hour.
2. **Vendor: Carla, 36, Wedding Florist (solo business)** — Goal: get inquiries from couples who are a genuine budget fit. Frustration: paying $250/mo to WeddingWire for 2 unqualified leads. Success = a featured listing that consistently sends 5+ qualified inquiries/month.

**MVP Scope:**
- In scope: vendor directory with category/budget filters, vendor profile pages, vetting badge system, inquiry form routed to vendor, paid "Featured" listing tier (Stripe), single metro launch.
- Out of scope for MVP: review/rating system, multi-metro expansion, vendor messaging inbox, booking/calendar integration.
- MVP "done" definition: a couple can filter by category + budget, view a vetted vendor profile, and submit an inquiry that reaches the vendor within minutes — and a vendor can self-serve upgrade to Featured via Stripe.

## Human Flow

**Core User Flow (Couple):** Land on homepage → Select category (e.g., Photographers) → Filter by budget range → Browse profile cards (Featured listings shown first) → Open vendor profile → Submit inquiry form → Receive confirmation email.
**Core User Flow (Vendor):** Apply via vetting form → Get approved/rejected by admin → Set up free profile → Optionally upgrade to Featured via Stripe → Receive inquiry notifications.

**Core Screens:**
1. **Category Browse Page** — grid of vendor cards (photo, name, starting price, vetted badge), filters (budget range, area, style tags), Featured listings visually distinct and pinned to top.
2. **Vendor Profile Page** — photo gallery, bio, pricing range, service area, vetting badge with hover explanation ("3+ verified weddings, license verified"), inquiry form.
3. **Vendor Application Form** — business info, license/insurance upload, 3 references from real weddings, portfolio links — submitted for admin review.
4. **Vendor Dashboard** — view incoming inquiries, profile edit, Featured upgrade CTA with a simple "leads this month" counter to justify the upgrade.

## Instruction

**Functional Requirements:**
- FR1: System shall display Featured-tier vendor listings above standard listings within each category, clearly labeled "Featured," with non-Featured listings sorted by vetting score or recency.
- FR2: System shall route inquiry form submissions to the vendor's registered email/SMS within 5 minutes, and log the inquiry in the vendor's dashboard regardless of delivery success.
- FR3: System shall gate a "Vetted" badge on a vendor profile behind admin approval of the vendor application (3 verified wedding references, license document uploaded), not self-attestation.
- FR4: System shall allow a vendor to self-serve upgrade to Featured via Stripe Checkout, automatically updating their listing placement on successful payment and reverting to standard placement on subscription cancellation.

**AI Build Prompt:**
```
Build a Next.js 14 + Supabase + Stripe directory site called AisleOne, launching for a single metro area. Entities: Vendor (category enum [photographer, florist, venue, caterer, dj], budget_tier, is_featured boolean, is_vetted boolean, status: pending|approved|rejected), VendorApplication (vendor_id, references JSON, license_url, portfolio_links), Inquiry (vendor_id, couple_name, couple_email, message, created_at).
Build: (1) a public category browse page with budget-range and category filters, querying approved vendors only, Featured vendors sorted first via `order by is_featured desc, created_at desc`; (2) a vendor profile page with photo gallery, vetted badge tooltip, and an inquiry form that inserts into Inquiry and triggers a Resend email to the vendor within the request lifecycle; (3) a public vendor application form with file upload (Supabase Storage) for license docs, inserting a `pending` Vendor + VendorApplication for admin review; (4) an admin-only page to approve/reject pending vendors (sets status and is_vetted); (5) a vendor dashboard showing their inquiries and a Stripe Checkout button for the Featured upgrade, with a webhook handler that sets is_featured = true on subscription creation and false on cancellation. Use Tailwind, mobile-first browse experience since most couples will discover via Instagram/Pinterest on mobile.
```

## Publish

**Launch Checklist (excerpt):**
- [ ] At least 15 vetted vendors per core category (photographer, florist, venue, caterer) live before public launch — empty categories kill trust instantly
- [ ] Inquiry delivery tested end-to-end (form submit → vendor email/SMS) with real vendor accounts, not just test addresses
- [ ] Featured-upgrade Stripe webhook tested for both activation and cancellation paths (listing correctly demotes on churn)
- [ ] Vendor application review SLA defined and met (e.g., reviewed within 48 hours) so approved vendors don't go cold

**Success Metric:** Vendor-side conversion to Featured tier (% of approved vendors who upgrade within 60 days of approval). Target: 20%, validating that the qualified-lead value proposition justifies the paid tier.
