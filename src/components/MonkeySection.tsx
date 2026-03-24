"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const monkeys = [
  {
    id: "mango",
    bg: "/assets/background_mango.jpeg",
    monkey: "/mango/mango_monkey.png",
    alt: "Mango Monkey",
    glowColor: "bg-[#FFD166]/40", // Yellow-orange glow base
  },
  {
    id: "watermelon",
    bg: "/assets/background_watermelon.jpeg",
    monkey: "/watermelon/watermelon_monkey.png",
    alt: "Watermelon Monkey",
    glowColor: "bg-[#FF3366]/40", // Pink-red glow base
  },
  {
    id: "chilli",
    bg: "/assets/background_chilli.jpeg",
    monkey: "/chilli/chilli_monkey.png",
    alt: "Chilli Monkey",
    glowColor: "bg-[#39FF14]/40", // Neon green glow base
  },
];

export default function MonkeySection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check immediately on mount (client-side)
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="w-full py-12 md:py-24 bg-primary-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-7xl mx-auto">
          {monkeys.map((item, index) => (
            <MonkeyCard key={item.id} item={item} isMobile={isMobile} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MonkeyCard({ item, isMobile, index }: { item: any; isMobile: boolean; index: number }) {
  const ref = useRef(null);
  // Trigger exactly when halfway into the screen
  const isInView = useInView(ref, { amount: 0.5, once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: isMobile ? 0 : index * 0.1 }}
      className="relative w-full md:w-1/3 aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.bg}
          alt={`${item.alt} Background`}
          fill
          className={`object-cover object-center transition-all duration-700 ${
            isMobile
              ? isInView
                ? "grayscale-0 opacity-100 scale-110"
                : "opacity-60 grayscale-[0.8]"
              : "opacity-60 grayscale-[0.8] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
          }`}
        />
      </div>

      {/* Fog overlay */}
      <div
        className={`absolute inset-0 z-0 bg-neutral-900/40 mix-blend-multiply transition-opacity duration-700 ${
          isMobile
            ? isInView
              ? "opacity-0"
              : "opacity-100"
            : "opacity-100 group-hover:opacity-0"
        }`}
      />

      {/* Flavor Burst Glow */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full blur-[80px] transition-all duration-700 mix-blend-color-dodge z-0 pointer-events-none ${item.glowColor} ${
          isMobile
            ? isInView
              ? "opacity-100 scale-125"
              : "opacity-0 scale-100"
            : "opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-125"
        }`}
      />

      {/* Monkey Image */}
      <div
        className={`relative z-10 w-full h-full flex items-center justify-center p-8 transition-all duration-700 ${
          isMobile
            ? isInView
              ? "grayscale-0 sepia-0 -translate-y-6 scale-110"
              : "grayscale-[0.6] sepia-[0.2]"
            : "grayscale-[0.6] sepia-[0.2] group-hover:grayscale-0 group-hover:sepia-0 group-hover:-translate-y-6 group-hover:scale-110"
        }`}
      >
        <div className="relative w-full h-full drop-shadow-2xl">
          <Image src={item.monkey} alt={item.alt} fill className="object-contain" />
        </div>
      </div>
    </motion.div>
  );
}
