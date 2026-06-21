import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "$19",
    period: "/mo",
    description: "For individuals and small teams getting started.",
    features: [
      "Up to 3 workspaces",
      "Basic analytics",
      "Email support",
      "1 GB storage",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For growing teams that need more power and automation.",
    features: [
      "Unlimited workspaces",
      "Advanced analytics",
      "Priority support",
      "50 GB storage",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$129",
    period: "/mo",
    description: "For organizations that need scale, security, and control.",
    features: [
      "Everything in Pro",
      "SSO & advanced permissions",
      "Dedicated success manager",
      "Unlimited storage",
      "SLA & audit logs",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section className="container mx-auto px-4 py-28">
      <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-3 text-center">
        <p className="label-mono text-primary">Pricing</p>
        <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Simple, <span className="italic text-primary">transparent</span>{" "}
          pricing
        </h2>
        <p className="mt-2 text-muted-foreground">
          Choose the plan that fits your team. Upgrade or downgrade anytime.
        </p>
      </div>
      <div className="grid items-center gap-8 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn(
              "relative flex flex-col transition-transform duration-300",
              tier.highlighted &&
                "glow-primary z-10 border-primary/60 lg:scale-110"
            )}
          >
            {tier.highlighted && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <p className="label-mono text-muted-foreground">{tier.name}</p>
              <CardTitle
                className={cn(
                  "text-2xl",
                  tier.highlighted && "text-primary"
                )}
              >
                {tier.description}
              </CardTitle>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-medium tracking-tight">
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {tier.period}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                size={tier.highlighted ? "lg" : "default"}
                variant={tier.highlighted ? "default" : "outline"}
              >
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
