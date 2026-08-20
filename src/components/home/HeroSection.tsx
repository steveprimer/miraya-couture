"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_reframed.jpg"
          alt="Miraya Haute Couture - Reframed Collection"
          fill
          priority
          className="object-cover object-[center_35%] scale-100"
        />
        {/* Subtle Vignette & Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Centered Hero Content at Bottom */}
      <div className="absolute bottom-14 md:bottom-20 left-0 right-0 z-10 text-center px-4 space-y-5 animate-in fade-in slide-from-bottom duration-700">
        <h1
          className="text-4xl md:text-6xl text-white font-light italic tracking-wider drop-shadow-md"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Reframed
        </h1>

        <div>
          <Link
            href="/shop"
            className="inline-block px-8 py-2.5 border border-white text-white text-[11px] md:text-xs uppercase tracking-[0.25em] font-light hover:bg-white hover:text-[#121212] transition-all duration-300 backdrop-blur-xs"
          >
            Shop All
          </Link>
        </div>
      </div>
    </section>
  );
}
