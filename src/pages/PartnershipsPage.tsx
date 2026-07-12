import { motion } from "framer-motion";
import { Handshake, TrendingUp, DollarSign, Headphones, Users, Award, FileText } from "lucide-react";

const programs = [
  {
    icon: Users,
    title: "Introducing Broker",
    desc: "Introduce clients to Axi and earn competitive commissions. Perfect for educators, signal providers, and trading community leaders.",
    cta: "BECOME AN IB",
  },
  {
    icon: TrendingUp,
    title: "Affiliate Program",
    desc: "Promote Axi through your website, blog, or social media and earn generous CPA commissions for every qualified trader you refer.",
    cta: "JOIN AFFILIATES",
  },
  {
    icon: DollarSign,
    title: "Funded Trader Program",
    desc: "Axi Select is our capital allocation program. Trade with Axi funds up to $1 million USD. No signup fees. No monthly fees.",
    cta: "JOIN AXI SELECT",
    doc: "/docs/Axi+Select+Terms+of+Service.pdf",
    docLabel: "Axi Select Terms of Service",
  },
];

const benefits = [
  { icon: DollarSign, title: "Competitive commissions", desc: "Industry-leading revenue share and CPA structures" },
  { icon: Headphones, title: "Dedicated support", desc: "Personal account manager to help grow your business" },
  { icon: Award, title: "Marketing tools", desc: "Banners, landing pages, and tracking tools provided" },
  { icon: Handshake, title: "Trusted brand", desc: "Partner with a globally recognised, award-winning broker" },
];

export default function PartnershipsPage() {
  return (
    <div>
      <section className="py-20" style={{ backgroundColor: "#D31C2B" }}>
        <div className="container-axi text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold text-white">
            Partnerships
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-white/80 max-w-[600px] mx-auto">
            Partner with a globally recognised broker and unlock new revenue opportunities
          </motion.p>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#fff" }}>
        <div className="container-axi">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((prog, idx) => (
              <motion.div
                key={prog.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="p-8 rounded-lg border hover:shadow-lg transition-shadow flex flex-col"
                style={{ borderColor: "#D9D3CB", backgroundColor: "#fff" }}
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "#D31C2B" }}>
                  <prog.icon size={28} className="text-white" />
                </div>
                <h2 className="text-xl font-bold" style={{ color: "#1A1A1A" }}>{prog.title}</h2>
                <p className="mt-3 text-sm leading-relaxed flex-1" style={{ color: "#6B6560" }}>{prog.desc}</p>
                {prog.doc && (
                  <a href={prog.doc} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-1.5 text-xs underline" style={{ color: "#D31C2B" }}>
                    <FileText size={14} />{prog.docLabel}
                  </a>
                )}
                <button className="btn-yellow mt-6">{prog.cta}</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#EDE8E0" }}>
        <div className="container-axi">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4" style={{ color: "#1A1A1A" }}>
            Why partner with Axi?
          </h2>
          <p className="text-center text-base mb-10 max-w-[600px] mx-auto" style={{ color: "#6B6560" }}>
            Join thousands of partners worldwide who trust Axi to deliver exceptional trading services to their clients
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-lg text-center"
                style={{ backgroundColor: "#fff", border: "1px solid #D9D3CB" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#D31C2B" }}>
                  <b.icon size={22} className="text-white" />
                </div>
                <h3 className="text-base font-bold" style={{ color: "#1A1A1A" }}>{b.title}</h3>
                <p className="mt-2 text-sm" style={{ color: "#6B6560" }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "linear-gradient(135deg, #FF4757 0%, #D31C2B 50%, #B91623 100%)" }}>
        <div className="container-axi text-center">
          <h2 className="text-3xl font-bold text-white">Ready to partner with us?</h2>
          <p className="mt-3 text-base text-white/80">Apply today and start earning with a globally recognised broker</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="btn-yellow">APPLY NOW</button>
            <button className="px-7 py-3 rounded border-2 border-white text-white text-[11px] font-semibold uppercase tracking-[1.5px] hover:bg-white hover:text-[#D31C2B] transition-all">
              CONTACT US
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
