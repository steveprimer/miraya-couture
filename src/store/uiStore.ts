import { create } from "zustand";
import { Product } from "@/types";

interface UIStore {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  isContactModalOpen: boolean;
  openContactModal: (serviceType?: string) => void;
  closeContactModal: () => void;
  contactServiceType: string | null;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  isMobileMenuOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  isContactModalOpen: false,
  contactServiceType: null,
  openContactModal: (serviceType) =>
    set({ isContactModalOpen: true, contactServiceType: serviceType || null }),
  closeContactModal: () =>
    set({ isContactModalOpen: false, contactServiceType: null }),

  quickViewProduct: null,
  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),
}));
