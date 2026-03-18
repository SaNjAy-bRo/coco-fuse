"use client";

import { use } from "react";
import { FLAVORS, FlavorID } from "@/context/FlavorContext";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Droplets, Leaf } from "lucide-react";
import dynamic from "next/dynamic";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

// Use 3D Scene dynamically to prevent SSR hydration errors
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const id = resolvedParams.id as FlavorID;
    const product = FLAVORS[id];

    if (!product) {
        notFound();
    }

    // Advanced Dynamic Color Palettes tailored for extreme aesthetic impact
    const palettes: Record<string, any> = {
        mango: {
            bg: "bg-gradient-to-br from-[#FFF8E7] via-[#FFEBB2] to-[#FFD166]",
            blob: "bg-amber-400/20",
            textMain: "text-[#FF8C00]",
            textSub: "text-[#D97700]",
            btnBg: "bg-[#FF8C00]",
            btnText: "text-white",
            accent: "text-amber-500",
            iconBg: "bg-amber-100",
            pairingImage: "/assets/mango_pairing.jpg" // fallback aesthetic conceptually
        },
        watermelon: {
            bg: "bg-gradient-to-br from-[#FFF2F6] via-[#FFD6E4] to-[#FF9EBB]",
            blob: "bg-pink-400/20",
            textMain: "text-[#E23F72]",
            textSub: "text-[#C12555]",
            btnBg: "bg-[#E23F72]",
            btnText: "text-white",
            accent: "text-[#F8DD59]",
            iconBg: "bg-pink-100",
        },
        basil: {
            bg: "bg-gradient-to-br from-[#F2FFF5] via-[#D1EED5] to-[#A3DEAB]",
            blob: "bg-green-400/20",
            textMain: "text-[#049948]",
            textSub: "text-[#037A39]",
            btnBg: "bg-[#049948]",
            btnText: "text-white",
            accent: "text-[#56AFE1]",
            iconBg: "bg-green-100",
        }
    };

    const p = palettes[product.id] || palettes.mango;

    return (
        <main className="min-h-screen bg-primary-white text-accent-premium font-body overflow-hidden">
            {/* 1. ADVANCED HERO SECTION - Mobile First & Highly Responsive */}
            <section className={`relative w-full min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden ${p.bg}`}>
                {/* Visual Blobs for dynamic aesthetic */}
                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] ${p.blob} -translate-y-1/2 translate-x-1/2`} />
                <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] ${p.blob} translate-y-1/2 -translate-x-1/4`} />
                
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <Link href="/" className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-widest text-sm mb-6 lg:mb-8 hover:opacity-60 transition-opacity bg-white/50 backdrop-blur-md px-5 py-3 rounded-full shadow-sm">
                        <ArrowLeft className="w-5 h-5" /> HOME
                    </Link>

                    <div className="flex flex-col lg:grid lg:grid-cols-2 items-center gap-6 lg:gap-10">
                        
                        {/* 1. TITLE (Mobile: Order 1. Desktop: Col 2, Row 1) */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="w-full flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:col-start-2 lg:row-start-1 lg:self-end pt-4 lg:pt-0"
                        >
                            <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-md rounded-full font-heading font-black uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6 shadow-sm border border-white/60 text-accent-premium">
                                100% Core Hydration
                            </div>
                            
                            <h1 className={`text-6xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-[7rem] font-heading font-black uppercase tracking-tighter leading-[0.85] ${p.textMain} drop-shadow-xl`}>
                                {product.name.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h1>
                        </motion.div>

                        {/* 2. BOTTLE (Mobile: Order 2. Desktop: Col 1, Row 1-3) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="w-full flex items-center justify-center relative h-[450px] lg:h-[700px] order-2 lg:col-start-1 lg:row-start-1 lg:row-span-3 -mt-6 lg:mt-0"
                        >
                            <div className="absolute inset-0 bg-white/40 rounded-[3rem] blur-xl pointer-events-none transform -rotate-6 scale-90" />
                            <div className="w-full h-full max-w-[500px] z-10 relative">
                                <Scene 
                                    labelPath={product.label}
                                    liquidColor={product.liquid}
                                    capColor={product.cap}
                                />
                            </div>
                        </motion.div>

                        {/* 3. INFO/STORY (Mobile: Order 3. Desktop: Col 2, Row 2) */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="w-full flex flex-col items-center lg:items-start text-center lg:text-left order-3 lg:col-start-2 lg:row-start-2 pt-2 lg:pt-0"
                        >
                            <p className="text-lg md:text-xl lg:text-2xl font-body font-medium bg-white/70 backdrop-blur-xl px-6 py-4 md:px-8 md:py-6 rounded-2xl mb-8 border border-white/60 shadow-lg leading-relaxed text-gray-800 lg:max-w-xl">
                                {product.story.morning.desc}
                            </p>

                            <ul className="flex flex-col gap-4 w-full max-w-md text-left bg-white/50 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-white/60 shadow-xl">
                                <li className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${p.iconBg}`}><Sparkles className={`w-5 h-5 ${p.textMain}`} /></div>
                                    <span className="font-bold text-base md:text-lg text-gray-800">Zero Artificial Nonsense</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${p.iconBg}`}><Droplets className={`w-5 h-5 ${p.textMain}`} /></div>
                                    <span className="font-bold text-base md:text-lg text-gray-800">Natural Coconut Water Base</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${p.iconBg}`}><Leaf className={`w-5 h-5 ${p.textMain}`} /></div>
                                    <span className="font-bold text-base md:text-lg text-gray-800">Guilt-Free Hydration</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* 4. CTA BUTTON (Mobile: Order 4. Desktop: Col 2, Row 3) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="w-full flex justify-center lg:justify-start order-4 lg:col-start-2 lg:row-start-3 lg:self-start pt-6 lg:pt-0"
                        >
                            <Link href={`/checkout?flavor=${product.id}`} className={`w-full sm:w-auto px-10 py-5 ${p.btnBg} ${p.btnText} rounded-full font-heading font-black uppercase tracking-widest text-lg hover:scale-105 active:scale-95 transition-all shadow-xl relative overflow-hidden group flex items-center justify-center gap-3 border-2 border-white/20`}>
                                <span className="relative z-10 flex items-center gap-2">
                                    Add to Cart - $29.99
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. THE FUSE STORY SECTION */}
            <section className="py-20 md:py-28 bg-primary-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="text-center mb-16 md:mb-20">
                        <h2 className={`text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter ${p.textMain}`}>
                            The Fuse Story
                        </h2>
                        <p className="text-lg md:text-xl text-gray-500 font-body max-w-2xl mx-auto mt-4">
                            Crafted for every moment of your day. See how {product.name} fits perfectly into your rhythm.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[product.story.morning, product.story.afternoon, product.story.evening].map((story, idx) => (
                            <div key={idx} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-500 flex flex-col items-center text-center group">
                                <div className={`w-16 h-16 rounded-full ${p.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <Sparkles className={`w-8 h-8 ${p.textMain}`} />
                                </div>
                                <h3 className="text-2xl font-heading font-black uppercase mb-4 text-accent-premium" dangerouslySetInnerHTML={{ __html: story.title }} />
                                <p className="text-gray-600 leading-relaxed font-body text-base lg:text-lg border-t border-gray-100 pt-5">
                                    {story.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. NEW FEATURE: THE PERFECT PAIRING / LIFESTYLE SECTION */}
            <section className={`py-20 md:py-28 relative overflow-hidden ${p.bg}`}>
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
                        <div className="w-full md:w-1/2">
                            <h2 className={`text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter ${p.textMain} leading-tight mb-6`}>
                                Perfect<br/>Pairing
                            </h2>
                            <p className="text-lg md:text-xl font-body leading-relaxed text-gray-800 mb-8 bg-white/60 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/60 shadow-lg">
                                This isn't just a drink. It's an enhancer for your daily grind, your hardest workouts, and your longest nights out. Pair <strong className={p.textMain}>{product.name}</strong> with your favorite high-energy activities and let the natural electrolytes carry you through.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/80 backdrop-blur-md p-5 rounded-[1.5rem] text-center shadow-md border border-white/50">
                                    <h4 className="font-heading font-black uppercase text-lg mb-1 text-accent-premium">Pre-Workout</h4>
                                    <p className="text-xs md:text-sm text-gray-600">Pure organic energy boost.</p>
                                </div>
                                <div className="bg-white/80 backdrop-blur-md p-5 rounded-[1.5rem] text-center shadow-md border border-white/50">
                                    <h4 className="font-heading font-black uppercase text-lg mb-1 text-accent-premium">Post-Party</h4>
                                    <p className="text-xs md:text-sm text-gray-600">Immediate hydration fix.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 min-h-[400px] md:min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-white/30 backdrop-blur-md border border-white/60 flex flex-col items-center justify-center group p-10 text-center">
                            <div className={`absolute inset-0 opacity-40 mix-blend-multiply ${p.bg} transition-opacity group-hover:opacity-60 duration-500`} />
                            <div className={`absolute w-full h-full blur-[80px] ${p.blob} animate-pulse rounded-full opacity-50`} />
                            
                            <h3 className={`relative z-10 text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase leading-tight ${p.textMain} mix-blend-color-burn drop-shadow-md mb-6`}>
                                LIVE<br/>YOUR<br/>MIX
                            </h3>
                            <p className="relative z-10 text-gray-800 font-body text-base lg:text-lg max-w-sm bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50 font-bold">
                                Crafted specifically to replenish your mind and body without the crash. Hydration tailored to your intensity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. INGREDIENTS & NUTRITION SECTION */}
            <section className={`py-20 md:py-32 bg-gray-50 relative overflow-hidden`}>
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter text-accent-premium"
                        >
                            The Math
                        </motion.h2>
                        <p className="text-xl text-gray-500 font-body mt-4">Pure transparency. Zero secrets.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Ingredients */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="w-full flex flex-col"
                        >
                            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] h-full border border-gray-100 relative overflow-hidden group">
                                <div className={`absolute top-0 left-0 w-2 h-full ${p.btnBg}`} />
                                <h3 className="text-3xl font-heading font-black uppercase mb-6 text-accent-premium">What's Inside</h3>
                                <p className="font-bold mb-4 uppercase tracking-widest text-sm text-gray-400">Ingredient Profile</p>
                                <div className="font-body text-gray-700 leading-relaxed text-lg bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    {product.ingredients}
                                </div>
                            </div>
                        </motion.div>

                        {/* Nutrition */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="w-full flex flex-col"
                        >
                            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden h-full">
                                <div className={`p-6 md:p-8 ${p.btnBg} text-white flex justify-between items-center relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                                    <span className="relative z-10 font-heading font-black uppercase tracking-widest text-lg">Nutrition Facts</span>
                                    <span className="relative z-10 font-heading font-bold uppercase tracking-widest text-sm opacity-80">% RDA</span>
                                </div>
                                <div className="divide-y divide-gray-100 font-body">
                                    {product.nutrition.map((item, index) => (
                                        <motion.div 
                                            key={index} 
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + (index * 0.1) }}
                                            viewport={{ once: true }}
                                            className="p-5 md:p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-bold text-base md:text-lg text-accent-premium">{item.label}</span>
                                            <div className="flex gap-4 md:gap-8 text-right items-center">
                                                <span className="text-gray-500 w-20 md:w-24 text-base md:text-lg">{item.value}</span>
                                                <span className={`font-black w-12 md:w-16 text-lg md:text-xl ${p.textMain}`}>{item.rda}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <CTASection />
            <Footer />
        </main>
    );
}
