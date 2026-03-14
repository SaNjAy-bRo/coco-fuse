"use client";

import { motion } from "framer-motion";
import { PartyPopper, Dumbbell, Zap, ArrowRight } from "lucide-react";
import { useFlavor, FlavorID } from "@/context/FlavorContext";

const MOODS: { 
    title: string; 
    flavorId: FlavorID; 
    name: string;
    mood: string; 
    desc: string; 
    icon: any; 
    gradient: string; 
    shadow: string; 
    bg: string;
}[] = [
    {
        title: "The Party Starter",
        flavorId: "mango",
        name: "Mango Refresh",
        mood: "Social & High Energy",
        desc: "The companion for late nights, festivals, and legendary vibes.",
        icon: PartyPopper,
        gradient: "from-[#FFB300] to-[#FF8F00]",
        shadow: "shadow-accent-mango/30",
        bg: "bg-accent-mango/10"
    },
    {
        title: "The Athlete",
        flavorId: "watermelon",
        name: "Watermelon Cool",
        mood: "Hyper Recovery",
        desc: "Crush the workout, then recharge with pure electrolyte precision.",
        icon: Dumbbell,
        gradient: "from-[#FF3366] to-[#E62E5C]",
        shadow: "shadow-accent-watermelon/30",
        bg: "bg-accent-watermelon/10"
    },
    {
        title: "The Laser Focused",
        flavorId: "basil",
        name: "Basil Chili Kick",
        mood: "Deep Work Flow",
        desc: "Neural firing at peak capacity. For the makers, thinkers, and explorers.",
        icon: Zap,
        gradient: "from-[#00E676] to-[#00C853]",
        shadow: "shadow-primary-green/30",
        bg: "bg-primary-green/10"
    }
];

export default function MoodSelector() {
    const { setFlavor } = useFlavor();

    const handleMoodSelect = (flavorId: FlavorID) => {
        // Use Lenis for butter-smooth scroll to top
        // @ts-ignore
        if (window.lenis) {
            // @ts-ignore
            window.lenis.scrollTo(0, {
                duration: 4.5, // Even slower, 4.5 seconds
                easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t) // Expo Out
            });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        setFlavor(flavorId);
    };

    return (
        <section className="py-24 md:py-32 bg-primary-white relative overflow-hidden" style={{ transform: 'translateZ(0)', willChange: "transform" }}>
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 bg-accent-premium/5 text-accent-premium font-heading font-bold rounded-full uppercase tracking-widest text-xs mb-6"
                    >
                        Find Your Fuse
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter text-accent-premium uppercase leading-none"
                    >
                        Who are you <br />
                        <span className="text-primary-blue italic">Right Now?</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                    {MOODS.map((mood, idx) => {
                        const Icon = mood.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                whileHover={{ y: -10 }}
                                onClick={() => handleMoodSelect(mood.flavorId)}
                                className={`relative group p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] ${mood.bg} border border-transparent hover:border-white transition-[transform,opacity,background-color,border-color,box-shadow] duration-500 cursor-pointer overflow-hidden ${mood.shadow}`}
                                style={{ transform: 'translateZ(0)', willChange: "transform, opacity" }}
                            >
                                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center mb-6 md:mb-8 shadow-lg group-hover:scale-110 transition-[transform,opacity] duration-500`}>
                                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-accent-premium" strokeWidth={2.5} />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-heading font-black text-accent-premium uppercase tracking-tighter mb-2 leading-none">
                                    {mood.title}
                                </h3>
                                <p className={`text-[10px] md:text-sm font-heading font-bold uppercase tracking-widest mb-4 md:mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                                    {mood.mood}
                                </p>
                                
                                <div className="w-full h-px bg-accent-premium/10 mb-6" />

                                <p className="text-gray-600 font-body text-base md:text-lg leading-relaxed mb-8 min-h-[60px] md:min-h-[80px]">
                                    {mood.desc}
                                </p>

                                <div className="flex items-center gap-2 font-heading font-black uppercase tracking-wider text-[11px] md:text-sm text-accent-premium mt-auto bg-white/50 w-full justify-center md:w-fit md:px-6 py-3.5 md:py-3 rounded-xl md:rounded-full border border-white/20 shadow-sm group-hover:bg-white transition-[background-color,transform] duration-300">
                                    {mood.name}
                                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            
            <div 
                className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-heading font-black text-black pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap overflow-hidden -z-10 opacity-[0.03]"
                style={{ transform: 'translate3d(0, -50%, 0)', willChange: 'transform' }}
            >
                WHICH ONE ARE YOU? WHICH ONE ARE YOU?
            </div>
        </section>
    );
}
