"use client";

export default function CaptainsLog() {
  return (
    <section
      className="relative w-full py-12 flex flex-col items-center justify-center px-4 z-10"
      id="captains-log"
    >
      {/* Background glow blob */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[300px] bg-cyan-900/10 blur-3xl rounded-full pointer-events-none mix-blend-screen" />

      <div className="relative z-10 max-w-5xl w-full px-4">
        {/* Glass card */}
        <div
          className="relative overflow-hidden rounded-3xl transition-all duration-500"
          style={{
            border: "1px solid rgba(34,211,238,0.25)",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 0 30px rgba(6,182,212,0.12)",
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-12 gap-8 md:gap-12">
            {/* Brochure cover */}
            <div
              className="relative shrink-0 w-52 md:w-64 aspect-[3/4] rounded-lg overflow-hidden border border-cyan-500/20 shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-105"
              style={{
                transform: "rotate(-3deg)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src="/images/brochure/cover1.webp"
                alt="Hackfest Participant Manual Cover"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  // Show placeholder brochure
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                }}
              />
              {/* Fallback brochure placeholder */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-4"
                style={{ background: "linear-gradient(135deg,#2d1a0e,#1a0a04)" }}
              >
                <div className="text-amber-400 text-4xl mb-3">📜</div>
                <div className="font-pirate text-amber-300 text-lg text-center leading-tight">
                  Hackfest<br />Season 3
                </div>
                <div className="mt-3 px-3 py-1.5 rounded bg-amber-900/50 border border-amber-600/30">
                  <span className="font-crimson text-amber-200 text-xs tracking-wider uppercase">
                    Participant&apos;s Manual
                  </span>
                </div>
              </div>
            </div>

            {/* Text + CTA */}
            <div className="flex flex-col gap-5 flex-1">
              <div className="text-center md:text-left">
                <h3
                  className="font-pirate text-4xl md:text-5xl mb-3 text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(to bottom, #e0f2fe, #38bdf8)",
                  }}
                >
                  Captain&apos;s Log
                </h3>
                <p className="font-crimson text-lg md:text-xl text-cyan-200/70 leading-relaxed max-w-md">
                  The complete map to the treasure. Uncover the schedule, rules, and secrets of the voyage.
                </p>
              </div>

              {/* Download button */}
              <div className="relative shrink-0">
                {/* Pulse glow */}
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full scale-75 animate-pulse" />
                <a
                  href="/images/brochure/Hackfest26Brochure.pdf"
                  download
                  className="relative flex items-center justify-center gap-4 px-10 py-5 text-white rounded-xl font-pirate text-2xl tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 overflow-hidden"
                  style={{
                    background: "linear-gradient(to bottom, #0891b2, #155e75)",
                    border: "1px solid rgba(34,211,238,0.5)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.5), 0 0 20px rgba(6,182,212,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 0 8px rgb(255,255,255), 0 0 30px rgba(6,182,212,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                      "0 10px 20px rgba(0,0,0,0.5), 0 0 20px rgba(6,182,212,0.3)";
                  }}
                >
                  <span className="relative z-10">Acquire Map</span>
                  {/* Download icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10 animate-bounce"
                    aria-hidden="true"
                  >
                    <path d="M12 15V3" />
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <path d="m7 10 5 5 5-5" />
                  </svg>
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
