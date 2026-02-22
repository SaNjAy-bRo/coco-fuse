"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Scene from "./Scene";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pb-20">
            {/* Background Parallax */}
            <motion.div
                style={{ y: yBackground }}
                className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-orange/20 via-transparent to-transparent" />
            </motion.div>

            <div className="container relative z-10 mx-auto px-6 mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* 3D Visual Presentation Container */}
                <div className="relative h-[700px] w-full flex justify-center order-2 lg:order-1 perspective-1000 z-20">
                    {/* Subtle glow behind the 3D can */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-orange/30 blur-[120px] rounded-full z-0 pointer-events-none" />

                    {/* The 3D Canvas */}
                    <div className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing">
                        <Scene />
                    </div>
                </div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    style={{ y: yText, opacity: opacityText }}
                    className="text-left order-1 lg:order-2"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-brand-green/30 bg-brand-green/10 text-brand-green font-bold text-sm tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                        100% Vegan & Cruelty Free
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-brand-green via-brand-yellow to-brand-orange uppercase drop-shadow-2xl mb-4 py-2">
                        Coco<br />Fuse<span className="text-white">.</span>
                    </h1>

                    <p className="text-xl md:text-2xl font-bold tracking-wide text-brand-yellow mb-8 drop-shadow-md">
                        COCONUT WATER – FRUIT HYDRATION
                    </p>

                    <h2 className="text-4xl md:text-5xl font-black text-brand-orange uppercase mb-6 drop-shadow-xl">
                        Mango Refresh
                    </h2>

                    <p className="max-w-xl text-lg md:text-xl text-gray-300 font-medium leading-relaxed mb-10">
                        For the hustlers, the creators, the early risers. CocoFuse fuels your grind with clean, coconut-powered hydration.
                        <br /><br />
                        <span className="text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Stay fueled. Stay fierce.</span>
                    </p>

                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="px-6 py-4 bg-black/40 backdrop-blur-md border border-brand-orange/40 rounded-2xl flex items-center gap-3 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                            <span className="text-4xl font-black text-brand-orange drop-shadow-md">0%</span>
                            <span className="text-sm font-bold text-gray-300 uppercase leading-tight">Added<br />Sugar</span>
                        </div>
                        <div className="px-6 py-4 bg-black/40 backdrop-blur-md border border-brand-yellow/40 rounded-2xl flex items-center gap-3 shadow-[0_0_20px_rgba(250,204,21,0.15)]">
                            <span className="text-4xl font-black text-brand-yellow drop-shadow-md">0%</span>
                            <span className="text-sm font-bold text-gray-300 uppercase leading-tight">Artificial<br />Colors</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
