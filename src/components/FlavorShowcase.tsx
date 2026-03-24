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
            className={`w-[85vw] sm:w-[350px] flex-shrink-0 snap-center h-full max-h-[580px] rounded-[3rem] ${flavor.bg} p-5 md:p-8 flex flex-col items-center justify-between border border-gray-100 shadow-sm relative overflow-hidden group`}
        >
            <div className="text-center z-10 shrink-0">
                <h3 className={`text-2xl md:text-3xl font-heading font-black uppercase tracking-tighter ${flavor.accent}`}>
                    {flavor.name}
                </h3>
                <p className="text-sm font-body font-bold text-gray-500 mt-1 uppercase tracking-widest">
                    Pure &amp; Natural Hydration
                </p>
            </div>

            <div className="flex-1 w-full min-h-0">
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
    
    // We map 0 to 1 scroll progress to shift the whole row. 
    // Framer motion can't smoothly interpolate 'calc()', so we use explicit 'vw' units.
    // Track width is approx 282vw (-100vw viewport = -182vw translation needed)
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-182vw"]);

    const [isDesktop, setIsDesktop] = React.useState(true);

    React.useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    return (
        <section ref={targetRef} id="flavours" className="relative h-[300dvh] md:h-auto bg-white">
            {/* Mobile: Sticky 100dvh wrapper | Desktop: Standard relative block */}
            <div className="sticky top-0 h-[100dvh] md:relative md:top-auto md:h-auto w-full overflow-hidden flex flex-col justify-center py-0 md:py-24">
                
                {/* Header Container */}
                <div className="w-full text-center px-6 pt-16 md:pt-0 shrink-0 transition-all duration-300 mb-0 md:mb-16">
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

                {/* Horizontal Sliding Track (Mobile) / Flex Row (Desktop) */}
                <div className="flex-1 md:flex-none w-full flex items-center md:justify-center relative z-10 overflow-hidden md:overflow-visible">
                    <motion.div 
                        style={isDesktop ? undefined : { x }} 
                        className="flex w-max md:w-full md:flex-wrap md:justify-center items-center h-full md:h-auto px-[7.5vw] md:px-6 gap-6 md:gap-8 lg:gap-12"
                    >
                        {FLAVORS.map((flavor, index) => (
                            <div key={index} className="shrink-0 flex justify-center items-center h-full md:h-auto pb-8 pt-8 md:p-0">
                                <FlavorCard flavor={flavor} />
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
