# SellSight — Unified Sales Dashboard for E-Commerce Sellers

## Idea
SellSight is an analytics dashboard that pulls sales data from multiple channels (Shopify, Amazon, Etsy) into one view, so e-commerce sellers can see total revenue, best-sellers, and channel performance without logging into four different dashboards.

## Problem
Multi-channel sellers waste hours each week exporting CSVs and manually reconciling numbers across platforms just to answer "how did we do this week, and where." Each platform's native analytics only shows its own slice, hiding the full picture needed to make pricing and ad-spend decisions.

## Target User
Small e-commerce sellers ($10k-500k/mo revenue) selling across 2+ channels simultaneously, typically a solo founder or small ops team without a dedicated analyst, currently exporting spreadsheets from each platform manually.

## Revenue Model
Monthly SaaS subscription tiered by connected channels and order volume (e.g., $39/mo for 1-2 channels, $99/mo for 3+ channels and higher order volume), with usage-based overage for very high-volume sellers.

## MVP Features
- Channel connections (Shopify, Amazon, Etsy via API/OAuth)
- Unified revenue dashboard with daily/weekly/monthly views
- Best-seller and worst-seller product breakdown across channels
- Channel comparison view (revenue, order count, average order value)
- Automated daily data sync with last-synced timestamp
- Exportable summary report (PDF/CSV) for weekly review

## Human Flow
1. Seller signs up and connects their first sales channel via OAuth
2. System pulls historical orders and syncs going forward on a schedule
3. Seller lands on the unified dashboard showing combined revenue and trends
4. Seller filters by channel, date range, or product to dig into performance
5. Seller exports a weekly summary report for their own records or partners
6. Seller connects additional channels as their business grows

## AI Instructions
Build a Next.js + Supabase analytics dashboard called SellSight for e-commerce sellers. Core entities: SellerAccount, Channel (type enum [shopify, amazon, etsy], oauth_credentials), Order (belongs to Channel, fields: order_date, total, items_json), SyncLog (last_synced_at, status). Build OAuth connection flows for at least Shopify (mock the others with seeded sample data for MVP), a background sync job that pulls orders into a normalized Order table, a unified dashboard with revenue charts (Recharts) filterable by date range and channel, a best/worst-seller product table aggregated across channels, and a PDF/CSV export of the weekly summary. Use Tailwind + shadcn/ui.
