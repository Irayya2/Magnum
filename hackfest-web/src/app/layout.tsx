import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hackfest'26 — 36-Hour National Level Hackathon",
  description: "Hackfest is a 36-hour National Level Hackathon organised by Finite Loop Club at Gogte College of Commerce, Tilawadi, Belgavi. Theme: Codequest - The Grand Voyage. April 17-19, 2026. Prize Pool: ₹4,00,000+",
  keywords: "Hackfest, Hackfest 26, hackathon 2026, national hackathon India, Finite Loop Club, Gogte College of Commerce, Tilawadi, Belgavi",
  authors: [{ name: "Finite Loop Club" }],
  openGraph: {
    title: "Hackfest — 36-Hour National Level Hackathon",
    description: "Join Hackfest'26, a 36-hour National Level Hackathon by Finite Loop Club, Gogte College of Commerce, Tilawadi, Belgavi.",
    url: "https://hackfest.dev",
    siteName: "Hackfest",
    images: [{ url: "/logos/hf-og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hackfest — 36-Hour National Level Hackathon",
    description: "Join Hackfest'26, a 36-hour National Level Hackathon.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased select-none">
        {children}
      </body>
    </html>
  );
}
