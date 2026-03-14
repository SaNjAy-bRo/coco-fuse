"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useFlavor } from "@/context/FlavorContext";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function GlobalCanOverlay() {
    const { flavorData } = useFlavor();
    const { scrollY } = useScroll();
    const [mounted, setMounted] = useState(false);
    const [vh, setVh] = useState(() => typeof window !== "undefined" ? window.innerHeight : 0);

    useEffect(() => {
        setMounted(true);
        setVh(window.innerHeight);
        const handleResize = () => setVh(window.innerHeight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ══════════════════════════════════════════════
    // SCROLL MAP — Shared between Desktop & Mobile
    // ══════════════════════════════════════════════
    // Page structure: Hero (200vh) → MascotJourney (400vh) → USP → Story → ...
    // Hero ends at scroll = 2vh. MascotJourney scroll range = 2vh to 5vh (sticky internal = 300vh)
    // MascotJourney ends after Hero (2vh) + Mascot (4vh desk / 6vh mobile)
    const isMobile = mounted && window.innerWidth < 1024;
    const heroEnd = vh * 2;
    const mascotHeight = isMobile ? vh * 6 : vh * 4;
    const mascotEnd = heroEnd + mascotHeight;

    // Use relative percentages of mascotHeight to match MascotJourney.tsx EXACTLY
    // S1: [0, 0.25, 0.35] | S2: [0.3, 0.4, 0.6, 0.7] | S3: [0.65, 0.75, 1]
    const s1End = heroEnd + mascotHeight * 0.25; 
    const s2Start = heroEnd + mascotHeight * 0.40;
    const s2End = heroEnd + mascotHeight * 0.60;
    const s3Start = heroEnd + mascotHeight * 0.75;
    const exitStart = heroEnd + mascotHeight * 0.90;

    // 9 keyframes: Hero idle → Hero exit → S1 sit → S1→S2 travel → S2 sit → S2→S3 travel → S3 sit → exit
    const scrollMap = [
        0,              // 0: Page top
        heroEnd * 0.5,  // 1: Mid-Hero
        heroEnd,        // 2: Hero exit / Mascot start
        s1End,          // 3: Scene 1 sit end
        s2Start,        // 4: Scene 2 sit start
        s2End,          // 5: Scene 2 sit end
        s3Start,        // 6: Scene 3 sit start
        exitStart,      // 7: Scene 3 sit end / begin exit
        mascotEnd       // 8: Fully gone
    ];

    // ═══════════════════════════════════════
    // DESKTOP PATH (untouched from web view)
    // ═══════════════════════════════════════
    const scaleDesktop = useTransform(scrollY, scrollMap,
        [0.80, 0.80, 0.80, 0.80, 0.80, 0.80, 0.80, 0.80, 0.80]
    );
    const xDesktop = useTransform(scrollY, scrollMap, [
        "23.5vw", // Hero idle
        "23.5vw", // Mid-Hero
        "23.5vw", // Hero exit
        "15vw",   // S1 sit
        "-30vw",  // S2 sit (left side)
        "-30vw",  // S2 end
        "23.5vw", // S3 sit (right side)
        "23.5vw", // S3 end
        "23.5vw"  // Exit
    ]);
    const yDesktop = useTransform(scrollY, scrollMap, [
        "15vh", "15vh", "15vh",      // Hero - Lowered
        "15vh",                      // S1
        "15vh", "15vh",              // S2 - Now matching S1 exactly for horizontal glide
        "15vh", "15vh",              // S3
        "100vh"                      // Exit
    ]);
    const opacityDesktop = useTransform(scrollY, [0, exitStart, mascotEnd], [1, 1, 0]);

    // ═══════════════════════════════════════════════════════════════════
    // MOBILE PATH — Premium Vertical Flow
    // Hero: perfectly centered in the new "Stage".
    // Mascot Journey: Top/Bottom Hemisphere Exchange to avoid text.
    // ═══════════════════════════════════════════════════════════════════
    const scaleMobile = useTransform(scrollY, scrollMap,
        [0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85]
    );
    const xMobile = useTransform(scrollY, scrollMap, [
        "0vw",    // Hero — centered
        "0vw",    // Mid-Hero
        "0vw",    // Hero exit
        "0vw",    // S1 — Tropics
        "0vw",    // S2 — Chill Zone
        "0vw",    // S2 end
        "0vw",    // S3 — Party
        "0vw",    // S3 end
        "0vw"     // Exit
    ]);
    const yMobile = useTransform(scrollY, scrollMap, [
        "15vh", "15vh", "15vh",     // Hero - Pushed down to clear the headline
        "25vh",                     // S1
        "-10vh", "-10vh",           // S2
        "25vh", "25vh",             // S3
        "-120vh"                    // Exit
    ]);
    const opacityMobile = useTransform(scrollY, [0, exitStart, mascotEnd], [1, 1, 0]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            {/* Desktop */}
            {mounted && window.innerWidth >= 1024 && (
                <motion.div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
                    style={{ x: xDesktop, y: yDesktop, scale: scaleDesktop, opacity: opacityDesktop }}
                >
                    <div className="w-[34vw] h-[80vw]">
                        <Scene 
                            scrollY={scrollY} 
                            vh={vh} 
                            labelPath={flavorData.label}
                            liquidColor={flavorData.liquid}
                            capColor={flavorData.cap}
                        />
                    </div>
                </motion.div>
            )}

            {/* MOBILE RENDER */}
            {mounted && window.innerWidth < 1024 && (
                <motion.div
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
                    style={{ x: xMobile, y: yMobile, scale: scaleMobile, opacity: opacityMobile }}
                >
                    <div className="w-[60vw] h-[140vw] max-w-[320px] max-h-[750px] flex items-center justify-center">
                        <Scene 
                            scrollY={scrollY} 
                            vh={vh} 
                            labelPath={flavorData.label}
                            liquidColor={flavorData.liquid}
                            capColor={flavorData.cap}
                        />
                    </div>
                </motion.div>
            )}
        </div>
    );
}
