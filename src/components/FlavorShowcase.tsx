"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import Bottle from "./Bottle";
import Link from "next/link";

const FLAVORS = [
    {
        id: "mango",
        name: "Mango Refresh",
        label: "/assets/label_full.png",
        liquid: "#f97316",
        cap: "#39FF14",
        bg: "bg-[#FFD166]",          // Vivid Yellow
        accent: "text-[#111111]",
        sub: "Fuse of Coconut and Mango",
        stickers: ["ZERO SUGAR ⚡", "100% NATURAL 🥥"],
        btnBg: "bg-[#f97316]"        // Orange CTA
    },
    {
        id: "watermelon",
        name: "Watermelon Mint Reset",
        label: "/assets/watermelon_label_extracted.png",
        liquid: "#ff4d4d",
        cap: "#ff1a1a",
        bg: "bg-[#FF66B2]",          // Vivid Pink
        accent: "text-[#111111]",
        sub: "Fuse of Coconut, Watermelon and Mint",
        stickers: ["RECHARGE 💦", "CITRULLINE 💪"],
        btnBg: "bg-[#E23F72]"        // Deep Pink CTA
    },
    {
        id: "basil",
        name: "Basil Chili Revive",
        label: "/assets/chili_label_extracted.png",
        liquid: "#cc0000",
        cap: "#cc0000",
        bg: "bg-[#39FF14]",          // Neon Green
        accent: "text-[#111111]",
        sub: "Fuse of Coconut, Basil and Chili",
        stickers: ["SPICY KICK 🔥", "LASER FOCUS 🧠"],
        btnBg: "bg-[#cc0000]"        // Red CTA
    }
];

