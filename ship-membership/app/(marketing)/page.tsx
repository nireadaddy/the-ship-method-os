import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT, PLANS } from "@/config";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <nav className="border-b border-[var(--color-border)] px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-bold">{PRODUCT.name}</span>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">Pricing</Link>
            <Link href="/sign-in" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]">Sign in</Link>
            <Link href="/sign-up" className="rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:opacity-90">
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      <section className="px-6 py-28 text-center">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold leading-tight tracking-tight">{PRODUCT.name}</h1>
          <p className="mb-4 text-xl text-[var(--color-muted-foreground)]">{PRODUCT.tagline}</p>
          <p className="mb-10 text-[var(--color-muted-foreground)]">{PRODUCT.description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/sign-up" className="flex items-center gap-2 rounded-md bg-[var(--color-primary)] px-6 py-3 font-medium text-[var(--color-primary-foreground)] hover:opacity-90">
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="rounded-md border border-[var(--color-border)] px-6 py-3 font-medium hover:bg-[var(--color-secondary)]">
              See pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">No credit card required · Free plan available</p>
        </div>
      </section>

      <footer className="border-t border-[var(--color-border)] px-6 py-6 text-center text-sm text-[var(--color-muted-foreground)]">
        © {new Date().getFullYear()} {PRODUCT.name} ·{" "}
        <a href={`mailto:${PRODUCT.supportEmail}`} className="hover:text-[var(--color-foreground)]">Support</a>
      </footer>
    </main>
  );
}
