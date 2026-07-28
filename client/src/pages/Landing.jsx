import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiArrowRight,
  FiPlay,
  FiChevronDown,
  FiMapPin,
  FiRadio,
} from "react-icons/fi";
import {
  HiOutlineLightningBolt,
  HiOutlineBell,
  HiOutlineExclamationCircle,
  HiOutlineLocationMarker,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";
import {
  WiFlood,
  WiEarthquake,
  WiFire,
  WiHurricane,
  WiSmoke,
  WiThermometer,
} from "react-icons/wi";
import { FaBuildingShield, FaHandsHolding, FaHospital, FaPeopleGroup } from "react-icons/fa6";

/* -------------------------------------------------------------------------- */
/*  DESIGN NOTES (dev reference — remove or keep as comment)                  */
/*  Display face   : "Sora"     — geometric, technical, confident            */
/*  Body face      : "Inter"    — neutral, highly legible at small sizes     */
/*  Signal face    : "JetBrains Mono" — used for stats, coordinates, tags,   */
/*                    anything that reads like live telemetry from the mesh */
/*  Signature      : a live "sensor mesh" — nodes that connect and pulse,    */
/*                    literalizing the product name "GuardianMesh" and      */
/*                    reappearing (quietly) as a texture across the page.   */
/*  Import fonts in index.html:                                              */
/*  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500; */
/*  600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@   */
/*  400;500&display=swap" rel="stylesheet" />                                */
/* -------------------------------------------------------------------------- */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ---------------------------- Mesh Network BG ---------------------------- */
/* The signature visual: a field of nodes with faint connecting lines that   */
/* pulse at random intervals — a literal "guardian mesh" of sensors.         */
function MeshField({ density = 26, className = "" }) {
  const nodes = useRef(
    Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
    }))
  ).current;

  return (
    <svg
      className={`absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {nodes.map((n, i) =>
        nodes.slice(i + 1, i + 3).map((m) => {
          const dist = Math.hypot(n.x - m.x, n.y - m.y);
          if (dist > 28) return null;
          return (
            <line
              key={`${n.id}-${m.id}`}
              x1={n.x}
              y1={n.y}
              x2={m.x}
              y2={m.y}
              stroke="#2563EB"
              strokeWidth="0.08"
              strokeOpacity="0.25"
            />
          );
        })
      )}
      {nodes.map((n) => (
        <circle key={n.id} cx={n.x} cy={n.y} r="0.35" fill="#2563EB" fillOpacity="0.5">
          <animate
            attributeName="r"
            values="0.35;0.9;0.35"
            dur="3.5s"
            begin={`${n.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="0.5;0.9;0.5"
            dur="3.5s"
            begin={`${n.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

/* -------------------------------- Counter -------------------------------- */
function CountUp({ end, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="font-[JetBrains_Mono] tabular-nums">
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

/* --------------------------------- Reveal --------------------------------- */
function Reveal({ children, delay = 0, y = 28, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------- Navbar --------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-slate-200/70 dark:border-[#334155]/70 bg-white/70 dark:bg-[#0F172A]/70 backdrop-blur-xl shadow-[0_1px_0_0_rgba(15,23,42,0.04)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB]">
            <HiOutlineShieldCheck className="h-4.5 w-4.5 text-white" />
            <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-[#DC2626]" />
          </span>
          <span className="font-[Sora] text-[17px] font-semibold tracking-tight text-[#0F172A] dark:text-white">
            Guardian<span className="text-[#2563EB]">Mesh</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative font-[Inter] text-[14.5px] font-medium text-[#334155] dark:text-slate-300 transition-colors hover:text-[#0F172A] dark:hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-[1.5px] w-0 bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative grid h-9 w-9 place-items-center rounded-full text-[#334155] dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "sun" : "moon"}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="grid place-items-center"
              >
                {isDark ? <HiOutlineSun className="h-4.5 w-4.5" /> : <HiOutlineMoon className="h-4.5 w-4.5" />}
              </motion.span>
            </AnimatePresence>
          </button>
          <Link
            to="/login"
            className="font-[Inter] text-[14.5px] font-medium text-[#334155] dark:text-slate-300 transition-colors hover:text-[#0F172A] dark:hover:text-white"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="group flex items-center gap-1.5 rounded-full bg-[#0F172A] px-5 py-2.5 font-[Inter] text-[14px] font-medium text-white transition-all duration-300 hover:bg-[#2563EB] hover:shadow-lg hover:shadow-blue-500/25"
          >
            Get Started
            <FiArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-9 w-9 place-items-center rounded-lg text-[#0F172A] dark:text-white"
          >
            {isDark ? <HiOutlineSun className="h-5 w-5" /> : <HiOutlineMoon className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-lg text-[#0F172A] dark:text-white"
            aria-label="Open menu"
          >
            <FiMenu className="h-5.5 w-5.5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0F172A]/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="ml-auto flex h-full w-[78%] max-w-sm flex-col gap-8 bg-white dark:bg-[#1E293B] p-7"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-[Sora] text-lg font-semibold text-[#0F172A] dark:text-white">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <FiX className="h-5.5 w-5.5 text-[#0F172A] dark:text-white" />
                </button>
              </div>
              <nav className="flex flex-col gap-5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-[Inter] text-base font-medium text-[#334155] dark:text-slate-300"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <Link
                  to="/login"
                  className="rounded-full border border-slate-200 dark:border-[#334155] py-3 text-center font-[Inter] text-sm font-medium text-[#0F172A] dark:text-white"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-[#2563EB] py-3 text-center font-[Inter] text-sm font-medium text-white"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------------------------- Hero ---------------------------------- */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A] pt-28">
      {/* ambient gradient glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#2563EB]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-40 h-[420px] w-[420px] rounded-full bg-[#DC2626]/8 blur-[110px]" />
      <MeshField density={22} className="opacity-40" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-10 lg:px-10">
        {/* left */}
        <Reveal className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 px-4 py-1.5 font-[JetBrains_Mono] text-[12px] font-medium text-[#2563EB]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2563EB]" />
            LIVE MESH · 3,214 SENSORS ONLINE
          </span>

          <h1 className="mt-6 font-[Sora] text-[42px] font-bold leading-[1.08] tracking-tight text-[#0F172A] dark:text-white sm:text-[52px] lg:text-[58px]">
            AI-Powered Disaster Intelligence for{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent">
              Safer Communities
            </span>
          </h1>

          <p className="mt-6 max-w-lg font-[Inter] text-[17px] leading-relaxed text-[#475569]">
            GuardianMesh fuses real-time sensor data, satellite feeds, and predictive AI
            into a single early-warning network — so responders act in minutes, not hours.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/signup"
              className="group flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-7 py-3.5 font-[Inter] text-[15px] font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Get Started
              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button className="group flex items-center justify-center gap-2.5 rounded-full border border-slate-300 bg-white dark:bg-[#1E293B] px-7 py-3.5 font-[Inter] text-[15px] font-semibold text-[#0F172A] dark:text-white transition-all duration-300 hover:border-[#2563EB] hover:text-[#2563EB]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0F172A] text-white transition-colors group-hover:bg-[#2563EB]">
                <FiPlay className="h-3 w-3" />
              </span>
              Watch Demo
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-slate-200 dark:border-[#334155] pt-7">
            {[
              ["10K+", "Citizens Protected"],
              ["500+", "Alerts Sent"],
              ["150+", "Active Shelters"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-[Sora] text-2xl font-bold text-[#0F172A] dark:text-white">{n}</p>
                <p className="font-[Inter] text-[12.5px] text-[#64748B] dark:text-[#94A3B8]">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* right — animated radar / map / floating cards */}
        <Reveal delay={0.15} className="relative z-10 hidden lg:block">
          <div className="relative mx-auto h-[480px] w-full max-w-md">
            {/* radar core */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2563EB]/15 bg-white dark:bg-[#1E293B] shadow-2xl shadow-blue-900/10">
              <div className="absolute inset-6 rounded-full border border-[#2563EB]/15" />
              <div className="absolute inset-14 rounded-full border border-[#2563EB]/15" />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2563EB]/25 via-transparent to-transparent"
                style={{ transformOrigin: "50% 50%" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]" />
              {[
                { top: "20%", left: "65%" },
                { top: "60%", left: "25%" },
                { top: "70%", left: "70%" },
              ].map((pos, i) => (
                <span
                  key={i}
                  className="absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#DC2626] text-white shadow-lg"
                  style={pos}
                >
                  <FiMapPin className="h-3 w-3" />
                  <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#DC2626]/50" />
                </span>
              ))}
            </div>

            {/* floating emergency card */}
            <motion.div
              className="absolute -left-6 top-4 w-52 rounded-2xl border border-slate-100 dark:border-[#334155] bg-white/90 p-4 shadow-xl backdrop-blur-sm"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#DC2626]/10 text-[#DC2626]">
                  <HiOutlineExclamationCircle className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-[Sora] text-[13px] font-semibold text-[#0F172A] dark:text-white">Flood Alert</p>
                  <p className="font-[JetBrains_Mono] text-[11px] text-[#64748B] dark:text-[#94A3B8]">Zone 4 · 2 min ago</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-4 bottom-10 w-48 rounded-2xl border border-slate-100 dark:border-[#334155] bg-white/90 p-4 shadow-xl backdrop-blur-sm"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#16A34A]/10 text-[#16A34A]">
                  <FiRadio className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-[Sora] text-[13px] font-semibold text-[#0F172A] dark:text-white">Sensor Synced</p>
                  <p className="font-[JetBrains_Mono] text-[11px] text-[#64748B] dark:text-[#94A3B8]">Uptime 99.9%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[#94A3B8] dark:text-slate-500 lg:flex"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-[JetBrains_Mono] text-[11px]">SCROLL</span>
        <FiChevronDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
}

/* -------------------------------- TrustedBy -------------------------------- */
function TrustedBy() {
  const orgs = [
    { icon: FaBuildingShield, label: "Government" },
    { icon: FaHandsHolding, label: "NGOs" },
    { icon: FaHospital, label: "Hospitals" },
    { icon: HiOutlineShieldCheck, label: "Emergency Teams" },
    { icon: FaPeopleGroup, label: "Volunteers" },
  ];
  return (
    <section className="border-y border-slate-100 dark:border-[#334155] bg-white dark:bg-[#1E293B] py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="text-center font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#94A3B8] dark:text-slate-500">
            TRUSTED BY THE PEOPLE WHO RESPOND FIRST
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {orgs.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.05}>
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 dark:border-[#334155] px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/20 hover:shadow-md">
                <o.icon className="h-6 w-6 text-[#2563EB]" />
                <span className="font-[Inter] text-[13px] font-medium text-[#334155] dark:text-slate-300">{o.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- LiveStats -------------------------------- */
function LiveStats() {
  const stats = [
    { end: 10000, suffix: "+", label: "Citizens Protected" },
    { end: 500, suffix: "+", label: "Emergency Alerts" },
    { end: 150, suffix: "+", label: "Shelters" },
    { end: 300, suffix: "+", label: "Volunteers" },
  ];
  return (
    <section className="bg-[#0F172A] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#60A5FA]">
            THE MESH, IN NUMBERS
          </span>
          <h2 className="mt-3 font-[Sora] text-3xl font-bold text-white sm:text-4xl">
            Impact you can measure
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/40 hover:bg-white/[0.06]">
                <p className="font-[Sora] text-3xl font-bold text-white sm:text-4xl">
                  <CountUp end={s.end} suffix={s.suffix} />
                </p>
                <p className="mt-2 font-[Inter] text-[13.5px] text-slate-400">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Features -------------------------------- */
function Features() {
  const items = [
    { icon: HiOutlineLightningBolt, title: "AI Prediction", desc: "Machine learning models forecast disaster risk hours before it escalates." },
    { icon: HiOutlineBell, title: "Live Disaster Alerts", desc: "Push notifications reach affected citizens the instant a threat is verified." },
    { icon: HiOutlineExclamationCircle, title: "SOS", desc: "One-tap distress signal shares live location with the nearest response team." },
    { icon: HiOutlineLocationMarker, title: "Live Tracking", desc: "Track responders, volunteers, and resources on a single unified map." },
    { icon: HiOutlineHome, title: "Shelter Finder", desc: "Real-time capacity and directions to the nearest verified safe shelter." },
    { icon: HiOutlineUserGroup, title: "Volunteer Network", desc: "Coordinate trained volunteers and route them to where they're needed most." },
    { icon: HiOutlineClipboardList, title: "Emergency Resources", desc: "A living directory of medical, food, and rescue resources by zone." },
    { icon: FaBuildingShield, title: "Government Dashboard", desc: "Command-center view for authorities to verify, allocate, and act." },
    { icon: HiOutlineChartBar, title: "Analytics", desc: "Historical and live analytics to plan faster, smarter responses." },
  ];
  return (
    <section id="features" className="bg-[#F8FAFC] dark:bg-[#0F172A] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#2563EB]">
            CAPABILITIES
          </span>
          <h2 className="mt-3 font-[Sora] text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Everything a response team needs, in one mesh
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white dark:bg-[#1E293B] p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2563EB]/30 hover:shadow-xl hover:shadow-blue-900/5">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#2563EB]/0 blur-2xl transition-all duration-500 group-hover:bg-[#2563EB]/10" />
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#2563EB]/8 text-[#2563EB] transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-5 font-[Sora] text-[17px] font-semibold text-[#0F172A] dark:text-white">{f.title}</h3>
                <p className="mt-2 font-[Inter] text-[14px] leading-relaxed text-[#64748B] dark:text-[#94A3B8]">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- HowItWorks -------------------------------- */
function HowItWorks() {
  const steps = [
    { icon: HiOutlineExclamationCircle, title: "Report Incident", desc: "A citizen, sensor, or partner reports an incident in seconds." },
    { icon: HiOutlineLightningBolt, title: "AI Analysis", desc: "The model cross-references live data to assess severity and spread." },
    { icon: HiOutlineShieldCheck, title: "Authority Verification", desc: "Verified responders confirm the alert before it goes public." },
    { icon: HiOutlineClipboardList, title: "Resource Allocation", desc: "Shelters, medical teams, and volunteers are dispatched automatically." },
    { icon: HiOutlineBell, title: "Citizen Notification", desc: "Everyone in the affected zone is notified with clear next steps." },
  ];
  return (
    <section id="how-it-works" className="bg-white dark:bg-[#1E293B] py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#2563EB]">
            THE PIPELINE
          </span>
          <h2 className="mt-3 font-[Sora] text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">How It Works</h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-slate-200 sm:block" />
          <div className="flex flex-col gap-10">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative flex items-start gap-6 pl-0 sm:pl-0">
                  <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-white bg-[#2563EB] text-white shadow-lg shadow-blue-500/25">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1 rounded-2xl border border-slate-100 dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-6 transition-all duration-300 hover:border-[#2563EB]/20 hover:shadow-md">
                    <div className="flex items-center gap-2.5">
                      <span className="font-[JetBrains_Mono] text-[12px] font-medium text-[#94A3B8] dark:text-slate-500">
                        0{i + 1}
                      </span>
                      <h3 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">{s.title}</h3>
                    </div>
                    <p className="mt-2 font-[Inter] text-[14px] leading-relaxed text-[#64748B] dark:text-[#94A3B8]">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ DisasterTypes ------------------------------ */
function DisasterTypes() {
  const types = [
    { icon: WiFlood, title: "Flood", desc: "Water-level sensors and rainfall models predict flood zones in real time." },
    { icon: WiEarthquake, title: "Earthquake", desc: "Seismic activity detection with instant magnitude-based alerting." },
    { icon: WiFire, title: "Fire", desc: "Thermal imaging and wind-pattern analysis to track spread risk." },
    { icon: WiHurricane, title: "Cyclone", desc: "Satellite tracking of storm paths with early evacuation guidance." },
    { icon: WiSmoke, title: "Landslide", desc: "Soil-moisture and slope sensors flag unstable terrain before collapse." },
    { icon: WiThermometer, title: "Heatwave", desc: "Temperature forecasting to protect vulnerable populations in advance." },
  ];
  return (
    <section className="bg-[#F8FAFC] dark:bg-[#0F172A] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#DC2626]">
            THREAT COVERAGE
          </span>
          <h2 className="mt-3 font-[Sora] text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Built for every kind of disaster
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-56 overflow-hidden rounded-2xl bg-[#0F172A]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] to-[#0F172A] transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <t.icon className="h-9 w-9 text-white/80" />
                  <div>
                    <h3 className="font-[Sora] text-lg font-semibold text-white">{t.title}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden font-[Inter] text-[13px] leading-relaxed text-slate-300 opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-20 group-hover:opacity-100">
                      {t.desc}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#DC2626] transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- LiveMapPreview ----------------------------- */
function LiveMapPreview() {
  const pins = [
    { top: "30%", left: "20%", type: "danger" },
    { top: "55%", left: "45%", type: "safe" },
    { top: "25%", left: "70%", type: "danger" },
    { top: "70%", left: "65%", type: "safe" },
    { top: "45%", left: "82%", type: "danger" },
  ];
  return (
    <section className="bg-white dark:bg-[#1E293B] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#2563EB]">
            SITUATIONAL AWARENESS
          </span>
          <h2 className="mt-3 font-[Sora] text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            The whole mesh, on one map
          </h2>
        </Reveal>

        <Reveal>
          <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-[#334155] bg-[#0F172A] shadow-2xl shadow-blue-900/10">
            <MeshField density={40} className="opacity-30" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
            {pins.map((p, i) => (
              <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top: p.top, left: p.left }}
              >
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-white shadow-lg ${
                    p.type === "danger" ? "bg-[#DC2626]" : "bg-[#16A34A]"
                  }`}
                >
                  <FiMapPin className="h-3.5 w-3.5" />
                </span>
                <span
                  className={`absolute inset-0 -z-10 animate-ping rounded-full ${
                    p.type === "danger" ? "bg-[#DC2626]/50" : "bg-[#16A34A]/50"
                  }`}
                />
              </span>
            ))}
            <div className="absolute bottom-6 left-6 flex items-center gap-5 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-md">
              <span className="flex items-center gap-2 font-[Inter] text-[12.5px] text-white">
                <span className="h-2 w-2 rounded-full bg-[#DC2626]" /> Danger Zone
              </span>
              <span className="flex items-center gap-2 font-[Inter] text-[12.5px] text-white">
                <span className="h-2 w-2 rounded-full bg-[#16A34A]" /> Safe Zone
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ WhyGuardianMesh ----------------------------- */
function WhyGuardianMesh() {
  const benefits = [
    { icon: HiOutlineLightningBolt, title: "Minutes, not hours", desc: "Automated verification cuts response time dramatically." },
    { icon: HiOutlineShieldCheck, title: "Verified, not viral", desc: "Every alert is authority-checked before it reaches citizens." },
    { icon: HiOutlineUserGroup, title: "Built for coordination", desc: "One shared view for citizens, volunteers, and officials alike." },
  ];
  return (
    <section id="about" className="bg-[#F8FAFC] dark:bg-[#0F172A] py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <Reveal className="relative">
          <div className="relative mx-auto h-80 w-full max-w-md overflow-hidden rounded-3xl bg-[#0F172A] shadow-xl">
            <MeshField density={30} className="opacity-50" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-2xl bg-white/10 backdrop-blur-md">
                <HiOutlineShieldCheck className="h-10 w-10 text-white" />
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#2563EB]">
            WHY GUARDIANMESH
          </span>
          <h2 className="mt-3 font-[Sora] text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Intelligence that responders can trust
          </h2>
          <p className="mt-4 font-[Inter] text-[15.5px] leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
            GuardianMesh isn't another alert app — it's the coordination layer between
            sensors, AI, and the people who act on what they say.
          </p>

          <div className="mt-8 flex flex-col gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                  <b.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-[Sora] text-[15px] font-semibold text-[#0F172A] dark:text-white">{b.title}</h3>
                  <p className="mt-0.5 font-[Inter] text-[13.5px] text-[#64748B] dark:text-[#94A3B8]">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Testimonials ------------------------------ */
function Testimonials() {
  const quotes = [
    { name: "Dr. Anika Rao", role: "District Health Officer", text: "GuardianMesh cut our flood response time by more than half. The verification layer means we trust every alert." },
    { name: "Marcus Ilori", role: "Volunteer Coordinator", text: "Routing volunteers used to take a phone tree. Now it's automatic, and everyone knows exactly where to go." },
    { name: "Priya Nathan", role: "NGO Field Lead", text: "The shelter finder alone has changed how fast we can move displaced families to safety." },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % quotes.length), 5000);
    return () => clearInterval(id);
  }, [quotes.length]);

  return (
    <section className="bg-white dark:bg-[#1E293B] py-28">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#2563EB]">
            FROM THE FIELD
          </span>
          <h2 className="mt-3 font-[Sora] text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Trusted by the people on the ground
          </h2>
        </Reveal>

        <div className="relative mt-14 h-56">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-3xl border border-slate-100 dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] p-9"
            >
              <p className="font-[Inter] text-[16.5px] leading-relaxed text-[#334155] dark:text-slate-300">
                "{quotes[active].text}"
              </p>
              <p className="mt-6 font-[Sora] text-[14.5px] font-semibold text-[#0F172A] dark:text-white">
                {quotes[active].name}
              </p>
              <p className="font-[JetBrains_Mono] text-[12px] text-[#64748B] dark:text-[#94A3B8]">{quotes[active].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-[#2563EB]" : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ FAQ ----------------------------------- */
function FAQ() {
  const faqs = [
    { q: "How fast is a threat detected and verified?", a: "Most incidents are cross-checked and verified by authorities within minutes of the first sensor or citizen report." },
    { q: "Who can access the government dashboard?", a: "Access is restricted to verified officials and response agencies, each with role-based permissions." },
    { q: "Does GuardianMesh work without internet access?", a: "Core sensors cache data locally and sync automatically the moment connectivity returns." },
    { q: "How do volunteers get matched to incidents?", a: "The AI matches volunteer skills and proximity to active incidents, then sends a direct dispatch." },
  ];
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#F8FAFC] dark:bg-[#0F172A] py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal className="mb-14 text-center">
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#2563EB]">
            QUESTIONS
          </span>
          <h2 className="mt-3 font-[Sora] text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-[#334155] bg-white dark:bg-[#1E293B]">
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-[Sora] text-[15px] font-medium text-[#0F172A] dark:text-white">{f.q}</span>
                  <FiChevronDown
                    className={`h-4.5 w-4.5 shrink-0 text-[#64748B] dark:text-[#94A3B8] transition-transform duration-300 ${
                      open === i ? "rotate-180 text-[#2563EB]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-5 font-[Inter] text-[14px] leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ CTA ------------------------------------ */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#2563EB]/25 via-transparent to-[#DC2626]/10" />
      <MeshField density={20} className="opacity-20" />
      <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-[Sora] text-3xl font-bold text-white sm:text-4xl">
          Your community deserves a warning system this fast
        </h2>
        <p className="mt-4 font-[Inter] text-[15.5px] text-slate-300">
          Join the network of citizens, volunteers, and agencies already protected by GuardianMesh.
        </p>
        <Link
          to="/signup"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white dark:bg-[#1E293B] px-8 py-3.5 font-[Inter] text-[15px] font-semibold text-[#0F172A] dark:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          Join Now
          <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}

/* ----------------------------------- Footer ----------------------------------- */
function Footer() {
  return (
    <footer id="contact" className="bg-[#0B1120] pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#2563EB]">
                <HiOutlineShieldCheck className="h-4.5 w-4.5 text-white" />
              </span>
              <span className="font-[Sora] text-[17px] font-semibold text-white">
                Guardian<span className="text-[#60A5FA]">Mesh</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs font-[Inter] text-[13.5px] leading-relaxed text-slate-400">
              AI-powered disaster intelligence connecting citizens, volunteers, and
              authorities in one live response mesh.
            </p>
          </div>

          {[
            { title: "Quick Links", items: ["Home", "Features", "How It Works", "About"] },
            { title: "Resources", items: ["Documentation", "API", "Volunteer Guide", "Status"] },
            { title: "Emergency Contacts", items: ["National Helpline", "Disaster Control Room", "Nearest Shelter"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-[Sora] text-[13.5px] font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="font-[Inter] text-[13.5px] text-slate-400 transition-colors hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[JetBrains_Mono] text-[12px] text-slate-500">
            © {new Date().getFullYear()} GuardianMesh AI. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Twitter", "LinkedIn", "GitHub"].map((s) => (
              <a key={s} href="#" className="font-[Inter] text-[12.5px] text-slate-400 transition-colors hover:text-white">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------ Page ------------------------------------ */
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] font-[Inter]">
      <Navbar />
      <Hero />
      <TrustedBy />
      <LiveStats />
      <Features />
      <HowItWorks />
      <DisasterTypes />
      <LiveMapPreview />
      <WhyGuardianMesh />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
