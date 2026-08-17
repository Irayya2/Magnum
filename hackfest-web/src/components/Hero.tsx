"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-screen w-full flex flex-col items-center justify-center z-10 pointer-events-none"
      id="hero"
    >
      {/* Gogte College of Commerce presents */}
      <div className="pointer-events-auto flex flex-col items-center mb-2">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="px-4 py-2 rounded text-xs md:text-sm font-bold text-white text-center"
            style={{ background: "#1a237e" }}
          >
            Gogte College of Commerce, Tilawadi, Belgavi
          </div>
        </div>
        <span className="text-white/70 font-jakarta tracking-[0.25em] font-semibold uppercase text-[10px] md:text-xs">
          Presents
        </span>
      </div>

      {/* Main Hackfest logo / title */}
      <div className="pointer-events-auto flex flex-col items-center max-w-[95vw] md:max-w-[80vw] lg:max-w-[70vw]">
        <img
          src="/logos/magnum-logo.png"
          alt="Magnum Banner"
          className="w-full h-auto object-contain rounded-2xl border-4 border-[#b45309]/40 hover:scale-[1.02] transition-all duration-500 cursor-default"
          style={{
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 50px rgba(245,158,11,0.2)",
          }}
        />

        {/* Subtitle plaque */}
        <div
          className="relative mt-6 px-8 py-5 animate-float pointer-events-auto"
          style={{ filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.6))" }}
        >
          {/* Plaque background */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background: "#34211e",
              backgroundImage: `
                repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px),
                repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 20px)
              `,
              clipPath: "polygon(2% 0%, 98% 5%, 100% 100%, 0% 95%)",
            }}
          />
          <div
            className="absolute inset-0 bg-black/20"
            style={{ clipPath: "polygon(2% 0%, 98% 5%, 100% 100%, 0% 95%)" }}
          />
          {/* Corner nails */}
          {[
            "top-2 left-4",
            "top-3 right-5",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-2.5 h-2.5 rounded-full bg-[#1a0f0a]`}
              style={{ boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.2)" }}
            />
          ))}
          {/* Text */}
          <p
            className="relative z-10 text-xl xl:text-3xl font-crimson font-bold italic text-[#d7ccc8] tracking-widest drop-shadow-md opacity-90"
            style={{ transform: "rotate(1deg)" }}
          >
            Codequest: The Grand Voyage
          </p>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-bounce-slow pointer-events-auto">
        <p className="text-[10px] font-crimson tracking-[0.35em] uppercase text-white/60">
          Dive Deeper
        </p>
        <div className="text-xl md:text-2xl font-pirate font-bold text-white/60">
          Scroll Down
        </div>
        <svg
          className="w-5 h-5 text-white/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          role="img"
          aria-label="Scroll down"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
