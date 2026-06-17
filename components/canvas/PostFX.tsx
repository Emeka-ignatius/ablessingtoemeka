'use client';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useEffect, useState } from 'react';

export const PostFX = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  return (
    <EffectComposer>
      <Bloom 
        intensity={isMobile ? 0.8 : 1.5} 
        luminanceThreshold={0.15} 
        luminanceSmoothing={0.9} 
      />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
};
