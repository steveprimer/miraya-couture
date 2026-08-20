"use client";

import { useState } from "react";
import { useUIStore } from "@/store/uiStore";
import { X, Send, Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactModal() {
  const { isContactModalOpen, closeContactModal, contactServiceType } = useUIStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isContactModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Appointment request received! Our bridal concierge will contact you.", {
        duration: 4000,
      });
      closeContactModal();
      setFormData({ name: "", email: "", phone: "", date: "", message: "" });
    }, 1000);
  };

  const getTitle = () => {
    switch (contactServiceType) {
      case "appointment":
        return "Schedule Private Appointment";
      case "bridal":
        return "Bespoke Bridal Consultation";
      case "assistance":
        return "Client Assistance & Concierge";
      default:
        return "Connect With Miraya";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeContactModal}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-12">
        <div className="relative w-full max-w-2xl bg-[#F7F5F0] text-[#121212] border border-[#E4E0D7] shadow-2xl p-6 md:p-10 animate-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={closeContactModal}
            className="absolute top-4 right-4 p-2 text-black/60 hover:text-black transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 mb-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A1C30] font-medium">
              Bespoke Atelier Service
            </span>
            <h2
              className="text-2xl md:text-3xl font-light italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {getTitle()}
            </h2>
            <p className="text-xs text-[#6B6B6B] tracking-wider max-w-md mx-auto font-light">
              Experience one-on-one styling with our senior bridal stylists at our Hyderabad studio or via virtual consultation.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B] mb-1">
                  Your Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aanya Sharma"
                  className="w-full bg-white/70 border border-[#D8D4CA] px-3.5 py-2.5 text-xs tracking-wider focus:outline-none focus:border-[#7A1C30]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B] mb-1">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full bg-white/70 border border-[#D8D4CA] px-3.5 py-2.5 text-xs tracking-wider focus:outline-none focus:border-[#7A1C30]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B] mb-1">
                  Contact Number *
                </label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/70 border border-[#D8D4CA] px-3.5 py-2.5 text-xs tracking-wider focus:outline-none focus:border-[#7A1C30]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B] mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white/70 border border-[#D8D4CA] px-3.5 py-2.5 text-xs tracking-wider focus:outline-none focus:border-[#7A1C30]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B] mb-1">
                Your Requirements & Outfit Preferences
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let us know what occasion or couture pieces you are interested in exploring..."
                className="w-full bg-white/70 border border-[#D8D4CA] px-3.5 py-2.5 text-xs tracking-wider focus:outline-none focus:border-[#7A1C30]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#121212] hover:bg-[#7A1C30] text-white transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] font-light cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Submitting..." : "Submit Consultation Request"}</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[11px] text-[#6B6B6B] border-t border-[#E4E0D7] mt-4">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#7A1C30]" />
                <span>Road No. 10, Banjara Hills, Hyderabad</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#7A1C30]" />
                <span>Mon – Sat: 11:00 AM – 7:30 PM</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
