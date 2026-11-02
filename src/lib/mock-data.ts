import { calculateARR, calculateChurn, calculateLTV, calculateMRR } from "@/lib/saas-calculations";
import { DashboardData } from "@/types/saas";

const revenueTrend = [
  { month: "Jan", mrr: 92000, arr: 1104000, newCustomers: 34, churn: 3.2 },
  { month: "Feb", mrr: 98000, arr: 1176000, newCustomers: 41, churn: 3.4 },
  { month: "Mar", mrr: 104000, arr: 1248000, newCustomers: 52, churn: 3.1 },
  { month: "Apr", mrr: 112000, arr: 1344000, newCustomers: 58, churn: 2.9 },
  { month: "May", mrr: 118000, arr: 1416000, newCustomers: 61, churn: 2.6 },
  { month: "Jun", mrr: 126000, arr: 1512000, newCustomers: 66, churn: 2.4 },
  { month: "Jul", mrr: 134000, arr: 1608000, newCustomers: 74, churn: 2.2 },
  { month: "Aug", mrr: 148000, arr: 1776000, newCustomers: 88, churn: 2.1 },
  { month: "Sep", mrr: 160000, arr: 1920000, newCustomers: 96, churn: 2.0 },
  { month: "Oct", mrr: 171000, arr: 2052000, newCustomers: 103, churn: 1.9 },
  { month: "Nov", mrr: 182000, arr: 2184000, newCustomers: 112, churn: 1.8 },
  { month: "Dec", mrr: 198000, arr: 2376000, newCustomers: 116, churn: 1.7 },
];

const planDistribution = [
  { name: "Starter", value: 34, revenue: 42000, color: "#42a5f5" },
  { name: "Growth", value: 42, revenue: 86000, color: "#7c3aed" },
  { name: "Scale", value: 18, revenue: 52000, color: "#0ea5e9" },
  { name: "Enterprise", value: 6, revenue: 18000, color: "#14b8a6" },
];

const customerActivity = [
  { name: "Jan", newCustomers: 32, cancellations: 11 },
  { name: "Feb", newCustomers: 39, cancellations: 12 },
  { name: "Mar", newCustomers: 44, cancellations: 13 },
  { name: "Apr", newCustomers: 46, cancellations: 12 },
  { name: "May", newCustomers: 49, cancellations: 11 },
  { name: "Jun", newCustomers: 52, cancellations: 10 },
  { name: "Jul", newCustomers: 58, cancellations: 9 },
  { name: "Aug", newCustomers: 62, cancellations: 9 },
  { name: "Sep", newCustomers: 69, cancellations: 8 },
  { name: "Oct", newCustomers: 71, cancellations: 8 },
  { name: "Nov", newCustomers: 76, cancellations: 7 },
  { name: "Dec", newCustomers: 81, cancellations: 6 },
];

const recentTransactions: DashboardData["recentTransactions"] = [
  { id: "INV-2048", customer: "Northstar Labs", plan: "Scale", amount: 2400, status: "paid", date: "2026-11-01" },
  { id: "INV-2049", customer: "Summit Studio", plan: "Growth", amount: 1400, status: "paid", date: "2026-10-29" },
  { id: "INV-2050", customer: "Bluepeak", plan: "Enterprise", amount: 6200, status: "pending", date: "2026-10-27" },
  { id: "INV-2051", customer: "Prism Health", plan: "Starter", amount: 480, status: "paid", date: "2026-10-24" },
  { id: "INV-2052", customer: "Nova Retail", plan: "Growth", amount: 1680, status: "refunded", date: "2026-10-20" },
];

const mrr = calculateMRR([
  { activeCustomers: 920, averagePlanPrice: 149, newCustomers: 34, cancellations: 14 },
  { activeCustomers: 560, averagePlanPrice: 249, newCustomers: 26, cancellations: 12 },
  { activeCustomers: 220, averagePlanPrice: 499, newCustomers: 16, cancellations: 5 },
  { activeCustomers: 80, averagePlanPrice: 999, newCustomers: 8, cancellations: 2 },
]);

const churnRate = calculateChurn([
  { activeCustomers: 920, averagePlanPrice: 149, newCustomers: 34, cancellations: 14 },
  { activeCustomers: 560, averagePlanPrice: 249, newCustomers: 26, cancellations: 12 },
  { activeCustomers: 220, averagePlanPrice: 499, newCustomers: 16, cancellations: 5 },
  { activeCustomers: 80, averagePlanPrice: 999, newCustomers: 8, cancellations: 2 },
]);

const ltv = calculateLTV([
  { activeCustomers: 920, averagePlanPrice: 149, newCustomers: 34, cancellations: 14 },
  { activeCustomers: 560, averagePlanPrice: 249, newCustomers: 26, cancellations: 12 },
  { activeCustomers: 220, averagePlanPrice: 499, newCustomers: 16, cancellations: 5 },
  { activeCustomers: 80, averagePlanPrice: 999, newCustomers: 8, cancellations: 2 },
]);

export const mockDashboardData: DashboardData = {
  overview: [
    {
      label: "Current MRR",
      value: "$198K",
      delta: "+12.3%",
      trend: "up",
      caption: "vs last month",
    },
    {
      label: "MoM growth",
      value: "8.7%",
      delta: "+1.4%",
      trend: "up",
      caption: "vs previous period",
    },
    {
      label: "Churn rate",
      value: "1.7%",
      delta: "-0.9%",
      trend: "down",
      caption: "net retention",
    },
    {
      label: "Avg LTV",
      value: "$28.4K",
      delta: "+6.2%",
      trend: "up",
      caption: "per customer",
    },
    {
      label: "ARR",
      value: "$2.38M",
      delta: "+14.8%",
      trend: "up",
      caption: "annualized",
    },
  ],
  revenueTrend,
  planDistribution,
  customerActivity,
  recentTransactions,
};

export function buildDashboardSnapshot() {
  return {
    mrr,
    arr: calculateARR(mrr),
    churnRate,
    ltv,
    revenueTrend,
    planDistribution,
    customerActivity,
    recentTransactions,
  };
}
