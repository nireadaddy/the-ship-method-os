# Directory Website Template

A directory's entire value proposition is "comprehensive + easy to find what you need" — which means the plan must obsess over taxonomy (categories, tags, filters) before a single listing is entered. The chicken-and-egg problem is real: nobody searches an empty directory, and nobody submits to a directory nobody searches. Solve this in the plan, not in code — usually by seeding listings yourself (scrape/curate the first 50-200) before opening public submissions. Build search/filter and the listing detail page first; claim/submit flows and monetization come after you've proven people search.

## Feature Checklist

- [ ] Listing records with structured fields (name, category, location, description, contact)
- [ ] Category/taxonomy structure (categories, subcategories, tags)
- [ ] Search (by keyword) and filter (by category, location, attributes)
- [ ] Listing detail page (SEO-friendly URL, structured data for search engines)
- [ ] Submit-a-listing form (public or gated)
- [ ] Claim-a-listing flow (verify ownership of an existing unclaimed listing)
- [ ] Admin moderation queue (approve/reject new and claimed listings)
- [ ] Featured/sponsored listing placement (paid boost)
- [ ] Reviews or ratings on listings (optional but common)
- [ ] Map view (if location-relevant)
- [ ] Listing owner dashboard (edit own listing, view basic stats)
- [ ] SEO essentials: sitemap, meta tags per listing, canonical URLs
- [ ] Reporting for admin: listing count by category, top searched terms

## Data Model Starter

| Entity | Key Fields | Relationships |
|---|---|---|
| Listing | name, slug, description, status (pending/approved/rejected), location, claimed_by | belongs to Category; has many Reviews; optionally belongs to Owner (User) |
| Category | name, slug, parent_category_id | has many Listings; self-referencing for subcategories |
| Owner (User) | name, email, role | has many Listings (claimed) |
| Review | rating, body, author_name, listing_id | belongs to Listing |
| Featured Placement | listing_id, start_date, end_date, price_paid | belongs to Listing |
| Submission | raw submitted fields, status, submitted_at | converts into Listing upon approval |

## Core User Flows

1. Visitor searches/filters directory → views listing detail → contacts business or clicks through
2. Business owner submits new listing → admin reviews → listing goes live
3. Business owner claims existing unclaimed listing → verifies ownership → gains edit access
4. Business owner pays to feature their listing → appears in top/sponsored slots
5. Visitor leaves a review on a listing → review appears (moderated or instant)
6. Admin browses moderation queue → approves/rejects pending listings and reviews

## Monetization Pattern

Primary: featured/sponsored listing fees (flat fee or recurring subscription for premium placement, badges, or extra photos/fields). Secondary: lead-gen fees (charge businesses per inquiry/click generated). Some directories charge a one-time or annual listing fee instead of free submissions, especially in B2B niches. Display ads are a weak fallback — avoid as primary model unless traffic is already very high.

## Build Order (MVP fastest path)

1. Listing + Category data model, seeded manually or via import script
2. Listing detail page + category browse page (the SEO-indexable core)
3. Search and filter UI
4. Submit-a-listing form → goes into a pending/admin-approval state
5. Basic admin moderation queue (approve/reject)
6. Defer: claim flow, reviews, featured placement, map view, owner dashboard

## Example AI Build Prompts

```
Build a directory listing data model in [Postgres/Supabase] with listings,
categories (supporting nested subcategories via parent_category_id), and a
status field (pending/approved/rejected) for moderation. Include a slug field
generated from the listing name for SEO-friendly URLs.
```

```
Build a directory browse page in [Next.js] with server-side rendering for SEO,
showing listings filtered by category and a text search box, paginated 20 per
page. Each listing card links to a detail page at /listings/[slug] with full
structured data (schema.org LocalBusiness) embedded for search engines.
```

```
Build a "submit your listing" public form that collects name, category,
description, location, and contact info, saves it with status=pending, and
sends an email notification to the admin. Build a simple admin moderation
page listing all pending submissions with approve/reject buttons.
```
