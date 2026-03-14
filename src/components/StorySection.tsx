"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

/**
 * StorySection: A cinematic, sticky-scroll narrative experience.
 * Rebuilt from scratch to ensure zero visual gaps, full-color visuals, 
 * and edge-to-edge responsive composition.
 */
export default function StorySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    // Track scroll across the entire 300vh range
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Smooth progress for butter-smooth visual transitions
    const progress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 25,
        restDelta: 0.001
    });

    // PARALLAX BACKGROUND LOGIC
    // We over-fill the background (h-[120vh]) so that y-parallax never reveals the black floor.
    const bgY = useTransform(progress, [0, 1], ["5%", "-5%"]);
    const bgScale = useTransform(progress, [0, 1], [1.1, 1.25]);

    // TRANSITION TO WHITE (For seamless blend with FoundersSection)
    // Finishes exactly at the end of the section
    const bgOverlayOpacity = useTransform(progress, [0.88, 0.96], [0, 1]);

    // TEXT STAGE 1: The Mountain (Visible from 5% to 45%)
    const opacity1 = useTransform(progress, [0.05, 0.15, 0.4, 0.5], [0, 1, 1, 0]);
    const y1 = useTransform(progress, [0.05, 0.15, 0.4, 0.5], [50, 0, 0, -50]);

    // TEXT STAGE 2: The Impact (Visible from 55% to 90%)
    const opacity2 = useTransform(progress, [0.55, 0.65, 0.88, 0.95], [0, 1, 1, 0]);
    const y2 = useTransform(progress, [0.55, 0.65, 0.88, 0.95], [50, 0, 0, -50]);

    return (
        <section 
            id="story" 
            ref={sectionRef} 
            className="relative w-full h-[450vh] lg:h-[300vh] bg-black overflow-clip"
        >
            {/* STICKY VIEWPORT CONTAINER */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                
                {/* BACKGROUND IMAGE LAYER (ULTRA-ROBUST COVERAGE) */}
                <motion.div
                    style={{ y: bgY, scale: bgScale }}
                    className="absolute -top-[10vh] left-0 w-full h-[120vh] z-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" 
                        alt="High altitude mountains" 
                        fill
                        priority
                        className="object-cover"
                    />
                    {/* Atmospheric Overlay */}
                    <div className="absolute inset-0 bg-black/30 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-mango/10 to-accent-watermelon/20 mix-blend-overlay z-10" />
                    
                    {/* Top/Bottom Cinematic Vignettes */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/60 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent z-10" />
                </motion.div>

                {/* DYNAMIC BACKGROUND COLOR FADE (FOR SMOOTH TRANSITION) */}
                <motion.div 
                    style={{ opacity: bgOverlayOpacity }}
                    className="absolute inset-0 z-40 bg-white pointer-events-none"
                    aria-hidden="true"
                />

                {/* CONTENT LAYER */}
                <div className="relative z-30 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center pt-24 md:pt-32">
                    
                    {/* STAGE 1: THE ORIGIN */}
                    <motion.div
                        id="story-origin"
                        style={{ opacity: opacity1, y: y1 }}
                        className="absolute flex flex-col items-center max-w-6xl w-full"
                    >
                        <span className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-primary-green/20 border border-primary-green/30 text-primary-green text-xs md:text-sm font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-[0_0_20px_rgba(57,255,20,0.1)]">
                            The Origin
                        </span>
                        <h2 className="text-4xl md:text-7xl lg:text-[8rem] xl:text-[9rem] font-heading font-black tracking-tighter mb-6 md:mb-10 leading-[0.85] uppercase text-white drop-shadow-2xl">
                            Born on a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-mango to-accent-watermelon italic">Mountain.</span>
                        </h2>
                        <div className="w-12 h-1 md:w-20 md:h-1.5 bg-primary-green mx-auto mb-6 shadow-[0_0_20px_rgba(57,255,20,0.5)]" />
                        <p className="text-base md:text-2xl lg:text-3xl font-body font-light text-gray-100 max-w-3xl mx-auto leading-snug">
                            Miket realized on a long trek that hydration was <br className="hidden md:block" />
                            <span className="text-white font-bold italic">dull, sugary, and over-processed.</span>
                        </p>
                        <div className="mt-8 md:mt-12 flex flex-col items-center">
                            <span className="text-white font-black uppercase text-lg md:text-3xl lg:text-5xl tracking-tight drop-shadow-lg">
                                He wanted something real.
                            </span>
                        </div>
                    </motion.div>

                    {/* STAGE 2: THE IMPACT */}
                    <motion.div
                        style={{ opacity: opacity2, y: y2 }}
                        className="absolute flex flex-col items-center max-w-6xl w-full"
                    >
                        <span className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-primary-blue/20 border border-primary-blue/30 text-primary-blue text-xs md:text-sm font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-[0_0_20px_rgba(0,198,255,0.1)]">
                            The Effect
                        </span>
                        <h2 className="text-4xl md:text-7xl lg:text-[8rem] xl:text-[9rem] font-heading font-black tracking-tighter mb-6 md:mb-10 leading-[0.85] uppercase text-white drop-shadow-2xl">
                            The <br />
                            <span className="text-primary-blue italic">Impact.</span>
                        </h2>
                        <p className="text-base md:text-2xl lg:text-4xl font-body font-light text-gray-100 max-w-4xl mx-auto leading-snug">
                            One bottle changes the baseline. <br className="hidden md:block" />
                            <span className="text-white font-bold italic">No crash. No fog.</span>
                        </p>
                        <p className="mt-8 md:mt-12 text-primary-green font-black uppercase tracking-widest text-2xl md:text-5xl lg:text-7xl drop-shadow-[0_0_40px_rgba(57,255,20,0.4)]">
                            Electric Drive.
                        </p>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
