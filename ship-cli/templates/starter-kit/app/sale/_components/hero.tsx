import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-28 md:pt-36">
      {/* Decorative grid panel, off to the right, faded */}
      <div className="bg-grid pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 [mask-image:linear-gradient(to_left,black,transparent)] lg:block" />

      {/* Soft ember glow blob behind the headline */}
      <div className="pointer-events-none absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-[110px]" />

      {/* Giant faint serif numeral as a decorative mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-4 select-none font-display text-[16rem] font-medium leading-none text-foreground/[0.04] sm:text-[22rem]"
      >
        01
      </span>

      <div className="container relative mx-auto px-4">
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col items-start gap-7 text-left">
            <span
              className="label-mono animate-fade-up inline-flex items-center gap-2 text-primary"
              style={{ animationDelay: "0s" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Now in public beta
            </span>

            <h1
              className="animate-fade-up max-w-2xl font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
              style={{ animationDelay: "0.1s" }}
            >
              Manage your entire workflow{" "}
              <span className="relative inline-block italic text-primary">
                in one place
                <svg
                  aria-hidden
                  viewBox="0 0 300 18"
                  className="absolute -bottom-2 left-0 h-3 w-full text-primary/70"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 13C58 4 130 2 178 7C220 11 262 13 298 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p
              className="animate-fade-up max-w-md text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "0.2s" }}
            >
              Replace your spreadsheets, sticky notes, and ten disconnected
              tools with a single platform built for teams who want to move
              faster.
            </p>

            <div
              className="animate-fade-up flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.3s" }}
            >
              <Button size="lg" className="glow-primary gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                See Pricing
              </Button>
            </div>

            <p
              className="label-mono animate-fade-up text-muted-foreground"
              style={{ animationDelay: "0.4s" }}
            >
              No credit card required &middot; Free 14-day trial
            </p>
          </div>

          <div
            className="animate-fade-up relative"
            style={{ animationDelay: "0.25s" }}
          >
            <div className="bg-grid relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-border bg-background/80 p-4 backdrop-blur">
                <p className="label-mono text-primary">Live workspace</p>
                <p className="mt-1 font-display text-lg">
                  Everything in sync, automatically.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden h-20 w-20 rounded-full border border-primary/40 bg-primary/20 blur-sm sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
