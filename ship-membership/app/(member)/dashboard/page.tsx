import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowRight, BookOpen, CreditCard, Zap } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { CONTENT_ITEMS, PLANS, canAccess } from "@/config";

export default async function DashboardPage() {
  const clerkUser = await currentUser();
  const user = await getCurrentUser();
  const plan = user?.plan ?? "free";
  const accessibleCount = CONTENT_ITEMS.filter((c) => canAccess(plan, c.tier)).length;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Welcome{clerkUser?.firstName ? `, ${clerkUser.firstName}` : ""} 👋</h1>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
          You&apos;re on the <span className="font-medium capitalize">{plan}</span> plan
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          { label: "Your plan", value: PLANS[plan as keyof typeof PLANS]?.name ?? plan },
          { label: "Content available", value: `${accessibleCount} / ${CONTENT_ITEMS.length}` },
          { label: "Member since", value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-[var(--color-border)] p-4">
            <p className="text-xs text-[var(--color-muted-foreground)]">{s.label}</p>
            <p className="mt-1 text-lg font-semibold capitalize">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {[
          { href: "/content", icon: BookOpen, label: "Browse Content", desc: `${accessibleCount} items available` },
          { href: "/billing", icon: CreditCard, label: "Manage Billing", desc: "View plan & invoices" },
        ].map((l) => (
          <Link key={l.href} href={l.href}
            className="group flex items-start gap-4 rounded-xl border border-[var(--color-border)] p-5 hover:border-[var(--color-primary)] hover:bg-[var(--color-accent)]">
            <div className="rounded-lg bg-[var(--color-secondary)] p-2 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-primary-foreground)]">
              <l.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{l.label}</p>
              <p className="text-sm text-[var(--color-muted-foreground)]">{l.desc}</p>
            </div>
            <ArrowRight className="mt-1 h-4 w-4 text-[var(--color-muted-foreground)] transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>

      {/* Upgrade nudge for free users */}
      {plan === "free" && (
        <div className="rounded-2xl border border-dashed border-[var(--color-primary)] bg-[var(--color-accent)] p-6">
          <div className="flex items-start gap-4">
            <Zap className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
            <div>
              <p className="font-semibold">Unlock all content</p>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                Upgrade to Pro to access {CONTENT_ITEMS.filter((c) => c.tier !== "free").length} more items.
              </p>
              <Link href="/billing" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline">
                Upgrade now <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
