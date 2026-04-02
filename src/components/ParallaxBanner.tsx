"use client";

import { motion } from "framer-motion";

export default function ParallaxBanner() {

    const cards = [
        {
            title: "A UNIQUE BLEND",
            desc: "The goodness of coconut water with refreshing fruit flavors — giving you the best of both worlds",
            color: "bg-[#FFD166]", // Vibrant Yellow
            icon: (
                <svg className="w-16 h-16 md:w-24 md:h-24 text-[#111111] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            )
        },
        {
            title: "NATURAL HYDRATION FORMULA",
            desc: "Made with coconut electrolytes and essential B-vitamins to give you steady energy — without crashes",
            color: "bg-[#FF9F1C]", // Vibrant Orange
            icon: (
                <svg className="w-16 h-16 md:w-24 md:h-24 text-[#111111] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 2L3 14h9l-1 8 10-14h-8l2-8z" />
                </svg>
            )
        },
        {
            title: "ZERO ADDED SUGAR",
            desc: "No crash, no empty calories. Just pure, clean energy",
            color: "bg-[#E8314A]",
            icon: (
                <svg className="w-16 h-16 md:w-24 md:h-24 text-[#111111] drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
            )
        },
        {
            title: "CLEAN HYDRATION",
            desc: "Rehydrates your body faster than plain water by restoring lost minerals",
            color: "bg-[#3AB6FD]", // Electric Blue
            icon: (
                <svg className="w-16 h-16 md:w-24 md:h-24 text-[#111111] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
            )
        },
        {
            title: "NO ARTIFICIAL COLORS",
            desc: "What you see is what you get! 100% transparent ingredients!",
            color: "bg-[#9D4EDD]", // Purple
            icon: (
                <svg className="w-16 h-16 md:w-24 md:h-24 text-[#111111] drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
            )
        },
        {
            title: "LIGHT & LOW-CALORIE",
            desc: "Only ~20 kcal per 100 ml — refreshes without weighing you down",
            color: "bg-[#39FF14]", // Neon Green
            icon: (
                <svg className="w-16 h-16 md:w-24 md:h-24 text-[#111111] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2c0 0-5 6-5 11a5 5 0 0010 0c0-5-5-11-5-11z" />
                </svg>
            )
        }
    ];

    return (
        <section className="relative w-full py-20 md:py-32 bg-[#111111] overflow-hidden z-20 border-t-4 border-b-4 border-[#111111]">
            {/* Massive Brand Banner Overlay */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center w-full mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center relative"
                    >
                        <h2 className="text-[12vw] sm:text-[5rem] md:text-[7rem] lg:text-[8rem] font-heading font-black italic uppercase tracking-tighter leading-[0.8] text-white drop-shadow-lg relative z-10 w-full">
                            THE POWER OF <br /> 
                            <span className="inline-block transform -rotate-2 mt-4 drop-shadow-[4px_4px_0px_white]">
                                <span className="font-wedges tracking-normal text-[#7ED956]">COCO</span><span className="font-wedges tracking-normal text-[#3AB6FD]">FUSE.</span>
                            </span>
                        </h2>
                    </motion.div>
                </div>

                {/* Neo-Pop Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? -1 : 1 }}
                            className={`w-full group rounded-[2.5rem] ${card.color} border-4 border-white shadow-[8px_8px_0px_#FFFFFF] hover:shadow-[12px_12px_0px_#FFFFFF] transition-all p-6 md:p-10 flex flex-col items-center justify-center relative overflow-hidden`}
                        >
                            {/* Decorative Background Icon */}
                            <div className="absolute opacity-10 blur-xl transform scale-150 right-[-10%] bottom-[-10%] pointer-events-none">
                                {card.icon}
                            </div>
                            
                            <motion.div 
                                className="mb-4 transform group-hover:-translate-y-2 transition-transform duration-300"
                            >
                                {card.icon}
                            </motion.div>
                            
                            <h3 className="font-heading font-black italic text-center text-3xl md:text-4xl uppercase tracking-tighter leading-[0.9] text-[#111111] drop-shadow-sm mb-4">
                                {card.title}
                            </h3>

                            <p className="font-body font-bold text-[#111111] text-center text-sm md:text-base leading-snug px-2">
                                {card.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}


