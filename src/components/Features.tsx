"use client";

import { motion, Variants } from "framer-motion";
import { Droplet, Zap, BatteryCharging, Leaf, HeartPulse, ShieldCheck } from "lucide-react";

export default function Features() {
    const features = [
        { title: "Natural Hydration", icon: <Droplet className="w-8 h-8 text-brand-green" /> },
        { title: "Electrolytes – K, Mg", icon: <Zap className="w-8 h-8 text-brand-yellow" /> },
        { title: "Vitamin Enriched", desc: "B3, B5, B6, C", icon: <BatteryCharging className="w-8 h-8 text-brand-orange" /> },
        { title: "Zero Added Sugar", icon: <ShieldCheck className="w-8 h-8 text-white" /> },
        { title: "Low Calorie", desc: "~20 kcal per 100ml", icon: <HeartPulse className="w-8 h-8 text-brand-green" /> },
        { title: "Vegan & Cruelty Free", icon: <Leaf className="w-8 h-8 text-brand-yellow" /> },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
    };

    return (
        <section className="relative py-32 bg-black border-t border-white/10 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20 relative">
                    {/* Decorative Background Coconut */}
                    <motion.img
                        src="/2.svg"
                        alt="Coconut Decor"
                        initial={{ opacity: 0, rotate: -30 }}
                        whileInView={{ opacity: 0.15, rotate: 10, y: [0, -30, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-16 lg:-top-24 left-4 lg:left-32 w-32 h-32 md:w-56 md:h-56 z-0 pointer-events-none drop-shadow-2xl"
                    />

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-5xl md:text-7xl font-black text-white uppercase relative z-10"
                    >
                        Sip <span className="text-brand-green">N</span> Chill
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 mt-4 text-xl"
                    >
                        Clean, Coconut-Powered Hydration
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-brand-orange/50 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div className="mb-6 p-4 rounded-2xl bg-black/50 inline-block group-hover:bg-brand-orange/10 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                            {feature.desc && <p className="text-sm font-medium text-gray-400">{feature.desc}</p>}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
