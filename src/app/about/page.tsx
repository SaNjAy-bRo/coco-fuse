"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import StorySection from "@/components/StorySection";
import Link from "next/link";

// ——— CONSTANTS & DATA ——————————————————————————————————————

const founders = [
    {
        name: "Miket",
        role: "The Visionary",
        tag: "Mountain Born",
        desc: "A high-altitude climber who realized hydration shouldn't be boring, unhealthy, or sugary. He brings the curiosity, the spark, and the alpine origin idea that defines every bottle.",
        color: "#39FF14", // primary-green
        bg: "bg-primary-green/10",
        border: "border-primary-green/20",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop",
        quote: "Hydration is the baseline of adventure."
    },
    {
        name: "Joel",
        role: "The Alchemist",
        tag: "Flavor Heart",
        desc: "The maestro behind the blend. He refused to let CocoFuse. look, taste, or BE boring. Joel brings the bold experimentation and the jazzy personality to our functional chemistry.",
        color: "#3AB6FD", // primary-blue
        bg: "bg-primary-blue/10",
        border: "border-primary-blue/20",
        image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop",
        quote: "Taste is a frequency. We just tuned it."
    },
    {
        name: "Rishit",
        role: "The Architect",
        tag: "The Backbone",
        desc: "If Miket is fire and Joel is electricity, Rishit is gravity. He brings the structure, stability, and scale to turn raw passion into a premium, mountain-born reality.",
        color: "#FFD166", // accent-mango
        bg: "bg-accent-mango/10",
        border: "border-accent-mango/20",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        quote: "Vision needs a foundation to reach the peak."
    }
];

// ——— COMPONENTS ————————————————————————————————————————————

/**
 * Animated Gradient Background with "Liquid" Orbs
 */
function LiquidBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base Light/Premium BG */}
            <div className="absolute inset-0 bg-[#F7F7F7]" />

            {/* Glowing Orbs */}
            <motion.div 
                animate={{ 
                    x: [0, 50, -50, 0], 
                    y: [0, -50, 50, 0],
                    scale: [1, 1.2, 0.9, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary-green/20 rounded-full blur-[120px]" 
            />
            <motion.div 
                animate={{ 
                    x: [0, -30, 30, 0], 
                    y: [0, 60, -60, 0],
                    scale: [1, 0.8, 1.1, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-mango/15 rounded-full blur-[100px]" 
            />
            <motion.div 
                animate={{ 
                    x: [0, 40, -40, 0], 
                    y: [0, 40, -40, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-primary-blue/10 rounded-full blur-[150px]" 
            />
        </div>
    );
}

/**
 * Split Text reveal for titles
 */
function RevealTitle({ text, className }: { text: string, className?: string }) {
    return (
        <h1 className={`${className} flex flex-wrap max-w-full`}>
            {text.split(" ").map((word, i) => (
                <div key={i} className="inline-block overflow-hidden pb-2 mr-[0.3em] max-w-full">
                    <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (i * 0.1) }}
                        className="inline-block break-words max-w-full"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </h1>
    );
}

/**
 * About Hero Section
 */
function AboutHero() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section ref={sectionRef} className="relative min-h-[90dvh] md:min-h-screen flex flex-col justify-center overflow-hidden bg-[#F3F3F1] pt-32 pb-20">
            <div className="container mx-auto px-6 md:px-12 relative z-20">
                <motion.div style={{ y: textY }}>
                    <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="inline-block px-5 py-2 rounded-full border-2 border-[#111111] bg-white text-[#111111] shadow-[4px_4px_0px_#111111] font-heading font-black italic text-[10px] md:text-sm tracking-[0.4em] uppercase mb-8"
                    >
                        The Humans of Fuse
                    </motion.span>
                    
                    <h1 className="text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] leading-[0.85] font-heading font-black italic uppercase tracking-tighter text-[#111111] max-w-[95vw] md:max-w-full drop-shadow-sm flex flex-wrap max-w-full">
                        <motion.span initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="inline-block pb-2 mr-[0.3em]">
                            THE
                        </motion.span>
                        <motion.span initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="inline-block pb-2 mr-[0.3em]">
                            ARCHITECTS
                        </motion.span>
                        <motion.span initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="inline-block pb-2 mr-[0.3em]">
                            OF
                        </motion.span>
                        <motion.span initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="inline-block pb-2 text-[#3AB6FD] drop-shadow-[4px_4px_0px_#111111]">
                            REFRESH
                        </motion.span>
                    </h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-8 md:mt-12 text-[#111111]/80 font-body font-bold text-lg md:text-2xl lg:text-3xl max-w-3xl leading-relaxed"
                    >
                        We didn't set out to build a brand. We set out to find a better way to hydrate. <br className="hidden md:block" />
                        <span className="text-[#111111] italic font-black">Met on the trail, stayed for the obsession.</span>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

/**
 * Magazine Style Founder Feature
 */
function FounderCard({ founder, index }: { founder: typeof founders[0], index: number }) {
    const containerRef = useRef(null);
    const isEven = index % 2 === 0;

    return (
        <motion.div 
            ref={containerRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 mb-32 md:mb-56`}
        >
            {/* Image Side */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4]">
                <div className="absolute inset-0 overflow-hidden rounded-[3rem] bg-white border-4 border-[#111111] shadow-[8px_8px_0px_#111111] group">
                    <motion.div
                        whileInView={{ scale: [1.2, 1] }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full h-full relative"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={founder.image} 
                            alt={founder.name} 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </motion.div>
                    
                    {/* Glassy Tag */}
                    <div className="absolute top-8 left-8 p-1.5 px-4 bg-white border-2 border-[#111111] shadow-[2px_2px_0px_#111111] rounded-full">
                        <span className="text-[10px] font-heading font-black italic text-[#111111] uppercase tracking-widest">{founder.tag}</span>
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute bottom-0 ${isEven ? 'left-0' : 'right-0'} w-32 h-32 opacity-20`} 
                         style={{ background: `radial-gradient(circle at center, ${founder.color}, transparent 70%)` }} 
                    />
                </div>
                
                {/* Floating Background Text */}
                <span className={`absolute ${isEven ? '-left-8 md:-left-20' : '-right-8 md:-right-20'} top-1/2 -translate-y-1/2 text-[20vw] font-heading font-black italic opacity-[0.03] text-[#111111] pointer-events-none select-none uppercase -rotate-90`}>
                    {founder.name}
                </span>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 flex flex-col items-start">
                <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black italic uppercase text-[#111111] tracking-tighter mb-4">
                        {founder.name}
                    </h2>
                    <h3 className="text-xl md:text-2xl font-heading font-black italic uppercase tracking-widest mb-8" style={{ color: founder.color, textShadow: "1px 1px 0px rgba(17,17,17,0.2)" }}>
                        {founder.role}
                    </h3>
                    
                    <div className="w-12 h-2 border-2 border-[#111111] mb-8" style={{ backgroundColor: founder.color }} />
                    
                    <p className="text-lg md:text-2xl font-body font-bold text-[#111111]/70 leading-relaxed max-w-lg mb-12">
                        {founder.desc}
                    </p>

                    <div className="relative p-8 rounded-[2rem] bg-white border-4 border-[#111111]" style={{ boxShadow: `6px 6px 0px ${founder.color}` }}>
                        <p className="text-lg md:text-xl font-body font-bold italic text-[#111111] leading-snug">
                            &ldquo;{founder.quote}&rdquo;
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// ——— MAIN PAGE ————————————————————————————————————————

export default function AboutPage() {
    return (
        <main className="min-h-screen font-body bg-[#F7F7F7] selection:bg-primary-green selection:text-[#111111] text-[#111111]">
            <Navbar />
            
            <AboutHero />

            <StorySection />

            {/* ——— CONTENT START ——— */}
            <section className="relative py-24 md:py-32 z-20">
                <div className="container mx-auto px-6 md:px-12">
                    
                    {/* Section Header */}
                    <div className="mb-24 md:mb-48 flex flex-col md:flex-row items-end justify-between gap-8">
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-heading font-black italic uppercase text-[#111111] tracking-tight drop-shadow-sm"
                        >
                            THE FUSE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-mango to-accent-watermelon italic">COLLECTIVE</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#111111]/70 font-bold font-body text-lg md:text-xl max-w-sm text-right leading-relaxed"
                        >
                            Three distinct disciplines, one shared quest for the ultimate peak state.
                        </motion.p>
                    </div>

                    {/* Founders List */}
                    {founders.map((founder, i) => (
                        <FounderCard key={founder.name} founder={founder} index={i} />
                    ))}

                    {/* Closing Section */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mt-24 md:mt-48 py-24 md:py-32 rounded-[4rem] bg-white border-4 border-[#111111] shadow-[12px_12px_0px_#111111] text-center relative overflow-hidden"
                    >
                        {/* Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-primary-green/20 blur-[150px] opacity-60" />
                        
                        <div className="relative z-10">
                            <span className="text-xs md:text-sm font-heading font-black italic text-[#111111]/50 uppercase tracking-[0.5em] mb-8 inline-block">THE FINAL EQUATION</span>
                            <h3 className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-black italic text-[#111111] uppercase tracking-tighter leading-none flex flex-col gap-4">
                                <span className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                                    VISION <span className="text-primary-green">+</span> VIBE
                                </span>
                                <span className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                                    BALANCE <span className="text-accent-watermelon">=</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-mango via-accent-watermelon to-primary-blue pr-2 drop-shadow-sm">FUSE.</span>
                                </span>
                            </h3>
                            
                            <Link href="/#flavors" passHref legacyBehavior>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-16 inline-block px-12 py-5 bg-[#39FF14] text-[#111111] border-4 border-[#111111] shadow-[6px_6px_0px_#111111] rounded-full font-heading font-black italic uppercase tracking-widest text-sm transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111111] cursor-pointer"
                                >
                                    Shop the Fuse
                                </motion.a>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
