// src/pages/IncidentDetail.jsx
import { useParams, Link } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineExclamationCircle,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";

// Mock data - in a real app, fetch from API
const INCIDENTS = [
  {
    id: "INC-2041",
    type: "Flood",
    zone: "Zone 4 — Riverside",
    severity: "Critical",
    status: "Active",
    time: "8 min ago",
    description: "Water levels rising rapidly in low-lying areas. Evacuation recommended.",
    details: "Heavy rainfall has caused the river to overflow its banks. Water levels are expected to rise another 2 feet in the next 6 hours. Residents in low-lying areas are advised to evacuate immediately.",
    reportedBy: "Automated Sensor S-412",
    affectedArea: "Riverside neighborhood, approximately 2.5 square miles",
    resourcesNeeded: ["Sandbags", "Water pumps", "Emergency shelter"],
    deployedTeams: ["Riverside Rapid Response", "Fire & Rescue Services"],
    timeline: [
      { time: "2:34 PM", event: "Sensor detected rising water levels" },
      { time: "2:38 PM", event: "AI analysis: 68% chance of escalation" },
      { time: "2:42 PM", event: "Alert sent to authorities for verification" },
      { time: "2:48 PM", event: "Verified by District Control Room" },
      { time: "2:50 PM", event: "Evacuation alert sent to residents" },
    ],
  },
  // ... other incidents would be here
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

export default function IncidentDetail() {
  const { id } = useParams();
  const incident = INCIDENTS.find((inc) => inc.id === id);

  if (!incident) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="font-[Sora] text-2xl font-bold text-[#0F172A] dark:text-white">Incident not found</h1>
        <Link to="/incidents" className="mt-4 flex items-center gap-1.5 font-[Inter] text-[14px] text-[#2563EB] hover:underline">
          <HiOutlineArrowLeft className="h-3.5 w-3.5" />
          Back to incidents
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <Link
        to="/incidents"
        className="flex items-center gap-1.5 font-[Inter] text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8] transition-colors hover:text-[#0F172A] dark:text-white"
      >
        <HiOutlineArrowLeft className="h-3.5 w-3.5" />
        Back to incidents
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#DC2626]/10 text-[#DC2626]">
                <HiOutlineExclamationCircle className="h-5 w-5" />
              </span>
              <div>
                <h1 className="font-[Sora] text-2xl font-bold text-[#0F172A] dark:text-white">{incident.type}</h1>
                <p className="font-[JetBrains_Mono] text-[13px] text-[#94A3B8] dark:text-slate-500">{incident.id}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`rounded-full px-3 py-1.5 font-[Inter] text-[12px] font-medium ${SEVERITY_STYLE[incident.severity]}`}>
                {incident.severity}
              </span>
              <span className={`rounded-full px-3 py-1.5 font-[Inter] text-[12px] font-medium ${STATUS_STYLE[incident.status]}`}>
                {incident.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <span className="flex items-center gap-1.5 font-[Inter] text-[13px] text-[#64748B] dark:text-[#94A3B8]">
              <HiOutlineClock className="h-4 w-4 text-[#94A3B8] dark:text-slate-500" />
              Reported {incident.time}
            </span>
            <span className="flex items-center gap-1.5 font-[Inter] text-[13px] text-[#64748B] dark:text-[#94A3B8]">
              <HiOutlineLocationMarker className="h-4 w-4 text-[#94A3B8] dark:text-slate-500" />
              {incident.zone}
            </span>
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Description */}
          <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6">
            <h2 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">Description</h2>
            <p className="mt-3 font-[Inter] text-[14px] leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
              {incident.details}
            </p>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6">
            <h2 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">Timeline</h2>
            <div className="mt-4 flex flex-col gap-3">
              {incident.timeline.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="font-[JetBrains_Mono] text-[11px] text-[#94A3B8] dark:text-slate-500">{item.time}</span>
                  <span className="font-[Inter] text-[13px] text-[#334155] dark:text-slate-300">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Quick info */}
          <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6">
            <h2 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">Quick Info</h2>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <p className="font-[Inter] text-[12px] font-medium text-[#94A3B8] dark:text-slate-500">Reported By</p>
                <p className="font-[Inter] text-[13.5px] text-[#334155] dark:text-slate-300">{incident.reportedBy}</p>
              </div>
              <div>
                <p className="font-[Inter] text-[12px] font-medium text-[#94A3B8] dark:text-slate-500">Affected Area</p>
                <p className="font-[Inter] text-[13.5px] text-[#334155] dark:text-slate-300">{incident.affectedArea}</p>
              </div>
            </div>
          </div>

          {/* Deployed teams */}
          <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6">
            <h2 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">Deployed Teams</h2>
            <div className="mt-4 flex flex-col gap-3">
              {incident.deployedTeams.map((team) => (
                <div key={team} className="flex items-center gap-2.5">
                  <HiOutlineUserGroup className="h-4 w-4 text-[#2563EB]" />
                  <span className="font-[Inter] text-[13px] text-[#334155] dark:text-slate-300">{team}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resources needed */}
          <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6">
            <h2 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">Resources Needed</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {incident.resourcesNeeded.map((resource) => (
                <span key={resource} className="rounded-full bg-slate-100 dark:bg-[#334155] px-3 py-1.5 font-[Inter] text-[12px] text-[#64748B] dark:text-[#94A3B8]">
                  {resource}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}