import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ManCityPartnership() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partnership" ref={ref} className="relative w-full overflow-hidden" style={{ backgroundColor: "#F5F2ED" }}>
      <div className="container-axi flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 py-16 md:py-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#1A1A1A" }}>
            A winning partnership
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#6B6560" }}>
            We're proud to be Official Online Trading Partner of Manchester City Football Club.
          </p>
          <button className="btn-yellow mt-6">PASSION TO PERFORM</button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full md:w-1/2"
        >
          <img
            src="/man-city-bg.jpg"
            alt="Manchester City Partnership"
            className="w-full h-[250px] md:h-[350px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
