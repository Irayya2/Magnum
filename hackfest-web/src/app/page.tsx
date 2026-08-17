"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";

import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Sponsors from "@/components/Sponsors";
import CaptainsLog from "@/components/CaptainsLog";
import Tracks from "@/components/Tracks";
import VoyageLogs from "@/components/VoyageLogs";
import PrizePool from "@/components/PrizePool";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

// Dynamically import the Three.js ocean (client-only, no SSR)
const OceanBackground = dynamic(() => import("@/components/OceanBackground"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#000d1a]" />,
});

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loading screen */}
      {!loaded && (
        <LoadingScreen onComplete={() => setLoaded(true)} />
      )}

      {/* Main site — hidden until loading complete */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: loaded ? "all" : "none",
        }}
      >
        {/* Fixed ocean background (Three.js WebGL) */}
        <OceanBackground />

        {/* Fixed navbar */}
        <Navbar />

        {/* Floating action buttons */}
        <FloatingButtons />

        {/* Scrollable content — custom scroll container for ocean parallax */}
        <div className="ocean-scroll-container">
          {/* SR-only SEO content */}
          <div className="sr-only">
            <h1>Hackfest&apos;26 — 36-Hour National Level Hackathon</h1>
            <p>
              Hackfest is a 36-hour National Level Hackathon organised by Finite Loop Club
              at Gogte College of Commerce, Tilawadi, Belgavi, Karnataka, India.
              Theme: Codequest — The Grand Voyage.
            </p>
            <p>Dates: April 17–19, 2026. Prize Pool: ₹4,00,000+. Open to all college students across India.</p>
          </div>

          {/* Hero — full viewport */}
          <Hero />

          {/* Spacer — gives room for ocean surface to be visible */}
          <section className="h-[12vh]" aria-hidden="true" />

          {/* Content sections — scroll over the fixed ocean */}
          <div className="relative z-10">
            {/* Subtle content BG gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/40 pointer-events-none" aria-hidden="true" />

            <Sponsors />
            <CaptainsLog />
            <Tracks />
            <VoyageLogs />
            <PrizePool />
            <FAQ />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
