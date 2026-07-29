import { useMemo, useState } from "react";
import { HiOutlineSearch, HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker, HiOutlinePlus } from "react-icons/hi";

const TEAMS = [
  { name: "Arjun Mehta", role: "Team Lead", org: "Riverside Rapid Response", status: "Deployed", zone: "Zone 4", phone: "+91 98765 43210", email: "arjun.m@guardianmesh.ai" },
  { name: "Priya Nathan", role: "Field Coordinator", org: "NGO — HopeWorks", status: "Available", zone: "Zone 2", phone: "+91 98765 11223", email: "priya.n@hopeworks.org" },
  { name: "Marcus Ilori", role: "Volunteer Lead", org: "Citizen Volunteers", status: "Available", zone: "Zone 9", phone: "+91 98765 55667", email: "marcus.i@guardianmesh.ai" },
  { name: "Dr. Anika Rao", role: "Medical Officer", org: "District Health Dept.", status: "Deployed", zone: "Zone 7", phone: "+91 98765 88990", email: "anika.rao@health.gov" },
  { name: "Vikram Singh", role: "Rescue Diver", org: "Fire & Rescue Services", status: "Deployed", zone: "Zone 4", phone: "+91 98765 33445", email: "vikram.s@rescue.gov" },
  { name: "Neha Kapoor", role: "Logistics", org: "Citizen Volunteers", status: "Off Duty", zone: "—", phone: "+91 98765 77889", email: "neha.k@guardianmesh.ai" },
];

const STATUS_STYLE = {
  Deployed: "bg-[#DC2626]/10 text-[#DC2626]",
  Available: "bg-[#16A34A]/10 text-[#16A34A]",
  "Off Duty": "bg-slate-100 dark:bg-[#334155] text-[#64748B] dark:text-[#94A3B8]",
};

export default function Teams() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return TEAMS.filter((t) => {
      const matchesQuery =
        query.trim() === "" ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.role.toLowerCase().includes(query.toLowerCase()) ||
        t.org.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || t.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <HiOutlineSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8] dark:text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role, org..."
            aria-label="Search team members"
            className="w-full rounded-xl border border-slate-200 dark:border-[#334155] bg-slate-50 dark:bg-[#0F172A] py-2.5 pl-10 pr-4 font-[Inter] text-[13.5px] text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB] focus:bg-white dark:focus:bg-[#1E293B] focus:ring-4 focus:ring-[#2563EB]/10"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
            className="rounded-xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] px-3.5 py-2.5 font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300 outline-none focus:border-[#2563EB]"
          >
            {["All", "Deployed", "Available", "Off Duty"].map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All statuses" : s}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2.5 font-[Inter] text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8]">
            <HiOutlinePlus className="h-4 w-4" />
            Add Member
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((member) => (
          <div key={member.email} className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 transition-shadow duration-300 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#2563EB]/10 font-[Sora] text-[14px] font-semibold text-[#2563EB]">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="font-[Inter] text-[14px] font-medium text-[#0F172A] dark:text-white">{member.name}</p>
                  <p className="font-[Inter] text-[12.5px] text-[#64748B] dark:text-[#94A3B8]">{member.role}</p>
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-1 font-[Inter] text-[11px] font-medium ${STATUS_STYLE[member.status]}`}>
                {member.status}
              </span>
            </div>

            <p className="mt-4 font-[JetBrains_Mono] text-[11.5px] uppercase tracking-wide text-[#94A3B8] dark:text-slate-500">{member.org}</p>

            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 dark:border-[#334155] pt-3">
              <span className="flex items-center gap-2 font-[Inter] text-[12.5px] text-[#334155] dark:text-slate-300">
                <HiOutlineLocationMarker className="h-4 w-4 text-[#94A3B8] dark:text-slate-500" />
                {member.zone}
              </span>
              <a href={`tel:${member.phone}`} className="flex items-center gap-2 font-[Inter] text-[12.5px] text-[#334155] dark:text-slate-300 hover:text-[#2563EB]">
                <HiOutlinePhone className="h-4 w-4 text-[#94A3B8] dark:text-slate-500" />
                {member.phone}
              </a>
              <a href={`mailto:${member.email}`} className="flex items-center gap-2 font-[Inter] text-[12.5px] text-[#334155] dark:text-slate-300 hover:text-[#2563EB]">
                <HiOutlineMail className="h-4 w-4 text-[#94A3B8] dark:text-slate-500" />
                {member.email}
              </a>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center font-[Inter] text-[13.5px] text-[#94A3B8] dark:text-slate-500">
            No team members match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
