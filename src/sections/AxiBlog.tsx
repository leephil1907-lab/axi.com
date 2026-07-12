import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const blogPosts = [
  {
    image: "/blog-bitcoin.jpg",
    category: "Cryptocurrencies",
    title: "Bitcoin price predictions 2026-2050: 20 Forecasts, Bull, Base & Bear Cases. Fact-Checked",
    author: "Alex Macris",
  },
  {
    image: "/blog-stoploss.jpg",
    category: "Education",
    title: "What is a stop-loss order and how does it work?",
    author: "Milan Cutkovic",
  },
  {
    image: "/blog-propfirms.jpg",
    category: "Education",
    title: "Best proprietary trading firms and forex prop firms",
    author: "Milan Cutkovic",
  },
  {
    image: "/blog-proptrading.jpg",
    category: "Education",
    title: "What is proprietary trading and how do prop firms work?",
    author: "Milan Cutkovic",
  },
];

export default function AxiBlog() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16" style={{ backgroundColor: "#fff" }}>
      <div className="container-axi">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-10"
          style={{ color: "#1A1A1A" }}
        >
          Axi Blog
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[160px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="inline-block mt-3 text-xs font-medium uppercase tracking-wider" style={{ color: "#D31C2B" }}>
                {post.category}
              </span>
              <h3 className="mt-1 text-sm font-semibold leading-snug line-clamp-3 group-hover:underline" style={{ color: "#1A1A1A" }}>
                {post.title}
              </h3>
              <p className="mt-2 text-xs" style={{ color: "#D31C2B" }}>
                {post.author}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex justify-center mt-8"
        >
          <button className="btn-yellow-pill">Read more</button>
        </motion.div>
      </div>
    </section>
  );
}
