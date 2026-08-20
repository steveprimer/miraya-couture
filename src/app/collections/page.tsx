import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Curated Collections & Exhibits | MIRAYA",
  description:
    "Discover Miraya's signature collections, from Reframed bridal haute couture to runway installations and artisanal embroidery exhibits.",
};

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  let collections = [
    {
      id: "1",
      name: "Reframed",
      slug: "reframed",
      description: "Architectural silhouettes interwoven with signature cutdana embroidery and French knots.",
      image: "/images/hero_reframed.jpg",
    },
    {
      id: "2",
      name: "Capsule Collection",
      slug: "capsule-collection",
      description: "Contemporary pret sets and tailored separates designed for effortless modern elegance.",
      image: "/images/rheia_skirt_set.jpg",
    },
    {
      id: "3",
      name: "From The Runway",
      slug: "from-the-runway",
      description: "Haute couture runway statement pieces with cascading drapes and heritage craftsmanship.",
      image: "/images/emma_runway.jpg",
    },
    {
      id: "4",
      name: "Everblooming Embroidery",
      slug: "everblooming-embroidery",
      description: "Artisanal floral motifs handcrafted in raw silk, organza, and micro-tulle.",
      image: "/images/amelia_lehenga.jpg",
    },
    {
      id: "5",
      name: "A Wildscape Installation",
      slug: "a-wildscape-installation",
      description: "An immersive editorial installation showcasing modern Indian bridal opulence.",
      image: "/images/runway_atmosphere.jpg",
    },
  ];

  try {
    const supabase = await createClient();
    const { data: dbCollections } = await supabase
      .from("collections")
      .select("*")
      .eq("status", "Active")
      .order("created_at", { ascending: false });

    if (dbCollections && dbCollections.length > 0) {
      collections = dbCollections.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description || "Curated bespoke haute couture collection.",
        image: c.image_url || "/images/hero_reframed.jpg",
      }));
    }
  } catch (err) {
    console.error("Supabase collections fetch error:", err);
  }

  return (
    <div className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A1C30] font-medium flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span>Atelier Exhibits &amp; Stories</span>
        </span>
        <h1
          className="text-4xl md:text-5xl font-light italic text-[#121212] tracking-wide"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Signature Collections
        </h1>
        <p className="text-xs text-[#121212]/60 font-light leading-relaxed">
          Each collection represents a distinct narrative in Indian haute couture—blending architectural tailoring with century-old zardozi and cutdana techniques.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {collections.map((col, index) => (
          <div
            key={col.id}
            className="group flex flex-col justify-between border border-[#E4E0D7] bg-white overflow-hidden shadow-xs hover:border-[#121212]/30 transition-all"
          >
            <div>
              <div className="relative aspect-[16/10] w-full bg-[#EAE7DF] overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end text-white">
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880] block mb-1">
                      Exhibit {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-light italic"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {col.name}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <p className="text-xs text-[#121212]/70 leading-relaxed font-light">
                  {col.description}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8 pt-0 flex justify-between items-center border-t border-[#E4E0D7]/40">
              <span className="text-[10px] uppercase tracking-widest text-[#7A1C30] font-medium">
                Active Atelier Drop
              </span>

              <Link
                href={`/shop?category=${encodeURIComponent(col.name)}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#121212] hover:text-[#7A1C30] font-medium transition-colors"
              >
                <span>Explore Pieces</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
