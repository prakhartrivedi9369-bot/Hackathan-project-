import { Link } from "react-router-dom";
import {
  HiOutlineExclamationCircle,
  HiOutlineBell,
  HiOutlineOfficeBuilding,
  HiOutlineUserGroup,
  HiOutlineArrowRight,
  HiOutlineLocationMarker,
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineTrendingUp,
} from "react-icons/hi";

const STATS = [
  { label: "Active Incidents", value: "12", trend: "+3 today", tone: "red", icon: HiOutlineExclamationCircle },
  { label: "Alerts Sent Today", value: "48", trend: "+12 vs yesterday", tone: "blue", icon: HiOutlineBell },
  { label: "Available Shelters", value: "27", trend: "of 34 total", tone: "green", icon: HiOutlineOfficeBuilding },
  { label: "Deployed Volunteers", value: "156", trend: "+22 this week", tone: "navy", icon: HiOutlineUserGroup },
];

const TONE = {
  red: "bg-[#DC2626]/10 text-[#DC2626]",
  blue: "bg-[#2563EB]/10 text-[#2563EB]",
  green: "bg-[#16A34A]/10 text-[#16A34A]",
  navy: "bg-[#0F172A]/10 text-[#0F172A] dark:text-white",
};

const RECENT_INCIDENTS = [
  { id: "INC-2041", type: "Flood", zone: "Zone 4 — Riverside", severity: "Critical", status: "Active", time: "8 min ago" },
  { id: "INC-2040", type: "Fire", zone: "Zone 7 — Industrial Park", severity: "High", status: "Verifying", time: "34 min ago" },
  { id: "INC-2039", type: "Landslide", zone: "Zone 2 — Hillcrest", severity: "Medium", status: "Active", time: "1 hr ago" },
  { id: "INC-2038", type: "Heatwave", zone: "Zone 9 — Downtown", severity: "Low", status: "Resolved", time: "3 hr ago" },
];

const SEVERITY_STYLE = {
  Critical: "bg-[#DC2626]/10 text-[#DC2626]",
  High: "bg-orange-500/10 text-orange-600",
  Medium: "bg-amber-500/10 text-amber-600",
  Low: "bg-[#16A34A]/10 text-[#16A34A]",
};

const STATUS_STYLE = {
  Active: "bg-[#DC2626]/10 text-[#DC2626]",
  Verifying: "bg-amber-500/10 text-amber-600",
  Resolved: "bg-[#16A34A]/10 text-[#16A34A]",
};

const INSIGHTS = [
  { title: "Flood risk rising in Zone 4", desc: "Rainfall trend suggests a 68% chance of escalation in the next 6 hours.", confidence: 91 },
  { title: "Volunteer coverage gap", desc: "Zone 7 has 40% fewer available volunteers than similar past incidents.", confidence: 84 },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-7">
      {/* stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 transition-shadow duration-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className={`grid h-11 w-11 place-items-center rounded-xl ${TONE[s.tone]}`}>
                <s.icon className="h-5 w-5" />
              </span>
              <span className="flex items-center gap-1 font-[JetBrains_Mono] text-[11px] text-[#16A34A]">
                <HiOutlineTrendingUp className="h-3.5 w-3.5" />
                {s.trend}
              </span>
            </div>
            <p className="mt-4 font-[Sora] text-2xl font-bold text-[#0F172A] dark:text-white">{s.value}</p>
            <p className="mt-0.5 font-[Inter] text-[13px] text-[#64748B] dark:text-[#94A3B8]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* recent incidents */}
        <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#334155] px-6 py-5">
            <div>
              <h2 className="font-[Sora] text-[15.5px] font-semibold text-[#0F172A] dark:text-white">Recent Incidents</h2>
              <p className="mt-0.5 font-[Inter] text-[12.5px] text-[#64748B] dark:text-[#94A3B8]">Latest reports across the mesh</p>
            </div>
            <Link
              to="/incidents"
              className="flex items-center gap-1.5 font-[Inter] text-[13px] font-medium text-[#2563EB] hover:underline"
            >
              View all
              <HiOutlineArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-[#334155]">
            {RECENT_INCIDENTS.map((inc) => (
              <Link
                key={inc.id}
                to={`/incidents/${inc.id}`}
                className="flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-slate-50 dark:hover:bg-[#334155]/40"
              >
                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8]">
                    <HiOutlineLocationMarker className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="font-[Inter] text-[14px] font-medium text-[#0F172A] dark:text-white">
                      {inc.type} <span className="font-[JetBrains_Mono] text-[12px] text-[#94A3B8] dark:text-slate-500">· {inc.id}</span>
                    </p>
                    <p className="mt-0.5 font-[Inter] text-[12.5px] text-[#64748B] dark:text-[#94A3B8]">{inc.zone}</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <div className="flex gap-1.5">
                    <span className={`rounded-full px-2.5 py-1 font-[Inter] text-[11px] font-medium ${SEVERITY_STYLE[inc.severity]}`}>
                      {inc.severity}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 font-[Inter] text-[11px] font-medium ${STATUS_STYLE[inc.status]}`}>
                      {inc.status}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-[JetBrains_Mono] text-[11px] text-[#94A3B8] dark:text-slate-500">
                    <HiOutlineClock className="h-3 w-3" />
                    {inc.time}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI insights */}
        <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-[#0F172A] p-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#2563EB]/20 text-[#60A5FA]">
              <HiOutlineSparkles className="h-4.5 w-4.5" />
            </span>
            <h2 className="font-[Sora] text-[15px] font-semibold text-white">AI Insights</h2>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            {INSIGHTS.map((ins) => (
              <div key={ins.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <p className="font-[Inter] text-[13.5px] font-medium text-white">{ins.title}</p>
                <p className="mt-1.5 font-[Inter] text-[12.5px] leading-relaxed text-slate-400">{ins.desc}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#60A5FA]" style={{ width: `${ins.confidence}%` }} />
                  </div>
                  <span className="font-[JetBrains_Mono] text-[11px] text-slate-400">{ins.confidence}%</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/insights"
            className="mt-5 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 py-2.5 font-[Inter] text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/5"
          >
            View all insights
            <HiOutlineArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
