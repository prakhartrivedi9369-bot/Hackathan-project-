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
  HiOutlineSparkles,
  HiOutlineGlobe,
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
import GuardianMap from "../components/Map/GuardianMap";

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
const DISASTER_IMAGES = {
  Flood:
    "https://images.unsplash.com/photo-1534862262637-373c120dcbcc?auto=format&fit=crop&w=1000&q=80",
  Earthquake:
    "https://images.unsplash.com/photo-1564662655264-f818dde0c6cf?auto=format&fit=crop&w=1000&q=80",
  Fire:
    "https://images.unsplash.com/photo-1615092296061-e2ccfeb2f3d6?auto=format&fit=crop&w=1000&q=80",
  Cyclone:
    "https://images.unsplash.com/photo-1457327289196-f38b88d97147?auto=format&fit=crop&w=1000&q=80",
  Landslide:
    "https://images.unsplash.com/photo-1728723313529-3a137b061b52?auto=format&fit=crop&w=1000&q=80",
  Heatwave:
    "https://images.unsplash.com/photo-1752419258297-f769e1a878ce?auto=format&fit=crop&w=1000&q=80",
};

function DisasterTypes() {
  const types = [
    {
      icon: WiFlood,
      title: "Flood",
      tag: "Water-level intelligence",
      desc: "GuardianMesh fuses sensor and rainfall data to flag rising flood zones and reroute residents before roads go under.",
    },
    {
      icon: WiEarthquake,
      title: "Earthquake",
      tag: "Seismic response",
      desc: "The mesh detects tremors in seconds and pushes magnitude-based alerts to citizens and responders instantly.",
    },
    {
      icon: WiFire,
      title: "Fire",
      tag: "Thermal + spread tracking",
      desc: "Thermal imaging and live wind data let GuardianMesh predict fire spread and guide safe evacuation routes.",
    },
    {
      icon: WiHurricane,
      title: "Cyclone",
      tag: "Storm path tracking",
      desc: "Satellite-linked tracking gives communities early, precise warning as a storm's path is projected and refined.",
    },
    {
      icon: WiSmoke,
      title: "Landslide",
      tag: "Slope stability sensing",
      desc: "Soil-moisture and slope sensors let GuardianMesh flag unstable terrain and warn residents before it gives way.",
    },
    {
      icon: WiThermometer,
      title: "Heatwave",
      tag: "Thermal forecasting",
      desc: "Forecast-driven alerts help GuardianMesh protect vulnerable populations before extreme heat ever arrives.",
    },
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {types.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 0.08}>
              <div
                className="group relative h-72 overflow-hidden rounded-3xl shadow-lg shadow-slate-900/5 ring-1 ring-slate-900/5 transition-all duration-500 ease-out will-change-transform hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#2563EB]/20 hover:ring-[#2563EB]/30 dark:shadow-black/30 dark:ring-white/5"
              >
                {/* Background photo */}
                <div
                  className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.15]"
                  style={{ backgroundImage: `url(${DISASTER_IMAGES[t.title]})` }}
                  role="img"
                  aria-label={`${t.title} background`}
                />

                {/* Dark gradient overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-[#0F172A]/10 transition-opacity duration-500 group-hover:from-[#0F172A]/95" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/0 via-transparent to-[#DC2626]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-[#2563EB]/15 group-hover:to-[#DC2626]/10" />

                {/* Soft outer glow ring on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 shadow-[0_0_0_1px_rgba(37,99,235,0.35),0_0_40px_8px_rgba(37,99,235,0.15)] transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur-sm transition-all duration-500 group-hover:bg-[#2563EB] group-hover:ring-[#2563EB]/50">
                      <t.icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 font-[JetBrains_Mono] text-[10px] font-medium tracking-wider text-white/80 backdrop-blur-sm">
                      {t.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-[Sora] text-xl font-semibold text-white">
                      {t.title}
                    </h3>
                    <p className="mt-2 font-[Inter] text-[13.5px] leading-relaxed text-slate-200/90 opacity-90 transition-all duration-500 group-hover:opacity-100">
                      {t.desc}
                    </p>
                    <div className="mt-4 h-[2px] w-10 origin-left scale-x-100 bg-gradient-to-r from-[#2563EB] to-[#DC2626] transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- LiveMapPreview ----------------------------- */
// Sample mesh data for the landing-page preview. On the real dashboards this
// same shape of data comes from the incidents/resources APIs instead of a
// hardcoded array — the GuardianMap component itself doesn't change either way.
const PREVIEW_SAFE_ZONES = [
  { id: "safe-1", position: [28.6304, 77.2177], label: "Riverside Community Hall", description: "Shelter · Zone 4" },
  { id: "safe-2", position: [28.6139, 77.2295], label: "Hillcrest Public School", description: "Shelter · Zone 2" },
  { id: "safe-3", position: [28.5988, 77.1934], label: "Central Supply Depot", description: "Supplies · Zone 9" },
];

const PREVIEW_DANGER_ZONES = [
  { id: "danger-1", position: [28.6448, 77.2167], label: "Flood Risk — Zone 4", description: "Rising water levels, evacuation advised" },
  { id: "danger-2", position: [28.6023, 77.2412], label: "Fire — Industrial Park", description: "Zone 7, active response underway" },
  { id: "danger-3", position: [28.5921, 77.2100], label: "Landslide — Hillcrest", description: "Zone 2, road access blocked" },
];

// src/pages/Landing.jsx - LiveMapPreview component replacement

function LiveMapPreview() {
  const stats = [
    { label: "Safe Zones", value: "12", color: "#16A34A" },
    { label: "Danger Zones", value: "8", color: "#DC2626" },
    { label: "Active Alerts", value: "24", color: "#F59E0B" },
    { label: "Live Responders", value: "156", color: "#2563EB" },
  ];

  const badges = [
    { label: "AI Monitoring", color: "#2563EB" },
    { label: "Live Tracking", color: "#16A34A" },
    { label: "Real-time Alerts", color: "#DC2626" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC] to-[#EFF6FF] dark:from-[#0F172A] dark:via-[#0F172A] dark:to-[#1E293B] py-28">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 bg-[#2563EB]/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] bg-[#60A5FA]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#2563EB]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            SITUATIONAL AWARENESS
          </span>
          <h2 className="mt-4 font-[Sora] text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            The whole mesh, on one map
          </h2>
          <p className="mt-3 font-[Inter] text-[15px] leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
            Real-time intelligence across every zone — incidents, resources, and responders at a glance
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Map Container - spans 3 columns */}
          <div className="relative lg:col-span-3">
            {/* Floating badges */}
            <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium text-white shadow-lg ring-1 ring-white/10"
                >
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: badge.color }} />
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Map with glassmorphism */}
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl shadow-[#2563EB]/20 backdrop-blur-sm dark:border-[#334155]/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#2563EB]/20 via-[#60A5FA]/10 to-[#2563EB]/20 blur-2xl" />
              <div className="relative">
                <GuardianMap
                  height="480px"
                  className="rounded-3xl"
                  center={[28.6139, 77.209]}
                  zoom={11}
                  userLocation={{ position: [28.6139, 77.209], label: "You" }}
                  safeZones={PREVIEW_SAFE_ZONES}
                  dangerZones={PREVIEW_DANGER_ZONES}
                  scrollWheelZoom={true}
                />
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-[#334155]/70 dark:bg-[#1E293B]/80">
              <h3 className="font-[Sora] text-sm font-semibold text-[#0F172A] dark:text-white">Live Status</h3>
              <div className="mt-4 flex flex-col gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between border-b border-slate-100 dark:border-[#334155] pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: stat.color }} />
                      <span className="font-[Inter] text-[13px] text-[#64748B] dark:text-[#94A3B8]">{stat.label}</span>
                    </div>
                    <span className="font-[JetBrains_Mono] text-[16px] font-bold text-[#0F172A] dark:text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/70 bg-[#2563EB]/5 p-5 shadow-xl shadow-slate-900/5 backdrop-blur-xl dark:border-[#334155]/70 dark:bg-[#2563EB]/10">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#2563EB] text-white">
                  <HiOutlineSparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-[Sora] text-[14px] font-semibold text-[#0F172A] dark:text-white">AI-Powered Analysis</p>
                  <p className="font-[Inter] text-[12px] text-[#64748B] dark:text-[#94A3B8]">Predicting threats in real-time</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-[#334155]">
                  <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-[#2563EB] to-[#60A5FA]" />
                </div>
                <span className="font-[JetBrains_Mono] text-[12px] font-medium text-[#2563EB]">94%</span>
              </div>
              <p className="mt-1.5 font-[Inter] text-[11px] text-[#64748B] dark:text-[#94A3B8]">Confidence in current predictions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ------------------------------ WhyGuardianMesh ----------------------------- */
// src/pages/Landing.jsx - WhyGuardianMesh component replacement

function WhyGuardianMesh() {
  const benefits = [
    { icon: HiOutlineLightningBolt, title: "Minutes, not hours", desc: "Automated verification cuts response time dramatically." },
    { icon: HiOutlineShieldCheck, title: "Verified, not viral", desc: "Every alert is authority-checked before it reaches citizens." },
    { icon: HiOutlineUserGroup, title: "Built for coordination", desc: "One shared view for citizens, volunteers, and officials alike." },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A] py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 bg-[#2563EB]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] bg-[#60A5FA]/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Left - Animated Network Visualization */}
        <Reveal className="relative">
          <div className="relative mx-auto h-[420px] w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] shadow-2xl shadow-[#2563EB]/20 ring-1 ring-[#2563EB]/20">
            {/* Animated particles network */}
            <MeshField density={35} className="opacity-60" />
            
            {/* Central shield glow */}
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/20 blur-3xl animate-pulse" />
            
            {/* Central shield icon */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-[#2563EB]/30" />
                <span className="relative grid h-24 w-24 place-items-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#60A5FA] shadow-lg shadow-[#2563EB]/50">
                  <HiOutlineShieldCheck className="h-12 w-12 text-white" />
                </span>
              </div>
            </div>

            {/* Orbiting nodes */}
            {[
              { angle: 0, delay: 0, color: "#60A5FA", icon: "◆" },
              { angle: 72, delay: 0.2, color: "#34D399", icon: "●" },
              { angle: 144, delay: 0.4, color: "#F59E0B", icon: "▲" },
              { angle: 216, delay: 0.6, color: "#F472B6", icon: "■" },
              { angle: 288, delay: 0.8, color: "#A78BFA", icon: "★" },
            ].map((node, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                  delay: node.delay,
                }}
                style={{ transformOrigin: "0 0" }}
              >
                <span
                  className="absolute font-mono text-sm font-bold"
                  style={{
                    color: node.color,
                    transform: `translate(-50%, -50%) rotate(${-360 * (i / 5)}deg)`,
                    marginLeft: "100px",
                  }}
                >
                  {node.icon}
                </span>
              </motion.div>
            ))}

            {/* Pulsing connection rings */}
            <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2563EB]/20" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2563EB]/10" />
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2563EB]/5" />

            {/* Pulse rings */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2563EB]/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2563EB]/20"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            {/* Status badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-md px-5 py-2.5 ring-1 ring-white/10">
              <span className="flex items-center gap-2 font-[JetBrains_Mono] text-[11px] font-medium text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                AI Network · 3,214 Sensors Online
              </span>
            </div>
          </div>
        </Reveal>

        {/* Right - Content */}
        <Reveal delay={0.1}>
          <div className="space-y-6">
            <div>
              <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#2563EB]">
                WHY GUARDIANMESH
              </span>
              <h2 className="mt-3 font-[Sora] text-4xl font-bold text-[#0F172A] dark:text-white lg:text-5xl">
                Intelligence that responders can trust
              </h2>
            </div>
            <p className="font-[Inter] text-[16px] leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
              GuardianMesh isn't another alert app — it's the coordination layer between
              sensors, AI, and the people who act on what they say.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-5 rounded-2xl border border-slate-200/70 bg-white/50 p-5 transition-all duration-300 hover:border-[#2563EB]/30 hover:bg-white/80 hover:shadow-lg hover:shadow-[#2563EB]/10 dark:border-[#334155]/70 dark:bg-[#1E293B]/50 dark:hover:border-[#2563EB]/30 dark:hover:bg-[#1E293B]/80"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#2563EB] group-hover:text-white">
                    <b.icon className="h-5.5 w-5.5" />
                  </span>
                  <div>
                    <h3 className="font-[Sora] text-[16px] font-semibold text-[#0F172A] dark:text-white">{b.title}</h3>
                    <p className="mt-0.5 font-[Inter] text-[14px] text-[#64748B] dark:text-[#94A3B8]">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- Testimonials ------------------------------ */
// src/pages/Landing.jsx - Testimonials component replacement

function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Anika Rao",
      role: "District Health Officer",
      organization: "Government of Delhi",
      image: "https://ui-avatars.com/api/?name=Anika+Rao&background=2563EB&color=fff&size=64&font-size=0.5",
      rating: 5,
      text: "GuardianMesh cut our flood response time by more than half. The verification layer means we trust every alert that comes through.",
      verified: true,
      badge: "Emergency Responder",
    },
    {
      name: "Marcus Ilori",
      role: "Volunteer Coordinator",
      organization: "Citizen Volunteers Network",
      image: "https://ui-avatars.com/api/?name=Marcus+Ilori&background=DC2626&color=fff&size=64&font-size=0.5",
      rating: 5,
      text: "Routing volunteers used to take a phone tree. Now it's automatic, and everyone knows exactly where to go. It's transformed our response.",
      verified: true,
      badge: "NDRF Volunteer",
    },
    {
      name: "Priya Nathan",
      role: "Field Lead",
      organization: "HopeWorks NGO",
      image: "https://ui-avatars.com/api/?name=Priya+Nathan&background=16A34A&color=fff&size=64&font-size=0.5",
      rating: 5,
      text: "The shelter finder alone has changed how fast we can move displaced families to safety. It's the tool we didn't know we needed.",
      verified: true,
      badge: "Disaster Management",
    },
    {
      name: "Vikram Singh",
      role: "Rescue Operations",
      organization: "Fire & Rescue Services",
      image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=F59E0B&color=fff&size=64&font-size=0.5",
      rating: 5,
      text: "Real-time data on the map means we can coordinate multiple teams simultaneously. GuardianMesh is our command center now.",
      verified: true,
      badge: "Fire Department",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#1E293B] py-28">
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 bg-[#2563EB]/5 blur-[130px]" />
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#2563EB]">
            FROM THE FIELD
          </span>
          <h2 className="mt-3 font-[Sora] text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Trusted by the people on the ground
          </h2>
          <p className="mt-3 font-[Inter] text-[15px] text-[#64748B] dark:text-[#94A3B8]">
            Real stories from real responders who rely on GuardianMesh every day
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <motion.div
                className="group relative h-full rounded-3xl border border-slate-200/70 bg-white/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB]/30 hover:shadow-2xl hover:shadow-[#2563EB]/10 dark:border-[#334155]/70 dark:bg-[#1E293B]/80 dark:hover:border-[#2563EB]/30 dark:hover:shadow-[#2563EB]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Badge */}
                <div className="absolute -right-2 -top-2 rounded-full bg-[#2563EB] px-3 py-1 text-[10px] font-medium text-white shadow-lg shadow-[#2563EB]/30">
                  {t.badge}
                </div>

                {/* Header */}
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-14 w-14 rounded-2xl object-cover ring-2 ring-[#2563EB]/20 transition-all duration-300 group-hover:ring-[#2563EB]/40"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-[Sora] text-[15px] font-semibold text-[#0F172A] dark:text-white truncate">
                      {t.name}
                    </p>
                    <p className="font-[Inter] text-[12px] text-[#64748B] dark:text-[#94A3B8] truncate">
                      {t.role}
                    </p>
                    <p className="font-[Inter] text-[11px] text-[#2563EB] truncate">
                      {t.organization}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#F59E0B] text-sm">
                      ★
                    </span>
                  ))}
                  <span className="ml-1 font-[JetBrains_Mono] text-[11px] text-[#94A3B8]">5.0</span>
                </div>

                {/* Testimonial text */}
                <p className="mt-3 font-[Inter] text-[13.5px] leading-relaxed text-[#64748B] dark:text-[#94A3B8] line-clamp-4">
                  "{t.text}"
                </p>

                {/* Verified badge */}
                <div className="mt-4 flex items-center gap-2 border-t border-slate-100 dark:border-[#334155] pt-4">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#16A34A]/10 text-[#16A34A]">
                    <HiOutlineShieldCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-[Inter] text-[11px] font-medium text-[#16A34A]">Verified Responder</span>
                </div>

                {/* Decorative gradient line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-b-3xl bg-gradient-to-r from-[#2563EB] to-[#60A5FA] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ FAQ ----------------------------------- */
// src/pages/Landing.jsx - FAQ component replacement

function FAQ() {
  const faqs = [
    { 
      q: "How fast is a threat detected and verified?", 
      a: "Most incidents are cross-checked and verified by authorities within minutes of the first sensor or citizen report. The AI continuously monitors data streams and flags anomalies in real-time.",
      icon: HiOutlineLightningBolt,
    },
    { 
      q: "Who can access the government dashboard?", 
      a: "Access is restricted to verified officials and response agencies, each with role-based permissions. This ensures sensitive information stays secure while enabling seamless coordination.",
      icon: HiOutlineShieldCheck,
    },
    { 
      q: "Does GuardianMesh work without internet access?", 
      a: "Core sensors cache data locally and sync automatically the moment connectivity returns. Critical alerts are also delivered via SMS to ensure no one is left uninformed.",
      icon: HiOutlineGlobe,
    },
    { 
      q: "How do volunteers get matched to incidents?", 
      a: "The AI matches volunteer skills and proximity to active incidents, then sends a direct dispatch. This ensures the right person with the right skills arrives at the right time.",
      icon: HiOutlineUserGroup,
    },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A] py-28">
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 bg-[#2563EB]/5 blur-[130px]" />
      
      <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal className="mb-16 text-center">
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#2563EB]">
            QUESTIONS
          </span>
          <h2 className="mt-3 font-[Sora] text-3xl font-bold text-[#0F172A] dark:text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 font-[Inter] text-[15px] text-[#64748B] dark:text-[#94A3B8]">
            Everything you need to know about GuardianMesh
          </p>
        </Reveal>

        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const Icon = f.icon;
            
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <motion.div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-[#2563EB]/30 bg-white/80 shadow-xl shadow-[#2563EB]/10 dark:bg-[#1E293B]/80 dark:shadow-[#2563EB]/20"
                      : "border-slate-200/70 bg-white/50 hover:border-[#2563EB]/20 hover:bg-white/80 dark:border-[#334155]/70 dark:bg-[#1E293B]/50 dark:hover:border-[#2563EB]/20 dark:hover:bg-[#1E293B]/70"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all duration-300 ${
                      isOpen
                        ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30"
                        : "bg-[#2563EB]/10 text-[#2563EB]"
                    }`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1 font-[Sora] text-[15px] font-medium text-[#0F172A] dark:text-white">
                      {f.q}
                    </span>
                    <FiChevronDown
                      className={`h-5 w-5 shrink-0 text-[#64748B] transition-all duration-300 ${
                        isOpen ? "rotate-180 text-[#2563EB]" : ""
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="h-px w-full bg-gradient-to-r from-[#2563EB]/20 to-transparent" />
                          <p className="mt-4 font-[Inter] text-[14px] leading-relaxed text-[#64748B] dark:text-[#94A3B8]">
                            {f.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-3xl border border-[#2563EB]/20 bg-gradient-to-r from-[#2563EB]/5 to-[#60A5FA]/5 p-8 text-center">
          <p className="font-[Inter] text-[15px] text-[#64748B] dark:text-[#94A3B8]">
            Still have questions? We're here to help.
          </p>
          <a
            href="#contact"
            className="mt-3 inline-flex items-center gap-2 font-[Inter] text-[14px] font-medium text-[#2563EB] hover:underline"
          >
            Contact our team
            <FiArrowRight className="h-4 w-4" />
          </a>
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
