import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, DollarSign } from "lucide-react";

const shares = [
  { name: "AAPL", full: "Apple Inc.", bid: 189.52, ask: 189.58, spread: 0.06, change: 1.23 },
  { name: "MSFT", full: "Microsoft Corp.", bid: 423.18, ask: 423.25, spread: 0.07, change: 0.89 },
  { name: "GOOGL", full: "Alphabet Inc.", bid: 175.42, ask: 175.49, spread: 0.07, change: -0.45 },
  { name: "AMZN", full: "Amazon.com Inc.", bid: 182.35, ask: 182.42, spread: 0.07, change: 1.56 },
  { name: "TSLA", full: "Tesla Inc.", bid: 248.42, ask: 248.52, spread: 0.10, change: -2.14 },
  { name: "META", full: "Meta Platforms Inc.", bid: 512.18, ask: 512.28, spread: 0.10, change: 0.67 },
  { name: "NVDA", full: "NVIDIA Corp.", bid: 875.15, ask: 875.30, spread: 0.15, change: 3.21 },
  { name: "NFLX", full: "Netflix Inc.", bid: 625.42, ask: 625.55, spread: 0.13, change: -0.82 },
  { name: "AMD", full: "Advanced Micro Devices", bid: 162.35, ask: 162.42, spread: 0.07, change: 1.45 },
  { name: "INTC", full: "Intel Corp.", bid: 31.25, ask: 31.30, spread: 0.05, change: -0.34 },
];

const features = [
  { icon: BarChart3, title: "Zero Commission", desc: "Trade share CFDs with no commission fees" },
  { icon: DollarSign, title: "Competitive Spreads", desc: "Tight spreads from 0.06 on major shares" },
  { icon: TrendingUp, title: "Leverage up to 20:1", desc: "Maximize your trading potential" },
];

export default function SharesPage() {
  const [prices, setPrices] = useState(shares);
  const simulate = useCallback(() => {
    setPrices(prev => prev.map(p => {
      const vol = p.bid * 0.002;
      const change = (Math.random() - 0.5) * vol;
      return { ...p, bid: p.bid + change, ask: p.ask + change };
    }));
  }, []);
  useEffect(() => { const t = setInterval(simulate, 2000); return () => clearInterval(t); }, [simulate]);

  return (
    <div>
      <section className="py-20" style={{ backgroundColor: "#D31C2B" }}>
        <div className="container-axi text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-white">Shares CFD Trading</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-white/80 max-w-[600px] mx-auto">Access global share CFDs with zero commission. Trade Apple, Tesla, NVIDIA and more.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="btn-yellow">TRADE SHARES</button>
            <button className="px-7 py-3 rounded border-2 border-white text-white text-[11px] font-semibold uppercase tracking-[1.5px] hover:bg-white hover:text-[#D31C2B] transition-all">TRY A FREE DEMO</button>
          </motion.div>
        </div>
      </section>
      <section className="py-12" style={{ backgroundColor: "#fff" }}>
        <div className="container-axi">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-6 rounded-lg text-center border" style={{ borderColor: "#D9D3CB" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#D31C2B" }}><f.icon size={22} className="text-white" /></div>
                <h3 className="text-base font-bold" style={{ color: "#1A1A1A" }}>{f.title}</h3>
                <p className="mt-2 text-sm" style={{ color: "#6B6560" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <h2 className="text-xl font-bold mb-4" style={{ color: "#1A1A1A" }}>Popular Share CFDs</h2>
          <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "#D9D3CB" }}>
            <table className="w-full">
              <thead><tr style={{ backgroundColor: "#F5F2ED" }}>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#6B6560" }}>Symbol</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#6B6560" }}>Company</th>
                <th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#6B6560" }}>Bid</th>
                <th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#6B6560" }}>Ask</th>
                <th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#6B6560" }}>Spread</th>
                <th className="text-right px-4 py-3 text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#6B6560" }}>Change</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody>
                {prices.map(p => (
                  <tr key={p.name} style={{ borderBottom: "1px solid #F5F2ED" }}>
                    <td className="px-4 py-3.5 text-sm font-bold" style={{ color: "#1A1A1A" }}>{p.name}</td>
                    <td className="px-4 py-3.5 text-sm" style={{ color: "#6B6560" }}>{p.full}</td>
                    <td className="px-4 py-3.5 text-right font-mono-axi text-sm">{p.bid.toFixed(2)}</td>
                    <td className="px-4 py-3.5 text-right font-mono-axi text-sm">{p.ask.toFixed(2)}</td>
                    <td className="px-4 py-3.5 text-right"><span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: "rgba(34,169,88,0.1)", color: "#22A958" }}>{p.spread}</span></td>
                    <td className="px-4 py-3.5 text-right text-sm font-semibold" style={{ color: p.change >= 0 ? "#22A958" : "#D31C2B" }}>{p.change >= 0 ? "+" : ""}{p.change.toFixed(2)}%</td>
                    <td className="px-4 py-3.5 text-right"><button className="btn-yellow text-[10px] py-1.5 px-3">Trade</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
