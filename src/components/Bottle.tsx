"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useGLTF } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: { mesh_0: THREE.Mesh };
    materials: {};
};

export default function Bottle({ 
    scrollY, 
    vh = 0, 
    labelPath = "/assets/label_full.png", 
    liquidColor = "#f97316", // kept for context of flavor changes, but we use it for cap
    capColor = "#39FF14",
    scaleMultiplier = 1
}: { 
    scrollY?: MotionValue<number>, 
    vh?: number,
    labelPath?: string,
    liquidColor?: string,
    capColor?: string,
    scaleMultiplier?: number
}) {
    const groupRef = useRef<THREE.Group>(null);

    const { nodes } = useGLTF('/Meshy_AI_Clear_plastic_water_b_0402103114_texture.glb') as unknown as GLTFResult;

    const mangoTex = useTexture("/assets/label_full.png");
    const watermelonTex = useTexture("/assets/watermelon_label_extracted.png");
    const chiliTex = useTexture("/assets/chili_label_extracted.png");

    const textureMap = useMemo(() => ({
        "/assets/label_full.png": mangoTex,
        "/assets/watermelon_label_extracted.png": watermelonTex,
        "/assets/chili_label_extracted.png": chiliTex
    }), [mangoTex, watermelonTex, chiliTex]);

    const state = useRef({
        prevTexture: textureMap[labelPath as keyof typeof textureMap] || mangoTex,
        currTexture: textureMap[labelPath as keyof typeof textureMap] || mangoTex,
        transition: 1, 
        prevCap: new THREE.Color(capColor),
        currCap: new THREE.Color(capColor)
    });

    useEffect(() => {
        const nextTex = textureMap[labelPath as keyof typeof textureMap] || mangoTex;
        if (nextTex !== state.current.currTexture) {
            state.current.prevTexture = state.current.currTexture;
            state.current.currTexture = nextTex;
            state.current.transition = 0;
            
            state.current.prevCap.copy(state.current.currCap);
            state.current.currCap.set(capColor);
        }
    }, [labelPath, capColor, textureMap, mangoTex]);

    useMemo(() => {
        [mangoTex, watermelonTex, chiliTex].forEach(tex => {
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.flipY = true; // Use default three.js convention to fix upside down
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.anisotropy = 16; // Max anisotropic filtering for crisp labels at all angles
            tex.generateMipmaps = true;
            tex.needsUpdate = true;
        });
    }, [mangoTex, watermelonTex, chiliTex]);

    const bounds = useMemo(() => {
        if (!nodes.mesh_0) return { min: -1, max: 1 };
        nodes.mesh_0.geometry.computeBoundingBox();
        const box = nodes.mesh_0.geometry.boundingBox;
        if (box) return { min: box.min.y, max: box.max.y };
        return { min: -1, max: 1 };
    }, [nodes]);

    const totalHeight = bounds.max - bounds.min;
    const labelYMin = bounds.min + totalHeight * 0.01; // LOWERED to increase label down
    const labelYMax = bounds.min + totalHeight * 0.71;
    const capThreshold = bounds.min + totalHeight * 0.917; // top 14% is cap

    // Advanced Label Material using dynamic cylindrical unwrapping on the AI mesh
    const wrapperMaterial = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            roughness: 0.2,
            metalness: 0.1,
            envMapIntensity: 1.5,
            transparent: true,
            side: THREE.DoubleSide
        });
        
        mat.onBeforeCompile = (shader) => {
            mat.userData.shader = shader;
            shader.uniforms.tex1 = { value: state.current.prevTexture };
            shader.uniforms.tex2 = { value: state.current.currTexture };
            shader.uniforms.mixRatio = { value: 1.0 };
            
            shader.vertexShader = `
                varying vec3 vLocalPos;
            ` + shader.vertexShader;
            
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                vLocalPos = position;
                `
            );
            
            shader.fragmentShader = `
                uniform sampler2D tex1;
                uniform sampler2D tex2;
                uniform float mixRatio;
                varying vec3 vLocalPos;
            ` + shader.fragmentShader;
            
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <map_fragment>',
                `
                float localY = vLocalPos.y; 
                float yMin = ${labelYMin.toFixed(5)};
                float yMax = ${labelYMax.toFixed(5)};
                
                // Perfectly clip exactly where the label ends top/bottom
                if (localY < yMin || localY > yMax) discard;
                
                // Cylindrical Unwrapping of the raw AI Mesh
                // atan returns values between -PI and PI
                // Using (vLocalPos.x, vLocalPos.z) reads text normally left-to-right
                float angle = atan(vLocalPos.x, vLocalPos.z); 
                float u = angle / (2.0 * 3.14159265359) + 0.5;
                float v = (localY - yMin) / (yMax - yMin);
                
                vec2 cylUv = vec2(u, v);
                
                vec4 c1 = texture2D(tex1, cylUv);
                vec4 c2 = texture2D(tex2, cylUv);
                vec4 texelColor = mix(c1, c2, mixRatio);
                diffuseColor *= texelColor;
                `
            );
        };
        return mat;
    }, [labelYMin, labelYMax]);

    const capMaterial = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({ 
            roughness: 0.8, 
            metalness: 0.1, 
            envMapIntensity: 1.0, // crucial for it not to be completely black!
            color: state.current.currCap
        });
        mat.onBeforeCompile = (shader) => {
            mat.userData.shader = shader;
            
            shader.vertexShader = `
                varying vec3 vLocalPosCap;
            ` + shader.vertexShader;
            
            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                vLocalPosCap = position;
                `
            );
            
            shader.fragmentShader = `
                varying vec3 vLocalPosCap;
            ` + shader.fragmentShader;
            
            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <color_fragment>',
                `
                #include <color_fragment>
                float cThresh = ${capThreshold.toFixed(5)};
                if (vLocalPosCap.y < cThresh) discard;
                `
            );
        };
        return mat;
    }, [capThreshold]);

    const idleAngle = useRef(0);
    const lockedTarget = useRef({ active: false, start: 0, target: 0 });

    // Tweak this value if the front of the label is physically offset on the texture.
    const FRONT_ANGLE_OFFSET = -Math.PI / 0.7;

    useFrame((_, delta) => {
        if (state.current.transition < 1) {
            state.current.transition = Math.min(state.current.transition + delta * 2, 1); 
            
            if (wrapperMaterial && wrapperMaterial.userData.shader) {
                const shader = wrapperMaterial.userData.shader;
                shader.uniforms.tex1.value = state.current.prevTexture;
                shader.uniforms.tex2.value = state.current.currTexture;
                shader.uniforms.mixRatio.value = state.current.transition;
            }
            if (capMaterial) {
                capMaterial.color.copy(state.current.prevCap).lerp(state.current.currCap, state.current.transition);
            }
        }

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
                const baseTarget = THREE.MathUtils.lerp(lockedTarget.current.start, lockedTarget.current.target + FRONT_ANGLE_OFFSET, heroProgress);
                
                if (state.current.transition < 1) {
                    const t = state.current.transition; 
                    const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; 
                    groupRef.current.rotation.y = baseTarget + (easeT * Math.PI * 2);
                } else {
                    groupRef.current.rotation.y = baseTarget;
                }

                if (heroProgress === 1) {
                    // Lock the bottle to perfectly face straight forward. No wobbling around X and Z!
                    groupRef.current.rotation.x = 0;
                    groupRef.current.rotation.z = 0;
                }
            }

            if (heroProgress < 1) {
                groupRef.current.rotation.x = (1 - heroProgress) * Math.sin(heroProgress * Math.PI) * 0.2;
                groupRef.current.rotation.z = (1 - heroProgress) * Math.cos(heroProgress * Math.PI) * 0.1;
            }
        } else if (groupRef.current) {
            // Fallback for static sections (like Flavor Showcase) where no scrollY is passed!
            // This locks them instantly to the same front-facing alignment you manually set.
            groupRef.current.rotation.y = FRONT_ANGLE_OFFSET;
            groupRef.current.rotation.x = 0;
            groupRef.current.rotation.z = 0;
        }
    });

    const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? (window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) : false);

    useEffect(() => {
        const checkMobile = () => {
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsMobile(window.innerWidth < 768 || isTouch);
        };
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // The default mobile scale is 3.2 for the Hero section. We multiply by scaleMultiplier for other sections.
    const baseScale = (isMobile ? 3.2 : 2.6) * scaleMultiplier;

    if (!nodes.mesh_0) return null;

    return (
        <group ref={groupRef} scale={[baseScale, baseScale, baseScale]} position={[0, -0.5, 0]}>
            {/* 1. Clear Plastic Base */}
            <mesh geometry={nodes.mesh_0.geometry} renderOrder={1}>
                {/* 
                  Very clear transparent plastic.
                  Pink tinting was removed. Liquid is removed.
                */}
                <meshPhysicalMaterial 
                    roughness={0.15} 
                    metalness={0.1} 
                    transmission={0.45} // Lowered so it doesn't completely disappear into the background
                    clearcoat={1.0}
                    clearcoatRoughness={0.15}
                    color="#d6edff" // A subtle icy blue tint to help it separate from standard yellow/red backgrounds
                    envMapIntensity={3.0} // Massive boost to environment reflections so the edges and curves pop!
                    ior={1.52}
                    thickness={1.5} 
                    opacity={0.85}
                    transparent={true} 
                    side={THREE.DoubleSide} 
                />
            </mesh>

            {/* 2. Seamless Smooth Wrap directly hugging the bottle mesh */}
            <mesh geometry={nodes.mesh_0.geometry} scale={[1.015, 1.0, 1.015]} renderOrder={2}>
                <primitive object={wrapperMaterial} attach="material" />
            </mesh>

            {/* 3. The Cap Mask */}
            <mesh geometry={nodes.mesh_0.geometry} scale={[1.002, 1.002, 1.002]} renderOrder={3}>
                <primitive object={capMaterial} attach="material" />
            </mesh>
        </group>
    );
}

useGLTF.preload('/Meshy_AI_Clear_plastic_water_b_0402103114_texture.glb');
