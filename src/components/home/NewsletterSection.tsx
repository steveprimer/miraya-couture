"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      toast.success("Welcome to the Miraya Community. Thank you for subscribing!", {
        duration: 4000,
      });
      setEmail("");
    }, 600);
  };

  return (
    <section className="w-full bg-[#F7F5F0] py-20 md:py-24 border-t border-[#E4E0D7]/60 text-center">
      <div className="max-w-2xl mx-auto px-6 space-y-6">
        <div className="space-y-3">
          <h3
            className="text-2xl md:text-3xl font-light italic text-[#121212] tracking-wide"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            From Our Inspirations To Collections, Keep Up To Date With Our World
          </h3>
          <p className="text-xs uppercase tracking-[0.25em] font-normal text-[#121212]">
            JOIN OUR MIRAYA COMMUNITY
          </p>
        </div>

        <form
          onSubmit={handleSubscribe}
          className="max-w-md mx-auto flex items-center border-b border-[#121212] pb-2 pt-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full bg-transparent text-xs tracking-wider placeholder:text-[#9A968E] placeholder:font-light focus:outline-none"
          />
          <button
            type="submit"
            disabled={isSubscribing}
            className="text-[11px] uppercase tracking-[0.2em] font-light hover:text-[#7A1C30] transition-colors cursor-pointer disabled:opacity-50 flex-shrink-0 ml-4"
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
