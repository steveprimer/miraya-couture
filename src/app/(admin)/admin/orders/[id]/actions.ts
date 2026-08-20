"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

export async function updateOrderStatusAction(
  orderId: string,
  fulfillmentStatus: string,
  paymentStatus: string
) {
  try {
    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase
      .from("orders")
      .update({
        fulfillment_status: fulfillmentStatus,
        payment_status: paymentStatus,
      })
      .eq("id", orderId);

    if (error) {
      console.error("Order status update failed:", error.message);
      return { success: false, error: error.message };
    }

    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update order status." };
  }
}
