"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, Ruler } from "lucide-react";

export interface SizeChartData {
  columns: string[];
  rows: string[][];
}

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  sizeChartData?: SizeChartData | null;
  illustrationUrl?: string | null;
}

export default function SizeChartModal({
  isOpen,
  onClose,
  productName,
  sizeChartData,
  illustrationUrl,
}: SizeChartModalProps) {
  const [unit, setUnit] = useState<"CM" | "INCHES">("INCHES");

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

  if (!isOpen) return null;
  if (typeof document === "undefined") return null;

  const data = sizeChartData || {
    columns: ["Size", "Bust", "Waist", "Hip", "Length"],
    rows: [
      ["XS", "32", "26", "36", "44"],
      ["S", "34", "28", "38", "44.5"],
      ["M", "36", "30", "40", "45"],
      ["L", "38", "32", "42", "45.5"],
      ["XL", "40", "34", "44", "46"],
      ["XXL", "42", "36", "46", "46.5"],
    ],
  };

  const convertValue = (val: string, colName: string) => {
    const lowerCol = colName.toLowerCase();
    if (lowerCol.includes("size") || lowerCol.includes("uk") || lowerCol.includes("us")) {
      return val;
    }
    if (!val) return "";

    return val.replace(/\d+(\.\d+)?/g, (match) => {
      const num = parseFloat(match);
      if (unit === "CM") {
        return Math.round(num * 2.54).toString();
      }
      return num.toString();
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-[#F7F5F0] border border-[#E4E0D7] w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col p-6 md:p-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#121212]/60 hover:text-[#121212] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pb-6 border-b border-[#E4E0D7]">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A1C30] font-medium flex items-center justify-center gap-1.5">
            <Ruler className="w-3.5 h-3.5" />
            <span>Miraya Measurement Guide</span>
          </span>
          <h2
            className="text-2xl md:text-3xl font-light italic text-[#121212]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {productName}
          </h2>
          <p className="text-xs text-[#121212]/60 font-light uppercase tracking-widest">
            Haute Couture &amp; Pret Fit Matrix
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-center items-center gap-4 my-6">
          <button
            type="button"
            onClick={() => setUnit("INCHES")}
            className={`text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer ${
              unit === "INCHES" ? "text-[#7A1C30] font-bold underline" : "text-[#121212]/50 hover:text-[#121212]"
            }`}
          >
            Inches
          </button>
          <span className="text-[#121212]/30">|</span>
          <button
            type="button"
            onClick={() => setUnit("CM")}
            className={`text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer ${
              unit === "CM" ? "text-[#7A1C30] font-bold underline" : "text-[#121212]/50 hover:text-[#121212]"
            }`}
          >
            Centimeters (CM)
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#E4E0D7] bg-white mb-6">
          <table className="w-full text-center text-xs">
            <thead>
              <tr className="border-b border-[#E4E0D7] bg-[#F7F5F0]/60 text-[10px] uppercase tracking-widest text-[#121212]/70 font-medium">
                {data.columns.map((col, i) => (
                  <th key={i} className="py-3 px-4 border-r border-[#E4E0D7] last:border-r-0">
                    {col} {unit === "CM" && !col.toLowerCase().includes("size") ? "(cm)" : "(in)"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E0D7]">
              {data.rows.map((row, rIndex) => (
                <tr key={rIndex} className="hover:bg-[#F7F5F0]/40 transition-colors">
                  {row.map((cell, cIndex) => (
                    <td
                      key={cIndex}
                      className="py-3 px-4 text-[#121212]/80 border-r border-[#E4E0D7] last:border-r-0 font-light"
                    >
                      {convertValue(cell, data.columns[cIndex])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom Sizing Note */}
        <div className="p-4 bg-white border border-[#E4E0D7] text-xs text-[#121212]/70 space-y-1.5 font-light">
          <p className="font-medium text-[#121212] uppercase tracking-wider text-[11px]">
            ✦ Bespoke Custom Measurements
          </p>
          <p>
            All bridal and haute couture pieces can be custom tailored to your exact measurements at no additional charge. Mention your measurements in the order notes during checkout or contact our concierge.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
