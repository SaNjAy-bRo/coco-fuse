"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StorySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yImg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacityText = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
    const yText = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);

    return (
        <section id="story" ref={containerRef} className="relative w-full h-[150vh] bg-accent-premium text-primary-white overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Parallax Mountain Image / Visuals */}
                <motion.div
                    style={{ y: yImg }}
                    className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity"
                >
                    <div className="w-full h-full bg-gradient-to-t from-accent-premium via-accent-premium/50 to-transparent absolute inset-0 z-10" />
                    {/* Placeholder for Mountain Trek visual. Just using a stylized gradient for now until actual asset is provided, 
                        or we can use a structural colored block that implies the mountain */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                </motion.div>

                {/* Content */}
                <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-center items-center text-center">
                    <motion.div
                        style={{ opacity: opacityText, y: yText }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-8 leading-tight">
                            Born on a Mountain. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-mango to-accent-watermelon">
                                Made for Real Life.
                            </span>
                        </h2>
                        <div className="w-24 h-1 bg-primary-green mx-auto mb-10" />
                        <p className="text-xl md:text-3xl font-body font-light text-gray-300 leading-relaxed md:leading-relaxed">
                            The idea sparked at 10,000 feet. Founder Miket was trekking when he realized every hydration drink available was either packed with sugar or tasted like a science experiment.
                        </p>
                        <p className="text-xl md:text-3xl font-body font-light text-gray-300 leading-relaxed md:leading-relaxed mt-6">
                            We didn't just want a better drink; <span className="font-semibold text-primary-white">we wanted a complete rebellion against boring hydration.</span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
