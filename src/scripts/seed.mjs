import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Parse .env.local manually
const envContent = fs.readFileSync(".env.local", "utf8");
const envVars = {};
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const idx = trimmed.indexOf("=");
    if (idx !== -1) {
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim();
      envVars[key] = val;
    }
  }
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

async function run() {
  console.log("Seeding Supabase at:", supabaseUrl);

  // Collections
  const collectionsData = [
    {
      name: "Reframed",
      slug: "reframed",
      status: "Active",
      description: "Architectural silhouettes interwoven with signature cutdana embroidery and French knots.",
      image_url: "/images/hero_reframed.jpg",
    },
    {
      name: "Capsule Collection",
      slug: "capsule-collection",
      status: "Active",
      description: "Contemporary pret sets and tailored separates designed for effortless modern elegance.",
      image_url: "/images/rheia_skirt_set.jpg",
    },
    {
      name: "From The Runway",
      slug: "from-the-runway",
      status: "Active",
      description: "Haute couture runway statement pieces with cascading drapes and heritage craftsmanship.",
      image_url: "/images/emma_runway.jpg",
    },
    {
      name: "Everblooming Embroidery",
      slug: "everblooming-embroidery",
      status: "Active",
      description: "Artisanal floral motifs handcrafted in raw silk, organza, and micro-tulle.",
      image_url: "/images/amelia_lehenga.jpg",
    },
    {
      name: "A Wildscape Installation",
      slug: "a-wildscape-installation",
      status: "Active",
      description: "An immersive editorial installation showcasing modern Indian bridal opulence.",
      image_url: "/images/runway_atmosphere.jpg",
    },
  ];

  await supabase.from("collections").upsert(collectionsData, { onConflict: "slug" });

  // Products
  const productsData = [
    {
      name: "Greta Pants set",
      slug: "greta-pants-set",
      price: 325000,
      currency_symbol: "Rs.",
      category: "Pret & Sets",
      status: "Active",
      composition: "Fabric: Raw silk and micro-tulle with pure silk lining.",
      fit: "Structured peplum jacket with tailored straight-leg trousers and sweetheart corset bodice.",
      technical_details: "Handcrafted with intricate zardozi, micro cutdana, and metallic sequin highlights. Professional dry clean only.",
      is_featured: true,
      is_new_arrival: true,
      main_image: "/images/hero_reframed.jpg",
      gallery_images: ["/images/ig_pastel_halter.webp", "/images/ig_peach_sheer.webp"],
      size_stock: [
        { size: "XS", stock: 3 },
        { size: "S", stock: 5 },
        { size: "M", stock: 6 },
        { size: "L", stock: 4 },
        { size: "XL", stock: 2 },
        { size: "XXL", stock: 1 }
      ]
    },
    {
      name: "Cressida Skirt set",
      slug: "cressida-skirt-set",
      price: 285000,
      currency_symbol: "Rs.",
      category: "Pret & Sets",
      status: "Active",
      composition: "Fabric: Tissue organza with silk crepe lining.",
      fit: "Flared high-waisted tiered skirt with cropped embellished bustier.",
      technical_details: "Embroidered with French knots and silver dabka work. Dry clean only.",
      is_featured: true,
      is_new_arrival: false,
      main_image: "/images/rheia_skirt_set.jpg",
      gallery_images: ["/images/alyssa_lehenga.jpg"],
      size_stock: [
        { size: "XS", stock: 2 },
        { size: "S", stock: 4 },
        { size: "M", stock: 5 },
        { size: "L", stock: 3 },
        { size: "XL", stock: 2 },
        { size: "XXL", stock: 0 }
      ]
    },
    {
      name: "Ashi Cape set",
      slug: "ashi-cape-set",
      price: 345000,
      currency_symbol: "Rs.",
      category: "Pret & Sets",
      status: "Active",
      composition: "Fabric: Micro-tulle cape with raw silk trousers.",
      fit: "Floor-length dramatic sheer cape with tailored inner bustier and trousers.",
      technical_details: "Artisanal bugle beads and multi-tonal resham embroidery.",
      is_featured: true,
      is_new_arrival: true,
      main_image: "/images/emma_runway.jpg",
      gallery_images: ["/images/runway_atmosphere.jpg"],
      size_stock: [
        { size: "XS", stock: 1 },
        { size: "S", stock: 3 },
        { size: "M", stock: 4 },
        { size: "L", stock: 2 },
        { size: "XL", stock: 1 },
        { size: "XXL", stock: 1 }
      ]
    },
    {
      name: "Zenith Skirt set",
      slug: "zenith-skirt-set",
      price: 310000,
      currency_symbol: "Rs.",
      category: "Pret & Sets",
      status: "Active",
      composition: "Fabric: Georgette and raw silk.",
      fit: "Flared layered skirt paired with architectural structured top.",
      technical_details: "Geometric cutdana embroidery with crystal highlights.",
      is_featured: true,
      is_new_arrival: false,
      main_image: "/images/amelia_lehenga.jpg",
      gallery_images: ["/images/edel_lehenga.jpg"],
      size_stock: [
        { size: "XS", stock: 4 },
        { size: "S", stock: 6 },
        { size: "M", stock: 5 },
        { size: "L", stock: 3 },
        { size: "XL", stock: 2 },
        { size: "XXL", stock: 1 }
      ]
    },
    {
      name: "Esme Lehenga",
      slug: "esme-lehenga",
      price: 425000,
      currency_symbol: "Rs.",
      category: "Lehengas",
      status: "Active",
      composition: "Fabric: Pure raw silk and gossamer organza dupatta.",
      fit: "Full volume 16-kali flared bridal lehenga with plunging sweetheart blouse.",
      technical_details: "Hand-embroidered with heritage zardozi, pearls, and cutdana. Dry clean only.",
      is_featured: true,
      is_new_arrival: true,
      main_image: "/images/esme_lehenga.jpg",
      gallery_images: ["/images/safiya_lehenga.jpg"],
      size_stock: [
        { size: "XS", stock: 2 },
        { size: "S", stock: 3 },
        { size: "M", stock: 4 },
        { size: "L", stock: 2 },
        { size: "XL", stock: 1 },
        { size: "XXL", stock: 0 }
      ]
    },
    {
      name: "Mishika Lehenga",
      slug: "mishika-lehenga",
      price: 465000,
      currency_symbol: "Rs.",
      category: "Lehengas",
      status: "Active",
      composition: "Fabric: Heavy silk tissue and sheer organza veil.",
      fit: "Architectural bridal lehenga with sculpted blouse and double dupatta drape.",
      technical_details: "Multi-dimensional metallic embroidery with 3D floral applique.",
      is_featured: true,
      is_new_arrival: false,
      main_image: "/images/mishika_lehenga.jpg",
      gallery_images: ["/images/alyssa_lehenga.jpg"],
      size_stock: [
        { size: "XS", stock: 1 },
        { size: "S", stock: 2 },
        { size: "M", stock: 3 },
        { size: "L", stock: 1 },
        { size: "XL", stock: 1 },
        { size: "XXL", stock: 0 }
      ]
    }
  ];

  await supabase.from("products").upsert(productsData, { onConflict: "slug" });

  console.log("Seeding complete!");
}

run().catch(console.error);
