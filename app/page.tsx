"use client";

import { useCallback } from "react";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import PhotoGallery from "@/components/PhotoGallery";
import WishWall from "@/components/WishWall";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const scrollToWishes = useCallback(() => {
    const el = document.getElementById("wish-wall");
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main>
      <FloatingParticles />
      <AudioPlayer />
      <Hero onCtaClick={scrollToWishes} />
      <Highlights />
      <PhotoGallery />
      <WishWall />
      <Footer />
    </main>
  );
}
