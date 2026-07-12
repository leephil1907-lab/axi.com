import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ChevronRight, User, Mail, Globe, Lock } from "lucide-react";

const accountTypes = [
  { value: "standard", label: "Standard Account", desc: "Spreads from 0.6 pips. No commission. Best for beginners." },
  { value: "pro", label: "Pro Account", desc: "Raw spreads from 0.0 pips + $7/lot commission. For active traders." },
];

const countries = [
  "United Kingdom", "Australia", "Germany", "France", "Netherlands",
  "Singapore", "Canada", "United Arab Emirates", "South Africa", "New Zealand",
  "Switzerland", "Spain", "Italy", "Sweden", "Norway", "Ireland", "Austria",
];

export default function OpenAccountPage() {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("standard");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!country) e.country = "Please select your country of residence.";
    if (!firstName.trim()) e.firstName = "First name is required.";
    if (!lastName.trim()) e.lastName = "Last name is required.";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Please enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!agreed) e.terms = "You must agree to the terms and conditions.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4" style={{ backgroundColor: "#EDE8E0" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[480px] text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#22A958" }}>
            <Check size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>Welcome to Axi!</h2>
          <p className="mt-3 text-base" style={{ color: "#6B6560" }}>
            Your account has been created successfully. Check your email to verify your account and start trading.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link to="/login" className="btn-yellow text-center">GO TO LOGIN</Link>
            <Link to="/" className="text-sm hover:underline" style={{ color: "#D31C2B" }}>Return to homepage</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4" style={{ backgroundColor: "#EDE8E0" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[520px]">
        <div className="text-center mb-8">
          <svg width="80" height="28" viewBox="0 0 80 28" fill="none" className="mx-auto mb-4">
            <text x="0" y="22" fill="#D31C2B" fontSize="26" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="-0.5">axi</text>
          </svg>
          <h1 className="text-2xl font-bold" style={{ color: "#1A1A1A" }}>Open Your Account</h1>
          <p className="mt-1 text-sm" style={{ color: "#6B6560" }}>Start trading in minutes. No minimum deposit required.</p>
        </div>

        <div className="p-8 rounded-lg" style={{ backgroundColor: "#fff", border: "1px solid #D9D3CB" }}>
          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-[#D31C2B] text-white" : "bg-[#F5F2ED] text-[#9B9590]"}`}>1</div>
            <div className={`w-16 h-0.5 ${step >= 2 ? "bg-[#D31C2B]" : "bg-[#D9D3CB]"}`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-[#D31C2B] text-white" : "bg-[#F5F2ED] text-[#9B9590]"}`}>2</div>
          </div>

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#6B6560" }}>
                  <Globe size={14} /> Country of Residence *
                </label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#D31C2B]/30"
                  style={{ borderColor: "#D9D3CB" }}
                >
                  <option value="">Select country...</option>
                  {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.country && <p className="text-xs mt-1" style={{ color: "#D31C2B" }}>{errors.country}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#6B6560" }}>
                    <User size={14} /> First Name *
                  </label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John"
                    className="w-full px-4 py-3 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#D31C2B]/30" style={{ borderColor: "#D9D3CB" }} />
                  {errors.firstName && <p className="text-xs mt-1" style={{ color: "#D31C2B" }}>{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#6B6560" }}>Last Name *</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith"
                    className="w-full px-4 py-3 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#D31C2B]/30" style={{ borderColor: "#D9D3CB" }} />
                  {errors.lastName && <p className="text-xs mt-1" style={{ color: "#D31C2B" }}>{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#6B6560" }}>
                  <Mail size={14} /> Email Address *
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john.smith@example.com"
                  className="w-full px-4 py-3 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#D31C2B]/30" style={{ borderColor: "#D9D3CB" }} />
                {errors.email && <p className="text-xs mt-1" style={{ color: "#D31C2B" }}>{errors.email}</p>}
              </div>

              <button onClick={() => validateStep1() && setStep(2)}
                className="w-full py-3 rounded text-[11px] font-semibold uppercase tracking-[1.5px] text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: "#D31C2B" }}
              >
                Continue <ChevronRight size={14} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#6B6560" }}>Select Account Type</h3>
              <div className="space-y-3">
                {accountTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setAccountType(type.value)}
                    className={`w-full p-4 rounded border text-left transition-all ${
                      accountType === type.value
                        ? "border-[#D31C2B] bg-[#D31C2B]/5"
                        : "border-[#D9D3CB] bg-white hover:border-[#9B9590]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm" style={{ color: "#1A1A1A" }}>{type.label}</span>
                      {accountType === type.value && <div className="w-4 h-4 rounded-full bg-[#D31C2B]" />}
                    </div>
                    <p className="text-sm mt-1" style={{ color: "#6B6560" }}>{type.desc}</p>
                  </button>
                ))}
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#6B6560" }}>
                  <Lock size={14} /> Create Password *
                </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#D31C2B]/30" style={{ borderColor: "#D9D3CB" }} />
                {errors.password && <p className="text-xs mt-1" style={{ color: "#D31C2B" }}>{errors.password}</p>}
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
                <span className="text-xs leading-relaxed" style={{ color: "#6B6560" }}>
                  I agree to the <a href="#" className="underline" style={{ color: "#D31C2B" }}>Terms & Conditions</a> and <a href="#" className="underline" style={{ color: "#D31C2B" }}>Privacy Policy</a>. I confirm I am 18 years or older.
                </span>
              </label>
              {errors.terms && <p className="text-xs" style={{ color: "#D31C2B" }}>{errors.terms}</p>}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 rounded text-[11px] font-semibold uppercase tracking-[1.5px] border transition-colors" style={{ borderColor: "#D9D3CB", color: "#6B6560" }}>
                  Back
                </button>
                <button onClick={handleSubmit}
                  className="flex-1 py-3 rounded text-[11px] font-semibold uppercase tracking-[1.5px] text-white"
                  style={{ backgroundColor: "#D31C2B" }}
                >
                  Create Account
                </button>
              </div>
            </div>
          )}

          <p className="text-center text-xs mt-6" style={{ color: "#9B9590" }}>
            Already have an account? <Link to="/login" className="underline" style={{ color: "#D31C2B" }}>Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
