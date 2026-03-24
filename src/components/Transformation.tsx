"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Transformation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // SMOOTHING: Wrap scroll progress in a spring for momentum-based feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // OPTIMIZATION: Cross-fade instead of Filter
    // We'll have two layers. One grayscale, one color.
    const colorOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);
    const grayscaleOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
    
    const bgScale = useTransform(smoothProgress, [0, 0.6], [1.1, 1]);
    const textOpacity = useTransform(smoothProgress, [0.4, 0.6], [0, 1]);
    const textY = useTransform(smoothProgress, [0.4, 0.6], [40, 0]);
    
    const overlayOpacity = useTransform(smoothProgress, [0.3, 0.7], [0.4, 0]);

    const bgUrl = "https://images.unsplash.com/photo-1547032175-7fc8c7bd15b3?q=80&w=2070&auto=format&fit=crop";

    return (
        <section 
            ref={containerRef} 
            className="relative h-[250vh] bg-accent-premium border-y border-white/5"
            style={{ willChange: "transform" }}
        >
            <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                <motion.div 
                    style={{ scale: bgScale }}
                    className="absolute inset-0 z-0"
                >
                    {/* COLOR LAYER */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgUrl})` }}
                    />
                    
                    {/* GRAYSCALE LAYER (Fades out) */}
                    <motion.div 
                        style={{ 
                            opacity: grayscaleOpacity,
                            backgroundImage: `url(${bgUrl})`, 
                            filter: "grayscale(100%)" 
                        }}
                        className="absolute inset-0 bg-cover bg-center grayscale"
                    />
                    
                    {/* Darkening & Color Gradient Overlays */}
                    <motion.div 
                        style={{ opacity: overlayOpacity }}
                        className="absolute inset-0 bg-black z-10" 
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-accent-premium via-transparent to-transparent z-20" />
                </motion.div>

                {/* Content Overlay */}
                <div className="container mx-auto px-6 relative z-30 text-center">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            style={{ opacity: textOpacity, y: textY }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-primary-green font-heading font-black uppercase tracking-widest text-lg md:text-2xl mb-6">
                                The Moment of Impact
                            </span>
                            <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-heading font-black text-white uppercase tracking-tighter leading-[0.85] mb-8 md:mb-12">
                                <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-accent-mango to-accent-watermelon">VIBE</span> 
                                SHIFTED
                            </h2>
                            <p className="text-lg md:text-3xl font-body text-gray-400 max-w-3xl leading-relaxed mx-auto px-4 md:px-0">
                                From dull to high-def. From exhausted to extraordinary. 
                                <span className="block md:inline text-white font-bold md:ml-2">Experience the instant clarity of raw coconut energy.</span>
                            </p>
                            
                            <div className="mt-12 md:mt-16 grid grid-cols-1 md:flex items-center gap-8 md:gap-12 w-full max-w-lg md:max-w-none">
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl md:text-6xl font-heading font-black text-primary-green mb-1 md:mb-2">Instant</span>
                                    <span className="text-[10px] md:text-xs font-heading uppercase tracking-[0.3em] text-gray-500">Hydration</span>
                                </div>
                                <div className="hidden md:block w-px h-16 bg-white/20" />
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl md:text-6xl font-heading font-black text-accent-mango mb-1 md:mb-2">Zero</span>
                                    <span className="text-[10px] md:text-xs font-heading uppercase tracking-[0.3em] text-gray-500">Artificials</span>
                                </div>
                                <div className="hidden md:block w-px h-16 bg-white/20" />
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl md:text-6xl font-heading font-black text-primary-blue mb-1 md:mb-2">Peak</span>
                                    <span className="text-[10px] md:text-xs font-heading uppercase tracking-[0.3em] text-gray-500">Neural Flow</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div 
                    style={{ opacity: textOpacity }}
                    className="absolute inset-0 pointer-events-none mix-blend-screen overflow-hidden"
                >
                    <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-primary-blue/20 rounded-full blur-[150px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-accent-watermelon/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
                </motion.div>
            </div>
        </section>
    );
}
