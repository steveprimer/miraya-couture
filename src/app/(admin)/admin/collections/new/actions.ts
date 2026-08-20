"use server";

import { revalidatePath } from "next/cache";
import { PRODUCTS } from "@/data/products";

export async function getAllProducts() {
  return PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category,
    main_image: p.image,
  }));
}

export async function addCollection(formData: FormData) {
  const name = formData.get("name") as string;
  const status = formData.get("status") as string;
  const description = formData.get("description") as string;

  revalidatePath("/admin/collections");
  revalidatePath("/");
  return { success: true };
}
