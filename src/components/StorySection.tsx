"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/**
 * StorySection: A cinematic, sticky-scroll narrative experience.
 * Each chapter has its own unique cartoonish illustrated background
 * that cross-fades smoothly as the user scrolls through the brand story.
 */

const SCENES = [
    {
        image: "/assets/story/origin.png",
        overlayColor: "bg-[#1a0533]/50",       // Deep purple tint matching dawn mountains
        gradientTop: "from-[#0B0033]/80",
        gradientBottom: "from-[#111111]/90",
    },
    {
        image: "/assets/story/rebellion.png",
        overlayColor: "bg-[#0a0000]/65",        // Stronger dark overlay for readability over bright soda cans
        gradientTop: "from-[#050505]/80",
        gradientBottom: "from-[#111111]/90",
    },
    {
        image: "/assets/story/base.png",
        overlayColor: "bg-[#002020]/30",         // Subtle teal tint for tropical
        gradientTop: "from-[#1a6b8a]/50",
        gradientBottom: "from-[#111111]/70",
    },
    {
        image: "/assets/story/fusion.png",
        overlayColor: "bg-[#1a0500]/40",         // Warm dark tint for fruit explosion
        gradientTop: "from-[#111111]/60",
        gradientBottom: "from-[#111111]/80",
    },
    {
        image: "/assets/story/promise.png",
        overlayColor: "bg-[#000a00]/40",         // Deep dark-green tint for clean horizon
        gradientTop: "from-[#050505]/60",
        gradientBottom: "from-[#111111]/85",
    },
];

