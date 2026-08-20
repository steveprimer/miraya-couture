import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  metadataBase: new URL("https://mirayacouture.com"),
  title: "MIRAYA | Luxury Indian Haute Couture & Bridal",
  description:
    "Explore Miraya's signature couture collections, bridal lehengas, and contemporary pret handcrafted with artisanal embroidery and timeless silhouettes.",
  keywords: [
    "Miraya",
    "Luxury Fashion",
    "Indian Couture",
    "Bridal Lehengas",
    "Handcrafted Embroidery",
    "Pret",
  ],
  openGraph: {
    title: "MIRAYA | Luxury Indian Haute Couture & Bridal",
    description:
      "Explore Miraya's signature couture collections, bridal lehengas, and contemporary pret handcrafted with artisanal embroidery and timeless silhouettes.",
    url: "https://mirayacouture.com",
    siteName: "MIRAYA Couture",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MIRAYA | Luxury Indian Haute Couture & Bridal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIRAYA | Luxury Indian Haute Couture & Bridal",
    description:
      "Explore Miraya's signature couture collections, bridal lehengas, and contemporary pret handcrafted with artisanal embroidery and timeless silhouettes.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@200;300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-[#F7F5F0] text-[#121212]">
        <NextTopLoader color="#7A1C30" showSpinner={false} height={2} />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#121212",
              color: "#F7F5F0",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              letterSpacing: "0.05em",
            },
          }}
        />
        <Navbar />
        <CartDrawer />
        <SearchModal />
        <ContactModal />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
