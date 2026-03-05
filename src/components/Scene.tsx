"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { MotionValue } from "framer-motion";
import Can from "./Can";

export default function Scene({ scrollY, vh }: { scrollY?: MotionValue<number>, vh?: number }) {
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
                        speed={2}
                        rotationIntensity={0} // Locked rotation to fulfill the "should not change angle" request
                        floatIntensity={0.5}
                        floatingRange={[-0.05, 0.05]} // Reduced floating bounce
                    >
                        <Can scrollY={scrollY} vh={vh} />
                    </Float>

                    <Environment preset="city" />
                    <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#f97316" />
                </Suspense>
            </Canvas>
        </div>
    );
}
