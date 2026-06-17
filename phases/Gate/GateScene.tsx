'use client';
import { StarField } from '../Invitation/StarField';

export const GateScene = () => {
  return (
    <group position={[150, 0, 0]}>
      <StarField count={800} color="#C9A065" />
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[16, 12]} />
        <meshBasicMaterial color="#FAF3E8" transparent opacity={0.05} />
      </mesh>
    </group>
  );
};
