"use client";

import { useState } from "react";

export default function FloatingButtons() {
  const [musicOn, setMusicOn] = useState(false);

  return (
    <>
      {/* Left: Music / compass button */}
      <button
        id="floating-music-btn"
        aria-label={musicOn ? "Pause background music" : "Play background music"}
        onClick={() => setMusicOn(!musicOn)}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        style={{
          background: "linear-gradient(135deg, #ea580c, #c2410c)",
          boxShadow: "0 4px 20px rgba(234,88,12,0.4), 0 0 0 2px rgba(234,88,12,0.2)",
          border: "1.5px solid rgba(251,146,60,0.4)",
        }}
      >
        {musicOn ? (
          /* Music note icon (on) */
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        ) : (
          /* Compass icon (off) */
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        )}
      </button>

      {/* Right: Theme / sun-moon toggle */}
      <button
        id="floating-theme-btn"
        aria-label="Toggle day/night theme"
        className="fixed bottom-6 right-4 z-40 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        style={{
          background: "rgba(0,0,0,0.5)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
          border: "1.5px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </button>
    </>
  );
}
