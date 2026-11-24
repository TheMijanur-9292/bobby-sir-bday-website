"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";

export default function TeamLetter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [claps, setClaps] = useState(0);
  const [isClapped, setIsClapped] = useState(false);

  const handleCelebrate = () => {
    setClaps((prev) => prev + 1);
    setIsClapped(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.75 },
        colors: ["#fbbf24", "#a855f7", "#ec4899", "#38bdf8"],
      });
    } catch {
      // Ignore if confetti context isn't supported
    }

    setTimeout(() => setIsClapped(false), 300);
  };

  return (
    <section
      id="team-letter"
      ref={ref}
      className="section-padding px-4 sm:px-6 lg:px-8 relative z-10"
      aria-labelledby="letter-heading"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-sm font-medium mb-4">
            A Special Note For You
          </span>
          <h2
            id="letter-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            A Letter to{" "}
            <span className="text-gold-shimmer">Bobby Sir</span>
          </h2>
        </motion.div>

        {/* Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-gradient-to-b from-slate-900/90 via-[#13112a]/95 to-slate-900/90 border border-gold-400/30 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {/* Subtle Ambient Light Gradients */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl" />

          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 text-gold-400/40 text-xl font-serif select-none">✦</div>
          <div className="absolute top-4 right-4 text-gold-400/40 text-xl font-serif select-none">✦</div>
          <div className="absolute bottom-4 left-4 text-gold-400/40 text-xl font-serif select-none">✦</div>
          <div className="absolute bottom-4 right-4 text-gold-400/40 text-xl font-serif select-none">✦</div>

          {/* Wax Seal / Stamp Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-400/50 flex items-center justify-center text-2xl shadow-gold-glow">
                ✉️
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                  Official Appreciation
                </p>
                <p className="text-slate-400 text-xs">From: The IT Team</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300">
                Nov 24, 2026
              </span>
            </div>
          </div>

          {/* Letter Body */}
          <div className="space-y-6 text-slate-200 text-base sm:text-lg leading-relaxed font-light font-body">
            <p className="font-display text-xl sm:text-2xl text-gold-300 font-medium">
              Dear Bobby Sir,
            </p>

            <p>
              Great managers manage tasks, but true leaders inspire minds, build character, and bring out the best in people. On this special day, we wanted to take a moment to express our deepest gratitude for being that true leader to all of us.
            </p>

            <p>
              Under your guidance, challenging deadlines turn into shared victories, and complex problems become valuable learning opportunities. Your calmness in high-pressure moments, your technical clarity, and your unwavering belief in our abilities give the entire IT team the confidence to innovate without fear.
            </p>

            <p>
              Thank you for always standing by us, for listening with empathy, and for creating a work culture grounded in mutual respect and continuous growth. Working alongside you isn&apos;t just a job—it is a continuous masterclass in leadership and engineering excellence.
            </p>

            <p className="text-white font-normal pt-2">
              May this upcoming year bring you boundless happiness, great health, peace of mind, and remarkable success in all your endeavors.
            </p>
          </div>

          {/* Sign-off & Celebration Button */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-1">
                With highest respect & warmth,
              </p>
              <p className="font-display text-2xl font-bold text-gold-shimmer">
                Your IT Team
              </p>
            </div>

            {/* Interactive Celebration Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCelebrate}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${
                isClapped
                  ? "bg-gold-400 text-black scale-105"
                  : "bg-gold-500/15 border border-gold-400/40 text-gold-300 hover:bg-gold-500/25 hover:border-gold-400/70"
              }`}
            >
              <span>👏</span>
              <span>Send Cheers</span>
              {claps > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-gold-400 text-slate-950 text-xs font-bold">
                  +{claps}
                </span>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
