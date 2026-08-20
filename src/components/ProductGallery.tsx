"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    if (index !== activeIndex) setActiveIndex(index);
  };

  const open = (index: number) => setExpandedIndex(index);
  const close = () => setExpandedIndex(null);

  // Guarantee at least one valid image
  const galleryImages = images.length > 0 ? images : ["/images/hero_reframed.jpg"];

  return (
    <>
      {/* ── MOBILE: Snap Carousel ── */}
      <div className="md:hidden relative w-full overflow-hidden bg-[#EAE7DF]">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryImages.map((url, i) => (
            <div
              key={i}
              className="min-w-full snap-start relative aspect-[3/4] cursor-zoom-in overflow-hidden"
              onClick={() => open(i)}
            >
              <img
                src={url}
                alt={`${productName} - View ${i + 1}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-5 left-0 w-full flex justify-center items-center gap-1.5 z-10 pointer-events-none">
            {galleryImages.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-[#7A1C30] scale-110"
                    : "border border-[#121212]/40 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── DESKTOP: 2-Column Editorial Grid ── */}
      <div className="hidden md:grid grid-cols-2 gap-2 p-2 w-full">
        {galleryImages.map((url, i) => (
          <div
            key={i}
            className={`relative bg-[#EAE7DF] w-full overflow-hidden cursor-zoom-in border border-[#E4E0D7] group ${
              i === 0 && galleryImages.length % 2 !== 0 ? "col-span-2 aspect-[16/11]" : "aspect-[3/4]"
            }`}
            onClick={() => open(i)}
          >
            <img
              src={url}
              alt={`${productName} - View ${i + 1}`}
              className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute bottom-3 right-3 bg-black/40 text-white text-[9px] uppercase tracking-widest px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
              Click to Zoom
            </div>
          </div>
        ))}
      </div>

      {/* ── FULLSCREEN ZOOM VIEWER (Portal) ── */}
      {mounted && expandedIndex !== null && (
        <FullscreenViewer
          images={galleryImages}
          productName={productName}
          startIndex={expandedIndex}
          onClose={close}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Fullscreen Lookbook Viewer
// ---------------------------------------------------------------------------
interface ViewerProps {
  images: string[];
  productName: string;
  startIndex: number;
  onClose: () => void;
}

function FullscreenViewer({ images, productName, startIndex, onClose }: ViewerProps) {
  const [current, setCurrent] = useState(startIndex);
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pointerDownY = useRef(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  const handleImageLoad = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
    container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, images.length]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 220);
  };

  const go = (dir: number) => {
    setCurrent((prev) => Math.max(0, Math.min(images.length - 1, prev + dir)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownY.current = e.clientY;
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (Math.abs(e.clientY - pointerDownY.current) < 8) handleClose();
  };

  const content = (
    <>
      {/* Scrollable full-bleed high-res image */}
      <div
        ref={scrollRef}
        className={`fixed inset-0 z-[99998] bg-black/90 backdrop-blur-md overflow-auto transition-opacity duration-[220ms] ease-out flex items-center justify-center ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ cursor: "zoom-out" }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <img
          src={images[current]}
          alt={`${productName} - View ${current + 1}`}
          className="max-h-[92vh] max-w-[92vw] object-contain block mx-auto shadow-2xl"
          draggable={false}
          onLoad={handleImageLoad}
        />
      </div>

      {/* × Close Button */}
      <button
        onClick={handleClose}
        aria-label="Close Viewer"
        className={`fixed top-6 right-6 z-[99999] w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-[#7A1C30] text-white transition-all duration-200 cursor-pointer ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {/* ‹ Left Arrow */}
      {current > 0 && (
        <button
          onClick={() => go(-1)}
          aria-label="Previous Look"
          className={`fixed left-6 top-1/2 -translate-y-1/2 z-[99999] bg-black/40 hover:bg-[#7A1C30] text-white transition-all duration-200 p-3 cursor-pointer ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* › Right Arrow */}
      {current < images.length - 1 && (
        <button
          onClick={() => go(1)}
          aria-label="Next Look"
          className={`fixed right-6 top-1/2 -translate-y-1/2 z-[99999] bg-black/40 hover:bg-[#7A1C30] text-white transition-all duration-200 p-3 cursor-pointer ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Look Counter */}
      {images.length > 1 && (
        <span
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] bg-black/50 text-white text-[11px] uppercase tracking-[0.3em] tabular-nums pointer-events-none px-4 py-1.5 backdrop-blur-xs transition-opacity duration-200 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {current + 1} / {images.length}
        </span>
      )}
    </>
  );

  return createPortal(content, document.body);
}
