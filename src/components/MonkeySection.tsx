"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const monkeys = [
  {
    id: "watermelon",
    bg: "/assets/background_watermelon.jpeg",
    monkey: "/watermelon/watermelon_monkey.png",
    alt: "Watermelon Monkey",
    glowColor: "bg-[#FF3366]/40", // Pink-red glow base
  },
  {
    id: "mango",
    bg: "/assets/background_mango.jpeg",
    monkey: "/mango/mango_monkey.png",
    alt: "Mango Monkey",
    glowColor: "bg-[#FFD166]/40", // Yellow-orange glow base
  },
  {
    id: "basil",
    bg: "/assets/background_chilli.jpeg",
    monkey: "/chilli/chilli_monkey.png",
    alt: "Chilli Monkey",
    glowColor: "bg-[#39FF14]/40", // Neon green glow base
  },
];

export default function MonkeySection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(window.innerWidth < 768 || isTouch);
    };
    checkMobile(); // Check immediately on mount (client-side)
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="w-full py-20 md:py-32 bg-primary-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Tagline Header */}
        <div className="w-full text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black italic tracking-tighter text-[#111111] uppercase max-w-5xl mx-auto leading-[0.9]"
          >
            THE ANTI-SODA. <br className="hidden md:block" />
            THE ANTI-SUGAR. <br className="hidden md:block" />
            <span className="inline-block mt-4 md:mt-6 px-6 py-2 md:px-8 md:py-3 bg-[#111111] text-[#39FF14] border-4 border-[#39FF14] rounded-full shadow-[6px_6px_0px_#39FF14] transform rotate-[-2deg] hover:rotate-[2deg] transition-transform duration-300">
              THE ANTI-BORING.
            </span>
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-12 max-w-7xl mx-auto mt-4 md:mt-12">
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
  // Trigger exactly when 30% into the screen
  const isInView = useInView(ref, { amount: 0.3, once: false });

  return (
    <Link href={`/products/${item.id}`} className="relative z-20 w-full md:w-1/3 aspect-[4/5] group cursor-pointer block">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: isMobile ? 0 : index * 0.1 }}
        className="w-full h-full"
      >
      {/* Inner Container for Background - This SHRINKS significantly and hides overflow */}
      <div 
        className={`absolute inset-0 z-0 rounded-3xl overflow-hidden border-4 border-[#111111] transition-all duration-700 ease-out transform-gpu will-change-[transform] bg-black ${
          isMobile 
            ? isInView ? "scale-90 shadow-[6px_6px_0px_#111111]" : "scale-100 shadow-[10px_10px_0px_#111111]" 
            : "scale-100 shadow-[10px_10px_0px_#111111] group-hover:scale-90 group-hover:shadow-[6px_6px_0px_#111111]"
        }`}
      >
        {/* Background Image */}
        <Image
          src={item.bg}
          alt={`${item.alt} Background`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover object-center transition-all duration-700 ease-out transform-gpu will-change-[transform,opacity] ${
            isMobile
              ? isInView
                ? "opacity-100 scale-110"
                : "opacity-60"
              : "opacity-60 grayscale-[0.8] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
          }`}
        />

        {/* Fog overlay */}
        <div
          className={`absolute inset-0 z-0 bg-neutral-900/40 transition-opacity duration-700 ease-out transform-gpu will-change-[opacity] ${
            isMobile
              ? isInView
                ? "opacity-0"
                : "opacity-100"
              : "opacity-100 mix-blend-multiply group-hover:opacity-0"
          }`}
        />

        {/* Flavor Burst Glow */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full transition-all duration-700 ease-out transform-gpu will-change-[opacity] z-0 pointer-events-none ${item.glowColor} ${
            isMobile
              ? isInView
                ? "opacity-60 scale-125"
                : "opacity-0 scale-100"
              : "opacity-0 scale-100 blur-[80px] mix-blend-color-dodge group-hover:opacity-100 group-hover:scale-125"
          }`}
        />
      </div>

      {/* Monkey Image - OUTSIDE the hidden overflow container so it POPS OUT */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center p-4 md:p-8 transition-all duration-700 ease-out transform-gpu will-change-[transform,filter] ${
          isMobile
            ? isInView
              ? "grayscale-0 sepia-0 -translate-y-12 scale-[1.2] md:scale-[1.15]"
              : "grayscale-[0.6] sepia-[0.2] scale-100"
            : "grayscale-[0.6] sepia-[0.2] scale-100 group-hover:grayscale-0 group-hover:sepia-0 group-hover:-translate-y-12 group-hover:scale-[1.15]"
        }`}
      >
        <div className="relative w-full h-full drop-shadow-2xl transform-gpu">
          <Image src={item.monkey} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain" />
        </div>
      </div>
      </motion.div>
    </Link>
  );
}
