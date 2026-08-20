import { notFound } from "next/navigation";
import EditProductForm from "./EditProductForm";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product: any = null;

  try {
    const supabase = await createClient();
    const { data: dbProduct, error } = await supabase
      .from("products")
      .select("*")
      .or(`id.eq.${id},slug.eq.${id}`)
      .single();

    if (!error && dbProduct) {
      product = {
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        price: Number(dbProduct.price) || 0,
        salePrice: dbProduct.sale_price ? Number(dbProduct.sale_price) : null,
        category: dbProduct.category || "Pret & Sets",
        status: dbProduct.status || "Active",
        composition: dbProduct.composition || "",
        fit: dbProduct.fit || "",
        technicalDetails: dbProduct.technical_details || "",
        sizeStock: dbProduct.size_stock || [],
        sizeChartData: dbProduct.size_chart_data || null,
        sizeChartUrl: dbProduct.size_chart_url || null,
        isFeatured: dbProduct.is_featured || false,
        isNewArrival: dbProduct.is_new_arrival || false,
        image: dbProduct.main_image || "/images/hero_reframed.jpg",
        galleryImages: dbProduct.gallery_images || [],
        shopTheLookImage: dbProduct.shop_the_look_image || null,
      };
    }
  } catch (err) {
    console.error("Supabase product edit fetch error:", err);
  }

  if (!product) {
    notFound();
  }

  return <EditProductForm product={product} />;
}
