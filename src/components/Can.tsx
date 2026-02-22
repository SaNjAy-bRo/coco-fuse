"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Can({ scrollY }: { scrollY: number }) {
    const groupRef = useRef<THREE.Group>(null);

    // Load the label texture
    const texture = useTexture("/assets/label_full.png");

    // 1. Center the texture processing origin.
    texture.center.set(0.5, 0.5);

    // 2. Mathematically spin the texture 180 degrees to fix upside-down.
    texture.rotation = Math.PI;

    // 3. To fix horizontal mirroring, we can dynamically invert the X repeat scale
    texture.repeat.set(-1, 1);

    // Ensure accurate color reading and wrapping constraints
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;

    useFrame((state) => {
        if (groupRef.current) {
            // Rotate the can continuously slowly
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.2 + (scrollY * Math.PI * 2);

            // Float up and down slightly
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;

            // Tilt based on scroll
            groupRef.current.rotation.x = Math.sin(scrollY * Math.PI) * 0.2;
            groupRef.current.rotation.z = Math.cos(scrollY * Math.PI) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* NO HACKS ON THE MESH! Let the texture matrix adjustments above do the work. */}
            {/* The initial PI/2 rotates the cylinder so the mascot sits directly front and center. */}
            <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                {/* Tin Can Cylinder: radiusTop, radiusBottom, height, radialSegments */}
                <cylinderGeometry args={[1.2, 1.2, 3.5, 64]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Top and Bottom silver rims dynamically pinned perfectly to the height of the cylinder (3.5 / 2 = 1.75) */}
            <mesh position={[0, 1.75, 0]}>
                <cylinderGeometry args={[1.22, 1.22, 0.1, 64]} />
                <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -1.75, 0]}>
                <cylinderGeometry args={[1.22, 1.22, 0.1, 64]} />
                <meshStandardMaterial color="#e5e7eb" metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
}
