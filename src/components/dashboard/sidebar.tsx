import { BarChart3, Bell, CreditCard, LayoutDashboard, Settings, Users } from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Revenue", icon: BarChart3, active: false },
  { label: "Customers", icon: Users, active: false },
  { label: "Billing", icon: CreditCard, active: false },
  { label: "Reports", icon: Bell, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-slate-800 bg-slate-950/80 p-6 lg:flex lg:flex-col">
      <div className="flex items-center gap-3 pb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 text-lg font-bold text-white">
          A
        </div>
        <div>
          <p className="text-lg font-semibold text-white">Analytics BI</p>
          <p className="text-xs text-slate-400">Revenue intelligence</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
              active ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-white",
            ].join(" ")}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300">Annual target</p>
        <p className="mt-3 text-2xl font-semibold text-white">$2.7M</p>
        <p className="mt-1 text-sm text-slate-300">87% of plan achieved</p>
      </div>
    </aside>
  );
}
