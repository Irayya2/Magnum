"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Timeline", href: "/timeline" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const active = navLinks.find((l) => l.href === pathname)?.label ?? "Home";

  return (
    <nav
      className="fixed top-4 left-1/2 z-50 w-[92%] max-w-4xl"
      style={{
        transform: "translateX(-50%)",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.5s ease 0.2s",
      }}
    >
      <div
        className="relative flex items-center justify-between px-5 py-2.5 rounded-xl overflow-hidden"
        style={{
          backgroundImage: "url('/teal-leather.webp'), linear-gradient(135deg,#0d4a3a,#083028)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "2px solid rgba(20,100,70,0.7)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.3)",
        }}
      >
        {/* Stitched inner border */}
        <div
          className="pointer-events-none absolute inset-[4px] rounded-lg"
          style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
        />

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2 shrink-0">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-full"
            style={{
              background: "rgba(245,158,11,0.15)",
              border: "1.5px solid rgba(245,158,11,0.4)",
              boxShadow: "0 0 12px rgba(245,158,11,0.2)",
            }}
          >
            <span className="font-pirate text-amber-400 text-sm font-bold leading-none">M</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 relative z-10">
          {navLinks.map((link) => {
            const isActive = active === link.label;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="font-pirate text-[13px] tracking-wide transition-all duration-200 relative group"
                style={{
                  color: isActive ? "#fbbf24" : "#d4c9a8",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-[1.5px] bg-amber-400 transition-all duration-300"
                  style={{ width: isActive ? "100%" : "0%" }}
                />
                {!isActive && (
                  <span className="absolute -bottom-0.5 left-0 h-[1.5px] bg-amber-400/50 w-0 group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Register CTA */}
        <div className="flex items-center gap-3 relative z-10">
          <Link href="https://hackfest.dev" target="_blank">
            <button
              className="hidden md:inline-flex items-center px-5 py-2 rounded-lg font-pirate text-sm text-white tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg,#b45309,#92400e)",
                border: "1px solid rgba(245,158,11,0.4)",
                boxShadow: "0 2px 12px rgba(180,83,9,0.3)",
              }}
            >
              Register Now
            </button>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-0.5 bg-amber-400 transition-all duration-200"
                style={{
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                  transform:
                    mobileOpen && i === 0 ? "rotate(45deg) translate(2px,2px)" :
                    mobileOpen && i === 2 ? "rotate(-45deg) translate(2px,-2px)" : "none",
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden mt-2 rounded-xl overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "300px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          backgroundImage: "url('/teal-leather.webp'), linear-gradient(135deg,#0d4a3a,#083028)",
          backgroundSize: "cover",
          border: mobileOpen ? "2px solid rgba(20,100,70,0.7)" : "none",
        }}
      >
        <div className="flex flex-col py-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-5 py-3 font-pirate text-sm tracking-wide transition-colors"
              style={{ color: active === link.label ? "#fbbf24" : "#d4c9a8" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-5 py-2">
            <Link href="https://hackfest.dev" target="_blank">
              <button className="w-full py-2.5 rounded-lg font-pirate text-sm text-white"
                style={{ background: "linear-gradient(135deg,#b45309,#92400e)", border: "1px solid rgba(245,158,11,0.3)" }}>
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
