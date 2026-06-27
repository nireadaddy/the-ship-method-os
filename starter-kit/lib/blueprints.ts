import {
  Users,
  ShoppingCart,
  Boxes,
  Store,
  BadgeCheck,
  LayoutDashboard,
  BookMarked,
  Wrench,
  Magnet,
  CalendarClock,
  Newspaper,
  Bot,
  Rss,
  type LucideIcon,
} from "lucide-react";

/**
 * A Blueprint is a starting point for a product type. Each one bundles a short
 * pitch, the feature checklist that defines its MVP, and a ready-to-paste build
 * prompt the user copies into Claude Code (or any AI coding agent) to extend
 * this starter kit into that system following The SHIP Method.
 *
 * Prompts are curated by hand here so they stay readable and editable. They
 * mirror — but are not auto-generated from — the templates in
 * `06-TEMPLATES/*_TEMPLATE.md`. When a template changes materially, update the
 * matching prompt here too.
 */
export type Blueprint = {
  slug: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  /** The MVP feature checklist shown in the preview. */
  featureChecklist: string[];
  /** The build prompt the user copies to kick off the system. */
  prompt: string;
  /** True when a live, navigable demo exists at /demo/<slug>. */
  demoReady?: boolean;
};

function buildPrompt(args: {
  system: string;
  template: string;
  intro: string;
  features: string[];
}): string {
  return [
    `I want to build a ${args.system} on top of this SHIP Method starter kit.`,
    "",
    args.intro,
    "",
    "Follow The SHIP Method — drive it through the `/ship` command, one phase at a time:",
    "1. STRUCTURE — fill in PROJECT.md (vision, problem, target audience, MVP scope) for this specific business.",
    "2. HUMAN FLOW — map the core screens and happy path in HUMAN_FLOW.md.",
    "3. INSTRUCTION — write AI_BUILD_SPEC.md (functional requirements, data model, API contract).",
    "4. PUBLISH — pick a theme, build the real home screen, then build the features below.",
    "",
    `Use \`06-TEMPLATES/${args.template}\` as the reference for the data model and feature set.`,
    "",
    "MVP feature checklist to implement:",
    ...args.features.map((f) => `- ${f}`),
    "",
    "Ask me one question at a time to fill any gaps before writing feature code. Do not invent business facts — use clearly-labeled placeholders if I haven't decided yet.",
  ].join("\n");
}

