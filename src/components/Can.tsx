"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

export default function Can({ scrollY, vh = 0 }: { scrollY?: MotionValue<number>, vh?: number }) {
    const groupRef = useRef<THREE.Group>(null);

    // Load the label texture
    const baseTexture = useTexture("/assets/label_full.png");

    const texture = React.useMemo(() => {
        const tex = baseTexture.clone();
        // 1. Center the texture processing origin.
        tex.center.set(0.5, 0.5);

        // 2. Mathematically spin the texture 180 degrees to fix upside-down.
        tex.rotation = Math.PI;

        // 3. To fix horizontal mirroring, we can dynamically invert the X repeat scale
        tex.repeat.set(-1, 1);

        // Ensure accurate color reading and wrapping constraints
        tex.flipY = false;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.needsUpdate = true;

        return tex;
    }, [baseTexture]);

    const idleAngle = useRef(0);
    const lockedTarget = useRef({ active: false, start: 0, target: 0 });

    useFrame((state, delta) => {
        if (groupRef.current && scrollY && vh > 0) {
            const currentScroll = scrollY.get();
            const heroEnd = vh * 2;

            const heroProgress = Math.min(Math.max(currentScroll / heroEnd, 0), 1);

            if (heroProgress === 0) {
                // 1. Free, continuous idle spinning
                idleAngle.current += delta * 0.4;
                lockedTarget.current.active = false;
                groupRef.current.rotation.y = idleAngle.current;
            } else {
                // 2. Lock the current angle the exact moment they start scrolling down
                if (!lockedTarget.current.active) {
                    lockedTarget.current.active = true;
                    lockedTarget.current.start = idleAngle.current;

                    // We target the NEXT nearest multiple of 2PI (which is perfectly Front Facing).
                    const TWO_PI = Math.PI * 2;
                    const rem = idleAngle.current % TWO_PI;
                    let nextTarget = idleAngle.current - rem + TWO_PI;

                    // Add an extra spin if it's too close to allow a smooth, elegant deceleration buffer
                    if (nextTarget - idleAngle.current < Math.PI) {
                        nextTarget += TWO_PI;
                    }
                    lockedTarget.current.target = nextTarget;
                }

                // 3. Linearly Lerp to the perfect locked angle exactly mirroring their scroll progress!
                groupRef.current.rotation.y = THREE.MathUtils.lerp(
                    lockedTarget.current.start,
                    lockedTarget.current.target,
                    heroProgress
                );
            }

            // Optional tilt only active during the scroll transition
            const targetRotationX = (1 - heroProgress) * Math.sin(heroProgress * Math.PI) * 0.2;
            const targetRotationZ = (1 - heroProgress) * Math.cos(heroProgress * Math.PI) * 0.1;

            groupRef.current.rotation.x = targetRotationX;
            groupRef.current.rotation.z = targetRotationZ;
        }
    });

    return (
        <group ref={groupRef}>
            {/* The previous PI/2 angle exposed the Nutrition Facts to the camera. We reverse it to face the Monkey Logo. */}
            <mesh position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
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
