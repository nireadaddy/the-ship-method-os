import { ExternalLink, Download, Lock } from "lucide-react";
import { CONTENT_ITEMS } from "@/config";

export default function AdminContentPage() {
  const categories = [...new Set(CONTENT_ITEMS.map((c) => c.category))];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Content</h1>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
          {CONTENT_ITEMS.length} items · Edit in <code className="rounded bg-[var(--color-secondary)] px-1">config.ts</code> to add, remove, or change access tiers
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat} className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">{cat}</h2>
          <div className="divide-y divide-[var(--color-border)] rounded-xl border border-[var(--color-border)]">
            {CONTENT_ITEMS.filter((c) => c.category === cat).map((item) => (
              <div key={item.slug} className="flex items-center gap-4 px-4 py-4">
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-[var(--color-muted-foreground)]">{item.description}</p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${item.tier === "free" ? "bg-[var(--color-secondary)] text-[var(--color-muted-foreground)]" : "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"}`}>
                  {item.tier}
                </span>
                <span className="text-xs text-[var(--color-muted-foreground)]">{item.type}</span>
                <a href={item.url} target="_blank" rel="noreferrer" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">
                  {item.type === "file" ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                </a>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="rounded-xl border border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-muted-foreground)]">
        To add content, edit <code className="rounded bg-[var(--color-secondary)] px-1">CONTENT_ITEMS</code> in <code className="rounded bg-[var(--color-secondary)] px-1">config.ts</code>
      </div>
    </div>
  );
}
