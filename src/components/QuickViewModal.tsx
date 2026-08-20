"use client";

import { useState } from "react";
import { useUIStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { X, Check, ShoppingBag, Sparkles } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const SIZES = ["XS", "S", "M", "L", "XL", "Custom Bespoke"];

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useUIStore();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isAdding, setIsAdding] = useState(false);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem({
        id: `${quickViewProduct.id}-${selectedSize}`,
        productId: quickViewProduct.id,
        name: quickViewProduct.name,
        price: quickViewProduct.price,
        size: selectedSize,
        image: quickViewProduct.image,
        quantity: 1,
        maxStock: 5,
      });
      setIsAdding(false);
      toast.success(`${quickViewProduct.name} (${selectedSize}) added to bag`, {
        duration: 3000,
      });
      closeQuickView();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeQuickView}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-12">
        <div className="relative w-full max-w-4xl bg-[#F7F5F0] text-[#121212] border border-[#E4E0D7] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-black rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Image */}
            <div className="relative h-[380px] md:h-[540px] bg-[#EAE7DF]">
              <Image
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Right: Product Details */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A1C30] font-medium">
                  {quickViewProduct.category} • {quickViewProduct.subCategory || "Haute Couture"}
                </span>
                <h2
                  className="text-2xl md:text-3xl font-light mt-1 tracking-wide"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {quickViewProduct.name}
                </h2>
                <p className="text-lg font-light text-[#121212] mt-2 tracking-wider">
                  {formatPrice(quickViewProduct.price)}
                </p>

                <div className="mt-4 pt-4 border-t border-[#E4E0D7] text-xs text-[#525252] leading-relaxed">
                  <p>{quickViewProduct.description}</p>
                </div>

                {/* Craftsmanship Highlights */}
                {quickViewProduct.details && (
                  <div className="mt-4 space-y-1.5 text-[11px] text-[#6B6B6B]">
                    {quickViewProduct.details.slice(0, 3).map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Sparkles className="w-3 h-3 text-[#7A1C30] flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Size Selection */}
                <div className="mt-6">
                  <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B] mb-2">
                    <span>Select Size</span>
                    <button className="underline hover:text-black">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                          selectedSize === size
                            ? "border-[#121212] bg-[#121212] text-white font-medium"
                            : "border-[#D8D4CA] bg-white/50 text-[#121212] hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#E4E0D7] space-y-2.5">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="w-full py-3.5 bg-[#121212] hover:bg-[#7A1C30] text-white transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] font-light cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdding ? "Adding..." : "Add To Shopping Bag"}</span>
                </button>

                <div className="text-center">
                  <a
                    href={`/products/${quickViewProduct.slug}`}
                    onClick={closeQuickView}
                    className="text-[11px] uppercase tracking-[0.2em] text-[#7A1C30] hover:underline"
                  >
                    View Complete Details &amp; Customization &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
