import { PRODUCT, PLANS } from "@/config";
import { Settings, DollarSign, Mail, Shield } from "lucide-react";

export default function AdminSettingsPage() {
  const plans = Object.values(PLANS);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
          All settings are managed in <code className="rounded bg-[var(--color-secondary)] px-1">config.ts</code>
        </p>
      </div>

      {/* Product info */}
      <section className="mb-6 rounded-xl border border-[var(--color-border)] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Settings className="h-4 w-4 text-[var(--color-muted-foreground)]" />
          <h2 className="font-semibold">Product</h2>
        </div>
        <dl className="space-y-3 text-sm">
          {[
            { label: "Product name", value: PRODUCT.name },
            { label: "Tagline", value: PRODUCT.tagline },
            { label: "Support email", value: PRODUCT.supportEmail },
          ].map((row) => (
            <div key={row.label} className="flex items-start gap-4">
              <dt className="w-36 shrink-0 text-[var(--color-muted-foreground)]">{row.label}</dt>
              <dd className="font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Plans */}
      <section className="mb-6 rounded-xl border border-[var(--color-border)] p-6">
        <div className="mb-4 flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-[var(--color-muted-foreground)]" />
          <h2 className="font-semibold">Plans</h2>
        </div>
        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan.key} className="rounded-lg border border-[var(--color-border)] p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-medium capitalize">{plan.name}</p>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  ${plan.price.monthly}/mo · ${plan.price.annual}/yr
                </p>
              </div>
              <ul className="space-y-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-[var(--color-muted-foreground)]">· {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Admins */}
      <section className="rounded-xl border border-[var(--color-border)] p-6">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-[var(--color-muted-foreground)]" />
          <h2 className="font-semibold">Admin access</h2>
        </div>
        <p className="mb-2 text-sm text-[var(--color-muted-foreground)]">
          Admins are identified by Clerk user ID in <code className="rounded bg-[var(--color-secondary)] px-1">config.ts → PRODUCT.adminUserIds</code>
        </p>
        {PRODUCT.adminUserIds.length === 0 ? (
          <p className="text-sm text-orange-500">⚠ No admin user IDs configured — add your Clerk user ID to PRODUCT.adminUserIds</p>
        ) : (
          <ul className="space-y-1">
            {PRODUCT.adminUserIds.map((id) => (
              <li key={id} className="rounded bg-[var(--color-secondary)] px-3 py-1 font-mono text-xs">{id}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
