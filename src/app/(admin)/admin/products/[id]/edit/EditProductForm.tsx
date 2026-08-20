"use client";

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SizeChartBuilder, { SizeChartData } from "@/components/admin/SizeChartBuilder";
import { ArrowLeft, X } from "lucide-react";
import { toast } from "sonner";
import { updateProduct } from "./actions";

interface EditProductFormProps {
  product: any;
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Update Product");

  // File States
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [sizeChart, setSizeChart] = useState<File | null>(null);

  // Existing URLs
  const [existingMainImage, setExistingMainImage] = useState(product.image);

  // Refs for hidden inputs
  const mainInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const sizeChartInputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setMainImage(e.target.files[0]);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setGallery((prev) => [...prev, ...newFiles]);
    }
  };

  const handleSizeChartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setSizeChart(e.target.files[0]);
  };

  const handleRemoveMainImage = () => {
    setMainImage(null);
    setExistingMainImage("");
    if (mainInputRef.current) mainInputRef.current.value = "";
  };

  const removeGalleryImage = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoadingStatus("Saving changes to database...");

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("id", product.id);
      if (existingMainImage && !mainImage) {
        formData.append("main_image_url", existingMainImage);
      }
      await updateProduct(formData);
      setLoadingStatus("Saved!");
      toast.success("Product updated successfully in database.");
      router.push("/admin");
    } catch (err: any) {
      console.error("Product update error:", err);
      toast.error(err?.message || "Failed to update product.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 font-sans bg-[#F7F5F0] min-h-screen">
      <div className="mb-10 pt-4 px-4 md:px-0">
        <Link
          href="/admin"
          className="text-xs text-[#121212]/60 hover:text-[#121212] mb-4 inline-flex items-center gap-1.5 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </Link>
        <h1
          className="text-4xl font-light italic text-[#121212] tracking-tight mt-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Edit Product — {product.name}
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
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={product.name}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors text-[#121212]"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="category"
                  className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={product.category}
                  className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors text-[#121212]"
                >
                  <option value="Pret & Sets">Pret &amp; Sets</option>
                  <option value="Lehengas">Lehengas</option>
                  <option value="Gowns">Gowns</option>
                  <option value="Runway">Runway</option>
                  <option value="Sarees">Sarees</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="composition"
                  className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
                >
                  Composition &amp; Fabric
                </label>
                <input
                  type="text"
                  id="composition"
                  name="composition"
                  defaultValue={product.composition || ""}
                  className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors text-[#121212]"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="fit"
                  className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
                >
                  Silhouette &amp; Fit
                </label>
                <input
                  type="text"
                  id="fit"
                  name="fit"
                  defaultValue={product.fit || ""}
                  className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors text-[#121212]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="technical_details"
                className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
              >
                Embroidery &amp; Care Details
              </label>
              <textarea
                id="technical_details"
                name="technical_details"
                rows={3}
                defaultValue={product.technicalDetails || ""}
                className="w-full px-4 py-3 bg-[#F7F5F0]/60 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors text-xs text-[#121212]"
              />
            </div>
          </div>
        </div>

        {/* CARD 2: Pricing & Stock */}
        <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-8 pb-3 border-b border-[#E4E0D7]">
            Pricing &amp; Size-Wise Stock
          </h2>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="price"
                  className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
                >
                  Price (INR) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={product.price}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors text-[#121212]"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="sale_price"
                  className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
                >
                  Sale / Exhibit Price (Optional)
                </label>
                <input
                  type="number"
                  id="sale_price"
                  name="sale_price"
                  defaultValue={product.salePrice || ""}
                  className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors text-[#121212]"
                />
              </div>
            </div>

            {/* Size Stocks */}
            <div className="pt-4 border-t border-[#E4E0D7]">
              <h3 className="text-xs font-medium uppercase tracking-widest text-[#121212]/80 mb-4">
                Stock by Size
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => {
                  const currentStockItem = Array.isArray(product.sizeStock)
                    ? product.sizeStock.find((s: any) => s.size === sz)
                    : null;
                  const val = currentStockItem ? currentStockItem.stock : 5;

                  return (
                    <div key={sz} className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-center text-[#121212]/70">
                        {sz}
                      </label>
                      <input
                        type="number"
                        name={`stock_${sz}`}
                        defaultValue={val}
                        min="0"
                        className="text-center py-2 bg-[#F7F5F0]/60 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] text-xs text-[#121212]"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: Media */}
        <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-8 pb-3 border-b border-[#E4E0D7]">
            Media &amp; Visuals
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label className="text-xs font-medium uppercase tracking-wider text-[#121212]/80">
                Main Look Image
              </label>

              {mainImage ? (
                <div className="relative w-40 h-52 border border-[#7A1C30] group bg-[#F7F5F0]">
                  <img
                    src={URL.createObjectURL(mainImage)}
                    alt="New Main Look"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveMainImage}
                    className="absolute top-2 right-2 p-1 bg-white text-[#121212] rounded-full shadow-md hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : existingMainImage ? (
                <div className="relative w-40 h-52 border border-[#E4E0D7] group bg-[#F7F5F0]">
                  <img
                    src={existingMainImage}
                    alt="Current Look"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => mainInputRef.current?.click()}
                    className="absolute inset-0 bg-black/50 text-white text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => mainInputRef.current?.click()}
                  className="w-40 h-52 border border-[#E4E0D7] border-dashed flex flex-col items-center justify-center text-xs text-[#121212]/60 hover:bg-[#F7F5F0] transition-colors cursor-pointer"
                >
                  <span>Upload Main Look</span>
                </button>
              )}

              <input
                type="file"
                ref={mainInputRef}
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Sticky Save Bar */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white/95 backdrop-blur-md border-t border-[#E4E0D7] p-4 px-8 flex justify-end z-20 shadow-md">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#121212] text-[#F7F5F0] hover:bg-[#7A1C30] px-10 py-4 text-xs font-medium uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center gap-3 cursor-pointer shadow-xs"
          >
            {isSubmitting ? <span>{loadingStatus}</span> : <span>Update Product</span>}
          </button>
        </div>
      </form>
    </div>
  );
}
