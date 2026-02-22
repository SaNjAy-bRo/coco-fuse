"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function ParallaxBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [activeCard, setActiveCard] = useState(0);

    // Deep parallax for the background glow
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const cards = [
        {
            title: "The Formula",
            desc: "Raw electrochemical drive. We synthesized the perfect ratio of natural potassium from coconuts and B-Vitamins for zero crash energy.",
            color: "from-brand-yellow",
            shadow: "shadow-brand-yellow/30",
            art: (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Glowing Core */}
                    <div className="absolute w-64 h-64 bg-brand-yellow/50 rounded-full blur-[60px] animate-pulse" />
                    {/* Concentric Rings */}
                    <div className="absolute w-80 h-80 border-[2px] border-brand-yellow/30 rounded-full" />
                    <div className="absolute w-96 h-96 border-[2px] border-brand-yellow/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
                    <svg className="absolute w-40 h-40 text-brand-yellow drop-shadow-[0_0_30px_rgba(250,204,21,1)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 2L3 14h9l-1 8 10-14h-8l2-8z" />
                    </svg>
                </div>
            )
        },
        {
            title: "Cellular Hydration",
            desc: "Water isn't enough when you're sweating out minerals. CocoFuse drives electrolytes straight into your cells twice as fast as plain water.",
            color: "from-brand-green",
            shadow: "shadow-brand-green/30",
            art: (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-64 h-64 bg-brand-green/50 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: "1s" }} />
                    {/* Fluid Waves */}
                    <svg className="absolute w-full h-full text-brand-green/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" className="animate-[pulse_4s_ease-in-out_infinite]" />
                        <path d="M0,60 Q25,40 50,60 T100,60 L100,100 L0,100 Z" fill="currentColor" className="opacity-60 animate-[pulse_5s_ease-in-out_infinite]" />
                    </svg>
                    <svg className="absolute w-40 h-40 text-brand-green drop-shadow-[0_0_30px_rgba(34,197,94,1)] animate-bounce" style={{ animationDuration: "3s" }} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                </div>
            )
        },
        {
            title: "Laser Focus",
            desc: "No artificial dyes. No high fructose corn syrup fog. Just clean ingredients that keep your neural pathways firing rapidly.",
            color: "from-blue-500",
            shadow: "shadow-blue-500/30",
            art: (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-64 h-64 bg-blue-500/50 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: "0.5s" }} />
                    {/* Neural Network / Crosshair */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%),linear-gradient(rgba(59,130,246,0.2)_2px,transparent_2px),linear-gradient(90deg,rgba(59,130,246,0.2)_2px,transparent_2px)] bg-[size:100%_100%,60px_60px,60px_60px] animate-[pulse_4s_linear_infinite]" />
                    <svg className="absolute w-40 h-40 text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,1)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="12" cy="12" r="2" />
                        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                    </svg>
                </div>
            )
        },
        {
            title: "The Burn",
            desc: "At just ~20 kcal per 100ml, you get maximum output with minimal metabolic drag. Keeps you light, lean, and aggressive.",
            color: "from-brand-orange",
            shadow: "shadow-brand-orange/30",
            art: (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-64 h-64 bg-brand-orange/50 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: "1.5s" }} />
                    {/* Fire Trails */}
                    <svg className="absolute w-full h-full text-brand-orange/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M50,100 Q40,70 50,40 T50,0 Q60,30 50,60 T50,100 Z" fill="currentColor" className="animate-[pulse_2s_ease-in-out_infinite]" />
                    </svg>
                    <svg className="absolute w-40 h-40 text-brand-orange drop-shadow-[0_0_30px_rgba(249,115,22,1)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2c0 0-5 6-5 11a5 5 0 0010 0c0-5-5-11-5-11zm0 15a3 3 0 01-3-3cf0-2 3-5 3-5s3 3 3 5a3 3 0 01-3 3z" />
                    </svg>
                </div>
            )
        }
    ];

    // Listen to scroll to update the active card index for the sticky side
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (v < 0.16) setActiveCard(0);
            else if (v < 0.5) setActiveCard(1);
            else if (v < 0.83) setActiveCard(2);
            else setActiveCard(3);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section
            ref={containerRef}
            className="relative bg-black border-y border-white/5 md:h-[400vh]"
        >
            {/* Parallax Background Glows */}
            <motion.div
                className="absolute md:fixed inset-0 w-full h-full md:h-screen pointer-events-none"
                style={{ y: bgY }}
            >
                <div className="absolute top-1/4 left-1/4 w-[20rem] h-[20rem] bg-brand-orange/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[20rem] h-[20rem] bg-brand-green/10 rounded-full blur-[120px]" />
            </motion.div>

            {/* Content Container */}
            <div className="md:sticky top-0 md:h-screen w-full flex flex-col md:flex-row items-center overflow-hidden py-24 md:py-0">
                <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative z-10 w-full h-full">

                    {/* Left Side: Sticky Text (Desktop) / Normal Header (Mobile) */}
                    <div className="flex flex-col justify-center h-full relative z-20">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 font-bold text-xs tracking-widest uppercase mb-8 w-fit shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            The CocoFuse Effect
                        </div>

                        {/* Desktop Title */}
                        <div className="h-40 md:h-32 mb-6 relative hidden md:block">
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={activeCard}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter absolute inset-0"
                                >
                                    {cards[activeCard].title}
                                </motion.h2>
                            </AnimatePresence>
                        </div>

                        {/* Mobile Title */}
                        <h2 className="text-5xl md:hidden font-black text-white uppercase tracking-tighter mb-6">
                            Beyond<br /><span className="text-brand-orange">Energy.</span>
                        </h2>

                        {/* Desktop Changing Desc */}
                        <div className="hidden md:block relative h-32">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={activeCard}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-xl md:text-2xl text-gray-400 font-medium max-w-lg leading-relaxed absolute inset-0"
                                >
                                    {cards[activeCard].desc}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Mobile Desc */}
                        <p className="text-lg md:hidden text-gray-400 font-medium leading-relaxed mb-12">
                            A completely new protocol for hydration and focus, built natively from the ground up for zero crashes.
                        </p>

                        {/* Progress Indicators (Desktop Only) */}
                        <div className="hidden md:flex gap-3 mt-12">
                            {cards.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${activeCard === i ? "w-12 bg-white" : "w-4 bg-white/20"}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Desktop Sliding Image Cards / Mobile Static Grid */}
                    <div className="relative md:h-screen flex flex-col md:block items-center justify-center lg:justify-end perspective-1000 gap-16 py-12 md:py-0 w-full pl-0 md:pl-16">
                        {cards.map((card, idx) => {
                            // Desktop Transforms
                            // We have 4 cards, so the "centers" are 0, 0.33, 0.66, 1.0
                            const center = idx / (cards.length - 1);
                            const enter = center - 0.33;
                            const exit = center + 0.33;

                            const yDesk = useTransform(scrollYProgress, [enter, center, exit], ["100vh", "0vh", "-100vh"]);
                            const opacityDesk = useTransform(scrollYProgress, [enter + 0.1, center, exit - 0.1], [0, 1, 0]);
                            const scaleDesk = useTransform(scrollYProgress, [enter + 0.1, center, exit - 0.1], [0.85, 1, 0.85]);
                            const rotateXDesk = useTransform(scrollYProgress, [enter, center, exit], [20, 0, -20]);

                            return (
                                <motion.div
                                    key={idx}
                                    style={{ y: yDesk, opacity: opacityDesk, scale: scaleDesk, rotateX: rotateXDesk }}
                                    className={`hidden md:flex absolute inset-y-0 right-0 w-full lg:max-w-[32rem] mx-auto flex-col items-center justify-center pointer-events-none ${card.shadow}`}
                                >
                                    <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#050505] shadow-[0_30px_100px_rgba(0,0,0,0.9)] pointer-events-auto flex items-center justify-center">

                                        {/* Pure SVG/CSS Art Injection */}
                                        {card.art}

                                        {/* Vignette Mapping */}
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)]" />

                                        {/* Inner Frame */}
                                        <div className="absolute inset-4 border border-white/10 rounded-[2.5rem] pointer-events-none" />
                                    </div>
                                </motion.div>
                            )
                        })}

                        {/* Mobile Static Cards */}
                        {cards.map((card, idx) => (
                            <motion.div
                                key={`mobile-${idx}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`md:hidden w-full aspect-[4/5] rounded-[2rem] border border-white/10 bg-[#050505] shadow-xl relative overflow-hidden group mb-8 ${card.shadow}`}
                            >
                                {/* Pure SVG/CSS Art Injection */}
                                {card.art}

                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <h3 className="text-3xl font-black text-white uppercase mb-3 relative z-10 drop-shadow-lg">{card.title}</h3>
                                    <p className="text-gray-300 font-medium relative z-10 text-sm leading-relaxed drop-shadow-md">{card.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
