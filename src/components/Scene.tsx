"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { useScroll } from "framer-motion";
import Can from "./Can";

export default function Scene() {
    // Rely on framer-motion's seamless scroll hook to read values perfectly in sync with the page
    const { scrollYProgress } = useScroll();

    return (
        <div className="w-full h-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 10]} intensity={2} />
                <spotLight position={[-10, 10, 10]} intensity={1.5} angle={0.3} penumbra={1} color="#f97316" />
                <spotLight position={[10, -10, 10]} intensity={1} angle={0.3} penumbra={1} color="#4ade80" />

                <Suspense fallback={null}>
                    <Float
                        speed={2} // Animation speed, defaults to 1
                        rotationIntensity={1} // XYZ rotation intensity, defaults to 1
                        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                        floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
                    >
                        {/* We pass the MotionValue itself so the Can can read it in useFrame without React state lag */}
                        <Can scrollY={scrollYProgress} />
                    </Float>

                    <Environment preset="city" />
                    <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#f97316" />
                </Suspense>
            </Canvas>
        </div>
    );
}
