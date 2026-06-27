"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

import { ranges, dataByRange, type Range } from "@/lib/demo/dashboard-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardDemoPage() {
  const [range, setRange] = React.useState<Range>("7d");
  const data = dataByRange[range];
  const maxBar = Math.max(...data.series.map((s) => s.value));

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-accent">Analytics · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
            Overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The few numbers that drive a decision — switch the range to update everything.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {ranges.map((r) => (
            <Button
              key={r}
              size="sm"
              variant={r === range ? "default" : "outline"}
              onClick={() => setRange(r)}
            >
              {r}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {data.metrics.map((m) => {
          const up = m.delta >= 0;
          return (
            <Card key={m.label}>
              <CardHeader className="space-y-1">
                <p className="label-mono text-muted-foreground">{m.label}</p>
                <p className="font-display text-2xl font-medium text-foreground">{m.value}</p>
                <p className={`flex items-center gap-1 text-xs ${up ? "text-success" : "text-destructive"}`}>
                  {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {up ? "+" : ""}{m.delta}% vs prev. {range}
                </p>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Visitors trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-stretch gap-2">
            {data.series.map((s) => (
              <div key={s.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                    style={{ height: `${Math.max((s.value / maxBar) * 100, 4)}%` }}
                    title={s.value.toLocaleString()}
                  />
                </div>
                <span className="label-mono text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top pages</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Path</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Conv. rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.topPages.map((p) => (
                <TableRow key={p.path}>
                  <TableCell className="font-medium text-foreground">{p.path}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {p.views.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">{p.conv}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
