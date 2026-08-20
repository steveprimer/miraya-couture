"use client";

import { useState } from "react";
import { useUIStore } from "@/store/uiStore";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Search, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const router = useRouter();

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (slug: string) => {
    closeSearch();
    router.push(`/products/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeSearch}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-20">
        <div className="relative w-full max-w-3xl bg-[#F7F5F0] text-[#121212] border border-[#E4E0D7] shadow-2xl p-6 md:p-10 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#D8D4CA] pb-4">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-[#6B6B6B]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    closeSearch();
                    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                  }
                }}
                placeholder="Search Lehengas, Runway pieces, Gowns, Motifs..."
                className="w-full bg-transparent text-sm md:text-base tracking-wider focus:outline-none placeholder:text-[#9A968E] placeholder:font-light"
              />
            </div>
            <button
              onClick={closeSearch}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer ml-4"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filters */}
          <div className="py-4 flex flex-wrap items-center gap-2 text-[11px] tracking-[0.18em] uppercase">
            <span className="text-[#6B6B6B]">Popular:</span>
            {["Lehengas", "Capsule", "Runway", "Gowns", "Everblooming"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 bg-[#EBE7DF] hover:bg-[#7A1C30] hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              )
            )}
          </div>

          {/* Search Results */}
          <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-3">
            {query.trim() === "" ? (
              <div className="py-8 text-center text-xs text-[#6B6B6B] tracking-wider font-light">
                Type keywords above to explore our couture archive.
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#6B6B6B] tracking-wider font-light">
                No couture pieces found matching &ldquo;{query}&rdquo;.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="p-3 bg-[#EFECE4] hover:bg-[#E7E3D8] transition-colors flex gap-4 cursor-pointer group border border-[#E4E0D7]"
                  >
                    <div className="relative w-16 h-20 bg-gray-200 flex-shrink-0 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#7A1C30] font-medium block">
                          {product.category}
                        </span>
                        <h4
                          className="text-xs font-medium tracking-wide mt-0.5 line-clamp-1 group-hover:text-[#7A1C30] transition-colors"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {product.name}
                        </h4>
                      </div>
                      <span className="text-xs font-light text-[#121212] tracking-wider">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer View All Search Results */}
          {query.trim() && filteredProducts.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[#D8D4CA] flex justify-end">
              <Link
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                onClick={closeSearch}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A1C30] hover:underline"
              >
                <span>View Full Results ({filteredProducts.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
