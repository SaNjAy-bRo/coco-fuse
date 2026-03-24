"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue, useSpring } from "framer-motion";

export default function ParallaxBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const [activeCard, setActiveCard] = useState(0);

    const bgY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);

    const cards = [
        {
            title: "The Formula",
            desc: "Raw electrochemical drive. We synthesized the perfect ratio of natural potassium from coconuts and B-Vitamins for zero crash energy.",
            color: "from-accent-mango",
            shadow: "shadow-accent-mango/30",
            textAccent: "text-accent-mango",
            glow: "bg-accent-mango/20",
            art: (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-64 h-64 bg-accent-mango/50 rounded-full blur-[60px] animate-pulse" />
                    <div className="absolute w-80 h-80 border-[2px] border-accent-mango/30 rounded-full" />
                    <div className="absolute w-96 h-96 border-[2px] border-accent-mango/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
                    <svg className="absolute w-40 h-40 text-accent-mango drop-shadow-[0_0_30px_rgba(255,209,102,1)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 2L3 14h9l-1 8 10-14h-8l2-8z" />
                    </svg>
                </div>
            )
        },
        {
            title: "Cellular Hydration",
            desc: "Water isn't enough when you're sweating out minerals. CocoFuse drives electrolytes straight into your cells twice as fast as plain water.",
            color: "from-primary-green",
            shadow: "shadow-primary-green/30",
            textAccent: "text-primary-green",
            glow: "bg-primary-green/20",
            art: (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-64 h-64 bg-primary-green/50 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: "1s" }} />
                    <svg className="absolute w-full h-full text-primary-green/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" className="animate-[pulse_4s_ease-in-out_infinite]" />
                        <path d="M0,60 Q25,40 50,60 T100,60 L100,100 L0,100 Z" fill="currentColor" className="opacity-60 animate-[pulse_5s_ease-in-out_infinite]" />
                    </svg>
                    <svg className="absolute w-40 h-40 text-primary-green drop-shadow-[0_0_30px_rgba(126,217,86,1)] animate-bounce" style={{ animationDuration: "3s" }} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                </div>
            )
        },
        {
            title: "Laser Focus",
            desc: "No artificial dyes. No high fructose corn syrup fog. Just clean ingredients that keep your neural pathways firing rapidly.",
            color: "from-primary-blue",
            shadow: "shadow-primary-blue/30",
            textAccent: "text-primary-blue",
            glow: "bg-primary-blue/20",
            art: (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-64 h-64 bg-primary-blue/50 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%),linear-gradient(rgba(58,182,253,0.2)_2px,transparent_2px),linear-gradient(90deg,rgba(58,182,253,0.2)_2px,transparent_2px)] bg-[size:100%_100%,60px_60px,60px_60px] animate-[pulse_4s_linear_infinite]" />
                    <svg className="absolute w-40 h-40 text-primary-blue drop-shadow-[0_0_30px_rgba(58,182,253,1)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            color: "from-accent-watermelon",
            shadow: "shadow-accent-watermelon/30",
            textAccent: "text-accent-watermelon",
            glow: "bg-accent-watermelon/20",
            art: (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-64 h-64 bg-accent-watermelon/50 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: "1.5s" }} />
                    <svg className="absolute w-full h-full text-accent-watermelon/20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M50,100 Q40,70 50,40 T50,0 Q60,30 50,60 T50,100 Z" fill="currentColor" className="animate-[pulse_2s_ease-in-out_infinite]" />
                    </svg>
                    <svg className="absolute w-40 h-40 text-accent-watermelon drop-shadow-[0_0_30px_rgba(255,107,107,1)]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2c0 0-5 6-5 11a5 5 0 0010 0c0-5-5-11-5-11z" />
                    </svg>
                </div>
            )
        }
    ];

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
            id="vibe"
            ref={containerRef}
            className="relative bg-accent-premium border-y border-white/5 h-auto md:h-[400vh]"
        >
            {/* Parallax Background Glows (Removed for cleaner look) */}
            {/* <motion.div
                className="absolute md:fixed inset-0 w-full h-full md:h-[100dvh] pointer-events-none mix-blend-screen"
                style={{ y: bgY }}
            >
                <motion.div 
                    animate={{ backgroundColor: `var(--color-${cards[activeCard].color.replace('from-', '')})` }}
                    className={`absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full blur-[180px] opacity-40 transition-colors duration-1000`} 
                />
                <motion.div 
                    animate={{ backgroundColor: `var(--color-${cards[activeCard].color.replace('from-', '')})` }}
                    className={`absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full blur-[150px] opacity-30 transition-colors duration-1000`} 
                    style={{ animationDelay: "1.5s" }} 
                />
            </motion.div> */}

            {/* Content Container */}
            <div className="md:sticky top-0 md:h-[100dvh] w-full flex flex-col md:flex-row items-center overflow-hidden py-16 md:py-0">
                <div className="container mx-auto px-5 md:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 relative z-10 w-full h-full">

                    {/* Left Side: Sticky Text */}
                    <div className="flex flex-col justify-center h-full relative z-20">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 font-heading font-bold text-xs tracking-widest uppercase mb-8 w-fit shadow-[0_0_15px_rgba(255,255,255,0.05)]">
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
                                    className={`text-4xl sm:text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter absolute inset-0 transition-colors duration-700 ${cards[activeCard].textAccent}`}
                                >
                                    {cards[activeCard].title}
                                </motion.h2>
                            </AnimatePresence>
                        </div>

                        {/* Mobile Title */}
                        <h2 className="text-5xl md:hidden font-heading font-black text-white uppercase tracking-tighter mb-6">
                            Beyond<br /><span className="text-accent-watermelon">Energy.</span>
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
                                    className="text-lg md:text-xl lg:text-2xl font-body text-gray-400 font-medium max-w-lg leading-relaxed absolute inset-0"
                                >
                                    {cards[activeCard].desc}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Mobile Desc */}
                        <p className="text-base md:hidden font-body text-gray-400 font-medium leading-relaxed mb-8">
                            A completely new protocol for hydration and focus, built natively from the ground up for zero crashes.
                        </p>

                        {/* Progress Indicators */}
                        <div className="hidden md:flex gap-4 mt-12">
                            {cards.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-2 rounded-full transition-all duration-700 ${activeCard === i ? `w-16 ${cards[i].glow.replace('/20', '')}` : "w-4 bg-white/10"}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Desktop Sliding Image Cards */}
                    <div className="relative md:h-[100dvh] flex flex-col md:block items-center justify-center lg:justify-end perspective-1000 gap-16 py-12 md:py-0 w-full pl-0 md:pl-16">
                        {cards.map((card, idx) => (
                            <DesktopCard
                                key={idx}
                                card={card}
                                idx={idx}
                                total={cards.length}
                                smoothProgress={smoothProgress}
                            />
                        ))}

                        {/* Mobile Static Cards */}
                        {cards.map((card, idx) => (
                            <motion.div
                                key={`mobile-${idx}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={`md:hidden w-full aspect-square rounded-[1.5rem] border border-white/10 bg-[#050505] shadow-xl relative overflow-hidden group mb-6 ${card.shadow}`}
                            >
                                {card.art}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <h3 className="text-3xl font-heading font-black text-white uppercase mb-3 relative z-10 drop-shadow-lg">{card.title}</h3>
                                    <p className="text-gray-300 font-body font-medium relative z-10 text-sm leading-relaxed drop-shadow-md">{card.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface DesktopCardProps {
    card: {
        title: string;
        desc: string;
        color: string;
        shadow: string;
        textAccent: string;
        glow: string;
        art: React.ReactNode;
    };
    idx: number;
    total: number;
    smoothProgress: MotionValue<number>;
}

const DesktopCard = (props: DesktopCardProps) => {
    const { card, idx, total, smoothProgress } = props;
    const center = idx / (total - 1);
    const enter = center - 0.33;
    const exit = center + 0.33;

    const yDesk = useTransform(smoothProgress, [enter, center, exit], ["100vh", "0vh", "-100vh"]);
    const opacityDesk = useTransform(smoothProgress, [enter + 0.1, center, exit - 0.1], [0, 1, 0]);
    const scaleDesk = useTransform(smoothProgress, [enter + 0.1, center, exit - 0.1], [0.85, 1, 0.85]);
    const rotateXDesk = useTransform(smoothProgress, [enter, center, exit], [20, 0, -20]);

    return (
        <motion.div
            style={{ y: yDesk, opacity: opacityDesk, scale: scaleDesk, rotateX: rotateXDesk }}
            className={`hidden md:flex absolute inset-y-0 right-0 w-full lg:max-w-[32rem] mx-auto flex-col items-center justify-center pointer-events-none ${card.shadow}`}
        >
            <div className={`relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.9)] pointer-events-auto flex items-center justify-center transition-colors duration-700 ${card.glow.replace('bg-', 'border-').replace('/20', '/40')}`}>
                {card.art}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)]" />
                <div className="absolute inset-4 border border-white/5 rounded-[2.2rem] pointer-events-none" />
                
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none opacity-50" />
            </div>
        </motion.div>
    )
}
