"use client";

import { motion } from "framer-motion";

export default function Lifestyle() {
    const marqueeText = "HYDRATE. DOMINATE. REPEAT. • FUEL YOUR GRIND • STAY FIERCE • ";

    return (
        <section className="bg-brand-orange py-16 overflow-hidden relative">
            {/* Moving Marquee */}
            <div className="flex whitespace-nowrap overflow-hidden">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex whitespace-nowrap text-8xl md:text-9xl font-black text-black uppercase tracking-tighter"
                >
                    <span>{marqueeText.repeat(4)}</span>
                </motion.div>
            </div>

            {/* Decorative overlaid images / grid (placeholder for user's actual lifestyle shots) */}
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />

            <div className="container mx-auto px-6 mt-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-black/90 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-black/20 shadow-2xl max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-4 md:mb-6">Built For The Hustle</h2>
                    <p className="text-xl text-gray-400 font-medium">
                        Whether you're in the gym, on the field, or grinding late at the office, <span className="font-wedges not-italic whitespace-nowrap"><span className="text-[#7ED956]">COCO</span><span className="text-[#3AB6FD]">FUSE.</span></span> provides the raw electrochemical fuel your body needs. No synthetic garbage. Just natural coconut water and essential vitamins.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
