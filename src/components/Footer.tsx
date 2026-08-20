"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { useUIStore } from "@/store/uiStore";

export default function Footer() {
  const pathname = usePathname();
  const openContactModal = useUIStore((state) => state.openContactModal);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/admin-login") || pathname === "/checkout") {
    return null;
  }

  return (
    <footer className="relative bg-[#7A1C30] text-white pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-16 border-b border-white/15">
          <div className="hidden md:block col-span-2">
            <h3
              className="text-2xl font-light italic tracking-wider opacity-90"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Artisanal Luxury & Timeless Craft
            </h3>
            <p className="text-xs text-white/70 font-light max-w-sm mt-3 leading-relaxed">
              Based in Hyderabad, creating contemporary Indian haute couture rooted in heritage embroidery, fine textiles, and architectural silhouettes.
            </p>
          </div>

          {/* Column 1 */}
          <div className="space-y-3 text-xs tracking-[0.18em] font-light">
            <Link href="#capsule" className="block hover:opacity-70 transition-opacity">
              Shop
            </Link>
            <Link href="#wildscape" className="block hover:opacity-70 transition-opacity">
              Discover
            </Link>
            <Link href="#wildscape" className="block hover:opacity-70 transition-opacity">
              Experiences
            </Link>
            <Link href="#runway" className="block hover:opacity-70 transition-opacity">
              Celebrities
            </Link>
            <button
              onClick={() => openContactModal("bridal")}
              className="block hover:opacity-70 transition-opacity text-left cursor-pointer"
            >
              Bridal
            </button>
            <button
              onClick={() => openContactModal()}
              className="block hover:opacity-70 transition-opacity text-left cursor-pointer"
            >
              Contact
            </button>
            <Link href="#capsule" className="block hover:opacity-70 transition-opacity">
              HIM
            </Link>
          </div>

          {/* Column 2 */}
          <div className="space-y-3 text-xs tracking-[0.18em] font-light">
            <button
              onClick={() => openContactModal("assistance")}
              className="block hover:opacity-70 transition-opacity text-left cursor-pointer"
            >
              Account
            </button>
            <a href="#" className="block hover:opacity-70 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="block hover:opacity-70 transition-opacity">
              Returns & Exchange
            </a>
            <a href="#" className="block hover:opacity-70 transition-opacity">
              Shipping Policy
            </a>
            <a href="#" className="block hover:opacity-70 transition-opacity">
              Terms & Conditions
            </a>
            <Link href="/admin" className="block hover:opacity-70 transition-opacity text-[#E4C59E]">
              Atelier Admin Portal
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-70 transition-opacity"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Bottom Bar with Brand Logo and Copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            className="tracking-[0.35em] sm:tracking-[0.45em] text-3xl md:text-5xl font-light uppercase opacity-95 whitespace-nowrap select-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            MIRAYA
          </div>

          <div className="text-[11px] tracking-wider text-white/70 font-light">
            Copyright © 2026 Miraya.
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button exactly matching Screenshot */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 w-11 h-11 bg-white text-[#121212] rounded-full shadow-lg flex items-center justify-center hover:bg-[#F7F5F0] hover:scale-105 transition-all cursor-pointer border border-[#D8D4CA]"
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5 stroke-[2]" />
      </button>
    </footer>
  );
}
