"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export default function RelatedProducts({
  products,
  currentProductId,
}: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const related = products.filter((p) => p.id !== currentProductId).slice(0, 6);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (related.length === 0) return null;

  return (
    <section className="w-full bg-[#F7F5F0] py-16 md:py-24 border-t border-[#E4E0D7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header matching Screenshot */}
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2
            className="text-3xl md:text-5xl font-light italic text-[#121212] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            You May Also Like
          </h2>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="p-2 border border-[#D8D4CA] hover:border-black text-[#121212] hover:bg-black hover:text-white transition-colors cursor-pointer"
              aria-label="Previous related products"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="p-2 border border-[#D8D4CA] hover:border-black text-[#121212] hover:bg-black hover:text-white transition-colors cursor-pointer"
              aria-label="Next related products"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Row matching Screenshot */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 scroll-smooth"
        >
          {related.map((item) => (
            <div
              key={item.id}
              className="w-[240px] md:w-[270px] flex-shrink-0 flex flex-col justify-between group"
            >
              <Link href={`/products/${item.slug}`} className="block">
                {/* Product Image */}
                <div className="relative aspect-[3/4.6] w-full bg-[#EAE7DF] overflow-hidden mb-3.5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3
                    className="text-sm font-normal tracking-wide text-[#121212] group-hover:text-[#7A1C30] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] font-light">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </Link>

              {/* Shop Now Outlined Button matching Screenshot */}
              <div className="mt-4">
                <Link
                  href={`/products/${item.slug}`}
                  className="block w-full py-2.5 border border-[#D8D4CA] hover:border-black bg-white/50 hover:bg-[#121212] text-[#121212] hover:text-white text-center text-[10px] uppercase tracking-[0.2em] font-light transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
