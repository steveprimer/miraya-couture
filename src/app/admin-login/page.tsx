"use client";

import { useState } from "react";
import { loginAdmin } from "./actions";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-center items-center p-6 text-[#121212] font-sans">
      <div className="w-full max-w-md bg-white p-10 border border-[#E4E0D7] shadow-xs">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="text-3xl tracking-[0.35em] uppercase font-light hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            M I S H R U<span className="text-[#7A1C30]">.</span>
          </Link>
          <p className="text-xs text-[#121212]/60 uppercase tracking-widest mt-3 font-medium">
            Atelier Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs border border-red-200 text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase tracking-widest text-[#121212]/70">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue="admin@miraya.com"
              className="w-full p-3.5 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-all text-xs bg-[#F7F5F0]/40 text-[#121212]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase tracking-widest text-[#121212]/70">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              defaultValue="miraya2026"
              className="w-full p-3.5 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-all text-xs bg-[#F7F5F0]/40 text-[#121212]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-4 bg-[#121212] hover:bg-[#7A1C30] text-white text-xs font-medium uppercase tracking-widest transition-all disabled:opacity-70 flex justify-center items-center h-14 cursor-pointer"
          >
            {isLoading ? "Authenticating..." : "Sign In to Atelier"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E4E0D7] text-center">
          <Link
            href="/"
            className="text-xs text-[#121212]/60 hover:text-[#121212] transition-colors uppercase tracking-wider"
          >
            &larr; Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
