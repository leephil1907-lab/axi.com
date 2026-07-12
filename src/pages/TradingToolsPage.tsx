import { motion } from "framer-motion";
import { Calculator, TrendingUp, Zap, Shield, BarChart3, Globe, Cpu, LineChart } from "lucide-react";

const tools = [
  { icon: Calculator, title: "Pip Calculator", desc: "Calculate pip values for any forex pair instantly. Plan your trades with precision.", cta: "USE CALCULATOR" },
  { icon: TrendingUp, title: "Margin Calculator", desc: "Determine required margin before opening a position. Manage your risk effectively.", cta: "USE CALCULATOR" },
  { icon: LineChart, title: "Profit/Loss Calculator", desc: "Estimate potential profits and losses on your trades before execution.", cta: "USE CALCULATOR" },
  { icon: BarChart3, title: "Currency Converter", desc: "Convert between currencies with real-time exchange rates.", cta: "CONVERT" },
  { icon: Globe, title: "Economic Calendar", desc: "Stay ahead of market-moving events. Track economic releases worldwide.", cta: "VIEW CALENDAR" },
  { icon: Cpu, title: "VPS Hosting", desc: "Run your EAs 24/7 with our ultra-low latency virtual private server.", cta: "LEARN MORE" },
  { icon: Zap, title: "Autochartist", desc: "Automated technical analysis and pattern recognition. Free for Axi traders.", cta: "ACTIVATE" },
  { icon: Shield, title: "PsyQuation", desc: "AI-powered trading analytics. Score your performance and improve.", cta: "START NOW" },
];

export default function TradingToolsPage() {
  return (
    <div>
      <section className="py-20" style={{ backgroundColor: "#D31C2B" }}>
        <div className="container-axi text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-white">Trading Tools</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-white/80 max-w-[600px] mx-auto">Free tools and calculators to help you trade smarter and manage risk effectively</motion.p>
        </div>
      </section>
      <section className="py-16" style={{ backgroundColor: "#EDE8E0" }}>
        <div className="container-axi">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, idx) => (
              <motion.div key={tool.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} className="p-6 rounded-lg border hover:shadow-md transition-all" style={{ backgroundColor: "#fff", borderColor: "#D9D3CB" }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "#D31C2B" }}>
                  <tool.icon size={22} className="text-white" />
                </div>
                <h3 className="text-base font-bold" style={{ color: "#1A1A1A" }}>{tool.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B6560" }}>{tool.desc}</p>
                <button className="mt-4 text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: "#D31C2B" }}>{tool.cta} &rarr;</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
