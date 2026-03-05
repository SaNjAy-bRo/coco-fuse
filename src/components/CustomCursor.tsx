"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor({ isMobile }: { isMobile?: boolean }) {
    const [isVisible, setIsVisible] = useState(false);

    // Exact cursor coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the trailing dot
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const trailingX = useSpring(mouseX, springConfig);
    const trailingY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Disable custom cursor on mobile viewports natively where mouse isn't used
        if (isMobile || ('ontouchstart' in window) || navigator.maxTouchPoints > 0) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [isVisible, mouseX, mouseY, isMobile]);

    if (!isVisible) return null;

    return (
        <>
            {/* The exact dot point */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-primary-premium rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />
            {/* The colorful vibrant trail */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9998] border-2 border-primary-pink/50 backdrop-blur-[2px] hidden lg:block"
                style={{
                    x: trailingX,
                    y: trailingY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
            />
        </>
    );
}
