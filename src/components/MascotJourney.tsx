"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useFlavor } from "@/context/FlavorContext";

export default function MascotJourney() {
    const containerRef = useRef<HTMLElement>(null);
    const { flavorData } = useFlavor();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Color mapping for transitions
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

    const scene1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
    const scene2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const scene3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

    const sharedTitleClass = "text-4xl md:text-8xl lg:text-9xl font-heading font-black uppercase tracking-tighter leading-[0.9] mb-3 md:mb-6";
    const sharedDescClass = "text-base md:text-2xl lg:text-3xl font-body font-bold";

    const scenes = [
        {
            ...flavorData.story.morning,
            align: "items-center md:items-start justify-start pt-[16vh] md:pt-0 md:justify-center px-6 py-4 md:p-24 z-10 text-center md:text-left",
            titleClass: "text-accent-premium mix-blend-overlay",
            descClass: "text-accent-premium max-w-xl",
            opacity: scene1Opacity
        },
        {
            ...flavorData.story.afternoon,
            align: "items-center md:items-end justify-end pb-[16vh] md:pb-0 md:justify-center text-center md:text-right px-6 py-4 md:p-24 z-20",
            titleClass: "text-white drop-shadow-lg",
            descClass: "text-white max-w-xl drop-shadow-md",
            opacity: scene2Opacity
        },
        {
            ...flavorData.story.evening,
            align: "items-center md:items-start justify-start pt-[16vh] md:pt-0 md:justify-center text-center md:text-left px-6 py-4 md:p-24 lg:pr-[40vw] z-30",
            titleClass: "text-accent-premium mix-blend-overlay",
            descClass: "text-accent-premium max-w-2xl",
            opacity: scene3Opacity
        }
    ];

    return (
        <section ref={containerRef} className="relative w-full h-[600vh] lg:h-[400vh]">
            <motion.div
                className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center px-6 py-4 md:p-8"
                style={{ backgroundColor: bgColor }}
            >
                {scenes.map((scene, i) => (
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
