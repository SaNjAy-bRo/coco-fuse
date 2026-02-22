"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="bg-black py-12 border-t border-white/10 relative z-20"
        >
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-yellow uppercase tracking-tighter">
                            COCO<br />FUSE.
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">Mango Refresh • Net Qty: 250ml</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm"
                    >
                        <div>
                            <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-wider">Manufactured By</h4>
                            <p className="text-gray-400">Pure Foods & Beverages</p>
                            <p className="text-gray-400">Atc 3, TTC Industrial Area, Mahape MIDC,</p>
                            <p className="text-gray-400">Navi Mumbai - 400710</p>
                            <p className="text-brand-orange mt-1 text-xs">FSSAI Lic No: 11525015000189</p>
                        </div>

                        <div>
                            <h4 className="font-bold text-white mb-2 uppercase text-xs tracking-wider">Marketed By</h4>
                            <p className="text-gray-400">RootUp Nutriments & Beverages LLP</p>
                            <p className="text-gray-400">15-A/1004 Happy Homes Residency,</p>
                            <p className="text-gray-400">Thane District, Maharashtra - 401107</p>
                            <p className="text-brand-orange mt-1 text-xs">FSSAI Lic No: 21526020000341</p>
                        </div>
                    </motion.div>

                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-500"
                >
                    <p>Customer Care: Miket@rootupfnb.com | +91 70216 39310</p>
                    <div className="flex gap-4 mt-4 md:mt-0 font-bold uppercase tracking-wider text-green-500">
                        <span>Make in India</span>
                        <span>100% Veg</span>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
}
