"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function CTASection() {
    return (
        <section className="py-24 md:py-32 bg-[#F7F7F7] overflow-hidden relative border-t-4 border-[#111111]">
            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full max-w-6xl">
                <div className="bg-[#111111] rounded-[3rem] border-4 border-[#111111] shadow-[16px_16px_0px_#FFD166] p-8 md:p-16 lg:p-24 relative overflow-hidden group w-full">
                    
                    {/* Subtle Neo-Pop Element */}
                    <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-[#FFD166] w-12 h-12 md:w-16 md:h-16 rounded-full border-[3px] md:border-4 border-[#111111] flex items-center justify-center shadow-[3px_3px_0px_#111111] md:shadow-[4px_4px_0px_#111111] z-0">
                        <Zap className="w-6 h-6 md:w-8 md:h-8 text-[#111111]" fill="currentColor" strokeWidth={0} />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-[11vw] sm:text-[4.5rem] lg:text-[6.5rem] font-heading font-black italic text-[#F7F7F7] uppercase tracking-tighter leading-[0.95] md:leading-[0.8] mb-8 relative z-20 drop-shadow-sm"
                        >
                            LEVEL UP YOUR <br className="hidden md:block" />
                            DAILY <span className="text-[#3AB6FD] block md:inline-block mt-1 md:mt-0">HYDRATION</span>
                        </motion.h2>

                        {/* Cleaned up Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mt-2 mb-10 w-full max-w-3xl bg-transparent border-t-2 border-b-2 border-white/20 py-8 px-4"
                        >
                            <p className="text-lg md:text-xl font-heading font-bold italic uppercase tracking-wider text-[#EAEAEA] leading-relaxed text-center">
                                Stop settling for sugary junk. Switch to the fun, clean coconut-based fruit-flavored hydration that actually fuels your life.
                                <br/><span className="mt-4 block text-[#39FF14] font-black text-xl md:text-2xl drop-shadow-sm">One bottle is all it takes to feel the difference.</span>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
                        >
                            <Link href="#flavours" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -3, rotate: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-[#FF9F1C] text-[#111111] border-4 border-transparent shadow-[6px_6px_0px_#FFD166] hover:shadow-[2px_2px_0px_#FFD166] font-heading font-black px-10 py-4 md:py-5 rounded-full text-xl md:text-2xl italic uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer"
                                >
                                    Get Your Fuse.
                                    <ArrowRight strokeWidth={4} className="w-6 h-6" />
                                </motion.button>
                            </Link>

                            <Link href="#flavours" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -3, backgroundColor: "#222" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-[#111111] text-[#F7F7F7] border-4 border-[#3AB6FD] shadow-[6px_6px_0px_#3AB6FD] hover:shadow-[2px_2px_0px_#3AB6FD] font-heading font-black px-10 py-4 md:py-5 rounded-full text-xl md:text-2xl italic uppercase tracking-wider transition-all cursor-pointer"
                                >
                                    View Flavours
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Trust Badge */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="mt-14 pt-8 border-t-4 border-[#111111] w-full flex flex-wrap justify-center gap-6 md:gap-12"
                        >
                            <span className="bg-[#FFD166] text-[#111111] border-2 border-[#111111] rounded-full px-5 py-2 font-heading font-black italic tracking-widest text-xs md:text-sm uppercase shadow-[3px_3px_0px_#111111]">0% Added Sugar</span>
                            <span className="bg-[#39FF14] text-[#111111] border-2 border-[#111111] rounded-full px-5 py-2 font-heading font-black italic tracking-widest text-xs md:text-sm uppercase shadow-[3px_3px_0px_#111111]">100% Natural</span>
                            <span className="bg-[#3AB6FD] text-[#111111] border-2 border-[#111111] rounded-full px-5 py-2 font-heading font-black italic tracking-widest text-xs md:text-sm uppercase shadow-[3px_3px_0px_#111111]">Peak Hydration</span>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
