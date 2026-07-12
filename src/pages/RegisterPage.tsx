import { useState, useCallback } from "react";
import {
  ChevronLeft,
  X,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  MessageSquare,
  ChevronRight,
  Check,
  Info,
  Globe,
} from "lucide-react";

const countries = [
  "France", "Germany", "Spain", "Italy", "Netherlands", "Belgium",
  "Poland", "Sweden", "Portugal", "Austria", "Ireland", "Denmark",
  "Finland", "Czech Republic", "Romania", "Hungary", "Greece",
  "Slovakia", "Bulgaria", "Croatia", "Slovenia", "Lithuania", "Latvia",
  "Estonia", "Luxembourg", "Malta", "Cyprus", "United Kingdom",
  "Switzerland", "Norway", "Iceland", "Nigeria", "South Africa",
  "Kenya", "Ghana", "United States", "Canada", "Australia",
  "Singapore", "UAE", "Brazil", "Mexico", "India", "Turkey",
  "Thailand", "Malaysia", "Indonesia", "Philippines", "Vietnam",
];

const incomeRanges = [
  "Under EUR 15,000", "EUR 15,001 - EUR 30,000", "EUR 30,001 - EUR 75,000",
  "EUR 75,001 - EUR 150,000", "EUR 150,001 - EUR 300,000", "Above EUR 300,000",
];

const savingsRanges = [
  "Under EUR 15,000", "EUR 15,001 - EUR 60,000", "EUR 60,001 - EUR 200,000",
  "EUR 200,001 - EUR 500,000", "Above EUR 500,000",
];

const leverages = ["1:1", "1:10", "1:50", "1:100", "1:200", "1:300", "1:400", "1:500"];

const accountTypes = [
  { id: "standard", name: "Standard", badge: "Most Popular", description: "Our best account for everyday traders", spread: "From 0.9", commission: "No Commission", minTrade: "0.01 Lot", minDeposit: "No Minimum" },
  { id: "pro", name: "Pro", badge: "Low Spreads", description: "Preferential spreads for more experienced traders", spread: "From 0.0", commission: "$4.50 Round-Trip", minTrade: "0.01 Lot", minDeposit: "No Minimum" },
  { id: "usdcent", name: "USD Cent", badge: "Smaller notional", description: "Designed for smaller trade sizes", spread: "From 0.9", commission: "No Commission", minTrade: "0.01 Lot", minDeposit: "No Minimum" },
];

interface FormData {
  country: string; email: string; password: string;
  consentData: boolean; consentMarketing: boolean;
  twoFactorMethod: string; interests: string[];
  tradingPlatform: string; accountType: string; axiSelect: boolean;
  title: string; firstName: string; middleName: string; lastName: string;
  day: string; month: string; year: string;
  address1: string; address2: string; city: string; postcode: string;
  employment: string; annualIncome: string; savings: string;
  accountCurrency: string; leverage: string;
}

