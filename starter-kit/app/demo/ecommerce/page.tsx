"use client";

import * as React from "react";
import { ShoppingCart, Plus, Minus, Trash2, RotateCcw } from "lucide-react";

import { products, categories, formatCurrency, type Product } from "@/lib/demo/ecommerce-data";
import { useLocalStore } from "@/lib/demo/use-local-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CartLine = { product: Product; qty: number };

export default function EcommerceDemoPage() {
  const [category, setCategory] = React.useState("All");
  const { data: cart, setData: setCart, reset: resetCart } = useLocalStore<CartLine[]>(
    "demo:ecommerce:cart",
    []
  );
  const [cartOpen, setCartOpen] = React.useState(false);

  const visible = products.filter((p) => category === "All" || p.category === category);
  const cartCount = cart.reduce((sum, l) => sum + l.qty, 0);
  const cartTotal = cart.reduce((sum, l) => sum + l.qty * l.product.price, 0);

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }

  function changeQty(id: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) => (l.product.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-mono text-accent">Ecommerce · Demo</p>
          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-foreground">
            Storefront
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse the catalog, add items, and review the cart — all with live mock state.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="ghost" onClick={resetCart} title="Empty cart">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button variant="outline" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="h-4 w-4" />
            Cart
            {cartCount > 0 && <Badge className="ml-1">{cartCount}</Badge>}
          </Button>
        </div>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((product) => {
          const soldOut = product.stock === 0;
          return (
            <Card key={product.id} className="flex flex-col overflow-hidden">
              <div className="flex h-32 items-center justify-center bg-muted/40 text-5xl">
                {product.image}
              </div>
              <CardContent className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-tight text-foreground">{product.name}</p>
                  <Badge variant="outline" className="shrink-0">{product.category}</Badge>
                </div>
                <p className="text-lg font-semibold text-foreground">{formatCurrency(product.price)}</p>
                <p className="text-xs text-muted-foreground">
                  {soldOut ? "Out of stock" : `${product.stock} in stock`}
                </p>
                <Button
                  size="sm"
                  className="mt-auto w-full"
                  disabled={soldOut}
                  onClick={() => addToCart(product)}
                >
                  <Plus className="h-4 w-4" />
                  Add to cart
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your cart</DialogTitle>
            <DialogDescription>
              {cartCount === 0 ? "No items yet." : `${cartCount} item${cartCount > 1 ? "s" : ""}`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {cart.map((line) => (
              <div key={line.product.id} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted/40 text-xl">
                  {line.product.image}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{line.product.name}</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(line.product.price)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => changeQty(line.product.id, -1)}>
                    {line.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                  </Button>
                  <span className="w-6 text-center text-sm text-foreground">{line.qty}</span>
                  <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => changeQty(line.product.id, 1)}>
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {cartCount > 0 && (
            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-display text-xl font-medium text-foreground">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
              <Button className="w-full">Checkout</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
