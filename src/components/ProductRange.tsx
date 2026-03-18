"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductRange() {
    const products = [
        {
            id: "mango",
            name: "Mango Refresh",
            tagline: "Tropical energy burst",
            color: "bg-accent-mango",
            textColor: "text-accent-mango",
            shadow: "shadow-[0_20px_50px_rgba(255,209,102,0.3)]",
            gradient: "from-accent-mango/80 to-accent-mango/20"
        },
        {
            id: "watermelon",
            name: "Watermelon Cool",
            tagline: "Ultra refreshing cool",
            color: "bg-accent-watermelon",
            textColor: "text-[#FF3366]",
            shadow: "shadow-[0_20px_50px_rgba(255,51,102,0.3)]",
            gradient: "from-[#FF3366]/80 to-[#FF3366]/20"
        },
        {
            id: "basil",
            name: "Basil Chili Kick",
            tagline: "The wild card kick",
            color: "bg-primary-green",
            textColor: "text-[#00E676]",
            shadow: "shadow-[0_20px_50px_rgba(0,230,118,0.3)]",
            gradient: "from-[#00E676]/80 to-[#00E676]/20"
        }
    ];

    return (
        <section id="flavours" className="py-24 md:py-32 bg-primary-white relative overflow-hidden">
            {/* Vibrant Fruit Mash Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-multiply">
                {/* <div className="absolute top-0 right-1/3 w-[800px] h-[800px] bg-accent-mango/40 rounded-full blur-[150px]" /> */}
                <div className="absolute bottom-[-20%] left-[-10%] w-[900px] h-[900px] bg-accent-watermelon/30 rounded-full blur-[150px]" />
                <div className="absolute top-1/2 left-2/3 w-[600px] h-[600px] bg-primary-green/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-accent-premium uppercase mb-4">
                            Pick Your <span className="text-primary-blue italic">Vibe</span>
                        </h2>
                        <p className="text-xl font-body text-gray-500">
                            Four distinct flavours. Zero artificial nonsense.
                        </p>
                    </motion.div>
                    <motion.button
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 font-heading font-black uppercase tracking-wider text-accent-premium hover:text-primary-blue transition-colors group"
                    >
                        View All Products
                        <span className="w-10 h-10 rounded-full border-2 border-accent-premium group-hover:border-primary-blue flex items-center justify-center transition-colors">
                            <ArrowRight strokeWidth={3} className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <Link href={`/products/${product.id}`} key={product.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -15 }}
                                className={`relative rounded-[2rem] p-8 h-[400px] flex flex-col justify-end bg-gradient-to-br ${product.gradient} overflow-hidden group cursor-pointer ${product.shadow}`}
                            >
                                {/* Inner glow / texture */}
                                <div className="absolute inset-0 bg-white/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 w-full bg-white/95 backdrop-blur-md p-6 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                                    <h3 className={`text-2xl font-heading font-black uppercase tracking-widest mb-1 ${product.textColor}`}>
                                        {product.name}
                                    </h3>
                                    <p className="text-sm font-body font-medium text-gray-500 uppercase tracking-wider mb-4">
                                        {product.tagline}
                                    </p>

                                    <div className={`inline-flex items-center gap-2 font-heading font-bold uppercase text-sm ${product.textColor} group-hover:opacity-80 transition-opacity`}>
                                        View Product <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