const initialForm: FormData = {
  country: "France", email: "", password: "",
  consentData: false, consentMarketing: false,
  twoFactorMethod: "", interests: [],
  tradingPlatform: "mt5", accountType: "standard", axiSelect: true,
  title: "", firstName: "", middleName: "", lastName: "",
  day: "", month: "", year: "",
  address1: "", address2: "", city: "", postcode: "",
  employment: "", annualIncome: "", savings: "",
  accountCurrency: "EUR", leverage: "1:500",
};

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [form, setForm] = useState<FormData>(initialForm);

  const totalSteps = 12;

  const update = useCallback((field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const progressWidth = `${((step) / (totalSteps - 1)) * 100}%`;

  const goHome = () => { window.location.hash = "#/"; };

  // Password validation
  const pwdChecks = form.password ? [
    { label: "At least 8 characters", ok: form.password.length >= 8 },
    { label: "Not longer than 15 characters", ok: form.password.length <= 15 },
    { label: "Lower case letters (a-z)", ok: /[a-z]/.test(form.password) },
    { label: "Upper case letters (A-Z)", ok: /[A-Z]/.test(form.password) },
    { label: "Numbers (0-9)", ok: /[0-9]/.test(form.password) },
    { label: "Special characters (# % @ ! etc.)", ok: /[^a-zA-Z0-9]/.test(form.password) },
  ] : [];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#EDE8E0" }}>
      {/* Red Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 z-50" style={{ backgroundColor: "#D31C2B" }}>
        {step > 0 ? (
          <button onClick={prevStep} className="text-white p-1"><ChevronLeft size={24} /></button>
        ) : (<div className="w-8" />)}
        <span className="text-white text-2xl font-bold tracking-tight" style={{ fontFamily: "sans-serif" }}>axi</span>
        <div className="relative">
          <button onClick={() => setLanguageOpen(!languageOpen)} className="flex items-center gap-1.5 text-white">
            <Globe size={18} /><span className="text-sm">{selectedLanguage}</span><ChevronDown size={14} />
          </button>
          {languageOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded shadow-lg py-1 min-w-[140px] z-50">
              {["English", "Espanol", "Francais", "Deutsch", "Portugues"].map((lang) => (
                <button key={lang} onClick={() => { setSelectedLanguage(lang); setLanguageOpen(false); }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" style={{ color: "#1A1A1A" }}>{lang}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {step > 0 && step < totalSteps && (
        <div className="px-4 pt-3 pb-1 flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: "#D9D3CB" }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: progressWidth, backgroundColor: "#D31C2B" }} />
          </div>
          <button onClick={goHome} className="p-1"><X size={20} style={{ color: "#1A1A1A" }} /></button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-8 overflow-y-auto">
        <div className="max-w-md mx-auto">

          {/* STEP 0: Country Selection */}
          {step === 0 && (
            <div>
              <div className="flex justify-end mb-2">
                <button onClick={goHome} className="p-1"><X size={24} style={{ color: "#9B9590" }} /></button>
              </div>
              <h1 className="text-2xl font-bold text-center mb-8" style={{ color: "#1A1A1A" }}>Create your account in minutes</h1>
              <div className="mb-6">
                <label className="block text-base mb-2" style={{ color: "#1A1A1A" }}>Country of Residence</label>
                <div className="relative">
                  <button onClick={() => setCountryOpen(!countryOpen)}
                    className="w-full flex items-center justify-between px-4 py-4 rounded-lg border text-left text-base"
                    style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }}>
                    <span>{form.country}</span><ChevronDown size={20} style={{ color: "#9B9590" }} />
                  </button>
                  {countryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-lg max-h-60 overflow-y-auto z-50" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB" }}>
                      {countries.map((c) => (
                        <button key={c} onClick={() => { update("country", c); setCountryOpen(false); }}
                          className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-50" style={{ color: "#1A1A1A" }}>{c}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button onClick={nextStep} className="w-full py-4 rounded-lg text-base font-semibold mb-6" style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>Continue</button>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#5A5652" }}>
                By creating an account, you agree to the <a href="/docs/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#D31C2B", textDecoration: "underline" }}>Privacy Policy</a> and to receive economic and marketing communications from Axi. You can remove yourself from the mailing list at any time.
              </p>
              <p className="text-center text-sm" style={{ color: "#5A5652" }}>
                Already an Axi client? <button onClick={goHome} className="font-semibold underline" style={{ color: "#D31C2B" }}>Log in here</button>
              </p>
            </div>
          )}

          {/* STEP 1: Sign Up */}
          {step === 1 && (
            <div>
              <div className="flex justify-center mb-6">
                <span className="text-4xl font-bold" style={{ color: "#D31C2B", fontFamily: "sans-serif" }}>axi</span>
              </div>
              <h1 className="text-2xl font-bold text-center mb-8" style={{ color: "#1A1A1A" }}>Sign up</h1>
              <div className="mb-4">
                <input type="email" placeholder="Email address *" value={form.email} onChange={(e) => update("email", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
              <div className="mb-4 relative">
                <input type={showPassword ? "text" : "password"} placeholder="Password *" value={form.password} onChange={(e) => update("password", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base pr-12" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#9B9590" }}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mb-4 space-y-1.5">
                  <p className="text-sm" style={{ color: "#5A5652" }}>Your password must contain:</p>
                  {pwdChecks.map((req) => (
                    <div key={req.label} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: req.ok ? "#22C55E" : "#D9D3CB" }}>
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-sm" style={{ color: req.ok ? "#22C55E" : "#5A5652" }}>{req.label}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="mb-4 flex items-start gap-3">
                <button onClick={() => update("consentData", !form.consentData)}
                  className="w-6 h-6 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center"
                  style={{ borderColor: form.consentData ? "#D31C2B" : "#D9D3CB", backgroundColor: form.consentData ? "#D31C2B" : "transparent" }}>
                  {form.consentData && <Check size={14} className="text-white" />}
                </button>
                <p className="text-sm" style={{ color: "#5A5652" }}>
                  I have read and consent to my data being used in accordance with the <a href="/docs/privacy-policy.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#1A1A1A", textDecoration: "underline" }}>Privacy Policy</a> .
                </p>
              </div>
              <div className="mb-6 flex items-start gap-3">
                <button onClick={() => update("consentMarketing", !form.consentMarketing)}
                  className="w-6 h-6 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center"
                  style={{ borderColor: form.consentMarketing ? "#D31C2B" : "#D9D3CB", backgroundColor: form.consentMarketing ? "#D31C2B" : "transparent" }}>
                  {form.consentMarketing && <Check size={14} className="text-white" />}
                </button>
                <p className="text-sm" style={{ color: "#5A5652" }}>I would like to receive free market analysis or promotional content from Axi.</p>
              </div>
              <button onClick={nextStep} className="w-full py-4 rounded-lg text-base font-semibold mb-4" style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>Continue</button>
              <p className="text-center text-sm mb-4" style={{ color: "#5A5652" }}>
                Already have an Axi account? <button onClick={goHome} className="font-bold underline" style={{ color: "#4F46E5" }}>Log in here</button>
              </p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-px" style={{ backgroundColor: "#D9D3CB" }} />
                <span className="text-sm font-medium" style={{ color: "#5A5652" }}>OR</span>
                <div className="flex-1 h-px" style={{ backgroundColor: "#D9D3CB" }} />
              </div>
              <button className="w-full flex items-center justify-center gap-3 py-4 rounded-lg border mb-3" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB" }}>
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                <span className="text-base" style={{ color: "#1A1A1A" }}>Sign up with Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-4 rounded-lg border mb-3" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1A1A1A"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.74.74 3.52 1.95h-1.97c-.94-.97-2.15-1.29-3.29-.92-1.34.46-1.82 1.5-1.82 2.79 1.95.12 3.68.95 4.6 2.51-.68 1.42-1.63 2.7-2.63 3.6zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                <span className="text-base" style={{ color: "#1A1A1A" }}>Sign up with Apple</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-4 rounded-lg border" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="text-base" style={{ color: "#1A1A1A" }}>Sign up with Facebook</span>
              </button>
            </div>
          )}

          {/* STEP 2: 2FA */}
          {step === 2 && (
            <div>
              <div className="flex justify-center mb-6">
                <span className="text-4xl font-bold" style={{ color: "#D31C2B", fontFamily: "sans-serif" }}>axi</span>
              </div>
              <h1 className="text-2xl font-bold text-center mb-2" style={{ color: "#1A1A1A" }}>Keep Your Account Safe</h1>
              <p className="text-center mb-8" style={{ color: "#5A5652" }}>Add another authentication method.</p>
              <button onClick={() => update("twoFactorMethod", "authenticator")}
                className="w-full flex items-center gap-4 p-5 rounded-lg border mb-4"
                style={{ backgroundColor: "#fff", borderColor: form.twoFactorMethod === "authenticator" ? "#D31C2B" : "#D9D3CB" }}>
                <Lock size={24} style={{ color: "#1A1A1A" }} />
                <span className="flex-1 text-left text-base" style={{ color: "#1A1A1A" }}>Google Authenticator or similar</span>
                <ChevronRight size={20} style={{ color: "#9B9590" }} />
              </button>
              <button onClick={() => update("twoFactorMethod", "sms")}
                className="w-full flex items-center gap-4 p-5 rounded-lg border"
                style={{ backgroundColor: "#fff", borderColor: form.twoFactorMethod === "sms" ? "#D31C2B" : "#D9D3CB" }}>
                <MessageSquare size={24} style={{ color: "#1A1A1A" }} />
                <span className="flex-1 text-left text-base" style={{ color: "#1A1A1A" }}>SMS</span>
                <ChevronRight size={20} style={{ color: "#9B9590" }} />
              </button>
              <button onClick={nextStep} disabled={!form.twoFactorMethod}
                className="w-full py-4 rounded-lg text-base font-semibold mt-8"
                style={{ backgroundColor: form.twoFactorMethod ? "#F5C842" : "#D9D3CB", color: "#1A1A1A" }}>Continue</button>
            </div>
          )}

          {/* STEP 3: Welcome */}
          {step === 3 && (
            <div className="text-center">
              <div className="flex justify-end mb-2">
                <button onClick={goHome} className="p-1"><X size={24} style={{ color: "#9B9590" }} /></button>
              </div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: "#D31C2B", fontFamily: "sans-serif" }}>Welcome to Axi!</h1>
              <p className="text-base mb-4 leading-relaxed" style={{ color: "#1A1A1A" }}>
                You&apos;ve joined thousands of savvy traders with access to round-the-clock trading.
              </p>
              <p className="text-base mb-8 leading-relaxed" style={{ color: "#1A1A1A" }}>
                Complete your application to start exploring the global markets.
              </p>
              <button onClick={nextStep} className="w-full py-4 rounded-lg text-base font-semibold mb-6" style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>Resume Application</button>
              <div className="mt-8">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop" alt="Welcome" className="w-full rounded-lg" />
              </div>
            </div>
          )}

          {/* STEP 4: Interests */}
          {step === 4 && (
            <div>
              <h1 className="text-2xl font-bold text-center mb-6" style={{ color: "#1A1A1A" }}>What are you interested in?</h1>
              {["Copy Trading", "Crypto Perpetual Futures", "Automated strategies", "MT4/ MT5", "Axi Select", "I'm not sure yet"].map((interest) => (
                <button key={interest} onClick={() => toggleInterest(interest)}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border mb-3"
                  style={{ backgroundColor: "#fff", borderColor: form.interests.includes(interest) ? "#D31C2B" : "#D9D3CB" }}>
                  <div className="w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: form.interests.includes(interest) ? "#D31C2B" : "#D9D3CB", backgroundColor: form.interests.includes(interest) ? "#D31C2B" : "transparent" }}>
                    {form.interests.includes(interest) && <Check size={14} className="text-white" />}
                  </div>
                  <span className="text-base" style={{ color: "#1A1A1A" }}>{interest}</span>
                </button>
              ))}
              <button onClick={nextStep} className="w-full py-4 rounded-lg text-base font-semibold mt-4 mb-3" style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>Continue</button>
              <button onClick={nextStep} className="w-full py-4 rounded-lg border text-base font-medium" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }}>Skip</button>
            </div>
          )}

          {/* STEP 5: Account Setup */}
          {step === 5 && (
            <div>
              <h1 className="text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>Set-up your new account</h1>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base font-medium" style={{ color: "#1A1A1A" }}>Trading Platform</span>
                  <Info size={18} style={{ color: "#9B9590" }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => update("tradingPlatform", "mt5")}
                    className="relative p-4 rounded-lg border text-center"
                    style={{ backgroundColor: "#fff", borderColor: form.tradingPlatform === "mt5" ? "#D31C2B" : "#D9D3CB" }}>
                    {form.tradingPlatform === "mt5" && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#D31C2B" }}>
                        <Check size={12} className="text-white" />
                      </div>)}
                    <div className="inline-block px-3 py-1 rounded text-sm font-bold text-white mb-2" style={{ backgroundColor: "#D31C2B" }}>MT5</div>
                    <p className="text-sm" style={{ color: "#1A1A1A" }}>MetaTrader 5</p>
                  </button>
                  <button onClick={() => update("tradingPlatform", "mt4")}
                    className="relative p-4 rounded-lg border text-center"
                    style={{ backgroundColor: "#fff", borderColor: form.tradingPlatform === "mt4" ? "#D31C2B" : "#D9D3CB" }}>
                    {form.tradingPlatform === "mt4" && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#D31C2B" }}>
                        <Check size={12} className="text-white" />
                      </div>)}
                    <div className="inline-block px-3 py-1 rounded text-sm font-bold text-white mb-2" style={{ backgroundColor: "#1A1A1A" }}>MT4</div>
                    <p className="text-sm" style={{ color: "#1A1A1A" }}>MetaTrader 4</p>
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <span className="text-base font-medium mb-3 block" style={{ color: "#1A1A1A" }}>Account Type</span>
                {accountTypes.map((acct) => (
                  <button key={acct.id} onClick={() => update("accountType", acct.id)}
                    className="w-full rounded-lg border mb-3 overflow-hidden"
                    style={{ backgroundColor: "#fff", borderColor: form.accountType === acct.id ? "#D31C2B" : "#D9D3CB" }}>
                    <div className="relative p-4 text-center">
                      {form.accountType === acct.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#D31C2B" }}>
                          <Check size={14} className="text-white" />
                        </div>)}
                      <h3 className="text-lg font-bold mb-1" style={{ color: "#1A1A1A" }}>{acct.name}</h3>
                      <span className="inline-block px-3 py-0.5 rounded-full text-xs mb-2" style={{ backgroundColor: "#F5F2ED", color: "#5A5652" }}>{acct.badge}</span>
                      <p className="text-sm mb-3" style={{ color: "#5A5652" }}>{acct.description}</p>
                      <div style={{ borderColor: "#F5F2ED" }}>
                        {[{ k: "Spread", v: acct.spread }, { k: "Commission", v: acct.commission }, { k: "Min. Trade Size", v: acct.minTrade }, { k: "Min. Deposit", v: acct.minDeposit }].map((item, i, arr) => (
                          <div key={item.k} className="flex justify-between py-2" style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F2ED" : "none" }}>
                            <span className="text-sm" style={{ color: "#5A5652" }}>{item.k}</span>
                            <span className="text-sm font-medium" style={{ color: "#1A1A1A" }}>{item.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg mb-4" style={{ backgroundColor: "#1A1A1A" }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold" style={{ color: "#D31C2B", fontFamily: "sans-serif" }}>axi</span>
                    <span className="text-lg font-bold" style={{ color: "#fff" }}>SELECT</span>
                  </div>
                  <p className="text-sm" style={{ color: "#9B9590" }}>Add an MT5 Axi Select account to join our free capital allocation programme. <span style={{ color: "#3B82F6" }}>Learn More</span></p>
                </div>
                <button onClick={() => update("axiSelect", !form.axiSelect)}
                  className="w-14 h-8 rounded-full relative flex-shrink-0 transition-colors" style={{ backgroundColor: form.axiSelect ? "#22C55E" : "#5A5652" }}>
                  <div className="absolute top-1 w-6 h-6 rounded-full bg-white transition-all" style={{ left: form.axiSelect ? "28px" : "4px" }} />
                </button>
              </div>
              <button onClick={nextStep} className="w-full py-4 rounded-lg text-base font-semibold" style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>Create Account</button>
            </div>
          )}

          {/* STEP 6: Personal Details */}
          {step === 6 && (
            <div>
              <h1 className="text-2xl font-bold text-center mb-2" style={{ color: "#1A1A1A" }}>Personal details</h1>
              <p className="text-center text-sm mb-8 leading-relaxed" style={{ color: "#5A5652" }}>
                Please enter your full legal name exactly as it appears on your ID document. We&apos;ll use this to verify your identity.
              </p>
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Title</label>
                <select value={form.title} onChange={(e) => update("title", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base appearance-none"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: form.title ? "#1A1A1A" : "#9B9590" }}>
                  <option value="">Please select</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>First Name (as shown on your ID)</label>
                <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Middle Name (optional, as shown on your ID)</label>
                <input type="text" value={form.middleName} onChange={(e) => update("middleName", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Last Name (as shown on your ID)</label>
                <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
              <button onClick={nextStep} className="w-full py-4 rounded-lg text-base font-semibold" style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>Continue</button>
            </div>
          )}

          {/* STEP 7: Date of Birth */}
          {step === 7 && (
            <div>
              <h1 className="text-2xl font-bold text-center mb-2" style={{ color: "#1A1A1A" }}>Personal Details (cont.)</h1>
              <p className="text-center text-sm mb-2 leading-relaxed" style={{ color: "#5A5652" }}>Please enter your date of birth as shown on your ID.</p>
              <p className="text-center text-sm mb-8 leading-relaxed" style={{ color: "#5A5652" }}>(Note: We can only consider applications from individuals who are over 18 years of age or older)</p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Day</label>
                  <input type="text" placeholder="DD" maxLength={2} value={form.day} onChange={(e) => update("day", e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-4 rounded-lg border text-center text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Month</label>
                  <input type="text" placeholder="MM" maxLength={2} value={form.month} onChange={(e) => update("month", e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-4 rounded-lg border text-center text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Year</label>
                  <input type="text" placeholder="YYYY" maxLength={4} value={form.year} onChange={(e) => update("year", e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-4 rounded-lg border text-center text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
                </div>
              </div>
              <button onClick={nextStep} disabled={!form.day || !form.month || !form.year}
                className="w-full py-4 rounded-lg text-base font-semibold"
                style={{ backgroundColor: form.day && form.month && form.year ? "#F5C842" : "#D9D3CB", color: "#1A1A1A" }}>Continue</button>
            </div>
          )}

          {/* STEP 8: Residential Address */}
          {step === 8 && (
            <div>
              <h1 className="text-2xl font-bold text-center mb-2" style={{ color: "#1A1A1A" }}>Residential Address</h1>
              <p className="text-center text-sm mb-8 leading-relaxed" style={{ color: "#5A5652" }}>
                For regulatory purposes, please confirm your current residential address. (Note: Post Office boxes cannot be accepted as residential address)
              </p>
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Address Line 1</label>
                <input type="text" value={form.address1} onChange={(e) => update("address1", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Address Line 2 (optional)</label>
                <input type="text" value={form.address2} onChange={(e) => update("address2", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>City or Province (optional)</label>
                <input type="text" value={form.city} onChange={(e) => update("city", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
              <div className="mb-6">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Postcode (optional)</label>
                <input type="text" value={form.postcode} onChange={(e) => update("postcode", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
              <button onClick={nextStep} disabled={!form.address1}
                className="w-full py-4 rounded-lg text-base font-semibold"
                style={{ backgroundColor: form.address1 ? "#F5C842" : "#D9D3CB", color: "#1A1A1A" }}>Continue</button>
            </div>
          )}

          {/* STEP 9: Employment */}
          {step === 9 && (
            <div>
              <h1 className="text-2xl font-bold text-center mb-2" style={{ color: "#1A1A1A" }}>Employment</h1>
              <p className="text-center text-sm mb-8" style={{ color: "#5A5652" }}>Before you start trading, we need to understand your employment status.</p>
              {["Full Time", "Part Time", "Self Employed", "Retired", "Unemployed", "Student"].map((emp) => (
                <button key={emp} onClick={() => update("employment", emp)}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border mb-3"
                  style={{ backgroundColor: "#fff", borderColor: form.employment === emp ? "#D31C2B" : "#D9D3CB" }}>
                  <div className="w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center" style={{ borderColor: form.employment === emp ? "#D31C2B" : "#D9D3CB" }}>
                    {form.employment === emp && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#D31C2B" }} />}
                  </div>
                  <span className="text-base" style={{ color: "#1A1A1A" }}>{emp}</span>
                </button>
              ))}
              <button onClick={nextStep} disabled={!form.employment}
                className="w-full py-4 rounded-lg text-base font-semibold"
                style={{ backgroundColor: form.employment ? "#F5C842" : "#D9D3CB", color: "#1A1A1A" }}>Continue</button>
            </div>
          )}

          {/* STEP 10: Financial Info */}
          {step === 10 && (
            <div>
              <h1 className="text-2xl font-bold text-center mb-2" style={{ color: "#1A1A1A" }}>Finances</h1>
              <p className="text-center text-sm mb-8 leading-relaxed" style={{ color: "#5A5652" }}>
                We understand this is personal, but to adhere to financial regulations, we kindly need to ask about your income
              </p>
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Average Annual Income</label>
                <select value={form.annualIncome} onChange={(e) => update("annualIncome", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base appearance-none"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: form.annualIncome ? "#1A1A1A" : "#9B9590" }}>
                  <option value="">Select range</option>
                  {incomeRanges.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Approx Value of Savings/Investments</label>
                <select value={form.savings} onChange={(e) => update("savings", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base appearance-none"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: form.savings ? "#1A1A1A" : "#9B9590" }}>
                  <option value="">Select range</option>
                  {savingsRanges.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <button onClick={nextStep} disabled={!form.annualIncome || !form.savings}
                className="w-full py-4 rounded-lg text-base font-semibold"
                style={{ backgroundColor: form.annualIncome && form.savings ? "#F5C842" : "#D9D3CB", color: "#1A1A1A" }}>Continue</button>
            </div>
          )}

          {/* STEP 11: Account Settings */}
          {step === 11 && (
            <div>
              <h1 className="text-2xl font-bold text-center mb-2" style={{ color: "#1A1A1A" }}>Set up your account</h1>
              <p className="text-center text-sm mb-8" style={{ color: "#5A5652" }}>Customise your Metatrader account settings.</p>
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Account currency</label>
                <select value={form.accountCurrency} onChange={(e) => update("accountCurrency", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base appearance-none"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }}>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="GBP">GBP (British Pound)</option>
                  <option value="AUD">AUD (Australian Dollar)</option>
                  <option value="JPY">JPY (Japanese Yen)</option>
                  <option value="CHF">CHF (Swiss Franc)</option>
                  <option value="CAD">CAD (Canadian Dollar)</option>
                  <option value="PLN">PLN (Polish Zloty)</option>
                  <option value="SGD">SGD (Singapore Dollar)</option>
                  <option value="ZAR">ZAR (South African Rand)</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Leverage</label>
                <select value={form.leverage} onChange={(e) => update("leverage", e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border text-base appearance-none"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }}>
                  {leverages.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <p className="text-sm mb-6" style={{ color: "#5A5652" }}>
                (Please note, your Axi Select MT5 account currency is non-configurable and will default to <strong>USD</strong>)
              </p>
              <button onClick={nextStep} className="w-full py-4 rounded-lg text-base font-semibold" style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>Continue</button>
            </div>
          )}

          {/* STEP 12: Success */}
          {step === 12 && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "#22C55E" }}>
                  <Check size={40} className="text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-4" style={{ color: "#1A1A1A" }}>Account Created Successfully!</h1>
              <p className="text-base mb-2" style={{ color: "#5A5652" }}>Welcome to Axi, {form.firstName || "Trader"}!</p>
              <p className="text-sm mb-8" style={{ color: "#5A5652" }}>Your account has been set up. You can now access your dashboard and start trading.</p>
              <button onClick={() => { window.location.hash = "#/dashboard"; }}
                className="w-full py-4 rounded-lg text-base font-semibold mb-3" style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>Go to Dashboard</button>
              <button onClick={goHome}
                className="w-full py-4 rounded-lg border text-base font-medium" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }}>Back to Home</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
