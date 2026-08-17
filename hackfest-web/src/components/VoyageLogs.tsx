"use client";

import { useRef, useState, useEffect } from "react";

const events = [
  {
    date: "23",
    month: "FEB",
    year: "2026",
    title: "The Voyage Begins",
    description: "Registration Opens — Hoist the sails and gather your crew!",
    color: "#facc15",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 10.189V14" /><path d="M12 2v3" />
        <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
        <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
        <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      </svg>
    ),
    side: "right" as const,
  },
  {
    date: "20",
    month: "MAR",
    year: "2026",
    title: "Port Closed",
    description: "Registration Ends — The docks are sealed, no more crews.",
    color: "#f87171",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 17V5a2 2 0 0 0-2-2H4" />
        <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 1 1 1-4 0V5a2 2 1 1 0-4 0v2a1 1 0 0 0 1 1h3" />
      </svg>
    ),
    side: "left" as const,
  },
  {
    date: "30",
    month: "MAR",
    year: "2026",
    title: "The Captain's Call",
    description: "Shortlist Announced — Only the worthiest ships proceed.",
    color: "#22d3ee",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
        <path d="m13.56 11.747 4.332-.924" />
        <path d="m16 21-3.105-6.21" />
        <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
        <path d="m6.158 8.633 1.114 4.456" />
        <path d="m8 21 3.105-6.21" />
        <circle cx="12" cy="13" r="2" />
      </svg>
    ),
    side: "right" as const,
  },
  {
    date: "17-19",
    month: "APR",
    year: "2026",
    title: "The Deep Dive",
    description: "36 Hours of Hackathon — Code through the stormy seas!",
    color: "#60a5fa",
    badge: "36 HOURS",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 6v16" /><path d="m19 13 2-1a9 9 0 0 1-18 0l2 1" />
        <path d="M9 11h6" /><circle cx="12" cy="4" r="2" />
      </svg>
    ),
    side: "left" as const,
  },
  {
    date: "19",
    month: "APR",
    year: "2026",
    title: "Treasure Found",
    description: "Results Announced — The chest is cracked open, legends are crowned!",
    color: "#eab308",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
        <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
        <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
        <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
      </svg>
    ),
    side: "right" as const,
  },
];

function TimelineCard({
  event,
  index,
}: {
  event: (typeof events)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isRight = event.side === "right";

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${isRight ? "flex-row" : "flex-row-reverse"} md:flex-row${isRight ? "" : "-reverse"}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateX(0)"
          : `translateX(${isRight ? "-30px" : "30px"})`,
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      {/* Spacer (desktop only) */}
      <div className="hidden md:block w-1/2" />

      {/* Center icon node */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
        {/* Radial glow */}
        <div
          className="absolute w-20 h-20 rounded-full opacity-25"
          style={{ background: `radial-gradient(circle, ${event.color} 0%, transparent 70%)` }}
        />
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-lg"
          style={{
            background: "rgba(0,0,0,0.8)",
            border: `2px solid ${event.color}`,
            color: event.color,
          }}
        >
          {event.icon}
        </div>
      </div>

      {/* Card */}
      <div
        className={`group w-full md:w-1/2 pl-16 md:pl-0 pr-2 ${
          isRight ? "md:pr-12" : "md:pl-12"
        }`}
      >
        <div
          className="relative overflow-hidden rounded-2xl transition-all duration-500"
          style={{
            background: "rgba(0,0,0,0.45)",
            border: `1px solid ${event.color}30`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = `${event.color}60`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = `${event.color}30`;
          }}
        >
          {/* Date header */}
          <div
            className={`flex items-center gap-4 p-5 md:p-7 pb-2 ${
              isRight ? "md:flex-row-reverse md:text-right" : ""
            }`}
          >
            <span
              className="text-6xl md:text-7xl font-black font-pirate leading-none tabular-nums shrink-0"
              style={{
                color: event.color,
                textShadow: `0 0 20px ${event.color}33, 0 0 40px ${event.color}18`,
              }}
            >
              {event.date}
            </span>
            <div
              className={`flex flex-col ${isRight ? "md:items-end" : "md:items-start"}`}
            >
              <span
                className="text-xl md:text-2xl font-pirate font-bold tracking-[0.15em] leading-tight"
                style={{ color: event.color }}
              >
                {event.month}
              </span>
              <span className="text-xs font-crimson text-white/25 tracking-widest">
                {event.year}
              </span>
              {event.badge && (
                <span
                  className="text-[9px] font-crimson font-bold tracking-[0.3em] px-2 py-0.5 rounded border mt-1"
                  style={{
                    color: event.color,
                    borderColor: `${event.color}40`,
                    background: `${event.color}10`,
                  }}
                >
                  {event.badge}
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 md:mx-7 h-px" style={{ background: `${event.color}18` }} />

          {/* Body */}
          <div className={`p-5 md:p-7 pt-3 ${isRight ? "md:text-right" : ""}`}>
            <h3 className="font-pirate text-lg md:text-xl font-bold text-white mb-1.5">
              {event.title}
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-crimson">
              {event.description}
            </p>
          </div>

          {/* Hover radial reveal */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(ellipse at ${isRight ? "100% 30%" : "0% 30%"}, ${event.color}0a, transparent 70%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function VoyageLogs() {
  return (
    <section
      className="relative w-full py-4 md:py-12 overflow-hidden z-10"
      id="timeline"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2
            className="font-pirate text-5xl md:text-7xl font-black text-transparent bg-clip-text tracking-wider"
            style={{
              backgroundImage: "linear-gradient(to bottom, #a5f3fc, #2563eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Voyage Logs
          </h2>
          <p className="mt-4 text-lg md:text-xl text-cyan-200/60 font-pirate tracking-wide">
            Chart your course through the treacherous waters
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent" />
            <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse" />
          </div>
          {/* Mobile left line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent" />
          </div>

          {/* Events */}
          <div className="flex flex-col gap-16 md:gap-24">
            {events.map((event, i) => (
              <TimelineCard key={event.title} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
