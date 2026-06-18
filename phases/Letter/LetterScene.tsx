'use client';
import { Float } from '@react-three/drei';
import { CandleParticles } from './CandleParticles';

export const LetterScene = () => {
  return (
    <group position={[1100, 0, 0]}>
      <CandleParticles />

    </group>
  );
};
