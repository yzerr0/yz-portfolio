"use client"
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes(){
    return (
        <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
            <Canvas className="z-0" shadows gl={{antialias:false}} dpr={[1, 1.5]} 
            camera={{position: [0, 0, 25], fov:30, near: 1, far: 40}}>
                <Suspense fallback={null}>
                    <Geometries />
                    <ContactShadows position={[0, -3.5, 0]} opacity={0.65} scale={40} blur={1} far={9}/>
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    )
}

function Geometries() {
    const geometries = [
        {
            position: [0, 0, 0],
            r: 0.3,
            geometry: new THREE.IcosahedronGeometry(3) // Gem
        },
        {
            position: [0, 0, 0],
            r: 0.3,
            geometry: new THREE.TorusKnotGeometry(2, 0.5, 100, 16) // Knot
        },
        {
            position: [0, 0, 0],
            r: 0.3,
            geometry: new THREE.TorusGeometry(2, 0.5, 16, 100) // Ring
        },
        {
            position: [0, 0, 0],
            r: 0.3,
            geometry: new THREE.TetrahedronGeometry(3) // Pyramid
        },
        {
            position: [0, 0, 0],
            r: 0.3,
            geometry: new THREE.CapsuleGeometry(3) // Capsule
        }

    ]

    const materials = [
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({color: "#2ecc71", roughness: 0}),
        new THREE.MeshStandardMaterial({color: "#f1c40f", roughness: 0.4}),
        new THREE.MeshStandardMaterial({color: "#e74c3c", roughness: 0.1}),
        new THREE.MeshStandardMaterial({color: "#8e44ad", roughness: 0.1}),
        new THREE.MeshStandardMaterial({color: "#1abc9c", roughness: 0.1}),
        new THREE.MeshStandardMaterial({color: "#2980b9", roughness: 0, metalness: 0.75}),
        new THREE.MeshStandardMaterial({color: "#2c3e50", roughness: 0.1, metalness: 0.9}),
    ]

    // Pass to Geometry
    return geometries.map(({position, geometry, r}) => (
        <Geometry 
        key={JSON.stringify(position)} 
        position={position.map(p=>p*2)} 
        geometry={geometry}
        materials={materials} 
        r={r}
        />
    ));

}

function Geometry({geometry, materials, position, r}) {
    const meshRef = useRef();
    const [visible, setVisible] = useState(false);

    const startMaterial = getRandomMaterial();

        function getRandomMaterial() {
            // return materials[Math.floor(Math.random() * materials.length)];
            return gsap.utils.random(materials);
        }
        function handleClick(e) {
            const mesh = e.object;

            // random rotation on all axes (radians)
            gsap.to(mesh.rotation, {
                x: `+=${gsap.utils.random(0,2)}`,
                y: `+=${gsap.utils.random(0,2)}`,
                z: `+=${gsap.utils.random(0,2)}`,
                duration: 1.3,
                ease: "elastic.out(1, 0.3)",
                // yoyo: true,
            });

            mesh.material = getRandomMaterial();
        }

        const handleHover = () => {
            document.body.style.cursor = "pointer";
        }

        const handleUnhover = () => {
            document.body.style.cursor = "default";
        }

        useEffect(() => {
            let ctx = gsap.context(() => {
                setVisible(true);
                gsap.from(meshRef.current.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1.3,
                    ease: "elastic.out(1, 0.3)",
                    delay: 0.3,
                });
            });
            return () => ctx.revert(); // cleanup
        }, []);

        return (
            <group position={position} ref={meshRef}>
                <Float speed={5*r} rotationIntensity={6*r} floatIntensity={5*r}>
                    <mesh
                        onClick={handleClick}
                        onPointerOver={handleHover}
                        onPointerOut={handleUnhover}
                        geometry={geometry}
                        material={startMaterial}
                        visible={visible}
                    />
                </Float>
            </group>
        )
}