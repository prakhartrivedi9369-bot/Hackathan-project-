// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] p-6">
      <div className="text-center">
        <h1 className="font-[Sora] text-8xl font-bold text-[#2563EB]">404</h1>
        <h2 className="mt-4 font-[Sora] text-2xl font-bold text-[#0F172A] dark:text-white">Page not found</h2>
        <p className="mt-2 font-[Inter] text-[15px] text-[#64748B] dark:text-[#94A3B8]">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-6 py-3 font-[Inter] text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8]"
        >
          <HiOutlineHome className="h-4.5 w-4.5" />
          Go back home
        </Link>
      </div>
    </div>
  );
}