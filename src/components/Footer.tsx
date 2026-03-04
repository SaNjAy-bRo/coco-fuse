"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-accent-premium text-primary-white py-20 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-green via-primary-blue to-accent-mango" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-heading font-black italic tracking-tighter mb-4">
                        <span className="text-primary-green">COCO</span>
                        <span className="text-primary-blue">FUSE</span>
                    </h2>
                    <p className="text-xl md:text-2xl font-body font-light text-gray-300 max-w-2xl mx-auto">
                        The anti-soda. The anti-sugar. <span className="font-semibold text-accent-watermelon">The anti-boring.</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mb-16 border-t border-white/10 pt-12">
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-primary-green">Product</h4>
                        <a href="#flavours" className="text-gray-400 hover:text-white transition-colors">Flavours</a>
                        <a href="#formula" className="text-gray-400 hover:text-white transition-colors">Ingredients</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Nutrition</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-primary-blue">Brand</h4>
                        <a href="#story" className="text-gray-400 hover:text-white transition-colors">Our Story</a>
                        <a href="#founders" className="text-gray-400 hover:text-white transition-colors">Founders</a>
                        <a href="#manifesto" className="text-gray-400 hover:text-white transition-colors">Manifesto</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-accent-mango">Social</h4>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">TikTok</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-accent-watermelon">Legal</h4>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm border-t border-white/5 pt-8">
                    <p>© {new Date().getFullYear()} CocoFuse. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Clean hydration with attitude.</p>
                </div>
            </div>
        </footer>
    );
}
