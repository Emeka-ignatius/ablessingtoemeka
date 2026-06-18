'use client';
import { useMemo, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { CONFIG } from '@/constants/content';
import { PolaroidCard } from './PolaroidCard';

// Seeded random for consistent layout
function pseudoRandom(seed: number) {
  let value = seed;
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export const PolaroidWall = () => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 9;
  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);

  const cardsData = useMemo(() => {
    const random = pseudoRandom(42);
    
    return CONFIG.petNames.map((pet, i) => {
      // Scatter positions: X (-6 to +6), Y (-3 to +3), Z (-2 to +2)
      let initPos: [number, number, number] = [0, 0, 0];
      
      if (!isMobile) {
        initPos = [
          (random() * 12) - 6,
          (random() * 6) - 3,
          (random() * 4) - 2
        ];
      }
      
      const initRot: [number, number, number] = [
        (random() * 0.3) - 0.15,
        0,
        (random() * 0.3) - 0.15
      ];
      
      const floatIntensity = 0.3 + (random() * 0.5);
      const floatSpeed = 0.6 + (random() * 0.8);
      
      return {
        ...pet,
        desktopPos: initPos,
        initRot,
        floatIntensity,
        floatSpeed
      };
    });
  }, [isMobile]);

  // Handle mobile swipe
  useEffect(() => {
    if (!isMobile) return;
    
    let startX = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe left -> next
          setMobileIndex(prev => Math.min(prev + 1, CONFIG.petNames.length - 1));
        } else {
          // Swipe right -> prev
          setMobileIndex(prev => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile]);

  return (
    <group>
      {cardsData.map((card, i) => {
        if (isMobile && i !== mobileIndex) return null;
        
        // On mobile, keep it center. On desktop, use scattered position.
        const targetPos: [number, number, number] = isMobile ? [0, 0, 0] : card.desktopPos;
        
        return (
          <PolaroidCard
            key={i}
            name={card.name}
            imageUrl={card.imageUrl}
            initPos={targetPos}
            initRot={card.initRot}
            floatIntensity={card.floatIntensity}
            floatSpeed={card.floatSpeed}
            isActive={activeIndex === i}
            onClick={() => setActiveIndex(prev => prev === i ? null : i)}
          />
        );
      })}
    </group>
  );
};
