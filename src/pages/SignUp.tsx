import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { trpc } from "@/providers/trpc";
import Navbar from "@/sections/Navbar";
import Footer from "@/sections/Footer";
import TopBar from "@/sections/TopBar";
import { COUNTRIES, LANGUAGES, CURRENCIES, DEFAULT_CURRENCY } from "@/lib/constants";
import { CheckCircle, Globe, MapPin, DollarSign, ChevronRight, Shield, User, Mail, Lock } from "lucide-react";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("NG");
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const register = trpc.localAuth.register.useMutation({
    onSuccess: (data) => {
      login(data.token, data.user);
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreed) {
      setError("Please agree to the terms");
      return;
    }
    register.mutate({
      email,
      password,
      name: name || undefined,
      country,
      language,
      currency,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <TopBar />
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#D51820] to-red-700 p-6 text-white">
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-white/80 text-sm mt-1">Join millions of traders worldwide</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center px-6 py-4 border-b border-gray-100">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${s <= step ? 'bg-[#D51820] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                <div className={`flex-1 h-1 mx-2 ${s < step ? 'bg-[#D51820]' : 'bg-gray-100'}`} />
              </div>
            ))}
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 text-gray-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D51820]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 text-gray-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D51820]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 890"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D51820]"
                  />
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-[#D51820] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Location & Preferences */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Location & Preferences</h2>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 text-gray-400" /> Country of Residence
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D51820]"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Globe className="w-4 h-4 text-gray-400" /> Preferred Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D51820]"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>{l.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <DollarSign className="w-4 h-4 text-gray-400" /> Account Currency (Default: EUR)
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D51820]"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">EUR is set as default. You can change this later.</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-[#D51820] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Password & Terms */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Security & Terms</h2>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                    <Lock className="w-4 h-4 text-gray-400" /> Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D51820]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#D51820]"
                  />
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#D51820] border-gray-300 rounded focus:ring-[#D51820]"
                  />
                  <div className="text-sm text-gray-600">
                    I agree to the <Link to="/help" className="text-[#D51820] hover:underline">Terms of Service</Link>,{' '}
                    <Link to="/help" className="text-[#D51820] hover:underline">Privacy Policy</Link>, and{' '}
                    <Link to="/help" className="text-[#D51820] hover:underline">Risk Disclosure</Link>. 
                    I confirm I am 18+ and trading CFDs is permitted in my country.
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                  <Shield className="w-4 h-4" />
                  Your data is protected with 256-bit SSL encryption
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={register.isPending}
                    className="flex-1 bg-[#D51820] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {register.isPending ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 pb-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#D51820] font-semibold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
