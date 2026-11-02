import Link from "next/link";
import { ArrowRight, BarChart3, CircleDollarSign, ShieldCheck, Zap } from "lucide-react";

const pills = ["Live SaaS KPIs", "MRR forecasting", "Churn tracking", "Multi-tenant analytics"];

const metrics = [
  { label: "MRR", value: "$198K", detail: "+12.3% this month" },
  { label: "ARR", value: "$2.38M", detail: "+14.8% YoY" },
  { label: "Churn", value: "1.7%", detail: "Down 0.9 pp" },
  { label: "LTV", value: "$28.4K", detail: "Across 4 plans" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-slate-800 bg-slate-900/70 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 font-bold text-white">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Analytics BI</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#insights" className="hover:text-white">Insights</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white">
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Start free
            </Link>
          </div>
        </header>

        <section className="grid items-center gap-10 pb-8 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-24">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span key={pill} className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
                  {pill}
                </span>
              ))}
            </div>

            <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-white lg:text-6xl">
              Turn revenue signals into smarter decisions.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Monitor MRR, churn, LTV and cohort trends across your SaaS portfolio in one executive-ready dashboard built for operators and finance leaders.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                View dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/register" className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900">
                Book a demo
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-900/10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Performance overview</p>
                <p className="mt-1 text-2xl font-semibold text-white">Q4 revenue pulse</p>
              </div>
              <div className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300">+18.2%</div>
            </div>

            <div className="space-y-4">
              {metrics.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div>
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                  </div>
                  <p className="text-right text-sm text-emerald-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="grid gap-4 pb-20 pt-8 md:grid-cols-4">
          {[
            { icon: BarChart3, title: "Executive metrics", description: "Track MRR, ARR, churn and LTV in real time." },
            { icon: Zap, title: "Fast queries", description: "Redis-backed KPI access for instant dashboard load times." },
            { icon: CircleDollarSign, title: "Forecasting", description: "Model growth and revenue durability with plan-level filters." },
            { icon: ShieldCheck, title: "Secure tenants", description: "Isolation-ready architecture for multi-tenant SaaS deployments." },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm leading-6 text-slate-300">{description}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
