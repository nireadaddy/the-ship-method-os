import Link from "next/link";
import { ExternalLink, Download, Lock } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { CONTENT_ITEMS, canAccess } from "@/config";

export default async function ContentPage() {
  const user = await getCurrentUser();
  const plan = user?.plan ?? "free";

  const categories = [...new Set(CONTENT_ITEMS.map((c) => c.category))];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Content</h1>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
          {CONTENT_ITEMS.filter((c) => canAccess(plan, c.tier)).length} of {CONTENT_ITEMS.length} items available on your plan
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat} className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">{cat}</h2>
          <div className="space-y-3">
            {CONTENT_ITEMS.filter((c) => c.category === cat).map((item) => {
              const accessible = canAccess(plan, item.tier);
              return (
                <div key={item.slug}
                  className={`flex items-start gap-4 rounded-xl border p-5 ${accessible ? "border-[var(--color-border)]" : "border-[var(--color-border)] opacity-60"}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{item.title}</p>
                      {item.tier !== "free" && (
                        <span className="rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-semibold uppercase text-[var(--color-primary-foreground)]">
                          {item.tier}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{item.description}</p>
                  </div>
                  {accessible ? (
                    <a href={item.url} target="_blank" rel="noreferrer"
                      className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:opacity-90">
                      {item.type === "file" ? <><Download className="h-3.5 w-3.5" />Download</> : <><ExternalLink className="h-3.5 w-3.5" />Open</>}
                    </a>
                  ) : (
                    <Link href="/billing"
                      className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-medium hover:bg-[var(--color-secondary)]">
                      <Lock className="h-3.5 w-3.5" />Upgrade
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
