/**
 * Mock data for the CRM live demo (app/demo/crm). Self-contained so the demo
 * reads as a real, populated CRM without touching the kit's shared mock-data.
 */

export const STAGES = [
  "Lead",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Won",
] as const;

export type Stage = (typeof STAGES)[number];

export type Contact = {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
};

export type Activity = {
  id: string;
  dealId: string;
  type: "call" | "email" | "note" | "meeting";
  summary: string;
  /** Days ago, for a stable relative label without time drift in tests. */
  daysAgo: number;
};

export type Deal = {
  id: string;
  name: string;
  contactId: string;
  value: number;
  stage: Stage;
  ownerInitials: string;
};

export const contacts: Contact[] = [
  { id: "c1", name: "Mira Tan", title: "Head of Ops", company: "Northwind Co.", email: "mira@northwind.co" },
  { id: "c2", name: "Dev Sharma", title: "Founder", company: "Loop Labs", email: "dev@looplabs.io" },
  { id: "c3", name: "Sofia Reyes", title: "VP Sales", company: "Brightpath", email: "sofia@brightpath.com" },
  { id: "c4", name: "Liam Walsh", title: "CTO", company: "Cedar Systems", email: "liam@cedar.dev" },
  { id: "c5", name: "Anya Kovac", title: "Marketing Lead", company: "Pinecone Media", email: "anya@pinecone.media" },
  { id: "c6", name: "Tomás Vidal", title: "Owner", company: "Vidal & Sons", email: "tomas@vidalandsons.com" },
];

export const deals: Deal[] = [
  { id: "d1", name: "Northwind — annual plan", contactId: "c1", value: 24000, stage: "Negotiation", ownerInitials: "JN" },
  { id: "d2", name: "Loop Labs — pilot", contactId: "c2", value: 6000, stage: "Qualified", ownerInitials: "JN" },
  { id: "d3", name: "Brightpath — team rollout", contactId: "c3", value: 42000, stage: "Proposal", ownerInitials: "AK" },
  { id: "d4", name: "Cedar — platform license", contactId: "c4", value: 88000, stage: "Lead", ownerInitials: "JN" },
  { id: "d5", name: "Pinecone — campaign tools", contactId: "c5", value: 12500, stage: "Won", ownerInitials: "AK" },
  { id: "d6", name: "Vidal — starter package", contactId: "c6", value: 3500, stage: "Lead", ownerInitials: "AK" },
  { id: "d7", name: "Northwind — add-on seats", contactId: "c1", value: 9000, stage: "Qualified", ownerInitials: "JN" },
];

export const activities: Activity[] = [
  { id: "a1", dealId: "d1", type: "call", summary: "Pricing call — sent revised quote for 40 seats.", daysAgo: 1 },
  { id: "a2", dealId: "d1", type: "email", summary: "Forwarded security questionnaire to their IT.", daysAgo: 3 },
  { id: "a3", dealId: "d3", type: "meeting", summary: "Demo with the sales team — strong interest.", daysAgo: 2 },
  { id: "a4", dealId: "d2", type: "note", summary: "Wants a 2-week pilot before committing.", daysAgo: 4 },
  { id: "a5", dealId: "d5", type: "note", summary: "Closed won 🎉 — kickoff scheduled.", daysAgo: 6 },
  { id: "a6", dealId: "d4", type: "email", summary: "Intro email sent, awaiting reply.", daysAgo: 1 },
  { id: "a7", dealId: "d7", type: "call", summary: "Discussed expansion to a second team.", daysAgo: 5 },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function relativeDays(daysAgo: number): string {
  if (daysAgo <= 0) return "today";
  if (daysAgo === 1) return "yesterday";
  return `${daysAgo} days ago`;
}
