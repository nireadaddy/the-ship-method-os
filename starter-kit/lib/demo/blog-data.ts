/** Mock data for the Blog / CMS live demo (app/demo/blog). */

export type PostStatus = "Draft" | "Published";

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  status: PostStatus;
  updated: string;
};

export const categories = ["Product", "Engineering", "Company", "Guides"];

export const seedPosts: Post[] = [
  { id: "po1", title: "Shipping our blueprint gallery", excerpt: "How we turned a starter kit into a launchpad.", category: "Product", status: "Published", updated: "Jun 20" },
  { id: "po2", title: "Why we bet on The SHIP Method", excerpt: "Structure before code, every time.", category: "Company", status: "Published", updated: "Jun 14" },
  { id: "po3", title: "A field guide to live demos", excerpt: "Make people feel the product before they build it.", category: "Guides", status: "Draft", updated: "Jun 22" },
  { id: "po4", title: "Persisting demo state without a backend", excerpt: "localStorage, hydration, and the seed pattern.", category: "Engineering", status: "Draft", updated: "Jun 23" },
];
