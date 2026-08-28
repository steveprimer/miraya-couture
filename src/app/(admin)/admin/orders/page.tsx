import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let orders: any[] = [];

  try {
    const supabase = await createClient();
    const { data: dbOrders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && dbOrders && dbOrders.length > 0) {
      orders = dbOrders.map((o) => ({
        id: o.id,
        orderNumber: o.id.substring(0, 8).toUpperCase(),
        createdAt: o.created_at,
        customerName: o.customer_name,
        customerEmail: o.customer_email,
        totalAmount: Number(o.total_amount) || 0,
        paymentStatus: o.payment_status || "Paid",
        status: o.fulfillment_status || "Processing",
      }));
    }
  } catch (err) {
    console.error("Supabase orders error:", err);
  }

  // Fallback to initial orders if DB is empty
  if (orders.length === 0) {
    orders = [
      {
        id: "ord-1",
        orderNumber: "MRY-9842",
        createdAt: "2026-08-18T14:32:00Z",
        customerName: "Ananya Birla",
        customerEmail: "ananya.birla@luxury.in",
        totalAmount: 325000,
        paymentStatus: "Paid",
        status: "Delivered",
      },
      {
        id: "ord-2",
        orderNumber: "MRY-9841",
        createdAt: "2026-08-17T09:15:00Z",
        customerName: "Natasha Poonawalla",
        customerEmail: "natasha.p@serum.in",
        totalAmount: 575000,
        paymentStatus: "Paid",
        status: "Processing",
      },
      {
        id: "ord-3",
        orderNumber: "MRY-9840",
        createdAt: "2026-08-15T11:45:00Z",
        customerName: "Rhea Kapoor",
        customerEmail: "rhea.kapoor@studios.in",
        totalAmount: 495000,
        paymentStatus: "Paid",
        status: "Shipped",
      },
      {
        id: "ord-4",
        orderNumber: "MRY-9839",
        createdAt: "2026-08-19T16:20:00Z",
        customerName: "Radhika Merchant",
        customerEmail: "radhika.m@encore.in",
        totalAmount: 245000,
        paymentStatus: "Pending",
        status: "Pending",
      },
    ];
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header matching Serene */}
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-[#E4E0D7]">
        <div>
          <h1
            className="text-4xl font-light italic text-[#121212] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Orders
          </h1>
          <p className="text-[#121212]/50 mt-2 text-sm font-light">
            Track bespoke bridal commissions and pret orders.
          </p>
        </div>
        <div className="text-xs uppercase tracking-widest font-medium text-[#121212]/70 bg-white px-4 py-2 border border-[#E4E0D7]">
          Total Orders: {orders.length}
        </div>
      </div>

      {/* Orders Table matching Serene */}
      <div className="bg-white border border-[#E4E0D7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#121212]">
            <thead className="bg-[#F7F5F0]/60 border-b border-[#E4E0D7] text-[10px] uppercase tracking-widest text-[#121212]/60">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Fulfillment</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E0D7]/60">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-[#121212]/50 text-xs tracking-wider"
                  >
                    No orders placed yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#F7F5F0]/40 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs text-[#7A1C30]">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-[#121212]/70">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-xs">
                        {order.customerName}
                      </div>
                      <div className="text-[11px] text-[#121212]/50">
                        {order.customerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-xs">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-[9px] uppercase tracking-widest font-medium border ${
                          order.paymentStatus === "Paid"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-[9px] uppercase tracking-widest font-medium border ${
                          order.status === "Delivered" || order.status === "Fulfilled"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-[#F7F5F0] text-[#121212]/70 border-[#E4E0D7]"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-xs uppercase tracking-widest text-[#7A1C30] hover:underline font-medium"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
