# SEO_CHECKLIST

Pre-launch and ongoing SEO checklist. Technical SEO is a one-time setup with periodic audits; on-page and content SEO are continuous.

## 1. Technical SEO

- [ ] Unique `<title>` tag on every page (50–60 characters, primary keyword near the front)
- [ ] Unique meta description on every page (140–160 characters, includes a reason to click)
- [ ] Open Graph tags set (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) for social sharing
- [ ] Twitter Card tags set (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- [ ] `sitemap.xml` generated and accessible at `/sitemap.xml`, includes all indexable pages, excludes noindex/admin pages
- [ ] `robots.txt` present at `/robots.txt`, correctly allows crawling of public pages and blocks admin/internal routes
- [ ] Canonical URL (`<link rel="canonical">`) set on every page, especially for pages with query params or duplicate content
- [ ] Structured data (JSON-LD) implemented for relevant types: `Organization`, `WebSite`, `Product`, `Article`, `FAQPage`, `BreadcrumbList` as applicable
- [ ] Structured data validated with Google's Rich Results Test — zero errors
- [ ] HTTPS enforced site-wide, no mixed-content warnings
- [ ] No broken internal links (404s) — run a crawl (Screaming Frog / Ahrefs / Sitebulb) before launch
- [ ] 301 redirects in place for any changed/removed URLs (no orphaned old links from previous version)
- [ ] URL structure is clean, lowercase, hyphen-separated, no session IDs or unnecessary params
- [ ] `hreflang` tags set if serving multiple languages/regions
- [ ] Favicon and app icons present (`favicon.ico`, apple-touch-icon, manifest icons)
- [ ] 404 page returns actual HTTP 404 status (not 200 with "not found" text)

## 2. On-Page SEO

- [ ] Exactly one `<h1>` per page, containing the primary keyword naturally
- [ ] Heading hierarchy is logical (H1 → H2 → H3, no skipped levels, no heading used purely for styling)
- [ ] Primary keyword appears in: title tag, H1, first 100 words, one subheading, meta description
- [ ] Every image has descriptive `alt` text (not "image1.jpg" — describe what's actually shown, include keyword where natural)
- [ ] Internal linking: every page is reachable within 3 clicks from the homepage
- [ ] Internal links use descriptive anchor text (not "click here")
- [ ] Outbound links to authoritative sources where relevant, set to `rel="noopener"` (and `nofollow`/`sponsored` if paid/untrusted)
- [ ] Content length matches search intent — thin pages (<300 words) reviewed and either expanded or noindexed
- [ ] No duplicate title tags or meta descriptions across pages
- [ ] Breadcrumbs implemented for multi-level page structures
- [ ] Mobile-first content parity — same content visible on mobile as desktop (no hidden content for SEO purposes)

## 3. Performance (Core Web Vitals)

- [ ] **LCP (Largest Contentful Paint)** < 2.5s on mobile (PageSpeed Insights / CrUX)
- [ ] **INP (Interaction to Next Paint)** < 200ms
- [ ] **CLS (Cumulative Layout Shift)** < 0.1 — no images/ads without reserved dimensions, no late-loading fonts shifting layout
- [ ] Images lazy-loaded below the fold, eagerly loaded above the fold (especially the LCP image)
- [ ] Fonts use `font-display: swap` or are preloaded to avoid flash-of-invisible-text
- [ ] Render-blocking CSS/JS minimized on first load
- [ ] Mobile usability report in Search Console shows zero errors

## 4. Indexing Setup

- [ ] Google Search Console property verified (domain property preferred over URL-prefix)
- [ ] Bing Webmaster Tools property verified
- [ ] Sitemap submitted in Search Console and Bing Webmaster Tools
- [ ] Key pages manually requested for indexing via "URL Inspection" in Search Console
- [ ] Coverage report checked after 48–72 hours — zero unexpected "Excluded" or "Error" pages
- [ ] Google Analytics 4 (or chosen analytics tool) connected and verified receiving data (see `ANALYTICS.md`)
- [ ] Crawl stats reviewed weekly for the first month post-launch to catch crawl errors early
- [ ] Disavow file prepared if migrating from a domain with toxic backlink history

## 5. Content & Keyword Brief — Mini Template

Use this template before writing any SEO-targeted page or blog post.

```
PAGE/POST TITLE (working): 
TARGET URL SLUG: 

PRIMARY KEYWORD: 
  - Search volume (monthly): 
  - Keyword difficulty: 
  - Search intent: [Informational / Navigational / Commercial / Transactional]

SECONDARY KEYWORDS (2-5): 
  - 
  - 

TARGET AUDIENCE / PERSONA: 

SEARCH INTENT SUMMARY (what is the searcher trying to accomplish?): 

COMPETING PAGES (top 3 ranking URLs):
  1. 
  2. 
  3. 
  - What they cover that we should match: 
  - What gap we can fill that they don't: 

CONTENT OUTLINE:
  H1: 
  H2: 
  H2: 
  H2: 
  FAQ section topics (for FAQPage schema): 

INTERNAL LINKS TO INCLUDE (from this page → others): 
INTERNAL LINKS TO RECEIVE (other pages → this page): 

CTA / CONVERSION GOAL: 
TARGET WORD COUNT: 
PUBLISH DATE: 
OWNER: 
```

## Ongoing Cadence

| Task | Frequency |
|---|---|
| Search Console coverage + performance review | Weekly (first month), then monthly |
| Core Web Vitals check | Monthly |
| Broken link crawl | Monthly |
| Keyword ranking tracking for target terms | Weekly |
| Content refresh on top 10 traffic pages | Quarterly |
| Backlink profile review | Quarterly |
