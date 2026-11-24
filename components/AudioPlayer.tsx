"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Upbeat, festive Party Birthday arrangement (130 BPM)
interface AudioNote {
  time: number; // in beats (1 beat = 0.45s)
  dur: number;
  pitch: number; // Hz
  type: "melody" | "chord" | "bass" | "beat";
}

const BEAT_DUR = 0.44; // 136 BPM (Lively, cheerful, celebratory tempo)

// Notes frequencies (Hz)
const N = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
};

// Generate cheerful multi-track party song events
function generatePartySong(): AudioNote[] {
  const events: AudioNote[] = [];

  // 1. Upbeat Melody: "Happy Birthday to you..."
  const melodyEvents: { beat: number; dur: number; freq: number }[] = [
    // Phrase 1: Happy Birthday to you
    { beat: 0.0, dur: 0.7, freq: N.D4 },
    { beat: 0.75, dur: 0.7, freq: N.D4 },
    { beat: 1.5, dur: 1.2, freq: N.E4 },
    { beat: 3.0, dur: 1.2, freq: N.D4 },
    { beat: 4.5, dur: 1.2, freq: N.G4 },
    { beat: 6.0, dur: 2.2, freq: 369.99 }, // F#4

    // Phrase 2: Happy Birthday to you
    { beat: 8.5, dur: 0.7, freq: N.D4 },
    { beat: 9.25, dur: 0.7, freq: N.D4 },
    { beat: 10.0, dur: 1.2, freq: N.E4 },
    { beat: 11.5, dur: 1.2, freq: N.D4 },
    { beat: 13.0, dur: 1.2, freq: N.A4 },
    { beat: 14.5, dur: 2.2, freq: N.G4 },

    // Phrase 3: Happy Birthday Dear Bobby Sir
    { beat: 17.0, dur: 0.7, freq: N.D4 },
    { beat: 17.75, dur: 0.7, freq: N.D4 },
    { beat: 18.5, dur: 1.2, freq: N.D5 },
    { beat: 20.0, dur: 1.2, freq: N.B4 },
    { beat: 21.5, dur: 1.2, freq: N.G4 },
    { beat: 23.0, dur: 1.2, freq: 369.99 }, // F#4
    { beat: 24.5, dur: 2.2, freq: N.E4 },

    // Phrase 4: Happy Birthday to you! (Big cheerful finish)
    { beat: 27.0, dur: 0.7, freq: N.C5 },
    { beat: 27.75, dur: 0.7, freq: N.C5 },
    { beat: 28.5, dur: 1.2, freq: N.B4 },
    { beat: 30.0, dur: 1.2, freq: N.G4 },
    { beat: 31.5, dur: 1.2, freq: N.A4 },
    { beat: 33.0, dur: 3.0, freq: N.G4 },
  ];

  melodyEvents.forEach((m) => {
    events.push({ time: m.beat, dur: m.dur, pitch: m.freq, type: "melody" });
  });

  // 2. Bouncy Bassline & Celebration Chords (adds punch, groove, energy)
  const totalBeats = 37;
  for (let b = 0; b < totalBeats; b += 1.5) {
    // Punchy rhythmic bass note
    let bassPitch = N.G3;
    if (b >= 6 && b < 14) bassPitch = N.D3;
    else if (b >= 24 && b < 28) bassPitch = N.C3;
    else if (b >= 28 && b < 32) bassPitch = N.G3;
    else if (b >= 32) bassPitch = N.D3;

    events.push({ time: b, dur: 0.6, pitch: bassPitch, type: "bass" });

    // Upbeat chord comp on off-beats
    if (b % 3 !== 0) {
      events.push({ time: b, dur: 0.5, pitch: bassPitch * 1.5, type: "chord" });
      events.push({ time: b, dur: 0.5, pitch: bassPitch * 2.0, type: "chord" });
    }

    // Party clap / percussion accents
    if (b % 3 === 0) {
      events.push({ time: b, dur: 0.1, pitch: 0, type: "beat" });
    }
  }

  return events;
}

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout[]>([]);
  const isPlayingRef = useRef(false);

  // Play rich, joyful sound synthesizers
  const playSound = useCallback((ctx: AudioContext, note: AudioNote, startTime: number) => {
    const durSec = note.dur * BEAT_DUR;

    if (note.type === "beat") {
      // Crisp celebratory snare/clap burst
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 1200;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(startTime);
      return;
    }

    if (note.type === "melody") {
      // Bright, cheerful festive synth lead with warm chime harmonic
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(note.pitch, startTime);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(note.pitch * 2, startTime); // 1 octave above sparkle

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + Math.max(durSec * 1.3, 0.4));

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc2.start(startTime);
      osc.stop(startTime + durSec * 1.4);
      osc2.stop(startTime + durSec * 1.4);
    } else if (note.type === "bass") {
      // Punchy, joyful bouncy bass
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(note.pitch, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + Math.max(durSec, 0.3));

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + durSec + 0.05);
    } else if (note.type === "chord") {
      // Warm upbeat brass/piano chord stab
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(note.pitch, startTime);

      gain.gain.setValueAtTime(0.05, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + durSec);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + durSec + 0.05);
    }
  }, []);

  const scheduleSongLoop = useCallback(() => {
    if (!isPlayingRef.current) return;

    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const song = generatePartySong();
    const startTime = ctx.currentTime + 0.05;
    const totalDurationMs = 38 * BEAT_DUR * 1000;

    song.forEach((n) => {
      playSound(ctx, n, startTime + n.time * BEAT_DUR);
    });

    const loopTimer = setTimeout(() => {
      if (isPlayingRef.current) {
        scheduleSongLoop();
      }
    }, totalDurationMs);

    timerRef.current.push(loopTimer);
  }, [playSound]);

  const startMusic = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      isPlayingRef.current = true;
      setPlaying(true);
      setShowToast(false);
      scheduleSongLoop();
    } catch {
      // Fallback
    }
  }, [scheduleSongLoop]);

  const stopMusic = useCallback(() => {
    isPlayingRef.current = false;
    setPlaying(false);
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
  }, []);

  const toggle = () => {
    if (playing) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (!isPlayingRef.current) {
        startMusic();
      }
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
    };

    const autoTimer = setTimeout(() => {
      try {
        startMusic();
      } catch {
        setShowToast(true);
      }
    }, 1000);

    window.addEventListener("click", handleFirstUserInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstUserInteraction, { once: true });

    return () => {
      clearTimeout(autoTimer);
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
      stopMusic();
    };
  }, [startMusic, stopMusic]);

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
              Tap anywhere to play party music!
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
        aria-label={playing ? "Pause party music" : "Play party music"}
        className={`fixed bottom-6 right-5 z-50 h-12 rounded-full flex items-center gap-2 px-4 shadow-xl border transition-all duration-300 hover:scale-105 active:scale-95 ${
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
          <span className="text-xs font-semibold">Party Music</span>
        )}
      </motion.button>
    </>
  );
}
