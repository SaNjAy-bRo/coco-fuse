"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function useIsTouch() {
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);
    return isTouch;
}

const DrinkMenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div className="relative w-10 h-10 flex items-center justify-center bg-accent-premium/5 rounded-full border border-black/10 overflow-hidden group hover:bg-black/5 transition-colors">
        <AnimatePresence mode="wait">
            {!isOpen ? (
                <motion.div
                    key="drink"
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    className="flex flex-col items-center gap-[1px]"
                >
                    <div className="w-2.5 h-[2px] bg-gray-400 rounded-t-sm" />
                    <div className="w-3.5 h-[3px] bg-gray-500 rounded-sm" />
                    <div className="w-5 h-6 border-[2px] border-primary-green rounded-sm flex flex-col items-center justify-center gap-0.5 shadow-[0_0_10px_rgba(126,217,86,0.2)] overflow-hidden">
                        <div className="w-8 h-1 bg-accent-mango -rotate-12 transform scale-150" />
                        <div className="w-8 h-1 bg-accent-watermelon -rotate-12 transform scale-150" />
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="close"
                    initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                >
                    <X className="w-5 h-5 text-accent-watermelon" />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const isTouch = useIsTouch();
    const { scrollY } = useScroll();

    // Dynamic width on scroll for the pill effect
    const width = useTransform(scrollY, [0, 100], ["100%", "90%"]);
    const top = useTransform(scrollY, [0, 100], ["0px", "24px"]);
    const borderRadius = useTransform(scrollY, [0, 100], ["0px", "9999px"]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Flavours", href: "/#flavours" },
    ];

    const ctaClass = "bg-accent-premium text-primary-white rounded-full font-heading font-black tracking-widest text-sm hover:scale-105 active:scale-95 transition-all group relative overflow-hidden";

    return (
        <motion.nav
            style={{ width, top, borderRadius }}
            className="absolute left-1/2 -translate-x-1/2 z-[100] bg-white border-b-4 border-x-4 border-[#111111] shadow-[4px_4px_0px_rgba(17,17,17,1)] flex items-center justify-between px-6 lg:px-12 h-20 origin-top overflow-visible transition-colors"
        >
            {/* Logo */}
            <a href="/" className="flex-shrink-0 relative z-[110] outline-none">
                <Image
                    src="/assets/client_logo.png"
                    alt="CocoFuse."
                    width={240}
                    height={80}
                    priority
                    className="h-16 sm:h-18 md:h-20 w-auto object-contain transition-transform hover:scale-105"
                />
            </a>

            {/* Desktop Nav — hide on touch devices even at desktop viewport */}
            <div className={`${isTouch ? 'hidden' : 'hidden md:flex'} flex-1 items-center justify-center gap-10`}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-sm font-heading font-black italic tracking-widest text-[#111111] uppercase hover:text-accent-watermelon transition-all hover:-translate-y-0.5 px-2 py-1"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
                <Link href="/#flavours" className={`${isTouch ? 'hidden' : 'hidden md:block'} px-6 py-2.5 bg-[#39FF14] text-[#111111] rounded-full font-heading font-black uppercase italic tracking-widest text-xs lg:text-sm border-2 border-[#111111] shadow-[2px_2px_0px_#111111] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#111111] transition-all`}>
                    <span className="relative z-10">Buy Now</span>
                </Link>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`${isTouch ? '' : 'md:hidden'} relative z-[110] focus:outline-none bg-transparent border-none p-0`}
                    aria-label="Toggle Menu"
                >
                    <DrinkMenuIcon isOpen={isOpen} />
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className={`absolute top-[110%] left-1/2 -translate-x-1/2 w-[95vw] max-w-[400px] bg-white border-4 border-[#111111] rounded-3xl p-6 shadow-[8px_8px_0px_#111111] ${isTouch ? '' : 'md:hidden'} overflow-hidden flex flex-col gap-4 z-[200]`}
                    >
                        {navLinks.map((link, i) => {
                            // On mobile, we want "THE STORY" to go to the full /#story section
                            // rather than just the "origin" heading used for desktop parallax anchoring.
                            const mobileHref = link.name === "THE STORY" ? "/#story" : link.href;
                            
                            return (
                                <motion.a
                                    key={link.name}
                                    href={mobileHref}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-2xl font-heading font-black italic uppercase tracking-widest text-[#111111] hover:text-accent-watermelon transition-colors border-b-2 border-black/5 pb-2 inline-block pt-1"
                                >
                                    {link.name}
                                </motion.a>
                            );
                        })}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            onClick={() => { setIsOpen(false); window.location.href = '/#flavours'; }}
                            className="mt-6 w-full py-4 bg-[#39FF14] text-[#111111] rounded-full font-heading font-black uppercase italic tracking-widest border-4 border-[#111111] shadow-[4px_4px_0px_#111111] active:translate-y-1 active:shadow-[0px_0px_0px_#111111] transition-all"
                        >
                            <span className="relative z-10">Buy Now</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
