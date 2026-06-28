import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PLANS } from "@/lib/stripe";

const BILLING = ["monthly", "annual"] as const;

export const metadata = {
  title: "Pricing — SHIP Method",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">Simple, honest pricing</h1>
          <p className="text-lg text-[var(--color-muted-foreground)]">Start free. Upgrade when you're ready to ship more.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {(Object.entries(PLANS) as [string, typeof PLANS[keyof typeof PLANS]][]).map(([key, plan]) => {
            const isPro = key === "pro";
            return (
              <div key={key} className={`relative rounded-2xl border p-8 ${isPro ? "border-[var(--color-primary)] shadow-lg" : "border-[var(--color-border)]"}`}>
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-primary)] px-4 py-1 text-xs font-semibold text-[var(--color-primary-foreground)]">
                    Most popular
                  </div>
                )}
                <p className="mb-1 text-sm font-medium uppercase tracking-widest text-[var(--color-muted-foreground)]">{plan.name}</p>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${plan.price.monthly === 0 ? "0" : plan.price.monthly}</span>
                  {plan.price.monthly > 0 && <span className="text-[var(--color-muted-foreground)]">/mo</span>}
                </div>
                {plan.price.annual > 0 && (
                  <p className="mb-6 text-sm text-[var(--color-muted-foreground)]">or ${plan.price.annual}/yr — save {Math.round((1 - plan.price.annual / (plan.price.monthly * 12)) * 100)}%</p>
                )}
                <Link
                  href={key === "free" ? "/sign-up" : `/sign-up?plan=${key}`}
                  className={`mb-8 block w-full rounded-lg py-3 text-center font-medium transition-opacity hover:opacity-90 ${isPro ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]" : "border border-[var(--color-border)] hover:bg-[var(--color-secondary)]"}`}
                >
                  {key === "free" ? "Get started free" : `Start ${plan.name}`}
                </Link>
                <ul className="space-y-3">
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

        <p className="mt-12 text-center text-sm text-[var(--color-muted-foreground)]">
          All plans include access to the SHIP Method framework docs and the{" "}
          <code className="rounded bg-[var(--color-secondary)] px-1">npx ship-create</code> scaffolder.
        </p>
      </div>
    </main>
  );
}
