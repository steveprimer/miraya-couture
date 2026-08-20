"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const { openSearch, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, openContactModal } =
    useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/admin-login") || pathname === "/checkout") {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#F7F5F0]/95 backdrop-blur-md text-[#121212] border-b border-[#E4E0D7]/60 shadow-xs"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            href="/"
            className="tracking-[0.32em] sm:tracking-[0.38em] md:tracking-[0.45em] text-xl sm:text-2xl md:text-3xl font-light uppercase transition-opacity hover:opacity-80 whitespace-nowrap inline-block select-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            MIRAYA
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[12px] uppercase tracking-[0.2em] font-light">
          {/* Shop with Direct Link & Dropdown */}
          <div
            className="relative py-6 group"
            onMouseEnter={() => setIsShopHovered(true)}
            onMouseLeave={() => setIsShopHovered(false)}
          >
            <Link
              href="/shop"
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity cursor-pointer"
            >
              <span>Shop</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isShopHovered ? "rotate-180" : ""
                }`}
              />
            </Link>

            {/* Luxury Mega Menu Dropdown */}
            {isShopHovered && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-[#F7F5F0] text-[#121212] border border-[#E4E0D7] shadow-xl p-6 py-5 rounded-none animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="space-y-3 text-[11px] tracking-[0.22em] uppercase font-light">
                  <Link
                    href="/shop"
                    className="block py-1 hover:text-[#7A1C30] transition-colors border-b border-[#E4E0D7]/60 pb-2 font-medium text-[#7A1C30]"
                  >
                    ✦ Shop All Creations
                  </Link>
                  <Link
                    href="/shop?category=Lehengas"
                    className="block py-1 hover:text-[#7A1C30] transition-colors border-b border-[#E4E0D7]/40 pb-2"
                  >
                    Bridal Lehengas
                  </Link>
                  <Link
                    href="/shop?category=Pret%20%26%20Sets"
                    className="block py-1 hover:text-[#7A1C30] transition-colors border-b border-[#E4E0D7]/40 pb-2"
                  >
                    Pret &amp; Sets
                  </Link>
                  <Link
                    href="/shop?category=Gowns"
                    className="block py-1 hover:text-[#7A1C30] transition-colors border-b border-[#E4E0D7]/40 pb-2"
                  >
                    Haute Couture Gowns
                  </Link>
                  <Link
                    href="/shop?category=Runway"
                    className="block py-1 hover:text-[#7A1C30] transition-colors border-b border-[#E4E0D7]/40 pb-2"
                  >
                    Runway Statement Pieces
                  </Link>
                  <Link
                    href="/shop?category=Sarees"
                    className="block py-1 hover:text-[#7A1C30] transition-colors"
                  >
                    Sarees &amp; Drapes
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Discover Collections Link */}
          <Link
            href="/collections"
            className="hover:opacity-70 transition-opacity"
          >
            Discover
          </Link>

          {/* About Atelier */}
          <Link
            href="/about-us"
            className="hover:opacity-70 transition-opacity"
          >
            About
          </Link>

          {/* Contact Concierge */}
          <Link
            href="/contact-us"
            className="hover:opacity-70 transition-opacity"
          >
            Contact
          </Link>
        </nav>

        {/* Right: Utility Icons */}
        <div className="flex items-center gap-5 md:gap-6">
          <button
            onClick={openSearch}
            className="p-1.5 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Search Catalog"
          >
            <Search className="w-[18px] h-[18px] stroke-[1.5]" />
          </button>

          <Link
            href="/contact-us"
            className="hidden sm:block p-1.5 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Concierge Assistance"
          >
            <User className="w-[18px] h-[18px] stroke-[1.5]" />
          </Link>

          <button
            onClick={openCart}
            className="relative p-1.5 hover:opacity-70 transition-opacity cursor-pointer flex items-center"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-[19px] h-[19px] stroke-[1.5]" />
            <span
              className={`ml-1 text-[11px] font-medium tracking-tighter ${
                isScrolled ? "text-[#121212]" : "text-white"
              }`}
            >
              {totalItems}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-1.5 hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F7F5F0] text-[#121212] border-b border-[#E4E0D7] px-8 py-8 space-y-6 animate-in slide-in-from-top duration-300">
          <div className="space-y-4 text-[13px] tracking-[0.25em] uppercase font-light">
            <Link
              href="/shop"
              onClick={closeMobileMenu}
              className="block py-2 border-b border-[#E4E0D7]/60 font-medium text-[#7A1C30]"
            >
              ✦ Shop All Creations
            </Link>
            <Link
              href="/collections"
              onClick={closeMobileMenu}
              className="block py-2 border-b border-[#E4E0D7]/60"
            >
              Discover Collections
            </Link>
            <Link
              href="/about-us"
              onClick={closeMobileMenu}
              className="block py-2 border-b border-[#E4E0D7]/60"
            >
              About The Atelier
            </Link>
            <Link
              href="/contact-us"
              onClick={closeMobileMenu}
              className="block py-2 border-b border-[#E4E0D7]/60"
            >
              Contact &amp; Bridal Concierge
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
