import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    heading: "Trade with Axi funds up to $1 million USD",
    subtext: "Axi has launched a capital allocation program. No registration fees. No monthly fees. 100% FREE",
    linkText: "Join the Axi Select community",
    ctaText: "JOIN NOW",
    image: "/hero-trader.jpg",
  },
  {
    id: 2,
    heading: "650+ markets. One app.",
    subtext: "Trade 650+ assets across forex, crypto, commodities, share CFDs, ETFs and global indices without switching apps.",
    ctaText: "Download now",
    secondaryCta: "Learn more",
    bg: "#EDE8E0",
    light: true,
    phone: true,
  },
  {
    id: 3,
    heading: "YOUR EDGE IN THE MARKETS",
    subtext: "SPREADS ON GOLD $0.16, BTC $15",
    ctaText: "ACCESS TIGHT SPREADS",
    bg: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
  },
  {
    id: 4,
    heading: "POWER UP YOUR TRADING STRATEGY WITH AI",
    subtext: "",
    ctaText: "LEARN MORE",
    bg: "linear-gradient(135deg, #3EBDB0 0%, #2A9D8F 50%, #1E7A6E 100%)",
    teal: true,
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[current];

  return (
    <section className="relative w-full h-[480px] md:h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex items-center"
          style={slide.bg ? { background: slide.bg } : undefined}
        >
          {/* Background Image (for slide 1) */}
          {!slide.bg && !slide.light && (
            <div className="absolute inset-0">
              <img src={slide.image} alt="" className="w-full h-full object-cover object-right" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.2) 70%, transparent 100%)" }} />
            </div>
          )}

          {/* 650+ Markets Slide - special layout with phone */}
          {slide.phone ? (
            <div className="relative z-10 container-axi flex flex-col md:flex-row items-center h-full">
              <div className="w-full md:w-1/2 pt-8 md:pt-0">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0, duration: 0.5 }}
                  className="text-3xl md:text-5xl font-bold leading-tight" style={{ color: "#1A1A1A" }}
                >
                  {slide.heading}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
                  className="mt-4 text-base leading-relaxed" style={{ color: "#6B6560" }}
                >
                  {slide.subtext}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-6 flex flex-wrap gap-3"
                >
                  <button className="btn-yellow">{slide.ctaText}</button>
                  {slide.secondaryCta && (
                    <button className="px-6 py-3 rounded border text-[11px] font-semibold uppercase tracking-[1.5px] transition-all" style={{ borderColor: "#1A1A1A", color: "#1A1A1A" }}>
                      {slide.secondaryCta}
                    </button>
                  )}
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
                className="w-full md:w-1/2 flex justify-center md:justify-end"
              >
                <img src="/mobile-app.jpg" alt="Axi Mobile App" className="max-w-[250px] md:max-w-[300px] h-auto rounded-lg shadow-2xl" />
              </motion.div>
            </div>
          ) : (
            /* Standard slide layout */
            <div className="relative z-10 container-axi flex items-center h-full">
              <div className="max-w-[600px]">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0, duration: 0.5 }}
                  className={`text-3xl md:text-5xl font-bold leading-tight ${slide.teal ? "text-[#F5C842]" : slide.light ? "" : "text-white"}`}
                  style={slide.light ? { color: "#1A1A1A" } : {}}
                >
                  {slide.heading}
                </motion.h1>
                {slide.subtext && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
                    className={`mt-4 text-base leading-relaxed ${slide.teal ? "text-white/90" : slide.light ? "" : "text-white/80"}`}
                    style={slide.light ? { color: "#6B6560" } : {}}
                  >
                    {slide.subtext}
                  </motion.p>
                )}
                {slide.linkText && (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                    href="#" className="inline-block mt-4 text-sm text-white underline hover:no-underline"
                  >
                    {slide.linkText}
                  </motion.a>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}
                  className="mt-6 flex flex-wrap gap-3"
                >
                  {slide.teal ? (
                    <button className="px-7 py-3 rounded border-2 border-[#F5C842] text-[#F5C842] text-[11px] font-semibold uppercase tracking-[1.5px] hover:bg-[#F5C842] hover:text-black transition-all">
                      {slide.ctaText}
                    </button>
                  ) : (
                    <button className="btn-yellow-pill">{slide.ctaText}</button>
                  )}
                  {slide.secondaryCta && (
                    <button className="px-6 py-3 rounded border-2 border-white text-white text-[11px] font-semibold uppercase tracking-[1.5px] hover:bg-white hover:text-black transition-all">
                      {slide.secondaryCta}
                    </button>
                  )}
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx} onClick={() => setCurrent(idx)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{ backgroundColor: idx === current ? (slides[idx].light ? "#1A1A1A" : "white") : (slides[idx].light ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)") }}
          />
        ))}
      </div>
    </section>
  );
}
