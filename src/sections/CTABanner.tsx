import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20"
      style={{ background: "linear-gradient(135deg, #FF4757 0%, #D31C2B 50%, #B91623 100%)" }}
    >
      <div className="container-axi text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Ready to trade your edge?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mt-3 text-base text-white/80"
        >
          Start trading with a global, award-winning broker.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <button className="px-7 py-3 rounded border-2 border-white text-white text-[11px] font-semibold uppercase tracking-[1.5px] hover:bg-white hover:text-[#D31C2B] transition-all">
            TRY A FREE DEMO
          </button>
          <button className="btn-yellow">OPEN A LIVE ACCOUNT</button>
        </motion.div>
      </div>
    </section>
  );
}
