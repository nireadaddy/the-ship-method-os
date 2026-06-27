/** Mock data for the Marketplace live demo (app/demo/marketplace). */

export type Listing = {
  id: string;
  title: string;
  category: string;
  provider: string;
  rating: number;
  reviews: number;
  pricePerHour: number;
  image: string;
  blurb: string;
};

export const listings: Listing[] = [
  { id: "l1", title: "Studio Photography", category: "Creative", provider: "Lumen Studio", rating: 4.9, reviews: 128, pricePerHour: 140, image: "📸", blurb: "Product & portrait sessions in a fully-lit downtown studio." },
  { id: "l2", title: "Home Deep Clean", category: "Home", provider: "FreshNest", rating: 4.7, reviews: 342, pricePerHour: 45, image: "🧽", blurb: "Vetted cleaners, eco supplies, same-week availability." },
  { id: "l3", title: "Personal Training", category: "Fitness", provider: "Coach Dani", rating: 5.0, reviews: 76, pricePerHour: 60, image: "🏋️", blurb: "1:1 strength programming, in-person or remote." },
  { id: "l4", title: "Logo & Brand Kit", category: "Creative", provider: "Mark&Co", rating: 4.8, reviews: 211, pricePerHour: 90, image: "🎨", blurb: "Full identity: logo, palette, type, and usage guide." },
  { id: "l5", title: "Handyman Repairs", category: "Home", provider: "FixIt Pros", rating: 4.6, reviews: 540, pricePerHour: 55, image: "🔧", blurb: "Mounting, assembly, small electrical & plumbing." },
  { id: "l6", title: "Yoga Sessions", category: "Fitness", provider: "Still Point", rating: 4.9, reviews: 98, pricePerHour: 40, image: "🧘", blurb: "Vinyasa & restorative, all levels welcome." },
];

export const categories = ["All", ...Array.from(new Set(listings.map((l) => l.category)))];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
