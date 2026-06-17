'use client';
import { CONFIG } from '@/constants/content';
import { MemoryFrame } from './MemoryFrame';
import { StarField } from '../Invitation/StarField';

export const JourneySceneManager = () => {
  return (
    <group>
      {CONFIG.memories.map((mem, index) => (
        <group key={index} position={[450 + index * 125, 0, 0]}>
          <StarField count={300} color={index % 2 === 0 ? "#B5768E" : "#C9A065"} />
          <MemoryFrame imageUrl={mem.imageUrl} />
        </group>
      ))}
    </group>
  );
};
