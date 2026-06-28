import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { PLANS, type PlanKey } from "@/config";

function planFromPriceId(priceId: string): PlanKey {
  for (const [key, plan] of Object.entries(PLANS)) {
    if (plan.stripePriceId.monthly === priceId || plan.stripePriceId.annual === priceId) {
      return key as PlanKey;
    }
  }
  return "pro";
}

export async function POST(req: Request) {
  const body      = await req.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) return new NextResponse("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session      = event.data.object as Stripe.Checkout.Session;
      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      const userId       = session.metadata?.userId;
      if (!userId) break;
      const priceId = subscription.items.data[0].price.id;

      await db.update(users).set({
        plan:                   planFromPriceId(priceId),
        stripeCustomerId:       subscription.customer as string,
        stripeSubscriptionId:   subscription.id,
        stripePriceId:          priceId,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        updatedAt:              new Date(),
      }).where(eq(users.id, userId));
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice      = event.data.object as Stripe.Invoice;
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
      const priceId      = subscription.items.data[0].price.id;
      await db.update(users).set({
        plan:                   planFromPriceId(priceId),
        stripePriceId:          priceId,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        updatedAt:              new Date(),
      }).where(eq(users.stripeSubscriptionId, subscription.id));
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await db.update(users).set({
        plan:                   "free",
        stripeSubscriptionId:   null,
        stripePriceId:          null,
        stripeCurrentPeriodEnd: null,
        updatedAt:              new Date(),
      }).where(eq(users.stripeSubscriptionId, subscription.id));
      break;
    }
  }

  return new NextResponse(null, { status: 200 });
}
