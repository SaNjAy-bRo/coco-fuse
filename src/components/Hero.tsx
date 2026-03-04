"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax logic for 200vh sticky section
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    // 3D Can scaling on scroll
    const canScaleDesktop = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
    const canXDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const canScaleMobile = useTransform(scrollYProgress, [0, 1], [0.9, 1.2]);
    const canYMobile = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // Marquee scrolling
    const marqueeX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const marqueeX2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[200vh] bg-primary-white selection:bg-primary-green/30"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">

                {/* Parallax Background Gradient Blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-accent-mango/20 rounded-full blur-[100px] mix-blend-multiply" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-primary-green/20 rounded-full blur-[120px] mix-blend-multiply" />
                    <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-primary-blue/20 rounded-full blur-[90px] mix-blend-multiply" />
                </div>

                {/* Background Kinetic Typography Marquees (Desktop mainly) */}
                <div className="absolute inset-0 z-0 flex flex-col justify-between py-32 pointer-events-none opacity-5 md:opacity-10 overflow-hidden">
                    <motion.div style={{ x: marqueeX1 }} className="whitespace-nowrap flex">
                        <span className="text-[10rem] md:text-[15rem] font-heading font-black uppercase tracking-tighter leading-none mx-8">THE ANTI-SODA THE ANTI-SUGAR THE ANTI-BORING</span>
                        <span className="text-[10rem] md:text-[15rem] font-heading font-black uppercase tracking-tighter leading-none mx-8">THE ANTI-SODA THE ANTI-SUGAR THE ANTI-BORING</span>
                    </motion.div>
                    <motion.div style={{ x: marqueeX2 }} className="whitespace-nowrap flex">
                        <span className="text-[10rem] md:text-[15rem] font-heading font-black uppercase tracking-tighter leading-none mx-8 text-transparent stroke-black stroke-2" style={{ WebkitTextStroke: "2px black" }}>CLEAN FUEL CLEAN FUEL CLEAN FUEL CLEAN FUEL</span>
                        <span className="text-[10rem] md:text-[15rem] font-heading font-black uppercase tracking-tighter leading-none mx-8 text-transparent stroke-black stroke-2" style={{ WebkitTextStroke: "2px black" }}>CLEAN FUEL CLEAN FUEL CLEAN FUEL CLEAN FUEL</span>
                    </motion.div>
                </div>

                {/* 3D Can Layer - Absolute positioning to allow text to overlay correctly */}
                {/* Desktop Can */}
                <motion.div
                    style={{ scale: canScaleDesktop, x: canXDesktop }}
                    className="absolute inset-y-0 right-0 z-10 hidden lg:block w-1/2 h-full pointer-events-none"
                >
                    <Scene />
                </motion.div>

                {/* Mobile Can */}
                <motion.div
                    style={{ scale: canScaleMobile, y: canYMobile }}
                    className="absolute bottom-[2%] lg:bottom-[-10%] left-0 z-10 w-full h-[60vh] min-[400px]:h-[70vh] lg:hidden pointer-events-none"
                >
                    <Scene />
                </motion.div>

                {/* Main Text Content */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="container mx-auto px-4 md:px-6 lg:px-12 relative z-20 w-full h-full flex flex-col pt-[110px] sm:pt-[130px] lg:pt-0 lg:justify-center pointer-events-none"
                >
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-auto lg:mt-[60px]">

                        {/* Status Pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-flex items-center gap-2 px-4 py-2 min-[400px]:px-5 min-[400px]:py-2.5 rounded-full border border-black/10 bg-white/40 shadow-xl backdrop-blur-md mb-6 min-[400px]:mb-8"
                        >
                            <span className="relative flex h-2.5 w-2.5 min-[400px]:h-3 min-[400px]:w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-green opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 min-[400px]:h-3 min-[400px]:w-3 bg-primary-green"></span>
                            </span>
                            <span className="font-heading font-black text-[10px] min-[400px]:text-xs uppercase tracking-[0.2em] text-accent-premium mt-[2px]">Now Available</span>
                        </motion.div>

                        {/* Kinetic Headline */}
                        <div className="flex flex-col gap-0 mb-4 min-[400px]:mb-6 w-full max-w-[100vw] overflow-hidden">
                            <div className="overflow-hidden mix-blend-difference xl:mix-blend-normal relative z-20">
                                <motion.h1
                                    initial={{ y: "110%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[13vw] min-[400px]:text-[4.5rem] sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black uppercase tracking-tighter leading-[0.8] text-white xl:text-accent-premium"
                                >
                                    Fun, Clean
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden">
                                <motion.h1
                                    initial={{ y: "110%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[14vw] min-[400px]:text-[5rem] sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black uppercase tracking-tighter leading-[0.8] text-transparent bg-clip-text bg-gradient-to-r from-primary-green via-primary-blue to-accent-mango bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]"
                                >
                                    Fuel For
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden pb-4 mix-blend-difference xl:mix-blend-normal relative z-20">
                                <motion.h1
                                    initial={{ y: "110%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-[13vw] min-[400px]:text-[4.5rem] sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black uppercase tracking-tighter leading-[0.8] text-white xl:text-accent-premium"
                                >
                                    Real Life.
                                </motion.h1>
                            </div>
                        </div>

                        {/* Subheading */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                            className="text-base min-[400px]:text-lg md:text-xl font-body text-gray-700 max-w-sm md:max-w-md leading-relaxed mb-8 mix-blend-color-burn"
                        >
                            Flavoured coconut water engineered with zero nonsense.
                            <span className="block font-bold mt-1 min-[400px]:mt-2 text-accent-premium">The anti-sugar. The anti-boring.</span>
                        </motion.p>

                        {/* CTA Group */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row items-center gap-3 min-[400px]:gap-4 w-[90%] sm:w-auto mx-auto lg:mx-0 relative z-30"
                        >
                            <button className="w-full sm:w-auto px-6 py-4 min-[400px]:px-8 min-[400px]:py-5 bg-accent-premium text-primary-white rounded-full font-heading font-black uppercase tracking-widest text-[11px] min-[400px]:text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-2xl relative overflow-hidden group">
                                <span className="relative z-10">Shop Flavours</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-accent-mango to-accent-watermelon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                            <a href="#story" className="w-full sm:w-auto px-6 py-4 min-[400px]:px-8 min-[400px]:py-5 rounded-full border-2 border-accent-premium/20 text-accent-premium font-heading font-bold uppercase tracking-widest text-[11px] min-[400px]:text-sm hover:border-accent-premium/40 hover:bg-white/50 backdrop-blur-sm transition-all text-center flex justify-center items-center gap-2 group bg-white/20">
                                Our Story
                                <svg className="w-3.5 h-3.5 min-[400px]:w-4 min-[400px]:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </a>
                        </motion.div>

                    </div>
                </motion.div>

                {/* Vertical Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-4 min-[400px]:bottom-6 lg:bottom-12 left-1/2 lg:left-12 -translate-x-1/2 lg:translate-x-0 z-30 flex flex-col items-center gap-2 min-[400px]:gap-3 mix-blend-difference xl:mix-blend-normal"
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

            </div>
        </section>
    );
}
