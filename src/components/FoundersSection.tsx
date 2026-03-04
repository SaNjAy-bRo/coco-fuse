"use client";

import { motion } from "framer-motion";

export default function FoundersSection() {
    const founders = [
        {
            name: "Miket",
            role: "The Spark",
            bg: "bg-primary-green/20",
            border: "border-primary-green"
        },
        {
            name: "Joel",
            role: "The Engine",
            bg: "bg-primary-blue/20",
            border: "border-primary-blue"
        },
        {
            name: "Rishit",
            role: "The Grounding Force",
            bg: "bg-accent-mango/20",
            border: "border-accent-mango"
        }
    ];

    return (
        <section id="founders" className="py-24 md:py-32 bg-primary-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-heading font-black tracking-tighter text-accent-premium uppercase"
                    >
                        Meet The Minds
                    </motion.h2>
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
                            <div className={`w-48 h-64 md:w-64 md:h-80 rounded-full ${founder.bg} border-4 ${founder.border} overflow-hidden mb-8 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl relative`}>
                                {/* Replace with actual portraits later */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-overlay">
                                    <div className="w-full h-full bg-accent-premium object-cover" />
                                </div>
                            </div>

                            <h3 className="text-3xl font-heading font-black text-accent-premium uppercase tracking-wider mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-mango group-hover:to-accent-watermelon transition-all">
                                {founder.name}
                            </h3>
                            <p className="text-lg font-body font-medium text-gray-500 uppercase tracking-widest">
                                {founder.role}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