export const blueprints: Blueprint[] = [
  {
    slug: "crm",
    title: "CRM",
    tagline: "Track relationships, deals, and the next action that closes them.",
    icon: Users,
    demoReady: true,
    featureChecklist: [
      "Contact & company records with custom fields",
      "Deal/opportunity records with stage + value",
      "Pipeline (kanban) view, configurable stages",
      "Activity log (calls, emails, notes) per contact/deal",
      "Tasks & reminders with overdue flagging",
      "Reporting: pipeline value, win rate, activity volume",
    ],
    prompt: buildPrompt({
      system: "CRM",
      template: "CRM_TEMPLATE.md",
      intro:
        "The core unit is a relationship over time, not a session. Build the activity log before the dashboard — every other feature reads from it.",
      features: [
        "Contact & company records with custom fields",
        "Deal/opportunity records with stage + value",
        "Pipeline (kanban) view with configurable stages",
        "Activity log (calls, emails, notes, meetings) attached to contact/deal",
        "Tasks & reminders with due date, assignee, overdue flagging",
        "Search + saved filtered views (e.g. 'my open deals')",
        "Reporting: pipeline value by stage, win rate, activity volume",
      ],
    }),
  },
  {
    slug: "ecommerce",
    demoReady: true,
    title: "Ecommerce",
    tagline: "Storefront, cart, and checkout that turns browsers into orders.",
    icon: ShoppingCart,
    featureChecklist: [
      "Product catalog with variants & inventory",
      "Cart & checkout flow",
      "Payment integration (Stripe)",
      "Order management & status tracking",
      "Customer accounts & order history",
      "Admin: products, orders, fulfillment",
    ],
    prompt: buildPrompt({
      system: "ecommerce storefront",
      template: "MARKETPLACE_TEMPLATE.md",
      intro:
        "Optimize the path from product page to paid order — every extra step loses buyers. Get inventory and order state correct before adding promotions or recommendations.",
      features: [
        "Product catalog with variants, images, and inventory counts",
        "Cart with quantity edits and a single-page checkout",
        "Payment integration (Stripe) with order confirmation",
        "Order records with status tracking (paid, fulfilled, refunded)",
        "Customer accounts with order history and re-order",
        "Admin console: manage products, view orders, mark fulfillment",
      ],
    }),
  },
  {
    slug: "saas",
    demoReady: true,
    title: "SaaS App",
    tagline: "Multi-tenant app with auth, billing, and a usable core workflow.",
    icon: Boxes,
    featureChecklist: [
      "Auth (sign up, login, password reset)",
      "Workspaces / multi-tenancy",
      "Subscription billing with plan tiers",
      "Role-based access control",
      "The core product workflow (the thing users pay for)",
      "Settings & team management",
    ],
    prompt: buildPrompt({
      system: "SaaS application",
      template: "SAAS_TEMPLATE.md",
      intro:
        "Nail the one core workflow users pay for before adding billing and admin polish. Multi-tenancy and roles should be designed in from the data model up, not bolted on later.",
      features: [
        "Auth: sign up, login, password reset, email verification",
        "Workspaces / multi-tenancy with member invitations",
        "Subscription billing with plan tiers (Stripe)",
        "Role-based access control (owner, admin, member)",
        "The core product workflow — the value users subscribe for",
        "Account & team settings",
      ],
    }),
  },
  {
    slug: "marketplace",
    demoReady: true,
    title: "Marketplace",
    tagline: "Two-sided platform matching supply with demand, plus payments.",
    icon: Store,
    featureChecklist: [
      "Two user types (buyers & sellers/providers)",
      "Listings with search & filters",
      "Booking or order/request flow",
      "Payments with platform take-rate",
      "Ratings & reviews",
      "Seller dashboard & payouts",
    ],
    prompt: buildPrompt({
      system: "two-sided marketplace",
      template: "MARKETPLACE_TEMPLATE.md",
      intro:
        "Solve the cold-start problem first: decide which side you seed and how. The matching/search experience and trust signals (reviews) are what make a marketplace work — build those, not just the listings table.",
      features: [
        "Two account types: buyers and sellers/providers",
        "Listings with categories, search, and filters",
        "Booking or order/request flow between the two sides",
        "Payments with a platform take-rate (Stripe Connect)",
        "Ratings & reviews on both sides",
        "Seller dashboard with earnings and payouts",
      ],
    }),
  },
  {
    slug: "membership",
    demoReady: true,
    title: "Membership / Course",
    tagline: "Gated content, progress tracking, and recurring access.",
    icon: BadgeCheck,
    featureChecklist: [
      "Membership tiers with gated content",
      "Course/module/lesson structure",
      "Progress tracking & completion",
      "Recurring subscription billing",
      "Member dashboard",
      "Drip / scheduled content release",
    ],
    prompt: buildPrompt({
      system: "membership / course platform",
      template: "MEMBERSHIP_TEMPLATE.md",
      intro:
        "Access control is the whole product — get gating right per tier before polishing the player. Track progress from day one so you can show members how far they've come.",
      features: [
        "Membership tiers, each unlocking specific content",
        "Course → module → lesson content structure",
        "Progress tracking and lesson completion state",
        "Recurring subscription billing (Stripe)",
        "Member dashboard with continue-where-you-left-off",
        "Optional drip / scheduled content release",
      ],
    }),
  },
  {
    slug: "dashboard",
    demoReady: true,
    title: "Analytics Dashboard",
    tagline: "Turn raw data into the few numbers that drive a decision.",
    icon: LayoutDashboard,
    featureChecklist: [
      "Key metric cards (the numbers that matter)",
      "Charts: trends over time",
      "Filters (date range, segment)",
      "Data table with sort & export",
      "Drill-down from metric to detail",
      "Saved views / scheduled reports",
    ],
    prompt: buildPrompt({
      system: "analytics dashboard",
      template: "DASHBOARD_TEMPLATE.md",
      intro:
        "Start from the decision the user needs to make, then show only the numbers that change it. Resist adding charts that look impressive but drive no action.",
      features: [
        "Headline metric cards for the numbers that matter most",
        "Trend charts over a selectable date range",
        "Filters: date range and segment",
        "Underlying data table with sort and CSV export",
        "Drill-down from a metric into its detail rows",
        "Saved views and/or scheduled email reports",
      ],
    }),
  },
  {
    slug: "directory",
    demoReady: true,
    title: "Directory / Listings",
    tagline: "A searchable, browsable index people return to.",
    icon: BookMarked,
    featureChecklist: [
      "Listing records with rich detail pages",
      "Browse by category & search",
      "Filters & sorting",
      "Submission / claim flow",
      "Featured / promoted listings",
      "Admin moderation",
    ],
    prompt: buildPrompt({
      system: "directory / listings site",
      template: "DIRECTORY_TEMPLATE.md",
      intro:
        "The value is in the quality and findability of listings. Make search and filtering excellent, and design the submission flow so the directory can grow without manual data entry.",
      features: [
        "Listing records with rich, SEO-friendly detail pages",
        "Browse by category and full-text search",
        "Filters and sorting (location, rating, price, etc.)",
        "Submission / claim flow for new or owned listings",
        "Featured / promoted listing slots",
        "Admin moderation and approval queue",
      ],
    }),
  },
  {
    slug: "internal-tool",
    demoReady: true,
    title: "Internal Tool",
    tagline: "Replace the spreadsheet your team keeps fighting with.",
    icon: Wrench,
    featureChecklist: [
      "CRUD over your core records",
      "Role-based permissions",
      "Bulk actions & filtering",
      "Audit log of who changed what",
      "CSV import/export",
      "Approval / workflow states",
    ],
    prompt: buildPrompt({
      system: "internal operations tool",
      template: "INTERNAL_TOOL_TEMPLATE.md",
      intro:
        "Speed and correctness beat polish here — the users are your own team. Prioritize fast data entry, bulk actions, and an audit log over visual flourish.",
      features: [
        "CRUD over the core records the team works with",
        "Role-based permissions (admin, editor, read-only)",
        "Bulk actions and powerful filtering",
        "Audit log: who changed what and when",
        "CSV import and export",
        "Approval / workflow states where work moves between people",
      ],
    }),
  },
  {
    slug: "leadgen",
    demoReady: true,
    title: "Lead-Gen Funnel",
    tagline: "Capture, qualify, and route leads into your pipeline.",
    icon: Magnet,
    featureChecklist: [
      "Landing page with lead capture form",
      "Lead magnet / opt-in delivery",
      "Lead records with source tracking",
      "Qualification scoring",
      "Notifications & CRM/email handoff",
      "Conversion analytics",
    ],
    prompt: buildPrompt({
      system: "lead-generation funnel",
      template: "LEADGEN_TEMPLATE.md",
      intro:
        "Every step exists to capture and qualify a lead — measure conversion at each one. Get the form, the thank-you delivery, and the handoff right before optimizing copy.",
      features: [
        "Landing page with a high-intent lead capture form",
        "Lead magnet / opt-in delivery (email or download)",
        "Lead records with source / UTM tracking",
        "Qualification scoring or tagging",
        "Notifications and handoff to CRM / email tool",
        "Conversion analytics across the funnel steps",
      ],
    }),
  },
  {
    slug: "booking",
    title: "Booking / Scheduling",
    tagline: "Let people see availability and book a slot without the back-and-forth.",
    icon: CalendarClock,
    demoReady: true,
    featureChecklist: [
      "Service / resource records with duration",
      "Availability calendar with open slots",
      "Booking flow with confirmation",
      "Cancellation & rescheduling",
      "Reminders (email/SMS) before the appointment",
      "Admin view of the day's schedule",
    ],
    prompt: buildPrompt({
      system: "booking / scheduling app",
      template: "INTERNAL_TOOL_TEMPLATE.md",
      intro:
        "Availability is the heart of the product — model open slots and prevent double-booking before adding reminders or payments. Make booking a two-tap flow.",
      features: [
        "Service / resource records with a duration",
        "Availability calendar showing only open slots",
        "Booking flow that confirms and blocks the slot",
        "Cancellation and rescheduling by the customer",
        "Reminders before the appointment",
        "Admin day view of all bookings",
      ],
    }),
  },
  {
    slug: "blog",
    title: "Blog / CMS",
    tagline: "Write, publish, and organize content people actually find.",
    icon: Newspaper,
    demoReady: true,
    featureChecklist: [
      "Post records (title, body, status)",
      "Draft / publish workflow",
      "Categories & tags",
      "Public post pages (SEO-friendly)",
      "Author management",
      "Search across posts",
    ],
    prompt: buildPrompt({
      system: "blog / CMS",
      template: "DIRECTORY_TEMPLATE.md",
      intro:
        "Make writing and publishing frictionless — a clean editor and a reliable draft→publish flow matter more than feature breadth. Build SEO-friendly public pages from day one.",
      features: [
        "Post records with title, body, and status",
        "Draft → publish workflow",
        "Categories and tags",
        "Public, SEO-friendly post pages",
        "Author management",
        "Full-text search across posts",
      ],
    }),
  },
  {
    slug: "ai-chat",
    title: "AI Chat App",
    tagline: "A conversational assistant grounded in your own content.",
    icon: Bot,
    demoReady: true,
    featureChecklist: [
      "Chat UI with streaming responses",
      "Conversation history per user",
      "System prompt / assistant persona",
      "Retrieval over your own documents (RAG)",
      "Usage limits & rate limiting",
      "Feedback (thumbs up/down) on replies",
    ],
    prompt: buildPrompt({
      system: "AI chat application",
      template: "SAAS_TEMPLATE.md",
      intro:
        "Use the latest Claude models via the Anthropic API. Get the streaming chat loop and conversation persistence right first, then add retrieval (RAG) over the user's own content.",
      features: [
        "Chat UI with streaming assistant responses",
        "Conversation history saved per user",
        "Configurable system prompt / assistant persona",
        "Retrieval-augmented answers over uploaded documents",
        "Usage limits and rate limiting",
        "Thumbs up/down feedback on responses",
      ],
    }),
  },
  {
    slug: "social-feed",
    title: "Social Feed",
    tagline: "Posts, likes, and follows — the loop that keeps people coming back.",
    icon: Rss,
    demoReady: true,
    featureChecklist: [
      "Post composer (text + media)",
      "Chronological / ranked feed",
      "Likes & comments",
      "Follow / unfollow",
      "User profiles",
      "Notifications",
    ],
    prompt: buildPrompt({
      system: "social feed app",
      template: "MEMBERSHIP_TEMPLATE.md",
      intro:
        "The engagement loop (post → react → notify) is the product. Build a fast composer and a feed that updates optimistically before adding ranking or notifications.",
      features: [
        "Post composer with text and media",
        "Feed (chronological to start, ranked later)",
        "Likes and comments",
        "Follow / unfollow other users",
        "User profiles with their posts",
        "Notifications for likes, comments, and follows",
      ],
    }),
  },
];

