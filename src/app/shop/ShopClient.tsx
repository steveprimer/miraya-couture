"use client";

import { useState, useMemo, Suspense, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, SlidersHorizontal, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ShopClientProps {
  products: Product[];
  collections?: any[];
}

export default function ShopClient({ products, collections = [] }: ShopClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen py-32 text-center text-xs tracking-widest uppercase">Loading Atelier Catalog...</div>}>
      <ShopContent products={products} collections={collections} />
    </Suspense>
  );
}

function ShopContent({ products, collections }: { products: Product[]; collections: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get("category") || searchParams.get("collection") || "All";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");

  useEffect(() => {
    const cat = searchParams.get("category") || searchParams.get("collection");
    if (cat) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  const addItem = useCartStore((state) => state.addItem);

  // Dynamic filter tabs
  const defaultCategories = ["All", "Lehengas", "Pret & Sets", "Gowns", "Runway", "Sarees"];
  const collectionNames = collections.map((c) => c.name);
  const allCategories = Array.from(new Set([...defaultCategories, ...collectionNames]));

  const handleFilterClick = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      router.push("/shop", { scroll: false });
    } else {
      router.push(`/shop?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "All") {
      const lower = selectedCategory.toLowerCase();
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === lower ||
          p.subCategory?.toLowerCase().includes(lower) ||
          p.tags?.some((t) => t.toLowerCase().includes(lower)) ||
          p.name.toLowerCase().includes(lower)
      );
    }

    return [...result].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, selectedCategory, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: `${product.id}-M`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size: "M",
      image: product.image,
      quantity: 1,
      maxStock: 5,
    });
    toast.success(`${product.name} (Size M) added to bag`);
  };

  return (
    <div className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A1C30] font-medium flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span>Miraya Haute Couture &amp; Pret</span>
        </span>
        <h1
          className="text-4xl md:text-5xl font-light italic text-[#121212] tracking-wide"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Shop All Creations
        </h1>
        <p className="text-xs text-[#121212]/60 font-light leading-relaxed">
          Explore artisanal bridal lehengas, contemporary structured pants sets, and embroidered gowns handcrafted in our Hyderabad atelier.
        </p>
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-y border-[#E4E0D7] py-4">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {allCategories.slice(0, 7).map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterClick(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#121212] text-white font-medium"
                  : "bg-[#F7F5F0] text-[#121212]/70 hover:text-black border border-[#E4E0D7]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#121212]/70">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent border border-[#E4E0D7] px-3 py-1.5 text-xs text-[#121212] focus:outline-none cursor-pointer"
          >
            <option value="featured">Curated &amp; Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E4E0D7] p-12">
          <p className="text-sm text-[#121212]/60 mb-4 font-light">
            No pieces found in &ldquo;{selectedCategory}&rdquo;.
          </p>
          <button
            onClick={() => handleFilterClick("All")}
            className="px-6 py-2.5 bg-[#121212] text-white text-xs uppercase tracking-widest hover:bg-[#7A1C30] transition-colors cursor-pointer"
          >
            View All Pieces
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col justify-between">
              <div>
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative aspect-[3/4] w-full bg-[#EAE7DF] overflow-hidden mb-4 border border-[#E4E0D7]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end">
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="p-2 bg-[#121212] hover:bg-[#7A1C30] text-white transition-colors cursor-pointer"
                        title="Quick Add to Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Link>

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
