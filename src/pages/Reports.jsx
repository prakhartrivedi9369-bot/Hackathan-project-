// src/pages/Reports.jsx
import { useState } from "react";
import {
  HiOutlineDocumentReport,
  HiOutlineDownload,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";

const REPORTS = [
  {
    id: "RPT-2026-07",
    title: "Monthly Incident Report - July 2026",
    type: "Monthly",
    generated: "2026-07-28",
    status: "Ready",
    size: "2.4 MB",
    description: "Comprehensive overview of all incidents, response times, and resource allocation for July 2026.",
  },
  {
    id: "RPT-2026-06",
    title: "Monthly Incident Report - June 2026",
    type: "Monthly",
    generated: "2026-07-01",
    status: "Ready",
    size: "2.1 MB",
    description: "Comprehensive overview of all incidents, response times, and resource allocation for June 2026.",
  },
  {
    id: "RPT-2026-Q2",
    title: "Quarterly Performance Review - Q2 2026",
    type: "Quarterly",
    generated: "2026-07-05",
    status: "Ready",
    size: "5.8 MB",
    description: "In-depth analysis of response effectiveness, volunteer deployment, and AI prediction accuracy for Q2 2026.",
  },
  {
    id: "RPT-2026-05",
    title: "Monthly Incident Report - May 2026",
    type: "Monthly",
    generated: "2026-06-01",
    status: "Ready",
    size: "1.9 MB",
    description: "Comprehensive overview of all incidents, response times, and resource allocation for May 2026.",
  },
  {
    id: "RPT-2026-Z4",
    title: "Zone 4 - Flood Risk Assessment",
    type: "Special",
    generated: "2026-06-15",
    status: "Generating",
    size: "—",
    description: "Detailed risk assessment for Zone 4 following recent flood events. Analysis of mitigation strategies.",
  },
];

const STATUS_STYLE = {
  Ready: "bg-[#16A34A]/10 text-[#16A34A]",
  Generating: "bg-amber-500/10 text-amber-600",
};

export default function Reports() {
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = typeFilter === "All"
    ? REPORTS
    : REPORTS.filter((r) => r.type === typeFilter);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
            <HiOutlineDocumentReport className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-[Sora] text-[18px] font-bold text-[#0F172A] dark:text-white">Reports</h1>
            <p className="font-[Inter] text-[12.5px] text-[#64748B] dark:text-[#94A3B8]">Download and analyze incident data</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter by report type"
            className="rounded-xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] px-3.5 py-2.5 font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300 outline-none focus:border-[#2563EB]"
          >
            {["All", "Monthly", "Quarterly", "Special"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2.5 font-[Inter] text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8]">
            <HiOutlineDocumentReport className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Report list */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((report) => (
          <div key={report.id} className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 transition-shadow duration-300 hover:shadow-md">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#F8FAFC] dark:bg-[#0F172A] text-[#64748B] dark:text-[#94A3B8]">
                  <HiOutlineChartBar className="h-4.5 w-4.5" />
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <p className="font-[Inter] text-[14px] font-medium text-[#0F172A] dark:text-white">{report.title}</p>
                    <span className="font-[JetBrains_Mono] text-[11px] text-[#94A3B8] dark:text-slate-500">
                      · {report.id}
                    </span>
                  </div>
                  <p className="mt-1 font-[Inter] text-[12.5px] text-[#64748B] dark:text-[#94A3B8]">{report.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 dark:bg-[#334155] px-2.5 py-1 font-[Inter] text-[11px] text-[#64748B] dark:text-[#94A3B8]">
                      {report.type}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 font-[Inter] text-[11px] font-medium ${STATUS_STYLE[report.status]}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 sm:items-end">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 font-[Inter] text-[12px] text-[#64748B] dark:text-[#94A3B8]">
                    <HiOutlineCalendar className="h-3.5 w-3.5" />
                    {report.generated}
                  </span>
                  {report.status === "Ready" && (
                    <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-[#334155] px-3.5 py-1.5 font-[Inter] text-[12px] font-medium text-[#334155] dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-[#334155]/40">
                      <HiOutlineDownload className="h-3.5 w-3.5" />
                      {report.size}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}