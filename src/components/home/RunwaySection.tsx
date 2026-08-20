"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RUNWAY_SHOWCASE } from "@/data/products";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export default function RunwaySection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const runwayLooks = [
    {
      id: "look-1",
      image: "/images/emma_runway.jpg",
      caption: "Gold-embellished sculpted cape paired with ivory zardozi lehenga.",
      product: RUNWAY_SHOWCASE.featuredProduct,
    },
    {
      id: "look-2",
      image: "/images/safiya_lehenga.jpg",
      caption: "Bespoke rose-gold peplum top with tiered silk organza skirt.",
      product: RUNWAY_SHOWCASE.featuredProduct,
    },
    {
      id: "look-3",
      image: "/images/alyssa_lehenga.jpg",
      caption: "Champagne crystal corseted silhouette with French knot motifs.",
      product: RUNWAY_SHOWCASE.featuredProduct,
    },
  ];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % runwayLooks.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + runwayLooks.length) % runwayLooks.length);
  };

  const activeLook = runwayLooks[currentSlide];

  return (
    <section id="runway" className="w-full bg-[#F7F5F0] py-16 md:py-24 border-t border-[#E4E0D7]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Large Runway Atmosphere Photo */}
          <div className="lg:col-span-6 relative aspect-[3/4.5] w-full bg-[#EAE7DF] overflow-hidden shadow-xs border border-[#E4E0D7]">
            <Image
              src={RUNWAY_SHOWCASE.runwayAtmosphereImage}
              alt="Miraya Runway Showcase"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white text-xs tracking-widest uppercase font-light">
              Couture Presentation &amp; Runway Showcase
            </div>
          </div>

          {/* Right: Section Header, Story & Featured Runway Piece */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2
                className="text-3xl md:text-5xl font-light italic tracking-tight text-[#121212]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                From The Runway
              </h2>
              <p className="text-xs md:text-sm text-[#525252] leading-relaxed font-light tracking-wide">
                {RUNWAY_SHOWCASE.description}
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-[#D8D4CA]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-[#D8D4CA] hover:border-black text-[#121212] hover:bg-black hover:text-white transition-colors cursor-pointer"
                  aria-label="Previous runway look"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 border border-[#D8D4CA] hover:border-black text-[#121212] hover:bg-black hover:text-white transition-colors cursor-pointer"
                  aria-label="Next runway look"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/shop?category=Runway"
                className="text-[11px] uppercase tracking-[0.2em] font-light hover:text-[#7A1C30] transition-colors flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
              >
                <span>Shop the Runway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Featured Runway Model Card */}
            <Link
              href={`/products/${activeLook.product.slug}`}
              className="block group cursor-pointer max-w-md"
            >
              <div className="relative aspect-[3/4.2] w-full bg-[#EAE7DF] overflow-hidden mb-3 border border-[#E4E0D7]">
                <Image
                  src={activeLook.image}
                  alt={activeLook.caption}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p
                className="text-xs md:text-sm font-light text-[#121212] tracking-wide group-hover:text-[#7A1C30] transition-colors"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {activeLook.caption}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
