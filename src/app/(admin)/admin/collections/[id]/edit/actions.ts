"use server";

import { revalidatePath } from "next/cache";

export async function updateCollection(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const status = formData.get("status") as string;
  const description = formData.get("description") as string;

  revalidatePath("/admin/collections");
  revalidatePath("/");
  return { success: true };
}
