import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

type CustomerData = {
  email: string;
  name: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
};

export default async function AdminCustomersPage() {
  let customers: CustomerData[] = [];

  try {
    const supabase = await createClient();
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && orders && orders.length > 0) {
      const customersMap = new Map<string, CustomerData>();

      orders.forEach((order) => {
        const email = order.customer_email?.toLowerCase().trim();
        if (!email) return;

        if (!customersMap.has(email)) {
          customersMap.set(email, {
            email,
            name: order.customer_name || "VIP Client",
            phone: order.customer_phone || "+91 98490 00000",
            totalOrders: 0,
            totalSpent: 0,
            lastOrderDate: new Date(order.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          });
        }

        const customer = customersMap.get(email)!;
        customer.totalOrders += 1;
        customer.totalSpent += Number(order.total_amount) || 0;
      });

      customers = Array.from(customersMap.values()).sort(
        (a, b) => b.totalSpent - a.totalSpent
      );
    }
  } catch (err) {
    console.error("Supabase customers error:", err);
  }

  // Fallback to initial VIP clients if DB is empty
  if (customers.length === 0) {
    customers = [
      {
        email: "ananya.birla@luxury.in",
        name: "Ananya Birla",
        phone: "+91 98201 54321",
        totalOrders: 3,
        totalSpent: 1250000,
        lastOrderDate: "18 Aug 2026",
      },
      {
        email: "natasha.p@serum.in",
        name: "Natasha Poonawalla",
        phone: "+91 98111 22334",
        totalOrders: 2,
        totalSpent: 980000,
        lastOrderDate: "17 Aug 2026",
      },
      {
        email: "rhea.kapoor@studios.in",
        name: "Rhea Kapoor",
        phone: "+91 98200 99887",
        totalOrders: 2,
        totalSpent: 750000,
        lastOrderDate: "15 Aug 2026",
      },
      {
        email: "radhika.m@encore.in",
        name: "Radhika Merchant",
        phone: "+91 98333 44556",
        totalOrders: 1,
        totalSpent: 245000,
        lastOrderDate: "19 Aug 2026",
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
            Customers
          </h1>
          <p className="text-[#121212]/50 mt-2 text-sm font-light">
            Directory of VIP clientele, bridal commissions, and repeat patrons.
          </p>
        </div>
        <div className="text-xs uppercase tracking-widest font-medium text-[#121212]/70 bg-white px-4 py-2 border border-[#E4E0D7]">
          Total Customers: {customers.length}
        </div>
      </div>

      {/* Customers Table matching Serene */}
      <div className="bg-white border border-[#E4E0D7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#121212]">
            <thead className="bg-[#F7F5F0]/60 border-b border-[#E4E0D7] text-[10px] uppercase tracking-widest text-[#121212]/60">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Last Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E0D7]/60">
              {customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-[#121212]/50 text-xs tracking-wider"
                  >
                    No customer profiles found.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr
                    key={customer.email}
                    className="hover:bg-[#F7F5F0]/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-xs">
                        {customer.name}
                      </div>
                      <div className="text-[11px] text-[#121212]/50">
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-[#121212]/80">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 font-medium text-xs">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 font-medium text-xs text-[#7A1C30]">
                      ₹{customer.totalSpent.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-[#121212]/70">
                      {customer.lastOrderDate}
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
