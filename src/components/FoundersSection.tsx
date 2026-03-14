"use client";

import { motion } from "framer-motion";

export default function FoundersSection() {
    const founders = [
        {
            name: "Miket",
            role: "The Visionary. The Explorer. The Fuse-Igniter.",
            agencyTag: "The Brand Soul",
            desc: "A mountain climber who realized hydration shouldn't be boring, unhealthy, or sugary. He brings the curiosity, the spark, and the origin idea.",
            bg: "bg-primary-green/20",
            border: "border-primary-green",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop" // Climber / Adventurer
        },
        {
            name: "Joel",
            role: "The Engine. The Flavor Maestro. The Vibes Department.",
            agencyTag: "The Brand Heartbeat",
            desc: "The guy who said CocoFuse cannot look, taste, or BE boring. He brings the bold experimentation, insane combinations, and the jazzy personality.",
            bg: "bg-primary-blue/20",
            border: "border-primary-blue",
            image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=600&auto=format&fit=crop" // Cool, expressive vibes
        },
        {
            name: "Rishit",
            role: "The Balance. The Strategist. The Grounding Force.",
            agencyTag: "The Brand Backbone",
            desc: "If Miket is fire and Joel is electricity, Rishit is gravity. He brings the structure, stability, and scale to turn crazy ideas into real products.",
            bg: "bg-accent-mango/20",
            border: "border-accent-mango",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" // Calm, strategic
        }
    ];

    return (
        <section id="founders" className="py-24 md:py-32 bg-primary-white relative overflow-hidden" style={{ willChange: "transform" }}>
            {/* Vibrant Background Blobs (Optimized for performance) */}
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-accent-mango/30 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-green/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-watermelon/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border-2 border-accent-premium/10 bg-accent-premium/5 text-accent-premium font-heading font-black text-xs tracking-[0.2em] uppercase mb-6"
                    >
                        The Origin Mythos
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-accent-premium uppercase mb-4"
                    >
                        The Fuse Effect
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl font-body font-medium text-gray-600 max-w-2xl"
                    >
                        Three very different people whose lives collided to create something India has never tasted before. Combining nature, purity, and adventure.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {founders.map((founder, index) => (
                        <motion.div
                            key={founder.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="flex flex-col items-center group cursor-pointer"
                        >
                            {/* Minimal Portrait Placeholder */}
                            <div className={`w-48 h-64 md:w-64 md:h-80 rounded-[4rem] ${founder.bg} border-4 ${founder.border} overflow-hidden mb-8 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl relative`}>
                                {/* Replace with actual portraits later */}
                                <div className="absolute inset-0">
                                    <img
                                        src={founder.image}
                                        alt={`${founder.name} - Founder`}
                                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                    />
                                </div>
                            </div>

                            <h3 className="text-3xl font-heading font-black text-accent-premium uppercase tracking-wider mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-mango group-hover:to-accent-watermelon transition-all">
                                {founder.name}
                            </h3>
                            <div className="text-center">
                                <p className="text-xs md:text-sm font-heading font-black text-accent-watermelon uppercase tracking-widest mb-3">
                                    {founder.role}
                                </p>
                                <p className="text-[10px] md:text-xs font-heading font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-4 inline-block">
                                    {founder.agencyTag}
                                </p>
                                <p className="text-sm md:text-base font-body text-gray-600 leading-relaxed px-4">
                                    {founder.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-20 text-center"
                >
                    <h3 className="text-2xl md:text-4xl font-heading font-black text-accent-premium uppercase tracking-widest flex flex-col md:flex-row items-center justify-center gap-4">
                        <span>Vision</span>
                        <span className="text-accent-watermelon">+</span>
                        <span>Vibe</span>
                        <span className="text-accent-watermelon">+</span>
                        <span>Balance</span>
                        <span className="text-accent-watermelon">=</span>
                        <span className="text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-accent-mango to-accent-watermelon">FUSE</span>
                    </h3>
                </motion.div>
            </div>
        </section>
    );
}
