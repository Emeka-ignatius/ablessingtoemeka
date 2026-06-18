'use client';
import { StarField } from './StarField';

export const InvitationScene = () => {
  return (
    <group position={[0, 0, 0]}>
      <StarField count={1500} />
    </group>
  );
};
