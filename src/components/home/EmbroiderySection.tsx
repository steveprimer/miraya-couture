"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EmbroiderySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const embroideryProducts = PRODUCTS.filter(
    (p) =>
      p.id === "mishika-lehenga-set" ||
      p.id === "amelia-lehenga-set" ||
      p.id === "edel-lehenga-set" ||
      p.id === "safiya-lehenga-set" ||
      p.id === "alyssa-lehenga-set"
  );

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="embroidery" className="w-full bg-[#F7F5F0] py-20 md:py-28 border-t border-[#E4E0D7]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-3xl md:text-5xl font-light italic tracking-tight text-[#121212]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Everblooming Embroidery
          </h2>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="p-2 border border-[#D8D4CA] hover:border-black text-[#121212] hover:bg-black hover:text-white transition-colors cursor-pointer"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2 border border-[#D8D4CA] hover:border-black text-[#121212] hover:bg-black hover:text-white transition-colors cursor-pointer"
              aria-label="Next products"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth"
        >
          {embroideryProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="w-[240px] md:w-[260px] flex-shrink-0 group flex flex-col cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4.6] w-full bg-[#EAE7DF] overflow-hidden mb-3.5 border border-[#E4E0D7]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              {/* Title & Price */}
              <div className="space-y-1">
                <h3
                  className="text-sm font-normal tracking-wide text-[#121212] group-hover:text-[#7A1C30] transition-colors"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {product.name}
                </h3>
                <p className="text-xs text-[#6B6B6B] font-light tracking-wider">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
