"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/**
 * StorySection: A cinematic, sticky-scroll narrative experience.
 * Fully rebuilt into a massive 5-chapter manifesto based on client brand guide.
 */
export default function StorySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    // Track scroll across the entire 600vh range
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const progress = scrollYProgress;

    // PARALLAX BACKGROUND LOGIC
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

    const bgYDesktop = useTransform(progress, [0, 1], ["10%", "-10%"]);
    const bgYMobile = useTransform(progress, [0, 1], ["5%", "-5%"]);
    const bgY = isMobile ? bgYMobile : bgYDesktop;
    const bgScale = useTransform(progress, [0, 1], [1.1, 1.4]);




    // -------------------------------------------------------------
    // CHAPTER 1: THE ORIGIN [0% - 15%] -> Fade out at 18%
    // -------------------------------------------------------------
    const opacity1 = useTransform(progress, [0, 0.05, 0.15, 0.18], [0, 1, 1, 0]);
    const y1 = useTransform(progress, [0, 0.05, 0.15, 0.18], [50, 0, 0, -50]);

    // -------------------------------------------------------------
    // CHAPTER 2: THE REBELLION [20% - 35%] -> Fade out at 38%
    // -------------------------------------------------------------
    const opacity2 = useTransform(progress, [0.18, 0.23, 0.35, 0.38], [0, 1, 1, 0]);
    const y2 = useTransform(progress, [0.18, 0.23, 0.35, 0.38], [50, 0, 0, -50]);

    // -------------------------------------------------------------
    // CHAPTER 3: THE BASE [40% - 55%] -> Fade out at 58%
    // -------------------------------------------------------------
    const opacity3 = useTransform(progress, [0.38, 0.43, 0.55, 0.58], [0, 1, 1, 0]);
    const y3 = useTransform(progress, [0.38, 0.43, 0.55, 0.58], [50, 0, 0, -50]);

    // -------------------------------------------------------------
    // CHAPTER 4: THE FUSION [60% - 75%] -> Fade out at 78%
    // -------------------------------------------------------------
    const opacity4 = useTransform(progress, [0.58, 0.63, 0.75, 0.78], [0, 1, 1, 0]);
    const y4 = useTransform(progress, [0.58, 0.63, 0.75, 0.78], [50, 0, 0, -50]);

    // -------------------------------------------------------------
    // CHAPTER 5: THE IMPACT [80% - 92%] -> Fade out at 95%
    // -------------------------------------------------------------
    const opacity5 = useTransform(progress, [0.77, 0.82, 0.92, 0.95], [0, 1, 1, 0]);
    const y5 = useTransform(progress, [0.77, 0.82, 0.92, 0.95], [50, 0, 0, -50]);

    return (
        <section 
            id="manifesto" 
            ref={sectionRef} 
            className="relative w-full h-[600vh] bg-[#111111] overflow-clip"
        >
            {/* STICKY VIEWPORT CONTAINER */}
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
                
                {/* BACKGROUND IMAGE LAYER */}
                <motion.div
                    style={{ y: bgY, scale: bgScale, willChange: "transform" }}
                    className="absolute -top-[10vh] left-0 w-full h-[120vh] z-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" 
                        alt="High altitude mountains" 
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#111111]/60 mix-blend-multiply z-10 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#111111]/90 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#111111]/90 to-transparent z-10" />
                </motion.div>




                {/* CONTENT LAYER */}
                <div className="relative z-30 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center pt-24 md:pt-32">
                    
                    {/* CHAPTER 1 */}
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

                    {/* CHAPTER 2 */}
                    <motion.div
                        style={{ opacity: opacity2, y: y2, willChange: "transform, opacity" }}
                        className="absolute flex flex-col items-center max-w-6xl w-full px-4 md:px-0 pointer-events-none"
                    >
                        <span className="inline-block px-5 py-2 md:px-6 md:py-2 bg-accent-watermelon/20 border border-accent-watermelon/30 text-accent-watermelon text-[10px] md:text-sm font-black uppercase tracking-[0.3em] rounded-full mb-6 md:mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,51,102,0.2)]">
                            Chapter 02 : The Rebellion
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-heading font-black italic tracking-tighter mb-4 md:mb-8 leading-[0.9] md:leading-[0.85] uppercase text-white drop-shadow-2xl">
                            The <br />
                            <span className="text-accent-watermelon italic pr-2">Anti-Soda.</span>
                        </h2>
                        <p className="text-lg md:text-2xl lg:text-4xl font-body font-normal text-gray-200 max-w-4xl mx-auto leading-relaxed md:leading-snug">
                            We didn't want another generic sugary drink. <br className="hidden lg:block" />
                            We demanded something real. Honest ingredients. <br className="hidden lg:block" />
                            <span className="text-white font-black italic">No compromises.</span>
                        </p>
                    </motion.div>

                    {/* CHAPTER 3 */}
                    <motion.div
                        style={{ opacity: opacity3, y: y3, willChange: "transform, opacity" }}
                        className="absolute flex flex-col items-center max-w-6xl w-full px-4 md:px-0 pointer-events-none"
                    >
                        <span className="inline-block px-5 py-2 md:px-6 md:py-2 bg-primary-white/10 border border-primary-white/20 text-primary-white text-[10px] md:text-sm font-black uppercase tracking-[0.3em] rounded-full mb-6 md:mb-8 backdrop-blur-md">
                            Chapter 03 : The Base
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] xl:text-[8rem] font-heading font-black italic tracking-tighter mb-4 md:mb-8 leading-[0.9] md:leading-[0.85] uppercase text-white drop-shadow-2xl">
                            Nature's Perfect <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-white to-gray-400 italic pr-2">Matrix.</span>
                        </h2>
                        <div className="w-16 h-1 md:w-20 md:h-1.5 bg-primary-white mx-auto mb-6 md:mb-8 opacity-50" />
                        <p className="text-lg md:text-2xl lg:text-3xl font-body font-normal text-gray-200 max-w-3xl mx-auto leading-relaxed md:leading-snug">
                            It starts with pure, clean coconut water. <br className="hidden md:block" />
                            <span className="text-white font-black italic">Earth's original electrolyte source.</span>
                        </p>
                    </motion.div>

                    {/* CHAPTER 4 */}
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

                    {/* CHAPTER 5 */}
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
