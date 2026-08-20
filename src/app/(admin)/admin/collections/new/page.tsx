"use client";

import { useState, useRef, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addCollection, getAllProducts } from "./actions";
import { ArrowLeft, X, Check, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useAdminStore } from "@/store/adminStore";
import { toast } from "sonner";

export default function AddCollectionPage() {
  const router = useRouter();
  const addCollectionStore = useAdminStore((state) => state.addCollection);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Save Collection");

  // File State
  const [image, setImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Products State
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllProducts().then(setProducts).catch(console.error);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const toggleProductSelection = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoadingStatus("Creating Collection...");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const status = formData.get("status") as "Active" | "Archived";
    const description = formData.get("description") as string;

    setTimeout(() => {
      addCollectionStore({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        description: description || "Curated bespoke haute couture collection.",
        image: image ? URL.createObjectURL(image) : "/images/hero_reframed.jpg",
        productCount: selectedProductIds.length,
        status,
      });

      setIsSubmitting(false);
      toast.success(`Collection "${name}" created successfully.`);
      router.push("/admin/collections");
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 font-sans bg-[#F7F5F0] min-h-screen">
      <div className="mb-10 pt-4 px-4 md:px-0">
        <Link
          href="/admin/collections"
          className="text-xs text-[#121212]/60 hover:text-[#121212] mb-4 inline-flex items-center gap-1.5 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collections</span>
        </Link>
        <h1
          className="text-4xl font-light italic text-[#121212] tracking-tight mt-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          New Collection
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 px-4 md:px-0">
        {/* CARD 1: Basic Information */}
        <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-8 pb-3 border-b border-[#E4E0D7]">
            Basic Information
          </h2>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="name"
                  className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
                >
                  Collection Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Autumn Couture 2026"
                  className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors placeholder:text-[#121212]/30 text-[#121212]"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="status"
                  className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors text-[#121212]"
                >
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <label
                htmlFor="description"
                className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
              >
                Curatorial Statement / Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe the aesthetic narrative, craftsmanship, and mood of the collection..."
                className="w-full px-4 py-3 bg-[#F7F5F0]/60 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors resize-y text-[#121212] text-xs"
              />
            </div>
          </div>
        </div>

        {/* CARD 2: Media */}
        <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-8 pb-3 border-b border-[#E4E0D7]">
            Media &amp; Banner
          </h2>

          <div className="flex flex-col gap-4">
            <label className="text-xs font-medium uppercase tracking-wider text-[#121212]/80">
              Cover Image
            </label>
            <p className="text-[10px] text-[#121212]/50 uppercase tracking-widest mb-2">
              Used as the banner graphic for the collection showcase.
            </p>

            {image ? (
              <div className="relative w-full md:w-2/3 aspect-video overflow-hidden border border-[#E4E0D7] group bg-[#F7F5F0]">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-4 right-4 p-2 bg-white text-[#121212] rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => imageInputRef.current?.click()}
                className="flex flex-col items-center justify-center w-full md:w-2/3 aspect-video border border-[#E4E0D7] border-dashed cursor-pointer bg-[#F7F5F0]/50 hover:bg-[#F7F5F0] transition-all"
              >
                <p className="text-xs uppercase tracking-widest text-[#121212]/60 font-medium mb-1">
                  Upload Collection Cover Banner
                </p>
                <p className="text-[10px] text-[#121212]/40">
                  16:9 aspect ratio recommended
                </p>
              </div>
            )}
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* CARD 3: Products Selection */}
        <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-1">
                Select Couture Pieces
              </h2>
              <p className="text-[10px] text-[#121212]/50 uppercase tracking-widest">
                Curate which designs belong to this collection.
              </p>
            </div>
            <p className="text-[10px] text-[#121212]/70 uppercase font-medium tracking-widest bg-[#F7F5F0] px-3 py-1 border border-[#E4E0D7]">
              {selectedProductIds.length} Selected
            </p>
          </div>

          <input
            type="text"
            placeholder="Search pieces by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-[#F7F5F0]/60 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors placeholder:text-[#121212]/30 text-[#121212] mb-6 text-xs"
          />

          <div className="max-h-[400px] overflow-y-auto border border-[#E4E0D7] bg-[#F7F5F0]/30 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products
                .filter((p) =>
                  p.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product) => {
                  const isSelected = selectedProductIds.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => toggleProductSelection(product.id)}
                      className={`flex items-center gap-3 p-2 border cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#121212] bg-white shadow-xs"
                          : "border-[#E4E0D7] bg-transparent hover:border-[#121212]/40"
                      }`}
                    >
                      <div className="w-12 h-16 bg-[#EAE7DF] shrink-0 relative overflow-hidden">
                        <Image
                          src={product.main_image}
                          alt={product.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-xs font-normal text-[#121212] truncate"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          {product.name}
                        </h4>
                        <p className="text-[10px] text-[#121212]/60 mt-0.5">
                          Rs. {product.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="shrink-0 px-2">
                        <div
                          className={`w-4 h-4 border flex items-center justify-center ${
                            isSelected
                              ? "bg-[#121212] border-[#121212]"
                              : "border-[#121212]/30"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white/95 backdrop-blur-md border-t border-[#E4E0D7] p-4 px-8 flex justify-end z-20 shadow-md">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#121212] text-[#F7F5F0] hover:bg-[#7A1C30] px-10 py-4 text-xs font-medium uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center gap-3 cursor-pointer shadow-xs"
          >
            {isSubmitting ? <span>{loadingStatus}</span> : <span>Save Collection</span>}
          </button>
        </div>
      </form>
    </div>
  );
}
