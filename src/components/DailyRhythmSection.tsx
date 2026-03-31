"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const RHYTHMS = [
  {
    phase: "THE WAKE-UP",
    headline: "Prime your muscles & shock the system awake.",
    copy: "Skip the heavy coffee crash. Pure, clean coconut hydration to start the engine.",
    image: "/watermelon/watermelon_monkey.png",
    bg: "bg-[#FF66B2]", // Deep Pink
    accent: "text-[#E23F72]",
    cardStyle: "rotate-[-1deg]"
  },
  {
    phase: "THE MIDDAY SURGE",
    headline: "Recharge your battery with pure tropical goodness.",
    copy: "That post-lunch fog? Obliterated. Blast through the rest of the day with unstoppable Mango energy.",
    image: "/mango/mango_monkey.png",
    bg: "bg-[#FFD166]", // Mango Yellow
    accent: "text-[#D97700]",
    cardStyle: "rotate-[1deg]"
  },
  {
    phase: "THE NIGHT MODE",
    headline: "Keep the vibe alive without the sugary hangover.",
    copy: "The sun goes down, the shades come on. A spicy kick and laser focus to ignite the night.",
    image: "/chilli/chilli_monkey.png",
    bg: "bg-[#39FF14]", // Neon Green
    accent: "text-[#111111]",
    cardStyle: "rotate-[-1deg]"
  }
];

export default function DailyRhythmSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative w-full bg-[#0A2B14] py-24 md:py-32 font-body">
            {/* Top Fade Edge */}
            <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#F7F7F7] to-transparent mix-blend-overlay opacity-30 pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative">
                
                {/* Main Section Header (Scrolls normally) */}
                <div className="w-full flex flex-col items-center justify-center text-center mb-16 lg:mb-32">
                    <motion.h2 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl lg:text-[8rem] font-heading font-black italic uppercase tracking-tighter text-white mb-6 leading-[0.85] drop-shadow-xl pb-2"
                    >
                        THE DAILY{' '}
                        <span className="text-primary-green drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
                            RHYTHM
                        </span>
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl lg:text-2xl font-bold font-body text-[#E8F5E9] max-w-2xl leading-relaxed"
                    >
                        Hydration built for the 24/7 grind. See how Chikko rides the wave from dawn till dusk.
                    </motion.p>
                </div>

                {/* Desktop Sticky Layout Wrapper */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    
                    {/* LEFT: Sticky Context Panel (Desktop) */}
                    <div className="lg:w-[45%] flex-shrink-0 w-full lg:h-full relative lg:sticky lg:top-[30vh]">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            
                            {/* Desktop Dynamic Story Content */}
                            <div className="hidden lg:block w-full min-h-[350px] relative pr-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute inset-0 flex flex-col items-start text-left"
                                    >
                                        <span className="inline-block px-5 py-2 mb-6 rounded-full border-2 border-[#111111] bg-white text-[#111111] font-heading font-black italic text-xs tracking-widest uppercase shadow-[4px_4px_0px_#111111]">
                                            PHASE {activeIndex + 1} • {RHYTHMS[activeIndex].phase}
                                        </span>
                                        <h3 className="text-4xl xl:text-5xl font-heading font-black italic text-white leading-[1.1] tracking-tighter mb-6 drop-shadow-md">
                                            {RHYTHMS[activeIndex].headline}
                                        </h3>
                                        <p className="text-xl font-bold font-body text-gray-300 leading-relaxed border-l-4 pl-5 border-gray-600">
                                            {RHYTHMS[activeIndex].copy}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Scrolling Content Cards (The Timeline) */}
                    <div className="lg:w-[55%] flex flex-col gap-24 md:gap-32 lg:pb-[20vh] w-full">
                        {RHYTHMS.map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                onViewportEnter={() => setActiveIndex(index)}
                                viewport={{ margin: "-30% 0px -30% 0px" }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className={`w-full group`}
                            >
                                {/* Mobile-Only Headline */}
                                <div className="lg:hidden mb-6 flex flex-col items-start gap-4">
                                    <span className="inline-block px-5 py-2 rounded-full border-2 border-[#111111] bg-white text-[#111111] font-heading font-black italic text-xs md:text-sm tracking-widest uppercase shadow-[4px_4px_0px_#111111] group-hover:-translate-y-1 transition-transform">
                                        PHASE {index + 1} • {item.phase}
                                    </span>
                                    <h3 className="text-4xl md:text-5xl font-heading font-black italic text-white leading-[0.9] tracking-tighter">
                                        {item.headline}
                                    </h3>
                                </div>
                                
                                {/* Image Panel */}
                                <div className={`relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/5] rounded-[2.5rem] md:rounded-[3.5rem] border-4 border-[#111111] shadow-[8px_8px_0px_#FFD166] md:shadow-[14px_14px_0px_#FFD166] overflow-hidden flex items-center justify-center transition-all hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[18px_18px_0px_white] duration-500 ease-out origin-bottom ${item.bg} ${item.cardStyle}`}>
                                    <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/30 blur-2xl rounded-full z-0 pointer-events-none" />

                                    <motion.div 
                                        className="relative w-[110%] h-[110%] md:w-[100%] md:h-[100%] z-10"
                                        whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 3 : -3 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    >
                                        <Image 
                                            src={item.image} 
                                            alt={item.phase} 
                                            fill 
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-contain drop-shadow-[0_20px_20px_rgba(17,17,17,0.5)]" 
                                            priority={index === 0}
                                        />
                                    </motion.div>
                                </div>

                                {/* Mobile-Only Description Block */}
                                <div className="lg:hidden mt-8 bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-colors">
                                    <p className="text-xl md:text-2xl font-body font-bold text-gray-200 leading-snug">
                                        {item.copy}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
