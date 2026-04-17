"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function SubscribePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        // Check if user already dismissed or subscribed in this session
        const alreadyDismissed = sessionStorage.getItem("cocofuse_popup_dismissed");
        if (alreadyDismissed) return;

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10000); // Show after 10 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setDismissed(true);
        sessionStorage.setItem("cocofuse_popup_dismissed", "true");
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && email.trim()) {
            setSubmitting(true);
            try {
                const res = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email }),
                });

                if (res.ok) {
                    setSubscribed(true);
                    sessionStorage.setItem("cocofuse_popup_dismissed", "true");
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 3000);
                }
            } catch (error) {
                console.error("Subscription failed:", error);
            } finally {
                setSubmitting(false);
            }
        }
    };

    if (dismissed && !isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop — transparent click-to-dismiss layer, no blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9990]"
                        onClick={handleClose}
                    />

                    {/* Popup Card — slides in from right on desktop, bottom on mobile */}
                    <motion.div
                        initial={{ x: "110%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "110%", opacity: 0 }}
                        transition={{ type: "spring", damping: 22, stiffness: 200, mass: 0.8 }}
                        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px]"
                    >
                        <div className="bg-[#111111] rounded-[2rem] border-4 border-[#111111] shadow-[8px_8px_0px_#39FF14] overflow-hidden relative">
                            
                            {/* Glow accent */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7ED956] via-[#3AB6FD] to-[#39FF14]" />
                            
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-20"
                                aria-label="Close popup"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>

                            <div className="p-6 sm:p-8">
                                {subscribed ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center text-center py-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", delay: 0.1 }}
                                        >
                                            <CheckCircle2 className="w-16 h-16 text-[#39FF14] mb-4" />
                                        </motion.div>
                                        <h3 className="text-2xl font-heading font-black italic uppercase tracking-tight text-white mb-2">
                                            You&apos;re In! 🎉
                                        </h3>
                                        <p className="text-gray-400 text-sm font-body">
                                            Get ready for exclusive drops & deals.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        {/* Header */}
                                        <div className="flex items-start gap-3 mb-5">
                                            <div className="shrink-0 w-12 h-12 bg-[#39FF14]/10 rounded-2xl flex items-center justify-center border border-[#39FF14]/20">
                                                <Sparkles className="w-6 h-6 text-[#39FF14]" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-heading font-black italic uppercase tracking-tight text-white leading-tight">
                                                    Don&apos;t Miss <span className="text-[#39FF14]">The Drop</span>
                                                </h3>
                                                <p className="text-gray-400 text-xs font-body mt-1 leading-relaxed">
                                                    Subscribe for exclusive deals, early access & new flavor alerts.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="w-full px-5 py-3.5 bg-white/8 border-2 border-white/10 rounded-xl text-white font-body text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#7ED956]/40 focus:bg-white/10 transition-all"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Your Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full px-5 py-3.5 bg-white/8 border-2 border-white/10 rounded-xl text-white font-body text-sm placeholder:text-gray-500 focus:outline-none focus:border-[#3AB6FD]/40 focus:bg-white/10 transition-all"
                                            />
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full mt-1 px-6 py-3.5 bg-[#39FF14] text-[#111111] rounded-xl font-heading font-black italic uppercase tracking-widest text-sm border-2 border-[#111111] shadow-[3px_3px_0px_#111111] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#111111] active:translate-y-0 active:shadow-[0px_0px_0px_#111111] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group"
                                            >
                                                {submitting ? "Subscribing..." : "Get Better Deals"}
                                                {!submitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                            </button>
                                        </form>

                                        {/* Privacy note */}
                                        <p className="text-[10px] text-gray-600 text-center mt-4 font-body">
                                            No spam, ever. Unsubscribe anytime. <a href="/privacy" className="underline hover:text-gray-400 transition-colors">Privacy Policy</a>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
