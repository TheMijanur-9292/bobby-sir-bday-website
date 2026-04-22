"use client";

import { motion } from "framer-motion";
import { FOOTER } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 mt-8" role="contentinfo">
      {/* Top glow line */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">

        {/* Animated cake */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-5xl mb-6 select-none"
          aria-hidden="true"
        >
          🎂
        </motion.div>

        {/* Main message */}
        <p className="font-display text-2xl sm:text-3xl font-semibold text-white mb-3">
          Happy Birthday,{" "}
          <span className="text-gold-shimmer">Bobby Sir!</span>
        </p>

        <p className="text-slate-400 text-sm sm:text-base max-w-sm mx-auto mb-8">
          May this year bring you everything you deserve — and more.
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500/50" />
          <span className="text-purple-400/60 text-xs">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500/50" />
        </div>

        {/* Attribution */}
        <p className="text-purple-300 text-sm font-medium">
          With love, from your{" "}
          <strong className="text-purple-200">{FOOTER.team}</strong>
        </p>

        <p className="text-slate-600 text-xs mt-2">{FOOTER.date}</p>
      </div>
    </footer>
  );
}
