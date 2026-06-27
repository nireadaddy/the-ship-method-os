"use client";

import * as React from "react";
import { Clock, Check, X, RotateCcw, CalendarClock } from "lucide-react";

import { seedSlots, type Slot } from "@/lib/demo/booking-data";
import { useLocalStore } from "@/lib/demo/use-local-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BookingDemoPage() {
  const { data: slots, setData: setSlots, reset } = useLocalStore<Slot[]>(
    "demo:booking:slots",
    seedSlots
  );
  const [booking, setBooking] = React.useState<Slot | null>(null);
  const [name, setName] = React.useState("");

  const open = slots.filter((s) => !s.bookedBy).length;
  const booked = slots.length - open;

  function confirmBooking(e: React.FormEvent) {
    e.preventDefault();
    if (!booking || !name.trim()) return;
    setSlots((prev) =>
      prev.map((s) => (s.id === booking.id ? { ...s, bookedBy: name.trim() } : s))
    );
    setBooking(null);
    setName("");
  }

  function cancel(id: string) {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, bookedBy: null } : s)));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-accent">Booking · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
            Today&rsquo;s availability
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Book an open slot or cancel one — bookings persist locally across refreshes.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={reset} className="shrink-0">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="flex gap-3">
        <Badge variant="secondary">{open} open</Badge>
        <Badge variant="default">{booked} booked</Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => {
          const isBooked = Boolean(slot.bookedBy);
          return (
            <Card key={slot.id} className={isBooked ? "opacity-80" : ""}>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-display text-lg font-medium text-foreground">{slot.time}</span>
                </div>
                {isBooked ? (
                  <Badge variant="outline" className="gap-1">
                    <Check className="h-3 w-3" />
                    Booked
                  </Badge>
                ) : (
                  <Badge variant="secondary">Open</Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{slot.service}</p>
                {isBooked ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{slot.bookedBy}</span>
                    <Button size="sm" variant="ghost" onClick={() => cancel(slot.id)}>
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" className="w-full" onClick={() => setBooking(slot)}>
                    <CalendarClock className="h-4 w-4" />
                    Book
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={booking !== null} onOpenChange={(o) => { if (!o) { setBooking(null); setName(""); } }}>
        <DialogContent>
          {booking && (
            <form onSubmit={confirmBooking}>
              <DialogHeader>
                <DialogTitle>Book {booking.time}</DialogTitle>
                <DialogDescription>{booking.service}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <label className="label-mono mb-1 block text-muted-foreground">Your name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoFocus />
              </div>
              <Button type="submit" className="mt-5 w-full">Confirm booking</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
