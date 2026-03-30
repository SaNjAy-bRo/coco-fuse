"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useFlavor, FLAVORS } from "@/context/FlavorContext";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function GlobalCanOverlay() {
    const { flavorData } = useFlavor();
    const { scrollY } = useScroll();
    const [mounted, setMounted] = useState(false);
    const [vh, setVh] = useState(() => typeof window !== "undefined" ? window.innerHeight : 0);
    const [renderFlavor, setRenderFlavor] = useState(flavorData);

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
    const transitionHeight = vh * 1.0; 
    const mascotStart = heroEnd + transitionHeight;
    const mascotHeight = vh * 4;

    // Force-sync Hero clicks instantly IF the user is still at the top of the page
    useEffect(() => {
        if (mounted && scrollY.get() < mascotStart) {
            setRenderFlavor(flavorData);
        }
    }, [flavorData, mascotStart, mounted, scrollY]);

    // Use relative percentages of exactly matching the MascotJourney ScrollYProgress (which spans `height - 100vh`)
    const progressDist = mascotHeight - vh;
    
    const s1End = mascotStart + progressDist * 0.25; 
    const s2Start = mascotStart + progressDist * 0.40;
    const s2End = mascotStart + progressDist * 0.60;
    const s3Start = mascotStart + progressDist * 0.75;
    
    // The visual background remains statically pinned until exactly 100vh before the physical block ends
    const unpinStart = mascotStart + progressDist; 
    const mascotEnd = mascotStart + mascotHeight;

    const transitionMid = heroEnd + (transitionHeight / 2);

    // 11 Keyframes specifically designed to execute sequential physical timeline hooks
    const scrollMap = [
        0,              // 0: Page top
        heroEnd * 0.5,  // 1: Mid-Hero
        heroEnd,        // 2: Hero exit / Transition start
        transitionMid,  // 3: Exact middle of Transition
        mascotStart,    // 4: Transition end / Mascot start
        s1End,          // 5: Scene 1 sit end
        s2Start,        // 6: Scene 2 sit start
        s2End,          // 7: Scene 2 sit end
        s3Start,        // 8: Scene 3 sit start
        unpinStart,     // 9: Background formally unpins
        mascotEnd       // 10: Natural 1:1 scroll upwards complete
    ];

    // ═══════════════════════════════════════
    // DESKTOP PATH (untouched from web view)
    // ═══════════════════════════════════════
    const scaleDesktop = useTransform(scrollY, scrollMap,
        [0.80, 0.80, 0.80, 0.80, 0.80, 0.80, 0.80, 0.80, 0.80, 0.80, 0.80]
    );
    const xDesktop = useTransform(scrollY, scrollMap, [
        "20.5vw", // Hero idle
        "20.5vw", // Mid-Hero
        "20.5vw", // Hero exit
        "20.5vw", // Transition mid
        "20.5vw", // Mascot Start
        "20.5vw", // S1 sit
        "-30vw",  // S2 sit 
        "-30vw",  // S2 end
        "20.5vw", // S3 sit 
        "20.5vw", // Maintians position
        "20.5vw"  // Locked X during out
    ]);
    const yDesktop = useTransform(scrollY, scrollMap, [
        "15vh", "15vh", "15vh",      // Hero
        "15vh",                      // Transition Mid
        "15vh",                      // Mascot start
        "15vh",                      // S1
        "15vh", "15vh",              // S2
        "15vh",                      // S3 sit start
        "15vh",                      // Mascot unpins
        "-85vh"                      // Scrolls out (15vh - 100vh)
    ]);
    const opacityDesktop = useTransform(scrollY, [0, unpinStart, mascotEnd], [1, 1, 1]);

    // ═══════════════════════════════════════════════════════════════════
    // MOBILE PATH — Premium Vertical Flow
    // Hero: centered.
    // Transition: Cinematic Shrink-Dodge (Bottle scales down 50% and drops to bottom border to clear massive text)
    // Mascot Journey: Aggressive Hemisphere Jumping (Top vs Bottom) to totally eliminate text overlap.
    // ═══════════════════════════════════════════════════════════════════
    const scaleMobile = useTransform(scrollY, scrollMap, [
        0.80, 0.80, 0.80, // Hero
        0.45,             // Transition MID: Maximum shrink depth
        0.95,             // Mascot Start: Fully restored scale immediately at scene entry
        0.95,             // S1
        0.95, 0.95,       // S2
        0.95,             // S3
        0.95,             // Mascot unpin
        0.95              // Exit
    ]);
    const xMobile = useTransform(scrollY, scrollMap, [
        "0vw", "0vw", "0vw",        // Hero
        "0vw",                      // Transition Mid
        "0vw",                      // Mascot Start
        "0vw",                      // S1
        "0vw", "0vw",               // S2
        "0vw",                      // S3
        "0vw",                      // Unpin
        "0vw"                       // Exit
    ]);
    const yMobile = useTransform(scrollY, scrollMap, [
        "10vh", "10vh", "10vh",     // Hero
        "30vh",                     // Transition MID (Deepest dive to completely clear massive text)
        "28vh",                     // Mascot Start (Gracefully floats up slightly to exactly S1 baseline)
        "28vh",                     // S1
        "-22vh", "-22vh",           // S2
        "28vh",                     // S3
        "28vh",                     // Mascot unpins
        "-72vh"                     // Natural scroll: (28vh - 100vh)
    ]);
    const opacityMobile = useTransform(scrollY, [0, unpinStart, mascotEnd], [1, 1, 1]);

    // ═══════════════════════════════════════════════════════════════════
    // TEXTURE HOT-SWAP LOGIC FOR MASCOT SCENES
    // ═══════════════════════════════════════════════════════════════════
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!mounted || vh === 0) return;

        // Calculate explicit midpoints halfway through the bottle's horizontal travel
        const s1ToS2Midpoint = (s1End + s2Start) / 2;
        const s2ToS3Midpoint = (s2End + s3Start) / 2;
        
        if (latest < mascotStart) {
            // Above MascotJourney -> Respect user's active context flavor explicitly
            if (renderFlavor.id !== flavorData.id) setRenderFlavor(flavorData);
        } else if (latest < s1ToS2Midpoint) {
            // S1: Morning -> Watermelon (Swaps halfway traveling out of S1)
            if (renderFlavor.id !== "watermelon") setRenderFlavor(FLAVORS.watermelon);
        } else if (latest < s2ToS3Midpoint) {
            // S2: Afternoon -> Mango (Swaps halfway traveling out of S2)
            if (renderFlavor.id !== "mango") setRenderFlavor(FLAVORS.mango);
        } else {
            // S3: Evening -> Basil
            if (renderFlavor.id !== "basil") setRenderFlavor(FLAVORS.basil);
        }
    });

    if (!mounted) return null;

    return (
        <div className="hidden lg:block fixed inset-0 z-50 pointer-events-none">
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
                            labelPath={renderFlavor.label}
                            liquidColor={renderFlavor.liquid}
                            capColor={renderFlavor.cap}
                        />
                    </div>
                </motion.div>
            )}

        </div>
    );
}
