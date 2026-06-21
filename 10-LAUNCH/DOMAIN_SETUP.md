# DOMAIN_SETUP

**Phase:** P — Publish
**Purpose:** Get a real, professional domain pointed at your live product — explained in plain language for builders who have never touched DNS before.

---

## 1. Choosing a Registrar

A registrar is where you *buy* and *manage* the domain name itself (separate from where you host the app).

| Registrar | Good for | Notes |
|---|---|---|
| Namecheap | Most builders, default pick | Cheap, clean UI, free WHOIS privacy |
| Cloudflare Registrar | Builders who also want Cloudflare's free DNS/CDN | Sells at-cost pricing, no markup, but only lets you transfer in existing domains (not always available for brand-new registrations) |
| Google Domains successor (Squarespace Domains) | Already in the Google/Squarespace ecosystem | Less control over advanced DNS than Namecheap/Cloudflare |
| Your app host directly (Vercel Domains) | Maximum simplicity, one bill | Slight price premium; fine if you never plan to switch host |

**Rule of thumb:** buy the domain from a dedicated registrar, host the DNS there or at Cloudflare, and point it at Vercel/Netlify. Don't lock your domain registration into your hosting provider unless you value convenience over flexibility.

- [ ] Search for your desired name; have 2-3 backups (`.com` is still the default trust signal — `.io`, `.app`, `.co` are acceptable fallbacks)
- [ ] Enable WHOIS/domain privacy (usually free) so your home address isn't public
- [ ] Turn on auto-renew so you don't accidentally lose the domain in a year

## 2. DNS Record Types, Explained Simply

DNS is the phonebook that turns `yourproduct.com` into the actual server address. You'll mainly touch four record types:

| Record | What it does | Plain-language analogy |
|---|---|---|
| **A** | Points a domain/subdomain directly to an IP address (e.g. `76.76.21.21`) | "This exact street address" |
| **CNAME** | Points a domain/subdomain to *another domain name*, which then resolves further | "Forward my mail to this other address, and let them figure out the rest" |
| **TXT** | Stores arbitrary text, most often used to *prove you own the domain* (domain verification) or configure email authentication (SPF/DKIM) | "A sticky note attached to the domain for robots to read" |
| **MX** | Routes email for the domain to a mail provider (Google Workspace, etc.) | "Where should mail addressed to @yourdomain.com actually go" |

You almost never need anything beyond these four for a typical SaaS launch.

## 3. Connecting Your Domain to Vercel

1. In Vercel: **Project Settings → Domains → Add**, type your domain, click Add.
2. Vercel tells you exactly which record to create:
   - **Root domain** (`yourproduct.com`): add an **A record** pointing to `76.76.21.21` (Vercel's anycast IP — confirm the exact value Vercel shows you, it can change).
   - **Subdomain** (`app.yourproduct.com` or `www.yourproduct.com`): add a **CNAME record** pointing to `cname.vercel-dns.com`.
3. Log into your registrar/DNS provider, find the **DNS management** or **Advanced DNS** section, and add the exact record Vercel specified — same type, same host/name field, same value, no typos.
4. Save, then return to Vercel and wait for the status to flip from "Invalid Configuration" to "Valid Configuration" (see propagation notes below).

### Connecting to Netlify (if used instead)

1. Netlify: **Site Settings → Domain Management → Add a domain**.
2. For root domains, Netlify gives you their load-balancer IP for an **A record**; for subdomains, a **CNAME** to `<your-site>.netlify.app`.
3. Same process: add the record at your registrar, then verify in Netlify's dashboard.

## 4. SSL / HTTPS

- Both Vercel and Netlify auto-issue and auto-renew free SSL certificates (via Let's Encrypt) once your DNS record verifies correctly — you do not need to buy or manually install a certificate.
- This typically completes within minutes of DNS verifying, sometimes up to a few hours on first setup.
- If your site shows "Not Secure" after 24 hours, the DNS record is wrong, not the SSL — go back to step 3.
- Never manually disable HTTPS redirect; always force HTTP → HTTPS (both platforms do this by default).

## 5. Email Considerations

A critical, often-missed rule: **the records that serve your website and the records that serve your email are independent and can conflict.**

- **Marketing/root domain** (`yourproduct.com`): often where you also want email (`hello@yourproduct.com`). This is fine — your website's A record and your email provider's MX record live on the same domain without interfering with each other, as long as you don't accidentally delete the MX records when editing DNS for your site.
- **App/product subdomain** (`app.yourproduct.com`): put your actual logged-in product here, separate from the marketing site. This isolates risk — a DNS mistake on `app.` won't take down your marketing site or email, and vice versa.
- **Common mistake:** adding a CNAME at the root (`@`) when you already have MX records there. Root domains typically can't have a CNAME alongside other records (a DNS rule called CNAME flattening exists at some providers like Cloudflare to work around this — check if your DNS provider supports it before assuming the setup is broken).
- If you use Google Workspace or similar for `hello@yourdomain.com`, set up SPF and DKIM **TXT** records as instructed by your email provider — skipping this sends your emails straight to spam.

## 6. Common DNS Propagation Troubleshooting

- **"It's been 10 minutes and it's still not working"** — DNS changes typically propagate in minutes but can take up to 48 hours globally because of caching (TTL) at various points on the internet. Most consumer cases resolve within 1-2 hours.
- **Check propagation status:** use [whatsmydns.net](https://www.whatsmydns.net) to see your record's status across global DNS servers, not just your own ISP's cache.
- **Clear your local DNS cache** if your browser still shows the old result after the global check looks good:
  ```bash
  # macOS
  sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
  ```
- **Double-check for typos** — a CNAME value with a missing trailing dot, an extra `www`, or a copy-pasted stray space is the single most common cause of "Invalid Configuration" errors that never resolve no matter how long you wait.
- **Conflicting records** — having both an old A record and a new CNAME on the same host will cause unpredictable behavior; delete the old one, don't just add the new one alongside it.
- **Still stuck after 48 hours** — the registrar's nameservers themselves may not be the ones actually being queried (e.g. you changed DNS settings at the registrar, but the domain's nameservers point elsewhere, like to Cloudflare). Verify which nameservers are authoritative for your domain first.

## Common Pitfalls

- Buying the domain through your app host out of convenience, then struggling to migrate DNS later if you switch providers.
- Forgetting to add `www` as a redirect/alias, so `yourproduct.com` works but `www.yourproduct.com` 404s.
- Deleting MX records by accident while adding website records, silently breaking all incoming email.
- Assuming SSL failure is a hosting bug when it's actually an unverified or incorrect DNS record.
- Not enabling domain auto-renew, then losing the domain to expiry (sometimes to a squatter) a year later.

---

**Next step:** With your domain live and SSL active, move to [`ANALYTICS_SETUP.md`](./ANALYTICS_SETUP.md) to start measuring what happens after launch.
