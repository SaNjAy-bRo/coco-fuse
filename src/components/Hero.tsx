"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useFlavor } from "@/context/FlavorContext";

export default function Hero() {
    const { flavorData } = useFlavor();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax logic for 200vh sticky section
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.8, 0.95], [1, 1, 0]);

    // CTA Reveal Logic for Desktop (Hidden at top, appears on scroll)
    const ctaOpacityDesktop = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
    const ctaYDesktop = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

    // Marquee scrolling
    const marqueeX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const marqueeX2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

    const bgClass = flavorData.id === "mango" ? "bg-festival-gradient-1" : 
                    flavorData.id === "watermelon" ? "bg-watermelon-gradient" : "bg-basil-gradient";

    return (
        <section
            ref={containerRef}
            className={`relative w-full h-[200vh] ${bgClass} transition-colors duration-1000 selection:bg-primary-green/30`}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

                {/* Parallax Background Gradient Blobs - Removed for cleaner look */}
                {/* <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-color-burn">
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-festival-gradient-2 rounded-full blur-[100px] opacity-70"
                    />
                    <motion.div
                        animate={{
                            rotate: -360,
                            scale: [1, 1.5, 1],
                        }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-festival-gradient-3 rounded-[40%] blur-[120px] opacity-80"
                    />
                </div> */}

                {/* Background Kinetic Typography Marquees (Desktop mainly) */}
                <div className="absolute inset-0 z-0 flex-col justify-between py-32 pointer-events-none opacity-20 overflow-hidden mix-blend-overlay hidden md:flex">
                    <motion.div style={{ x: marqueeX1 }} className="whitespace-nowrap flex">
                        <span className="text-[15rem] font-heading font-black uppercase tracking-tighter leading-none mx-8 text-black">THE ANTI-SODA THE ANTI-SUGAR THE ANTI-BORING</span>
                        <span className="text-[15rem] font-heading font-black uppercase tracking-tighter leading-none mx-8 text-black">THE ANTI-SODA THE ANTI-SUGAR THE ANTI-BORING</span>
                    </motion.div>
                    <motion.div style={{ x: marqueeX2 }} className="whitespace-nowrap flex">
                        <span className="text-[15rem] font-heading font-black uppercase tracking-tighter leading-none mx-8 text-black" style={{ WebkitTextStroke: "4px white" }}>CLEAN FUEL CLEAN FUEL CLEAN FUEL CLEAN FUEL</span>
                        <span className="text-[15rem] font-heading font-black uppercase tracking-tighter leading-none mx-8 text-black" style={{ WebkitTextStroke: "4px white" }}>CLEAN FUEL CLEAN FUEL CLEAN FUEL CLEAN FUEL</span>
                    </motion.div>
                </div>

                {/* 3D Can Layer - REMOVED -> Now handled globally by GlobalCanOverlay in page.tsx */}

                {/* Main Text Content */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="container mx-auto px-5 md:px-6 lg:px-12 relative z-20 w-full h-[100dvh] pt-[75px] pb-3 min-[400px]:pt-[90px] min-[400px]:pb-5 lg:pt-[20vh] lg:pb-[10vh] flex flex-col justify-between lg:justify-start pointer-events-none"
                >
                    <div className="w-full h-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-auto justify-between lg:justify-start lg:gap-2">

                        {/* 1. TOP STACK: Status Pill & Headline */}
                        <div className="flex flex-col w-full pointer-events-auto text-center lg:text-left">

                            {/* Status Pill - Vibrant Edition */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="inline-flex items-center self-center lg:self-start gap-2 px-4 py-1.5 min-[400px]:px-5 min-[400px]:py-2 rounded-full border-2 border-primary-premium bg-accent-premium shadow-[0_10px_30px_rgba(26,26,26,0.3)] mb-4 min-[400px]:mb-6 md:mb-10 shrink-0"
                            >
                                <span className="relative flex h-2.5 w-2.5 min-[400px]:h-3 min-[400px]:w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-green opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 min-[400px]:h-3 min-[400px]:w-3 bg-primary-green"></span>
                                </span>
                                <span className="font-heading font-black text-[10px] min-[400px]:text-xs uppercase tracking-[0.2em] text-primary-white mt-[2px]">Now Available</span>
                            </motion.div>

                            {/* Kinetic Headline */}
                            <div className="flex flex-col mb-1 min-[400px]:mb-3 md:mb-8 w-full overflow-hidden drop-shadow-2xl mt-1 text-center lg:text-left">
                                {[
                                    { text: "Hydrate", delay: 0.1, outline: false },
                                    { text: "The", delay: 0.2, outline: true },
                                    { text: "Fun.", delay: 0.3, outline: false }
                                ].map((line, i) => (
                                    <div key={i} className="overflow-hidden relative z-20 pb-1">
                                        <motion.h1
                                            initial={{ y: "110%" }}
                                            animate={{ y: 0 }}
                                            transition={{ duration: 0.7, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
                                            className={`text-[11vw] sm:text-5xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] 2xl:text-[9rem] font-heading font-black uppercase tracking-tighter leading-[0.95] md:leading-[0.9] ${line.outline ? 'text-primary-white' : 'text-accent-premium'}`}
                                            style={line.outline ? { WebkitTextStroke: "3px #0A0A0A" } : {}}
                                        >
                                            {line.text}
                                        </motion.h1>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. MIDDLE STACK: The "Can Stage" (Dynamically expands) */}
                        <div className="w-full lg:hidden flex-1 min-h-[45vh]" />

                        {/* 3. BOTTOM STACK: Subheading & CTAs (Desktop - Appears on Scroll) */}
                        <motion.div
                            style={{ opacity: ctaOpacityDesktop, y: ctaYDesktop }}
                            className="w-full pointer-events-auto text-left hidden lg:flex flex-col"
                        >
                            {/* Subheading */}
                            <p
                                className="text-xl font-body font-bold text-accent-premium bg-white/50 backdrop-blur-md px-6 py-4 rounded-xl max-w-md leading-relaxed mb-12 border border-white/40 shadow-xl mx-0"
                            >
                                Not a hydration drink. Not a soda. Not a juice.
                                <span className="block font-black mt-1 text-accent-watermelon uppercase tracking-wider text-xl">CocoFuse is a guilt-free fun drink that happens to hydrate.</span>
                            </p>

                            {/* CTA Group */}
                            <div
                                className="flex flex-row items-center gap-4 w-auto mx-0 relative z-30"
                            >
                                <button className="px-8 py-5 bg-accent-premium text-primary-white rounded-full font-heading font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-2xl relative overflow-hidden group">
                                    <span className="relative z-10">Shop Flavours</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent-mango to-accent-watermelon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>
                                <a href="#story" className="px-8 py-5 rounded-full border-2 border-accent-premium/20 text-accent-premium font-heading font-bold uppercase tracking-widest text-sm hover:border-accent-premium/40 hover:bg-white/50 backdrop-blur-sm transition-all text-center flex justify-center items-center gap-2 group bg-white/20">
                                    Our Story
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </a>
                            </div>
                        </motion.div>

                        {/* 3. BOTTOM STACK: Subheading & CTAs (Mobile - Static Normal) */}
                        <div className="flex flex-col w-full pointer-events-auto text-center lg:hidden">
                            {/* Subheading */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                                className="text-[10px] min-[400px]:text-xs md:text-xl font-body font-bold text-accent-premium bg-white/50 backdrop-blur-md px-3 py-2 md:px-6 md:py-4 rounded-xl max-w-[85vw] md:max-w-md leading-snug md:leading-relaxed mb-3 lg:mb-12 border border-white/40 shadow-xl mx-auto lg:mx-0"
                            >
                                Not a hydration drink. Not a soda. Not a juice.
                                <span className="block font-black mt-1 text-accent-watermelon uppercase tracking-wider text-[9px] min-[400px]:text-xs md:text-lg lg:text-xl">CocoFuse is a guilt-free fun drink that happens to hydrate.</span>
                            </motion.p>

                            {/* CTA Group */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                                className="flex flex-col sm:flex-row items-center gap-2 min-[400px]:gap-3 md:gap-4 w-[90%] sm:w-auto mx-auto lg:mx-0 relative z-30"
                            >
                                <button className="w-full sm:w-auto px-4 py-3 min-[400px]:px-5 min-[400px]:py-3.5 md:px-8 md:py-5 bg-accent-premium text-primary-white rounded-full font-heading font-black uppercase tracking-widest text-[10px] min-[400px]:text-[11px] md:text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-2xl relative overflow-hidden group">
                                    <span className="relative z-10">Shop Flavours</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent-mango to-accent-watermelon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>
                                <a href="#story" className="w-full sm:w-auto px-4 py-3 min-[400px]:px-5 min-[400px]:py-3.5 md:px-8 md:py-5 rounded-full border-2 border-accent-premium/20 text-accent-premium font-heading font-bold uppercase tracking-widest text-[10px] min-[400px]:text-[11px] md:text-sm hover:border-accent-premium/40 hover:bg-white/50 backdrop-blur-sm transition-all text-center flex justify-center items-center gap-2 group bg-white/20">
                                    Our Story
                                    <svg className="w-3.5 h-3.5 min-[400px]:w-4 min-[400px]:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </a>
                            </motion.div>
                        </div>

                    </div>
                </motion.div>

                {/* Vertical Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-4 min-[400px]:bottom-6 lg:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 min-[400px]:gap-3 mix-blend-difference xl:mix-blend-normal"
                >
                    <span className="text-[10px] font-heading font-black uppercase tracking-[0.2em] text-accent-premium/50 [writing-mode:vertical-lr] rotate-180">Scroll</span>
                    <div className="w-[1px] h-12 bg-accent-premium/20 overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-full h-1/2 bg-accent-premium"
                        />
                    </div>
                </motion.div>

            </div >
        </section >
    );
}
