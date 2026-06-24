"use client";

import * as React from "react";
import { Search, Star, CheckCircle2 } from "lucide-react";

import { listings, categories, formatCurrency, type Listing } from "@/lib/demo/marketplace-data";
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

export default function MarketplaceDemoPage() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [active, setActive] = React.useState<Listing | null>(null);
  const [booked, setBooked] = React.useState(false);

  const visible = listings.filter((l) => {
    const matchesCategory = category === "All" || l.category === category;
    const matchesQuery =
      query === "" ||
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.provider.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  function openListing(listing: Listing) {
    setBooked(false);
    setActive(listing);
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="label-mono text-accent">Marketplace · Demo</p>
        <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
          Find a provider
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A two-sided marketplace: search listings, filter by category, and request a booking.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services or providers…"
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
        {visible.map((listing) => (
          <Card key={listing.id} className="flex flex-col overflow-hidden">
            <div className="flex h-28 items-center justify-center bg-muted/40 text-4xl">
              {listing.image}
            </div>
            <CardContent className="flex flex-1 flex-col gap-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-tight text-foreground">{listing.title}</p>
                <Badge variant="outline" className="shrink-0">{listing.category}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{listing.provider}</p>
              <div className="flex items-center gap-1 text-xs text-foreground">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                {listing.rating}
                <span className="text-muted-foreground">({listing.reviews})</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-foreground">
                  {formatCurrency(listing.pricePerHour)}<span className="text-xs text-muted-foreground">/hr</span>
                </span>
                <Button size="sm" variant="outline" onClick={() => openListing(listing)}>
                  View
                </Button>
              </div>
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
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>
                  {active.provider} · {active.rating}★ ({active.reviews} reviews)
                </DialogDescription>
              </DialogHeader>
              <div className="flex h-32 items-center justify-center rounded-lg bg-muted/40 text-5xl">
                {active.image}
              </div>
              <p className="text-sm text-foreground">{active.blurb}</p>
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-3">
                <span className="text-sm text-muted-foreground">Rate</span>
                <span className="font-display text-xl font-medium text-foreground">
                  {formatCurrency(active.pricePerHour)}/hr
                </span>
              </div>
              <Button className="w-full" onClick={() => setBooked(true)} disabled={booked}>
                {booked ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Request sent
                  </>
                ) : (
                  "Request to book"
                )}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
