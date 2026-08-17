import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import VoyageLogs from "@/components/VoyageLogs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Timeline — Hackfest'26",
  description: "Key dates and milestones for Hackfest'26, the 36-hour national hackathon.",
};

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-[#00060f] text-white">
      <Navbar />
      <div className="pt-28 pb-0">
        <VoyageLogs />
      </div>
      <Footer />
    </div>
  );
}
