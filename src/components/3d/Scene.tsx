'use client';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sphere, Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box ref={meshRef} args={[2, 2, 2]}>
      <meshStandardMaterial color="#3b82f6" metalness={0.7} roughness={0.2} />
    </Box>
  );
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.elapsedTime) * 1.5;
      meshRef.current.rotation.x = clock.elapsedTime * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[3, 0, 0]}>
      <meshStandardMaterial color="#ec4899" metalness={0.8} roughness={0.1} />
    </Sphere>
  );
}

export function Scene() {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls autoRotate autoRotateSpeed={2} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#3b82f6" />
      <RotatingBox />
      <FloatingSphere />
    </Canvas>
  );
}
