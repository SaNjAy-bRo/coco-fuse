"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Creative Mobile Menu Icon resembling a glowing Energy Drink Can
const DrinkMenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div className="relative w-12 h-12 flex items-center justify-center bg-white/5 rounded-full border border-white/10 backdrop-blur-md overflow-hidden group hover:bg-white/10 transition-colors">
        <AnimatePresence mode="wait">
            {!isOpen ? (
                <motion.div
                    key="drink"
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    className="flex flex-col items-center gap-[1px]"
                >
                    {/* Can Tab / Top */}
                    <div className="w-3 h-0.5 bg-gray-300 rounded-t-sm" />
                    <div className="w-4 h-1 bg-gray-400 rounded-sm" />
                    {/* Can Body (Acts as hamburger lines) */}
                    <div className="w-6 h-7 border-[2px] border-brand-green rounded-sm flex flex-col items-center justify-center gap-1 shadow-[0_0_15px_rgba(34,197,94,0.4)] overflow-hidden">
                        <div className="w-8 h-1 bg-brand-yellow -rotate-12 transform scale-150 shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse" />
                        <div className="w-8 h-1 bg-brand-orange -rotate-12 transform scale-150 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse" style={{ animationDelay: "0.5s" }} />
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="close"
                    initial={{ opacity: 0, scale: 0.5, rotate: 45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                >
                    <X className="w-6 h-6 text-brand-orange drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "THE VIBE", href: "#vibe" },
        { name: "THE FORMULA", href: "#formula" },
        { name: "LIFESTYLE", href: "#lifestyle" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-black/40 backdrop-blur-xl border-b border-white/5">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group cursor-pointer relative z-[110]">
                    <span className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-green/80 uppercase">
                        COCO
                    </span>
                    <span className="text-2xl font-black italic tracking-tighter text-brand-orange uppercase">
                        FUSE
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold tracking-widest text-gray-300 hover:text-white uppercase transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="px-6 py-2.5 bg-gradient-to-r from-brand-orange to-brand-yellow rounded-full text-black font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                        Grab A Can
                    </button>
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative z-[110] focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <DrinkMenuIcon isOpen={isOpen} />
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center min-h-screen"
                    >
                        <div className="flex flex-col items-center justify-center w-full max-w-sm px-6 gap-10">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-black tracking-widest text-gray-300 hover:text-white uppercase transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-8 px-8 py-5 w-full bg-gradient-to-r from-brand-orange to-brand-yellow rounded-full text-black font-black uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-105 active:scale-95 transition-all"
                            >
                                Grab A Can
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
