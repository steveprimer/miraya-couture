"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminStore } from "@/store/adminStore";
import { formatPrice } from "@/lib/utils";
import { Plus, Search, Edit3, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const { products, deleteProduct } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Lehengas", "Pret & Sets", "Gowns", "Runway"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subCategory?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the catalog?`)) {
      deleteProduct(id);
      toast.success(`"${name}" removed from catalog.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880]">
            Catalog Management
          </span>
          <h1
            className="text-3xl font-light italic text-white mt-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Couture Inventory & Pieces ({products.length})
          </h1>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 bg-[#7A1C30] hover:bg-[#8F233B] text-white text-xs uppercase tracking-[0.2em] font-light transition-colors flex items-center gap-2 self-start md:self-auto shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Piece</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-[#181818] p-4 border border-white/10">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by piece name, category, embroidery..."
            className="w-full bg-[#222222] border border-white/10 px-3.5 py-2 pl-9 text-xs tracking-wider text-white placeholder:text-white/40 focus:outline-none focus:border-[#7A1C30]"
          />
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 tracking-wider uppercase text-[10px] transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#7A1C30] text-white font-medium"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#181818] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs tracking-wider">
            <thead className="border-b border-white/10 bg-white/5 text-white/60 uppercase text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Piece</th>
                <th className="py-3.5 px-4">Collection / Category</th>
                <th className="py-3.5 px-4">Price (INR)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-16 bg-black/40 flex-shrink-0 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div>
                        <h3
                          className="text-sm font-normal text-white"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {product.name}
                        </h3>
                        <span className="text-[10px] text-white/50 tracking-wider uppercase block mt-0.5">
                          Slug: {product.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-white/80">
                    <span className="block font-medium text-white">
                      {product.subCategory || "Reframed"}
                    </span>
                    <span className="text-[10px] text-white/50 tracking-wider uppercase">
                      {product.category}
                    </span>
                  </td>

                  <td className="py-4 px-4 font-light text-[#C5A880]">
                    {formatPrice(product.price)}
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="p-1.5 text-white/60 hover:text-white transition-colors"
                        title="View Live"
                      >
                        Preview
                      </Link>

                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 text-white/60 hover:text-[#C5A880] transition-colors"
                        title="Edit Piece"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 text-white/60 hover:text-red-400 transition-colors cursor-pointer"
                        title="Delete Piece"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
