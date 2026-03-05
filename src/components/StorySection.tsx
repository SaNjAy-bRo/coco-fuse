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
        <section id="story" ref={containerRef} className="relative w-full h-[120vh] md:h-[150vh] bg-accent-premium text-primary-white overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Parallax Mountain Image / Visuals */}
                <motion.div
                    style={{ y: yImg }}
                    className="absolute inset-0 z-0 opacity-50 mix-blend-luminosity"
                >
                    <div className="w-full h-full bg-gradient-to-t from-accent-premium via-accent-premium/50 to-transparent absolute inset-0 z-10" />
                    {/* The original Mountain Trek visual with a very subtle juice tint overlaid */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-mango/10 to-accent-watermelon/10 mix-blend-overlay pointer-events-none" />
                </motion.div>

                {/* Content */}
                <div className="container mx-auto px-6 relative z-20 h-full flex flex-col justify-center items-center text-center">
                    <motion.div
                        style={{ opacity: opacityText, y: yText }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-7xl font-heading font-black tracking-tighter mb-4 md:mb-8 leading-tight">
                            Born on a Mountain. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-mango to-accent-watermelon">
                                Made for Real Life.
                            </span>
                        </h2>
                        <div className="w-16 md:w-24 h-1 bg-primary-green mx-auto mb-6 md:mb-10" />
                        <p className="text-base md:text-xl lg:text-3xl font-body font-light text-gray-300 leading-relaxed md:leading-relaxed">
                            It didn't start in a boardroom. It started on a mountain. On a long trek, Miket realized everything on the shelf was either sugary, artificial, boring — or all three.
                        </p>
                        <p className="text-base md:text-xl lg:text-3xl font-body font-light text-gray-300 leading-relaxed md:leading-relaxed mt-4 md:mt-6">
                            Why does hydration have to be dull? <span className="font-semibold text-primary-white">That question became an idea. And they created a guilt-free fun drink that hydrates without slowing you down.</span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
