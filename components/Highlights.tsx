"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HIGHLIGHTS } from "@/lib/data";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const titleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Highlights() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="section-padding px-4 sm:px-6 lg:px-8 relative z-10"
      aria-labelledby="highlights-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section heading */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-sm font-medium mb-4">
            What you mean to us
          </span>
          <h2
            id="highlights-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            Thank You for{" "}
            <span className="text-gold-shimmer">Everything</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HIGHLIGHTS.map((item, i) => (
            <motion.article
              key={item.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border border-white/10 bg-card-gradient backdrop-blur-sm p-6 shadow-card overflow-hidden cursor-default"
            >
              {/* Hover shimmer border */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(251,191,36,0.2), rgba(168,85,247,0.1))",
                }}
              />

              {/* Icon */}
              <div className="text-4xl mb-4">{item.icon}</div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-gold-300 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 via-gold-400 to-purple-500 transition-all duration-500 rounded-b-2xl"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
