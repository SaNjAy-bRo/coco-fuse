"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useFlavor } from "@/context/FlavorContext";

export default function TransitionBanner() {
    const { flavorData } = useFlavor();
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacityText = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

    return (
        <section 
            ref={containerRef} 
            className="w-full min-h-screen flex items-center justify-center md:justify-start bg-[#FFD166] overflow-hidden relative z-10"
        >
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md" />
            
            <motion.div 
                style={{ y: yText, opacity: opacityText }}
                className="relative z-20 flex flex-col items-center md:items-start justify-center text-center md:text-left px-4 md:pl-16 lg:pl-[12vw] xl:pl-[15vw] max-w-full md:max-w-[90vw] lg:max-w-[65vw]"
            >
                <h2 className="text-[3.25rem] sm:text-6xl md:text-8xl lg:text-[7.5rem] font-heading font-black italic text-accent-premium tracking-tighter uppercase leading-[0.85]">
                    FUSE YOUR DAY WITH <span className="block mt-2 drop-shadow-md pr-0 md:pr-4"><span className="text-primary-green">COCO</span><span className="text-primary-blue">FUSE.</span></span>
                </h2>
                <div className="w-24 md:w-32 h-2 md:h-3 bg-primary-green mt-6 md:mt-8 rounded-full shadow-lg" />
            </motion.div>
        </section>
    );
}
