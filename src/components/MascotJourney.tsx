"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function MascotJourney() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // 3D CAN is handled globally in page.tsx via GlobalCanOverlay.tsx
    // The scenes below purely handle the background and text fading.

    // BACKGROUND COLOR TRANSITIONS
    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.3, 0.4, 0.65, 0.75, 1],
        [
            "#FFD166", // Tropics
            "#FFD166",
            "#FF3366", // Chill
            "#FF3366",
            "#39FF14", // Party
            "#39FF14"
        ]
    );

    // SCENE OPACITIES (Fading text in and out properly with 400vh scroll space)
    const scene1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
    const scene2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const scene3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

    const sharedTitleClass = "text-4xl md:text-8xl lg:text-9xl font-heading font-black uppercase tracking-tighter leading-[0.9] mb-3 md:mb-6";
    const sharedDescClass = "text-base md:text-2xl lg:text-3xl font-body font-bold";

    return (
        <section ref={containerRef} className="relative w-full h-[400vh]">
            <motion.div
                className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-6 py-4 md:p-8"
                style={{ backgroundColor: bgColor }}
            >
                {/* SCENES (Mapped for max minimalism) */}
                {[
                    {
                        title: "Fuse Your <br /> Mornings.",
                        desc: "Watermelon Garden Mint + Coconut Water. A fresh, hydrating wake-up call to start your day right.",
                        align: "items-center md:items-start justify-start pt-[16vh] md:pt-0 md:justify-center px-6 py-4 md:p-24 z-10 text-center md:text-left",
                        titleClass: "text-accent-premium mix-blend-overlay",
                        descClass: "text-accent-premium max-w-xl",
                        opacity: scene1Opacity
                    },
                    {
                        title: "Fuse Your <br /> Afternoons.",
                        desc: "Mango Delight + Coconut Water. Crushing those afternoon sweet cravings when the heat kicks in, without the guilt.",
                        align: "items-center md:items-end justify-end pb-[16vh] md:pb-0 md:justify-center text-center md:text-right px-6 py-4 md:p-24 z-20",
                        titleClass: "text-white drop-shadow-lg",
                        descClass: "text-white max-w-xl drop-shadow-md",
                        opacity: scene2Opacity
                    },
                    {
                        title: "Fuse Your <br /> Evenings.",
                        desc: "Basil Chili + Coconut Water. The perfect mixable companion for a party mood. Fun, vibrant, and ready for the night.",
                        align: "items-center md:items-start justify-start pt-[16vh] md:pt-0 md:justify-center text-center md:text-left px-6 py-4 md:p-24 lg:pr-[40vw] z-30",
                        titleClass: "text-accent-premium mix-blend-overlay",
                        descClass: "text-accent-premium max-w-2xl",
                        opacity: scene3Opacity
                    }
                ].map((scene, i) => (
                    <motion.div
                        key={i}
                        className={`absolute inset-0 flex flex-col items-center justify-center px-6 py-4 md:p-24 ${scene.align}`}
                        style={{ opacity: scene.opacity }}
                    >
                        <h2
                            className={`${sharedTitleClass} ${scene.titleClass}`}
                            dangerouslySetInnerHTML={{ __html: scene.title }}
                        />
                        <p className={`${sharedDescClass} ${scene.descClass}`}>
                            {scene.desc}
                        </p>
                    </motion.div>
                ))}

                {/* Decorative Elements */}
                <motion.div
                    className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                    style={{
                        backgroundImage: "radial-gradient(circle at center, transparent 0%, black 150%)"
                    }}
                />
            </motion.div>
        </section>
    );
}
