import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Bitcoin, CreditCard, Wallet, Landmark, AlertCircle } from "lucide-react";

const methods = [
  { id: "crypto", name: "Crypto Wallet", desc: "Up to 15mins, 0% Fee", icon: Bitcoin, color: "#F7931A", fields: ["walletAddress"] },
  { id: "card", name: "Credit/Debit Card", desc: "Instant*, 0% Fee", icon: CreditCard, color: "#1A1A1A", fields: [] },
  { id: "skrill", name: "Skrill", desc: "Instant, 0% Fee", icon: Wallet, color: "#862165", fields: ["accountName"] },
  { id: "bank", name: "Bank Transfer", desc: "1-3 days, 0% Fee", icon: Landmark, color: "#1A1A1A", fields: ["bankName", "accountName", "accountNumber", "swiftCode"] },
];

export default function UserWithdrawalPage() {
  const [step, setStep] = useState<"method" | "details" | "success">("method");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [walletAddress, setWalletAddress] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumberDest, setAccountNumberDest] = useState("");
  const [swiftCode, setSwiftCode] = useState("");

  const method = methods.find((m) => m.id === selectedMethod);

  const handleSubmit = () => {
    setStep("success");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EDE8E0" }}>
      <div className="flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: "#fff", borderColor: "#F5F2ED" }}>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} style={{ color: "#1A1A1A" }} />
          </Link>
          <h1 className="text-lg font-bold" style={{ color: "#1A1A1A" }}>Withdraw Funds</h1>
        </div>
        <span className="text-sm" style={{ color: "#9B9590" }}>Account: 60332183</span>
      </div>

      <div className="container-axi py-4">
        <div className="flex items-center gap-2 mb-6">
          {["Select Method", "Details", "Done"].map((s, i) => {
            const currentStep = step === "method" ? 0 : step === "details" ? 1 : 2;
            const isActive = i <= currentStep;
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? "text-white" : ""}`}
                  style={{ backgroundColor: isActive ? "#D31C2B" : "#D9D3CB" }}>
                  {i < currentStep ? <Check size={14} /> : i + 1}
                </div>
                <span className="text-xs font-semibold hidden md:block" style={{ color: isActive ? "#1A1A1A" : "#9B9590" }}>{s}</span>
                {i < 2 && <div className="flex-1 h-0.5" style={{ backgroundColor: i < currentStep ? "#D31C2B" : "#D9D3CB" }} />}
              </div>
            );
          })}
        </div>

        {/* STEP 1: Method */}
        {step === "method" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-base font-semibold mb-2" style={{ color: "#1A1A1A" }}>Select withdrawal method</p>
            <p className="text-sm mb-6" style={{ color: "#9B9590" }}>Available withdrawal methods</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {methods.map((m) => (
                <button key={m.id} onClick={() => { setSelectedMethod(m.id); setStep("details"); }}
                  className="flex items-center gap-4 p-4 rounded-lg border text-left hover:shadow-md transition-all"
                  style={{ backgroundColor: "#fff", borderColor: "#F5F2ED" }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F5F2ED" }}>
                    <m.icon size={24} style={{ color: m.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{m.name}</p>
                    <p className="text-xs" style={{ color: "#9B9590" }}>{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: "#FFF8E1" }}>
              <div className="flex items-start gap-2">
                <AlertCircle size={16} style={{ color: "#F5C842", marginTop: 2 }} />
                <p className="text-xs" style={{ color: "#5A5652" }}>
                  Withdrawals are processed within 24 business hours after admin approval. Minimum withdrawal: EUR 5.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Details */}
        {step === "details" && method && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md mx-auto">
            <button onClick={() => setStep("method")} className="flex items-center gap-2 text-sm mb-4" style={{ color: "#D31C2B" }}>
              <ArrowLeft size={16} /> Back
            </button>
            <h2 className="text-xl font-bold mb-6" style={{ color: "#1A1A1A" }}>Withdrawal Details</h2>

            {/* Amount */}
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
              <p className="text-xs mt-1" style={{ color: "#9B9590" }}>Available balance: EUR 0.00</p>
            </div>

            {/* Method-specific fields */}
            {method.fields.includes("walletAddress") && (
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Wallet Address</label>
                <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter your crypto wallet address" className="w-full px-4 py-4 rounded-lg border text-base"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
            )}

            {method.fields.includes("bankName") && (
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Bank Name</label>
                <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)}
                  placeholder="Enter bank name" className="w-full px-4 py-4 rounded-lg border text-base"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
            )}

            {method.fields.includes("accountName") && (
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Account Holder Name</label>
                <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Full name on account" className="w-full px-4 py-4 rounded-lg border text-base"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
            )}

            {method.fields.includes("accountNumber") && (
              <div className="mb-4">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>Account Number / IBAN</label>
                <input type="text" value={accountNumberDest} onChange={(e) => setAccountNumberDest(e.target.value)}
                  placeholder="Enter account number or IBAN" className="w-full px-4 py-4 rounded-lg border text-base"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
            )}

            {method.fields.includes("swiftCode") && (
              <div className="mb-6">
                <label className="block text-sm mb-2" style={{ color: "#1A1A1A" }}>SWIFT / BIC Code</label>
                <input type="text" value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)}
                  placeholder="Enter SWIFT code" className="w-full px-4 py-4 rounded-lg border text-base"
                  style={{ backgroundColor: "#fff", borderColor: "#D9D3CB", color: "#1A1A1A" }} />
              </div>
            )}

            <button onClick={handleSubmit}
              disabled={!amount}
              className="w-full py-4 rounded-lg text-base font-semibold"
              style={{ backgroundColor: amount ? "#F5C842" : "#D9D3CB", color: "#1A1A1A" }}>
              Submit Withdrawal Request
            </button>

            <p className="text-xs text-center mt-4" style={{ color: "#9B9590" }}>
              Your withdrawal will be reviewed by our admin team before processing.
            </p>
          </motion.div>
        )}

        {/* STEP 3: Success */}
        {step === "success" && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-12">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#F5C842" }}>
              <Check size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>Withdrawal Request Submitted!</h2>
            <p className="text-sm mb-2" style={{ color: "#5A5652" }}>
              Your withdrawal request of <strong>{currency} {amount}</strong> has been submitted for admin approval.
            </p>
            <p className="text-sm mb-8" style={{ color: "#9B9590" }}>
              You will be notified once the admin reviews and approves your request.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/dashboard" className="px-8 py-3 rounded-lg text-sm font-semibold"
                style={{ backgroundColor: "#F5C842", color: "#1A1A1A" }}>
                Back to Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
