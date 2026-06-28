import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { PLANS, type PlanKey } from "@/config";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { plan, billing } = await req.json() as { plan: PlanKey; billing: "monthly" | "annual" };
  const planConfig = PLANS[plan];
  if (!planConfig || plan === "free") return new NextResponse("Invalid plan", { status: 400 });

  const priceId = planConfig.stripePriceId[billing];
  if (!priceId) return new NextResponse("Price ID not configured", { status: 400 });

  const [user] = await db.select().from(users).where(eq(users.id, userId));

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: user?.stripeCustomerId ?? undefined,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=1`,
    cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  });

  return NextResponse.json({ url: session.url });
}
