"use client";

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SizeChartBuilder from "@/components/admin/SizeChartBuilder";
import { ArrowLeft, Upload, X, GripVertical, Check } from "lucide-react";
import { toast } from "sonner";
import { addProduct } from "./actions";

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Save Product");

  // File States
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [sizeChart, setSizeChart] = useState<File | null>(null);

  // DND State for Gallery
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

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
    if (mainInputRef.current) mainInputRef.current.value = "";
  };

  const handleRemoveIllustration = () => {
    setSizeChart(null);
    if (sizeChartInputRef.current) sizeChartInputRef.current.value = "";
  };

  const removeGalleryImage = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  // Drag and Drop
  const handleDragStart = (index: number) => setDraggedItemIndex(index);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (index: number) => {
    if (draggedItemIndex === null) return;
    const newGallery = [...gallery];
    const draggedItem = newGallery[draggedItemIndex];
    newGallery.splice(draggedItemIndex, 1);
    newGallery.splice(index, 0, draggedItem);
    setGallery(newGallery);
    setDraggedItemIndex(null);
  };

  // Submit Logic
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoadingStatus("Uploading & Saving to Database...");

    try {
      const formData = new FormData(e.currentTarget);
      await addProduct(formData);
      setLoadingStatus("Saved!");
      toast.success("Couture piece saved to catalog.");
      router.push("/admin");
    } catch (err: any) {
      console.error("Product creation error:", err);
      toast.error(err?.message || "Failed to save product.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 font-sans bg-[#F7F5F0] min-h-screen">
      {/* Header matching Serene */}
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
          New Product
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 px-4 md:px-0">
        {/* CARD 1: Basic Information */}
        <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-8 pb-3 border-b border-[#E4E0D7]">
            Basic Information
          </h2>

          <div className="flex flex-col gap-6">
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
                required
                placeholder="e.g. Greta Pants set"
                className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors placeholder:text-[#121212]/30 text-[#121212]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="category"
                  className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors text-[#121212]"
                >
                  <option value="Lehengas">Lehengas</option>
                  <option value="Pret & Sets">Pret & Sets</option>
                  <option value="Gowns">Gowns</option>
                  <option value="Runway">Runway</option>
                  <option value="Sarees">Sarees</option>
                </select>
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
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <label
                htmlFor="composition"
                className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
              >
                Composition & Fabric
              </label>
              <textarea
                id="composition"
                name="composition"
                rows={2}
                className="w-full px-4 py-3 bg-[#F7F5F0]/60 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors resize-y text-[#121212] text-xs"
                placeholder="e.g. Raw silk, micro-tulle with hand-cut zardozi embroidery"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <label
                htmlFor="fit"
                className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
              >
                Silhouette & Fit
              </label>
              <textarea
                id="fit"
                name="fit"
                rows={2}
                className="w-full px-4 py-3 bg-[#F7F5F0]/60 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors resize-y text-[#121212] text-xs"
                placeholder="e.g. Tailored corset bodice with flared peplum jacket and straight-leg trousers"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <label
                htmlFor="technical_details"
                className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
              >
                Artisanal Details & Care
              </label>
              <textarea
                id="technical_details"
                name="technical_details"
                rows={3}
                className="w-full px-4 py-3 bg-[#F7F5F0]/60 border border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors resize-y text-[#121212] text-xs"
                placeholder="e.g. Professional dry clean only. Store in muslin cloth bag."
              />
            </div>
          </div>
        </div>

        {/* CARD 2: Pricing & Stock */}
        <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-8 pb-3 border-b border-[#E4E0D7]">
            Pricing & Stock
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="price"
                className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
              >
                Price (Rs.) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                placeholder="325000"
                className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors placeholder:text-[#121212]/30 text-[#121212]"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label
                htmlFor="sale_price"
                className="text-xs font-medium uppercase tracking-wider text-[#121212]/80"
              >
                Sale Price (Rs.)
              </label>
              <input
                type="number"
                id="sale_price"
                name="sale_price"
                min="0"
                placeholder="Optional"
                className="w-full px-0 py-3 bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors placeholder:text-[#121212]/30 text-[#121212]"
              />
            </div>
          </div>

          <h3 className="text-xs font-medium uppercase tracking-wider text-[#121212]/80 mb-6">
            Size-wise Stock *
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} className="flex flex-col gap-2">
                <span className="text-xs font-normal text-[#121212]/50 text-center">
                  {size}
                </span>
                <input
                  type="number"
                  name={`stock_${size}`}
                  min="0"
                  defaultValue="2"
                  className="w-full px-0 py-2 text-center bg-transparent border-b border-[#E4E0D7] focus:outline-none focus:border-[#7A1C30] transition-colors text-[#121212]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CARD 3: Product Media */}
        <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-8 pb-3 border-b border-[#E4E0D7]">
            Media
          </h2>

          <div className="flex flex-col gap-10">
            {/* Main Image Dropzone */}
            <div className="flex flex-col gap-4">
              <label className="text-xs font-medium uppercase tracking-wider text-[#121212]/80">
                Main Image *
              </label>

              {mainImage ? (
                <div className="relative w-48 h-64 overflow-hidden border border-[#E4E0D7] group bg-[#F7F5F0]">
                  <img
                    src={URL.createObjectURL(mainImage)}
                    alt="Main preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveMainImage}
                    className="absolute top-3 right-3 p-2 bg-white text-[#121212] rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => mainInputRef.current?.click()}
                  className="flex flex-col items-center justify-center w-full h-48 border border-[#E4E0D7] border-dashed cursor-pointer bg-[#F7F5F0]/50 hover:bg-[#F7F5F0] transition-all"
                >
                  <p className="text-xs uppercase tracking-widest text-[#121212]/60 font-medium mb-1">
                    Upload Main Look Image
                  </p>
                  <p className="text-[10px] text-[#121212]/40">
                    Will be optimized automatically
                  </p>
                </div>
              )}
              <input
                type="file"
                ref={mainInputRef}
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
              />
            </div>

            {/* Gallery Dropzone */}
            <div className="flex flex-col gap-4 border-t border-[#E4E0D7] pt-8">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-[#121212]/80">
                  Gallery Angles & Details
                </label>
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="text-xs font-medium uppercase tracking-widest text-[#7A1C30] hover:underline cursor-pointer"
                >
                  + Add More Angles
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {gallery.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(index)}
                    className="relative aspect-[3/4] overflow-hidden border border-[#E4E0D7] group cursor-grab active:cursor-grabbing bg-[#F7F5F0]"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Gallery preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeGalleryImage(index);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white text-[#121212] rounded-full shadow-xs transition-all opacity-0 group-hover:opacity-100 z-10 hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {gallery.length === 0 && (
                  <div
                    onClick={() => galleryInputRef.current?.click()}
                    className="col-span-full flex flex-col items-center justify-center w-full h-32 border border-[#E4E0D7] border-dashed cursor-pointer bg-[#F7F5F0]/50 hover:bg-[#F7F5F0] transition-all"
                  >
                    <p className="text-xs uppercase tracking-widest text-[#121212]/60 font-medium">
                      Drop Multi-Angle Gallery Images
                    </p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={galleryInputRef}
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="hidden"
              />
            </div>

            {/* Size Chart Data Builder */}
            <div className="flex flex-col gap-4 pt-8 border-t border-[#E4E0D7]">
              <label className="text-xs font-medium uppercase tracking-wider text-[#121212]/80">
                Interactive Size Chart Matrix
              </label>
              <SizeChartBuilder />
            </div>

            {/* Size Chart Illustration */}
            <div className="flex flex-col gap-4 pt-8 border-t border-[#E4E0D7]">
              <label className="text-xs font-medium uppercase tracking-wider text-[#121212]/80">
                Measurement Illustration (Optional)
              </label>
              <p className="text-[10px] text-[#121212]/60">
                This schematic displays in the size guide modal to instruct clients on how to measure.
              </p>

              {sizeChart ? (
                <div className="relative w-48 aspect-video overflow-hidden border border-[#E4E0D7] group bg-[#F7F5F0]">
                  <img
                    src={URL.createObjectURL(sizeChart)}
                    alt="Illustration preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveIllustration}
                    className="absolute top-2 right-2 p-1.5 bg-white text-[#121212] rounded-full shadow-xs transition-all opacity-0 group-hover:opacity-100 hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => sizeChartInputRef.current?.click()}
                    className="px-6 py-3 border border-[#E4E0D7] text-xs font-medium uppercase tracking-widest text-[#121212] bg-transparent hover:bg-[#F7F5F0] transition-all cursor-pointer"
                  >
                    Upload Illustration
                  </button>
                </div>
              )}
              <input
                type="file"
                ref={sizeChartInputRef}
                accept="image/*"
                onChange={handleSizeChartChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* CARD 4: Visibility */}
        <div className="bg-white border border-[#E4E0D7] p-8 shadow-xs">
          <h2 className="text-xs font-medium uppercase tracking-widest text-[#121212] mb-8 pb-3 border-b border-[#E4E0D7]">
            Visibility & Showcases
          </h2>

          <div className="flex flex-col gap-5">
            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="checkbox"
                name="is_featured"
                defaultChecked
                className="w-4 h-4 accent-[#7A1C30] rounded-none cursor-pointer"
              />
              <span className="text-xs uppercase tracking-wider text-[#121212]/80 group-hover:text-[#121212] transition-colors">
                Featured Couture Piece (Show on Homepage & Lookbook)
              </span>
            </label>

            <label className="flex items-center gap-4 cursor-pointer group">
              <input
                type="checkbox"
                name="is_new_arrival"
                defaultChecked
                className="w-4 h-4 accent-[#7A1C30] rounded-none cursor-pointer"
              />
              <span className="text-xs uppercase tracking-wider text-[#121212]/80 group-hover:text-[#121212] transition-colors">
                New Season Arrival (Show in Runway & Capsule sections)
              </span>
            </label>
          </div>
        </div>

        {/* Sticky Bottom Bar matching Serene */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-white/95 backdrop-blur-md border-t border-[#E4E0D7] p-4 px-8 flex justify-end z-20 shadow-md">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#121212] text-[#F7F5F0] hover:bg-[#7A1C30] px-10 py-4 text-xs font-medium uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center gap-3 cursor-pointer shadow-xs"
          >
            {isSubmitting ? (
              <span>{loadingStatus}</span>
            ) : (
              <span>Save Product</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
