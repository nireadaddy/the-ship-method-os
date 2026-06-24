"use client";

import * as React from "react";
import { Search, Star, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

import { entries, categories, type Entry } from "@/lib/demo/directory-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DirectoryDemoPage() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [active, setActive] = React.useState<Entry | null>(null);
  const [claimed, setClaimed] = React.useState(false);

  const visible = entries.filter((e) => {
    const matchesCategory = category === "All" || e.category === category;
    const matchesQuery =
      query === "" ||
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.location.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  function open(entry: Entry) {
    setClaimed(false);
    setActive(entry);
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="label-mono text-accent">Directory · Demo</p>
        <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
          Local guide
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A searchable directory — filter by category, open a listing, and claim it.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or city…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={c === category ? "default" : "outline"}
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((entry) => (
          <Card key={entry.id} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col gap-2 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted/40 text-2xl">
                  {entry.image}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-medium text-foreground">{entry.name}</p>
                    {entry.featured && <Sparkles className="h-3.5 w-3.5 shrink-0 text-accent" />}
                  </div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {entry.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <Badge variant="outline">{entry.category}</Badge>
                <span className="flex items-center gap-1 text-xs text-foreground">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  {entry.rating}
                </span>
              </div>
              <Button size="sm" variant="outline" className="mt-auto w-full" onClick={() => open(entry)}>
                View listing
              </Button>
            </CardContent>
          </Card>
        ))}
        {visible.length === 0 && (
          <p className="col-span-full rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No listings match your search.
          </p>
        )}
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent>
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {active.name}
                  {active.featured && <Badge variant="secondary" className="gap-1"><Sparkles className="h-3 w-3" />Featured</Badge>}
                </DialogTitle>
                <DialogDescription>
                  {active.category} · {active.location} · {active.rating}★
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-foreground">{active.blurb}</p>
              <Button className="w-full" onClick={() => setClaimed(true)} disabled={claimed}>
                {claimed ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Claim submitted
                  </>
                ) : (
                  "Claim this listing"
                )}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
