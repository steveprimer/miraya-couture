"use client";

import { useState } from "react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";
import { Minus, Plus, Ruler, MessageCircle, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import SizeChartModal from "./SizeChartModal";

interface ProductActionsProps {
  product: Product;
}

const AVAILABLE_SIZES = ["S", "M", "L", "XL", "Customize"];

export default function ProductActions({ product }: ProductActionsProps) {
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const openContactModal = useUIStore((state) => state.openContactModal);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem({
        id: `${product.id}-${selectedSize}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.image,
        quantity: quantity,
        maxStock: 5,
      });
      setIsAdding(false);
      toast.success(`${product.name} (Size: ${selectedSize}) added to bag`, {
        duration: 3500,
      });
    }, 400);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Miraya Atelier, I am interested in inquiring about the ${product.name} (Price: ${formatPrice(product.price)}, Size: ${selectedSize}).`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Title & Price matching Screenshot */}
      <div className="space-y-2">
        <h1
          className="text-3xl md:text-4xl font-light italic text-[#121212] tracking-wide"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {product.name}
        </h1>
        <p className="text-lg md:text-xl font-light text-[#121212] tracking-wider">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Size Selector */}
      <div className="space-y-2.5 pt-2">
        <div className="flex justify-between items-center text-xs tracking-wider text-[#121212]">
          <span className="font-medium">
            Size: <span className="font-normal">{selectedSize}</span>
          </span>
          <button
            type="button"
            onClick={() => setIsSizeChartOpen(true)}
            className="flex items-center gap-1 text-[11px] text-[#6B6B6B] hover:text-[#121212] underline underline-offset-4 cursor-pointer"
          >
            <Ruler className="w-3 h-3" />
            <span>Size Chart</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {AVAILABLE_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => {
                setSelectedSize(size);
                if (size === "Customize") {
                  toast.info(
                    "Custom bespoke tailoring selected. Our concierge will verify your measurements.",
                    { duration: 4000 }
                  );
                }
              }}
              className={`px-4 py-2 text-xs tracking-wider border transition-all cursor-pointer ${
                selectedSize === size
                  ? "border-[#121212] bg-[#121212] text-white font-medium"
                  : "border-[#D8D4CA] bg-white/40 text-[#121212] hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-medium tracking-wider text-[#121212]">
          Quantity
        </label>
        <div className="inline-flex items-center border border-[#D8D4CA] bg-white/70">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-2 px-3 hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5 text-[#121212]" />
          </button>
          <span className="px-4 text-xs font-medium tracking-wider min-w-[2.5rem] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(5, q + 1))}
            className="p-2 px-3 hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5 text-[#121212]" />
          </button>
        </div>
      </div>

      {/* Action Buttons matching Screenshot */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full py-4 bg-[#A3A099] hover:bg-[#121212] text-white transition-colors text-xs uppercase tracking-[0.25em] font-light cursor-pointer shadow-xs disabled:opacity-50"
        >
          {isAdding ? "Adding To Bag..." : "BUY NOW"}
        </button>

        <div className="flex justify-between items-center text-xs tracking-wider text-[#6B6B6B] pt-1">
          <span>Tax included.</span>
          <button
            type="button"
            onClick={handleWhatsApp}
            className="text-[#121212] underline underline-offset-4 hover:text-[#7A1C30] transition-colors cursor-pointer flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Contact us on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        productName={product.name}
      />
    </div>
  );
}
