"use client";

import Image from "next/image";
import { INSTAGRAM_FEED } from "@/data/products";

export default function InstagramStrip() {
  return (
    <section className="w-full bg-[#F7F5F0] overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-0">
        {INSTAGRAM_FEED.map((item, idx) => (
          <div
            key={item.id}
            className="relative aspect-[3/4] w-full bg-[#EAE7DF] overflow-hidden group cursor-pointer"
          >
            <Image
              src={item.image}
              alt={item.caption}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
              <span className="text-white text-[10px] tracking-widest uppercase font-light">
                @mirayaofficial
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
