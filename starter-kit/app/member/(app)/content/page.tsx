"use client";

import * as React from "react";

import { members, type MockMemberContent } from "@/lib/mock-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tiers = ["All", "Free", "Starter", "Pro", "Lifetime"] as const;

const tierBadgeVariant: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  Free: "outline",
  Starter: "secondary",
  Pro: "default",
  Lifetime: "destructive",
};

function ContentGrid({ items }: { items: MockMemberContent[] }) {
  if (items.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No courses in this tier yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, idx) => (
        <Card
          key={item.id}
          className="animate-fade-up group transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.25),0_8px_30px_-8px_hsl(var(--primary)/0.45)]"
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">{item.title}</CardTitle>
              <Badge variant={tierBadgeVariant[item.tier] ?? "outline"}>
                {item.tier}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${item.progress}%` }}
              />
            </div>
            <p className="label-mono text-muted-foreground">
              {item.progress}% complete
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm" className="w-full">
              Continue
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function MemberContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-medium tracking-tight">
          Courses
        </h2>
        <p className="mt-1 text-muted-foreground">
          Browse everything available across your plan.
        </p>
      </div>

      <Tabs defaultValue="All">
        <TabsList>
          {tiers.map((tier) => (
            <TabsTrigger key={tier} value={tier}>
              {tier}
            </TabsTrigger>
          ))}
        </TabsList>

        {tiers.map((tier) => (
          <TabsContent key={tier} value={tier}>
            <ContentGrid
              items={
                tier === "All"
                  ? members
                  : members.filter((item) => item.tier === tier)
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
