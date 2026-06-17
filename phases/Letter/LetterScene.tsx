'use client';
import { Float } from '@react-three/drei';
import { CandleParticles } from './CandleParticles';

export const LetterScene = () => {
  return (
    <group position={[1100, 0, 0]}>
      <CandleParticles />
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Virtual Paper backing in WebGL */}
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[6, 8]} />
          <meshStandardMaterial color="#FAF3E8" roughness={0.9} />
        </mesh>
      </Float>
    </group>
  );
};
