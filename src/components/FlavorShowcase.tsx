"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import Bottle from "./Bottle";

const FLAVORS = [
    {
        name: "Mango Refresh",
        label: "/assets/label_full.png",
        liquid: "#f97316",
        cap: "#39FF14",
        bg: "bg-[#FFF9EA]",
        accent: "text-accent-mango"
    },
    {
        name: "Watermelon Cool",
        label: "/assets/watermelon_label_extracted.png",
        liquid: "#ff4d4d",
        cap: "#ff1a1a",
        bg: "bg-[#FFF2F2]",
        accent: "text-[#ff4d4d]"
    },
    {
        name: "Basil Chili Kick",
        label: "/assets/chili_label_extracted.png",
        liquid: "#cc0000",
        cap: "#cc0000",
        bg: "bg-[#F2FFF2]",
        accent: "text-[#cc0000]"
    }
];

import { useInView } from "framer-motion";

function FlavorCard({ flavor }: { flavor: typeof FLAVORS[0] }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex-1 min-w-[300px] sm:min-w-[350px] h-[550px] md:h-[650px] rounded-[2.5rem] md:rounded-[3rem] ${flavor.bg} p-6 md:p-8 flex flex-col items-center justify-between border border-gray-100 shadow-sm relative overflow-hidden group`}
        >
            <div className="text-center z-10">
                <h3 className={`text-3xl font-heading font-black uppercase tracking-tighter ${flavor.accent}`}>
                    {flavor.name}
                </h3>
                <p className="text-sm font-body font-bold text-gray-500 mt-2 uppercase tracking-widest">
                    Pure & Natural Hydration
                </p>
            </div>

            <div className="w-full h-[300px] md:h-[400px] cursor-grab active:cursor-grabbing">
                <Canvas 
                    camera={{ position: [0, 0, 8.5], fov: 45 }} 
                    gl={{ 
                        antialias: false, 
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 2]}
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
                        minPolarAngle={Math.PI / 3} 
                        maxPolarAngle={Math.PI / 1.5}
                        autoRotate
                        autoRotateSpeed={2}
                    />
                    <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
                    <Environment preset="city" />
                </Canvas>
            </div>

            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent-premium text-white font-heading font-black uppercase tracking-wider py-4 px-10 rounded-full z-10 shadow-xl"
            >
                Shop Now
            </motion.button>
        </motion.div>
    );
}

export default function FlavorShowcase() {
    return (
        <section id="flavours" className="py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl font-heading font-black tracking-tighter text-accent-premium uppercase"
                    >
                        CHOOSE YOUR <span className="italic text-primary-blue">FUSE</span>
                    </motion.h2>
                    <p className="text-xl font-body text-gray-500 mt-4 max-w-xl mx-auto">
                        Three distinct ways to fuel your hydration. Zero sugar, 100% natural chill.
                    </p>
                </div>

                <div className="flex flex-wrap gap-8 justify-center">
                    {FLAVORS.map((flavor, index) => (
                        <FlavorCard key={index} flavor={flavor} />
                    ))}
                </div>
            </div>
        </section>
    );
}
