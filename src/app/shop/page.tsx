import ShopClient from "./ShopClient";
import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All Haute Couture & Pret | MIRAYA",
  description:
    "Explore the complete collection of Miraya bridal lehengas, fusion gowns, peplum jacket sets, and contemporary pret.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  let products = PRODUCTS;
  let collections: any[] = [];

  try {
    const supabase = await createClient();
    const { data: dbProducts } = await supabase
      .from("products")
      .select("*")
      .eq("status", "Active")
      .order("created_at", { ascending: false });

    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price) || 0,
        currency: "INR",
        category: p.category || "Pret & Sets",
        subCategory: p.category,
        image: p.main_image || "/images/hero_reframed.jpg",
        description: p.composition || p.fit || "Handcrafted haute couture piece.",
        details: [p.composition, p.fit, p.technical_details].filter(Boolean),
        tags: ["Haute Couture", p.category, "Miraya"],
        inStock: true,
        featured: p.is_featured,
      }));
    }

    const { data: dbCollections } = await supabase
      .from("collections")
      .select("*")
      .eq("status", "Active")
      .order("created_at", { ascending: false });

    if (dbCollections) {
      collections = dbCollections;
    }
  } catch (err) {
    console.error("Supabase fetch in /shop error:", err);
  }

  return <ShopClient products={products} collections={collections} />;
}
