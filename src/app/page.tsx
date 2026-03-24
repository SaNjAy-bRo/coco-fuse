import Hero from "@/components/Hero";
import GlobalCanOverlay from "@/components/GlobalCanOverlay";
import USPSection from "@/components/USPSection";
import MascotJourney from "@/components/MascotJourney";
import ParallaxBanner from "@/components/ParallaxBanner";
import ManifestoSection from "@/components/ManifestoSection";
import CTASection from "@/components/CTASection";
import FlavorShowcase from "@/components/FlavorShowcase";
import MonkeySection from "@/components/MonkeySection";
import MoodSelector from "@/components/MoodSelector";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-white text-accent-premium font-body relative">
      <GlobalCanOverlay />
      <Hero />
      <MascotJourney />
      <MonkeySection />
      <FlavorShowcase />
      <MoodSelector />
      <StorySection />
      <ParallaxBanner />
      <USPSection />
      <CTASection />
      <ManifestoSection />
      <Footer />
    </main>
  );
}


