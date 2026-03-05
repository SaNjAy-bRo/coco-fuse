"use client";

import { motion, Variants } from "framer-motion";
import { Droplet, Ban, Sparkles, Leaf, Activity } from "lucide-react";

export default function USPSection() {
    const usps = [
        {
            title: "Real Coconut Water",
            desc: "Nature's ultimate hydration source, packed with natural electrolytes.",
            icon: Droplet,
            color: "text-primary-blue",
            bg: "bg-primary-blue/10",
        },
        {
            title: "Zero Added Sugar",
            desc: "No crash, no empty calories. Just pure, clean energy.",
            icon: Ban,
            color: "text-accent-watermelon",
            bg: "bg-accent-watermelon/10",
        },
        {
            title: "No Artificial Colours",
            desc: "What you see is what you get. 100% transparent ingredients.",
            icon: Sparkles,
            color: "text-accent-mango",
            bg: "bg-accent-mango/10",
        },
        {
            title: "Light & Refreshing",
            desc: "Never heavy or syrupy. The perfect everyday thirst quencher.",
            icon: Leaf,
            color: "text-primary-green",
            bg: "bg-primary-green/10",
        },
        {
            title: "Clean Hydration",
            desc: "Designed for your lifestyle, not just for the gym.",
            icon: Activity,
            color: "text-accent-premium",
            bg: "bg-gray-100",
        }
    ];

    const containerVariants: Variants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="formula" className="py-24 md:py-32 bg-primary-white relative overflow-hidden">
            {/* Subtle Juice Splashes */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-blue/30 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-watermelon/20 rounded-full blur-[150px] mix-blend-multiply" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 bg-primary-green/10 text-primary-green font-heading font-bold rounded-full uppercase tracking-widest text-xs mb-4"
                    >
                        The Formula
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-accent-premium uppercase"
                    >
                        Why <span className="text-primary-blue italic">Coco</span><span className="text-primary-green italic">Fuse</span>?
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {usps.map((usp, index) => {
                        const Icon = usp.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-primary-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${usp.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-8 h-8 ${usp.color}`} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-heading font-black text-accent-premium uppercase tracking-wide mb-3">
                                    {usp.title}
                                </h3>
                                <p className="text-gray-600 font-body text-lg leading-relaxed">
                                    {usp.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
