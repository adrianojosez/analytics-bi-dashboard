export type Period = "30d" | "quarter" | "year";

export type MetricTrend = "up" | "down";

export type MetricCard = {
  label: string;
  value: string;
  delta: string;
  trend: MetricTrend;
  caption: string;
};

export type RevenuePoint = {
  month: string;
  mrr: number;
  arr: number;
  newCustomers: number;
  churn: number;
};

export type PlanDistribution = {
  name: string;
  value: number;
  revenue: number;
  color: string;
};

export type CustomerActivityPoint = {
  name: string;
  newCustomers: number;
  cancellations: number;
};

export type DashboardData = {
  overview: MetricCard[];
  revenueTrend: RevenuePoint[];
  planDistribution: PlanDistribution[];
  customerActivity: CustomerActivityPoint[];
  recentTransactions: Array<{
    id: string;
    customer: string;
    plan: string;
    amount: number;
    status: "paid" | "pending" | "refunded";
    date: string;
  }>;
};
