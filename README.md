# MIRAYA — Luxury Indian Haute Couture & Bridal Atelier

A bespoke, high-performance e-commerce platform and editorial showcase built for **MIRAYA** (*Luxury Indian Haute Couture & Bridal*).

---

## ✦ Key Highlights & Architecture

- **Next.js 15 App Router & React 19** with Server & Client Components.
- **Dynamic Database & Supabase SSR Integration:**
  - Real-time sync with Supabase PostgreSQL for products, collections, orders, and customer management.
  - Supabase Storage (`product-images`) for high-resolution couture asset uploads.
- **Editorial 2-Column Product Detail Pages:**
  - 2-column image layout on desktop, snap carousel on mobile with fullscreen lookbook viewer.
  - Interactive Size Guide & Measurement Matrix with live **CM / INCHES** conversion toggle.
  - Bespoke size selector (`XS, S, M, L, XL, XXL`) with stock indicators.
  - Native HTML accordion details for fabric composition, silhouette & fit, karigar embroidery, and white-glove delivery.
- **Admin Dashboard (`/admin`):**
  - Protected with Next.js Middleware and Supabase Auth.
  - Complete product CRUD with multi-image drag-and-drop gallery and interactive size chart builder.
  - Collection drop manager (`/admin/collections`).
  - Order management and live fulfillment/payment tracking (`/admin/orders`).
  - VIP customer lifetime value directory (`/admin/customers`).
- **Interactive Shopping Bag Drawer:**
  - 60fps sliding animation for opening and closing.
  - Persistent state powered by Zustand.
- **Tailwind CSS & Editorial Typography:**
  - Custom Serif (`Playfair Display`, `Cormorant Garamond`) and Clean Sans (`Montserrat`).
  - Burgundy velvet (`#7A1C30`), warm sand (`#F7F5F0`), and gold foil accents.

---

## ✦ Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Database & Auth:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- **Styling:** Tailwind CSS, Lucide Icons, Sonner Toasts
- **State Management:** Zustand (with local persistence)

---

## ✦ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/steveprimer/miraya-couture.git
cd miraya-couture
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Database Setup
Execute the SQL schema in `supabase-schema.sql` inside your Supabase SQL Editor.

### 5. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ✦ License
Private / Proprietary Case Study.
