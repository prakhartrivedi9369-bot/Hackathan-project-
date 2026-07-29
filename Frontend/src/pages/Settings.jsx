// src/pages/Settings.jsx
import { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineShieldCheck,
  HiOutlineGlobe,
  HiOutlineCog,
  HiOutlineSave,
} from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "UTC+5:30",
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2.5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
          <HiOutlineCog className="h-5 w-5" />
        </span>
        <div>
          <h1 className="font-[Sora] text-[18px] font-bold text-[#0F172A] dark:text-white">Settings</h1>
          <p className="font-[Inter] text-[12.5px] text-[#64748B] dark:text-[#94A3B8]">Manage your account preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Profile section */}
        <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6">
          <div className="flex items-center gap-2.5">
            <HiOutlineUser className="h-4.5 w-4.5 text-[#2563EB]" />
            <h2 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">Profile</h2>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <label className="font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300">Display Name</label>
              <input
                type="text"
                defaultValue="User"
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-[#334155] px-4 py-2.5 font-[Inter] text-[14px] text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
              />
            </div>
            <div>
              <label className="font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300">Email</label>
              <input
                type="email"
                defaultValue="user@guardianmesh.ai"
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-[#334155] px-4 py-2.5 font-[Inter] text-[14px] text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10"
              />
            </div>
          </div>
        </div>

        {/* Notifications section */}
        <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6">
          <div className="flex items-center gap-2.5">
            <HiOutlineBell className="h-4.5 w-4.5 text-[#2563EB]" />
            <h2 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">Notifications</h2>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <label className="flex items-center justify-between">
              <span className="font-[Inter] text-[13px] text-[#334155] dark:text-slate-300">Email notifications</span>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]/30"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-[Inter] text-[13px] text-[#334155] dark:text-slate-300">Push notifications</span>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]/30"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-[Inter] text-[13px] text-[#334155] dark:text-slate-300">SMS alerts</span>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]/30"
              />
            </label>
          </div>
        </div>

        {/* Security section */}
        <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6">
          <div className="flex items-center gap-2.5">
            <HiOutlineShieldCheck className="h-4.5 w-4.5 text-[#2563EB]" />
            <h2 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">Security</h2>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <button className="rounded-xl border border-slate-200 dark:border-[#334155] px-4 py-2.5 font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-[#334155]/40">
              Change Password
            </button>
            <button className="rounded-xl border border-slate-200 dark:border-[#334155] px-4 py-2.5 font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-[#334155]/40">
              Two-Factor Authentication
            </button>
          </div>
        </div>

        {/* Preferences section */}
        <div className="rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B] p-6">
          <div className="flex items-center gap-2.5">
            <HiOutlineGlobe className="h-4.5 w-4.5 text-[#2563EB]" />
            <h2 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">Preferences</h2>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <div>
              <span className="font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300">Theme</span>
              <div className="mt-1.5 flex gap-2" role="group" aria-label="Theme">
                <button
                  type="button"
                  onClick={() => isDark && toggleTheme()}
                  aria-pressed={!isDark}
                  className={`flex-1 rounded-xl border px-4 py-2.5 font-[Inter] text-[13.5px] font-medium transition-colors ${
                    !isDark
                      ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                      : "border-slate-200 dark:border-[#334155] text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#334155]/40"
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => !isDark && toggleTheme()}
                  aria-pressed={isDark}
                  className={`flex-1 rounded-xl border px-4 py-2.5 font-[Inter] text-[13.5px] font-medium transition-colors ${
                    isDark
                      ? "border-[#2563EB] bg-[#2563EB]/5 text-[#2563EB]"
                      : "border-slate-200 dark:border-[#334155] text-[#334155] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#334155]/40"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
            <div>
              <label className="font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 dark:border-[#334155] px-4 py-2.5 font-[Inter] text-[14px] text-[#0F172A] dark:text-white outline-none focus:border-[#2563EB]"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 font-[Inter] text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8]">
          <HiOutlineSave className="h-4.5 w-4.5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}