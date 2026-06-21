"use client";

import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown } from "lucide-react";

import { users, members, metrics } from "@/lib/mock-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockUser = users[0];

const tierBadgeVariant: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  Free: "outline",
  Starter: "secondary",
  Pro: "default",
  Lifetime: "destructive",
};

export default function MemberDashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-10">
      <div className="animate-fade-up">
        <h2 className="font-display text-3xl font-medium tracking-tight">
          Welcome back, {mockUser.name.split(" ")[0]}
        </h2>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s happening with your account today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.slice(0, 4).map((metric, idx) => {
          const positive = metric.change >= 0;
          return (
            <Card
              key={metric.label}
              className="animate-fade-up"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <CardHeader className="pb-2">
                <span className="label-mono text-muted-foreground">
                  {metric.label}
                </span>
                <CardTitle className="font-display text-3xl font-medium">
                  {metric.value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium " +
                    (positive
                      ? "bg-success/15 text-success"
                      : "bg-destructive/15 text-destructive")
                  }
                >
                  {positive ? (
                    <TrendingUp className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingDown className="h-3.5 w-3.5" />
                  )}
                  {positive ? "+" : ""}
                  {metric.change}%
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <h3 className="label-mono mb-4 text-muted-foreground">
          Continue Learning
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {members.map((item, idx) => (
            <Card
              key={item.id}
              className="animate-fade-up group transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
              style={{ animationDelay: `${(idx + 4) * 80}ms` }}
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
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => router.push("/member/content")}
                >
                  Continue
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
