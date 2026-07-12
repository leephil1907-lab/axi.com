import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const awards = [
  { image: "/award-cfd-2021.png", alt: "Best CFD Provider 2021" },
  { image: "/award-cfd-2022.png", alt: "Best CFD Provider 2022" },
  { image: "/award-forex-2023.png", alt: "Best Forex Provider 2023" },
  { image: "/award-platform-2023.png", alt: "Best Forex Trading Platform 2023" },
];

export default function Awards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="awards" ref={ref} className="py-20" style={{ backgroundColor: "#EDE8E0" }}>
      <div className="container-axi">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-[32px] font-bold" style={{ color: "#D31C2B" }}>
            24/5 award-winning service.
          </h2>
          <h3 className="text-2xl md:text-[32px] font-bold" style={{ color: "#1A1A1A" }}>
            100% committed to you.
          </h3>
          <p className="mt-4 text-base max-w-[700px] mx-auto" style={{ color: "#6B6560" }}>
            We are proud of our global, award-winning** service built on transparency, reliability, and excellent customer service
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12">
          {awards.map((award, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <img src={award.image} alt={award.alt} className="w-[100px] md:w-[130px] h-auto" />
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: "#9B9590" }}>
          ** Axi Group of companies
        </p>
      </div>
    </section>
  );
}
