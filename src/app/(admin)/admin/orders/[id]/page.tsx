import { notFound } from "next/navigation";
import OrderStatusUpdater from "./OrderStatusUpdater";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let order: any = null;

  try {
    const supabase = await createClient();
    const { data: dbOrder, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && dbOrder) {
      order = {
        id: dbOrder.id,
        orderNumber: dbOrder.id.substring(0, 8).toUpperCase(),
        createdAt: dbOrder.created_at,
        customerName: dbOrder.customer_name,
        customerEmail: dbOrder.customer_email,
        customerPhone: dbOrder.customer_phone || "+91 98490 00000",
        totalAmount: Number(dbOrder.total_amount) || 0,
        subtotal: Number(dbOrder.subtotal) || Number(dbOrder.total_amount) || 0,
        shippingFee: Number(dbOrder.shipping_fee) || 0,
        paymentStatus: dbOrder.payment_status || "Paid",
        status: dbOrder.fulfillment_status || "Processing",
        shippingAddress: dbOrder.shipping_address || {},
        items: Array.isArray(dbOrder.items) ? dbOrder.items : [],
      };
    }
  } catch (err) {
    console.error("Supabase order fetch error:", err);
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto font-sans text-[#121212]">
      {/* Header Navigation matching Serene */}
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="p-2 border border-[#E4E0D7] hover:bg-black/5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1
            className="text-2xl font-light italic text-[#121212]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Order Details
          </h1>
          <p className="text-xs text-[#121212]/60 font-mono mt-0.5">
            {order.orderNumber}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Items & Payment Summary */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Order Items */}
          <div className="bg-white border border-[#E4E0D7] p-6 shadow-xs">
            <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-4 pb-3 border-b border-[#E4E0D7]">
              Ordered Items ({order.items.length})
            </h2>
            <div className="divide-y divide-[#E4E0D7]/60">
              {order.items.map((item: any) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <div className="w-16 h-20 bg-[#EAE7DF] border border-[#E4E0D7] shrink-0 relative overflow-hidden">
                    <Image
                      src={item.image || "/images/hero_reframed.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        className="font-normal text-sm text-[#121212]"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#121212]/60 mt-0.5">
                        Size: {item.size || "M"} • Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <div className="font-medium text-xs text-[#121212]">
                      ₹{((Number(item.price) || 0) * (Number(item.quantity) || 1)).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-white border border-[#E4E0D7] p-6 shadow-xs">
            <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-4 pb-3 border-b border-[#E4E0D7]">
              Financial Summary
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-[#121212]/70">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[#121212]/70">
                <span>Insured White-Glove Delivery</span>
                <span>{order.shippingFee === 0 ? "Complimentary" : `₹${order.shippingFee.toLocaleString("en-IN")}`}</span>
              </div>
              <div className="flex justify-between font-medium text-sm text-[#121212] pt-3 border-t border-[#E4E0D7]">
                <span>Total Commission</span>
                <span className="text-[#7A1C30]">₹{order.totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Client Info & Status Controller */}
        <div className="flex flex-col gap-8">
          {/* Status Updater */}
          <OrderStatusUpdater
            orderId={order.id}
            currentFulfillment={order.status}
            currentPayment={order.paymentStatus}
          />

          {/* Customer & Shipping Details */}
          <div className="bg-white border border-[#E4E0D7] p-6 shadow-xs">
            <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-4 pb-3 border-b border-[#E4E0D7]">
              VIP Client
            </h2>
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] text-[#121212]/50 uppercase tracking-widest block">
                  Name
                </span>
                <p className="font-medium text-[#121212]">{order.customerName}</p>
              </div>

              <div>
                <span className="text-[10px] text-[#121212]/50 uppercase tracking-widest block">
                  Email
                </span>
                <p className="text-[#121212]/80">{order.customerEmail}</p>
              </div>

              <div>
                <span className="text-[10px] text-[#121212]/50 uppercase tracking-widest block">
                  Phone / WhatsApp
                </span>
                <p className="font-mono text-[#121212]/80">{order.customerPhone}</p>
              </div>

              <div className="pt-3 border-t border-[#E4E0D7]">
                <span className="text-[10px] text-[#121212]/50 uppercase tracking-widest block mb-1">
                  Delivery Destination
                </span>
                <div className="text-[#121212]/80 leading-relaxed">
                  <p>{order.shippingAddress.address}</p>
                  {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                  </p>
                  <p>{order.shippingAddress.country || "India"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
