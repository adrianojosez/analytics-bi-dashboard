import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { MetricCard } from "@/types/saas";

export function MetricCardComponent({ metric }: { metric: MetricCard }) {
  const isUp = metric.trend === "up";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm shadow-slate-950/20">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{metric.label}</p>
        <div
          className={[
            "flex h-8 w-8 items-center justify-center rounded-full",
            isUp ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300",
          ].join(" ")}
        >
          {isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-3xl font-semibold text-white">{metric.value}</p>
          <p className="mt-1 text-xs text-slate-400">{metric.caption}</p>
        </div>
        <span
          className={[
            "rounded-full px-2 py-1 text-xs font-medium",
            isUp ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300",
          ].join(" ")}
        >
          {metric.delta}
        </span>
      </div>
    </div>
  );
}
