"use client";

import { useState } from "react";
import { CheckCircle2, Zap } from "lucide-react";
import { PLANS } from "@/config";

type BillingCycle = "monthly" | "annual";

export default function BillingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [loading, setLoading] = useState<string | null>(null);

  async function checkout(planKey: string) {
    setLoading(planKey);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: planKey, billing: cycle }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(null);
  }

  const plans = Object.values(PLANS).filter((p) => p.key !== "free");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Manage your subscription</p>
      </div>

      {/* Cycle toggle */}
      <div className="mb-8 flex items-center gap-3">
        {(["monthly", "annual"] as BillingCycle[]).map((c) => (
          <button key={c} onClick={() => setCycle(c)}
            className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${cycle === c ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]" : "border border-[var(--color-border)] hover:bg-[var(--color-secondary)]"}`}>
            {c}
          </button>
        ))}
        {cycle === "annual" && (
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Save up to 28%</span>
        )}
      </div>

      {/* Plan cards */}
      <div className="space-y-4">
        {plans.map((plan) => {
          const price = plan.price[cycle];
          const highlight = "badge" in plan;
          return (
            <div key={plan.key}
              className={`rounded-xl border p-6 ${highlight ? "border-[var(--color-primary)]" : "border-[var(--color-border)]"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{plan.name}</p>
                    {"badge" in plan && (
                      <span className="rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-primary-foreground)]">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-2xl font-bold">
                    ${price}<span className="text-sm font-normal text-[var(--color-muted-foreground)]">/{cycle === "monthly" ? "mo" : "yr"}</span>
                  </p>
                </div>
                <button onClick={() => checkout(plan.key)} disabled={loading === plan.key}
                  className="shrink-0 rounded-lg bg-[var(--color-primary)] px-5 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] hover:opacity-90 disabled:opacity-50">
                  {loading === plan.key ? "Loading…" : `Upgrade to ${plan.name}`}
                </button>
              </div>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-sm text-[var(--color-muted-foreground)]">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" />{f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
