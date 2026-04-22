"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TEAM_PHOTOS } from "@/lib/data";

const EMOJI_FALLBACKS = ["📸", "🎉", "🌟", "💼", "🤝"];

function PhotoCard({
  src,
  alt,
  caption,
  index,
  onClick,
}: {
  src: string;
  alt: string;
  caption?: string;
  index: number;
  onClick: () => void;
}) {
  const [error, setError] = useState(false);

  return (
    <div
      className="relative aspect-[4/3] w-full bg-slate-800 rounded-2xl overflow-hidden"
      onClick={onClick}
    >
      {error ? (
        // Graceful fallback when image is missing or not yet added
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 gap-3">
          <span className="text-5xl">{EMOJI_FALLBACKS[index % EMOJI_FALLBACKS.length]}</span>
          <span className="text-slate-500 text-sm text-center px-4">
            Add your photo to{" "}
            <code className="text-purple-400 text-xs">/public/photos/{src.split("/").pop()}</code>
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setError(true)}
          unoptimized
        />
      )}

      {/* Overlay */}
      {!error && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <p className="text-white text-sm font-medium">{caption}</p>
            </div>
          )}
        </>
      )}

      {/* Expand icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm">
        ⛶
      </div>
    </div>
  );
}

export default function PhotoGallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      className="section-padding px-4 sm:px-6 lg:px-8 relative z-10"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold-400/40 bg-gold-500/10 text-gold-300 text-sm font-medium mb-4">
            Memories together
          </span>
          <h2
            id="gallery-heading"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          >
            Our Team,{" "}
            <span className="text-gold-shimmer">Our Story</span>
          </h2>
        </motion.div>

        {/* Mobile: vertical stack | tablet+: masonry-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {TEAM_PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-card ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
              onClick={() => setLightbox(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightbox(i)}
              aria-label={`View photo: ${photo.alt}`}
            >
              <PhotoCard
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                index={i}
                onClick={() => setLightbox(i)}
              />
            </motion.div>
          ))}
        </div>

        {/* Decorative separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent origin-center"
        />
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full bg-slate-900">
                <Image
                  src={TEAM_PHOTOS[lightbox].src}
                  alt={TEAM_PHOTOS[lightbox].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain"
                />
              </div>

              {TEAM_PHOTOS[lightbox].caption && (
                <div className="bg-slate-900/90 px-6 py-4 text-center">
                  <p className="text-white text-sm">{TEAM_PHOTOS[lightbox].caption}</p>
                </div>
              )}

              {/* Navigation */}
              <button
                onClick={() => setLightbox((lightbox - 1 + TEAM_PHOTOS.length) % TEAM_PHOTOS.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                onClick={() => setLightbox((lightbox + 1) % TEAM_PHOTOS.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
                aria-label="Next photo"
              >
                ›
              </button>

              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white text-lg flex items-center justify-center hover:bg-black/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400"
                aria-label="Close lightbox"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
