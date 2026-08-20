import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";
import AddToCartForm from "@/components/AddToCartForm";
import ProductGallery from "@/components/ProductGallery";
import SizeGuideTrigger from "@/components/SizeGuideTrigger";
import { getProduct } from "@/utils/getProduct";
import { formatPrice } from "@/lib/utils";
import { Sparkles, ShieldCheck, HeartHandshake, Truck, ChevronDown } from "lucide-react";
import { PRODUCTS } from "@/data/products";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Couture Piece Not Found | MIRAYA",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.name} | MIRAYA Haute Couture`,
    description:
      product.composition ||
      product.technical_details ||
      `Shop ${product.name} handcrafted by Miraya Atelier.`,
    openGraph: {
      images: [product.main_image, ...previousImages],
      title: `${product.name} | MIRAYA`,
      description:
        product.composition ||
        product.technical_details ||
        `Shop ${product.name} handcrafted by Miraya Atelier.`,
    },
    twitter: {
      images: [product.main_image],
      title: `${product.name} | MIRAYA`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products (same category, active, excluding current product)
  let relatedProducts: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("status", "Active")
      .neq("slug", product.slug)
      .limit(4);

    if (data && data.length > 0) {
      relatedProducts = data;
    }
  } catch (e) {
    console.error("Related products error:", e);
  }

  if (relatedProducts.length === 0) {
    relatedProducts = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);
  }

  // Combine main and gallery images
  const allImages = [
    product.main_image,
    ...(product.gallery_images || []),
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-24 pb-20 font-sans text-[#121212]">
      {/* Breadcrumbs */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-4">
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#121212]/60 font-light">
          <Link href="/" className="hover:text-[#7A1C30] transition-colors">
            Atelier
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#7A1C30] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#121212] font-medium">{product.name}</span>
        </nav>
      </div>

      {/* MAIN PRODUCT SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-12 max-w-[1800px] mx-auto pb-16 px-4 md:px-8 gap-8">
        {/* Left Column: 2-Column Editorial Image Grid */}
        <div className="md:col-span-7 lg:col-span-8">
          <ProductGallery images={allImages} productName={product.name} />
        </div>

        {/* Right Column: Sticky Product Buy Box & Accordions */}
        <div className="md:col-span-5 lg:col-span-4 px-2 md:px-6 lg:px-8">
          <div className="sticky top-28 flex flex-col gap-8">
            {/* Title & Price */}
            <div className="flex flex-col gap-2.5 pb-6 border-b border-[#E4E0D7]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A1C30] font-medium">
                {product.category}
              </span>
              <h1
                className="text-3xl md:text-4xl font-light italic text-[#121212] tracking-tight leading-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {product.name}
              </h1>
              <div className="text-lg font-light text-[#121212] tracking-wider mt-1">
                {product.sale_price ? (
                  <div className="flex items-center gap-3">
                    <span className="line-through text-[#121212]/40 text-base">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[#7A1C30] font-medium">
                      {formatPrice(product.sale_price)}
                    </span>
                  </div>
                ) : (
                  <span>{formatPrice(product.price)}</span>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#121212]/50 mt-1">
                Taxes included. Complimentary insured white-glove delivery worldwide.
              </p>
            </div>

            {/* Add To Cart Form */}
            <div className="w-full">
              <AddToCartForm
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.sale_price ? product.sale_price : product.price,
                  main_image: product.main_image,
                }}
                sizeStock={product.size_stock}
              />
            </div>

            {/* Accordions (Zero JS Native HTML details) */}
            <div className="flex flex-col border-t border-[#E4E0D7] divide-y divide-[#E4E0D7]">
              {/* Details & Composition */}
              <details className="group py-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer" open>
                <summary className="flex justify-between items-center text-xs uppercase tracking-[0.2em] font-medium text-[#121212]">
                  <span>Atelier Details &amp; Composition</span>
                  <ChevronDown className="w-4 h-4 text-[#121212]/40 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="mt-4 text-xs text-[#121212]/75 font-light leading-relaxed space-y-3 animate-in fade-in duration-200">
                  {product.composition && (
                    <div>
                      <span className="font-medium text-[#121212] block mb-0.5">
                        Fabric &amp; Composition:
                      </span>
                      <p>{product.composition}</p>
                    </div>
                  )}
                  {product.fit && (
                    <div>
                      <span className="font-medium text-[#121212] block mb-0.5">
                        Silhouette &amp; Fit:
                      </span>
                      <p>{product.fit}</p>
                    </div>
                  )}
                  {product.technical_details && (
                    <div>
                      <span className="font-medium text-[#121212] block mb-0.5">
                        Embroidery &amp; Craftsmanship:
                      </span>
                      <p>{product.technical_details}</p>
                    </div>
                  )}
                </div>
              </details>

              {/* Size Guide Trigger */}
              <SizeGuideTrigger
                productName={product.name}
                sizeChartData={product.size_chart_data}
                illustrationUrl={product.size_chart_url}
              />

              {/* Shipping & White-Glove Guarantee */}
              <details className="group py-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
                <summary className="flex justify-between items-center text-xs uppercase tracking-[0.2em] font-medium text-[#121212]">
                  <span>Insured Shipping &amp; Fitting Concierge</span>
                  <ChevronDown className="w-4 h-4 text-[#121212]/40 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="mt-4 text-xs text-[#121212]/75 font-light leading-relaxed space-y-2 animate-in fade-in duration-200">
                  <p>
                    <strong>Complimentary Insured Delivery:</strong> Delivered in climate-safe luxury bridal garment cases.
                  </p>
                  <p>
                    <strong>Artisan Lead Time:</strong> Handcrafted to order within 10–14 working days.
                  </p>
                  <p>
                    <strong>Fittings:</strong> Dedicated styling concierge support for post-delivery adjustments and styling tips.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* YOU MAY ALSO LIKE / COMPLEMENTARY CREATIONS SECTION */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="border-t border-[#E4E0D7] bg-white mt-12">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-16 md:py-24 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A1C30] font-medium">
                Curated Recommendations
              </span>
              <h2
                className="text-3xl md:text-4xl font-light italic text-[#121212]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Complementary Atelier Creations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[3/4] w-full bg-[#EAE7DF] overflow-hidden border border-[#E4E0D7] mb-4">
                      <Image
                        src={rp.main_image || rp.image}
                        alt={rp.name}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A1C30] font-medium block">
                        {rp.category}
                      </span>
                      <h3
                        className="text-sm font-normal text-[#121212] group-hover:text-[#7A1C30] transition-colors truncate"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {rp.name}
                      </h3>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs font-light text-[#121212] tracking-wider">
                      {formatPrice(rp.sale_price || rp.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
