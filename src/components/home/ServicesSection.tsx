"use client";

import { SERVICES } from "@/data/products";
import { useUIStore } from "@/store/uiStore";

export default function ServicesSection() {
  const openContactModal = useUIStore((state) => state.openContactModal);

  return (
    <section className="w-full bg-[#F7F5F0] py-16 md:py-24 border-t border-[#E4E0D7]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-[#EFECE4]/60 border border-[#E4E0D7] p-8 md:p-10 flex flex-col justify-between text-center space-y-8 min-h-[260px] hover:border-[#7A1C30]/40 transition-colors"
            >
              <div className="space-y-4">
                <h3
                  className="text-2xl md:text-3xl font-light italic text-[#121212]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {service.title}
                </h3>
                <p className="text-xs md:text-[13px] text-[#525252] leading-relaxed font-light tracking-wide max-w-xs mx-auto">
                  {service.description}
                </p>
              </div>

              <div>
                <button
                  onClick={() => openContactModal(service.type)}
                  className="text-[11px] uppercase tracking-[0.25em] font-light text-[#121212] underline underline-offset-8 hover:text-[#7A1C30] transition-colors cursor-pointer"
                >
                  {service.linkText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