export default function StorySection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const progress = scrollYProgress;

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsMobile(window.innerWidth < 768 || isTouch);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // ─── PARALLAX for illustrated backgrounds ───
    const bgYDesktop = useTransform(progress, [0, 1], ["2%", "-2%"]);
    const bgYMobile = useTransform(progress, [0, 1], ["1%", "-1%"]);
    const bgY = isMobile ? bgYMobile : bgYDesktop;

    const bgScale = useTransform(progress, [0, 1], [1.0, 1.05]);

    // ─── BACKGROUND SCENE SNAP TRANSITIONS ───
    // Pure snap: each background switches in 0.01 scroll (≈5vh = instant)
    // 5 chapters evenly split across scroll: each = 0.20 range
    // NO crossfade — only one background visible at any time
    const bg1Opacity = useTransform(progress, [0, 0.19, 0.20], [1, 1, 0]);
    const bg2Opacity = useTransform(progress, [0.19, 0.20, 0.39, 0.40], [0, 1, 1, 0]);
    const bg3Opacity = useTransform(progress, [0.39, 0.40, 0.59, 0.60], [0, 1, 1, 0]);
    const bg4Opacity = useTransform(progress, [0.59, 0.60, 0.79, 0.80], [0, 1, 1, 0]);
    const bg5Opacity = useTransform(progress, [0.79, 0.80, 1.0], [0, 1, 1]);

    const bgOpacities = [bg1Opacity, bg2Opacity, bg3Opacity, bg4Opacity, bg5Opacity];

    // ─── CHAPTER TEXT — INSTANT SNAP ───
    // Text appears immediately with chapter, exits at boundary. No y-shift for clean snap.
    const opacity1 = useTransform(progress, [0, 0.005, 0.19, 0.20], [0, 1, 1, 0]);
    const y1 = useTransform(progress, [0, 0.005], [15, 0]);

    const opacity2 = useTransform(progress, [0.19, 0.20, 0.39, 0.40], [0, 1, 1, 0]);
    const y2 = useTransform(progress, [0.19, 0.20], [15, 0]);

    const opacity3 = useTransform(progress, [0.39, 0.40, 0.59, 0.60], [0, 1, 1, 0]);
    const y3 = useTransform(progress, [0.39, 0.40], [15, 0]);

    const opacity4 = useTransform(progress, [0.59, 0.60, 0.79, 0.80], [0, 1, 1, 0]);
    const y4 = useTransform(progress, [0.59, 0.60], [15, 0]);

    const opacity5 = useTransform(progress, [0.79, 0.80, 1.0], [0, 1, 1]);
    const y5 = useTransform(progress, [0.79, 0.80], [15, 0]);

    return (
        <section
            id="manifesto"
            ref={sectionRef}
            className="relative w-full h-[600vh] bg-[#111111] overflow-clip"
        >
            {/* STICKY VIEWPORT CONTAINER */}
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">

                {/* ═══════════════════════════════════════════════════════
                    ILLUSTRATED BACKGROUND LAYERS
                    Each scene is a full-bleed illustrated image that
                    cross-fades in/out as the corresponding chapter scrolls
                ═══════════════════════════════════════════════════════ */}
                {SCENES.map((scene, i) => (
                    <motion.div
                        key={i}
                        style={{ opacity: bgOpacities[i], willChange: "opacity" }}
                        className="absolute inset-0 z-0"
                    >
                        {/* Parallax-moving illustrated background */}
                        <motion.div
                            style={{ y: bgY, scale: bgScale, willChange: "transform" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Image
                                src={scene.image}
                                alt={`Story scene ${i + 1}`}
                                fill
                                priority={i === 0}
                                className="object-cover object-center"
                                sizes="100vw"
                                quality={90}
                            />
                        </motion.div>

                        {/* Color overlay for mood & text readability */}
                        <div className={`absolute inset-0 ${scene.overlayColor} z-10 pointer-events-none`} />

                        {/* Top vignette gradient */}
                        <div className={`absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b ${scene.gradientTop} to-transparent z-10 pointer-events-none`} />

                        {/* Bottom vignette gradient */}
                        <div className={`absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t ${scene.gradientBottom} to-transparent z-10 pointer-events-none`} />
                    </motion.div>
                ))}


                {/* ═══════════════════════════════════════════════════════
                    CONTENT LAYER - Chapter text overlaid on backgrounds
                ═══════════════════════════════════════════════════════ */}
                <div className="relative z-30 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center pt-24 md:pt-32">

                    {/* CHAPTER 1: THE ORIGIN — Mountain Dawn Scene */}
                    <motion.div
                        style={{ opacity: opacity1, y: y1, willChange: "transform, opacity" }}
                        className="absolute flex flex-col items-center max-w-6xl w-full px-4 md:px-0"
                    >
                        <span className="inline-block px-5 py-2 md:px-6 md:py-2 bg-primary-white/10 border border-primary-white/20 text-primary-white text-[10px] md:text-sm font-black uppercase tracking-[0.3em] rounded-full mb-6 md:mb-8 backdrop-blur-md">
                            Chapter 01 : The Origin
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-[8rem] xl:text-[9rem] font-heading font-black italic tracking-tighter mb-4 md:mb-10 leading-[0.9] md:leading-[0.85] uppercase text-white drop-shadow-2xl">
                            Born on a <br />
                            <span className="text-primary-green pr-2">Mountain.</span>
                        </h2>
                        <div className="w-16 h-1 md:w-20 md:h-1.5 bg-primary-green mx-auto mb-6 md:mb-8 shadow-[0_0_20px_rgba(126,217,86,0.5)]" />
                        <p className="text-lg md:text-2xl lg:text-3xl font-body font-normal text-gray-200 max-w-3xl mx-auto leading-relaxed md:leading-snug">
                            Miket realized on a long trek that hydration was <br className="hidden md:block" />
                            <span className="text-white font-black italic">dull, sugary, and over-processed.</span>
                        </p>
                    </motion.div>

                    {/* CHAPTER 2: THE REBELLION — Urban Night Scene */}
                    <motion.div
                        style={{ opacity: opacity2, y: y2, willChange: "transform, opacity" }}
                        className="absolute flex flex-col items-center max-w-6xl w-full px-4 md:px-0 pointer-events-none"
                    >
                        <span className="inline-block px-5 py-2 md:px-6 md:py-2 bg-black/40 border border-white/30 text-white text-[10px] md:text-sm font-black uppercase tracking-[0.3em] rounded-full mb-6 md:mb-8 backdrop-blur-lg">
                            Chapter 02 : The Rebellion
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-heading font-black italic tracking-tighter mb-4 md:mb-8 leading-[0.9] md:leading-[0.85] uppercase text-white [text-shadow:_0_2px_20px_rgba(0,0,0,0.8),_0_4px_40px_rgba(0,0,0,0.5)]">
                            The <br />
                            <span className="text-white italic pr-2" style={{ textShadow: '0 0 30px rgba(255,51,102,0.6), 0 0 60px rgba(255,51,102,0.3), 0 4px_8px rgba(0,0,0,0.9)' }}>Anti-Soda.</span>
                        </h2>
                        <p className="text-lg md:text-2xl lg:text-4xl font-body font-normal text-gray-200 max-w-4xl mx-auto leading-relaxed md:leading-snug [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
                            We didn&apos;t want another generic sugary drink. <br className="hidden lg:block" />
                            We demanded something real. Honest ingredients. <br className="hidden lg:block" />
                            <span className="text-white font-black italic">No compromises.</span>
                        </p>
                    </motion.div>

                    {/* CHAPTER 3: THE BASE — Tropical Paradise Scene */}
                    <motion.div
                        style={{ opacity: opacity3, y: y3, willChange: "transform, opacity" }}
                        className="absolute flex flex-col items-center max-w-6xl w-full px-4 md:px-0 pointer-events-none"
                    >
                        <span className="inline-block px-5 py-2 md:px-6 md:py-2 bg-primary-white/10 border border-primary-white/20 text-primary-white text-[10px] md:text-sm font-black uppercase tracking-[0.3em] rounded-full mb-6 md:mb-8 backdrop-blur-md">
                            Chapter 03 : The Base
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-heading font-black italic tracking-tighter mb-4 md:mb-8 leading-[0.9] md:leading-[0.85] uppercase text-white drop-shadow-2xl">
                            Nature&apos;s Perfect <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-white to-gray-400 italic pr-2">Matrix.</span>
                        </h2>
                        <div className="w-16 h-1 md:w-20 md:h-1.5 bg-primary-white mx-auto mb-6 md:mb-8 opacity-50" />
                        <p className="text-lg md:text-2xl lg:text-3xl font-body font-normal text-gray-200 max-w-3xl mx-auto leading-relaxed md:leading-snug">
                            It starts with pure, clean coconut water. <br className="hidden md:block" />
                            <span className="text-white font-black italic">Earth&apos;s original electrolyte source.</span>
                        </p>
                    </motion.div>

                    {/* CHAPTER 4: THE FUSION — Fruit Explosion Scene */}
                    <motion.div
                        style={{ opacity: opacity4, y: y4, willChange: "transform, opacity" }}
                        className="absolute flex flex-col items-center max-w-6xl w-full px-4 md:px-0 pointer-events-none"
                    >
                        <span className="inline-block px-5 py-2 md:px-6 md:py-2 bg-accent-mango/20 border border-accent-mango/30 text-accent-mango text-[10px] md:text-sm font-black uppercase tracking-[0.3em] rounded-full mb-6 md:mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,179,0,0.2)]">
                            Chapter 04 : The Fusion
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-heading font-black italic tracking-tighter mb-4 md:mb-8 leading-[0.9] md:leading-[0.85] uppercase text-white drop-shadow-2xl">
                            Refined by <br />
                            <span className="text-accent-mango italic pr-2">Flavor.</span>
                        </h2>
                        <p className="text-lg md:text-2xl lg:text-4xl font-body font-normal text-gray-200 max-w-4xl mx-auto leading-relaxed md:leading-snug">
                            Fresh fruit blends meet clean hydration. <br className="hidden lg:block" />
                            A guilt-free drink that actually tastes <br className="hidden lg:block" />
                            <span className="text-white font-black italic">rebellious.</span>
                        </p>
                    </motion.div>

                    {/* CHAPTER 5: THE PROMISE — Clean Horizon Scene */}
                    <motion.div
                        style={{ opacity: opacity5, y: y5, willChange: "transform, opacity" }}
                        className="absolute flex flex-col items-center max-w-6xl w-full px-4 md:px-0 pointer-events-none"
                    >
                        <span className="inline-block px-5 py-2 md:px-6 md:py-2 bg-primary-blue/20 border border-primary-blue/30 text-primary-blue text-[10px] md:text-sm font-black uppercase tracking-[0.3em] rounded-full mb-6 md:mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(58,182,253,0.2)]">
                            Chapter 05 : The Promise
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-heading font-black italic tracking-tighter mb-4 md:mb-8 leading-[0.9] md:leading-[0.85] uppercase text-white drop-shadow-2xl">
                            The Baseline <br />
                            <span className="text-primary-blue italic pr-2">Shift.</span>
                        </h2>
                        <p className="text-lg md:text-2xl lg:text-3xl font-body font-normal text-gray-200 max-w-3xl mx-auto leading-relaxed md:leading-snug mb-8">
                            No crash. No medical hype. <br className="hidden md:block" />
                            Just pure, natural hydration.
                        </p>
                        <p className="font-wedges not-italic tracking-normal uppercase text-4xl md:text-6xl lg:text-7xl">
                            <span className="text-[#7ED956]">COCO</span><span className="text-[#3AB6FD]">FUSE.</span>
                        </p>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
