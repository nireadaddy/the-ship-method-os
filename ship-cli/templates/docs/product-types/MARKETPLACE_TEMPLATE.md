# Two-Sided Marketplace Template

A marketplace is the only product type where you must plan and build for two distinct users (supply and demand) who need each other to show up before either gets value — the classic cold-start problem. Plan liquidity strategy explicitly: which side do you seed manually first, and how do you fake density until real density exists (concierge onboarding, manually matched first transactions, seeded supply). Trust & safety (reviews, verification, dispute handling) is not a "nice to have later" feature here — it is the mechanism that lets strangers transact with each other, which is the entire point of the product. Build matching/discovery and a manual-first transaction flow before automating payments and escrow.

## Feature Checklist

- [ ] Supply-side profile/listing creation (the thing being offered: service, product, space)
- [ ] Demand-side browse/search/discovery with filters
- [ ] Matching logic (search ranking, recommendation, or request-based matching)
- [ ] Messaging between supply and demand sides
- [ ] Booking/transaction flow (request → accept/decline → confirm)
- [ ] Payment processing with escrow or delayed payout to supply side
- [ ] Take-rate fee calculation applied automatically on each transaction
- [ ] Reviews/ratings (typically both directions — buyer rates seller and vice versa)
- [ ] Identity/listing verification (badges, ID checks, or manual approval)
- [ ] Dispute/resolution flow (cancellation, refund request, support escalation)
- [ ] Availability/calendar management (if service or space-based)
- [ ] Notifications for both sides at every transaction stage
- [ ] Admin moderation tools (suspend users/listings, review disputes)
- [ ] Supply-side payout dashboard (earnings, pending payouts, history)

## Data Model Starter

| Entity | Key Fields | Relationships |
|---|---|---|
| Supplier (User) | name, verification_status, payout_account | has many Listings; has many Transactions (as seller) |
| Buyer (User) | name, payment_method | has many Transactions (as buyer); has many Reviews (written) |
| Listing | title, price, category, availability, status | belongs to Supplier; has many Transactions, Reviews |
| Transaction / Booking | listing_id, buyer_id, supplier_id, status, amount, fee_amount | belongs to Listing, Buyer, Supplier |
| Review | rating, body, author_id, direction (buyer_to_seller/seller_to_buyer), transaction_id | belongs to Transaction |
| Message | thread_id, sender_id, body, timestamp | belongs to Transaction or a pre-transaction inquiry thread |
| Payout | supplier_id, amount, status, period | belongs to Supplier; aggregates multiple Transactions |

## Core User Flows

1. Supplier creates a listing → goes live after verification/moderation
2. Buyer browses/searches → filters → views listing detail
3. Buyer messages supplier or directly books/requests → supplier accepts/declines
4. Buyer pays → funds held (escrow) → service/product delivered
5. Funds released to supplier (minus take-rate fee) after completion/confirmation
6. Both sides leave reviews → reviews appear on respective profiles
7. Dispute raised (no-show, quality issue) → resolution flow → refund or payout decision

## Monetization Pattern

Take-rate (percentage or flat fee) on every transaction is the dominant model — typically 10-20% depending on category and whether the marketplace adds significant value (payment handling, trust, marketing) versus just listing. Variants: charge the take-rate to supply side, demand side, or split between both. Secondary revenue: featured/boosted listing placement (similar to directory monetization) and supplier subscription tiers for lower take-rate or extra visibility at volume.

## Build Order (MVP fastest path)

1. Listing model + supplier-side creation form (seed initial supply manually if needed)
2. Buyer-side browse/search page (no fancy matching algorithm yet — simple filters)
3. Manual or simple request-accept booking flow (skip real-time availability calendars at first)
4. Payment processing with a basic hold/release mechanism (escrow-lite via manual admin release if true escrow is too complex for MVP)
5. Take-rate fee calculation on each transaction
6. Reviews (single direction is fine for MVP, add bidirectional later)
7. Defer: messaging system, dispute automation, payout dashboards, identity verification, advanced matching

## Example AI Build Prompts

```
Build a marketplace data model in [Postgres/Supabase] with suppliers, listings,
buyers, and transactions, where every transaction stores both the gross amount
and a calculated platform_fee (e.g., 15% of amount), and a net_payout field for
what the supplier receives. Include a transaction status enum: requested,
accepted, paid, completed, disputed, refunded.
```

```
Build a booking request flow in [Next.js] where a buyer submits a request on
a listing, the supplier receives a notification and can accept or decline
within the app, and accepting transitions the transaction to a payment step
using [Stripe Connect] with funds held until the buyer confirms completion.
```

```
Build a bidirectional review system where after a transaction is marked
completed, both the buyer and supplier are prompted to rate each other
(1-5 stars + optional text), reviews are only published once both sides have
submitted (or after a 14-day window), and each user's profile shows their
average rating and review count.
```
