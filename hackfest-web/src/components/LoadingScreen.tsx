"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const wheelRef = useRef<HTMLImageElement>(null);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    setTimeout(onComplete, 650);
  }, [onComplete]);

  useEffect(() => {
    const logoTimer = setTimeout(() => setLogoVisible(true), 200);
    const startTime = performance.now();
    const duration = 3000;

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(finish, 300);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearTimeout(logoTimer);
      cancelAnimationFrame(raf);
    };
  }, [finish]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-neutral-950 overflow-hidden"
      style={{
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.65s ease-in-out",
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* Radial gradient BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#050505_60%,_#000_100%)]" />

      {/* Center — main logo */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          opacity: logoVisible ? 1 : 0,
          transform: logoVisible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Decorative compass star above */}
        <div className="text-amber-400/30 text-6xl mb-2 animate-spin-slow">✦</div>

        {/* Hackfest wordmark */}
        <div className="relative">
          <h1
            className="font-pirate text-[5rem] md:text-[8rem] leading-none text-center"
            style={{
              color: "#e8d5b0",
              textShadow: "0 0 30px rgba(245,158,11,0.3), 2px 4px 8px rgba(0,0,0,0.8)",
              letterSpacing: "0.02em",
            }}
          >
            Hackfest
          </h1>
          <span
            className="block text-right text-xs font-crimson tracking-[0.3em] uppercase"
            style={{ color: "#9a8060", marginTop: "-4px" }}
          >
            Season 3
          </span>
        </div>

        {/* Subtitle pill */}
        <div
          className="mt-4 px-6 py-2 rounded-full border text-xs md:text-sm font-crimson tracking-widest uppercase"
          style={{
            borderColor: "rgba(200,180,140,0.4)",
            color: "#c8b48c",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          36-Hour National Level Hackathon
        </div>
      </div>

      {/* Top-right HF badge */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20">
        <div
          className="w-14 h-14 md:w-18 md:h-18 flex items-center justify-center rounded-full"
          style={{
            background: "rgba(245,158,11,0.12)",
            border: "1.5px solid rgba(245,158,11,0.35)",
            boxShadow: "0 0 20px rgba(245,158,11,0.2)",
          }}
        >
          <span className="font-pirate text-amber-500 text-xl font-bold">HF</span>
        </div>
      </div>

      {/* Bottom-right: progress counter + wheel */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex items-center gap-3">
        <div className="text-right">
          <span className="block text-2xl font-crimson font-bold tabular-nums leading-none text-amber-500">
            {progress}%
          </span>
          <span className="text-[9px] text-amber-500/50 font-crimson tracking-[0.2em] uppercase">
            Loading Assets
          </span>
        </div>

        {/* Steering wheel */}
        <div className="w-14 h-14 md:w-16 md:h-16" style={{ animation: "spin 3s linear infinite" }}>
          <img
            ref={wheelRef}
            src="/steering.png"
            alt="Loading..."
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback SVG steering wheel if image missing
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* SVG fallback wheel */}
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-amber-600 absolute inset-0"
          >
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="3" fill="none" />
            <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="3" fill="none" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line
                key={deg}
                x1="32" y1="24"
                x2="32" y2="6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${deg} 32 32)`}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Bottom-left: GPS coordinates */}
      <div className="absolute bottom-8 left-8 hidden md:block z-20">
        <p className="text-[10px] font-crimson text-neutral-600 leading-relaxed tracking-wide">
          LAT: 18°18&apos;02.0&quot;N<br />
          LON: 64°49&apos;32.2&quot;W
        </p>
      </div>
    </div>
  );
}
