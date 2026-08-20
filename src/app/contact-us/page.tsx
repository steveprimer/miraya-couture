"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you. Our bridal styling concierge will contact you shortly.");
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <div className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A1C30] font-medium flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span>Concierge &amp; Appointments</span>
        </span>
        <h1
          className="text-4xl md:text-5xl font-light italic text-[#121212] tracking-wide"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Contact The Miraya Atelier
        </h1>
        <p className="text-xs text-[#121212]/60 font-light leading-relaxed">
          Book an exclusive bridal fitting at our flagship boutique or connect directly with our global haute couture styling advisors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Boutique Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs space-y-6">
            <h2
              className="text-2xl font-light italic text-[#121212] pb-4 border-b border-[#E4E0D7]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Flagship Atelier
            </h2>

            <div className="space-y-4 text-xs text-[#121212]/80 leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#7A1C30] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#121212]">Miraya Flagship Store</p>
                  <p>Road No. 10, Banjara Hills</p>
                  <p>Hyderabad, Telangana 500034, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#7A1C30] flex-shrink-0" />
                <a href="tel:+919849012345" className="hover:text-[#7A1C30] transition-colors">
                  +91 98490 12345 / +91 40 2345 6789
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#7A1C30] flex-shrink-0" />
                <a href="mailto:concierge@mirayacouture.com" className="hover:text-[#7A1C30] transition-colors">
                  concierge@mirayacouture.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#7A1C30] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#121212]">Boutique Hours:</p>
                  <p>Monday – Saturday: 11:00 AM – 8:00 PM</p>
                  <p>Sunday: By Prior Appointment Only</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E4E0D7]">
              <a
                href="https://wa.me/919849012345"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp Concierge</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Appointment Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs space-y-6">
            <h2
              className="text-2xl font-light italic text-[#121212] pb-4 border-b border-[#E4E0D7]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Request a Bespoke Consultation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 00000 00000"
                    className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                  Consultation Type
                </label>
                <select className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]">
                  <option>Bridal Lehenga Commission</option>
                  <option>In-Person Flagship Boutique Fitting</option>
                  <option>Virtual Global Video Consultation</option>
                  <option>Red Carpet / Pret Pret Order Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#121212]/70 mb-1.5">
                  Message / Event Date
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details regarding your wedding date, design preferences, or budget range..."
                  className="w-full bg-[#F7F5F0]/40 border border-[#E4E0D7] px-4 py-2.5 text-xs text-[#121212] focus:outline-none focus:border-[#7A1C30]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#121212] hover:bg-[#7A1C30] text-white text-xs uppercase tracking-[0.25em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Sending Request..." : "Submit Consultation Request"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
