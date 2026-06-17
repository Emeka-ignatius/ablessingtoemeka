'use client';
import { StarField } from './StarField';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const InvitationScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <StarField count={1500} />
      {/* Abstract Glowing Envelope Orb representing invitation */}
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial 
          color="#B5768E" 
          emissive="#7E3E5E" 
          emissiveIntensity={1.5} 
          wireframe 
        />
      </mesh>
    </group>
  );
};
