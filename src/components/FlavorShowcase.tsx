"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
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
        bg: "bg-[#FFF9EA]",
        accent: "text-accent-mango"
    },
    {
        id: "watermelon",
        name: "Watermelon Cool",
        label: "/assets/watermelon_label_extracted.png",
        liquid: "#ff4d4d",
        cap: "#ff1a1a",
        bg: "bg-[#FFF2F2]",
        accent: "text-[#ff4d4d]"
    },
    {
        id: "basil",
        name: "Basil Chili Kick",
        label: "/assets/chili_label_extracted.png",
        liquid: "#cc0000",
        cap: "#cc0000",
        bg: "bg-[#F2FFF2]",
        accent: "text-[#cc0000]"
    }
];

import { useInView, useScroll, useTransform } from "framer-motion";

function FlavorCard({ flavor }: { flavor: typeof FLAVORS[0] }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`w-[85vw] sm:w-[350px] flex-shrink-0 snap-center h-[520px] md:h-[650px] rounded-[3rem] ${flavor.bg} p-6 md:p-8 flex flex-col items-center justify-between border border-gray-100 shadow-sm relative overflow-hidden group`}
        >
            <div className="text-center z-10">
                <h3 className={`text-2xl md:text-3xl font-heading font-black uppercase tracking-tighter ${flavor.accent}`}>
                    {flavor.name}
                </h3>
                <p className="text-sm font-body font-bold text-gray-500 mt-2 uppercase tracking-widest">
                    Pure & Natural Hydration
                </p>
            </div>

            <div className="w-full h-[280px] md:h-[400px]">
                <Canvas 
                    camera={{ position: [0, 0, 8.5], fov: 45 }} 
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
                        autoRotate
                        autoRotateSpeed={2}
                        minPolarAngle={Math.PI / 2.2} 
                        maxPolarAngle={Math.PI / 2.2}
                    />
                    <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
                    <Environment preset="city" />
                </Canvas>
            </div>

            <Link href={`/products/${flavor.id}`} passHref>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-accent-premium text-white flex-shrink-0 font-heading text-sm md:text-base font-black uppercase tracking-wider py-3 px-8 md:py-4 md:px-10 rounded-full z-10 shadow-xl"
                >
                    View Product
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
    
    // We map 0 to 1 scroll progress to an aggressive horizontal shift perfectly sized for 3 objects taking up 100vw each.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]); 

    return (
        <section ref={targetRef} id="flavours" className="relative h-[300dvh] bg-white">
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-center">
                
                {/* Header Container */}
                <div className="w-full text-center px-6 pt-16 md:pt-24 shrink-0 transition-all duration-300">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter text-accent-premium uppercase max-w-4xl mx-auto"
                    >
                        CHOOSE YOUR <span className="italic text-primary-blue">FUSE</span>
                    </motion.h2>
                    <p className="text-md sm:text-lg md:text-xl font-body text-gray-500 mt-2 md:mt-4 max-w-xl mx-auto">
                        Three distinct ways to fuel your hydration. Zero sugar, 100% natural chill.
                    </p>
                </div>

                {/* Horizontal Sliding Track */}
                <div className="flex-1 w-full flex items-center overflow-hidden relative z-10">
                    <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
                        {FLAVORS.map((flavor, index) => (
                            <div key={index} className="w-[100vw] shrink-0 flex justify-center items-center px-4 md:px-8 h-full pb-8 md:pb-16 pt-8 md:pt-12">
                                <FlavorCard flavor={flavor} />
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
