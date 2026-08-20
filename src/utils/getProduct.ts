import { createClient } from "@/utils/supabase/server";
import { PRODUCTS } from "@/data/products";

export async function getProduct(slug: string) {
  try {
    const supabase = await createClient();
    const { data: dbProduct, error } = await supabase
      .from("products")
      .select("*")
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .single();

    if (!error && dbProduct) {
      return {
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        price: Number(dbProduct.price) || 0,
        sale_price: dbProduct.sale_price ? Number(dbProduct.sale_price) : null,
        currency_symbol: dbProduct.currency_symbol || "Rs.",
        category: dbProduct.category || "Pret & Sets",
        status: dbProduct.status || "Active",
        composition: dbProduct.composition || "",
        fit: dbProduct.fit || "",
        technical_details: dbProduct.technical_details || "",
        size_stock: Array.isArray(dbProduct.size_stock)
          ? dbProduct.size_stock
          : [
              { size: "XS", stock: 3 },
              { size: "S", stock: 5 },
              { size: "M", stock: 5 },
              { size: "L", stock: 4 },
              { size: "XL", stock: 2 },
              { size: "XXL", stock: 1 },
            ],
        size_chart_data: dbProduct.size_chart_data || {
          columns: ["Size", "Bust (in)", "Waist (in)", "Hip (in)", "Length (in)"],
          rows: [
            ["XS", "32", "26", "36", "44"],
            ["S", "34", "28", "38", "44.5"],
            ["M", "36", "30", "40", "45"],
            ["L", "38", "32", "42", "45.5"],
            ["XL", "40", "34", "44", "46"],
            ["XXL", "42", "36", "46", "46.5"],
          ],
        },
        size_chart_url: dbProduct.size_chart_url || null,
        is_featured: dbProduct.is_featured || false,
        is_new_arrival: dbProduct.is_new_arrival || false,
        main_image: dbProduct.main_image || "/images/hero_reframed.jpg",
        gallery_images: Array.isArray(dbProduct.gallery_images)
          ? dbProduct.gallery_images
          : [],
        shop_the_look_image: dbProduct.shop_the_look_image || null,
      };
    }
  } catch (err) {
    console.error("getProduct Supabase error:", err);
  }

  // Fallback to static catalog
  const fallback = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  if (fallback) {
    return {
      id: fallback.id,
      name: fallback.name,
      slug: fallback.slug,
      price: fallback.price,
      sale_price: null,
      currency_symbol: "Rs.",
      category: fallback.category,
      status: "Active",
      composition: fallback.details?.[0] || "Fabric: Raw silk and gossamer organza with pure silk lining.",
      fit: fallback.details?.[1] || "Architectural flared silhouette with structured bodice.",
      technical_details: fallback.details?.[2] || "Handcrafted with intricate zardozi, micro cutdana, and sequins. Dry clean only.",
      size_stock: [
        { size: "XS", stock: 3 },
        { size: "S", stock: 5 },
        { size: "M", stock: 5 },
        { size: "L", stock: 4 },
        { size: "XL", stock: 2 },
        { size: "XXL", stock: 1 },
      ],
      size_chart_data: {
        columns: ["Size", "Bust (in)", "Waist (in)", "Hip (in)", "Length (in)"],
        rows: [
          ["XS", "32", "26", "36", "44"],
          ["S", "34", "28", "38", "44.5"],
          ["M", "36", "30", "40", "45"],
          ["L", "38", "32", "42", "45.5"],
          ["XL", "40", "34", "44", "46"],
          ["XXL", "42", "36", "46", "46.5"],
        ],
      },
      size_chart_url: null,
      is_featured: fallback.featured || false,
      is_new_arrival: false,
      main_image: fallback.image,
      gallery_images: fallback.gallery || (fallback.secondaryImage ? [fallback.secondaryImage] : []),
      shop_the_look_image: null,
    };
  }

  return null;
}
