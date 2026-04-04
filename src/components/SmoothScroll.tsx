"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Detect touch devices — skip Lenis entirely for native smooth scroll
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
        if (isTouchDevice) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.0,
            //@ts-ignore
            syncTouch: false,
        });

        // @ts-ignore
        window.lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            // @ts-ignore
            window.lenis = null;
        };
    }, []);

    return <>{children}</>;
}