function FlavorCard({ flavor }: { flavor: typeof FLAVORS[0] }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className={`w-[85vw] sm:w-[380px] flex-shrink-0 snap-center h-[65vh] min-h-[400px] md:h-[600px] max-h-[550px] md:max-h-[600px] rounded-[2.5rem] md:rounded-[3rem] ${flavor.bg} p-4 md:p-8 flex flex-col items-center justify-between border-4 border-[#111111] shadow-[8px_8px_0px_#111111] relative overflow-visible group select-none`}
        >
            {/* Playful Stickers (Neo-Pop Vibe) */}
            <div className="absolute -top-3 md:top-4 left-[-5px] md:left-[-25px] transform -rotate-12 bg-white border-[3px] md:border-4 border-[#111111] shadow-[4px_4px_0px_#111111] px-3 md:px-4 py-1.5 md:py-2 rounded-full z-20 pointer-events-none">
                <span className="font-heading font-black italic text-[9px] md:text-sm uppercase whitespace-nowrap">{flavor.stickers[0]}</span>
            </div>
            <div className="absolute bottom-[20%] right-[-15px] md:right-[-25px] transform rotate-6 bg-white border-4 border-[#111111] shadow-[4px_4px_0px_#111111] px-4 py-2 rounded-full z-20 pointer-events-none">
                <span className="font-heading font-black italic text-[10px] md:text-sm uppercase whitespace-nowrap">{flavor.stickers[1]}</span>
            </div>

            <div className="text-center z-10 shrink-0 mt-8 md:mt-8 w-full">
                <h3 className={`text-3xl min-[400px]:text-4xl md:text-5xl font-heading font-black italic uppercase tracking-tighter leading-[0.9] ${flavor.accent} drop-shadow-sm break-words`}>
                    {flavor.name}
                </h3>
                <div className="mt-3">
                    <p className="inline-block text-xs md:text-sm font-heading font-black italic text-black uppercase tracking-widest bg-white/70 px-4 py-1.5 rounded-full border-2 border-black/30 backdrop-blur-sm">
                        {flavor.sub}
                    </p>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[300px] relative z-10">
                <Canvas 
                    camera={{ position: [0, 0, 7.5], fov: 45 }} 
                    gl={{ 
                        antialias: false, 
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 1.5]}
                >
                    <ambientLight intensity={1.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                    <pointLight position={[-10, -10, -10]} intensity={1} />
                    
                    <Bottle 
                        labelPath={flavor.label} 
                        liquidColor={flavor.liquid} 
                        capColor={flavor.cap}
                    />
                    
                    <OrbitControls 
                        enableZoom={false} 
                        enablePan={false}
                        enableRotate={false}
                        autoRotate={false}
                        minPolarAngle={Math.PI / 2.2} 
                        maxPolarAngle={Math.PI / 2.2}
                        minAzimuthAngle={0}
                        maxAzimuthAngle={0}
                    />
                    <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={12} blur={2.5} far={4.5} />
                    <Environment preset="city" />
                </Canvas>
            </div>

            <Link href={`/products/${flavor.id}`} className="z-20 w-full mt-4 flex justify-center">
                <motion.button 
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-[90%] md:w-[80%] ${flavor.btnBg} text-white font-heading text-xl md:text-2xl font-black italic uppercase tracking-wider py-4 rounded-full border-4 border-[#111111] shadow-[6px_6px_0px_#111111] active:shadow-[0px_0px_0px_#111111] active:translate-y-[6px] active:translate-x-[6px] transition-all`}
                >
                    Grab It!
                </motion.button>
            </Link>
        </motion.div>
    );
}

export default function FlavorShowcase() {
    const targetRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    
    // We map 0 to 1 scroll progress to shift the whole row. 
    // Card width: 85vw * 3 = 255vw. Padding/Gaps: 15vw * 4 = 60vw. Total = 315vw.
    // To show the end of the track (last 100vw of 315vw), translation = -(315 - 100) = -215vw.
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-215vw"]);

    const [isDesktop, setIsDesktop] = React.useState(true);

    React.useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    return (
        <section ref={targetRef} id="flavours" className="relative h-[300dvh] md:h-auto bg-[#F7F7F7]">
            {/* Mobile: Sticky 100dvh wrapper | Desktop: Standard relative block */}
            <div className="sticky top-0 h-[100dvh] md:relative md:top-auto md:h-auto w-full overflow-hidden flex flex-col justify-center py-0 md:py-24">
                
                {/* Header Container */}
                <div className="w-full text-center px-4 md:px-6 pt-12 md:pt-0 shrink-0 transition-all duration-300 mb-2 md:mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        className="text-4xl min-[400px]:text-5xl md:text-8xl lg:text-8xl font-heading font-black italic tracking-tighter text-[#111111] uppercase max-w-4xl mx-auto drop-shadow-sm"
                    >
                        CHOOSE YOUR <span className="text-primary-blue bg-white inline-block px-3 py-0.5 md:px-4 md:py-1 border-2 md:border-4 border-[#111111] shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111] rounded-[1.5rem] md:rounded-3xl transform rotate-2 mx-1 md:mx-2 whitespace-nowrap mt-2 md:mt-0">FUSE</span>
                    </motion.h2>
                    <p className="text-sm min-[400px]:text-base md:text-2xl font-heading font-bold italic text-gray-500 mt-2 md:mt-8 max-w-xl mx-auto uppercase tracking-wide leading-tight">
                        Zero Sugar. 100% Fun. Grab your flavor.
                    </p>
                </div>

                {/* Horizontal Sliding Track (Mobile) / Flex Row (Desktop) */}
                <div className="flex-1 md:flex-none w-full flex items-center md:justify-center relative z-10 overflow-visible md:overflow-visible">
                    <motion.div 
                        style={isDesktop ? undefined : { x }} 
                        className="flex w-max md:w-full md:flex-wrap md:justify-center items-center h-full md:h-auto px-[15vw] md:px-6 gap-[15vw] md:gap-12"
                    >
                        {FLAVORS.map((flavor, index) => (
                            <div key={index} className="shrink-0 flex justify-center items-center h-full md:h-auto pb-4 pt-4 md:pt-12 md:p-8">
                                <FlavorCard flavor={flavor} />
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
