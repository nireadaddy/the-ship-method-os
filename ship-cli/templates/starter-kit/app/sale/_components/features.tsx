import {
  BarChart3,
  Bell,
  Layers,
  Lock,
  Workflow,
  Zap,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Workflow,
    title: "Unified workflows",
    description:
      "Build pipelines that connect every step of your process, from intake to delivery, without switching tools.",
  },
  {
    icon: BarChart3,
    title: "Real-time analytics",
    description:
      "See what's working and what's not with dashboards that update the moment your data changes.",
  },
  {
    icon: Bell,
    title: "Smart notifications",
    description:
      "Only get pinged when it matters. Configurable alerts keep noise down and signal up.",
  },
  {
    icon: Layers,
    title: "Flexible templates",
    description:
      "Start from a proven template or build your own — every workspace adapts to how your team actually works.",
  },
  {
    icon: Lock,
    title: "Enterprise-grade security",
    description:
      "Role-based access, audit logs, and encryption at rest keep your data safe by default.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    description:
      "A fast, responsive interface so your team spends time working, not waiting on spinners.",
  },
];

export function Features() {
  return (
    <section className="bg-grid relative py-28">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-3 text-center">
          <p className="label-mono text-primary">Capabilities</p>
          <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Everything your team{" "}
            <span className="italic text-primary">needs</span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            One platform, every workflow — no more duct-taping five tools
            together.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="bg-card/90 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
