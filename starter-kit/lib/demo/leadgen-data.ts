/** Mock data for the Lead-Gen Funnel live demo (app/demo/leadgen). */

export type LeadStatus = "New" | "Qualified" | "Contacted";

export type Lead = {
  id: string;
  name: string;
  email: string;
  source: string;
  status: LeadStatus;
};

export const seedLeads: Lead[] = [
  { id: "ld1", name: "Hannah Pike", email: "hannah@studio.io", source: "Google Ads", status: "Qualified" },
  { id: "ld2", name: "Omar Said", email: "omar@buildco.com", source: "Organic", status: "New" },
  { id: "ld3", name: "Wei Chen", email: "wei@labs.dev", source: "Referral", status: "Contacted" },
  { id: "ld4", name: "Greta Holm", email: "greta@northst.co", source: "LinkedIn", status: "New" },
];

export const funnel = [
  { label: "Visitors", value: 8200 },
  { label: "Form views", value: 2640 },
  { label: "Submissions", value: 612 },
  { label: "Qualified", value: 188 },
];

export const sources = ["Organic", "Google Ads", "LinkedIn", "Referral"];
