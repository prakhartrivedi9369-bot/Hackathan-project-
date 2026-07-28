import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineExclamationCircle,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
  HiOutlineDocumentReport,
  HiOutlineLightBulb,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineShieldCheck,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi";
import { useTheme } from "../context/ThemeContext"; // <-- ADD THIS

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: HiOutlineHome },
  { label: "Incidents", path: "/incidents", icon: HiOutlineExclamationCircle },
  { label: "Teams", path: "/teams", icon: HiOutlineUserGroup },
  { label: "Resources", path: "/resources", icon: HiOutlineOfficeBuilding },
  { label: "Reports", path: "/reports", icon: HiOutlineDocumentReport },
  { label: "Insights", path: "/insights", icon: HiOutlineLightBulb },
  { label: "Settings", path: "/settings", icon: HiOutlineCog },
];

export default function DashboardLayout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme(); // <-- ADD THIS

  const handleLogout = () => {
    localStorage.removeItem("guardianmesh_token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0F172A]/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-[#1E293B] border-r border-slate-200 dark:border-[#334155] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center px-6 border-b border-slate-100 dark:border-[#334155]">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#2563EB]">
              <HiOutlineShieldCheck className="h-4.5 w-4.5 text-white" />
            </span>
            <span className="font-[Sora] text-[17px] font-semibold tracking-tight text-[#0F172A] dark:text-white">
              Guardian<span className="text-[#2563EB]">Mesh</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden"
            aria-label="Close sidebar"
          >
            <HiOutlineX className="h-5 w-5 text-[#64748B] dark:text-[#94A3B8]" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-[Inter] text-[14px] font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-[#2563EB]/10 text-[#2563EB]"
                    : "text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#334155]/50 hover:text-[#0F172A] dark:hover:text-white"
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-[Inter] text-[14px] font-medium text-[#64748B] dark:text-[#94A3B8] transition-colors hover:bg-slate-100 dark:hover:bg-[#334155]/50 hover:text-[#0F172A] dark:hover:text-white"
          >
            {isDark ? (
              <>
                <HiOutlineSun className="h-4.5 w-4.5" />
                Light Mode
              </>
            ) : (
              <>
                <HiOutlineMoon className="h-4.5 w-4.5" />
                Dark Mode
              </>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-[Inter] text-[14px] font-medium text-[#DC2626] transition-colors hover:bg-[#DC2626]/10"
          >
            <HiOutlineLogout className="h-4.5 w-4.5" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-[#334155] bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-xl px-4 py-3 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-lg text-[#0F172A] dark:text-white hover:bg-slate-100 dark:hover:bg-[#334155]/50 lg:hidden"
              aria-label="Open sidebar"
            >
              <HiOutlineMenu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-4 ml-auto">
              <button
                onClick={toggleTheme}
                className="grid h-9 w-9 place-items-center rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#334155]/50 lg:hidden"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <HiOutlineSun className="h-5 w-5" />
                ) : (
                  <HiOutlineMoon className="h-5 w-5" />
                )}
              </button>
              <span className="font-[JetBrains_Mono] text-[12px] text-[#94A3B8] dark:text-[#64748B]">
                Live · {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}