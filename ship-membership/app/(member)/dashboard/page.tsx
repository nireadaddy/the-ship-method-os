import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { ArrowRight, FileText, Terminal, Zap } from "lucide-react";

const QUICK_LINKS = [
  { href: "/templates", icon: FileText, label: "Product Templates", desc: "8 types — SaaS, CRM, Membership and more" },
  { href: "/commands", icon: Terminal, label: "Slash Commands", desc: "/build, /foundation, /features…" },
];

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Welcome back{user?.firstName ? `, ${user.firstName}` : ""} 👋</h1>
        <p className="mt-1 text-[var(--color-muted-foreground)]">Here's what you have access to on your current plan.</p>
      </div>

      {/* Quick start */}
      <section className="mb-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-secondary)] p-6">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-muted-foreground)]">Quick start</p>
        <p className="mb-4 font-medium">Start a new project in one command:</p>
        <code className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 font-mono text-sm">
          npx ship-create
        </code>
        <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
          Then open the folder in Claude Code and type <code className="rounded bg-[var(--color-card)] px-1">/build</code>
        </p>
      </section>

      {/* Resources */}
      <section>
        <h2 className="mb-4 font-semibold">Your resources</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-start gap-4 rounded-xl border border-[var(--color-border)] p-5 hover:border-[var(--color-primary)] hover:bg-[var(--color-accent)]"
            >
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
      </section>

      {/* Upgrade CTA for free users */}
      <section className="mt-10 rounded-2xl border border-dashed border-[var(--color-primary)] bg-[var(--color-accent)] p-6">
        <div className="flex items-start gap-4">
          <Zap className="mt-1 h-5 w-5 shrink-0 text-[var(--color-primary)]" />
          <div>
            <p className="font-semibold">Unlock all 8 templates + slash commands</p>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Upgrade to Pro and get everything you need to go from idea to live product.</p>
            <Link href="/pricing" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline">
              See Pro plan <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
