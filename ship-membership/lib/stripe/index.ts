import Stripe from "stripe";

// Lazy-initialized so build-time module evaluation doesn't require the env var.
let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" });
  }
  return _stripe;
}

// Named export for convenience — same lazy pattern.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string, unknown>)[prop as string];
  },
});

export const PLANS = {
  free: {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    priceId: { monthly: null, annual: null },
    features: [
      "SHIP Method framework (docs)",
      "1 product-type template",
      "Community access",
    ],
    limit: { projects: 1, downloads: 3 },
  },
  pro: {
    name: "Pro",
    price: { monthly: 29, annual: 249 },
    priceId: {
      monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? "",
      annual: process.env.STRIPE_PRO_ANNUAL_PRICE_ID ?? "",
    },
    features: [
      "Everything in Free",
      "All 8 product-type templates",
      "All Claude slash commands (/build, /foundation…)",
      "Unlimited projects",
      "Priority updates",
    ],
    limit: { projects: Infinity, downloads: Infinity },
  },
  team: {
    name: "Team",
    price: { monthly: 79, annual: 699 },
    priceId: {
      monthly: process.env.STRIPE_TEAM_MONTHLY_PRICE_ID ?? "",
      annual: process.env.STRIPE_TEAM_MONTHLY_PRICE_ID ?? "",
    },
    features: [
      "Everything in Pro",
      "Up to 5 seats",
      "Shared template library",
      "Onboarding call",
    ],
    limit: { projects: Infinity, downloads: Infinity },
  },
} as const;

export type PlanKey = keyof typeof PLANS;

export function isPro(plan: string): boolean {
  return plan === "pro" || plan === "team";
}
