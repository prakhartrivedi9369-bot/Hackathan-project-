import { useState } from "react";
import { HiOutlineOfficeBuilding, HiOutlineLocationMarker, HiOutlinePhone, HiOutlinePlus } from "react-icons/hi";

const CATEGORIES = ["All", "Shelter", "Medical", "Supplies"];

const RESOURCES = [
  { name: "Riverside Community Hall", category: "Shelter", zone: "Zone 4", capacity: 400, occupied: 320, phone: "+91 11 2345 6780" },
  { name: "Hillcrest Public School", category: "Shelter", zone: "Zone 2", capacity: 250, occupied: 90, phone: "+91 11 2345 6781" },
  { name: "District General Hospital", category: "Medical", zone: "Zone 7", capacity: 180, occupied: 142, phone: "+91 11 2345 6782" },
  { name: "Mobile Medical Unit 3", category: "Medical", zone: "Zone 4", capacity: 40, occupied: 12, phone: "+91 11 2345 6783" },
  { name: "Central Supply Depot", category: "Supplies", zone: "Zone 9", capacity: 1000, occupied: 640, phone: "+91 11 2345 6784" },
  { name: "Coastal Belt Ration Store", category: "Supplies", zone: "Zone 11", capacity: 500, occupied: 480, phone: "+91 11 2345 6785" },
];

function capacityTone(pct) {
  if (pct >= 90) return "bg-[#DC2626]";
  if (pct >= 65) return "bg-amber-500";
  return "bg-[#16A34A]";
}

export default function Resources() {
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? RESOURCES : RESOURCES.filter((r) => r.category === category);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full px-4 py-2 font-[Inter] text-[13px] font-medium transition-colors duration-200 ${
                category === c ? "bg-[#0F172A] text-white" : "bg-slate-100 dark:bg-[#334155] text-[#334155] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#475569]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2.5 font-[Inter] text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8]">
          <HiOutlinePlus className="h-4 w-4" />
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((r) => {
          const pct = Math.round((r.occupied / r.capacity) * 100);
          return (
            <div key={r.name} className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-5 transition-shadow duration-300 hover:shadow-md">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                  <HiOutlineOfficeBuilding className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-[Inter] text-[14px] font-medium text-[#0F172A] dark:text-white">{r.name}</p>
                  <span className="mt-0.5 inline-block rounded-full bg-slate-100 dark:bg-[#334155] px-2 py-0.5 font-[JetBrains_Mono] text-[10.5px] text-[#64748B] dark:text-[#94A3B8]">
                    {r.category}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between font-[Inter] text-[12.5px] text-[#334155] dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <HiOutlineLocationMarker className="h-4 w-4 text-[#94A3B8] dark:text-slate-500" />
                  {r.zone}
                </span>
                <span className="font-[JetBrains_Mono] text-[12px] text-[#64748B] dark:text-[#94A3B8]">
                  {r.occupied}/{r.capacity}
                </span>
              </div>

              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-[#334155]">
                <div className={`h-full rounded-full ${capacityTone(pct)}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-1.5 font-[JetBrains_Mono] text-[11px] text-[#94A3B8] dark:text-slate-500">{pct}% capacity</p>

              <a
                href={`tel:${r.phone}`}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-[#334155] py-2.5 font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-[#334155]/40"
              >
                <HiOutlinePhone className="h-4 w-4" />
                {r.phone}
              </a>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center font-[Inter] text-[13.5px] text-[#94A3B8] dark:text-slate-500">
            No resources in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
