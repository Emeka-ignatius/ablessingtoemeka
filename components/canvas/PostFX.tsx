'use client';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';

export const PostFX = () => {
  const { gl } = useThree();
  const [isMobile, setIsMobile] = useState(false);
  const [contextValid, setContextValid] = useState(true);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    // Check if the actual WebGL rendering context is alive
    try {
      const ctx = gl.getContext();
      if (!ctx) {
        setContextValid(false);
      }
    } catch {
      setContextValid(false);
    }
  }, [gl]);

  // Don't render post-processing if the WebGL context is lost/null
  if (!contextValid) return null;

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
