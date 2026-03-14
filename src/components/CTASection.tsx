"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function CTASection() {
    return (
        <section className="py-24 md:py-32 bg-primary-white overflow-hidden relative">
            {/* Background Accent Shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary-blue/5 via-transparent to-accent-watermelon/5 rotate-12 blur-3xl opacity-50" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-green/10 rounded-full blur-[100px]" />
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-mango/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-accent-premium rounded-[3rem] p-8 md:p-16 lg:p-24 shadow-2xl relative overflow-hidden group">
                        {/* Animated Mesh Gradient Background inside Card */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000">
                            {/* <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] bg-accent-mango rounded-full blur-[120px] animate-pulse" /> */}
                            <div className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] bg-primary-blue rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10"
                            >
                                <Zap className="w-8 h-8 text-accent-mango" fill="currentColor" />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-8"
                            >
                                Level Up Your <br />
                                <span className="text-accent-mango italic">Daily</span> <span className="text-primary-blue italic">Hydration</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-lg md:text-xl lg:text-2xl font-body text-gray-300 max-w-2xl mb-12 leading-relaxed"
                            >
                                Stop settling for sugary junk. Switch to mountain-born, coconut-powered hydration that actually fuels your life. One bottle is all it takes to feel the difference.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-accent-mango text-accent-premium font-heading font-black px-12 py-5 rounded-full text-lg uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,209,102,0.3)] transition-all"
                                >
                                    Get Your Fuse
                                    <ArrowRight strokeWidth={3} className="w-5 h-5" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border-2 border-white/20 text-white font-heading font-bold px-12 py-5 rounded-full text-lg uppercase tracking-wider transition-all"
                                >
                                    View Flavours
                                </motion.button>
                            </motion.div>

                            {/* Trust Badge */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1 }}
                                className="mt-12 pt-12 border-t border-white/10 w-full flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
                            >
                                <span className="text-white font-heading font-black italic tracking-widest text-sm uppercase">0% Added Sugar</span>
                                <span className="text-white font-heading font-black italic tracking-widest text-sm uppercase">100% Natural</span>
                                <span className="text-white font-heading font-black italic tracking-widest text-sm uppercase">Peak Focus</span>
                            </motion.div>
                        </div>

                        {/* Decorative Corner Details */}
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <div className="w-32 h-32 border-t-4 border-r-4 border-white opacity-20" />
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 opacity-10">
                            <div className="w-32 h-32 border-b-4 border-l-4 border-white opacity-20" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
