"use client";

import Image from "next/image";
import Link from "next/link";
import { WILDSCAPE_INSTALLATION } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function InstallationSection() {
  const featuredProduct = WILDSCAPE_INSTALLATION.featuredProduct;

  return (
    <section id="wildscape" className="w-full bg-[#F7F5F0] py-20 md:py-28 border-t border-[#E4E0D7]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Story & Staggered Fashion Card */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h2
                className="text-3xl md:text-5xl font-light italic tracking-tight text-[#121212]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {WILDSCAPE_INSTALLATION.title}
              </h2>
              <p className="text-xs md:text-sm text-[#525252] leading-relaxed font-light tracking-wide">
                {WILDSCAPE_INSTALLATION.description}
              </p>
            </div>

            {/* Staggered Couture Look Card */}
            <Link
              href={`/products/${featuredProduct.slug}`}
              className="block max-w-sm group cursor-pointer"
            >
              <div className="relative aspect-[3/4.6] w-full bg-[#EAE7DF] overflow-hidden mb-3 border border-[#E4E0D7]">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <h3
                    className="text-sm font-normal tracking-wide text-[#121212] group-hover:text-[#7A1C30] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {featuredProduct.name}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] font-light">
                    {formatPrice(featuredProduct.price)}
                  </p>
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] underline font-light text-[#121212] group-hover:text-[#7A1C30] transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          </div>

          {/* Right Column: Large Interior Architectural Photo */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] md:aspect-[3/4] w-full bg-[#EAE7DF] overflow-hidden shadow-xs border border-[#E4E0D7]">
              <Image
                src={WILDSCAPE_INSTALLATION.interiorImage}
                alt="Studio in Banjara Hills Architectural Exhibit"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white text-xs tracking-widest uppercase font-light">
                Studio in Banjara Hills, Hyderabad
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
