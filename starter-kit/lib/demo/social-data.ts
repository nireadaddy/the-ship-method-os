/** Mock data for the Social Feed live demo (app/demo/social-feed). */

export type FeedPost = {
  id: string;
  author: string;
  handle: string;
  text: string;
  likes: number;
  liked: boolean;
  time: string;
};

export const me = { author: "You", handle: "@you" };

export const seedPosts: FeedPost[] = [
  { id: "fp1", author: "Mira Tan", handle: "@mira", text: "Just shipped our blueprint gallery — pick a system, preview a real demo, copy the build prompt. 🚀", likes: 42, liked: false, time: "2h" },
  { id: "fp2", author: "Dev Sharma", handle: "@devs", text: "Hot take: structure before code saves you a week of rework. The SHIP Method nails this.", likes: 18, liked: true, time: "5h" },
  { id: "fp3", author: "Sofia Reyes", handle: "@sofiar", text: "localStorage-persisted demos are underrated. Instant, no backend, feels real.", likes: 27, liked: false, time: "1d" },
];
