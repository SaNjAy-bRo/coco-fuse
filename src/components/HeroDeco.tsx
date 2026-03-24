"use client";

import { motion, MotionValue } from "framer-motion";
import { FlavorID } from "@/context/FlavorContext";

interface HeroDecoProps {
    flavorId: FlavorID;
    opacity: MotionValue<number>;
}

export default function HeroDeco({ flavorId, opacity }: HeroDecoProps) {
    const decoConfig: Record<FlavorID, any[]> = {
        mango: [
            { src: "/assets/deco/mango 1.svg", top: "15%", left: "60%", mobileTop: "8%", mobileLeft: "5%", w: "w-16 md:w-32 hover:scale-110 transition-transform", delay: 0 },
            { src: "/assets/deco/mango 2.svg", top: "75%", left: "55%", mobileTop: "65%", mobileLeft: "10%", w: "w-20 md:w-40 hover:scale-110 transition-transform", delay: 0.2 },
            { src: "/assets/deco/mango 3 (1).svg", top: "45%", left: "85%", mobileTop: "38%", mobileLeft: "78%", w: "w-14 md:w-28 hover:scale-110 transition-transform", delay: 0.4 },
            { src: "/assets/deco/leaf 1.svg", top: "10%", left: "82%", mobileTop: "5%", mobileLeft: "75%", w: "w-12 md:w-24 hover:scale-110 transition-transform", delay: 0.1 },
            { src: "/assets/deco/leaf 1 (1).svg", top: "80%", left: "80%", mobileTop: "75%", mobileLeft: "75%", w: "w-16 md:w-32 hover:scale-110 transition-transform", delay: 0.3 },
            { src: "/assets/deco/leaf 1 (2).svg", top: "50%", left: "50%", mobileTop: "40%", mobileLeft: "8%", w: "w-10 md:w-20 hover:scale-110 transition-transform", delay: 0.5 },
        ],
        watermelon: [
            { src: "/assets/deco/Watermelon 1.svg", top: "15%", left: "60%", mobileTop: "8%", mobileLeft: "5%", w: "w-16 md:w-32 hover:scale-110 transition-transform", delay: 0 },
            { src: "/assets/deco/Watermelon 2.svg", top: "75%", left: "55%", mobileTop: "65%", mobileLeft: "10%", w: "w-20 md:w-40 hover:scale-110 transition-transform", delay: 0.2 },
            { src: "/assets/deco/Watermelon 3.svg", top: "45%", left: "85%", mobileTop: "38%", mobileLeft: "78%", w: "w-14 md:w-28 hover:scale-110 transition-transform", delay: 0.4 },
            { src: "/assets/deco/leaf 2.svg", top: "10%", left: "82%", mobileTop: "5%", mobileLeft: "75%", w: "w-12 md:w-24 hover:scale-110 transition-transform", delay: 0.1 },
            { src: "/assets/deco/leaf 2 (1).svg", top: "80%", left: "80%", mobileTop: "75%", mobileLeft: "75%", w: "w-16 md:w-32 hover:scale-110 transition-transform", delay: 0.3 },
            { src: "/assets/deco/leaf 2 (2).svg", top: "50%", left: "50%", mobileTop: "40%", mobileLeft: "8%", w: "w-10 md:w-20 hover:scale-110 transition-transform", delay: 0.5 },
        ],
        basil: [
            { src: "/assets/deco/Chili 1.svg", top: "15%", left: "60%", mobileTop: "8%", mobileLeft: "5%", w: "w-16 md:w-32 hover:scale-110 transition-transform", delay: 0 },
            { src: "/assets/deco/Chili 2.svg", top: "75%", left: "55%", mobileTop: "65%", mobileLeft: "10%", w: "w-20 md:w-40 hover:scale-110 transition-transform", delay: 0.2 },
            { src: "/assets/deco/Chili 3.svg", top: "45%", left: "85%", mobileTop: "38%", mobileLeft: "78%", w: "w-14 md:w-28 hover:scale-110 transition-transform", delay: 0.4 },
            { src: "/assets/deco/leaf 3.svg", top: "10%", left: "82%", mobileTop: "5%", mobileLeft: "75%", w: "w-12 md:w-24 hover:scale-110 transition-transform", delay: 0.1 },
            { src: "/assets/deco/leaf 3 (1).svg", top: "80%", left: "80%", mobileTop: "75%", mobileLeft: "75%", w: "w-16 md:w-32 hover:scale-110 transition-transform", delay: 0.3 },
            { src: "/assets/deco/leaf 3 (2).svg", top: "50%", left: "50%", mobileTop: "40%", mobileLeft: "8%", w: "w-10 md:w-20 hover:scale-110 transition-transform", delay: 0.5 },
        ]
    };

    const assets = decoConfig[flavorId] || [];

    return (
        <motion.div 
            style={{ opacity }} 
            className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
        >
            {assets.map((item, idx) => (
                <div key={`${flavorId}-${idx}`}>
                    {/* Desktop Version */}
                    <motion.img
                        src={item.src}
                        alt={`${flavorId} decor`}
                        className={`absolute hidden lg:block drop-shadow-2xl ${item.w}`}
                        style={{ top: item.top, left: item.left }}
                        animate={{ 
                            y: [0, -20, 0], 
                            rotate: [0, 5, -5, 0] 
                        }}
                        transition={{ 
                            duration: 6, 
                            repeat: Infinity, 
                            ease: "easeInOut", 
                            delay: item.delay 
                        }}
                    />
                    {/* Mobile/Tablet Version */}
                    <motion.img
                        src={item.src}
                        alt={`${flavorId} decor`}
                        className={`absolute lg:hidden drop-shadow-xl ${item.w}`}
                        style={{ top: item.mobileTop, left: item.mobileLeft }}
                        animate={{ 
                            y: [0, -15, 0], 
                            rotate: [0, 5, -5, 0] 
                        }}
                        transition={{ 
                            duration: 5, 
                            repeat: Infinity, 
                            ease: "easeInOut", 
                            delay: item.delay 
                        }}
                    />
                </div>
            ))}
        </motion.div>
    );
}
