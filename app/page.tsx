"use client";

import { useCallback } from "react";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import TeamLetter from "@/components/TeamLetter";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  const scrollToLetter = useCallback(() => {
    const el = document.getElementById("team-letter");
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main>
      <FloatingParticles />
      <AudioPlayer />
      <Hero onCtaClick={scrollToLetter} />
      <Highlights />
      <TeamLetter />
      <Footer />
    </main>
  );
}
