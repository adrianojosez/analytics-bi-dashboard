"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, ChevronDown, Download, Search } from "lucide-react";

import { CustomerActivityChart, PlanDistributionChart, RevenueAreaChart } from "@/components/dashboard/charts";
import { MetricCardComponent } from "@/components/dashboard/metric-card";
import { Sidebar } from "@/components/dashboard/sidebar";
import { compactMoney, money, percent } from "@/lib/formatters";
import { DashboardData } from "@/types/saas";

const initialState: DashboardData = {
  overview: [],
  revenueTrend: [],
  planDistribution: [],
  customerActivity: [],
  recentTransactions: [],
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/dashboard?period=quarter&tenantId=northstar-labs");
        const json = (await response.json()) as DashboardData;
        setData(json);
      } catch {
        setData(initialState);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">Loading dashboard…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 md:p-8">
          <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Northstar Labs</p>
              <h1 className="mt-1 text-2xl font-semibold text-white">Executive dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-300">
                <Search className="h-4 w-4 text-slate-400" />
                <span>Search metrics</span>
              </div>
              <button className="rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-300">
                <Bell className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20">
                <Download className="h-4 w-4" />
                Export report
              </button>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {data.overview.map((metric) => (
              <MetricCardComponent key={metric.label} metric={metric} />
            ))}
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Revenue trend</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Monthly recurring revenue</h2>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-200">
                  Last 12 months
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <RevenueAreaChart data={data.revenueTrend} />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Customer mix</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Plan distribution</h2>
              <PlanDistributionChart data={data.planDistribution} />
              <div className="space-y-3">
                {data.planDistribution.map((plan) => (
                  <div key={plan.name} className="flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: plan.color }} />
                      <span className="text-slate-200">{plan.name}</span>
                    </div>
                    <span className="text-slate-400">{plan.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Acquisition</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">New vs cancellations</h2>
                </div>
              </div>
              <CustomerActivityChart data={data.customerActivity} />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Payments</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Recent transactions</h2>
                </div>
                <Link href="/dashboard" className="text-sm text-cyan-300 hover:text-cyan-200">
                  View all
                </Link>
              </div>

              <div className="mt-4 space-y-4">
                {data.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                    <div>
                      <p className="font-medium text-white">{transaction.customer}</p>
                      <p className="text-xs text-slate-400">
                        {transaction.plan} • {transaction.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">{money(transaction.amount)}</p>
                      <span className="text-xs capitalize text-slate-400">{transaction.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Annual recurring revenue</p>
              <p className="mt-3 text-3xl font-semibold text-white">{compactMoney(2380000)}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Churn rate</p>
              <p className="mt-3 text-3xl font-semibold text-white">{percent(1.7)}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">Average LTV</p>
              <p className="mt-3 text-3xl font-semibold text-white">{compactMoney(28400)}</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
