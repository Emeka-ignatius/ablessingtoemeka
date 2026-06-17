'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CandleParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 60;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 1] = -4 + Math.random() * 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry.attributes.position;
      const array = geo.array as Float32Array;
      for (let i = 0; i < count; i++) {
        array[i * 3 + 1] += 0.03; // Drift Up
        if (array[i * 3 + 1] > 4) {
          array[i * 3 + 1] = -4; // Reset
          array[i * 3] = (Math.random() - 0.5) * 4;
        }
      }
      geo.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#C9A065" transparent opacity={0.6} />
    </points>
  );
};
