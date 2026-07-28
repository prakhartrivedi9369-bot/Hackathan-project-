import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff, FiArrowRight, FiArrowLeft, FiMail, FiLock, FiUser, FiPhone, FiCheck } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { FaUser, FaHandHoldingHeart, FaHandsHolding, FaBuildingShield } from "react-icons/fa6";

/* Same signature mesh visual as Landing.jsx / Login.jsx for brand continuity. */
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

const ROLES = [
  { id: "citizen", label: "Citizen", icon: FaUser },
  { id: "volunteer", label: "Volunteer", icon: FaHandHoldingHeart },
  { id: "ngo", label: "NGO", icon: FaHandsHolding },
  { id: "government", label: "Government Official", icon: FaBuildingShield },
];

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "citizen",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (form.fullName.trim().length < 2) next.fullName = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone)) next.phone = "Enter a valid phone number";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: replace with a real API call. For now this simulates a
    // successful registration so ProtectedRoute lets the user through.
    localStorage.setItem("guardianmesh_token", "demo-token");
    navigate("/dashboard", { replace: true });
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white py-3 pl-11 pr-4 font-[Inter] text-[14px] text-[#0F172A] outline-none transition-all duration-300 placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10 ${
      errors[field] ? "border-[#DC2626]" : "border-slate-300"
    }`;

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* left — brand / mesh panel */}
      <div className="relative hidden overflow-hidden bg-[#0F172A] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#16A34A]/10 blur-[110px]" />
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
            JOIN THE MESH
          </span>
          <h1 className="mt-3 font-[Sora] text-4xl font-bold leading-tight text-white">
            Become a node in a network built to save lives.
          </h1>
          <p className="mt-4 font-[Inter] text-[14.5px] leading-relaxed text-slate-400">
            Citizens, volunteers, NGOs, and agencies — one account, one shared response layer.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {["Real-time verified alerts", "One-tap SOS and shelter routing", "Coordinated volunteer dispatch"].map((f) => (
              <div key={f} className="flex items-center gap-2.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#2563EB]/20 text-[#60A5FA]">
                  <FiCheck className="h-3 w-3" />
                </span>
                <span className="font-[Inter] text-[13.5px] text-slate-300">{f}</span>
              </div>
            ))}
          </div>
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

          <h2 className="font-[Sora] text-2xl font-bold text-[#0F172A]">Create your account</h2>
          <p className="mt-1.5 font-[Inter] text-[14px] text-[#64748B]">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-[#2563EB] hover:underline">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5" noValidate>
            <div>
              <label htmlFor="fullName" className="font-[Inter] text-[13px] font-medium text-[#334155]">
                Full name
              </label>
              <div className="relative mt-1.5">
                <FiUser className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Jordan Rivera"
                  className={inputClass("fullName")}
                />
              </div>
              {errors.fullName && <p className="mt-1.5 font-[Inter] text-[12.5px] text-[#DC2626]">{errors.fullName}</p>}
            </div>

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
                  className={inputClass("email")}
                />
              </div>
              {errors.email && <p className="mt-1.5 font-[Inter] text-[12.5px] text-[#DC2626]">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="font-[Inter] text-[13px] font-medium text-[#334155]">
                Phone number
              </label>
              <div className="relative mt-1.5">
                <FiPhone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 555 000 1234"
                  className={inputClass("phone")}
                />
              </div>
              {errors.phone && <p className="mt-1.5 font-[Inter] text-[12.5px] text-[#DC2626]">{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="font-[Inter] text-[13px] font-medium text-[#334155]">
                  Password
                </label>
                <div className="relative mt-1.5">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`${inputClass("password")} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] transition-colors hover:text-[#334155]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 font-[Inter] text-[12px] text-[#DC2626]">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="font-[Inter] text-[13px] font-medium text-[#334155]">
                  Confirm
                </label>
                <div className="relative mt-1.5">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`${inputClass("confirmPassword")} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] transition-colors hover:text-[#334155]"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 font-[Inter] text-[12px] text-[#DC2626]">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <span className="font-[Inter] text-[13px] font-medium text-[#334155]">I am joining as a</span>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, role: r.id }))}
                    className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all duration-300 ${
                      form.role === r.id
                        ? "border-[#2563EB] bg-[#2563EB]/5 shadow-sm"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                  >
                    <r.icon
                      className={`h-4 w-4 shrink-0 ${form.role === r.id ? "text-[#2563EB]" : "text-[#94A3B8]"}`}
                    />
                    <span
                      className={`font-[Inter] text-[13px] font-medium ${
                        form.role === r.id ? "text-[#0F172A]" : "text-[#334155]"
                      }`}
                    >
                      {r.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="group mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 font-[Inter] text-[14.5px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Create account
              <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p className="text-center font-[Inter] text-[12px] leading-relaxed text-[#94A3B8]">
              By creating an account, you agree to GuardianMesh's Terms of Service and Privacy Policy.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
