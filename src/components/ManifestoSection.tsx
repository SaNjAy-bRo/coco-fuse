"use client";

import { motion } from "framer-motion";

export default function ManifestoSection() {
    return (
        <section id="manifesto" className="py-32 md:py-48 bg-accent-premium relative overflow-hidden flex items-center justify-center">

            {/* Dramatic background noise and glows */}
            <div className="absolute inset-0 pointer-events-none opacity-50 mix-blend-color-dodge">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-green/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary-blue/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto"
                >
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter text-primary-white leading-[0.9] uppercase mix-blend-difference mb-12">
                        Clean <br className="hidden md:block" /> Hydration <br />
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-br from-primary-green via-primary-blue to-accent-mango">With Attitude.</span>
                    </h2>

                    <p className="text-2xl md:text-4xl font-body font-light text-gray-400 max-w-3xl mx-auto uppercase tracking-wider">
                        For <span className="text-white font-bold">real people</span> living <span className="text-white font-bold">real life</span>.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        whileInView={{ opacity: 1, height: "100px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-[2px] bg-gradient-to-b from-primary-green to-transparent mx-auto mt-16"
                    />
                </motion.div>
            </div>
        </section>
    );
}
