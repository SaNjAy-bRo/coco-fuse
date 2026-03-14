"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

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
    const { scrollY } = useScroll();

    // Dynamic width on scroll for the pill effect
    const width = useTransform(scrollY, [0, 100], ["100%", "90%"]);
    const top = useTransform(scrollY, [0, 100], ["0px", "24px"]);
    const borderRadius = useTransform(scrollY, [0, 100], ["0px", "9999px"]);

    const navLinks = [
        { name: "THE STORY", href: "#story-origin" },
        { name: "FLAVOURS", href: "#flavours" },
        { name: "THE MATH", href: "#nutrition" },
    ];

    const ctaClass = "bg-accent-premium text-primary-white rounded-full font-heading font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all group relative overflow-hidden";

    return (
        <motion.nav
            style={{ width, top, borderRadius }}
            className="fixed left-1/2 -translate-x-1/2 z-[100] bg-primary-white/80 backdrop-blur-2xl border border-gray-200 shadow-sm flex items-center justify-between px-6 lg:px-12 h-20 origin-top"
        >
            {/* Logo */}
            <a href="#" className="flex-shrink-0 relative z-[110] outline-none">
                <Image
                    src="/assets/client_logo.png"
                    alt="CocoFuse"
                    width={150}
                    height={48}
                    priority
                    className="h-10 md:h-12 w-auto object-contain transition-transform hover:scale-105"
                />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-10">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-sm font-heading font-black tracking-widest text-accent-premium/60 hover:text-accent-premium uppercase transition-all hover:-translate-y-0.5"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
                <button className={`hidden md:block px-6 py-3 shadow-md hover:shadow-xl ${ctaClass}`}>
                    <span className="relative z-10">Get Hydrated</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-mango to-accent-watermelon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative z-[110] focus:outline-none bg-transparent border-none p-0"
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
                        className="absolute top-[110%] left-1/2 -translate-x-1/2 w-[95vw] bg-primary-white/95 backdrop-blur-3xl border border-gray-200 rounded-3xl p-6 shadow-2xl md:hidden overflow-hidden flex flex-col gap-4"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-2xl font-heading font-black tracking-widest text-accent-premium hover:text-primary-blue uppercase transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            onClick={() => setIsOpen(false)}
                            className={`mt-4 w-full py-4 shadow-xl ${ctaClass}`}
                        >
                            <span className="relative z-10">Get Hydrated</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-mango to-accent-watermelon opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
