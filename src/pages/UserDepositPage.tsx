import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, ChevronRight, CreditCard, Bitcoin, Wallet, Landmark, ArrowLeft, Check, AlertCircle } from "lucide-react";

const methods = [
  { id: "crypto", name: "Crypto", desc: "Instantly, 0% Fee", icon: Bitcoin, color: "#F7931A" },
  { id: "card", name: "Credit or Debit Card", desc: "Instantly, 0% Fee", icon: CreditCard, color: "#1A1A1A" },
  { id: "googlepay", name: "Google Pay", desc: "Instantly, 0% Fee", icon: Wallet, color: "#4285F4" },
  { id: "skrill", name: "Skrill", desc: "Instantly, 0% Fee", icon: Wallet, color: "#862165" },
  { id: "bank", name: "Bank Transfer", desc: "1-3 days, 0% Fee", icon: Landmark, color: "#1A1A1A" },
];

export default function UserDepositPage() {
  const [step, setStep] = useState<"method" | "details" | "proof" | "success">("method");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [proofDesc, setProofDesc] = useState("");
  const [proofImage, setProofImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProofImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Simulate submission
    setStep("success");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EDE8E0" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: "#fff", borderColor: "#F5F2ED" }}>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} style={{ color: "#1A1A1A" }} />
          </Link>
          <h1 className="text-lg font-bold" style={{ color: "#1A1A1A" }}>Deposit Funds</h1>
        </div>
        <span className="text-sm" style={{ color: "#9B9590" }}>Account: 60332183</span>
      </div>

      {/* Progress */}
      <div className="container-axi py-4">
        <div className="flex items-center gap-2">
          {["Select Method", "Amount", "Proof", "Done"].map((s, i) => {
            const currentStep = step === "method" ? 0 : step === "details" ? 1 : step === "proof" ? 2 : 3;
            const isActive = i <= currentStep;
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? "text-white" : ""}`}
                  style={{ backgroundColor: isActive ? "#D31C2B" : "#D9D3CB" }}>
                  {i < currentStep ? <Check size={14} /> : i + 1}
                </div>
                <span className="text-xs font-semibold hidden md:block" style={{ color: isActive ? "#1A1A1A" : "#9B9590" }}>{s}</span>
                {i < 3 && <div className="flex-1 h-0.5" style={{ backgroundColor: i < currentStep ? "#D31C2B" : "#D9D3CB" }} />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-axi pb-12">
        {/* STEP 1: Select Method */}
        {step === "method" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-base font-semibold mb-2" style={{ color: "#1A1A1A" }}>What payment method would you like to use?</p>
            <p className="text-sm mb-6" style={{ color: "#9B9590" }}>Add new funding methods</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {methods.map((m) => (
                <button key={m.id} onClick={() => { setSelectedMethod(m.id); setStep("details"); }}
                  className="flex items-center gap-4 p-4 rounded-lg border text-left hover:shadow-md transition-all"
                  style={{ backgroundColor: "#fff", borderColor: selectedMethod === m.id ? "#D31C2B" : "#F5F2ED" }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F5F2ED" }}>
                    <m.icon size={24} style={{ color: m.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{m.name}</p>
                    <p className="text-xs" style={{ color: "#9B9590" }}>{m.desc}</p>
                  </div>
                  <ChevronRight size={18} style={{ color: "#9B9590" }} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Amount */}
        {step === "details" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md mx-auto">
            <button onClick={() => setStep("method")} className="flex items-center gap-2 text-sm mb-4" style={{ color: "#D31C2B" }}>
              <ArrowLeft size={16} /> Back
            </button>
            <h2 className="text-xl font-bold mb-6" style={{ color: "#1A1A1A" }}>Enter Deposit Amount</h2>

            <div className="mb-4">
              <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Amount</label>
              <div className="flex gap-2">
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00" className="flex-1 px-4 py-4 rounded-lg border text-base"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}
                  className="px-4 py-4 rounded-lg border text-base" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }}>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: "#FFF8E1" }}>
              <div className="flex items-start gap-2">
                <AlertCircle size={16} style={{ color: "#F5C842", marginTop: 2 }} />
                <p className="text-xs" style={{ color: "#5A5652" }}>
                  Minimum deposit: EUR 5 for cards, EUR 30 for crypto. After submitting, you will need to upload proof of transfer.
                </p>
              </div>
            </div>

            <button onClick={() => amount && setStep("proof")}
              disabled={!amount}
              className="w-full py-4 rounded-lg text-base font-semibold"
              style={{ backgroundColor: amount ? "#F5C842" : "#D9D3CB", color: "#1A1A1A" }}>
              Continue
            </button>
          </motion.div>
        )}

        {/* STEP 3: Payment Proof */}
        {step === "proof" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md mx-auto">
            <button onClick={() => setStep("details")} className="flex items-center gap-2 text-sm mb-4" style={{ color: "#D31C2B" }}>
              <ArrowLeft size={16} /> Back
            </button>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#1A1A1A" }}>Upload Payment Proof</h2>
            <p className="text-sm mb-6" style={{ color: "#9B9590" }}>
              Please upload a screenshot or receipt as proof of your {currency} {amount} transfer.
            </p>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Proof of Transfer</label>
              <div className="relative">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="proof-upload" />
                <label htmlFor="proof-upload"
                  className="flex flex-col items-center justify-center w-full h-40 rounded-lg border-2 border-dashed cursor-pointer hover:border-[#D31C2B] transition-colors"
                  style={{ borderColor: proofImage ? "#22A958" : "#D9D3CB", backgroundColor: "#fff" }}>
                  {proofImage ? (
                    <img src={proofImage} alt="Proof" className="h-full w-full object-contain rounded-lg" />
                  ) : (
                    <>
                      <Upload size={32} style={{ color: "#9B9590" }} />
                      <p className="text-sm mt-2" style={{ color: "#9B9590" }}>Click to upload screenshot/receipt</p>
                      <p className="text-xs" style={{ color: "#9B9590" }}>PNG, JPG up to 5MB</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Transaction Reference / Notes (optional)</label>
              <textarea value={proofDesc} onChange={(e) => setProofDesc(e.target.value)} rows={3}
                placeholder="Enter transaction ID, reference number, or any notes..."
                className="w-full px-4 py-3 rounded-lg border text-sm"
                style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
            </div>

            <button onClick={handleSubmit}
              className="w-full py-4 rounded-lg text-base font-semibold"
              style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>
              Submit Deposit Request
            </button>

            <p className="text-xs text-center mt-4" style={{ color: "#9B9590" }}>
              Your deposit will be reviewed by our admin team within 24 hours.
            </p>
          </motion.div>
        )}

        {/* STEP 4: Success */}
        {step === "success" && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#22A958" }}>
              <Check size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>Deposit Request Submitted!</h2>
            <p className="text-sm mb-2" style={{ color: "#5A5652" }}>
              Your deposit request of <strong>{currency} {amount}</strong> has been submitted for review.
            </p>
            <p className="text-sm mb-8" style={{ color: "#9B9590" }}>
              Our admin team will verify your payment proof and update your balance within 24 hours.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/dashboard"
                className="px-8 py-3 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>
                Back to Dashboard
              </Link>
              <button onClick={() => { setStep("method"); setAmount(""); setProofImage(null); setProofDesc(""); }}
                className="px-8 py-3 rounded-lg text-sm font-semibold border"
                style={{ borderColor: "#D9D3CB", color: "#1A1A1A" }}>
                Deposit Again
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
