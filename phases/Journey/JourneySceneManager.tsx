'use client';
import { CONFIG } from '@/constants/content';
import { MemoryFrame } from './MemoryFrame';
import { StarField } from '../Invitation/StarField';
import { useThree } from '@react-three/fiber';

export const JourneySceneManager = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 9;

  // Shift left on desktop, shift up on mobile to prevent overlapping with HTML UI
  const positionX = isMobile ? 0 : -2.4;
  const positionY = isMobile ? 2.8 : 0;
  const scale = isMobile ? 0.75 : 1.15;

  return (
    <group>
      {CONFIG.memories.map((mem, index) => (
        <group key={index} position={[450 + index * 125, 0, 0]}>
          <StarField count={300} color={index % 2 === 0 ? "#B5768E" : "#C9A065"} />
          <group position={[positionX, positionY, 0]} scale={[scale, scale, scale]}>
            <MemoryFrame 
              imageUrl={mem.imageUrl} 
              imageUrls={'imageUrls' in mem ? (mem.imageUrls as string[]) : undefined} 
            />
          </group>
        </group>
      ))}
    </group>
  );
};
