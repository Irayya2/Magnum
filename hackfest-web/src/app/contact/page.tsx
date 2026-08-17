import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — Magnum'26",
  description: "Get in touch with the Magnum team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#00060f] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-16">
        <div
          className="w-full max-w-2xl rounded-3xl p-8 md:p-12"
          style={{
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(34,211,238,0.25)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h1 className="font-pirate text-4xl md:text-5xl text-cyan-200 mb-2 text-center tracking-wide">
            Contact Us
          </h1>
          <p className="font-crimson text-cyan-200/60 text-center text-lg mb-10">
            Send a message to the captain&apos;s quarters
          </p>

          <div className="space-y-4 mb-8">
            {/* Email */}
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)" }}>
              <span className="text-cyan-400 text-xl">✉</span>
              <div>
                <p className="font-pirate text-white text-sm tracking-wide">Email</p>
                <a href="mailto:admin@hackfest.dev" className="font-crimson text-cyan-300 hover:text-cyan-100 transition-colors">
                  admin@hackfest.dev
                </a>
              </div>
            </div>
            {/* Location */}
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)" }}>
              <span className="text-cyan-400 text-xl">📍</span>
              <div>
                <p className="font-pirate text-white text-sm tracking-wide">Location</p>
                <p className="font-crimson text-cyan-300 text-sm">Gogte College of Commerce, Tilawadi, Belgavi, Karnataka</p>
              </div>
            </div>
            {/* Instagram */}
            <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.15)" }}>
              <span className="text-cyan-400 text-xl">📸</span>
              <div>
                <p className="font-pirate text-white text-sm tracking-wide">Instagram</p>
                <a href="https://instagram.com/hackfest.dev" target="_blank" rel="noopener noreferrer"
                  className="font-crimson text-cyan-300 hover:text-cyan-100 transition-colors">
                  @hackfest.dev
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/">
              <button className="px-8 py-3 rounded-full font-pirate text-white text-lg tracking-wide transition-all hover:scale-105"
                style={{ background: "#0891b2", border: "1px solid rgba(34,211,238,0.4)" }}>
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
