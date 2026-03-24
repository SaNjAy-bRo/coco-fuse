"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type FlavorID = "mango" | "watermelon" | "basil";

export interface FlavorData {
    id: FlavorID;
    name: string;
    label: string;
    liquid: string;
    cap: string;
    accent: string;
    story: {
        morning: { title: string; desc: string };
        afternoon: { title: string; desc: string };
        evening: { title: string; desc: string };
    };
    nutrition: {
        label: string;
        value: string;
        rda: string;
    }[];
    ingredients: string;
}

export const FLAVORS: Record<FlavorID, FlavorData> = {
    mango: {
        id: "mango",
        name: "Mango Refresh",
        label: "/assets/label_full.png",
        liquid: "#f97316",
        cap: "#111111",
        accent: "text-accent-mango",
        story: {
            morning: { title: "Fuse Your <br /> Mornings.", desc: "Mango Delight + Coconut Water. A fresh, hydrating wake-up call to start your day right." },
            afternoon: { title: "Fuse Your <br /> Afternoons.", desc: "Tropical mango goodness for that post-lunch slump. Zero sugar, 100% natural energy." },
            evening: { title: "Fuse Your <br /> Socials.", desc: "The perfect mixer for your evening vibes. Vibrant, fruity, and designed for the night." }
        },
        nutrition: [
            { label: "Energy", value: "19.78 kcal", rda: "-" },
            { label: "Total Sugars", value: "4.0 g", rda: "-" },
            { label: "Vitamin C", value: "0.2 mg", rda: "21%" },
            { label: "Vitamin B3", value: "3 mg", rda: "41%" },
            { label: "Potassium", value: "150 mg", rda: "3%" },
            { label: "Sodium", value: "20 mg", rda: "1%" },
        ],
        ingredients: "Water, Coconut Powder (6%), Acidity Regulator (E330), Minerals (Potassium Chloride, Magnesium Sulphate), Natural Sweetener (INS960), Natural Mango Flavour, Vitamins (B3, B5, B6 and C)."
    },
    watermelon: {
        id: "watermelon",
        name: "Watermelon Cool",
        label: "/assets/watermelon_label_extracted.png",
        liquid: "#ff4d4d",
        cap: "#111111",
        accent: "text-[#ff4d4d]",
        story: {
            morning: { title: "Fuse Your <br /> Workout.", desc: "Watermelon + Coconut Water. The ultimate pre-session hydration to prime your muscles." },
            afternoon: { title: "Fuse Your <br /> Recovery.", desc: "Rapid electrolyte replenishment for those long active afternoons. Stay cool, stay fueled." },
            evening: { title: "Fuse Your <br /> Power.", desc: "Recharge after a high-output day. Keep the momentum going without the crash." }
        },
        nutrition: [
            { label: "Energy", value: "18.5 kcal", rda: "-" },
            { label: "Total Sugars", value: "3.8 g", rda: "-" },
            { label: "Citrulline", value: "100 mg", rda: "-" },
            { label: "Potassium", value: "220 mg", rda: "5%" },
            { label: "Sodium", value: "45 mg", rda: "2%" },
            { label: "Vitamin B6", value: "0.5 mg", rda: "80%" },
        ],
        ingredients: "Water, Coconut Powder (6%), Watermelon Extract, Acidity Regulator (E330), Minerals (Potassium Chloride), Amino Acids (L-Citrulline), Natural Sweetener, Vitamins (B6, B12)."
    },
    basil: {
        id: "basil",
        name: "Basil Chili Kick",
        label: "/assets/chili_label_extracted.png",
        liquid: "#cc0000",
        cap: "#111111",
        accent: "text-[#cc0000]",
        story: {
            morning: { title: "Fuse Your <br /> Focus.", desc: "Basil Chili + Coconut Water. A zingy neural spark to ignite your makers mindset." },
            afternoon: { title: "Fuse Your <br /> Flow.", desc: "Deep work companion. The perfect balance of hydration and a subtle spicy kick for clarity." },
            evening: { title: "Fuse Your <br /> Vision.", desc: "For the late-night creators. Stay sharp, stay hydrated, and keep the ideas firing." }
        },
        nutrition: [
            { label: "Energy", value: "20.1 kcal", rda: "-" },
            { label: "Total Sugars", value: "4.1 g", rda: "-" },
            { label: "Chili Extract", value: "5 mg", rda: "-" },
            { label: "Magnesium", value: "25 mg", rda: "6%" },
            { label: "Vitamin B12", value: "1.2 µg", rda: "50%" },
            { label: "Potassium", value: "140 mg", rda: "3%" },
        ],
        ingredients: "Water, Coconut Powder (6%), Basil Extract, Chili Oleoresin, Acidity Regulator (E330), Minerals (Magnesium Sulphate), Natural Sweetener, Vitamins (B3, B5, B12)."
    }
};

interface FlavorContextType {
    flavor: FlavorID;
    setFlavor: (id: FlavorID) => void;
    flavorData: FlavorData;
}

const FlavorContext = createContext<FlavorContextType | undefined>(undefined);

export function FlavorProvider({ children }: { children: ReactNode }) {
    const [flavor, setFlavorState] = useState<FlavorID>("mango");

    const setFlavor = (id: FlavorID) => {
        setFlavorState(id);
    };

    return (
        <FlavorContext.Provider value={{ flavor, setFlavor, flavorData: FLAVORS[flavor] }}>
            {children}
        </FlavorContext.Provider>
    );
}

export function useFlavor() {
    const context = useContext(FlavorContext);
    if (!context) {
        throw new Error("useFlavor must be used within a FlavorProvider");
    }
    return context;
}
