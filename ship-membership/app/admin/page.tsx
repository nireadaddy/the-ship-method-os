import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { sql, count } from "drizzle-orm";
import { Users, DollarSign, TrendingUp, UserCheck } from "lucide-react";
import { PLANS } from "@/config";

async function getStats() {
  const allUsers = await db.select().from(users);
  const total = allUsers.length;
  const paid  = allUsers.filter((u) => u.plan !== "free").length;
  const free  = total - paid;

  const byPlan = Object.keys(PLANS).map((key) => ({
    plan: key,
    count: allUsers.filter((u) => u.plan === key).length,
  }));

  // MRR: sum of monthly prices for active subscribers
  const mrr = allUsers.reduce((sum, u) => {
    const plan = PLANS[u.plan as keyof typeof PLANS];
    return sum + (plan?.price?.monthly ?? 0);
  }, 0);

  const recent = allUsers
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return { total, paid, free, byPlan, mrr, recent };
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const STAT_CARDS = [
    { label: "Total members",   value: stats.total,         icon: Users,      color: "text-blue-500" },
    { label: "Paid members",    value: stats.paid,          icon: UserCheck,  color: "text-green-500" },
    { label: "MRR",             value: `$${stats.mrr}`,     icon: DollarSign, color: "text-purple-500" },
    { label: "Free members",    value: stats.free,          icon: TrendingUp, color: "text-orange-500" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Your membership business at a glance</p>
      </div>

      {/* Stat cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className="rounded-xl border border-[var(--color-border)] p-5">
            <s.icon className={`mb-3 h-5 w-5 ${s.color}`} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Plan breakdown */}
      <div className="mb-8 rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="mb-4 font-semibold">Members by plan</h2>
        <div className="space-y-3">
          {stats.byPlan.map(({ plan, count }) => (
            <div key={plan} className="flex items-center gap-4">
              <span className="w-20 text-sm capitalize">{plan}</span>
              <div className="flex-1 overflow-hidden rounded-full bg-[var(--color-secondary)]" style={{ height: 8 }}>
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: stats.total ? `${(count / stats.total) * 100}%` : "0%" }}
                />
              </div>
              <span className="w-8 text-right text-sm font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent signups */}
      <div className="rounded-xl border border-[var(--color-border)] p-6">
        <h2 className="mb-4 font-semibold">Recent signups</h2>
        {stats.recent.length === 0 ? (
          <p className="text-sm text-[var(--color-muted-foreground)]">No members yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-[var(--color-muted-foreground)]">
                <th className="pb-3">Name</th><th className="pb-3">Email</th><th className="pb-3">Plan</th><th className="pb-3 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {stats.recent.map((u) => (
                <tr key={u.id}>
                  <td className="py-3 font-medium">{u.name || "—"}</td>
                  <td className="py-3 text-[var(--color-muted-foreground)]">{u.email}</td>
                  <td className="py-3 capitalize">{u.plan}</td>
                  <td className="py-3 text-right text-[var(--color-muted-foreground)]">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
