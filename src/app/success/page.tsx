"use client";

import Link from "next/link";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Heart } from "lucide-react";

export default function SuccessPage() {
  const orderRef = `MRY-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col items-center justify-center p-6 text-center text-[#121212] font-sans">
      <div className="max-w-xl bg-white border border-[#E4E0D7] p-8 md:p-12 shadow-xs space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#7A1C30]/10 border border-[#7A1C30]/30 flex items-center justify-center mx-auto text-[#7A1C30]">
          <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A1C30] font-medium flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Commission Received</span>
          </span>
          <h1
            className="text-3xl md:text-4xl font-light italic tracking-wide"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Thank You For Your Commission
          </h1>
          <p className="text-xs text-[#121212]/70 font-light leading-relaxed">
            Your haute couture bespoke order has been accepted. Our master artisans are preparing the hand embroidery and tailored fittings.
          </p>
        </div>

        <div className="bg-[#F7F5F0] border border-[#E4E0D7] p-4 text-xs space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-[#121212]/50 block">
            Order Reference
          </span>
          <p className="font-mono text-sm font-medium text-[#7A1C30]">{orderRef}</p>
        </div>

        <div className="text-left space-y-3 pt-2 text-xs text-[#121212]/80 leading-relaxed border-t border-[#E4E0D7]">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#7A1C30] flex-shrink-0 mt-0.5" />
            <p>
              A confirmation and measurement verification will be sent to your email &amp; WhatsApp within 2 hours.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <Heart className="w-4 h-4 text-[#7A1C30] flex-shrink-0 mt-0.5" />
            <p>
              Dedicated bridal styling concierge assistance is available 7 days a week.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="px-6 py-3.5 bg-[#121212] hover:bg-[#7A1C30] text-white text-xs uppercase tracking-widest transition-colors font-medium"
          >
            Explore More Collections
          </Link>
          <Link
            href="/"
            className="px-6 py-3.5 border border-[#E4E0D7] text-[#121212] hover:bg-[#F7F5F0] text-xs uppercase tracking-widest transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
