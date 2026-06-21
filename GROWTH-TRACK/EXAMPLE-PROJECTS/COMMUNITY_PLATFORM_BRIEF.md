# GuildRoom — Paid Community for Freelance Designers

## Idea
GuildRoom is a paid membership community for freelance designers to get feedback on work, find referral leads, and access curated resources — a focused alternative to scattered Slack groups and noisy Discord servers.

## Problem
Freelance designers are isolated. Generic communities are full of noise, low-quality self-promotion, and no accountability. Designers want a smaller, vetted room where peer feedback is fast and leads get shared without spam.

## Target User
Freelance and independent designers (UI/UX, brand, graphic) 1-5 years into freelancing, earning enough to invest in their craft and network, currently lurking in free Discord/Slack communities or paying for a generic "creator" community that doesn't serve design specifically.

## Revenue Model
Recurring membership subscription ($29-49/mo or $290/yr), with a free 7-day trial; optional annual "founding member" tier with lifetime price lock to drive early cash flow.

## MVP Features
- Gated community feed with topic channels (feedback, leads, resources, wins)
- Member profile with portfolio link and specialty tags
- Paywall via Stripe subscription before feed access
- Weekly feedback thread template (structured post format for critique requests)
- Lead-sharing board with simple upvote/claim mechanism
- Admin moderation tools (pin, mute, remove post)

## Human Flow
1. Visitor lands on marketing page and signs up for free trial
2. Visitor completes profile (specialty, portfolio link, intro post)
3. Trial converts to paid subscription via Stripe after 7 days
4. Member posts in a channel (feedback request, lead, resource)
5. Other members comment, upvote, or claim a lead
6. Member receives notification when their post gets activity

## AI Instructions
Build a Next.js + Supabase app called GuildRoom, a paid community platform gated behind a Stripe subscription. Core entities: Member (specialty tags, portfolio_url, subscription_status), Channel (feedback, leads, resources, wins), Post (belongs to Channel and Member, fields: title, body, type), Comment, Upvote. Build a Stripe subscription checkout with a 7-day free trial, a webhook that updates Member.subscription_status, RLS policies that block Post/Comment access for members with an inactive subscription, and a feed UI with channel tabs and a structured "feedback request" post template. Use Tailwind + shadcn/ui.
