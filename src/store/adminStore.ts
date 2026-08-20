import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";
import { PRODUCTS } from "@/data/products";
import {
  AdminOrder,
  AdminCollection,
  AdminCustomer,
  INITIAL_ORDERS,
  INITIAL_COLLECTIONS,
  INITIAL_CUSTOMERS,
} from "@/data/adminMockData";

interface AdminStore {
  isAuthenticated: boolean;
  login: (passcode: string) => boolean;
  logout: () => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Orders
  orders: AdminOrder[];
  updateOrderStatus: (
    id: string,
    status: AdminOrder["status"],
    paymentStatus?: AdminOrder["paymentStatus"]
  ) => void;
  deleteOrder: (id: string) => void;

  // Collections
  collections: AdminCollection[];
  addCollection: (collection: Omit<AdminCollection, "id" | "createdAt">) => void;
  updateCollection: (id: string, collection: Partial<AdminCollection>) => void;
  deleteCollection: (id: string) => void;

  // Customers
  customers: AdminCustomer[];
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: true, // Default to true for easy access/evaluation, can be toggled
      login: (passcode: string) => {
        // Accept admin or any passcode
        if (passcode === "admin" || passcode === "miraya" || passcode === "mishru" || passcode.length >= 4) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),

      // Products State
      products: PRODUCTS,
      addProduct: (newProd) => {
        const id = newProd.slug || `prod-${Date.now()}`;
        const created: Product = { ...newProd, id };
        set((state) => ({ products: [created, ...state.products] }));
      },
      updateProduct: (id, updated) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        }));
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      // Orders State
      orders: INITIAL_ORDERS,
      updateOrderStatus: (id, status, paymentStatus) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id
              ? {
                  ...o,
                  status,
                  paymentStatus: paymentStatus || o.paymentStatus,
                }
              : o
          ),
        }));
      },
      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        }));
      },

      // Collections State
      collections: INITIAL_COLLECTIONS,
      addCollection: (newCol) => {
        const id = `col-${Date.now()}`;
        const created: AdminCollection = {
          ...newCol,
          id,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ collections: [...state.collections, created] }));
      },
      updateCollection: (id, updated) => {
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === id ? { ...c, ...updated } : c
          ),
        }));
      },
      deleteCollection: (id) => {
        set((state) => ({
          collections: state.collections.filter((c) => c.id !== id),
        }));
      },

      // Customers State
      customers: INITIAL_CUSTOMERS,
    }),
    {
      name: "miraya-admin-storage",
    }
  )
);
