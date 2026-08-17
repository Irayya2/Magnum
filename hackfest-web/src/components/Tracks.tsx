"use client";

import { useState, useRef, useEffect } from "react";

const tracks = [
  {
    id: "fintech",
    label: "FinTech",
    description: "Pioneering the future of finance by enhancing security, ensuring transparency, and fostering trust through cutting-edge decentralized technologies.",
    icon: "💰",
    color: "#22d3ee",
    image: "/Fintech.jpg",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description: "Revolutionizing patient care through AI diagnostics, telemedicine, and smart health monitoring systems that make healthcare accessible to all.",
    icon: "🏥",
    color: "#34d399",
    image: "/Healthcare.png",
  },
  {
    id: "logistics",
    label: "Logistics",
    description: "Optimizing supply chains and delivery networks with real-time tracking, predictive analytics, and autonomous systems.",
    icon: "🚢",
    color: "#818cf8",
    image: "/Logistics.png",
  },
  {
    id: "open",
    label: "Open Innovation",
    description: "Unconstrained by domain boundaries — bring your boldest ideas to life and redefine what's possible with technology.",
    icon: "🌊",
    color: "#fb923c",
    image: "/OpenInnovation.png",
  },
  {
    id: "sustainable",
    label: "Sustainable Dev",
    description: "Building solutions for a greener world — from smart energy grids to carbon tracking and eco-conscious agriculture.",
    icon: "🌿",
    color: "#4ade80",
    image: "/SustainableDev.png",
  },
];

export default function Tracks() {
  const [active, setActive] = useState(0);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = -(e.clientY - cy) / (rect.height / 2) * 12;
    const ry = (e.clientX - cx) / (rect.width / 2) * 12;
    setCardRotation({ x: rx, y: ry });
  };

  const handleMouseLeave = () => setCardRotation({ x: 0, y: 0 });

  const track = tracks[active];

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-8 pb-20 px-4 overflow-hidden z-10"
      id="tracks"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <h2
          className="font-pirate text-6xl md:text-7xl text-center mb-12 text-transparent bg-clip-text"
          style={{
            backgroundImage: "linear-gradient(to bottom, #fde68a, #d97706)",
            textShadow: "none",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Tracks
        </h2>

        {/* Main grid */}
        <div className="flex flex-row gap-4 lg:gap-8 items-center h-[420px] lg:h-[520px] w-full justify-between">
          {/* Left: track list */}
          <div className="w-[30%] lg:w-[26%] shrink-0 flex flex-col justify-center gap-2 h-full">
            {tracks.map((t, i) => {
              const isActive = active === i;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className="relative text-left px-3 py-2 lg:px-5 lg:py-3 rounded-xl w-full transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(to right, ${t.color}30, ${t.color}10, transparent)`
                      : "transparent",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, background 0.3s ease`,
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-full"
                      style={{ background: t.color }}
                    />
                  )}
                  <span
                    className="font-pirate text-base md:text-lg lg:text-2xl font-bold tracking-wide pl-2 lg:pl-3 whitespace-nowrap"
                    style={{ color: isActive ? t.color : "rgba(255,255,255,0.6)" }}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Center: 3D card */}
          <div
            className="flex-1 flex items-center justify-center h-full"
            style={{ perspective: "1200px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={cardRef}
              className="relative w-[85%] max-w-xs lg:max-w-sm aspect-square rounded-2xl overflow-hidden border transition-all duration-150"
              style={{
                background: "rgba(0,10,30,0.6)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${track.color}40`,
                boxShadow: `0 0 40px ${track.color}20, 0 20px 60px rgba(0,0,0,0.5)`,
                transform: `rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)`,
                transformStyle: "preserve-3d",
                opacity: visible ? 1 : 0,
                transition: visible
                  ? "opacity 0.5s ease 0.3s, border-color 0.4s ease, box-shadow 0.4s ease, transform 0.15s ease"
                  : "opacity 0.5s ease",
              }}
            >
              {/* Background Images with cross-fade */}
              {tracks.map((t, idx) => (
                <div
                  key={t.id}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,10,30,0.65), rgba(0,5,15,0.85)), url(${t.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: active === idx ? 1 : 0,
                  }}
                />
              ))}

              {/* Card content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="text-6xl mb-4">{track.icon}</div>
                <div
                  className="font-pirate text-2xl lg:text-3xl font-bold mb-3 tracking-wide"
                  style={{ color: track.color }}
                >
                  {track.label}
                </div>
                <p className="font-crimson text-sm lg:text-base text-cyan-200/60 leading-relaxed">
                  {track.description}
                </p>
              </div>

              {/* Corner accents */}
              {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos) => (
                <div
                  key={pos}
                  className={`absolute z-10 ${pos} w-4 h-4 rounded-sm border-2`}
                  style={{ borderColor: `${track.color}60` }}
                />
              ))}

              {/* Inner glow border */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                style={{
                  border: `2px solid ${track.color}20`,
                  transform: "translateZ(20px)",
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none z-10" />
            </div>
          </div>

          {/* Right: description */}
          <div
            className="w-[38%] lg:w-[35%] shrink-0 flex flex-col justify-center h-full"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
              transition: "opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s",
            }}
          >
            <div
              key={track.id}
              style={{ animation: "fadeInUp 0.4s ease forwards" }}
            >
              <h3
                className="font-pirate text-2xl lg:text-3xl mb-4 tracking-wide"
                style={{ color: track.color }}
              >
                {track.label}
              </h3>
              <p className="font-crimson text-base lg:text-xl text-cyan-200/70 leading-snug lg:leading-relaxed tracking-wide">
                {track.description}
              </p>
              {/* Decorative line */}
              <div
                className="mt-6 h-px w-24"
                style={{ background: `linear-gradient(to right, ${track.color}60, transparent)` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
