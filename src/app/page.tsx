import Hero from "@/components/Hero";
import Mascot from "@/components/Mascot";
import Features from "@/components/Features";
import Lifestyle from "@/components/Lifestyle";
import Nutrition from "@/components/Nutrition";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-outfit">
      <Hero />
      <Mascot />
      <Features />
      <Lifestyle />
      <Nutrition />
      <Footer />
    </main>
  );
}
