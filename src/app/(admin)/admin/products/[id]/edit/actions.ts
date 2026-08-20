"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;

  // 1. Extract Basic Info
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const status = (formData.get("status") as string) || "Active";
  const composition = formData.get("composition") as string;
  const fit = formData.get("fit") as string;
  const technical_details = formData.get("technical_details") as string;

  // 2. Extract Pricing & Stock
  const price = parseInt(formData.get("price") as string) || 0;
  const salePriceInput = formData.get("sale_price");
  const sale_price = salePriceInput ? parseInt(salePriceInput as string) : null;

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const size_stock = sizes.map((size) => ({
    size,
    stock: parseInt(formData.get(`stock_${size}`) as string) || 0,
  }));

  // 3. Extract Visibility Flags
  const is_featured = formData.get("is_featured") === "true";
  const is_new_arrival = formData.get("is_new_arrival") === "true";

  // Extract Size Chart Data
  const sizeChartDataStr = formData.get("size_chart_data") as string;
  let size_chart_data = null;
  if (sizeChartDataStr) {
    try {
      size_chart_data = JSON.parse(sizeChartDataStr);
    } catch (e) {
      console.error("Failed to parse size chart data", e);
    }
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  const updateData: any = {
    name,
    slug,
    price,
    sale_price,
    category,
    status,
    composition,
    fit,
    technical_details,
    size_stock,
    size_chart_data,
    is_featured,
    is_new_arrival,
  };

  const adminSupabase = createAdminClient();

  const uploadFile = async (fileName: string, file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = file.type || "image/jpeg";

    const { error } = await adminSupabase.storage
      .from("product-images")
      .upload(fileName, buffer, {
        contentType,
        upsert: true,
      });

    if (error) throw new Error(error.message);
    const {
      data: { publicUrl },
    } = adminSupabase.storage.from("product-images").getPublicUrl(fileName);
    return publicUrl;
  };

  // Main image update
  const mainImageUrl = formData.get("main_image_url") as string | null;
  if (mainImageUrl) {
    updateData.main_image = mainImageUrl;
  } else {
    const mainImageFile = formData.get("main_image") as File | null;
    if (mainImageFile && mainImageFile.size > 0) {
      const mainExt = mainImageFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const mainFileName = `main-${Date.now()}-${Math.random().toString(36).substring(7)}.${mainExt}`;
      try {
        updateData.main_image = await uploadFile(mainFileName, mainImageFile);
      } catch (err: any) {
        console.error("Main image upload error:", err);
      }
    }
  }

  // Update Database
  const { error: dbError } = await adminSupabase
    .from("products")
    .update(updateData)
    .eq("id", id);

  if (dbError) {
    throw new Error(`Database Update Failed: ${dbError.message}`);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/products/${id}/edit`);
  revalidatePath("/shop");
  revalidatePath("/");
  return { success: true };
}
