"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
                <a href="#" className="flex items-center gap-2 group cursor-pointer relative z-50">
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
                    className="md:hidden relative z-50 p-2 text-white"
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-3xl md:hidden border-t border-white/10"
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
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
                                className="mt-8 px-8 py-4 w-3/4 max-w-sm bg-gradient-to-r from-brand-orange to-brand-yellow rounded-full text-black font-black uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(249,115,22,0.3)] active:scale-95 transition-transform"
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
