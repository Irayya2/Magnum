"use client";

import Link from "next/link";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/hackfest.dev",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com/hackfest_dev",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
        fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/hackfest",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "Timeline", href: "/timeline" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="relative z-20 w-full flex flex-col" id="footer">
      {/* Coral banner */}
      <div
        className="relative h-36 w-full overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 z-10 transition-all duration-1000"
          style={{
            backgroundImage: "url('/images/corals_cropped.png')",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPosition: "top left",
            filter: "brightness(0.6) saturate(0.8) hue-rotate(-5deg) contrast(1.0)",
          }}
        />
      </div>

      {/* Main footer body */}
      <div
        className="relative z-20 w-full border-t"
        style={{
          background: "linear-gradient(to bottom, #8e8071, #6b5e50, #42392f)",
          borderColor: "rgba(147,197,253,0.3)",
        }}
      >
        {/* Noise texture overlay */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        {/* Amber top line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px blur-sm"
          style={{ background: "linear-gradient(to right, transparent, rgba(251,191,36,0.6), transparent)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-evenly gap-10 p-6 py-10">
          {/* Logos */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-row items-center justify-center gap-6">
              {/* Hackfest logo */}
              <Link href="/" className="relative z-50 pointer-events-auto">
                <img
                  src="/logos/magnum-logo.png"
                  alt="Magnum"
                  className="w-16 h-16 object-contain transition-all duration-300"
                  style={{ filter: "drop-shadow(0 0 12px rgba(251,191,36,0.5))" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </Link>

              {/* FLC logo */}
              <a href="https://finiteloop.club/" target="_blank" rel="noopener noreferrer" className="relative z-50">
                <img
                  src="/logos/flc_logo_crop.png"
                  alt="Finite Loop Club"
                  className="w-14 h-14 object-contain opacity-85 hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
              </a>
            </div>

            {/* Gogte College of Commerce branding */}
            <div className="relative z-50 flex items-center">
              <span className="font-pirate text-amber-100 text-sm tracking-widest text-center">
                GOGTE COLLEGE OF COMMERCE
              </span>
            </div>

            {/* Social links */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-base font-medium text-amber-50 transition-colors duration-300">
                Connect with us:
              </p>
              <ul className="flex gap-5">
                {socialLinks.map((social) => (
                  <li key={social.name} className="relative z-50">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="block text-amber-100 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center lg:items-start gap-3">
            <h3 className="font-pirate text-amber-200 text-lg tracking-widest uppercase mb-1">
              Navigation
            </h3>
            {footerNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-crimson text-amber-100/80 hover:text-amber-100 transition-colors tracking-wide text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
            <h3 className="font-pirate text-amber-200 text-lg tracking-widest uppercase mb-1">
              Contact
            </h3>
            <p className="font-crimson text-amber-100/80 text-sm tracking-wide">
              admin@hackfest.dev
            </p>
            <p className="font-crimson text-amber-100/60 text-sm leading-relaxed max-w-xs">
              Gogte College of Commerce<br />
              Tilawadi, Belgavi, Karnataka, India
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="relative z-10 border-t border-amber-900/40 py-4 text-center">
          <p className="font-crimson text-amber-100/50 text-xs tracking-wide">
            © 2026 Magnum · Organised by Finite Loop Club, Gogte College of Commerce, Tilawadi, Belgavi ·{" "}
            <a href="https://finiteloop.club/" target="_blank" rel="noopener noreferrer"
              className="hover:text-amber-200 transition-colors">
              finiteloop.club
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
