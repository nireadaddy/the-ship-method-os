import Link from "next/link";
import { Rocket, GraduationCap, Settings2, ArrowRight } from "lucide-react";

import { BlueprintGallery } from "@/components/blueprint-gallery";
import { ThemeToggle } from "@/components/theme-toggle";

const areas = [
  {
    href: "/sale",
    icon: Rocket,
    title: "Sale Page",
    description:
      "Public-facing offer page. Headline, pitch, pricing, and the CTA that turns visitors into members.",
  },
  {
    href: "/member/login",
    icon: GraduationCap,
    title: "Member Area",
    description:
      "Logged-in member dashboard. Course access, progress tracking, and account settings.",
  },
  {
    href: "/backoffice",
    icon: Settings2,
    title: "Backoffice",
    description:
      "Internal admin console. Member management, metrics, and operational tools.",
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center bg-background px-6 py-24">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          The SHIP Method OS
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Pick what you&rsquo;re building
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Each blueprint is a product type with a ready-to-run build prompt.
          Preview one, copy its prompt into Claude Code, and extend this starter
          kit into that system &mdash; following The SHIP Method end to end.
        </p>
      </div>

      <div className="mt-12 flex w-full justify-center">
        <BlueprintGallery />
      </div>

      <section className="mt-20 w-full max-w-5xl">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
            Explore the starter areas
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The three route groups already wired into this kit, ready to adapt.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <Link
                key={area.href}
                href={area.href}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-soft transition-colors hover:border-primary/50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{area.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {area.description}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
