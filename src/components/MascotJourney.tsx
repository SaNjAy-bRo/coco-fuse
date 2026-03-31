"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useFlavor, FLAVORS } from "@/context/FlavorContext";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function MascotJourney() {
    const containerRef = useRef<HTMLElement>(null);
    const { flavorData } = useFlavor();

    const [vh, setVh] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobileAndHeight = () => {
            setIsMobile(window.innerWidth < 1024);
            setVh(window.innerHeight);
        };
        checkMobileAndHeight();
        window.addEventListener("resize", checkMobileAndHeight);
        return () => window.removeEventListener("resize", checkMobileAndHeight);
    }, []);

    const { scrollY, scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Color mapping for transitions
    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.3, 0.4, 0.65, 0.75, 1],
        [
            "#E8314A", // Watermelon Morning (reddish-pink)
            "#E8314A",
            "#FFD166", // Mango Afternoon
            "#FFD166",
            "#39FF14", // Chili Evening
            "#39FF14"
        ]
    );

    const scene1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
    const scene2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const scene3Opacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

    const sharedTitleClass = "text-5xl md:text-8xl lg:text-9xl font-heading font-black italic uppercase tracking-tighter leading-[0.9] mb-3 md:mb-6";
    const sharedDescClass = "text-xl md:text-3xl lg:text-4xl font-heading font-bold italic uppercase tracking-wider";

    const scenes = [
        {
            title: "FUSE YOUR <br /> MORNINGS.",
            desc: "Coconut Water + Watermelon-Mint — a fresh, hydrating wake-up call to start your day right!",
            flavorInfo: FLAVORS.watermelon,
            align: "items-center md:items-start justify-center px-6 py-4 md:p-24 z-10 text-center md:text-left gap-8 md:gap-0",
            titleClass: "text-[#111111] drop-shadow-sm",
            descClass: "text-white max-w-2xl drop-shadow-md",
            textOrderClass: "order-first lg:order-none flex flex-col items-center md:items-start",
            opacity: scene1Opacity
        },
        {
            title: FLAVORS.mango.story.afternoon.title,
            desc: FLAVORS.mango.story.afternoon.desc,
            flavorInfo: FLAVORS.mango,
            align: "items-center md:items-end justify-center text-center md:text-right px-6 py-4 md:p-24 z-20 gap-8 md:gap-0 lg:max-w-[100vw]",
            titleClass: "text-[#111111] drop-shadow-sm",
            descClass: "text-[#111111] max-w-2xl drop-shadow-md",
            textOrderClass: "order-last lg:order-none flex flex-col items-center md:items-end w-full lg:max-w-[45vw] lg:ml-auto",
            opacity: scene2Opacity
        },
        {
            title: "FUSE YOUR <br /> NIGHTS.",
            desc: FLAVORS.basil.story.evening.desc,
            flavorInfo: FLAVORS.basil,
            align: "items-center md:items-start justify-center text-center md:text-left px-6 py-4 md:p-24 lg:pr-[40vw] z-30 gap-8 md:gap-0",
            titleClass: "text-accent-premium opacity-70",
            descClass: "text-accent-premium max-w-2xl",
            textOrderClass: "order-first lg:order-none flex flex-col items-center md:items-start w-full lg:max-w-[45vw]",
            opacity: scene3Opacity
        }
    ];

    return (
        <section ref={containerRef} className="relative w-full h-[250vh] lg:h-[400vh]">
            <motion.div
                className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center px-6 py-4 md:p-8"
                style={{ backgroundColor: bgColor }}
            >
                {/* Decorative Coconut on the side */}
                <motion.img
                    src="/2.svg"
                    alt="Coconut Decor"
                    className="absolute top-10 right-4 md:top-20 md:right-20 w-32 h-32 md:w-64 md:h-64 z-0 pointer-events-none opacity-80 md:opacity-100 drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    style={{
                        rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
                        y: useTransform(scrollYProgress, [0, 1], [0, 150])
                    }}
                />

                {scenes.map((scene, i) => (
                    <motion.div
                        key={i}
                        className={`absolute inset-0 flex flex-col items-center justify-center px-6 py-4 md:p-24 ${scene.align}`}
                        style={{ opacity: scene.opacity }}
                    >
                        {isMobile && vh > 0 && (
                            <div className={`w-[45vw] h-[90vw] max-w-[200px] max-h-[400px] lg:hidden pointer-events-none flex-shrink-0 ${i === 1 ? 'order-first' : 'order-last'}`}>
                                <Scene 
                                    scrollY={scrollY} 
                                    vh={vh} 
                                    labelPath={scene.flavorInfo.label}
                                    liquidColor={scene.flavorInfo.liquid}
                                    capColor={scene.flavorInfo.cap}
                                />
                            </div>
                        )}
                        <div className={scene.textOrderClass}>
                            <h2
                                className={`${sharedTitleClass} ${scene.titleClass}`}
                                dangerouslySetInnerHTML={{ __html: scene.title }}
                            />
                            <p className={`${sharedDescClass} ${scene.descClass}`}>
                                {scene.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}

            </motion.div>
        </section>
    );
}
