# ANALYTICS_SETUP

**Phase:** P — Publish
**Purpose:** Get just enough measurement in place at launch to know whether anyone is using what you shipped — without over-instrumenting before you have users to measure.

---

## 1. Choosing a Tool

You need exactly one of these at launch. Don't run three analytics tools "just in case" — it slows your site down and fragments your data.

| Tool | Best for | Notes |
|---|---|---|
| **PostHog** | Solo builders who want product analytics + session replay + feature flags in one free tier | Self-hostable; generous free tier; steeper initial setup than Plausible |
| **Plausible** | Privacy-first, simple pageview + goal tracking | No cookie banner required in most jurisdictions (see Section 5); lighter feature set, no session replay |
| **Google Analytics 4 (GA4)** | Builders who need it for ad platform integration (Google Ads conversion tracking) | Free, but heavier privacy/consent obligations and a notoriously confusing UI |
| **Mixpanel** | Funnel-heavy B2B SaaS with a dedicated growth/PM function | Best-in-class funnel/retention analysis; free tier caps out faster than PostHog |

**Default recommendation for this method:** PostHog for product/event analytics (it's built for exactly the "first 5 events + funnel" workflow below) plus Plausible if you separately want simple, privacy-clean marketing-site pageview numbers.

## 2. Installing Tracking

### Script tag (fastest, works on any site — marketing pages, no-code tools)

```html
<!-- PostHog -->
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){
  function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}
  (p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,
  p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);
  var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";
  return "posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},
  o="init capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);
  e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('<YOUR_PROJECT_API_KEY>', { api_host: 'https://app.posthog.com' });
</script>
```

### SDK (better for actual product apps — Next.js, React, etc.)

```bash
npm install posthog-js
```

```ts
// lib/posthog.ts
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init('<YOUR_PROJECT_API_KEY>', {
    api_host: 'https://app.posthog.com',
    person_profiles: 'identified_only', // don't create profiles for anonymous visitors until they sign up
  })
}

export default posthog
```

```tsx
// after a user logs in, identify them so events tie to a real account, not an anonymous device
posthog.identify(user.id, { email: user.email, plan: user.plan })
```

**Rule of thumb:** use the script tag on a marketing/landing page with no framework. Use the SDK inside an actual app (Next.js, React, Vue) so you can fire custom events tied to real user actions, not just pageviews.

## 3. Define Your First 5 Events

Don't track everything. Track the five moments that answer "is this product working." For most SHIP-built products, these are:

| # | Event name | Fires when | Why it matters |
|---|---|---|---|
| 1 | `signed_up` | User completes account creation | Top of funnel — are people interested enough to commit an email |
| 2 | `activated` | User completes the single core "aha moment" action (the thing your product exists to do — e.g. "created first project", "sent first message", "connected first integration") | The real signal that they understood the value, not just signed up out of curiosity |
| 3 | `upgraded_to_paid` | User converts from free/trial to a paid plan | Revenue — the metric that actually matters for the business |
| 4 | `core_action_repeated` | User performs the core action again in a return session (not their first session) | Retention signal — are they coming back, or was it a one-time look |
| 5 | `churned` / `downgraded` | User cancels, lets a trial lapse, or downgrades | The event you'll dread but need — tells you where the product is leaking people |

> Naming convention: `noun_verb_past_tense` (e.g. `project_created`, not `create project` or `CreateProject`). Keep it consistent — analytics tools are case- and format-sensitive when you build funnels later.

Each event should carry the minimum useful properties — e.g. `activated` might include `{ method: "imported_csv" | "manual_entry" }` so you can later see *which* activation path performs best.

## 4. Setting Up a Conversion Funnel

Once the five events above are firing, build one funnel in your analytics tool:

```
signed_up → activated → upgraded_to_paid
```

1. In PostHog: **Insights → New Insight → Funnel**, add the three events in order, set the conversion window (e.g. 7 days — how long you'd reasonably expect someone to go from signup to paying).
2. Look at the drop-off percentage between each step — this tells you exactly where to focus next, instead of guessing.
   - Big drop between `signed_up` and `activated` → your onboarding is the problem, not your pricing.
   - Big drop between `activated` and `upgraded_to_paid` → your pricing, paywall timing, or perceived value is the problem.
3. Re-run this funnel weekly during your first 90 days post-launch. Don't over-optimize from day-3 data — wait for at least 30-50 signups before drawing conclusions.

## 5. Privacy / Consent Basics

You are a solo builder, not a legal department — this section is the practical minimum, not a substitute for a lawyer if you're handling sensitive data (health, financial, children's data) or operating in a heavily regulated vertical.

- **Cookie banners:** required if you use tracking that relies on non-essential cookies *and* you have EU/UK visitors. Tools like Plausible avoid cookies entirely (using non-identifying, aggregated counting) and generally don't require a consent banner — check their current compliance docs, as rules and tool implementations change. Tools like GA4 and PostHog (in default config) do use cookies/identifiers and likely require a consent banner for EU/UK traffic.
- **GDPR-lite checklist for solo builders:**
  - [ ] Have a Privacy Policy page that states what you collect and why (a template-based one is fine at launch; revisit if you scale)
  - [ ] Don't collect more personal data than your five events above actually require
  - [ ] If you show a cookie banner, make "reject non-essential" genuinely as easy as "accept" — a banner that only offers "Accept" is not real consent
  - [ ] Offer a way for a user to request data deletion (even if it's just "email us" at launch — you don't need a self-serve button on day one)
  - [ ] If you use GA4, enable IP anonymization and review data retention settings (default retention is often longer than you need)
- **U.S./CCPA-style consideration:** if you have meaningful California traffic, a simple "Do Not Sell My Info" link and an accurate privacy policy covers the common solo-builder case — full compliance machinery typically isn't triggered until you cross specific revenue/data-volume thresholds defined by the law.
- **When to actually consult a lawyer instead of a checklist:** you're processing health data, financial data, biometric data, or data from children — none of these are "solo builder GDPR-lite" territory.

## Common Pitfalls

- Tracking 40 events in week one and never looking at any of them — start with 5, add more only when you have a specific question they'd answer.
- Forgetting to call `identify()` after login, so the same human shows up as 3 different "anonymous" users across devices/sessions.
- Putting the analytics script in `<head>` render-blocking instead of deferred/async, quietly hurting your Lighthouse score and LCP.
- No cookie banner on an EU-facing site using cookie-based tracking — fix before, not after, you start running EU traffic/ads.
- Treating week-one funnel data as gospel — wait for a real sample size before changing your product based on 12 signups.

---

**Next step:** With deployment, domain, and analytics live, return to `04-PUBLISH/QA_CHECKLIST.md` for a final pre-launch pass, then ship.
