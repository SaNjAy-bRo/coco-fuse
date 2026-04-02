"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useFlavor } from "@/context/FlavorContext";

export default function TransitionBanner() {
    const { flavorData } = useFlavor();
    const containerRef = useRef<HTMLElement>(null);

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yTextDesktop = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const yTextMobile = useTransform(scrollYProgress, [0, 1], [20, -20]);
    const yText = isMobile ? yTextMobile : yTextDesktop;
    const opacityText = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

    return (
        <section 
            ref={containerRef} 
            className="w-full h-[60vh] md:min-h-screen flex items-center justify-center md:justify-start bg-[#FFD166] overflow-hidden relative z-10"
        >
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md" />
            
            <motion.div 
                style={{ y: yText, opacity: opacityText, willChange: "transform, opacity" }}
                className="relative z-20 flex flex-col items-center md:items-start justify-center text-center md:text-left px-4 md:pl-16 lg:pl-[12vw] xl:pl-[15vw] max-w-full md:max-w-[90vw] lg:max-w-[65vw]"
            >
                <h2 className="text-[2.75rem] sm:text-5xl md:text-8xl lg:text-[7.5rem] font-heading font-black italic text-[#111111] tracking-tighter uppercase leading-[0.85]">
                    FUSE YOUR DAY WITH <span className="block mt-2 drop-shadow-md pr-0 md:pr-4"><span className="font-wedges tracking-normal text-[#39FF14]">COCO</span><span className="font-wedges tracking-normal text-[#3AB6FD]">FUSE.</span></span>
                </h2>
                <div className="w-20 md:w-32 h-2 md:h-3 bg-[#39FF14] mt-6 md:mt-8 rounded-full shadow-lg" />
            </motion.div>

            {/* The Rolling Coconut */}
            <motion.img 
                src="/2.svg" 
                alt="Rolling Coconut" 
                className="absolute bottom-4 left-0 w-24 h-24 md:w-40 md:h-40 z-30 drop-shadow-xl pointer-events-none"
                animate={{ 
                    x: ["-20vw", "120vw"],
                    rotate: [0, 720] 
                }}
                transition={{ 
                    duration: 12, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
            />
        </section>
    );
}
