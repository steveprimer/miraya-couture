import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Sparkles, HeartHandshake, Scissors, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About The Atelier & Craftsmanship | MIRAYA",
  description:
    "Discover the world of Miraya—luxury Indian haute couture defined by architectural draping, French knots, and intricate zardozi embroidery.",
};

export default function AboutUsPage() {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto space-y-20">
      {/* Header Manifesto */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#7A1C30] font-medium flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          <span>The Atelier Philosophy</span>
        </span>
        <h1
          className="text-4xl md:text-6xl font-light italic text-[#121212] tracking-wide leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Crafting Modern Heritage With Timeless Precision
        </h1>
        <p className="text-xs md:text-sm text-[#121212]/70 font-light leading-relaxed">
          Founded in Hyderabad, Miraya redefines contemporary Indian haute couture. We merge traditional artisanal handcraft with clean, structural lines for the modern global connoisseur.
        </p>
      </div>

      {/* Split Hero Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/5] bg-[#EAE7DF] border border-[#E4E0D7] overflow-hidden">
          <Image
            src="/images/hero_reframed.jpg"
            alt="Miraya Atelier Couture"
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="space-y-6 md:p-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A1C30] font-medium block">
            Artisanal Precision
          </span>
          <h2
            className="text-3xl md:text-4xl font-light italic text-[#121212]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The Language of Embroidery
          </h2>
          <p className="text-xs text-[#121212]/70 leading-relaxed font-light">
            Every Miraya piece begins as a narrative. Our master artisans spend hundreds of hours perfecting cutdana, zardozi, and micro-sequin motifs that flow seamlessly across raw silks and gossamer micro-tulles.
          </p>
          <p className="text-xs text-[#121212]/70 leading-relaxed font-light">
            From red carpet appearances to grand bridal weddings worldwide, our silhouettes are designed to evoke effortless grace and understated luxury.
          </p>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-block px-8 py-3.5 bg-[#121212] hover:bg-[#7A1C30] text-white text-xs uppercase tracking-widest transition-colors font-medium"
            >
              Explore Creations
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-[#E4E0D7]">
        <div className="bg-white border border-[#E4E0D7] p-8 space-y-3">
          <Scissors className="w-6 h-6 text-[#7A1C30] stroke-[1.5]" />
          <h3
            className="text-xl font-light italic text-[#121212]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Bespoke Tailoring
          </h3>
          <p className="text-xs text-[#121212]/70 font-light leading-relaxed">
            Every garment is custom-fitted to each client&apos;s unique posture and measurements with personalized consultations.
          </p>
        </div>

        <div className="bg-white border border-[#E4E0D7] p-8 space-y-3">
          <HeartHandshake className="w-6 h-6 text-[#7A1C30] stroke-[1.5]" />
          <h3
            className="text-xl font-light italic text-[#121212]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Artisan Empowerment
          </h3>
          <p className="text-xs text-[#121212]/70 font-light leading-relaxed">
            We champion generational handloom weavers and zardozi karigars across India with ethical atelier standards.
          </p>
        </div>

        <div className="bg-white border border-[#E4E0D7] p-8 space-y-3">
          <Award className="w-6 h-6 text-[#7A1C30] stroke-[1.5]" />
          <h3
            className="text-xl font-light italic text-[#121212]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Haute Couture Quality
          </h3>
          <p className="text-xs text-[#121212]/70 font-light leading-relaxed">
            Sourced using raw silk, tissue organza, French chantilly lace, and museum-grade embroidery threads.
          </p>
        </div>
      </div>
    </div>
  );
}
