"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Free royalty-free birthday piano track (Pixabay license – free to use) ──
// You can replace this URL with any .mp3 hosted online.
const MUSIC_URL =
  "https://cdn.pixabay.com/audio/2024/11/14/audio_b9b737be4b.mp3";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying]       = useState(false);
  const [blocked, setBlocked]       = useState(false); // autoplay was blocked
  const [visible, setVisible]       = useState(false); // hint toast
  const [reduced, setReduced]       = useState(false);
  const [loaded, setLoaded]         = useState(false);

  // Detect reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  // Create audio element on mount and attempt autoplay
  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop   = true;
    audio.volume = 0.25;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setLoaded(true));

    // Try autoplay after a short delay (some browsers allow it after first paint)
    const timer = setTimeout(() => {
      audio.play()
        .then(() => {
          setPlaying(true);
          setBlocked(false);
        })
        .catch(() => {
          // Autoplay blocked — show toast hint
          setBlocked(true);
          setVisible(true);
          setTimeout(() => setVisible(false), 5000);
        });
    }, 1200);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => {
        setPlaying(true);
        setBlocked(false);
        setVisible(false);
      });
    }
  };

  return (
    <>
      {/* ── Hint toast when autoplay is blocked ── */}
      <AnimatePresence>
        {visible && blocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-24 right-4 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 backdrop-blur border border-white/10 shadow-lg text-sm text-white"
          >
            <span className="text-base">🎵</span>
            <span>Tap the music button to play</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating music button ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4, ease: "easeOut" }}
        onClick={toggle}
        aria-label={playing ? "Mute background music" : "Play background music"}
        className="fixed bottom-6 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400 transition-all duration-300 hover:scale-110"
        style={{
          background: playing
            ? "linear-gradient(135deg, #7c3aed, #a855f7)"
            : "rgba(30,27,75,0.85)",
          border: playing ? "2px solid rgba(251,191,36,0.5)" : "2px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Pulsing ring when playing */}
        {playing && !reduced && (
          <motion.span
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-purple-500/30"
            aria-hidden="true"
          />
        )}

        {/* Icon */}
        <span className="relative text-xl select-none">
          {playing ? "🎵" : "🔇"}
        </span>
      </motion.button>
    </>
  );
}
