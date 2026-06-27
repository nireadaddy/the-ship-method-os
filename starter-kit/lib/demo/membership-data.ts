/** Mock data for the Membership / Course live demo (app/demo/membership). */

export type Lesson = {
  id: string;
  title: string;
  duration: string;
  /** Seeded completion state; the demo lets you toggle the rest. */
  done: boolean;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export const course = {
  title: "Ship Your First Product",
  tier: "Pro",
};

export const modules: Module[] = [
  {
    id: "m1",
    title: "Foundations",
    lessons: [
      { id: "l1", title: "Welcome & how this works", duration: "4 min", done: true },
      { id: "l2", title: "Finding a problem worth solving", duration: "12 min", done: true },
      { id: "l3", title: "Scoping a true MVP", duration: "9 min", done: false },
    ],
  },
  {
    id: "m2",
    title: "Building",
    lessons: [
      { id: "l4", title: "Mapping the human flow", duration: "11 min", done: false },
      { id: "l5", title: "Writing an AI build spec", duration: "15 min", done: false },
      { id: "l6", title: "Shipping the first screen", duration: "8 min", done: false },
    ],
  },
  {
    id: "m3",
    title: "Launch",
    lessons: [
      { id: "l7", title: "Pre-launch QA checklist", duration: "7 min", done: false },
      { id: "l8", title: "Telling your launch story", duration: "10 min", done: false },
    ],
  },
];
