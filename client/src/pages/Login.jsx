import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiMail, FiLock } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

/* Reuses the same "mesh field" signature visual as Landing.jsx for a          */
/* consistent brand identity across the auth flow.                            */
function MeshField({ density = 26, className = "" }) {
  const nodes = Array.from({ length: density }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 6,
  }));

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
              stroke="#60A5FA"
              strokeWidth="0.08"
              strokeOpacity="0.3"
            />
          );
        })
      )}
      {nodes.map((n) => (
        <circle key={n.id} cx={n.x} cy={n.y} r="0.35" fill="#60A5FA" fillOpacity="0.6">
          <animate attributeName="r" values="0.35;0.9;0.35" dur="3.5s" begin={`${n.delay}s`} repeatCount="indefinite" />
          <animate attributeName="fill-opacity" values="0.5;1;0.5" dur="3.5s" begin={`${n.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: replace with a real API call. For now this simulates a
    // successful login so ProtectedRoute lets the user through.
    localStorage.setItem("guardianmesh_token", "demo-token");

    const redirectTo = location.state?.from?.pathname || "/dashboard";
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left — brand / mesh panel */}
      <div className="relative hidden overflow-hidden bg-[#0F172A] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#DC2626]/10 blur-[110px]" />
        <MeshField density={30} className="opacity-40" />

        <Link to="/" className="relative z-10 flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#2563EB]">
            <HiOutlineShieldCheck className="h-5 w-5 text-white" />
          </span>
          <span className="font-[Sora] text-lg font-semibold text-white">
            Guardian<span className="text-[#60A5FA]">Mesh</span>
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-md"
        >
          <span className="font-[JetBrains_Mono] text-[12px] font-medium tracking-wider text-[#60A5FA]">
            WELCOME BACK
          </span>
          <h1 className="mt-3 font-[Sora] text-4xl font-bold leading-tight text-white">
            Every second matters. Sign back in to the mesh.
          </h1>
          <p className="mt-4 font-[Inter] text-[14.5px] leading-relaxed text-slate-400">
            Live alerts, shelter status, and your response network — right where you left them.
          </p>
        </motion.div>

        <p className="relative z-10 font-[JetBrains_Mono] text-[11px] text-slate-500">
          © {new Date().getFullYear()} GuardianMesh AI
        </p>
      </div>

      {/* right — form */}
      <div className="flex items-center justify-center bg-[#F8FAFC] px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/80 p-9 shadow-xl shadow-slate-900/5 backdrop-blur-xl"
        >
          <Link
            to="/"
            className="mb-6 flex items-center gap-1.5 font-[Inter] text-[13px] font-medium text-[#64748B] transition-colors hover:text-[#0F172A] lg:hidden"
          >
            <FiArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>

          <h2 className="font-[Sora] text-2xl font-bold text-[#0F172A]">Log in to your account</h2>
          <p className="mt-1.5 font-[Inter] text-[14px] text-[#64748B]">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-[#2563EB] hover:underline">
              Sign up
            </Link>
          </p>

          <button
            type="button"
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 font-[Inter] text-[14px] font-medium text-[#334155] transition-all duration-300 hover:border-slate-400 hover:shadow-sm"
          >
            <FcGoogle className="h-4.5 w-4.5" />
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="font-[JetBrains_Mono] text-[11px] text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div>
              <label htmlFor="email" className="font-[Inter] text-[13px] font-medium text-[#334155]">
                Email address
              </label>
              <div className="relative mt-1.5">
                <FiMail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 font-[Inter] text-[14px] text-[#0F172A] outline-none transition-all duration-300 placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 ${
                    errors.email ? "border-[#DC2626]" : "border-slate-300"
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1.5 font-[Inter] text-[12.5px] text-[#DC2626]">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="font-[Inter] text-[13px] font-medium text-[#334155]">
                  Password
                </label>
                <a href="#" className="font-[Inter] text-[12.5px] font-medium text-[#2563EB] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative mt-1.5">
                <FiLock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-11 font-[Inter] text-[14px] text-[#0F172A] outline-none transition-all duration-300 placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 ${
                    errors.password ? "border-[#DC2626]" : "border-slate-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] transition-colors hover:text-[#334155]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 font-[Inter] text-[12.5px] text-[#DC2626]">{errors.password}</p>}
            </div>

            <label className="flex select-none items-center gap-2.5">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]/30"
              />
              <span className="font-[Inter] text-[13px] text-[#334155]">Remember me</span>
            </label>

            <button
              type="submit"
              className="group mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 font-[Inter] text-[14.5px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Log in
              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
