import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, CreditCard, Bitcoin, Wallet, Landmark, ArrowRight } from "lucide-react";

const fundingMethods = [
  {
    id: "crypto",
    name: "Crypto",
    description: "Instantly, 0% Fee",
    icon: Bitcoin,
    iconBg: "#1A1A1A",
    iconColor: "#F7931A",
    available: true,
  },
  {
    id: "card",
    name: "Credit or Debit Card",
    description: "Instantly, 0% Fee",
    icon: CreditCard,
    iconBg: "#F5F2ED",
    iconColor: "#1A1A1A",
    available: true,
  },
  {
    id: "googlepay",
    name: "Google Pay",
    description: "Instantly, 0% Fee",
    icon: Wallet,
    iconBg: "#F5F2ED",
    iconColor: "#4285F4",
    available: true,
  },
  {
    id: "skrill",
    name: "Skrill",
    description: "Instantly, 0% Fee",
    icon: Wallet,
    iconBg: "#F5F2ED",
    iconColor: "#862165",
    available: true,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    description: "1-3 days, 0% Fee",
    icon: Landmark,
    iconBg: "#F5F2ED",
    iconColor: "#1A1A1A",
    available: true,
  },
];

export default function FundsPage() {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw" | "transfers" | "history" | "manage">("deposit");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#EDE8E0" }}>
      {/* Sub-nav */}
      <div className="border-b" style={{ backgroundColor: "#fff", borderColor: "#F5F2ED" }}>
        <div className="container-axi py-4">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "#1A1A1A" }}>Funds</h1>
          <div className="flex gap-6 overflow-x-auto">
            {(["deposit", "withdraw", "transfers", "history", "manage"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="pb-3 text-sm font-semibold capitalize whitespace-nowrap transition-all relative"
                style={{ color: activeTab === tab ? "#1A1A1A" : "#9B9590" }}>
                {tab === "history" ? "Funding History" : tab}
                {activeTab === tab && (
                  <motion.div layoutId="fundTab" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: "#1A1A1A" }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress stepper */}
      <div className="container-axi py-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded" style={{ backgroundColor: "#1A1A1A" }}>
            <ArrowRight size={14} className="text-white" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider">Select method</span>
          </div>
          <div className="flex-1 h-1 rounded" style={{ backgroundColor: "#D9D3CB" }} />
          <div className="flex-1 h-1 rounded" style={{ backgroundColor: "#D9D3CB" }} />
          <div className="flex-1 h-1 rounded" style={{ backgroundColor: "#D9D3CB" }} />
        </div>

        {activeTab === "deposit" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-base mb-2" style={{ color: "#1A1A1A" }}>What payment method would you like to use?</p>
            <p className="text-sm mb-6" style={{ color: "#9B9590" }}>Add new funding methods</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fundingMethods.map((method) => (
                <motion.button key={method.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-lg border text-left hover:shadow-md transition-all"
                  style={{ backgroundColor: "#fff", borderColor: "#F5F2ED" }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: method.iconBg }}>
                    <method.icon size={24} style={{ color: method.iconColor }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{method.name}</p>
                    <p className="text-xs" style={{ color: "#9B9590" }}>{method.description}</p>
                  </div>
                  <ChevronRight size={18} style={{ color: "#9B9590" }} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "withdraw" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-base mb-6" style={{ color: "#1A1A1A" }}>Select a withdrawal method</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fundingMethods.map((method) => (
                <button key={method.id}
                  className="flex items-center gap-4 p-4 rounded-lg border text-left hover:shadow-md transition-all"
                  style={{ backgroundColor: "#fff", borderColor: "#F5F2ED" }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: method.iconBg }}>
                    <method.icon size={24} style={{ color: method.iconColor }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>{method.name}</p>
                    <p className="text-xs" style={{ color: "#9B9590" }}>{method.description}</p>
                  </div>
                  <ChevronRight size={18} style={{ color: "#9B9590" }} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "transfers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-lg font-semibold" style={{ color: "#1A1A1A" }}>Internal Transfers</p>
            <p className="text-sm mt-2" style={{ color: "#9B9590" }}>Transfer funds between your trading accounts.</p>
          </motion.div>
        )}

        {activeTab === "history" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-lg font-semibold" style={{ color: "#1A1A1A" }}>Funding History</p>
            <p className="text-sm mt-2" style={{ color: "#9B9590" }}>View all your past deposits and withdrawals.</p>
          </motion.div>
        )}

        {activeTab === "manage" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-lg font-semibold" style={{ color: "#1A1A1A" }}>Manage Payment Methods</p>
            <p className="text-sm mt-2" style={{ color: "#9B9590" }}>Add or remove your saved payment methods.</p>
          </motion.div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t py-3 px-6 flex items-center justify-between md:hidden"
        style={{ backgroundColor: "#fff", borderColor: "#F5F2ED" }}>
        <Link to="/dashboard" className="flex flex-col items-center gap-1">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#D31C2B" }}>
            <ArrowRight size={12} className="text-white -rotate-45" />
          </div>
        </Link>
      </div>
    </div>
  );
}
