"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Footer() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && email.trim()) {
            // TODO: Connect to actual newsletter API
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setName("");
                setEmail("");
            }, 4000);
        }
    };

    return (
        <footer className="bg-[#111111] text-primary-white pt-24 pb-12 relative overflow-hidden border-t-8 border-[#111111]">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-green via-primary-blue to-accent-mango" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-16 md:mb-24 w-full"
                >
                    <h2 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-heading font-black italic uppercase tracking-tighter leading-[0.85] mb-4 md:mb-6">
                        <span className="font-wedges not-italic tracking-normal text-[#7ED956]">COCO</span>
                        <span className="font-wedges not-italic tracking-normal text-[#3AB6FD]">FUSE.</span>
                    </h2>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-body font-medium text-white tracking-wide">
                        The anti-soda. The anti-sugar. <span className="text-[#E8314A] font-heading font-black italic uppercase">The anti-boring.</span>
                    </p>
                </motion.div>

                {/* ——— SUBSCRIBE SECTION ——— */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full max-w-2xl mb-16 md:mb-20"
                >
                    <div className="bg-white/5 backdrop-blur-md border-2 border-white/10 rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
                        {/* Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[200%] bg-primary-green/5 blur-[80px] pointer-events-none" />
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-heading font-black italic uppercase tracking-tight text-white mb-2">
                                Stay In The <span className="text-primary-green">Loop</span>
                            </h3>
                            <p className="text-gray-400 font-body text-sm md:text-base mb-8">
                                Subscribe for exclusive drops, better deals & insider access. No spam, just the good stuff.
                            </p>

                            {subscribed ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center justify-center gap-3 py-6"
                                >
                                    <CheckCircle2 className="w-8 h-8 text-primary-green" />
                                    <span className="text-white font-heading font-black italic uppercase tracking-wider text-lg">You&apos;re In! 🎉</span>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="flex-1 px-6 py-4 bg-white/10 border-2 border-white/15 rounded-full text-white font-body text-base placeholder:text-gray-500 focus:outline-none focus:border-primary-green/50 focus:bg-white/15 transition-all"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="flex-1 px-6 py-4 bg-white/10 border-2 border-white/15 rounded-full text-white font-body text-base placeholder:text-gray-500 focus:outline-none focus:border-primary-blue/50 focus:bg-white/15 transition-all"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto sm:self-center px-10 py-4 bg-[#39FF14] text-[#111111] rounded-full font-heading font-black italic uppercase tracking-widest text-sm md:text-base border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] active:translate-y-0 active:shadow-[0px_0px_0px_#111111] transition-all flex items-center justify-center gap-2 group"
                                    >
                                        Subscribe for Deals
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mb-16 border-t border-white/10 pt-12">
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-primary-green">Product</h4>
                        <a href="/#flavours" className="text-gray-400 hover:text-white transition-colors">Flavours</a>
                        <a href="/#formula" className="text-gray-400 hover:text-white transition-colors">Ingredients</a>
                        <a href="/products/mango" className="text-gray-400 hover:text-white transition-colors">Nutrition</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-primary-blue">Brand</h4>
                        <a href="/about#manifesto" className="text-gray-400 hover:text-white transition-colors">Our Story</a>
                        <a href="/about" className="text-gray-400 hover:text-white transition-colors">Founders</a>
                        <a href="/about#manifesto" className="text-gray-400 hover:text-white transition-colors">Manifesto</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-accent-mango">Social</h4>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-accent-watermelon">Legal</h4>
                        <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm border-t border-white/5 pt-8">
                    <p>© {new Date().getFullYear()} <span className="font-wedges not-italic whitespace-nowrap"><span className="text-[#7ED956]">COCO</span><span className="text-[#3AB6FD]">FUSE.</span></span> All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Clean hydration with attitude.</p>
                </div>
            </div>
        </footer>
    );
}
