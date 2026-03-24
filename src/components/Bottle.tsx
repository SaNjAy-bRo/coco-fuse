"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

export default function Bottle({ 
    scrollY, 
    vh = 0, 
    labelPath = "/assets/label_full.png", 
    liquidColor = "#f97316",
    capColor = "#39FF14"
}: { 
    scrollY?: MotionValue<number>, 
    vh?: number,
    labelPath?: string,
    liquidColor?: string,
    capColor?: string
}) {
    const groupRef = useRef<THREE.Group>(null);
    const wrapperRef = useRef<THREE.Mesh>(null);
    const liquidRef = useRef<THREE.Mesh>(null);
    const capRef1 = useRef<THREE.Mesh>(null);
    const capRef2 = useRef<THREE.Mesh>(null);

    // Load all textures upfront for zero-latency switching
    const mangoTex = useTexture("/assets/label_full.png");
    const watermelonTex = useTexture("/assets/watermelon_label_extracted.png");
    const chiliTex = useTexture("/assets/chili_label_extracted.png");

    const textureMap = useMemo(() => ({
        "/assets/label_full.png": mangoTex,
        "/assets/watermelon_label_extracted.png": watermelonTex,
        "/assets/chili_label_extracted.png": chiliTex
    }), [mangoTex, watermelonTex, chiliTex]);

    // Internal state for smoothing color and texture transitions
    const state = useRef({
        prevTexture: textureMap[labelPath as keyof typeof textureMap] || mangoTex,
        currTexture: textureMap[labelPath as keyof typeof textureMap] || mangoTex,
        transition: 1, // 0 to 1
        prevLiquid: new THREE.Color(liquidColor),
        currLiquid: new THREE.Color(liquidColor),
        prevCap: new THREE.Color(capColor),
        currCap: new THREE.Color(capColor)
    });

    useEffect(() => {
        const nextTex = textureMap[labelPath as keyof typeof textureMap] || mangoTex;
        if (nextTex !== state.current.currTexture) {
            state.current.prevTexture = state.current.currTexture;
            state.current.currTexture = nextTex;
            state.current.transition = 0;
            
            state.current.prevLiquid.copy(state.current.currLiquid);
            state.current.currLiquid.set(liquidColor);
            
            state.current.prevCap.copy(state.current.currCap);
            state.current.currCap.set(capColor);
        }
    }, [labelPath, liquidColor, capColor, textureMap, mangoTex]);

    // Configure textures
    useMemo(() => {
        [mangoTex, watermelonTex, chiliTex].forEach(tex => {
            tex.center.set(0.5, 0.5);
            tex.rotation = Math.PI;
            tex.repeat.set(-1, 1);
            tex.flipY = false;
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        });
    }, [mangoTex, watermelonTex, chiliTex]);

    // Custom Shader for Cross-Fade
    const wrapperMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                tex1: { value: state.current.prevTexture },
                tex2: { value: state.current.currTexture },
                mixRatio: { value: 1.0 },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = vec2(uv.x, 1.0 - uv.y);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tex1;
                uniform sampler2D tex2;
                uniform float mixRatio;
                varying vec2 vUv;
                void main() {
                    vec4 c1 = texture2D(tex1, vUv);
                    vec4 c2 = texture2D(tex2, vUv);
                    gl_FragColor = mix(c1, c2, mixRatio);
                }
            `,
            side: THREE.DoubleSide
        });
    }, []);

    const { bottlePoints, wrapperPoints, liquidPoints } = useMemo(() => {
        const getBottlePoints = () => {
            const p: THREE.Vector2[] = [];
            const pushP = (x: number, y: number) => p.push(new THREE.Vector2(x, y));
            pushP(0, -2.6); pushP(0.8, -2.6);
            for(let i=1; i<=10; i++) {
                const angle = (i/10) * Math.PI/2;
                pushP(0.8 + 0.3 * Math.sin(angle), -2.6 + 0.2 * (1 - Math.cos(angle)));
            }
            for(let i=1; i<=10; i++) {
                const t = i/10;
                pushP(1.1 - 0.08 * t, -2.4 + 1.9 * t);
            }
            for(let i=1; i<=10; i++) {
                const t = i/10;
                pushP(1.02 + 0.18 * t, -0.5 + 1.9 * t);
            }
            for(let i=1; i<=15; i++) {
                const t = i/15;
                pushP(0.65 + 0.55 * (0.5 + 0.5 * Math.cos(t * Math.PI)), 1.4 + 0.9 * t);
            }
            pushP(0.65, 2.5);
            pushP(0.7, 2.5); pushP(0.7, 2.65); pushP(0.65, 2.65);
            pushP(0.65, 3.0); pushP(0, 3.0);
            return p;
        };

        const getWrapperPoints = () => {
            const p: THREE.Vector2[] = [];
            const pushP = (x: number, y: number) => p.push(new THREE.Vector2(x + 0.015, y));
            const STEPS = 30;
            const startY = -2.1;
            const endY = 1.45;
            for(let i=0; i<=STEPS; i++) {
                const t = i/STEPS;
                const y = startY + (endY - startY) * t;
                let x = 0;
                if (y < -0.5) {
                    const segT = (y + 2.4) / 1.9;
                    x = 1.1 - 0.08 * Math.max(0, segT);
                } else if (y < 1.4) {
                    const segT = (y + 0.5) / 1.9;
                    x = 1.02 + 0.18 * segT;
                } else {
                    const segT = (y - 1.4) / 0.9;
                    x = 0.65 + 0.55 * (0.5 + 0.5 * Math.cos(segT * Math.PI));
                }
                pushP(x, y);
            }
            return p;
        };

        const getLiquidPoints = () => {
            const p: THREE.Vector2[] = [];
            const pushP = (x: number, y: number) => p.push(new THREE.Vector2(x * 0.96, y));
            pushP(0, -2.55); pushP(0.8, -2.55);
            for(let i=1; i<=10; i++) {
                const angle = (i/10) * Math.PI/2;
                pushP(0.8 + 0.3 * Math.sin(angle), -2.6 + 0.2 * (1 - Math.cos(angle)));
            }
            for(let i=1; i<=10; i++) {
                pushP(1.1 - 0.08 * (i/10), -2.4 + 1.9 * (i/10));
            }
            for(let i=1; i<=10; i++) {
                pushP(1.02 + 0.18 * (i/10), -0.5 + 1.9 * (i/10));
            }
            for(let i=1; i<=10; i++) {
                const t = i/10;
                pushP(0.65 + 0.55 * (0.5 + 0.5 * Math.cos(t * Math.PI)), 1.4 + 0.7 * t);
            }
            pushP(0, 2.1);
            return p;
        };

        return { bottlePoints: getBottlePoints(), wrapperPoints: getWrapperPoints(), liquidPoints: getLiquidPoints() };
    }, []);

    const idleAngle = useRef(0);
    const lockedTarget = useRef({ active: false, start: 0, target: 0 });

    useFrame((_, delta) => {
        // Handle Material Transitions
        if (state.current.transition < 1) {
            state.current.transition = Math.min(state.current.transition + delta * 2, 1); // 0.5s transition
            if (wrapperMaterial) {
                wrapperMaterial.uniforms.tex1.value = state.current.prevTexture;
                wrapperMaterial.uniforms.tex2.value = state.current.currTexture;
                wrapperMaterial.uniforms.mixRatio.value = state.current.transition;
            }
            
            if (liquidRef.current) {
                const mat = liquidRef.current.material as THREE.MeshStandardMaterial;
                mat.color.copy(state.current.prevLiquid).lerp(state.current.currLiquid, state.current.transition);
            }
            if (capRef1.current) {
                (capRef1.current.material as THREE.MeshStandardMaterial).color.copy(state.current.prevCap).lerp(state.current.currCap, state.current.transition);
            }
            if (capRef2.current) {
                (capRef2.current.material as THREE.MeshBasicMaterial).color.copy(state.current.prevCap).lerp(state.current.currCap, state.current.transition);
            }
        }

        // Handle Parallax & Rotation
        if (groupRef.current && scrollY && vh > 0) {
            const currentScroll = scrollY.get();
            const heroEnd = vh * 2;
            const heroProgress = Math.min(Math.max(currentScroll / heroEnd, 0), 1);

            if (heroProgress === 0) {
                const spinSpeed = state.current.transition < 1 ? 15 : 0.4;
                idleAngle.current += delta * spinSpeed;
                lockedTarget.current.active = false;
                groupRef.current.rotation.y = idleAngle.current;
            } else {
                if (!lockedTarget.current.active) {
                    lockedTarget.current.active = true;
                    lockedTarget.current.start = idleAngle.current;
                    const TWO_PI = Math.PI * 2;
                    const rem = idleAngle.current % TWO_PI;
                    let nextTarget = idleAngle.current - rem + TWO_PI;
                    if (nextTarget - idleAngle.current < Math.PI) nextTarget += TWO_PI;
                    lockedTarget.current.target = nextTarget;
                }
                groupRef.current.rotation.y = THREE.MathUtils.lerp(lockedTarget.current.start, lockedTarget.current.target, heroProgress);
            }

            groupRef.current.rotation.x = (1 - heroProgress) * Math.sin(heroProgress * Math.PI) * 0.2;
            groupRef.current.rotation.z = (1 - heroProgress) * Math.cos(heroProgress * Math.PI) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <group position={[0, -0.725, 0]}>
                {/* Clear Bottle */}
                <mesh>
                    <latheGeometry args={[bottlePoints, 64]} />
                    <meshPhysicalMaterial 
                        color="#ffffff" transparent opacity={0.2} roughness={0.08} 
                        metalness={0.15} transmission={0.98} thickness={0.7} envMapIntensity={2.0} 
                        clearcoat={1} clearcoatRoughness={0.1}
                    />
                </mesh>

                {/* Internal Liquid */}
                <mesh ref={liquidRef} position={[0, -0.05, 0]}>
                    <latheGeometry args={[liquidPoints, 64]} />
                    <meshStandardMaterial color={liquidColor} transparent opacity={0.88} roughness={0.05} metalness={0.1} />
                </mesh>

                {/* The Wrapper Shrink Sleeve */}
                <mesh ref={wrapperRef} rotation={[0, -Math.PI / 2, 0]} material={wrapperMaterial}>
                    <latheGeometry args={[wrapperPoints, 64]} />
                </mesh>

                {/* The Bottle Cap */}
                <mesh ref={capRef1} position={[0, 3.0, 0]}>
                    <cylinderGeometry args={[0.68, 0.68, 0.7, 50]} />
                    <meshStandardMaterial color={capColor} roughness={0.5} metalness={0.1} />
                </mesh>
                <mesh ref={capRef2} position={[0, 3.35, 0]}>
                    <cylinderGeometry args={[0.65, 0.68, 0.05, 50]} />
                    <meshBasicMaterial color={capColor} />
                </mesh>
            </group>
        </group>
    );
}
