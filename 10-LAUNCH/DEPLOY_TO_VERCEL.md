# DEPLOY_TO_VERCEL

**Phase:** P — Publish
**Purpose:** Get your AI-built web app live on the internet with a production URL, environment variables wired up correctly, and a safe rollback path — without breaking anything on every push.

---

## 1. Prerequisites

- [ ] Your code lives in a GitHub (or GitLab/Bitbucket) repository — Vercel deploys from a connected repo, not local folders, for anything beyond a quick test
- [ ] Your app builds and runs locally with no errors: `npm run build` exits clean
- [ ] You have a `package.json` with a correct `build` script for your framework (Next.js, Vite, Astro, Remix, etc.)
- [ ] You have a [Vercel account](https://vercel.com/signup) — sign up with GitHub for the smoothest connection
- [ ] You know which environment variables your app needs (API keys, database URLs, Stripe keys) and have them somewhere safe — a password manager, not a Slack message

## 2. Connect Your GitHub Repo

1. Log into Vercel and click **Add New → Project**.
2. Choose **Import Git Repository** and authorize Vercel to access your GitHub account/org if prompted.
3. Select the repository for your product.
4. Vercel auto-detects your framework (Next.js, Vite, etc.) from `package.json`. Confirm it guessed correctly — if it shows "Other" and your app is a known framework, your `package.json` may be misconfigured.
5. Leave **Root Directory** as `./` unless your app lives in a subfolder (common in monorepos) — then set it to that subfolder path.

## 3. Configure Build Settings

| Setting | Typical value | Notes |
|---|---|---|
| Framework Preset | Auto-detected (Next.js, Vite, etc.) | Override only if detection is wrong |
| Build Command | `npm run build` (or framework default) | Leave default unless you have a custom build step |
| Output Directory | Framework default (e.g. `.next`, `dist`) | Don't touch unless you know why |
| Install Command | `npm install` (or `pnpm install` / `yarn install`) | Must match your lockfile — mismatched package managers cause phantom build failures |
| Node.js Version | LTS (18.x or 20.x) | Pin this in **Project Settings → General** if a dependency requires a specific version |

## 4. Set Environment Variables

1. Go to **Project Settings → Environment Variables**.
2. Add each variable your app needs. For every variable, choose which environments it applies to:
   - **Production** — live, customer-facing
   - **Preview** — every non-production branch/PR deploy
   - **Development** — local `vercel dev` only
3. Common mistake: a variable only added to Production will be `undefined` on every Preview deploy, causing confusing "works on my machine, broken on the preview link" bugs. Add to all three unless you specifically want different values per environment (e.g. test Stripe keys in Preview, live keys in Production).
4. Prefix only the variables that must be readable in the browser with your framework's public prefix (`NEXT_PUBLIC_` for Next.js, `VITE_` for Vite). Never prefix secrets (API secret keys, database passwords, service-role tokens) this way — anything with the public prefix ships into the client-side JS bundle and is visible to anyone.
5. After adding/changing variables, you must **redeploy** — existing deployments do not pick up new env vars retroactively.

```bash
# Pull env vars locally to match what's set in Vercel (requires Vercel CLI)
npm i -g vercel
vercel link
vercel env pull .env.local
```

## 5. Preview vs. Production Deployments

- **Every push to a non-production branch** (including PR branches) gets its own **Preview deployment** with a unique URL (`your-app-git-branchname.vercel.app`). Use these to test changes before they're live, and to share work-in-progress with collaborators or clients.
- **Every push to your production branch** (usually `main`) triggers a **Production deployment** to your real domain.
- Treat Preview URLs as disposable and safe to break — that's the point. Never point real users or paid traffic at a Preview URL.
- If you want to test a risky change without merging to `main`, push to a feature branch, get the Preview URL, test it fully, then merge.

## 6. Custom Domains

1. Go to **Project Settings → Domains**.
2. Add your domain (e.g. `app.yourproduct.com` or `yourproduct.com`).
3. Vercel shows you the exact DNS record to add (a `CNAME` for subdomains pointing to `cname.vercel-dns.com`, or an `A` record for root/apex domains pointing to Vercel's IP). Add that record at your DNS provider — see `DOMAIN_SETUP.md` for the full walkthrough.
4. Vercel auto-provisions and auto-renews an SSL certificate (via Let's Encrypt) once DNS verifies — usually within minutes, occasionally up to a few hours.
5. If you want both `yourproduct.com` and `www.yourproduct.com` to work, add both and set one as the redirect target for the other in the Domains panel.

## 7. Rollback Procedure

1. Go to your project's **Deployments** tab.
2. Find the last known-good Production deployment (look for the green "Ready" status and check the commit message/timestamp).
3. Click the **⋯** menu on that deployment → **Promote to Production**.
4. This instantly repoints your production domain to that build — no rebuild, no waiting, typically live in seconds.
5. After rolling back, fix the issue on a branch, verify it on a Preview URL, then merge and redeploy forward. Don't leave the repo in a rolled-back state indefinitely — your `main` branch and your live site should match.

```bash
# Rollback via CLI (alternative to dashboard)
vercel ls                  # list recent deployments
vercel promote <deployment-url>
```

## Common Pitfalls

- **Env var added but app still broken** — you forgot to redeploy after adding it, or added it to the wrong environment (Preview vs Production).
- **"Works locally, fails on Vercel"** — usually a missing env var, a case-sensitive import path (Vercel's build runs on Linux, which is case-sensitive; your Mac filesystem may not be), or a dependency that needs a Node version you haven't pinned.
- **Build exceeds free-tier limits** — large monorepos or unoptimized builds can hit timeout/memory limits on the Hobby plan; check your build logs for the actual failure before assuming it's a code bug.
- **Secrets leaked to the client** — double-check you never prefixed a secret key with `NEXT_PUBLIC_`/`VITE_`. If you did, rotate that key immediately — it's already been shipped to every visitor's browser.
- **Custom domain stuck "Pending"** — almost always a DNS record typo or propagation delay; see `DOMAIN_SETUP.md` for troubleshooting steps.
- **Preview deployments piling up** — fine to ignore; Vercel prunes old ones automatically per your plan's retention settings.

---

**Next step:** Once your app is live on a Vercel URL, connect your real domain in [`DOMAIN_SETUP.md`](./DOMAIN_SETUP.md), then wire up tracking in [`ANALYTICS_SETUP.md`](./ANALYTICS_SETUP.md).
