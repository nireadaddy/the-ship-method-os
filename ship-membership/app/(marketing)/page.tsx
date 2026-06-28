import Link from "next/link";
import { ArrowRight, Zap, Layers, Terminal, CheckCircle2 } from "lucide-react";

const STEPS = [
  { letter: "S", label: "Structure", desc: "Define what & why before building anything" },
  { letter: "H", label: "Human Flow", desc: "Design the experience screen by screen" },
  { letter: "I", label: "Instruction", desc: "Turn flows into AI-ready specs" },
  { letter: "P", label: "Publish", desc: "Launch, iterate, and scale" },
];

const FEATURES = [
  { icon: Layers, title: "8 Product Templates", desc: "SaaS, CRM, Membership, Directory, Dashboard, Landing page, Internal tool, Marketplace — each with a complete feature checklist." },
  { icon: Terminal, title: "Claude Slash Commands", desc: "/build → /foundation → /features → /polish → /uat → /pentest → /quality → /launch. One command per phase." },
  { icon: Zap, title: "Works with Your AI Tool", desc: "Claude Code, Cursor, Windsurf, ChatGPT, Gemini. CLAUDE.md, .cursorrules, and AGENTS.md are pre-configured on scaffolding." },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-[var(--color-border)] px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-xl font-bold tracking-tight">🚢 SHIP Method</span>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">Pricing</Link>
            <Link href="/sign-in" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">Sign in</Link>
            <Link href="/sign-up" className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:opacity-90">
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-accent)] px-3 py-1 text-xs font-medium text-[var(--color-muted-foreground)]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Now with Next.js 16 + Bun support
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Build real products<br />with AI — faster
          </h1>
          <p className="mb-10 text-xl text-[var(--color-muted-foreground)]">
            The SHIP Method is a four-phase framework that stops AI from building the wrong thing.
            Templates, slash commands, and a scaffolder included.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/sign-up" className="flex items-center gap-2 rounded-md bg-[var(--color-primary)] px-6 py-3 font-medium text-[var(--color-primary-foreground)] hover:opacity-90">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="flex items-center gap-2 rounded-md border border-[var(--color-border)] px-6 py-3 font-medium hover:bg-[var(--color-secondary)]">
              See pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">No credit card required · Free plan available</p>
        </div>
      </section>

      {/* SHIP framework */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-secondary)] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-[var(--color-muted-foreground)]">The Framework</p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.letter} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-[var(--color-primary-foreground)]">
                  {s.letter}
                </div>
                <p className="font-semibold">{s.label}</p>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold">Everything you need to ship</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-[var(--color-border)] p-6">
                <f.icon className="mb-4 h-6 w-6 text-[var(--color-primary)]" />
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-[var(--color-muted-foreground)]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-primary)] px-6 py-20 text-center text-[var(--color-primary-foreground)]">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold">Start building today</h2>
          <p className="mb-8 opacity-85">One command to scaffold your project. Claude does the rest.</p>
          <code className="mb-8 block rounded-lg bg-black/20 px-6 py-4 font-mono text-lg">npx ship-create</code>
          <Link href="/sign-up" className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-medium text-[var(--color-primary)] hover:opacity-90">
            Get your free account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] px-6 py-8 text-center text-sm text-[var(--color-muted-foreground)]">
        © {new Date().getFullYear()} The SHIP Method ·{" "}
        <Link href="/pricing" className="hover:text-[var(--color-foreground)]">Pricing</Link>
      </footer>
    </main>
  );
}
