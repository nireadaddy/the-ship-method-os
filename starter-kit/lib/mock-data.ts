// Shared mock data for The SHIP Method OS starter kit.
// No backend is wired up yet — every route group (sale / member / backoffice)
// should import from here until real Supabase queries replace these arrays.
// See README.md for the migration note.

export interface MockUser {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Starter" | "Pro" | "Lifetime";
  status: "active" | "trialing" | "past_due" | "canceled";
  joinedAt: string; // ISO date string
}

export interface MockMemberContent {
  id: string;
  title: string;
  tier: "Free" | "Starter" | "Pro" | "Lifetime";
  progress: number; // 0-100
}

export interface MockMetric {
  label: string;
  value: string;
  change: number; // signed percentage, e.g. 12.4 or -3.1
}

export const users: MockUser[] = [
  {
    id: "usr_001",
    name: "Anan Suwannarat",
    email: "anan@shipmethod.dev",
    plan: "Pro",
    status: "active",
    joinedAt: "2025-11-02",
  },
  {
    id: "usr_002",
    name: "Becky Tran",
    email: "becky.tran@gmail.com",
    plan: "Starter",
    status: "active",
    joinedAt: "2025-12-14",
  },
  {
    id: "usr_003",
    name: "Chai Wattana",
    email: "chai.w@outlook.com",
    plan: "Lifetime",
    status: "active",
    joinedAt: "2025-09-21",
  },
  {
    id: "usr_004",
    name: "Dana Kim",
    email: "dana.kim@proton.me",
    plan: "Free",
    status: "trialing",
    joinedAt: "2026-01-30",
  },
  {
    id: "usr_005",
    name: "Eric Sombat",
    email: "eric.sombat@yahoo.com",
    plan: "Pro",
    status: "past_due",
    joinedAt: "2025-10-08",
  },
  {
    id: "usr_006",
    name: "Faye Nguyen",
    email: "faye.nguyen@icloud.com",
    plan: "Starter",
    status: "canceled",
    joinedAt: "2025-08-17",
  },
];

export const members: MockMemberContent[] = [
  {
    id: "crs_001",
    title: "SHIP Method Foundations",
    tier: "Free",
    progress: 100,
  },
  {
    id: "crs_002",
    title: "Offer Design & Pricing Mastery",
    tier: "Starter",
    progress: 62,
  },
  {
    id: "crs_003",
    title: "Building Your First Funnel",
    tier: "Starter",
    progress: 30,
  },
  {
    id: "crs_004",
    title: "Advanced Backoffice Automation",
    tier: "Pro",
    progress: 5,
  },
  {
    id: "crs_005",
    title: "Lifetime Mastermind Vault",
    tier: "Lifetime",
    progress: 0,
  },
];

export const metrics: MockMetric[] = [
  { label: "Monthly Recurring Revenue", value: "$18,420", change: 12.4 },
  { label: "Active Members", value: "342", change: 6.1 },
  { label: "Trial → Paid Conversion", value: "24.8%", change: -1.7 },
  { label: "Churn Rate", value: "3.2%", change: -0.5 },
  { label: "Avg. Course Completion", value: "58%", change: 4.3 },
];
