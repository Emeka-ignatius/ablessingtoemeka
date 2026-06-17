'use client';
import { Float } from '@react-three/drei';

export const MemoryFrame = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {/* Polaroid Border */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[4.2, 5.2, 0.1]} />
          <meshStandardMaterial color="#FAF3E8" roughness={0.8} />
        </mesh>
        {/* Photo Inner Screen */}
        <mesh position={[0, 1.0, 0.06]}>
          <planeGeometry args={[3.8, 3.8]} />
          <meshStandardMaterial color="#2E1A10" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
};
