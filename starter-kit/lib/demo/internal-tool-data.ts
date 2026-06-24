/** Mock data for the Internal Tool live demo (app/demo/internal-tool). */

export type RequestStatus = "Pending" | "Approved" | "Rejected";

export type Request = {
  id: string;
  employee: string;
  type: string;
  amount: number;
  submitted: string;
  status: RequestStatus;
};

export const requests: Request[] = [
  { id: "RQ-1042", employee: "Ana Ruiz", type: "Travel", amount: 420, submitted: "Jun 18", status: "Pending" },
  { id: "RQ-1041", employee: "Ben Cho", type: "Software", amount: 89, submitted: "Jun 18", status: "Pending" },
  { id: "RQ-1040", employee: "Carla Diaz", type: "Equipment", amount: 1250, submitted: "Jun 17", status: "Pending" },
  { id: "RQ-1039", employee: "Dmitri Orlov", type: "Travel", amount: 680, submitted: "Jun 16", status: "Approved" },
  { id: "RQ-1038", employee: "Erin Walsh", type: "Meals", amount: 64, submitted: "Jun 16", status: "Pending" },
  { id: "RQ-1037", employee: "Faye Kim", type: "Software", amount: 240, submitted: "Jun 15", status: "Rejected" },
];

export const statusFilters = ["All", "Pending", "Approved", "Rejected"] as const;

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
