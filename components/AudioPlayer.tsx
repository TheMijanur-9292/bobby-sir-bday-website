"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        setShowToast(false);
      })
      .catch(() => {
        // Autoplay policy prevented playback until user interaction
        setShowToast(true);
      });
  }, []);

  const stopMusic = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setPlaying(false);
  }, []);

  const toggle = () => {
    if (playing) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    const audio = new Audio("/audio/birthday.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    // First user gesture triggers playback seamlessly
    const handleFirstGesture = () => {
      startMusic();
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };

    // Try starting on mount
    const timer = setTimeout(() => {
      startMusic();
    }, 800);

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      audio.pause();
      audio.src = "";
    };
  }, [startMusic]);

  return (
    <>
      {/* Toast Prompt */}
      <AnimatePresence>
        {showToast && !playing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-24 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-gold-400/40 shadow-xl text-sm text-white"
          >
            <span className="text-lg animate-bounce">🎉</span>
            <span className="text-gold-200 text-xs sm:text-sm font-medium">
              Tap anywhere to play birthday music!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Party Music Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4, ease: "easeOut" }}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className={`fixed bottom-6 right-5 z-50 h-12 rounded-full flex items-center gap-2.5 px-4 shadow-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${
          playing
            ? "bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white border-amber-400/50 shadow-purple-500/30 animate-pulse"
            : "bg-slate-900/90 text-slate-300 border-white/10 hover:border-gold-400/40 hover:text-gold-300"
        }`}
      >
        <span className="text-lg">{playing ? "🎉" : "🎵"}</span>

        {/* Animated Equalizer */}
        {playing ? (
          <div className="flex items-end gap-1 h-4">
            <span className="w-1 bg-gold-300 rounded-full animate-[bounce_0.4s_ease-in-out_infinite] h-3.5" />
            <span className="w-1 bg-pink-400 rounded-full animate-[bounce_0.5s_ease-in-out_infinite_0.15s] h-4" />
            <span className="w-1 bg-amber-300 rounded-full animate-[bounce_0.35s_ease-in-out_infinite_0.3s] h-2.5" />
          </div>
        ) : (
          <span className="text-xs font-semibold">Play Music</span>
        )}
      </motion.button>
    </>
  );
}
