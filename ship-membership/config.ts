/**
 * ──────────────────────────────────────────────────────────
 * SHIP MEMBERSHIP — Product Configuration
 * ──────────────────────────────────────────────────────────
 * This is the ONLY file you need to edit to white-label this
 * membership system for your own product. Change the name,
 * plans, features, and content items here — everything else
 * reads from this config automatically.
 * ──────────────────────────────────────────────────────────
 */

export const PRODUCT = {
  name: "My Product",
  tagline: "Your one-line value proposition here.",
  description: "A short description of what members get when they join.",
  supportEmail: "support@example.com",
  /** Clerk user IDs of product admins — they see the /admin panel */
  adminUserIds: [] as string[],
};

export const PLANS = {
  free: {
    key: "free",
    name: "Free",
    price: { monthly: 0, annual: 0 },
    stripePriceId: { monthly: null as null | string, annual: null as null | string },
    features: [
      "Access to free content",
      "Community access",
    ],
  },
  pro: {
    key: "pro",
    name: "Pro",
    price: { monthly: 29, annual: 249 },
    stripePriceId: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? "",
      annual:  process.env.STRIPE_PRO_ANNUAL_PRICE_ID  ?? "",
    },
    features: [
      "Everything in Free",
      "All premium content",
      "Priority support",
      "Early access to new features",
    ],
    badge: "Most popular",
  },
  team: {
    key: "team",
    name: "Team",
    price: { monthly: 79, annual: 699 },
    stripePriceId: {
      monthly: process.env.STRIPE_TEAM_MONTHLY_PRICE_ID ?? "",
      annual:  process.env.STRIPE_TEAM_ANNUAL_PRICE_ID  ?? "",
    },
    features: [
      "Everything in Pro",
      "Up to 5 seats",
      "Shared workspace",
      "Onboarding call",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;

/**
 * Content items that members can access.
 * - tier: "free" = anyone, "pro" = paid members only
 * - type: "link" | "file" | "video" — controls how it renders
 */
export const CONTENT_ITEMS = [
  {
    slug: "getting-started",
    title: "Getting Started Guide",
    description: "Everything you need to know to hit the ground running.",
    type: "link" as const,
    url: "https://docs.example.com/getting-started",
    tier: "free" as PlanKey,
    category: "Guides",
  },
  {
    slug: "advanced-guide",
    title: "Advanced Techniques",
    description: "Deep-dive into advanced workflows and best practices.",
    type: "link" as const,
    url: "https://docs.example.com/advanced",
    tier: "pro" as PlanKey,
    category: "Guides",
  },
  {
    slug: "template-pack",
    title: "Premium Template Pack",
    description: "Ready-to-use templates for every use case.",
    type: "file" as const,
    url: "https://example.com/downloads/templates.zip",
    tier: "pro" as PlanKey,
    category: "Templates",
  },
] satisfies ContentItem[];

export interface ContentItem {
  slug: string;
  title: string;
  description: string;
  type: "link" | "file" | "video";
  url: string;
  tier: PlanKey;
  category: string;
}

/** Returns true if the given plan can access content at the required tier */
export function canAccess(userPlan: string, requiredTier: PlanKey): boolean {
  const order: PlanKey[] = ["free", "pro", "team"];
  return order.indexOf(userPlan as PlanKey) >= order.indexOf(requiredTier);
}
