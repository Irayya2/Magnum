"use client";

import Link from "next/link";

export default function PrizePool() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center px-4 py-12 z-10"
      id="prizes"
    >
      <div className="relative z-10 flex flex-col items-center text-center w-full pt-16 pb-8">
        {/* Heading */}
        <h2
          className="font-pirate text-5xl md:text-7xl font-black text-center mb-16 text-transparent bg-clip-text tracking-wide"
          style={{
            backgroundImage: "linear-gradient(to bottom, #fef08a, #ca8a04)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 15px rgba(250,204,21,0.5))",
          }}
        >
          Prize Pool
        </h2>

        {/* Amount display */}
        <div className="relative mb-16 flex flex-col items-center">
          {/* Decorative rings */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full"
            style={{ border: "1px solid rgba(234,179,8,0.12)" }} />
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full"
            style={{ border: "1px solid rgba(234,179,8,0.22)" }} />
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full animate-pulse"
            style={{ background: "radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)" }} />

          <span className="text-sm md:text-lg font-crimson font-bold tracking-[0.5em] text-yellow-400/60 uppercase mb-2">
            Worth
          </span>

          <span
            className="font-pirate text-7xl md:text-[10rem] xl:text-[12rem] font-black leading-none tracking-tight"
            style={{
              color: "#eab308",
              textShadow:
                "0 0 20px rgba(234,179,8,0.5), 0 0 60px rgba(234,179,8,0.2), 0 0 100px rgba(234,179,8,0.1)",
            }}
          >
            ₹4,00,000
            <span style={{ color: "#facc1599" }}>+</span>
          </span>
        </div>

        {/* CTA */}
        <Link href="/timeline">
          <button
            className="group relative px-10 py-4 text-white rounded-full font-pirate font-bold text-2xl tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
            style={{
              background: "#0891b2",
              boxShadow: "0 0 0 rgba(6,182,212,0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(6,182,212,0.6)";
              (e.currentTarget as HTMLButtonElement).style.background = "#06b6d4";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 rgba(6,182,212,0)";
              (e.currentTarget as HTMLButtonElement).style.background = "#0891b2";
            }}
          >
            <span className="relative z-10">Explore Timeline</span>
            {/* Shimmer sweep */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </Link>
      </div>
    </section>
  );
}
