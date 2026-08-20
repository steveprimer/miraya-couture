-- ==============================================================================
-- MISHRU / SERENE COMPLETE SUPABASE DATABASE SCHEMA & MIGRATION
-- Copy and paste this entire script into your Supabase SQL Editor and click "RUN".
-- ==============================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. PRODUCTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    price NUMERIC NOT NULL DEFAULT 0,
    sale_price NUMERIC,
    currency_symbol TEXT DEFAULT 'Rs.',
    category TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active', -- 'Active', 'Draft'
    composition TEXT,
    fit TEXT,
    technical_details TEXT,
    size_stock JSONB NOT NULL DEFAULT '[
        {"size": "XS", "stock": 5},
        {"size": "S", "stock": 5},
        {"size": "M", "stock": 5},
        {"size": "L", "stock": 5},
        {"size": "XL", "stock": 5},
        {"size": "XXL", "stock": 5}
    ]'::jsonb,
    size_chart_data JSONB,
    size_chart_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_new_arrival BOOLEAN NOT NULL DEFAULT FALSE,
    main_image TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}'::text[],
    shop_the_look_image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for fast storefront lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);

-- ==============================================================================
-- 3. COLLECTIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active', -- 'Active', 'Draft', 'Archived'
    description TEXT,
    image_url TEXT,
    product_ids JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for collections
CREATE INDEX IF NOT EXISTS idx_collections_slug ON public.collections(slug);
CREATE INDEX IF NOT EXISTS idx_collections_status ON public.collections(status);

-- ==============================================================================
-- 4. ORDERS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address JSONB NOT NULL DEFAULT '{}'::jsonb,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    shipping_fee NUMERIC NOT NULL DEFAULT 0,
    total_amount NUMERIC NOT NULL DEFAULT 0,
    payment_status TEXT NOT NULL DEFAULT 'Pending', -- 'Paid', 'Pending', 'Refunded'
    fulfillment_status TEXT NOT NULL DEFAULT 'Unfulfilled', -- 'Unfulfilled', 'Processing', 'Shipped', 'Fulfilled', 'Cancelled'
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    razorpay_signature TEXT,
    tracking_number TEXT,
    courier_name TEXT,
    shiprocket_order_id TEXT,
    shiprocket_shipment_id TEXT
);

-- Indexing for orders
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_fulfillment_status ON public.orders(fulfillment_status);

-- ==============================================================================
-- 5. AUTO-UPDATE UPDATED_AT TIMESTAMP TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS set_collections_updated_at ON public.collections;
CREATE TRIGGER set_collections_updated_at
BEFORE UPDATE ON public.collections
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Products RLS: Everyone can read active products, full access for authenticated/service role
CREATE POLICY "Public Read Active Products" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Admin Full Access Products" ON public.products
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Collections RLS: Everyone can read active collections, full access for authenticated/service role
CREATE POLICY "Public Read Collections" ON public.collections
    FOR SELECT USING (true);

CREATE POLICY "Admin Full Access Collections" ON public.collections
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Orders RLS: Anyone can insert an order (during checkout), admin can view/manage all orders
CREATE POLICY "Public Insert Orders" ON public.orders
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public Read Own Orders" ON public.orders
    FOR SELECT USING (true);

CREATE POLICY "Admin Full Access Orders" ON public.orders
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- ==============================================================================
-- 7. SUPABASE STORAGE BUCKET (product-images)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies: Public view, authenticated/service role upload & delete
CREATE POLICY "Public Storage Read" ON storage.objects
    FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Public Storage Insert" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Public Storage Update" ON storage.objects
    FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Public Storage Delete" ON storage.objects
    FOR DELETE USING (bucket_id = 'product-images');

