import HeroSection from "@/components/home/HeroSection";
import CapsuleSection from "@/components/home/CapsuleSection";
import RunwaySection from "@/components/home/RunwaySection";
import EmbroiderySection from "@/components/home/EmbroiderySection";
import InstallationSection from "@/components/home/InstallationSection";
import ServicesSection from "@/components/home/ServicesSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import InstagramStrip from "@/components/home/InstagramStrip";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section ("Reframed") */}
      <HeroSection />

      {/* 2. Philosophy & Capsule Collection */}
      <CapsuleSection />

      {/* 3. From The Runway Showcase */}
      <RunwaySection />

      {/* 4. Everblooming Embroidery Carousel */}
      <EmbroiderySection />

      {/* 5. A Wildscape Installation */}
      <InstallationSection />

      {/* 6. Client Services Trio */}
      <ServicesSection />

      {/* 7. Newsletter Subscription Bar */}
      <NewsletterSection />

      {/* 8. Instagram Visual Feed Strip */}
      <InstagramStrip />
    </div>
  );
}
