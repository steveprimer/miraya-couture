"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeftRight, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDualView, setIsDualView] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const primaryImage = images[0] || "/images/hero_reframed.jpg";
  const secondaryImage = images[1] || images[0] || "/images/hero_reframed.jpg";

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Desktop Split Double-Image View matching Screenshot */}
      <div className="hidden lg:grid grid-cols-2 gap-3 relative aspect-[16/11] bg-[#EAE7DF] overflow-hidden">
        {/* Left Angle Image */}
        <div className="relative w-full h-full overflow-hidden group">
          <Image
            src={primaryImage}
            alt={`${productName} - Full Look`}
            fill
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Right Angle Image */}
        <div className="relative w-full h-full overflow-hidden group">
          <Image
            src={secondaryImage}
            alt={`${productName} - Detail & Angle`}
            fill
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Center Split Indicator Badge matching Screenshot [ ↔ ] */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white/90 text-[#121212] px-3 py-1.5 shadow-md flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-light border border-[#D8D4CA]">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Atelier Dual View</span>
        </div>
      </div>

      {/* Mobile / Tablet Carousel / Single View */}
      <div className="lg:hidden relative aspect-[3/4] w-full bg-[#EAE7DF] overflow-hidden">
        <Image
          src={images[activeImageIndex] || primaryImage}
          alt={productName}
          fill
          priority
          className="object-cover object-top"
        />

        {/* Thumbnail Dots on Mobile */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  activeImageIndex === idx ? "bg-black w-6" : "bg-black/30"
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Extra Thumbnails if more images exist */}
      {images.length > 2 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar pt-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative w-20 h-24 flex-shrink-0 bg-[#EAE7DF] border transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? "border-[#121212] opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