export function getBlueprint(slug: string): Blueprint | undefined {
  return blueprints.find((b) => b.slug === slug);
}

/**
 * Seeds the SHIP docs for a blueprint. Used by the "Use this blueprint" action
 * to write real starting docs (instead of the user copying a prompt by hand).
 * Sections use [bracket placeholders] so the `/ship` gate still recognises them
 * as unfilled until the user supplies their real business facts.
 */
export function blueprintDocs(blueprint: Blueprint): {
  projectMd: string;
  featureMatrixMd: string;
} {
  const scope = blueprint.featureChecklist.map((f) => `- [ ] ${f}`).join("\n");

  const projectMd = `# PROJECT — ${blueprint.title}

> Seeded from the "${blueprint.title}" blueprint. Replace every [bracket] with
> your real business. Don't invent facts — leave a placeholder if unsure.

## Vision
[In one sentence: what does this ${blueprint.title.toLowerCase()} make possible, and for whom?]

## Problem Statement
[What painful, specific problem does it solve today? ${blueprint.tagline}]

## Target Audience
[Who is the very first user? Be specific — role, context, what they use now.]

## MVP Scope
${scope}

---
Continue with **The SHIP Method** — run \`/ship\` to fill Structure → Human Flow → Instruction → Publish.
`;

  const rows = blueprint.featureChecklist
    .map((f) => `| ${f} | [ ] | [ ] | [ ] | [ ] | |`)
    .join("\n");

  const featureMatrixMd = `# FEATURE_MATRIX — ${blueprint.title}

Seeded from the "${blueprint.title}" blueprint. Score each feature (RICE) to set
your build order, then drive the build with \`/loop\`.

| Feature | Reach | Impact | Confidence | Effort | Score |
|---|---|---|---|---|---|
${rows}
`;

  return { projectMd, featureMatrixMd };
}
