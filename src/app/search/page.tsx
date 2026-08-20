"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-32 text-center text-xs tracking-widest uppercase">Searching Catalog...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);

  const matchingProducts = useMemo(() => {
    if (!searchQuery.trim()) return PRODUCTS;
    const q = searchQuery.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-light italic text-[#121212] tracking-wide"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Search The Atelier
        </h1>

        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by lehenga, saree, embroidery, gown..."
            className="w-full bg-white border border-[#E4E0D7] px-4 py-3 pl-10 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
          />
          <Search className="w-4 h-4 text-[#121212]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <p className="text-xs text-[#121212]/60 font-light">
          Showing {matchingProducts.length} result(s) for &ldquo;{searchQuery || "All Pieces"}&rdquo;
        </p>
      </div>

      {matchingProducts.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-sm text-[#121212]/60">
            No couture pieces match your query.
          </p>
          <Link
            href="/shop"
            className="inline-block px-6 py-2.5 bg-[#121212] text-white text-xs uppercase tracking-widest hover:bg-[#7A1C30] transition-colors"
          >
            Explore All Creations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {matchingProducts.map((product) => (
            <div key={product.id} className="group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[3/4] w-full bg-[#EAE7DF] overflow-hidden mb-4 border border-[#E4E0D7]">
                  <Link href={`/products/${product.slug}`} className="block w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A1C30] font-medium block">
                    {product.category}
                  </span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="block text-sm font-normal text-[#121212] hover:text-[#7A1C30] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {product.name}
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-light text-[#121212] tracking-wider">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
