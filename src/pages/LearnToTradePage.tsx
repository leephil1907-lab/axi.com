import { motion } from "framer-motion";
import { BookOpen, Video, Users, Award, FileText, GraduationCap } from "lucide-react";

const resources = [
  {
    icon: BookOpen,
    title: "Axi Academy",
    desc: "Free online courses covering everything from forex basics to advanced trading strategies. Learn at your own pace with expert-led content.",
    cta: "EXPLORE ACADEMY",
  },
  {
    icon: FileText,
    title: "Free eBooks",
    desc: "Download our comprehensive library of trading eBooks. From technical analysis guides to risk management strategies, build your knowledge foundation.",
    cta: "DOWNLOAD EBOOKS",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    desc: "Watch step-by-step video tutorials on platform navigation, chart analysis, and trading strategies from industry professionals.",
    cta: "WATCH VIDEOS",
  },
  {
    icon: Users,
    title: "Webinars",
    desc: "Join live trading webinars hosted by market experts. Get real-time market analysis, trading insights, and have your questions answered.",
    cta: "JOIN WEBINARS",
  },
  {
    icon: Award,
    title: "Trading Guides",
    desc: "In-depth guides on forex, CFDs, technical analysis, fundamental analysis, and risk management. Written by professional traders.",
    cta: "READ GUIDES",
  },
  {
    icon: GraduationCap,
    title: "Glossary",
    desc: "Master trading terminology with our comprehensive glossary. From 'Ask Price' to 'Yield', understand every term used in financial markets.",
    cta: "VIEW GLOSSARY",
  },
];

const beginnerSteps = [
  { step: "1", title: "Learn the basics", desc: "Understand what forex and CFD trading is, how markets work, and key terminology" },
  { step: "2", title: "Open a demo account", desc: "Practice trading with $50,000 in virtual funds. Risk-free environment to test strategies" },
  { step: "3", title: "Develop your strategy", desc: "Learn technical and fundamental analysis to build a trading approach that works for you" },
  { step: "4", title: "Go live", desc: "When you're ready, open a live account and start trading with real funds from just $5" },
];

export default function LearnToTradePage() {
  return (
    <div>
      <section className="py-20" style={{ backgroundColor: "#D31C2B" }}>
        <div className="container-axi text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-white">
            Learn to Trade
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-white/80 max-w-[600px] mx-auto">
            Free education, expert resources, and powerful tools to help you become a better trader
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="btn-yellow">AXI ACADEMY</button>
            <button className="px-7 py-3 rounded border-2 border-white text-white text-[11px] font-semibold uppercase tracking-[1.5px] hover:bg-white hover:text-[#D31C2B] transition-all">
              FREE EBOOKS
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#EDE8E0" }}>
        <div className="container-axi">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#1A1A1A" }}>
                Committed to your long-term success
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "#6B6560" }}>
                Fundamental tools, training resources, trading education and expert coaching to help you continuously improve your trading performance.
              </p>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "#6B6560" }}>
                Whether you're a complete beginner or an experienced trader, our comprehensive education hub has everything you need to sharpen your skills.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex justify-center">
              <img src="/education-illustration.png" alt="Education" className="max-w-full rounded-lg" style={{ maxHeight: "350px" }} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#fff" }}>
        <div className="container-axi">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "#1A1A1A" }}>
            Education Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, idx) => (
              <motion.div
                key={res.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-lg border hover:shadow-md transition-shadow"
                style={{ borderColor: "#D9D3CB", backgroundColor: "#fff" }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "#D31C2B" }}>
                  <res.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold" style={{ color: "#1A1A1A" }}>{res.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6B6560" }}>{res.desc}</p>
                <button className="mt-4 text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: "#D31C2B" }}>
                  {res.cta} &rarr;
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#EDE8E0" }}>
        <div className="container-axi">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10" style={{ color: "#1A1A1A" }}>
            Your journey to becoming a trader
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beginnerSteps.map((s, idx) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold text-white" style={{ backgroundColor: "#D31C2B" }}>
                  {s.step}
                </div>
                <h3 className="text-base font-bold" style={{ color: "#1A1A1A" }}>{s.title}</h3>
                <p className="mt-2 text-sm" style={{ color: "#6B6560" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
