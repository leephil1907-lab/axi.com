import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Bitcoin, TrendingUp, Shield, FileText } from "lucide-react";

const cryptos = [
  { name: "BTCUSD", full: "Bitcoin / USD", bid: 62175.99, ask: 62187.99, spread: 1200, change: 2.34 },
  { name: "ETHUSD", full: "Ethereum / USD", bid: 1738.79, ask: 1740.04, spread: 125, change: 1.89 },
  { name: "LTCUSD", full: "Litecoin / USD", bid: 43.50, ask: 43.68, spread: 18, change: -0.56 },
  { name: "XRPUSD", full: "Ripple / USD", bid: 1.0863, ask: 1.0895, spread: 32, change: 3.45 },
  { name: "BCHUSD", full: "Bitcoin Cash / USD", bid: 234.82, ask: 235.62, spread: 80, change: 1.12 },
  { name: "ADAUSD", full: "Cardano / USD", bid: 0.8524, ask: 0.8542, spread: 18, change: -2.34 },
  { name: "DOTUSD", full: "Polkadot / USD", bid: 5.42, ask: 5.45, spread: 3, change: 0.78 },
  { name: "LINKUSD", full: "Chainlink / USD", bid: 14.25, ask: 14.32, spread: 7, change: 4.56 },
];

const features = [
  { icon: Bitcoin, title: "Trade Crypto CFDs", desc: "Trade Bitcoin, Ethereum and more without a wallet" },
  { icon: Shield, title: "No Wallet Required", desc: "Trade crypto price movements without owning the asset" },
  { icon: TrendingUp, title: "Leverage up to 20:1", desc: "Amplify your crypto trading potential" },
];

export default function CryptoPage() {
  const [prices, setPrices] = useState(cryptos);
  const simulate = useCallback(() => {
    setPrices(prev => prev.map(p => {
      const vol = p.bid > 1000 ? 20 : p.bid > 10 ? 0.5 : 0.01;
      const change = (Math.random() - 0.5) * vol;
      return { ...p, bid: Math.max(0.001, p.bid + change), ask: Math.max(0.001, p.ask + change) };
    }));
  }, []);
  useEffect(() => { const t = setInterval(simulate, 2000); return () => clearInterval(t); }, [simulate]);

  return (
    <div>
      <section className="py-20" style={{ backgroundColor: "#D31C2B" }}>
        <div className="container-axi text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-white">Cryptocurrency Trading</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-white/80 max-w-[600px] mx-auto">Trade Bitcoin, Ethereum and other cryptocurrencies with leverage, without needing a wallet</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="btn-yellow">TRADE CRYPTO</button>
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
          <h2 className="text-xl font-bold mb-4" style={{ color: "#1A1A1A" }}>Cryptocurrency Prices</h2>
          <div className="overflow-x-auto rounded-lg border" style={{ borderColor: "#D9D3CB" }}>
            <table className="w-full">
              <thead><tr style={{ backgroundColor: "#F5F2ED" }}>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#6B6560" }}>Pair</th>
                <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wider font-semibold" style={{ color: "#6B6560" }}>Description</th>
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
                    <td className="px-4 py-3.5 text-right font-mono-axi text-sm">{p.bid >= 1000 ? p.bid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : p.bid.toFixed(4)}</td>
                    <td className="px-4 py-3.5 text-right font-mono-axi text-sm">{p.ask >= 1000 ? p.ask.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : p.ask.toFixed(4)}</td>
                    <td className="px-4 py-3.5 text-right"><span className="text-xs px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: "rgba(34,169,88,0.1)", color: "#22A958" }}>{p.spread}</span></td>
                    <td className="px-4 py-3.5 text-right text-sm font-semibold" style={{ color: p.change >= 0 ? "#22A958" : "#D31C2B" }}>{p.change >= 0 ? "+" : ""}{p.change.toFixed(2)}%</td>
                    <td className="px-4 py-3.5 text-right"><button className="btn-yellow text-[10px] py-1.5 px-3">Trade</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex items-center gap-2 p-4 rounded-lg border" style={{ borderColor: "#D9D3CB", backgroundColor: "#F5F2ED" }}>
            <FileText size={18} style={{ color: "#D31C2B" }} />
            <span className="text-sm" style={{ color: "#6B6560" }}>
              Before trading crypto, please read our{" "}
              <a href="/docs/cryptoasset-product-information.pdf" target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: "#D31C2B" }}>
                Cryptoasset Product Information
              </a>{" "}
              document.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
