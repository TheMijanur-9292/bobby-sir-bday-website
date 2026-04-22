"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { WISHES } from "@/lib/data";

// Lazy-load confetti only on client, zero bundle cost on server
const launchConfetti = async () => {
  const confetti = (await import("canvas-confetti")).default;
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.55 },
    colors: ["#a855f7", "#fbbf24", "#c084fc", "#fde68a", "#7c3aed", "#f59e0b"],
    zIndex: 9999,
  });
  // Second burst for extra celebration
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 50,
      origin: { x: 0, y: 0.6 },
      colors: ["#a855f7", "#fbbf24", "#c084fc"],
      zIndex: 9999,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 50,
      origin: { x: 1, y: 0.6 },
      colors: ["#a855f7", "#fbbf24", "#fde68a"],
      zIndex: 9999,
    });
  }, 300);
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const VISIBLE_COUNT = 8;

export default function WishWall() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [wishes, setWishes] = useState(WISHES);
  const [key, setKey] = useState(0);
  const [confettiFired, setConfettiFired] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Fire confetti once when section enters viewport
  useEffect(() => {
    if (inView && !confettiFired && !prefersReduced) {
      setConfettiFired(true);
      launchConfetti();
    }
  }, [inView, confettiFired, prefersReduced]);

  const handleShuffle = useCallback(() => {
    setWishes((prev) => shuffle(prev));
    setKey((k) => k + 1);
    if (!prefersReduced) launchConfetti();
  }, [prefersReduced]);

  const visible = wishes.slice(0, VISIBLE_COUNT); // shows all 8

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.3 } },
  };

  return (
    <section
      ref={ref}
      id="wish-wall"
      className="section-padding px-4 sm:px-6 lg:px-8 relative z-10"
      aria-labelledby="wishwall-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold-400/40 bg-gold-500/10 text-gold-300 text-sm font-semibold mb-4 tracking-wide">
            🎊 8 Hearts · 1 Wish · Infinite Gratitude
          </span>
          <h2
            id="wishwall-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Words From the{" "}
            <span className="text-gold-shimmer">Team</span>
          </h2>

        </motion.div>

        {/* Shuffle button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <button
            onClick={handleShuffle}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-sm font-medium hover:bg-purple-500/20 hover:border-purple-400/60 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
            aria-label="Shuffle wishes"
          >
            <motion.span
              animate={{ rotate: 0 }}
              whileTap={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
              className="inline-block"
            >
              🔀
            </motion.span>
            <span>Shuffle Wishes</span>
          </button>
        </motion.div>

        {/* Wish cards grid — 4 columns on desktop → 2 on tablet → 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout" key={key}>
            {visible.map((wish, i) => (
              <motion.article
                key={`${wish.id}-${key}`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="group relative rounded-2xl border border-white/10 bg-card-gradient backdrop-blur-sm p-6 shadow-card overflow-hidden"
              >
                {/* Quote mark */}
                <div
                  aria-hidden="true"
                  className="absolute top-4 right-5 text-5xl font-serif text-purple-500/20 leading-none select-none pointer-events-none"
                >
                  "
                </div>

                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-purple-400/30"
                />

                {/* Message */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5 relative z-10">
                  {wish.message}
                </p>

                {/* Name */}
                <div className="flex items-center gap-2 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-gold-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {wish.name[0]}
                  </div>
                  <span className="text-gold-400 text-xs font-semibold tracking-wide">
                    — {wish.name} {wish.emoji}
                  </span>
                </div>

                {/* Bottom left accent */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-gold-400 transition-all duration-500 rounded-b-2xl"
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>


      </div>
    </section>
  );
}
