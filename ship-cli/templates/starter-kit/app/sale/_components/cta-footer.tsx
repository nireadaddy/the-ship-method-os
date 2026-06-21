import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const footerLinks = [
  { label: "Product", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

export function CtaFooter() {
  return (
    <>
      <section className="container mx-auto px-4 py-28">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card px-6 py-20 sm:px-16">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -left-6 select-none font-display text-[10rem] font-medium leading-none text-foreground/[0.05]"
          >
            &rarr;
          </span>

          <div className="relative flex flex-col items-start gap-6 text-left">
            <p className="label-mono text-primary">Ready when you are</p>
            <h2 className="max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Ready to <span className="italic text-primary">ship</span>{" "}
              faster?
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Join hundreds of teams who&apos;ve already ditched the
              spreadsheet chaos. Start your free trial today — no credit card
              required.
            </p>
            <Button size="lg" className="glow-primary gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row">
          <p className="font-display text-sm font-medium">SHIP Method OS</p>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="label-mono text-muted-foreground">
            Built with The SHIP Method OS
          </p>
        </div>
      </footer>
    </>
  );
}