-- ==============================================================================
-- 8. INITIAL SEED DATA (Mishru Signature Collections & Couture Pieces)
-- ==============================================================================
INSERT INTO public.collections (name, slug, status, description, image_url) VALUES
('Reframed', 'reframed', 'Active', 'Architectural silhouettes interwoven with signature cutdana embroidery and French knots.', '/images/hero_reframed.jpg'),
('Capsule Collection', 'capsule-collection', 'Active', 'Contemporary pret sets and tailored separates designed for effortless modern elegance.', '/images/rheia_skirt_set.jpg'),
('From The Runway', 'from-the-runway', 'Active', 'Haute couture runway statement pieces with cascading drapes and heritage craftsmanship.', '/images/emma_runway.jpg'),
('Everblooming Embroidery', 'everblooming-embroidery', 'Active', 'Artisanal floral motifs handcrafted in raw silk, organza, and micro-tulle.', '/images/amelia_lehenga.jpg'),
('A Wildscape Installation', 'a-wildscape-installation', 'Active', 'An immersive editorial installation showcasing modern Indian bridal opulence.', '/images/runway_atmosphere.jpg')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (
    name, slug, price, currency_symbol, category, status, composition, fit, technical_details, is_featured, is_new_arrival, main_image, gallery_images
) VALUES
(
    'Greta Pants set',
    'greta-pants-set',
    325000,
    'Rs.',
    'Pret & Sets',
    'Active',
    'Fabric: Raw silk and micro-tulle with pure silk lining.',
    'Structured peplum jacket with tailored straight-leg trousers and sweetheart corset bodice.',
    'Handcrafted with intricate zardozi, micro cutdana, and metallic sequin highlights. Professional dry clean only.',
    true,
    true,
    '/images/hero_reframed.jpg',
    ARRAY['/images/ig_pastel_halter.webp', '/images/ig_peach_sheer.webp']
),
(
    'Cressida Skirt set',
    'cressida-skirt-set',
    285000,
    'Rs.',
    'Pret & Sets',
    'Active',
    'Fabric: Tissue organza with silk crepe lining.',
    'Flared high-waisted tiered skirt with cropped embellished bustier.',
    'Embroidered with French knots and silver dabka work. Dry clean only.',
    true,
    false,
    '/images/rheia_skirt_set.jpg',
    ARRAY['/images/alyssa_lehenga.jpg']
),
(
    'Ashi Cape set',
    'ashi-cape-set',
    345000,
    'Rs.',
    'Pret & Sets',
    'Active',
    'Fabric: Micro-tulle cape with raw silk trousers.',
    'Floor-length dramatic sheer cape with tailored inner bustier and trousers.',
    'Artisanal bugle beads and multi-tonal resham embroidery.',
    true,
    true,
    '/images/emma_runway.jpg',
    ARRAY['/images/runway_atmosphere.jpg']
),
(
    'Zenith Skirt set',
    'zenith-skirt-set',
    310000,
    'Rs.',
    'Pret & Sets',
    'Active',
    'Fabric: Georgette and raw silk.',
    'Flared layered skirt paired with architectural structured top.',
    'Geometric cutdana embroidery with crystal highlights.',
    true,
    false,
    '/images/amelia_lehenga.jpg',
    ARRAY['/images/edel_lehenga.jpg']
),
(
    'Esme Lehenga',
    'esme-lehenga',
    425000,
    'Rs.',
    'Lehengas',
    'Active',
    'Fabric: Pure raw silk and gossamer organza dupatta.',
    'Full volume 16-kali flared bridal lehenga with plunging sweetheart blouse.',
    'Hand-embroidered with heritage zardozi, pearls, and cutdana. Dry clean only.',
    true,
    true,
    '/images/esme_lehenga.jpg',
    ARRAY['/images/safiya_lehenga.jpg']
),
(
    'Mishika Lehenga',
    'mishika-lehenga',
    465000,
    'Rs.',
    'Lehengas',
    'Active',
    'Fabric: Heavy silk tissue and sheer organza veil.',
    'Architectural bridal lehenga with sculpted blouse and double dupatta drape.',
    'Multi-dimensional metallic embroidery with 3D floral applique.',
    true,
    false,
    '/images/mishika_lehenga.jpg',
    ARRAY['/images/alyssa_lehenga.jpg']
)
ON CONFLICT (slug) DO NOTHING;
