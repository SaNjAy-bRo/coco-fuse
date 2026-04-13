"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFlavor, FLAVORS, FlavorID } from "@/context/FlavorContext";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

const PACK_SIZE = 6;
const PACK_PRICE = 300;

function ConfigureContent() {
    const { flavorData: defaultFlavor } = useFlavor();
    const searchParams = useSearchParams();
    const router = useRouter();
    const flavorQuery = searchParams.get("flavor") as FlavorID;
    const flavorData = flavorQuery && FLAVORS[flavorQuery] ? FLAVORS[flavorQuery] : defaultFlavor;

    const [quantity, setQuantity] = useState(1);

    const handleContinue = () => {
        router.push(`/checkout?flavor=${flavorData?.id}&pack=${quantity}`);
    };

    if (!flavorData) return null;

    return (
        <main className="min-h-screen bg-primary-white py-24 md:py-32 font-body text-accent-premium relative overflow-hidden">
            {/* aesthetics */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none -translate-y-1/2 translate-x-1/2`} style={{ backgroundColor: flavorData.liquid }} />
            
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <Link href={`/products/${flavorData.id}`} className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-widest text-sm mb-10 hover:opacity-60 transition-opacity bg-white/60 backdrop-blur-md px-5 py-3 rounded-full shadow-sm border border-gray-100">
                    <ArrowLeft className="w-5 h-5" /> Back to Flavor
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Left: 3D Render Big */}
                    <div className="w-full h-[450px] md:h-[550px] lg:h-[650px] bg-white rounded-[3rem] relative flex items-center justify-center border border-gray-100 shadow-[inset_0_2px_15px_rgba(0,0,0,0.02)]">
                        <div className="absolute inset-0 pointer-events-none drop-shadow-2xl">
                            <Scene labelPath={flavorData.label} liquidColor={flavorData.liquid} capColor={flavorData.cap} />
                        </div>
                    </div>

                    {/* Right: Selection */}
                    <div className="flex flex-col gap-6 lg:pl-4">
                        <div className="inline-block px-4 py-1.5 bg-gray-100 rounded-full font-heading font-black uppercase tracking-widest text-[10px] md:text-xs mb-2 text-accent-premium w-max border border-gray-200">
                            Step 2 of 3
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black uppercase tracking-tighter leading-none mb-2">Build Your<br className="hidden md:block"/> Loadout</h1>
                        <p className="text-gray-500 font-body text-lg mb-4 leading-relaxed max-w-md">Select your preferred case quantity for <strong className="text-black">{flavorData.name}</strong>. Need a quick restock or a full hydration arsenal?</p>
                        
                        <div className="flex flex-col gap-4">
                            <div className={`relative p-6 rounded-2xl border-2 border-accent-premium bg-gray-50 shadow-md flex flex-col gap-5`}>
                                <div className="absolute -top-3 left-6 bg-[#39FF14] text-black text-[10px] sm:text-xs font-heading font-black uppercase tracking-widest px-3 py-1 rounded-full border border-black/10 shadow-sm z-10">
                                    Pack of {PACK_SIZE}
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col">
                                        <h3 className="font-heading font-black uppercase text-xl md:text-2xl text-accent-premium leading-tight">{PACK_SIZE} Bottles</h3>
                                        <p className="text-gray-500 text-sm font-body mt-1">Standard Loadout</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tighter text-accent-premium">₹{PACK_PRICE}</div>
                                        <div className="text-[10px] md:text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-full">(₹50 / Bottle)</div>
                                    </div>
                                </div>
                                
                                {/* Quantity Controls */}
                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-200">
                                    <span className="font-heading font-black uppercase text-xs text-gray-400 tracking-widest">Quantity:</span>
                                    <div className="flex items-center bg-white border border-gray-200 rounded-full overflow-hidden shadow-sm">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-12 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                                        >
                                            <span className="text-xl font-bold leading-none mb-1">-</span>
                                        </button>
                                        <div className="w-10 h-10 flex items-center justify-center font-heading font-black text-lg text-accent-premium bg-gray-50">
                                            {quantity}
                                        </div>
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-12 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                                        >
                                            <span className="text-xl font-bold leading-none mb-1">+</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button onClick={handleContinue} className="mt-6 w-full bg-accent-premium text-white py-6 rounded-full font-heading font-black uppercase tracking-widest text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl">
                            Proceed to Shipping <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default function ConfigurePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-primary-white" />}>
            <ConfigureContent />
        </Suspense>
    );
}
