/** Mock data for the Directory / Listings live demo (app/demo/directory). */

export type Entry = {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  featured: boolean;
  blurb: string;
  image: string;
};

export const entries: Entry[] = [
  { id: "e1", name: "Foundry Coffee", category: "Cafés", location: "Portland, OR", rating: 4.8, featured: true, blurb: "Single-origin pour-overs and a quiet back room for laptops.", image: "☕" },
  { id: "e2", name: "Cedar & Co. Barbers", category: "Services", location: "Austin, TX", rating: 4.9, featured: false, blurb: "Classic cuts and hot-towel shaves, walk-ins welcome.", image: "💈" },
  { id: "e3", name: "The Stacks Bookshop", category: "Retail", location: "Brooklyn, NY", rating: 4.7, featured: true, blurb: "Independent bookstore with weekly author readings.", image: "📚" },
  { id: "e4", name: "Riverside Yoga", category: "Fitness", location: "Boulder, CO", rating: 4.6, featured: false, blurb: "Heated and gentle classes by the creek.", image: "🧘" },
  { id: "e5", name: "Maker's Hardware", category: "Retail", location: "Seattle, WA", rating: 4.5, featured: false, blurb: "Neighborhood hardware with expert staff.", image: "🔨" },
  { id: "e6", name: "Lotus Thai Kitchen", category: "Restaurants", location: "San Diego, CA", rating: 4.8, featured: true, blurb: "Family recipes, fresh herbs, generous portions.", image: "🍜" },
];

export const categories = ["All", ...Array.from(new Set(entries.map((e) => e.category)))];
