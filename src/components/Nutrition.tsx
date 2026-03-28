"use client";

import { motion } from "framer-motion";
import { useFlavor } from "@/context/FlavorContext";

export default function Nutrition() {
    const { flavorData } = useFlavor();

    return (
        <section id="nutrition" className="py-16 md:py-24 bg-accent-premium border-t border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
                <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary-green/20 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">

                    <div className="lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`text-4xl md:text-6xl font-heading font-black italic uppercase mb-6 ${flavorData.accent}`}
                        >
                            The Raw Math
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg font-body text-gray-300 mb-8 leading-relaxed"
                        >
                            Every drop of <span className="text-white font-bold">{flavorData.name}</span> is engineered for peak performance. Pure coconut water infused with essential vitamins and minerals.
                        </motion.p>

                        <div className="bg-black/50 p-8 rounded-3xl border border-white/5 shadow-2xl">
                            <h3 className="text-xl font-heading font-bold italic text-primary-blue mb-4 uppercase">Ingredients:</h3>
                            <p className="text-sm font-body text-gray-400">
                                {flavorData.ingredients}
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-black/50 rounded-3xl overflow-hidden border border-white/5"
                        >
                            <div className="bg-white/5 p-6 border-b border-white/10">
                                <h3 className="text-2xl font-heading font-black italic text-white uppercase tracking-wider">Nutritional Information</h3>
                                <p className="text-gray-400 font-body text-sm mt-1">Approx. per 100 ml for {flavorData.name}</p>
                            </div>

                            <div className="p-6 font-body">
                                <div className="grid grid-cols-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                                    <span>Nutrient</span>
                                    <span className="text-right">Value</span>
                                    <span className="text-right">%RDA</span>
                                </div>

                                <div className="space-y-3">
                                    {flavorData.nutrition.map((item, idx) => (
                                        <div key={idx} className="grid grid-cols-3 text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                            <span className="text-gray-300">{item.label}</span>
                                            <span className="text-right font-medium text-white">{item.value}</span>
                                            <span className="text-right font-bold text-primary-green">{item.rda}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
