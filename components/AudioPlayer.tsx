"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userManuallyPausedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Immediate attempt to play automatically on load
    const startAudio = () => {
      if (userManuallyPausedRef.current) return;
      audio
        .play()
        .then(() => {
          removeGestureListeners();
        })
        .catch(() => {
          // Autoplay was blocked by browser policy; wait for first user gesture
        });
    };

    startAudio();

    // Interaction events that browsers accept as user activation for audio
    const interactionEvents = [
      "click",
      "touchstart",
      "touchend",
      "pointerdown",
      "keydown",
    ];

    const handleUserGesture = () => {
      if (userManuallyPausedRef.current) {
        removeGestureListeners();
        return;
      }
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            removeGestureListeners();
          })
          .catch(() => {});
      } else {
        removeGestureListeners();
      }
    };

    const removeGestureListeners = () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserGesture, true);
        document.removeEventListener(evt, handleUserGesture, true);
      });
    };

    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserGesture, { capture: true, passive: true });
      document.addEventListener(evt, handleUserGesture, { capture: true, passive: true });
    });

    return () => {
      removeGestureListeners();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userManuallyPausedRef.current = false;
      audio.play().catch(console.error);
    } else {
      userManuallyPausedRef.current = true;
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/birthday.mp3"
        loop
        preload="auto"
        autoPlay
        playsInline
      />
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className={`fixed top-5 left-4 sm:left-auto sm:right-6 sm:top-6 z-50 h-11 sm:h-12 rounded-full flex items-center gap-2.5 px-3.5 sm:px-4 shadow-xl border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
          isPlaying
            ? "bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-amber-500/90 text-white border-amber-400/50 shadow-purple-500/30"
            : "bg-slate-900/85 text-slate-300 border-white/15 hover:border-gold-400/40 hover:text-gold-300"
        }`}
      >
        <span className="text-base sm:text-lg">{isPlaying ? "🎉" : "🎵"}</span>

        {/* Animated Equalizer when playing */}
        {isPlaying ? (
          <div className="flex items-end gap-1 h-3.5">
            <span className="w-1 bg-gold-300 rounded-full animate-[bounce_0.4s_ease-in-out_infinite] h-3" />
            <span className="w-1 bg-pink-400 rounded-full animate-[bounce_0.5s_ease-in-out_infinite_0.15s] h-3.5" />
            <span className="w-1 bg-amber-300 rounded-full animate-[bounce_0.35s_ease-in-out_infinite_0.3s] h-2.5" />
          </div>
        ) : (
          <span className="text-xs font-medium">Music Off</span>
        )}
      </motion.button>
    </>
  );
}
