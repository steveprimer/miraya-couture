"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { ShieldCheck, Truck, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = 0; // Complimentary white-glove delivery
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your shopping bag is empty.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      router.push("/success");
    }, 900);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1
          className="text-3xl font-light italic text-[#121212]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs text-[#121212]/60 font-light max-w-sm">
          Please explore our couture collections and select a piece to proceed to checkout.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-[#121212] text-white text-xs uppercase tracking-widest hover:bg-[#7A1C30] transition-colors inline-block"
        >
          Explore Couture
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#121212] font-sans pb-20">
      {/* Checkout Header */}
      <header className="bg-white border-b border-[#E4E0D7] py-6 px-6 lg:px-12 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="tracking-[0.35em] text-2xl font-light uppercase text-[#121212]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            M I S H R U<span className="text-[#7A1C30]">.</span>
          </Link>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#121212]/60">
            <Lock className="w-3.5 h-3.5 text-[#7A1C30]" />
            <span>Secure Atelier Checkout</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#121212]/60 hover:text-[#121212] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Store</span>
        </Link>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Customer Information & Delivery */}
          <div className="lg:col-span-7 space-y-8">
            {/* Contact Details */}
            <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs space-y-6">
              <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] pb-3 border-b border-[#E4E0D7]">
                1. VIP Client Contact Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Ananya"
                    className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Sharma"
                    className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    defaultValue="ananya.sharma@example.com"
                    className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    defaultValue="+91 98201 44520"
                    className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Destination */}
            <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs space-y-6">
              <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] pb-3 border-b border-[#E4E0D7]">
                2. Shipping &amp; Fitting Address
              </h2>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                  Street Address &amp; Residence *
                </label>
                <input
                  type="text"
                  required
                  defaultValue="Villa 14, Palm Avenue, Jubilee Hills"
                  className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Hyderabad"
                    className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Telangana"
                    className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="500033"
                    className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                  Bespoke Sizing / Fitting Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention custom blouse length, sleeve preference, or fitting requests..."
                  className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                />
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs space-y-6">
              <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] pb-3 border-b border-[#E4E0D7]">
                Order Summary ({items.length})
              </h2>

              {/* Items List */}
              <div className="divide-y divide-[#E4E0D7] max-h-72 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4">
                    <div className="relative w-16 h-20 bg-[#EAE7DF] border border-[#E4E0D7] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4
                          className="text-xs font-normal text-[#121212]"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-[#121212]/60 uppercase tracking-wider block mt-0.5">
                          Size: {item.size} • Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-[#121212]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="pt-4 border-t border-[#E4E0D7] space-y-2 text-xs text-[#121212]/70">
                <div className="flex justify-between">
                  <span>Atelier Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Insured White-Glove Delivery</span>
                  <span className="text-emerald-700 font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#121212] pt-3 border-t border-[#E4E0D7]">
                  <span>Total Amount</span>
                  <span className="text-[#7A1C30]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#121212] hover:bg-[#7A1C30] text-white text-xs font-medium uppercase tracking-[0.25em] transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {isProcessing ? "Confirming Atelier Commission..." : "Place Bespoke Order"}
              </button>

              <div className="pt-2 text-center text-[10px] text-[#121212]/50 space-y-1">
                <p>Includes dedicated fashion consultant verification.</p>
                <p>White-glove insured delivery within 10-14 working days.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
