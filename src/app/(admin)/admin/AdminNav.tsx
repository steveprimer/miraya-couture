"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Layers,
  ShoppingBasket,
  Users,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { logoutAdmin } from "@/app/admin-login/actions";

export default function AdminNav() {
  const pathname = usePathname();

  const isProductsActive =
    pathname === "/admin" || pathname.startsWith("/admin/products");
  const isCollectionsActive =
    pathname === "/admin/collections" ||
    pathname.startsWith("/admin/collections/");
  const isOrdersActive =
    pathname === "/admin/orders" || pathname.startsWith("/admin/orders/");
  const isCustomersActive =
    pathname === "/admin/customers" ||
    pathname.startsWith("/admin/customers/");

  return (
    <nav className="flex-1 px-2 md:p-6 flex flex-row md:flex-col gap-1 md:gap-2 justify-around md:justify-start items-center md:items-stretch overflow-x-auto md:overflow-y-auto no-scrollbar">
      <div className="hidden md:block text-[10px] uppercase tracking-widest text-white/40 font-medium mb-2 mt-2">
        Atelier Menu
      </div>

      {/* Products Tab */}
      <Link
        href="/admin"
        className={`flex flex-col md:flex-row items-center md:justify-start justify-center gap-1 md:gap-3 w-16 md:w-auto p-1 md:px-4 md:py-3 rounded-none font-light transition-colors md:border ${
          isProductsActive
            ? "md:bg-white/10 text-[#C5A880] md:text-white border-transparent md:border-white/10"
            : "hover:bg-white/5 text-white/60 hover:text-white border-transparent hover:border-white/5 group"
        }`}
      >
        <ShoppingBag
          className={`w-5 h-5 md:w-4 md:h-4 stroke-[1.5] ${
            isProductsActive
              ? "opacity-100 md:opacity-90"
              : "opacity-50 group-hover:opacity-100 transition-opacity"
          }`}
        />
        <span className="text-[9px] md:text-sm tracking-wider uppercase">
          Products
        </span>
      </Link>

      {/* Collections Tab */}
      <Link
        href="/admin/collections"
        className={`flex flex-col md:flex-row items-center md:justify-start justify-center gap-1 md:gap-3 w-16 md:w-auto p-1 md:px-4 md:py-3 rounded-none font-light transition-colors md:border ${
          isCollectionsActive
            ? "md:bg-white/10 text-[#C5A880] md:text-white border-transparent md:border-white/10"
            : "hover:bg-white/5 text-white/60 hover:text-white border-transparent hover:border-white/5 group"
        }`}
      >
        <Layers
          className={`w-5 h-5 md:w-4 md:h-4 stroke-[1.5] ${
            isCollectionsActive
              ? "opacity-100 md:opacity-90"
              : "opacity-50 group-hover:opacity-100 transition-opacity"
          }`}
        />
        <span className="text-[9px] md:text-sm tracking-wider uppercase">
          Collections
        </span>
      </Link>

      {/* Orders Tab */}
      <Link
        href="/admin/orders"
        className={`flex flex-col md:flex-row items-center md:justify-start justify-center gap-1 md:gap-3 w-16 md:w-auto p-1 md:px-4 md:py-3 rounded-none font-light transition-colors md:border ${
          isOrdersActive
            ? "md:bg-white/10 text-[#C5A880] md:text-white border-transparent md:border-white/10"
            : "hover:bg-white/5 text-white/60 hover:text-white border-transparent hover:border-white/5 group"
        }`}
      >
        <ShoppingBasket
          className={`w-5 h-5 md:w-4 md:h-4 stroke-[1.5] ${
            isOrdersActive
              ? "opacity-100 md:opacity-90"
              : "opacity-50 group-hover:opacity-100 transition-opacity"
          }`}
        />
        <span className="text-[9px] md:text-sm tracking-wider uppercase">
          Orders
        </span>
      </Link>

      {/* Customers Tab */}
      <Link
        href="/admin/customers"
        className={`flex flex-col md:flex-row items-center md:justify-start justify-center gap-1 md:gap-3 w-16 md:w-auto p-1 md:px-4 md:py-3 rounded-none font-light transition-colors md:border ${
          isCustomersActive
            ? "md:bg-white/10 text-[#C5A880] md:text-white border-transparent md:border-white/10"
            : "hover:bg-white/5 text-white/60 hover:text-white border-transparent hover:border-white/5 group"
        }`}
      >
        <Users
          className={`w-5 h-5 md:w-4 md:h-4 stroke-[1.5] ${
            isCustomersActive
              ? "opacity-100 md:opacity-90"
              : "opacity-50 group-hover:opacity-100 transition-opacity"
          }`}
        />
        <span className="text-[9px] md:text-sm tracking-wider uppercase">
          Customers
        </span>
      </Link>

      {/* Bottom Store Link and Logout on Desktop */}
      <div className="hidden md:flex flex-col gap-2 mt-auto border-t border-white/10 pt-6 w-full">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-4 py-2.5 rounded-none hover:bg-white/5 transition-colors text-xs text-white/60 uppercase tracking-widest font-light hover:text-[#C5A880]"
        >
          <span>View Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={() => logoutAdmin()}
          className="flex items-center justify-between px-4 py-2.5 rounded-none hover:bg-red-500/10 transition-colors text-xs text-red-300/70 uppercase tracking-widest font-light hover:text-red-300 text-left cursor-pointer"
        >
          <span>Sign Out</span>
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </nav>
  );
}
