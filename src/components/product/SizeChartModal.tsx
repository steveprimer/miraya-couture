"use client";

import { X, Ruler } from "lucide-react";
import { useState } from "react";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export default function SizeChartModal({
  isOpen,
  onClose,
  productName,
}: SizeChartModalProps) {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  if (!isOpen) return null;

  const sizeData = {
    in: [
      { size: "XS", bust: "32 - 33", waist: "25 - 26", hip: "35 - 36" },
      { size: "S", bust: "34 - 35", waist: "27 - 28", hip: "37 - 38" },
      { size: "M", bust: "36 - 37", waist: "29 - 30", hip: "39 - 40" },
      { size: "L", bust: "38 - 39", waist: "31 - 32", hip: "41 - 42" },
      { size: "XL", bust: "40 - 42", waist: "33 - 35", hip: "43 - 45" },
    ],
    cm: [
      { size: "XS", bust: "81 - 84", waist: "63 - 66", hip: "89 - 91" },
      { size: "S", bust: "86 - 89", waist: "68 - 71", hip: "94 - 96" },
      { size: "M", bust: "91 - 94", waist: "73 - 76", hip: "99 - 102" },
      { size: "L", bust: "96 - 99", waist: "78 - 81", hip: "104 - 107" },
      { size: "XL", bust: "101 - 107", waist: "84 - 89", hip: "109 - 114" },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="relative w-full max-w-2xl bg-[#F7F5F0] text-[#121212] border border-[#E4E0D7] shadow-2xl p-6 md:p-10 animate-in zoom-in-95 duration-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-black/60 hover:text-black transition-colors cursor-pointer"
            aria-label="Close size chart"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#7A1C30]">
              <Ruler className="w-3.5 h-3.5" />
              <span>Atelier Measurement Guide</span>
            </div>
            <h3
              className="text-2xl md:text-3xl font-light italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Size Guide — {productName}
            </h3>
            <p className="text-xs text-[#6B6B6B] font-light max-w-md mx-auto">
              All Miraya garments are crafted with tailored seam allowances for minor adjustments.
            </p>
          </div>

          {/* Unit Switcher */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setUnit("in")}
              className={`px-4 py-1.5 text-xs tracking-wider border cursor-pointer ${
                unit === "in"
                  ? "bg-[#121212] text-white border-[#121212]"
                  : "bg-white/50 text-[#121212] border-[#D8D4CA]"
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit("cm")}
              className={`px-4 py-1.5 text-xs tracking-wider border cursor-pointer ${
                unit === "cm"
                  ? "bg-[#121212] text-white border-[#121212]"
                  : "bg-white/50 text-[#121212] border-[#D8D4CA]"
              }`}
            >
              Centimeters (cm)
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-[#E4E0D7] bg-white/70">
            <table className="w-full text-center text-xs tracking-wider">
              <thead className="bg-[#EFECE4] border-b border-[#E4E0D7] text-[#121212] uppercase text-[11px] font-medium">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Bust ({unit})</th>
                  <th className="py-3 px-4">Waist ({unit})</th>
                  <th className="py-3 px-4">Hip ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E0D7]">
                {sizeData[unit].map((row) => (
                  <tr key={row.size} className="hover:bg-black/5">
                    <td className="py-3 px-4 font-semibold">{row.size}</td>
                    <td className="py-3 px-4 text-[#525252]">{row.bust}</td>
                    <td className="py-3 px-4 text-[#525252]">{row.waist}</td>
                    <td className="py-3 px-4 text-[#525252]">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E4E0D7] text-[11px] text-[#6B6B6B] text-center space-y-1">
            <p>Need custom bridal measurements or bespoke fitting?</p>
            <p className="text-[#121212] font-medium">
              Select &ldquo;Customize&rdquo; on the product page and our atelier stylist will assist you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
