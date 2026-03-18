"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });
import { useFlavor, FLAVORS, FlavorID } from "@/context/FlavorContext";

function CheckoutContent() {
    const { flavorData: defaultFlavorData } = useFlavor();
    const searchParams = useSearchParams();
    const router = useRouter();
    const flavorQuery = searchParams.get("flavor") as FlavorID;
    const packQuery = searchParams.get("pack") || "12";
    const flavorData = (flavorQuery && FLAVORS[flavorQuery]) ? FLAVORS[flavorQuery] : defaultFlavorData;

    const packSize = parseInt(packQuery, 10);
    const getPrice = (size: number) => {
        if (size === 3) return 9.99;
        if (size === 6) return 16.99;
        return 29.99;
    };
    const subtotal = getPrice(packSize);
    const tax = Number((subtotal * 0.08).toFixed(2));
    const total = (subtotal + tax).toFixed(2);

    const [mounted, setMounted] = useState(false);

    // Ensure hydration mismatch doesn't occur with context
    useEffect(() => {
        setMounted(true);
    }, []);

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        cardNumber: "",
        expiry: "",
        cvc: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const InputField = ({ label, name, type = "text", placeholder, width = "w-full" }: any) => (
        <div className={`flex flex-col gap-2 ${width}`}>
            <label htmlFor={name} className="font-heading font-black uppercase tracking-widest text-[#0A0A0A] text-xs px-1">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={(formData as any)[name]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl font-body text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent-premium/20 focus:border-accent-premium transition-all shadow-sm"
                required
            />
        </div>
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to success route carrying the flavor id and pack size forward
        router.push(`/checkout/success?flavor=${flavorData.id}&pack=${packSize}`);
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-primary-white py-24 md:py-32 font-body relative overflow-hidden text-accent-premium">
            {/* Background elements for aesthetic */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-gray-200/50 -translate-y-1/2 translate-x-1/2 pointer-events-none`} />
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header Area */}
                <div className="mb-10 lg:mb-16">
                    <Link href={`/products/${flavorData.id}`} className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-widest text-sm mb-6 hover:opacity-60 transition-opacity bg-white/60 backdrop-blur-md px-5 py-3 rounded-full shadow-sm border border-gray-100">
                        <ArrowLeft className="w-5 h-5" /> Keep Shopping
                    </Link>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tighter">
                        Secure <span className="text-gray-400 font-bold block sm:inline">Checkout</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* LEFT COLUMN: Billing & Payment Information */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 flex flex-col gap-10"
                    >
                        {/* 1. Contact Information */}
                        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-gray-100 rounded-full text-accent-premium">
                                    <span className="font-heading font-black">1</span>
                                </div>
                                <h2 className="text-2xl font-heading font-black uppercase tracking-tight">Contact Details</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <InputField label="First Name" name="firstName" placeholder="John" />
                                <InputField label="Last Name" name="lastName" placeholder="Doe" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" />
                                <InputField label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                            </div>
                        </div>

                        {/* 2. Shipping Address */}
                        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-gray-100 rounded-full text-accent-premium">
                                    <span className="font-heading font-black">2</span>
                                </div>
                                <h2 className="text-2xl font-heading font-black uppercase tracking-tight">Shipping Address</h2>
                            </div>
                            
                            <div className="flex flex-col gap-6">
                                <InputField label="Street Address" name="address" placeholder="123 Hydration Blvd, Suite 100" />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputField label="City" name="city" placeholder="Los Angeles" />
                                    <InputField label="State / Province" name="state" placeholder="CA" />
                                    <InputField label="Zip Code" name="zip" placeholder="90001" />
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment Information */}
                        <div className="bg-gray-50/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-inner border border-gray-200">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-accent-premium rounded-full text-white">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-2xl font-heading font-black uppercase tracking-tight">Payment</h2>
                                </div>
                                <div className="flex gap-2 opacity-60">
                                    {/* Mock payment icons */}
                                    <div className="w-10 h-6 bg-gray-300 rounded" />
                                    <div className="w-10 h-6 bg-gray-300 rounded" />
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-6">
                                <InputField label="Card Number" name="cardNumber" placeholder="0000 0000 0000 0000" />
                                <div className="grid grid-cols-2 gap-6">
                                    <InputField label="Expiration Date" name="expiry" placeholder="MM/YY" />
                                    <InputField label="Security Code" name="cvc" placeholder="CVC" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5"
                    >
                        <div className="sticky top-32 bg-accent-premium text-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col">
                            
                            <h2 className="text-3xl font-heading font-black uppercase tracking-tighter mb-8 border-b border-white/10 pb-6 flex items-center justify-between">
                                Order Summary
                                <ShoppingBag className="w-6 h-6 opacity-50" />
                            </h2>

                            {/* Cart Items */}
                            <div className="flex items-center gap-6 mb-8 mt-2">
                                {/* Visual product thumbnail */}
                                <div className="w-28 h-32 sm:w-32 sm:h-40 bg-white rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden relative shadow-[inset_0_2px_15px_rgba(0,0,0,0.05)] shrink-0">
                                    <div className="absolute w-[160%] h-[160%] top-[-10%] pointer-events-none drop-shadow-lg">
                                        <Scene 
                                            labelPath={flavorData.label}
                                            liquidColor={flavorData.liquid}
                                            capColor={flavorData.cap}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 pl-2">
                                    <h4 className="font-heading font-black uppercase text-xl leading-tight">{flavorData.name}</h4>
                                    <p className="text-white/60 font-body text-sm mt-1">{packSize}-Pack Case</p>
                                    <div className="mt-3 font-heading font-black text-lg">${subtotal.toFixed(2)}</div>
                                </div>
                            </div>

                            {/* Calculations */}
                            <div className="flex flex-col gap-4 font-body border-y border-white/10 py-6 mb-8 text-white/80">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2">
                                        <Truck className="w-4 h-4" /> Shipping
                                    </span>
                                    <span className="font-bold text-[#39FF14] uppercase text-xs tracking-widest">Free</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Estimated Taxes</span>
                                    <span className="font-bold text-white">${tax.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Total Area */}
                            <div className="flex justify-between items-end mb-10">
                                <span className="font-heading font-black uppercase text-gray-400 tracking-widest text-sm mb-1">Total</span>
                                <span className="text-4xl lg:text-5xl font-heading font-black tracking-tighter">${total}</span>
                            </div>

                            {/* Checkout Button */}
                            <button type="submit" className="w-full bg-[#39FF14] text-[#0A0A0A] py-6 rounded-full font-heading font-black uppercase tracking-widest text-lg md:text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(57,255,20,0.3)] flex items-center justify-center gap-3">
                                Complete Order
                            </button>

                            <div className="mt-8 flex items-start gap-4 text-white/40 text-xs font-body leading-relaxed justify-center text-center">
                                <ShieldCheck className="w-5 h-5 shrink-0" />
                                <p>Guaranteed safe & secure checkout. By completing your order, you agree to our Terms of Service & Privacy Policy.</p>
                            </div>
                        </div>
                    </motion.div>

                </form>
            </div>
        </main>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-primary-white" />}>
            <CheckoutContent />
        </Suspense>
    );
}
