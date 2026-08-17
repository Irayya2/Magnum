"use client";

export default function Sponsors() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-start pt-16 pb-12 px-4 z-10"
      id="sponsors"
    >
      {/* Section heading */}
      <h2
        className="font-pirate text-5xl md:text-7xl font-bold text-center mb-16 text-cyan-200 tracking-wide"
        style={{ textShadow: "0 0 15px rgba(0,200,255,0.8), 0 0 40px rgba(0,200,255,0.3)" }}
      >
        Our Sponsor
      </h2>

      {/* Gogte College of Commerce sponsor card */}
      <div className="flex flex-col items-center mb-4">
        <div
          className="relative w-72 md:w-96 aspect-video bg-white/70 rounded-2xl flex flex-col items-center justify-center p-6 text-center overflow-hidden transition-all duration-500"
          style={{
            border: "2px solid rgba(34,211,238,0.4)",
            boxShadow: "0 0 0 rgba(0,200,255,0)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 40px rgba(0,200,255,0.4)";
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,211,238,0.8)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 rgba(0,200,255,0)";
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,211,238,0.4)";
          }}
        >
          <div
            className="text-2xl font-bold mb-1 text-slate-800"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Gogte College of Commerce
          </div>
          <div className="text-xs text-gray-600 tracking-wide uppercase font-semibold">
            Tilawadi, Belgavi
          </div>

          {/* Hover shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <span className="mt-3 text-sm font-crimson font-semibold tracking-[0.3em] uppercase text-cyan-300/80">
          Executive Sponsor
        </span>
      </div>
    </section>
  );
}
