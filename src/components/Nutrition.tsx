"use client";

import { motion } from "framer-motion";

export default function Nutrition() {
    const nutritionData = [
        { label: "Energy", value: "19.78 kcal", rda: "-" },
        { label: "Protein", value: "0.0 g", rda: "-" },
        { label: "Carbohydrate", value: "4.2 g", rda: "-" },
        { label: "Total Sugars", value: "4.0 g", rda: "-" },
        { label: "Added Sugar", value: "0.0 g", rda: "-" },
        { label: "Sodium", value: "20 mg", rda: "1%" },
        { label: "Potassium", value: "150 mg", rda: "3%" },
        { label: "Magnesium", value: "12 mg", rda: "3%" },
        { label: "Vitamin B3", value: "3 mg", rda: "41%" },
        { label: "Vitamin B5", value: "1.69 mg", rda: "21.8%" },
        { label: "Vitamin B6", value: "0.4 mg", rda: "77%" },
        { label: "Vitamin C", value: "0.2 mg", rda: "21%" },
    ];

    return (
        <section id="nutrition" className="py-16 md:py-24 bg-accent-premium border-t border-accent-mango/20 relative overflow-hidden">
            {/* Dark Mode Juice Glows */}
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
                <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary-green/20 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-mango/10 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16">

                    <div className="lg:w-1/2">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-heading font-black text-accent-mango uppercase mb-6"
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
                            Every drop is engineered for peak performance. Pure coconut water infused with essential vitamins and minerals, preserving the natural goodness without the junk.
                        </motion.p>

                        <div className="bg-black/50 p-8 rounded-3xl border border-white/5 shadow-2xl">
                            <h3 className="text-xl font-heading font-bold text-primary-blue mb-4 uppercase">Ingredients:</h3>
                            <p className="text-sm font-body text-gray-400">
                                Water, Coconut Powder (6%), Acidity Regulator (E330), Minerals (Potassium Chloride, Magnesium Sulphate), Natural Sweetener (INS960), Contains Natural and/or Nature-Identical Flavouring Substances, Natural Preservative Nisin (INS234), Vitamins (B3, B5, B6 and C).
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-black/50 rounded-3xl overflow-hidden border border-primary-green/20"
                        >
                            <div className="bg-primary-green/10 p-6 border-b border-primary-green/20">
                                <h3 className="text-2xl font-heading font-black text-white uppercase tracking-wider">Nutritional Information</h3>
                                <p className="text-primary-green font-body text-sm mt-1">Approx. per 100 ml</p>
                            </div>

                            <div className="p-6 font-body">
                                <div className="grid grid-cols-3 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                                    <span>Nutrient</span>
                                    <span className="text-right">Value</span>
                                    <span className="text-right">%RDA</span>
                                </div>

                                <div className="space-y-3">
                                    {nutritionData.map((item, idx) => (
                                        <div key={idx} className="grid grid-cols-3 text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                            <span className="text-gray-300">{item.label}</span>
                                            <span className="text-right font-medium text-white">{item.value}</span>
                                            <span className="text-right font-bold text-accent-mango">{item.rda}</span>
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
