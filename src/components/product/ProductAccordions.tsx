"use client";

import { useState } from "react";
import { Plus, Minus, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { Product } from "@/types";

interface ProductAccordionsProps {
  product: Product;
}

export default function ProductAccordions({ product }: ProductAccordionsProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true,
    shipping: false,
    care: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-full divide-y divide-[#E4E0D7] border-t border-b border-[#E4E0D7] pt-2 mt-6">
      {/* Description Accordion */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection("description")}
          className="w-full flex justify-between items-center text-left text-xs uppercase tracking-[0.2em] font-normal text-[#121212] hover:text-[#7A1C30] transition-colors cursor-pointer"
        >
          <span>Description</span>
          {openSections.description ? (
            <Minus className="w-4 h-4 text-[#6B6B6B]" />
          ) : (
            <Plus className="w-4 h-4 text-[#6B6B6B]" />
          )}
        </button>

        {openSections.description && (
          <div className="pt-3 pb-2 text-xs text-[#525252] leading-relaxed space-y-3 font-light animate-in fade-in duration-200">
            <p>{product.description}</p>
            {product.details && product.details.length > 0 && (
              <ul className="space-y-1.5 pt-2 border-t border-[#E4E0D7]/60">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px]">
                    <span className="text-[#7A1C30] font-bold">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Shipping Policy Accordion */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection("shipping")}
          className="w-full flex justify-between items-center text-left text-xs uppercase tracking-[0.2em] font-normal text-[#121212] hover:text-[#7A1C30] transition-colors cursor-pointer"
        >
          <span>Shipping Policy</span>
          {openSections.shipping ? (
            <Minus className="w-4 h-4 text-[#6B6B6B]" />
          ) : (
            <Plus className="w-4 h-4 text-[#6B6B6B]" />
          )}
        </button>

        {openSections.shipping && (
          <div className="pt-3 pb-2 text-xs text-[#525252] leading-relaxed space-y-2 font-light animate-in fade-in duration-200">
            <p>
              <strong>Domestic Shipping:</strong> Complimentary insured courier delivery across India within 3–4 weeks for bespoke handcrafted pieces.
            </p>
            <p>
              <strong>International Shipping:</strong> Worldwide express delivery available via DHL Express (calculated at checkout).
            </p>
            <p className="text-[11px] text-[#7A1C30] pt-1">
              * Each Miraya garment is made-to-order by master embroiderers. Expedited bridal timelines can be arranged via our concierge.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
