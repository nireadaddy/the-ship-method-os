/** Mock data for the SaaS live demo (app/demo/saas). */

export type ProjectStatus = "Active" | "Paused" | "Archived";

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  members: number;
  updated: string;
};

export type Member = {
  id: string;
  name: string;
  role: "Owner" | "Admin" | "Member";
  email: string;
};

export const plan = {
  name: "Pro",
  seatsUsed: 7,
  seatsTotal: 10,
  renews: "Jul 14, 2026",
};

export const usage = [
  { label: "API calls", used: 184_000, limit: 250_000 },
  { label: "Storage", used: 38, limit: 100, unit: "GB" },
  { label: "Seats", used: 7, limit: 10 },
];

export const projects: Project[] = [
  { id: "pr1", name: "Marketing site", status: "Active", members: 4, updated: "2h ago" },
  { id: "pr2", name: "Mobile app v2", status: "Active", members: 6, updated: "1d ago" },
  { id: "pr3", name: "Data pipeline", status: "Paused", members: 2, updated: "3d ago" },
  { id: "pr4", name: "Legacy import", status: "Archived", members: 1, updated: "2w ago" },
];

export const team: Member[] = [
  { id: "m1", name: "Jordan Lee", role: "Owner", email: "jordan@acme.io" },
  { id: "m2", name: "Priya Nair", role: "Admin", email: "priya@acme.io" },
  { id: "m3", name: "Marcus Bell", role: "Member", email: "marcus@acme.io" },
  { id: "m4", name: "Elise Fontaine", role: "Member", email: "elise@acme.io" },
];

export function compactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}
