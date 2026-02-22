"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Zap, Activity, Flame } from "lucide-react";

export default function Mascot() {
    return (
        <section className="relative py-32 bg-black border-t border-white/5 overflow-hidden">

            {/* Background aesthetics */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/10 to-transparent pointer-events-none" />
            <div className="absolute -left-32 top-32 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                {/* Isolated Mascot Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-full aspect-square flex justify-center drop-shadow-[0_0_50px_rgba(250,204,21,0.2)]"
                >
                    <Image
                        src="/assets/mascot_isolated.png"
                        alt="The Face of the Grind Mascot"
                        fill
                        className="object-contain z-10"
                    />
                    {/* Animated rings behind mascot */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-dashed border-brand-orange/30 z-0"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-brand-yellow/10 z-0"
                    />
                </motion.div>

                {/* Mascot Lore / Vibe Text */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <Flame className="text-brand-orange w-6 h-6" />
                        <h3 className="text-brand-orange font-bold uppercase tracking-widest text-sm">The Face of the Grind</h3>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                        Unleash<br />The Beast.
                    </h2>

                    <div className="space-y-6 text-gray-400 text-lg md:text-xl font-medium">
                        <p>
                            We didn't just build a drink; we built an identity. The CocoFuse primate represents raw, untamed energy—the kind required to crush early mornings and late nights.
                        </p>
                        <p>
                            Powered entirely by <span className="text-white font-bold">clean coconut water</span> and fortified with <span className="text-brand-yellow font-bold">B-Vitamins</span>, it's the natural fuel your body craves without the crash.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors">
                            <Zap className="w-10 h-10 text-brand-yellow mb-4" />
                            <h4 className="text-white font-bold text-xl mb-2">Sustained Energy</h4>
                            <p className="text-sm text-gray-500">No jitters. Just pure, natural electrochemical drive.</p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors">
                            <Activity className="w-10 h-10 text-brand-green mb-4" />
                            <h4 className="text-white font-bold text-xl mb-2">Rapid Recovery</h4>
                            <p className="text-sm text-gray-500">Loaded with Potassium & Magnesium for muscle health.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
