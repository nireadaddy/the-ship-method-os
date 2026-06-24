"use client";

import * as React from "react";
import { Magnet, CheckCircle2 } from "lucide-react";

import { seedLeads, funnel, sources, type Lead } from "@/lib/demo/leadgen-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusVariant: Record<Lead["status"], "default" | "secondary" | "outline"> = {
  New: "secondary",
  Qualified: "default",
  Contacted: "outline",
};

export default function LeadgenDemoPage() {
  const [leads, setLeads] = React.useState<Lead[]>(seedLeads);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [justAdded, setJustAdded] = React.useState(false);

  const maxFunnel = funnel[0].value;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLeads((prev) => [
      { id: `ld${prev.length + 1}-${Date.now()}`, name: name.trim(), email: email.trim(), source: "Organic", status: "New" },
      ...prev,
    ]);
    setName("");
    setEmail("");
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="label-mono text-accent">Lead-Gen · Demo</p>
        <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
          Capture funnel
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Submit the opt-in form to drop a new lead into the pipeline, and watch the funnel below.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="bg-primary/10 px-6 py-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Magnet className="h-6 w-6" />
            </div>
            <h2 className="font-display text-xl font-medium text-foreground">
              Get the free launch checklist
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              42 steps to ship without the last-minute scramble.
            </p>
          </div>
          <CardContent className="p-6">
            <form onSubmit={submit} className="space-y-3">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
              <Button type="submit" className="w-full">
                {justAdded ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Sent — check the table
                  </>
                ) : (
                  "Send me the checklist"
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Sources tracked: {sources.join(", ")}
              </p>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conversion funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {funnel.map((step, i) => {
              const pct = Math.round((step.value / maxFunnel) * 100);
              const prevPct = i === 0 ? null : Math.round((step.value / funnel[i - 1].value) * 100);
              return (
                <div key={step.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-foreground">{step.label}</span>
                    <span className="text-muted-foreground">
                      {step.value.toLocaleString()}
                      {prevPct !== null && <span className="ml-2 text-xs">({prevPct}%)</span>}
                    </span>
                  </div>
                  <div className="h-6 overflow-hidden rounded-md bg-muted">
                    <div
                      className="flex h-full items-center rounded-md bg-primary/80 transition-all"
                      style={{ width: `${Math.max(pct, 6)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent leads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.email}</TableCell>
                  <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[lead.status]}>{lead.status}</Badge>
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
