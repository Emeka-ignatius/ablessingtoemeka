'use client';
import { StarField } from '../Invitation/StarField';

export const GateScene = () => {
  return (
    <group position={[150, 0, 0]}>
      <StarField count={800} color="#C9A065" />
    </group>
  );
};
