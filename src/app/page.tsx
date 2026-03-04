import Hero from "@/components/Hero";
import USPSection from "@/components/USPSection";
import StorySection from "@/components/StorySection";
import Mascot from "@/components/Mascot";
import ParallaxBanner from "@/components/ParallaxBanner";
import FoundersSection from "@/components/FoundersSection";
import ManifestoSection from "@/components/ManifestoSection";
import Nutrition from "@/components/Nutrition";
import ProductRange from "@/components/ProductRange";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-white text-accent-premium font-body">
      <Hero />
      <USPSection />
      <StorySection />
      <Mascot />
      <ParallaxBanner />
      <FoundersSection />
      <ManifestoSection />
      <Nutrition />
      <ProductRange />
      <Footer />
    </main>
  );
}
