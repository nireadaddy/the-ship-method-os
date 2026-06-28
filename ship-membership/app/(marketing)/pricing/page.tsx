import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PLANS, PRODUCT } from "@/config";

export default function PricingPage() {
  const plans = Object.values(PLANS);
  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h1 className="mb-3 text-4xl font-bold">Simple, honest pricing</h1>
          <p className="text-lg text-[var(--color-muted-foreground)]">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const highlight = "badge" in plan;
            return (
              <div key={plan.key} className={`relative rounded-2xl border p-8 ${highlight ? "border-[var(--color-primary)] shadow-lg" : "border-[var(--color-border)]"}`}>
                {"badge" in plan && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-primary)] px-4 py-1 text-xs font-semibold text-[var(--color-primary-foreground)]">
                    {plan.badge}
                  </span>
                )}
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">{plan.name}</p>
                <div className="mb-1 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price.monthly === 0 ? "Free" : `$${plan.price.monthly}`}</span>
                  {plan.price.monthly > 0 && <span className="text-[var(--color-muted-foreground)]">/mo</span>}
                </div>
                {plan.price.annual > 0 && (
                  <p className="mb-6 text-sm text-[var(--color-muted-foreground)]">
                    or ${plan.price.annual}/yr — save {Math.round((1 - plan.price.annual / (plan.price.monthly * 12)) * 100)}%
                  </p>
                )}
                <Link
                  href={plan.key === "free" ? "/sign-up" : `/sign-up?plan=${plan.key}`}
                  className={`mb-8 mt-4 block w-full rounded-lg py-3 text-center text-sm font-medium transition-opacity hover:opacity-90 ${highlight ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]" : "border border-[var(--color-border)] hover:bg-[var(--color-secondary)]"}`}
                >
                  {plan.key === "free" ? "Get started free" : `Get ${plan.name}`}
                </Link>
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-[var(--color-muted-foreground)]">
          Questions? Email <a href={`mailto:${PRODUCT.supportEmail}`} className="underline">{PRODUCT.supportEmail}</a>
        </p>
      </div>
    </main>
  );
}
