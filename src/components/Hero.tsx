"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useFlavor, FLAVORS, FlavorID } from "@/context/FlavorContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import HeroDeco from "./HeroDeco";

function MiniCoconutIcon({ liquid, active, onClick, name, hideLabel = false }: { liquid: string, active: boolean, onClick: () => void, name: string, hideLabel?: boolean }) {
    return (
        <button 
            type="button"
            onClick={onClick}
            className={`relative z-10 flex flex-col items-center gap-2 group transition-all duration-500 scale-75 sm:scale-100 ${active ? 'scale-100 sm:scale-110 opacity-100' : 'opacity-60 hover:opacity-100 hover:scale-95 sm:hover:scale-105'}`}
        >
            <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl border-2 border-white/40 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 relative"
            >
                {/* Diagonal color split to simulate dual flavor/coconut body */}
                <div className="absolute inset-0 w-full h-full transition-all duration-700"
                     style={{ background: `linear-gradient(135deg, var(--color-primary-green) 50%, ${liquid} 50%)` }}>
                </div>
                
                {/* Inner white "coconut meat" / Frosted core */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md shadow-inner border border-white/50 relative z-10 flex items-center justify-center">
                     <span className="text-[10px] sm:text-xs font-heading font-black text-white drop-shadow-md">
                         {name.substring(0,2).toUpperCase()}
                     </span>
                </div>
            </div>
            {!hideLabel && (
                <span className={`text-[9px] sm:text-[10px] font-heading font-black uppercase tracking-widest absolute -bottom-5 sm:-bottom-6 whitespace-nowrap transition-all duration-300 ${active ? 'opacity-100 text-white drop-shadow-md' : 'opacity-0 group-hover:opacity-100 text-white/70'}`}>
                    {name}
                </span>
            )}
        </button>
    );
}

export default function Hero() {
    const { flavorData, setFlavor } = useFlavor();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobileSelectorOpen, setIsMobileSelectorOpen] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax logic for 200vh sticky section
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.8, 0.95], [1, 1, 0]);
    
    // Toggles interaction state dynamically so invisible buttons don't block layout when scrolling
    const pointerEventsControls = useTransform(scrollYProgress, [0, 0.8, 0.95], ["auto", "auto", "none"]);

    // CTA Reveal Logic for Desktop (Hidden at top, appears on scroll)
    const ctaOpacityDesktop = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
    const ctaYDesktop = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

    // Pill collapse logic
    const pillOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const pillY = useTransform(scrollYProgress, [0, 0.05], [0, -20]);
    const pillPointerEvents = useTransform(scrollYProgress, [0, 0.05], ["auto", "none"]);

    // Marquee scrolling
    const marqueeX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const marqueeX2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

    const palettes = {
        mango: {
            bg: "bg-festival-gradient-1",
            marquee1: "text-black",
            marquee2Stroke: "white",
            pillBg: "bg-accent-premium",
            pillDot: "bg-primary-green",
            pillText: "text-primary-white",
            pillBorder: "border-primary-premium",
            head1: "text-accent-premium",
            head2: "text-accent-premium",
            head3: "text-accent-premium",
            btnBg: "bg-accent-premium",
            btnText: "text-primary-white",
            descText: "text-accent-premium",
            descAccent: "text-primary-blue"
        },
        watermelon: {
            bg: "bg-watermelon-gradient",
            marquee1: "text-[#FAFAFA]",
            marquee2Stroke: "#0A0A0A",
            pillBg: "bg-[#E23F72]",
            pillDot: "bg-[#F8DD59]",
            pillText: "text-[#FAFAFA]",
            pillBorder: "border-[#E23F72]",
            head1: "text-[#E23F72]",
            head2: "text-[#0A0A0A]",
            head3: "text-[#FAFAFA]",
            btnBg: "bg-[#E23F72]",
            btnText: "text-[#FAFAFA]",
            descText: "text-white",
            descAccent: "text-[#F8DD59]"
        },
        basil: {
            bg: "bg-basil-gradient",
            marquee1: "text-[#0A0A0A]",
            marquee2Stroke: "#FAFAFA",
            pillBg: "bg-[#FF1A1A]",
            pillDot: "bg-[#FAFAFA]",
            pillText: "text-[#FAFAFA]",
            pillBorder: "border-[#FF1A1A]",
            head1: "text-[#FAFAFA]",
            head2: "text-[#0A0A0A]",
            head3: "text-[#FF1A1A]",
            btnBg: "bg-[#FF1A1A]",
            btnText: "text-[#FAFAFA]",
            descText: "text-[#0A0A0A]",
            descAccent: "text-[#CC0000]"
        }
    };
    const p = palettes[flavorData.id];

    return (
        <section
            ref={containerRef}
            className={`relative w-full h-[200vh] ${p.bg} transition-colors duration-1000`}
        >
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center">

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

                {/* Background Kinetic Typography Marquees Removed */}

                {/* HERO DECORATIONS */}
                <HeroDeco key={flavorData.id} flavorId={flavorData.id} opacity={textOpacity} />

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
                            <motion.div style={{ opacity: pillOpacity, y: pillY, pointerEvents: pillPointerEvents as any }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className={`inline-flex items-center self-center lg:self-start gap-2 px-4 py-1.5 min-[400px]:px-5 min-[400px]:py-2 rounded-full border-2 ${p.pillBorder} ${p.pillBg} shadow-[0_10px_30px_rgba(26,26,26,0.3)] mb-4 min-[400px]:mb-6 md:mb-10 shrink-0 transition-colors duration-1000`}
                                >
                                    <span className="relative flex h-2.5 w-2.5 min-[400px]:h-3 min-[400px]:w-3">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${p.pillDot} opacity-75`}></span>
                                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 min-[400px]:h-3 min-[400px]:w-3 ${p.pillDot}`}></span>
                                    </span>
                                    <span className={`font-heading font-black text-[10px] min-[400px]:text-xs tracking-[0.2em] ${p.pillText} mt-[2px]`}>Now Available</span>
                                </motion.div>
                            </motion.div>

                            {/* Kinetic Headline */}
                            <div className="flex flex-col mb-1 min-[400px]:mb-3 md:mb-8 w-full drop-shadow-2xl mt-1 text-center lg:text-left items-center lg:items-start">
                                {[
                                    { text: "Hydrate", delay: 0.1, color: p.head1 },
                                    { text: "The", delay: 0.2, color: p.head2 },
                                    { text: "Fun.", delay: 0.3, color: p.head3 }
                                ].map((line, i) => (
                                    <div key={i} className="relative flex w-full justify-center lg:justify-start py-1 lg:py-2">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
                                            className={`text-[12vw] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-heading font-black italic uppercase tracking-tighter leading-[0.9] transition-colors duration-1000 ${line.color}`}
                                        >
                                            {line.text}
                                        </motion.h1>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. MIDDLE STACK: The "Can Stage" (Dynamically expands) */}
                        <div className="w-full lg:hidden flex-1 min-h-[40vh] md:min-h-[50vh]" />

                        {/* 3. BOTTOM STACK: Subheading & CTAs (Desktop - Appears on Scroll) */}
                        <motion.div
                            style={{ opacity: ctaOpacityDesktop, y: ctaYDesktop }}
                            className="w-full pointer-events-auto text-left hidden lg:flex flex-col"
                        >
                            {/* Subheading */}
                            <p className={`text-xl font-body font-bold max-w-md leading-relaxed mb-6 drop-shadow-md px-6 lg:px-0 ${p.descText}`}>
                                Not a hydration drink. Not a soda. Not a juice.
                                <span className={`block font-black mt-2 tracking-wide text-[22px] font-heading drop-shadow-lg ${p.descAccent}`}>
                                    Cocofuse is a guilt-free fun drink that happens to hydrate.
                                </span>
                                <span className={`block font-black mt-3 tracking-widest uppercase text-sm drop-shadow-xl opacity-90 border-t border-[currentColor]/30 pt-3 ${p.descText}`}>
                                    Zero Added Sugar! 100% Natural Energy!
                                </span>
                            </p>
                            {/* Redundant Desktop CTAs Removed */}
                        </motion.div>

                        {/* 3. BOTTOM STACK: Subheading & CTAs (Mobile - Static Normal) */}
                        <div className="flex flex-col w-full pointer-events-auto text-center lg:hidden items-center justify-end pb-8">
                            {/* Subheading - Seamless Presentation */}
                            <motion.p
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                                className={`text-sm font-body font-bold max-w-[90vw] leading-relaxed mb-6 drop-shadow-md px-5 ${p.descText}`}
                            >
                                Not a hydration drink. Not a soda. Not a juice.
                                <span className={`block font-black mt-2 tracking-wide text-lg font-heading drop-shadow-lg ${p.descAccent}`}>
                                    Cocofuse is a guilt-free fun drink that happens to hydrate.
                                </span>
                                <span className={`block font-black mt-3 tracking-widest uppercase text-xs drop-shadow-xl opacity-90 border-t border-[currentColor]/30 pt-3 ${p.descText}`}>
                                    Zero Added Sugar! 100% Natural Energy!
                                </span>
                            </motion.p>
                            {/* Redundant Mobile CTAs Removed */}
                        </div>

                    </div>
                </motion.div>

                {/* Vertical Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 z-30 flex flex-col items-center gap-2 min-[400px]:gap-3 mix-blend-difference xl:mix-blend-normal pointer-events-none"
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

            {/* DYNAMIC FIXED LAYER FOR SELECTORS */}
            <motion.div style={{ opacity: textOpacity }} className="fixed inset-0 z-[100] pointer-events-none">
                {/* DESKTOP FLAVOR SELECTOR DOCK (Bottom Center) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    style={{ pointerEvents: pointerEventsControls as any }}
                    className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 mix-blend-difference xl:mix-blend-normal"
                >
                    <span className="text-[10px] sm:text-xs font-heading font-black uppercase tracking-[0.2em] text-white/50">Switch Flavor</span>
                    <div className="flex gap-2 sm:gap-4 bg-black/20 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-white/10 shadow-2xl">
                        {(Object.keys(FLAVORS) as FlavorID[]).map((flavorKey) => (
                            <MiniCoconutIcon 
                                key={flavorKey}
                                name={FLAVORS[flavorKey].name.split(" ")[0]}
                                liquid={FLAVORS[flavorKey].liquid}
                                active={flavorData.id === flavorKey}
                                onClick={() => setFlavor(flavorKey)}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* MOBILE FLAVOR SELECTOR FAB (Bottom Right) */}
                <motion.div style={{ pointerEvents: pointerEventsControls as any }} className="lg:hidden absolute bottom-6 right-6 flex flex-col items-end gap-4">
                    {/* Expanding Options */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            opacity: isMobileSelectorOpen ? 1 : 0, 
                            y: isMobileSelectorOpen ? 0 : 20, 
                            scale: isMobileSelectorOpen ? 1 : 0.8, 
                            pointerEvents: isMobileSelectorOpen ? 'auto' : 'none' 
                        }}
                        className="flex flex-col gap-4 items-end origin-bottom"
                    >
                        {(Object.keys(FLAVORS) as FlavorID[]).map((flavorKey) => (
                            <div key={flavorKey} className="flex relative items-center justify-end w-full group z-[110]">
                                {/* Native Speed Dial Label */}
                                <span className={`absolute right-full mr-4 z-[120] whitespace-nowrap bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-heading font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-300 ${flavorData.id === flavorKey ? 'opacity-100 scale-100 border-white/30' : 'opacity-80 scale-95'}`}>
                                    {FLAVORS[flavorKey].name}
                                </span>
                                {/* The Fruit Icon Container */}
                                <div 
                                    className={`relative z-[110] bg-black/40 backdrop-blur-xl p-3 rounded-full border transition-all duration-300 shadow-2xl flex items-center justify-center cursor-pointer ${flavorData.id === flavorKey ? 'border-white/50 bg-white/10 scale-110' : 'border-white/10 active:scale-95'}`}
                                    onClick={() => {
                                        setFlavor(flavorKey);
                                        setIsMobileSelectorOpen(false);
                                    }}
                                >
                                    <img 
                                        src={FLAVORS[flavorKey].icon} 
                                        alt={FLAVORS[flavorKey].name}
                                        className="w-8 h-8 object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                    
                    {/* The Main Dot / FAB */}
                    <button 
                        onClick={() => setIsMobileSelectorOpen(!isMobileSelectorOpen)}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/30 flex items-center justify-center transition-transform active:scale-95 relative z-50 backdrop-blur-md"
                        style={{ backgroundColor: isMobileSelectorOpen ? '#000000' : flavorData.liquid }}
                    >
                        {isMobileSelectorOpen ? (
                            <span className="text-white font-body text-2xl font-light mb-1">&times;</span>
                        ) : (
                            <>
                                <div className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm shadow-inner" />
                                <span className="absolute -top-2 -right-2 bg-white text-black text-[9px] font-heading font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-xl">Switch</span>
                            </>
                        )}
                    </button>
                </motion.div>
            </motion.div>

        </section >
    );
}
