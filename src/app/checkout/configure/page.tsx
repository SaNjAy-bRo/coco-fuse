"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFlavor, FLAVORS, FlavorID } from "@/context/FlavorContext";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

const PACK_OPTIONS = [
    { size: 3, label: "Starter Pack", price: 9.99, bestValue: false },
    { size: 6, label: "Half Case", price: 16.99, bestValue: false },
    { size: 12, label: "Full Case", price: 29.99, bestValue: true }
];

function ConfigureContent() {
    const { flavorData: defaultFlavor } = useFlavor();
    const searchParams = useSearchParams();
    const router = useRouter();
    const flavorQuery = searchParams.get("flavor") as FlavorID;
    const flavorData = flavorQuery && FLAVORS[flavorQuery] ? FLAVORS[flavorQuery] : defaultFlavor;

    const [selectedPack, setSelectedPack] = useState(12);

    const handleContinue = () => {
        router.push(`/checkout?flavor=${flavorData?.id}&pack=${selectedPack}`);
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
                    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-white rounded-[3rem] relative flex items-center justify-center border border-gray-100 shadow-[inset_0_2px_15px_rgba(0,0,0,0.02)] overflow-hidden">
                        <div className="absolute w-[180%] h-[180%] top-[0%] lg:top-[-10%] pointer-events-none drop-shadow-2xl">
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
                            {PACK_OPTIONS.map((pack) => (
                                <div 
                                    key={pack.size} 
                                    onClick={() => setSelectedPack(pack.size)}
                                    className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all flex items-center justify-between ${selectedPack === pack.size ? 'border-accent-premium bg-gray-50 shadow-md transform scale-[1.02]' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    {pack.bestValue && (
                                        <div className="absolute -top-3 left-6 bg-[#39FF14] text-black text-[10px] sm:text-xs font-heading font-black uppercase tracking-widest px-3 py-1 rounded-full border border-black/10 shadow-sm z-10">
                                            Best Value
                                        </div>
                                    )}
                                    <div className="flex items-center gap-4 relative z-0">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${selectedPack === pack.size ? 'border-accent-premium' : 'border-gray-300'}`}>
                                            {selectedPack === pack.size && <div className="w-3 h-3 bg-accent-premium rounded-full" />}
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-black uppercase text-xl">{pack.size}-Pack</h3>
                                            <p className="text-gray-500 text-sm font-body">{pack.label}</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tighter">${pack.price}</div>
                                </div>
                            ))}
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
