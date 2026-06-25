"use client";

import * as React from "react";
import { Check, X, RotateCcw } from "lucide-react";

import {
  requests as seedRequests,
  statusFilters,
  formatCurrency,
  type Request,
  type RequestStatus,
} from "@/lib/demo/internal-tool-data";
import { useLocalStore } from "@/lib/demo/use-local-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusVariant: Record<RequestStatus, "default" | "secondary" | "destructive"> = {
  Pending: "secondary",
  Approved: "default",
  Rejected: "destructive",
};

export default function InternalToolDemoPage() {
  const { data: requests, setData: setRequests, reset } = useLocalStore<Request[]>(
    "demo:internal-tool:requests",
    seedRequests
  );
  const [filter, setFilter] = React.useState<(typeof statusFilters)[number]>("All");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const visible = requests.filter((r) => filter === "All" || r.status === filter);
  const pendingSelected = [...selected].filter(
    (id) => requests.find((r) => r.id === id)?.status === "Pending"
  );

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    const visiblePending = visible.filter((r) => r.status === "Pending").map((r) => r.id);
    setSelected((prev) => {
      const allSelected = visiblePending.every((id) => prev.has(id)) && visiblePending.length > 0;
      return allSelected ? new Set() : new Set(visiblePending);
    });
  }

  function resolve(ids: string[], status: RequestStatus) {
    setRequests((prev) =>
      prev.map((r) => (ids.includes(r.id) && r.status === "Pending" ? { ...r, status } : r))
    );
    setSelected(new Set());
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-accent">Internal Tool · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
            Expense approvals
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Filter, select rows, and bulk-approve — decisions persist across refreshes.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={reset} className="shrink-0">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={f === filter ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
        {pendingSelected.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{pendingSelected.length} selected</span>
            <Button size="sm" onClick={() => resolve(pendingSelected, "Approved")}>
              <Check className="h-4 w-4" />
              Approve
            </Button>
            <Button size="sm" variant="destructive" onClick={() => resolve(pendingSelected, "Rejected")}>
              <X className="h-4 w-4" />
              Reject
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    aria-label="Select all pending"
                    className="h-4 w-4 accent-[hsl(var(--primary))]"
                    checked={
                      visible.some((r) => r.status === "Pending") &&
                      visible.filter((r) => r.status === "Pending").every((r) => selected.has(r.id))
                    }
                    onChange={toggleAll}
                  />
                </TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      aria-label={`Select ${r.id}`}
                      className="h-4 w-4 accent-[hsl(var(--primary))] disabled:opacity-40"
                      disabled={r.status !== "Pending"}
                      checked={selected.has(r.id)}
                      onChange={() => toggle(r.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{r.id}</TableCell>
                  <TableCell className="font-medium text-foreground">{r.employee}</TableCell>
                  <TableCell className="text-muted-foreground">{r.type}</TableCell>
                  <TableCell className="text-right text-foreground">{formatCurrency(r.amount)}</TableCell>
                  <TableCell className="text-muted-foreground">{r.submitted}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
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
