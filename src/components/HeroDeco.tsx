"use client";

import { motion, MotionValue } from "framer-motion";
import { FlavorID } from "@/context/FlavorContext";

interface HeroDecoProps {
    flavorId: FlavorID;
    opacity: MotionValue<number>;
}

export default function HeroDeco({ flavorId, opacity }: HeroDecoProps) {
    // Each item has desktop + mobile configs
    // Mobile positions are designed to feel like a natural 3D splash from the bottle center
    // Varying sizes, rotations, and depths create a convincing splatter effect
    const decoConfig: Record<FlavorID, any[]> = {
        mango: [
            // Fruit pieces — large, prominent, scattered naturally
            { src: "/assets/deco/mango 1.svg",      top: "15%", left: "60%",
              mobileTop: "5%",  mobileLeft: "8%",   mobileW: "w-16", mobileRotate: -18, mobileDelay: 0,   depth: 1.2 },
            { src: "/assets/deco/mango 2.svg",       top: "75%", left: "55%",
              mobileTop: "62%", mobileLeft: "8%",   mobileW: "w-20", mobileRotate: 12,  mobileDelay: 0.15, depth: 1.0 },
            { src: "/assets/deco/mango 3 (1).svg",   top: "45%", left: "85%",
              mobileTop: "25%", mobileLeft: "72%",  mobileW: "w-14", mobileRotate: 22,  mobileDelay: 0.3,  depth: 0.8 },
            // Leaves — smaller, accent, filling in gaps
            { src: "/assets/deco/leaf 1.svg",         top: "10%", left: "82%",
              mobileTop: "3%",  mobileLeft: "65%",  mobileW: "w-12", mobileRotate: -35, mobileDelay: 0.08, depth: 0.7 },
            { src: "/assets/deco/leaf 1 (1).svg",     top: "80%", left: "80%",
              mobileTop: "70%", mobileLeft: "72%",  mobileW: "w-14", mobileRotate: 28,  mobileDelay: 0.22, depth: 0.9 },
            { src: "/assets/deco/leaf 1 (2).svg",     top: "50%", left: "50%",
              mobileTop: "42%", mobileLeft: "10%",  mobileW: "w-11", mobileRotate: -15, mobileDelay: 0.35, depth: 0.6 },
        ],
        watermelon: [
            { src: "/assets/deco/Watermelon 1.svg",  top: "15%", left: "60%",
              mobileTop: "5%",  mobileLeft: "10%",  mobileW: "w-16", mobileRotate: -20, mobileDelay: 0,   depth: 1.2 },
            { src: "/assets/deco/Watermelon 2.svg",  top: "75%", left: "55%",
              mobileTop: "60%", mobileLeft: "6%",   mobileW: "w-20", mobileRotate: 15,  mobileDelay: 0.15, depth: 1.0 },
            { src: "/assets/deco/Watermelon 3.svg",  top: "45%", left: "85%",
              mobileTop: "28%", mobileLeft: "70%",  mobileW: "w-14", mobileRotate: 25,  mobileDelay: 0.3,  depth: 0.8 },
            { src: "/assets/deco/leaf 2 (3).svg",    top: "10%", left: "82%",
              mobileTop: "2%",  mobileLeft: "62%",  mobileW: "w-12", mobileRotate: -30, mobileDelay: 0.08, depth: 0.7 },
            { src: "/assets/deco/leaf 2 (1).svg",    top: "80%", left: "80%",
              mobileTop: "68%", mobileLeft: "74%",  mobileW: "w-14", mobileRotate: 32,  mobileDelay: 0.22, depth: 0.9 },
            { src: "/assets/deco/leaf 2 (2).svg",    top: "50%", left: "50%",
              mobileTop: "44%", mobileLeft: "12%",  mobileW: "w-11", mobileRotate: -12, mobileDelay: 0.35, depth: 0.6 },
        ],
        basil: [
            { src: "/assets/deco/Chili 1.svg",       top: "15%", left: "60%",
              mobileTop: "4%",  mobileLeft: "10%",  mobileW: "w-16", mobileRotate: -22, mobileDelay: 0,   depth: 1.2 },
            { src: "/assets/deco/Chili 2.svg",        top: "75%", left: "55%",
              mobileTop: "62%", mobileLeft: "5%",   mobileW: "w-20", mobileRotate: 18,  mobileDelay: 0.15, depth: 1.0 },
            { src: "/assets/deco/Chili 3.svg",        top: "45%", left: "85%",
              mobileTop: "26%", mobileLeft: "72%",  mobileW: "w-14", mobileRotate: 20,  mobileDelay: 0.3,  depth: 0.8 },
            { src: "/assets/deco/leaf 3.svg",         top: "10%", left: "82%",
              mobileTop: "3%",  mobileLeft: "60%",  mobileW: "w-12", mobileRotate: -28, mobileDelay: 0.08, depth: 0.7 },
            { src: "/assets/deco/leaf 3 (1).svg",     top: "80%", left: "80%",
              mobileTop: "70%", mobileLeft: "70%",  mobileW: "w-14", mobileRotate: 30,  mobileDelay: 0.22, depth: 0.9 },
            { src: "/assets/deco/leaf 3 (2).svg",     top: "50%", left: "50%",
              mobileTop: "40%", mobileLeft: "12%",  mobileW: "w-11", mobileRotate: -10, mobileDelay: 0.35, depth: 0.6 },
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
                    {/* ═══ DESKTOP VERSION ═══ */}
                    <motion.div
                        className="absolute hidden lg:block z-0"
                        initial={{ top: "50%", left: "75%", x: "-50%", y: "-50%", scale: 0, opacity: 0, rotate: -45 }}
                        animate={{ top: item.top, left: item.left, x: "-50%", y: "-50%", scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ 
                            type: "spring", 
                            damping: 14, 
                            stiffness: 100, 
                            mass: 0.8, 
                            delay: item.delay * 1.2 
                        }}
                    >
                        <motion.img
                            src={item.src}
                            alt={`${flavorId} decor`}
                            className={`drop-shadow-2xl ${item.w || 'w-24'}`}
                            whileInView={{ 
                                y: [0, -20, 0], 
                                rotate: [0, 5, -5, 0] 
                            }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{ 
                                duration: 6, 
                                repeat: Infinity, 
                                ease: "easeInOut", 
                                delay: (item.delay || 0) 
                            }}
                        />
                    </motion.div>

                    {/* ═══ MOBILE VERSION ═══ */}
                    {/* Natural 3D splash: items burst from bottle center with varied rotation & depth */}
                    <motion.div
                        className="absolute lg:hidden z-0"
                        initial={{ 
                            top: "45%", 
                            left: "50%", 
                            x: "-50%", 
                            y: "-50%", 
                            scale: 0, 
                            opacity: 0, 
                            rotate: item.mobileRotate * 2 
                        }}
                        animate={{ 
                            top: item.mobileTop, 
                            left: item.mobileLeft, 
                            x: "-50%", 
                            y: "-50%", 
                            scale: item.depth, 
                            opacity: 1, 
                            rotate: item.mobileRotate 
                        }}
                        transition={{ 
                            type: "spring", 
                            damping: 12, 
                            stiffness: 80, 
                            mass: 0.5, 
                            delay: item.mobileDelay + 0.3
                        }}
                    >
                        <motion.img
                            src={item.src}
                            alt={`${flavorId} decor`}
                            className={`${item.mobileW}`}
                            style={{
                                filter: `drop-shadow(0 ${4 * item.depth}px ${8 * item.depth}px rgba(0,0,0,${0.15 + item.depth * 0.1}))`
                            }}
                            whileInView={{ 
                                y: [0, -10 * item.depth, 0], 
                                rotate: [item.mobileRotate, item.mobileRotate + 4, item.mobileRotate - 4, item.mobileRotate] 
                            }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{ 
                                duration: 4 + item.depth * 2, 
                                repeat: Infinity, 
                                ease: "easeInOut", 
                                delay: item.mobileDelay 
                            }}
                        />
                    </motion.div>
                </div>
            ))}
        </motion.div>
    );
}
