import Hero from "@/components/Hero";
import GlobalCanOverlay from "@/components/GlobalCanOverlay";
import MascotJourney from "@/components/MascotJourney";
import TransitionBanner from "@/components/TransitionBanner";
import ParallaxBanner from "@/components/ParallaxBanner";
import CTASection from "@/components/CTASection";
import FlavorShowcase from "@/components/FlavorShowcase";
import MonkeySection from "@/components/MonkeySection";
import DailyRhythmSection from "@/components/DailyRhythmSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary-white text-accent-premium font-body relative">
      <LoadingScreen />
      <GlobalCanOverlay />
      <Hero />
      <TransitionBanner />
      <MascotJourney />
      <MonkeySection />
      <FlavorShowcase />
      <DailyRhythmSection />
      <ParallaxBanner />
      <CTASection />
      <Footer />
    </main>
  );
}


