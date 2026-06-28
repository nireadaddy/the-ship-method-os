import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { PLANS } from "@/config";

export default async function MembersPage() {
  const all = await db.select().from(users).orderBy(desc(users.createdAt));

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Members</h1>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{all.length} total</p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)]">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--color-border)] bg-[var(--color-secondary)]">
            <tr className="text-left text-xs text-[var(--color-muted-foreground)]">
              <th className="px-4 py-3">Member</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Renewal</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {all.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[var(--color-muted-foreground)]">No members yet</td></tr>
            ) : all.map((u) => (
              <tr key={u.id} className="hover:bg-[var(--color-secondary)]">
                <td className="px-4 py-3">
                  <p className="font-medium">{u.name || "—"}</p>
                  <p className="text-xs text-[var(--color-muted-foreground)]">{u.email}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${u.plan === "free" ? "bg-[var(--color-secondary)] text-[var(--color-muted-foreground)]" : "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"}`}>
                    {u.plan}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--color-muted-foreground)]">
                  {u.stripeCurrentPeriodEnd ? new Date(u.stripeCurrentPeriodEnd).toLocaleDateString() : "—"}
                </td>
                <td className="px-4 py-3 text-[var(--color-muted-foreground)]">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  {u.stripeCustomerId && (
                    <a href={`https://dashboard.stripe.com/customers/${u.stripeCustomerId}`}
                      target="_blank" rel="noreferrer"
                      className="text-xs text-[var(--color-primary)] hover:underline">
                      Stripe →
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
