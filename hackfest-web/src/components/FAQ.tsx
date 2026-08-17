"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "What is the registration charge?",
    a: "The registration fee is ₹400/member which has to be paid after selection.",
  },
  {
    q: "Will there be accommodation provided?",
    a: "Yes, basic accommodation will be provided.",
  },
  {
    q: "Will travel expenses be covered?",
    a: "No, travel expenses will not be covered.",
  },
  {
    q: "Is it Open to All?",
    a: "It's open to BE, BTech, BSc, BCA, MTech and MCA students.",
  },
  {
    q: "Can students from different colleges form a team?",
    a: "No, students must form a team within the same college.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="overflow-hidden rounded-2xl transition-all duration-500"
      style={{
        background: "rgba(0,0,0,0.4)",
        border: `1px solid rgba(34,211,238,${open ? "0.4" : "0.15"})`,
      }}
    >
      <button
        type="button"
        id={`faq-btn-${index}`}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        className="flex w-full items-center justify-between px-6 py-5 md:px-8 md:py-6 text-left focus:outline-none group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-pirate text-lg md:text-xl font-bold text-white tracking-wide pr-4">
          {q}
        </span>
        <svg
          className="w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <title>Toggle answer</title>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-btn-${index}`}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transition: "grid-template-rows 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="overflow-hidden">
          <div className="mx-6 md:mx-8 h-px bg-cyan-500/15" />
          <div className="px-6 pb-5 md:px-8 md:pb-6 pt-4">
            <p className="font-crimson text-sm md:text-base text-gray-400 leading-relaxed">
              {a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section
      className="relative w-full py-8 md:py-16 overflow-hidden z-10"
      id="faq"
    >
      {/* Glow blobs */}
      <div className="hidden md:block absolute top-1/4 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="font-pirate text-5xl md:text-7xl font-black text-transparent bg-clip-text tracking-wider"
            style={{
              backgroundImage: "linear-gradient(to bottom, #a5f3fc, #2563eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FAQ
          </h2>
          <p className="mt-4 text-lg md:text-xl text-cyan-200/60 font-pirate tracking-wide">
            Answers from the captain&apos;s quarters
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className="max-w-3xl mx-auto mt-12 overflow-hidden rounded-2xl p-8 flex flex-col items-center transition-all duration-500"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(34,211,238,0.15)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,211,238,0.35)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(34,211,238,0.15)";
          }}
        >
          <p className="text-center text-lg font-pirate font-bold text-white tracking-wide">
            Have additional questions or facing any issues?
          </p>
          <Link href="/contact">
            <button
              className="group relative mt-6 px-10 py-4 text-white rounded-full font-pirate font-bold text-2xl tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
              style={{ background: "#0891b2" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#06b6d4";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 40px rgba(6,182,212,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#0891b2";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
