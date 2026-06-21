import Link from "next/link";
import { Rocket, GraduationCap, Settings2, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          The SHIP Method OS
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Pick your area
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          This starter kit ships with three route groups. Each one is being
          built independently on top of the shared UI and mock data layer
          defined here.
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-5xl gap-6 sm:grid-cols-3">
        {areas.map((area) => {
          const Icon = area.icon;
          return (
            <Card key={area.href} className="flex flex-col">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{area.title}</CardTitle>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1" />
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={area.href}>
                    Enter
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
