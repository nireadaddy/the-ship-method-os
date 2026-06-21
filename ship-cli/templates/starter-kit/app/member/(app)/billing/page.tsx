"use client";

import { users } from "@/lib/mock-data";
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
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const mockUser = users[0];

interface MockInvoice {
  date: string;
  description: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
}

const invoices: MockInvoice[] = [
  {
    date: "2026-06-01",
    description: "Pro Plan — Monthly Subscription",
    amount: "$49.00",
    status: "Paid",
  },
  {
    date: "2026-05-01",
    description: "Pro Plan — Monthly Subscription",
    amount: "$49.00",
    status: "Paid",
  },
  {
    date: "2026-04-01",
    description: "Pro Plan — Monthly Subscription",
    amount: "$49.00",
    status: "Paid",
  },
  {
    date: "2026-03-01",
    description: "Pro Plan — Monthly Subscription",
    amount: "$49.00",
    status: "Failed",
  },
];

const statusVariant: Record<
  MockInvoice["status"],
  "default" | "secondary" | "outline" | "destructive"
> = {
  Paid: "default",
  Pending: "secondary",
  Failed: "destructive",
};

export default function MemberBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl font-medium tracking-tight">
          Billing
        </h2>
        <p className="mt-1 text-muted-foreground">
          Manage your subscription and view past invoices.
        </p>
      </div>

      <Card className="animate-fade-up">
        <CardHeader>
          <span className="label-mono text-muted-foreground">Current Plan</span>
          <CardTitle className="font-display text-3xl font-medium">
            {mockUser.plan} Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Status:{" "}
            <span className="font-medium text-foreground">
              {mockUser.status}
            </span>{" "}
            • Member since {mockUser.joinedAt}
          </p>
        </CardContent>
        <CardFooter>
          <Button>Manage Subscription</Button>
        </CardFooter>
      </Card>

      <Card className="animate-fade-up" style={{ animationDelay: "80ms" }}>
        <CardHeader>
          <CardTitle className="text-base">Invoice History</CardTitle>
          <CardDescription>
            Your billing history for the past few months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.date}>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[invoice.status]}>
                      {invoice.status}
                    </Badge>
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
