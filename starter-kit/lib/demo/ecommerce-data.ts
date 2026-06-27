/** Mock catalog for the Ecommerce live demo (app/demo/ecommerce). */

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  /** Emoji stand-in for a product image, keeps the demo asset-free. */
  image: string;
};

export const products: Product[] = [
  { id: "p1", name: "Aera Pour-Over Kettle", category: "Kitchen", price: 68, stock: 24, image: "🫖" },
  { id: "p2", name: "Drift Linen Throw", category: "Home", price: 89, stock: 12, image: "🧶" },
  { id: "p3", name: "Nomad Travel Mug", category: "Kitchen", price: 32, stock: 0, image: "☕" },
  { id: "p4", name: "Field Notes Trio", category: "Stationery", price: 14, stock: 140, image: "📓" },
  { id: "p5", name: "Ember Scented Candle", category: "Home", price: 28, stock: 56, image: "🕯️" },
  { id: "p6", name: "Trail Canvas Tote", category: "Bags", price: 54, stock: 8, image: "👜" },
  { id: "p7", name: "Slate Ceramic Bowl Set", category: "Kitchen", price: 76, stock: 19, image: "🥣" },
  { id: "p8", name: "Wayfarer Sunglasses", category: "Accessories", price: 120, stock: 31, image: "🕶️" },
];

export const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
