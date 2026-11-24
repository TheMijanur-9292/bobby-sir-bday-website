"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO } from "@/lib/data";
import { BOBBY_SIR_PHOTO } from "@/lib/bobbySirPhoto";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax: photo drifts up slower than scroll
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      aria-label="Birthday hero"
    >
      {/* Ambient background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-800/20 blur-[120px]" />
        <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full bg-indigo-700/20 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-violet-900/30 blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: Text ───────────────────────────────────────────── */}
          <motion.div
            style={{ y: textY, opacity }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 bg-gold-500/10 text-gold-300 text-sm font-medium mb-6"
            >
              <span>🎂</span>
              <span>Nov 24, 2026</span>
              <span>🎉</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-white">Happy Birthday,</span>
              <br />
              <span className="text-gold-shimmer">Bobby Sir</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
            >
              {HERO.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={onCtaClick}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base sm:text-lg text-black overflow-hidden transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 shadow-gold-glow hover:shadow-gold-glow"
                aria-label="Scroll to wish wall"
              >
                <span className="absolute inset-0 bg-gold-gradient" />
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                <span className="relative">🎁</span>
                <span className="relative">{HERO.ctaLabel}</span>
              </button>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-10 h-px w-40 mx-auto lg:mx-0 bg-gradient-to-r from-transparent via-purple-500/60 to-transparent origin-left"
            />
          </motion.div>

          {/* ── Right: Photo ──────────────────────────────────────────── */}
          <motion.div
            style={{ y: photoY }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              {/* === Orbit ring 1: birthday emojis rotating CW === */}
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full"
                style={{ transformOrigin: "center center" }}
              >
                {["🎂", "🎉", "🎊", "🎈", "⭐", "🎁", "✨", "🌟"].map((emoji, i) => {
                  const angle = (i / 8) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const r = 50; // percent radius
                  const x = 50 + r * Math.cos(rad);
                  const y = 50 + r * Math.sin(rad);
                  return (
                    <span
                      key={i}
                      className="absolute text-lg sm:text-xl md:text-2xl select-none"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {emoji}
                    </span>
                  );
                })}
              </motion.div>

              {/* === Orbit ring 2: balloons rotating CCW (outer) === */}
              <motion.div
                aria-hidden="true"
                animate={{ rotate: -360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                className="absolute w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] md:w-[510px] md:h-[510px] lg:w-[600px] lg:h-[600px] rounded-full"
                style={{ transformOrigin: "center center" }}
              >
                {["🎈", "💜", "🥳", "💫", "🎀", "🌈"].map((emoji, i) => {
                  const angle = (i / 6) * 360 + 30;
                  const rad = (angle * Math.PI) / 180;
                  const r = 50;
                  const x = 50 + r * Math.cos(rad);
                  const y = 50 + r * Math.sin(rad);
                  return (
                    <span
                      key={i}
                      className="absolute text-base sm:text-lg select-none opacity-80"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {emoji}
                    </span>
                  );
                })}
              </motion.div>

              {/* === Pulsing glow rings === */}
              <motion.div
                aria-hidden="true"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.15, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[240px] h-[240px] sm:w-[310px] sm:h-[310px] md:w-[340px] md:h-[340px] lg:w-[410px] lg:h-[410px] rounded-full bg-gradient-to-br from-purple-500/30 via-gold-400/20 to-indigo-600/30 blur-xl"
              />
              <motion.div
                aria-hidden="true"
                animate={{ scale: [1.03, 1, 1.03], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute w-[215px] h-[215px] sm:w-[285px] sm:h-[285px] md:w-[315px] md:h-[315px] lg:w-[385px] lg:h-[385px] rounded-full border border-gold-400/50"
              />

              {/* === Portrait === */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full p-1.5 bg-gradient-to-br from-gold-400 via-purple-500 to-amber-400 shadow-2xl z-10 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-white/20 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={BOBBY_SIR_PHOTO}
                    alt="Bobby Sir"
                    className="w-full h-full object-cover object-center rounded-full"
                    loading="eager"
                  />
                </div>
              </div>

              {/* === Floating badges === */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -right-2 sm:bottom-2 sm:right-0 z-20 bg-gradient-to-br from-gold-400 to-gold-600 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              >
                🎂 Birthday!
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -top-2 -left-2 sm:top-2 sm:left-0 z-20 bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
              >
                🥳 Celebrate!
              </motion.div>

              {/* === Sparkle dots === */}
              {[
                { top: "10%", left: "88%", delay: 0 },
                { top: "80%", left: "85%", delay: 0.6 },
                { top: "85%", left: "12%", delay: 1.2 },
                { top: "15%", left: "10%", delay: 1.8 },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  aria-hidden="true"
                  animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
                  className="absolute w-2.5 h-2.5 rounded-full bg-gold-400 shadow-gold-glow z-20"
                  style={{ top: s.top, left: s.left }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
