"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    closeCart();
    window.location.href = "/checkout";
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
        isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop with fade animation */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Sliding Panel with smooth transition */}
        <div
          className={`w-screen max-w-md bg-[#F7F5F0] text-[#121212] flex flex-col shadow-2xl transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="p-6 px-8 border-b border-[#E4E0D7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <h2
                suppressHydrationWarning
                className="text-lg font-light tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Shopping Bag ({isMounted ? items.length : 0})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1 hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 px-8 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <ShoppingBag className="w-12 h-12 text-[#121212]/30 stroke-[1]" />
                <p
                  className="text-lg font-light italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Your bag is currently empty
                </p>
                <p className="text-xs text-[#6B6B6B] tracking-wider max-w-xs">
                  Discover our bridal couture and everblooming embroidery collections.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-4 px-6 py-2.5 border border-[#121212] text-xs uppercase tracking-[0.2em] hover:bg-[#121212] hover:text-[#F7F5F0] transition-colors cursor-pointer inline-block"
                >
                  Explore Catalog
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#E4E0D7]">
                {items.map((item) => (
                  <div key={item.id} className="py-5 flex gap-4">
                    <div className="relative w-20 h-28 bg-[#EAE7DF] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h3
                            className="text-sm font-medium tracking-wide"
                            style={{ fontFamily: "var(--font-serif)" }}
                          >
                            {item.name}
                          </h3>
                          <p className="text-[11px] text-[#6B6B6B] tracking-wider uppercase mt-0.5">
                            Size: {item.size}
                          </p>
                          <p className="text-xs font-light text-[#121212] mt-1 tracking-wider">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#6B6B6B] hover:text-[#7A1C30] p-1 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-[#D8D4CA] bg-white/60">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1.5 px-2 hover:bg-black/5 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs tracking-wider">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1.5 px-2 hover:bg-black/5 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 px-8 border-t border-[#E4E0D7] bg-[#F4F1EA] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs tracking-wider text-[#6B6B6B]">
                  <span>Shipping &amp; Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-base font-medium tracking-wider">
                  <span
                    className="font-light"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Subtotal
                  </span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <p className="text-[10px] text-[#6B6B6B] italic">
                * Handcrafted pieces are bespoke and made-to-order by master artisans.
              </p>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-[#121212] text-white hover:bg-[#7A1C30] transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] font-light cursor-pointer disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Proceed to Concierge Checkout</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
