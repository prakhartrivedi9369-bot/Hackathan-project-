// src/pages/Incidents.jsx
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineExclamationCircle,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineSearch,
} from "react-icons/hi";

const INCIDENTS = [
  {
    id: "INC-2041",
    type: "Flood",
    zone: "Zone 4 — Riverside",
    severity: "Critical",
    status: "Active",
    time: "8 min ago",
    description: "Water levels rising rapidly in low-lying areas. Evacuation recommended.",
  },
  {
    id: "INC-2040",
    type: "Fire",
    zone: "Zone 7 — Industrial Park",
    severity: "High",
    status: "Verifying",
    time: "34 min ago",
    description: "Reports of smoke visible from multiple blocks. Fire department en route.",
  },
  {
    id: "INC-2039",
    type: "Landslide",
    zone: "Zone 2 — Hillcrest",
    severity: "Medium",
    status: "Active",
    time: "1 hr ago",
    description: "Road access blocked on Highway 12. Diversion in place.",
  },
  {
    id: "INC-2038",
    type: "Heatwave",
    zone: "Zone 9 — Downtown",
    severity: "Low",
    status: "Resolved",
    time: "3 hr ago",
    description: "Cooling centers opened. Temperatures expected to drop by evening.",
  },
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

export default function Incidents() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");

  const filtered = useMemo(() => {
    return INCIDENTS.filter((inc) => {
      const matchesSearch =
        search.trim() === "" ||
        inc.id.toLowerCase().includes(search.toLowerCase()) ||
        inc.type.toLowerCase().includes(search.toLowerCase()) ||
        inc.zone.toLowerCase().includes(search.toLowerCase());
      const matchesSeverity = severityFilter === "All" || inc.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    });
  }, [search, severityFilter]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header and filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <HiOutlineSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8] dark:text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incidents..."
            aria-label="Search incidents"
            className="w-full rounded-xl border border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#0F172A] py-2.5 pl-10 pr-4 font-[Inter] text-[13.5px] text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB] focus:bg-white dark:focus:bg-[#1E293B] focus:ring-4 focus:ring-[#2563EB]/10"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            aria-label="Filter by severity"
            className="rounded-xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] px-3.5 py-2.5 font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300 outline-none focus:border-[#2563EB]"
          >
            {["All", "Critical", "High", "Medium", "Low"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Incident list */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((inc) => (
          <Link
            key={inc.id}
            to={`/incidents/${inc.id}`}
            className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 transition-shadow duration-300 hover:shadow-md"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8]">
                  <HiOutlineExclamationCircle className="h-4.5 w-4.5" />
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <p className="font-[Inter] text-[14px] font-medium text-[#0F172A] dark:text-white">
                      {inc.type}
                    </p>
                    <span className="font-[JetBrains_Mono] text-[11px] text-[#94A3B8] dark:text-slate-500">
                      · {inc.id}
                    </span>
                  </div>
                  <p className="mt-0.5 font-[Inter] text-[12.5px] text-[#64748B] dark:text-[#94A3B8]">{inc.zone}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                <div className="flex gap-1.5">
                  <span
                    className={`rounded-full px-2.5 py-1 font-[Inter] text-[11px] font-medium ${SEVERITY_STYLE[inc.severity]}`}
                  >
                    {inc.severity}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 font-[Inter] text-[11px] font-medium ${STATUS_STYLE[inc.status]}`}
                  >
                    {inc.status}
                  </span>
                </div>
                <span className="flex items-center gap-1 font-[JetBrains_Mono] text-[11px] text-[#94A3B8] dark:text-slate-500">
                  <HiOutlineClock className="h-3 w-3" />
                  {inc.time}
                </span>
              </div>
            </div>
            <p className="mt-3 font-[Inter] text-[13px] text-[#64748B] dark:text-[#94A3B8]">{inc.description}</p>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center font-[Inter] text-[13.5px] text-[#94A3B8] dark:text-slate-500">
            No incidents match your filters.
          </p>
        )}
      </div>
    </div>
  );
}