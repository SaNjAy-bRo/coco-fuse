import Hero from "@/components/Hero";
import GlobalCanOverlay from "@/components/GlobalCanOverlay";
import USPSection from "@/components/USPSection";
import MascotJourney from "@/components/MascotJourney";
import ParallaxBanner from "@/components/ParallaxBanner";
import FoundersSection from "@/components/FoundersSection";
import ManifestoSection from "@/components/ManifestoSection";
import Nutrition from "@/components/Nutrition";
import CTASection from "@/components/CTASection";
import FlavorShowcase from "@/components/FlavorShowcase";
import MoodSelector from "@/components/MoodSelector";
import StorySection from "@/components/StorySection";
import Transformation from "@/components/Transformation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-white text-accent-premium font-body relative">
      <GlobalCanOverlay />
      <Hero />
      <MascotJourney />
      <FlavorShowcase />
      <MoodSelector />
      <StorySection />
      <FoundersSection />
      <ParallaxBanner />
      <USPSection />
      <Nutrition />
      <CTASection />
      <ManifestoSection />
      <Footer />
    </main>
  );
}
