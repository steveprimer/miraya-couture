import Link from "next/link";
import { revalidatePath } from "next/cache";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { Plus, Edit3, RefreshCw, Sparkles } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { PRODUCTS } from "@/data/products";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let products: any[] = [];
  let isConnectedToDb = false;

  try {
    const supabase = await createClient();
    const { data: dbProducts, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && dbProducts && dbProducts.length > 0) {
      isConnectedToDb = true;
      products = dbProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price) || 0,
        category: p.category || "Couture",
        status: p.status || "Active",
        image: p.main_image || "/images/hero_reframed.jpg",
        featured: p.is_featured,
        size_stock: p.size_stock,
      }));
    }
  } catch (err) {
    console.error("Supabase products query error:", err);
  }

  // Fallback to static catalog if DB is empty or not yet connected
  if (products.length === 0) {
    products = PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      category: p.category,
      status: p.inStock ? "Active" : "Draft",
      image: p.image,
      featured: p.featured,
      size_stock: [
        { size: "XS", stock: 3 },
        { size: "S", stock: 5 },
        { size: "M", stock: 4 },
        { size: "L", stock: 2 },
        { size: "XL", stock: 1 },
        { size: "XXL", stock: 0 },
      ],
    }));
  }

  async function deleteProductAction(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    try {
      const adminSupabase = createAdminClient();
      await adminSupabase.from("products").delete().eq("id", id);
    } catch (e) {
      console.error("Delete error:", e);
    }
    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/shop");
  }

  async function seedDatabaseAction() {
    "use server";
    try {
      const adminSupabase = createAdminClient();
      
      const seedProducts = PRODUCTS.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category,
        price: p.price,
        currency: "INR",
        main_image: p.image,
        gallery_images: [p.image, p.secondaryImage].filter(Boolean),
        composition: p.description,
        fit: p.details?.[0] || "Custom tailored couture fit.",
        technical_details: p.details?.join(". ") || "Handcrafted zardozi embroidery.",
        care_instructions: "Dry clean only. Store in protective garment bag.",
        size_stock: [
          { size: "XS", stock: 3 },
          { size: "S", stock: 5 },
          { size: "M", stock: 4 },
          { size: "L", stock: 2 },
          { size: "XL", stock: 1 },
          { size: "XXL", stock: 0 },
        ],
        status: "Active",
        is_featured: p.featured || false,
      }));

      await adminSupabase.from("products").upsert(seedProducts, { onConflict: "id" });
    } catch (e) {
      console.error("Seed action error:", e);
    }
    revalidatePath("/admin");
    revalidatePath("/shop");
    revalidatePath("/");
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4 border-b border-[#E4E0D7] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1
              className="text-4xl font-light italic text-[#121212] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Products
            </h1>
            <span className="text-xs px-2.5 py-0.5 bg-[#121212] text-white uppercase tracking-widest font-mono">
              {products.length} Pieces
            </span>
          </div>
          <p className="text-[#121212]/50 mt-2 text-sm font-light">
            Manage your storefront inventory, bespoke pieces, and catalogs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <form action={seedDatabaseAction}>
            <button
              type="submit"
              className="border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-[#F7F5F0] px-4 py-3 text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
              title="Sync & Seed Database"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Database</span>
            </button>
          </form>

          <Link
            href="/admin/products/new"
            className="bg-[#121212] text-[#F7F5F0] hover:bg-[#7A1C30] px-6 py-3 text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-md shadow-black/10 flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Mobile Data List matching Serene */}
      <div className="md:hidden flex flex-col gap-4">
        {products.map((product) => {
          const totalStock = Array.isArray(product.size_stock)
            ? product.size_stock.reduce(
                (sum: number, item: any) => sum + (Number(item.stock) || 0),
                0
              )
            : 0;

          return (
            <div
              key={product.id}
              className="bg-white p-4 border border-[#E4E0D7] shadow-xs flex flex-col gap-3"
            >
              <div className="flex gap-4">
                <div className="w-20 h-26 bg-[#EAE7DF] border border-[#E4E0D7] overflow-hidden shrink-0 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3
                      className="font-normal text-[#121212] text-base truncate"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex gap-1 shrink-0">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 text-[#121212]/50 hover:text-[#121212] hover:bg-black/5 rounded transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={product.id} />
                        <DeleteProductButton />
                      </form>
                    </div>
                  </div>
                  <span className="text-xs text-[#121212]/60 mt-0.5">
                    {product.category}
                  </span>
                  <span className="text-sm font-medium text-[#121212] mt-1.5">
                    Rs. {product.price.toLocaleString("en-IN")}
                  </span>
                  <div className="flex items-center gap-3 mt-auto pt-2">
                    <span className="text-[9px] font-medium uppercase tracking-widest px-2 py-1 border bg-emerald-50 text-emerald-800 border-emerald-200">
                      {product.status || "Active"}
                    </span>
                    <span className="text-xs font-normal text-[#121212]/70">
                      {totalStock} in stock
                    </span>
                  </div>
                </div>
              </div>
              {product.featured && (
                <div className="flex gap-2 pt-2 border-t border-[#E4E0D7]/40">
                  <span className="px-2 py-0.5 bg-[#C5A880]/15 text-[#8F734A] text-[9px] font-medium uppercase tracking-wider border border-[#C5A880]/30">
                    Featured
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Data Table matching Serene */}
      <div className="hidden md:block bg-white border border-[#E4E0D7] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#E4E0D7] bg-[#F7F5F0]/60">
                <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest w-24">
                  Image
                </th>
                <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest">
                  Name
                </th>
                <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest">
                  Category
                </th>
                <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest">
                  Price
                </th>
                <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest text-center">
                  Stock
                </th>
                <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="p-5 text-[10px] font-medium text-[#121212]/60 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E0D7]/60">
              {products.map((product) => {
                const totalStock = Array.isArray(product.size_stock)
                  ? product.size_stock.reduce(
                      (sum: number, item: any) => sum + (Number(item.stock) || 0),
                      0
                    )
                  : 0;

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-[#F7F5F0]/40 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="w-14 h-18 bg-[#EAE7DF] border border-[#E4E0D7] overflow-hidden shrink-0 relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-normal text-[#121212] text-sm"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {product.name}
                        </span>
                        {product.featured && (
                          <span className="px-2 py-0.5 bg-[#C5A880]/15 text-[#8F734A] text-[9px] font-medium uppercase tracking-wider border border-[#C5A880]/30">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-[#121212]/70 font-light">
                      {product.category}
                    </td>
                    <td className="p-4 text-sm text-[#121212] font-medium">
                      Rs. {product.price.toLocaleString("en-IN")}
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-sm font-normal text-[#121212]">
                        {totalStock}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest border bg-emerald-50 text-emerald-800 border-emerald-200">
                        {product.status || "Active"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 items-center opacity-80 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 text-[#121212]/50 hover:text-[#7A1C30] hover:bg-black/5 transition-all"
                          title="Edit Product"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <form action={deleteProductAction}>
                          <input type="hidden" name="id" value={product.id} />
                          <DeleteProductButton />
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
