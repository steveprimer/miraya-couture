"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
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

  // 4. Extract Image URLs or Upload Files
  let mainImageUrl = (formData.get("main_image_url") as string) || "";
  let sizeChartUrl = (formData.get("size_chart_url") as string) || null;

  let galleryUrls = formData
    .getAll("gallery_images")
    .filter((item) => typeof item === "string" && item.startsWith("http")) as string[];

  const supabase = createAdminClient();

  const uploadFile = async (fileName: string, file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = file.type || "image/jpeg";

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, buffer, {
        contentType,
        upsert: true,
      });

    if (error) throw new Error(error.message);
    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(fileName);
    return publicUrl;
  };

  // Upload main image if raw file sent
  if (!mainImageUrl) {
    const mainImageFile = formData.get("main_image") as File | null;
    if (mainImageFile && mainImageFile.size > 0) {
      const mainExt = mainImageFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const mainFileName = `main-${Date.now()}-${Math.random().toString(36).substring(7)}.${mainExt}`;
      mainImageUrl = await uploadFile(mainFileName, mainImageFile);
    }
  }

  if (!mainImageUrl) {
    mainImageUrl = "/images/hero_reframed.jpg";
  }

  // Upload size chart file
  if (!sizeChartUrl) {
    const sizeChartFile = formData.get("size_chart") as File | null;
    if (sizeChartFile && sizeChartFile.size > 0) {
      const chartExt = sizeChartFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const chartFileName = `chart-${Date.now()}-${Math.random().toString(36).substring(7)}.${chartExt}`;
      try {
        sizeChartUrl = await uploadFile(chartFileName, sizeChartFile);
      } catch (err) {
        console.error("Size chart upload error:", err);
      }
    }
  }

  // Upload gallery files
  const galleryFiles = formData
    .getAll("gallery_images")
    .filter((item) => item instanceof File && item.size > 0) as File[];

  if (galleryFiles.length > 0) {
    const uploadPromises = galleryFiles.map(async (file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      try {
        return await uploadFile(fileName, file);
      } catch (err) {
        console.error(`Gallery upload error (${file.name}):`, err);
        return null;
      }
    });
    const results = await Promise.all(uploadPromises);
    results.forEach((url) => {
      if (url) galleryUrls.push(url);
    });
  }

  // Generate URL slug
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  const uniqueSuffix = Math.random().toString(36).substring(2, 8);
  const slug = `${baseSlug}-${uniqueSuffix}`;

  // 5. Save to Database
  const insertPayload: any = {
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
    size_chart_url: sizeChartUrl,
    is_featured,
    is_new_arrival,
    main_image: mainImageUrl,
    gallery_images: galleryUrls,
  };

  const { error: dbError } = await supabase.from("products").insert(insertPayload);

  if (dbError) {
    throw new Error(`Database Save Failed: ${dbError.message}`);
  }

  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
  return { success: true };
}
