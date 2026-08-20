"use client";

import { useState } from "react";
import SizeChartModal, { SizeChartData } from "./SizeChartModal";
import { ChevronDown, Ruler } from "lucide-react";

interface SizeGuideTriggerProps {
  productName: string;
  sizeChartData?: SizeChartData | null;
  illustrationUrl?: string | null;
}

export default function SizeGuideTrigger({
  productName,
  sizeChartData,
  illustrationUrl,
}: SizeGuideTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex justify-between items-center py-4 border-b border-[#E4E0D7] group cursor-pointer text-left hover:text-[#7A1C30] transition-colors"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#121212] group-hover:text-[#7A1C30] flex items-center gap-2">
          <Ruler className="w-3.5 h-3.5" />
          <span>Size Guide &amp; Fit Matrix</span>
        </span>
        <ChevronDown className="w-4 h-4 text-[#121212]/40 -rotate-90 group-hover:text-[#7A1C30] transition-colors" />
      </button>

      <SizeChartModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        productName={productName}
        sizeChartData={sizeChartData}
        illustrationUrl={illustrationUrl}
      />
    </>
  );
}
