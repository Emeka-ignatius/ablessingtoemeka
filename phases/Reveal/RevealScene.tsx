'use client';
import { BurstSystem } from './BurstSystem';

export const RevealScene = () => {
  return (
    <group position={[300, 0, 0]}>
      <BurstSystem />
      <mesh position={[0, 0.5, -4]}>
        <torusGeometry args={[2, 0.4, 16, 100]} />
        <meshStandardMaterial 
          color="#C49A52" 
          emissive="#C49A52" 
          emissiveIntensity={1.2} 
          wireframe
        />
      </mesh>
    </group>
  );
};
