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

      {/* Main logo / title */}
      <div className="pointer-events-auto flex flex-col items-center relative mt-6">
        {/* Container for logo + compass rose */}
        <div className="relative select-none">
          {/* Logo background layer (creates a thick outline / back shadow) */}
          <h1
            className="font-pirate text-[5.5rem] md:text-[9.5rem] xl:text-[11.5rem] leading-none text-center hover:scale-102 transition-transform duration-500 cursor-default select-none pr-8 md:pr-14"
            style={{
              background: "linear-gradient(to bottom, #591616, #2d0a0a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              WebkitTextStroke: "2.5px #dca236",
              filter: "drop-shadow(3px 3px 0px #3a1a00) drop-shadow(0 0 30px rgba(245,158,11,0.25)) drop-shadow(4px 8px 16px rgba(0,0,0,0.85))",
            }}
          >
            Magnum
          </h1>
          
          {/* SVG 3D Compass Rose Star */}
          <div 
            className="absolute top-0 right-0 -mr-3 -mt-6 md:-mr-4 md:-mt-8 animate-float pointer-events-none"
            style={{ filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.7))" }}
          >
            <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-28 md:h-28">
              {/* Outer gold circle */}
              <circle cx="50" cy="50" r="30" fill="none" stroke="#dca236" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="26" fill="none" stroke="#dca236" strokeWidth="0.5" strokeDasharray="1 3" />
              
              {/* North pointer */}
              <polygon points="50,50 50,15 45,50" fill="#845305" />
              <polygon points="50,50 50,15 55,50" fill="#f5b041" />
              
              {/* South pointer */}
              <polygon points="50,50 50,85 55,50" fill="#845305" />
              <polygon points="50,50 50,85 45,50" fill="#f5b041" />
              
              {/* East pointer */}
              <polygon points="50,50 85,50 50,45" fill="#845305" />
              <polygon points="50,50 85,50 50,55" fill="#f5b041" />
              
              {/* West pointer */}
              <polygon points="50,50 15,50 50,55" fill="#845305" />
              <polygon points="50,50 15,50 50,45" fill="#f5b041" />
              
              {/* NW pointer */}
              <polygon points="50,50 25,25 28,31" fill="#845305" />
              <polygon points="50,50 25,25 21,29" fill="#f5b041" />
              
              {/* NE pointer */}
              <polygon points="50,50 75,25 71,21" fill="#845305" />
              <polygon points="50,50 75,25 79,29" fill="#f5b041" />
              
              {/* SE pointer */}
              <polygon points="50,50 75,75 79,71" fill="#845305" />
              <polygon points="50,50 75,75 71,79" fill="#f5b041" />
              
              {/* SW pointer */}
              <polygon points="50,50 25,75 21,71" fill="#845305" />
              <polygon points="50,50 25,75 29,79" fill="#f5b041" />

              {/* Center knob */}
              <circle cx="50" cy="50" r="4.5" fill="#dca236" />
            </svg>
          </div>
        </div>

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
