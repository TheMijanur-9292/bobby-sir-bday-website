"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EMOJIS = ["🎂", "🎉", "🎊", "🎈", "🌟", "✨", "💜", "🥳", "🎁", "🎀", "⭐", "💫"];

interface Particle {
  id: number;
  emoji: string;
  x: number;       // vw %
  delay: number;
  duration: number;
  size: string;
  drift: number;   // horizontal drift px
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    x: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 10 + Math.random() * 14,
    size: ["text-xl", "text-2xl", "text-3xl"][Math.floor(Math.random() * 3)],
    drift: (Math.random() - 0.5) * 120,
  }));
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (!mq.matches) setParticles(makeParticles(22));
    const handler = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
      if (e.matches) setParticles([]);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (reduced || particles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute select-none ${p.size}`}
          style={{ left: `${p.x}vw`, bottom: "-60px" }}
          animate={{
            y: [0, -(window?.innerHeight ?? 900) - 80],
            x: [0, p.drift],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [0, p.drift > 0 ? 30 : -30],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.1, 0.85, 1],
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}
