"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { PRODUCTS } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CapsuleSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const capsuleProducts = PRODUCTS.filter(
    (p) =>
      p.id === "esme-lehenga-set" ||
      p.id === "amelia-lehenga-set" ||
      p.id === "rheia-skirt-set"
  );

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="capsule" className="w-full bg-[#F7F5F0] py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Manifesto */}
          <div className="lg:col-span-5 space-y-8 pr-0 lg:pr-6">
            <div className="text-xl md:text-2xl leading-relaxed text-[#2B2B2B]">
              <p>
                <span className="font-editorial-italic text-2xl md:text-3xl text-[#121212]">
                  For us,
                </span>{" "}
                <span className="font-medium tracking-wide text-xs md:text-sm uppercase font-sans">
                  EMBROIDERY
                </span>{" "}
                <span className="font-editorial-italic text-2xl md:text-3xl text-[#121212]">
                  is part of our
                </span>{" "}
                <span className="font-medium tracking-wide text-xs md:text-sm uppercase font-sans">
                  VOCABULARY, CODE <span className="italic font-normal font-serif text-xl">and</span> RECORD.
                </span>{" "}
                <span className="font-editorial-italic text-2xl md:text-3xl text-[#121212]">
                  It allows us to
                </span>{" "}
                <span className="font-medium tracking-wide text-xs md:text-sm uppercase font-sans">
                  EXPAND,
                </span>{" "}
                <span className="font-editorial-italic text-2xl md:text-3xl text-[#121212]">
                  explore different
                </span>{" "}
                <span className="font-medium tracking-wide text-xs md:text-sm uppercase font-sans">
                  DIRECTIONS,
                </span>{" "}
                <span className="font-editorial-italic text-2xl md:text-3xl text-[#121212]">
                  and
                </span>{" "}
                <span className="font-medium tracking-wide text-xs md:text-sm uppercase font-sans">
                  EVOLVE
                </span>{" "}
                <span className="font-editorial-italic text-2xl md:text-3xl text-[#121212]">
                  our designs.
                </span>{" "}
                <span className="font-editorial-italic text-2xl md:text-3xl text-[#121212]">
                  It gives us the
                </span>{" "}
                <span className="font-medium tracking-wide text-xs md:text-sm uppercase font-sans">
                  FREEDOM
                </span>{" "}
                <span className="font-editorial-italic text-2xl md:text-3xl text-[#121212]">
                  to constantly
                </span>{" "}
                <span className="font-medium tracking-wide text-xs md:text-sm uppercase font-sans">
                  adapt and create
                </span>{" "}
                <span className="font-medium tracking-wide text-xs md:text-sm uppercase font-sans">
                  DEPTH <span className="italic font-normal font-serif text-xl">and</span> TEXTURE
                </span>
              </p>
            </div>

            <div>
              <Link
                href="/shop?category=Pret%20%26%20Sets"
                className="inline-block px-8 py-3.5 border border-[#121212] text-[#121212] text-[11px] uppercase tracking-[0.22em] font-light hover:bg-[#121212] hover:text-[#F7F5F0] transition-colors duration-300"
              >
                Discover This Capsule
              </Link>
            </div>
          </div>

          {/* Right Column: Product Cards Showcase */}
          <div className="lg:col-span-7 relative">
            {/* Horizontal Scroll Navigation */}
            <div className="flex justify-end gap-2 mb-4">
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

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
            >
              {capsuleProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="w-[260px] md:w-[280px] flex-shrink-0 group flex flex-col cursor-pointer"
                >
                  {/* Image Container with Hover Overlay */}
                  <div className="relative aspect-[3/4.5] w-full bg-[#EAE7DF] overflow-hidden mb-4 border border-[#E4E0D7]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* "SHOP NOW" hover bar */}
                    <div className="absolute inset-x-0 bottom-0 bg-[#3D3A37]/90 text-[#F7F5F0] py-3 text-center text-[10px] uppercase tracking-[0.25em] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop Now
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="space-y-1">
                    <h3
                      className="text-base font-light italic text-[#121212] group-hover:text-[#7A1C30] transition-colors"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs font-light text-[#121212] tracking-wider">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
