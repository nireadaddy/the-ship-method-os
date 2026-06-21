import { Users as UsersIcon, DollarSign, Activity, TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { users, metrics } from "@/lib/mock-data";

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  active: "default",
  trialing: "secondary",
  past_due: "destructive",
  canceled: "outline",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const kpis = [
  {
    label: "Total Users",
    value: String(users.length),
    icon: UsersIcon,
    change: undefined as number | undefined,
  },
  {
    label: metrics[0].label === "Monthly Recurring Revenue" ? "MRR" : metrics[0].label,
    value: metrics[0].value,
    icon: DollarSign,
    change: metrics[0].change,
  },
  {
    label: "Active Members",
    value: metrics[1].value,
    icon: Activity,
    change: metrics[1].change,
  },
  {
    label: "Churn Rate",
    value: metrics[3].value,
    icon: TrendingDown,
    change: metrics[3].change,
  },
];

const recentUsers = [...users]
  .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
  .slice(0, 5);

export default function BackofficeOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="label-mono text-primary">Admin</p>
        <h1 className="font-display text-2xl font-medium tracking-tight text-foreground">
          Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Admin-level snapshot of accounts and revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          const isPositive = (kpi.change ?? 0) >= 0;
          return (
            <Card
              key={kpi.label}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <span className="label-mono text-muted-foreground">{kpi.label}</span>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex items-end justify-between gap-2">
                <span className="font-display text-3xl font-medium tracking-tight text-foreground">
                  {kpi.value}
                </span>
                {kpi.change !== undefined && (
                  <Badge
                    variant={isPositive ? "default" : "destructive"}
                    className="mb-0.5 gap-1"
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {isPositive ? "+" : ""}
                    {kpi.change}%
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <span className="font-display text-xl font-medium leading-tight tracking-tight text-foreground">
            Recent Signups
          </span>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id} className="group relative">
                  <TableCell className="font-medium">
                    <span className="absolute -left-2 top-0 h-full w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-200 group-hover:scale-y-100" />
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {initials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[user.status] ?? "outline"}>
                      {user.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.joinedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
