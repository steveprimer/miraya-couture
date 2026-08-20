"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { ShoppingBag, Sparkles, Check } from "lucide-react";

interface SizeStock {
  size: string;
  stock: number;
}

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    main_image: string;
  };
  sizeStock: SizeStock[];
}

export default function AddToCartForm({ product, sizeStock }: AddToCartProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    sizeStock.find((s) => s.stock > 0)?.size || "M"
  );
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a couture size.");
      return;
    }

    const selectedStockItem = sizeStock.find((s) => s.size === selectedSize);
    setIsAdding(true);

    setTimeout(() => {
      addItem({
        id: `${product.id}-${selectedSize}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.main_image,
        quantity: 1,
        maxStock: selectedStockItem?.stock || 5,
      });

      setIsAdding(false);
      toast.success(`${product.name} (Size ${selectedSize}) added to your shopping bag.`);
      openCart();
    }, 300);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sizing Matrix */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#121212]/70">
            Select Size
          </span>
          <span className="text-[10px] uppercase tracking-wider text-[#7A1C30] font-medium">
            Complimentary Custom Fit
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {sizeStock.map((item) => {
            const isAvailable = item.stock > 0;
            const isSelected = selectedSize === item.size;

            return (
              <button
                key={item.size}
                type="button"
                disabled={!isAvailable}
                onClick={() => setSelectedSize(item.size)}
                className={`py-3 text-xs uppercase tracking-widest transition-all border flex flex-col items-center justify-center cursor-pointer ${
                  isSelected
                    ? "bg-[#121212] text-white border-[#121212] shadow-xs"
                    : !isAvailable
                    ? "border-[#E4E0D7] bg-[#F7F5F0]/50 text-[#121212]/25 line-through cursor-not-allowed"
                    : "border-[#E4E0D7] bg-white text-[#121212]/80 hover:border-[#121212] hover:text-black"
                }`}
              >
                <span className="font-medium">{item.size}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add To Cart CTA */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isAdding}
        className="w-full py-4 bg-[#121212] hover:bg-[#7A1C30] text-[#F7F5F0] text-xs uppercase tracking-[0.25em] font-medium transition-all active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-black/5 disabled:opacity-70"
      >
        <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
        <span>{isAdding ? "Adding to Bag..." : "Add to Shopping Bag"}</span>
      </button>

      <p className="text-[10px] text-center text-[#121212]/50 tracking-wider">
        * Each bespoke piece is handcrafted to order by master karigars in our Hyderabad atelier.
      </p>
    </div>
  );
}
