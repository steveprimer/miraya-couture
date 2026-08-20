import Link from "next/link";
import AdminNav from "./AdminNav";
import { ExternalLink } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F5F0] text-[#121212] pb-16 md:pb-0">
      {/* Sidebar / Bottom Nav matching Serene */}
      <aside className="w-full md:w-64 bg-[#141414] text-white flex flex-row md:flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.15)] md:shadow-2xl z-50 fixed bottom-0 md:sticky md:top-0 h-16 md:h-screen transition-all flex-shrink-0">
        <div className="hidden md:flex p-7 items-center justify-between border-b border-white/10">
          <Link
            href="/admin"
            className="text-xl font-light tracking-[0.35em] uppercase text-white hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            M I S H R U<span className="text-[#C5A880]">.</span>
          </Link>
        </div>

        <AdminNav />
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-y-auto">
        {/* Mobile Header Bar matching Serene */}
        <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-[#E4E0D7]">
          <span
            className="text-xl font-light tracking-[0.3em] uppercase text-[#121212]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            M I S H R U<span className="text-[#7A1C30]">.</span>
          </span>
          <Link
            href="/"
            className="text-[10px] text-[#121212]/60 uppercase tracking-widest font-medium hover:text-[#7A1C30] flex items-center gap-1"
          >
            Store
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
