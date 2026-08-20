"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateOrderStatusAction } from "./actions";

interface OrderStatusUpdaterProps {
  orderId: string;
  currentFulfillment: string;
  currentPayment: string;
}

export default function OrderStatusUpdater({
  orderId,
  currentFulfillment,
  currentPayment,
}: OrderStatusUpdaterProps) {
  const [fulfillment, setFulfillment] = useState(currentFulfillment);
  const [payment, setPayment] = useState(currentPayment);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const res = await updateOrderStatusAction(orderId, fulfillment, payment);
    setLoading(false);

    if (res?.success) {
      toast.success("Order status updated successfully in database.");
    } else {
      toast.error(res?.error || "Failed to update order status.");
    }
  };

  return (
    <div className="bg-white border border-[#E4E0D7] p-6 shadow-xs flex flex-col gap-6">
      <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] pb-3 border-b border-[#E4E0D7]">
        Order Management
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#121212]/80 block mb-1.5">
            Production &amp; Fulfillment
          </label>
          <select
            value={fulfillment}
            onChange={(e) => setFulfillment(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#F7F5F0]/60 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] text-xs text-[#121212]"
          >
            <option value="Pending">Pending Atelier Review</option>
            <option value="Processing">In Artisan Production</option>
            <option value="Shipped">Dispatched / In Transit</option>
            <option value="Delivered">Delivered to Client</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-[#121212]/80 block mb-1.5">
            Payment Status
          </label>
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#F7F5F0]/60 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] text-xs text-[#121212]"
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending Payment</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full mt-2 bg-[#121212] hover:bg-[#7A1C30] text-[#F7F5F0] py-3 text-xs uppercase tracking-widest transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Updating..." : "Update Status"}
        </button>
      </div>
    </div>
  );
}
