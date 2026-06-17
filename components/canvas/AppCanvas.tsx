'use client';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { CameraManager } from './CameraManager';
import { PostFX } from './PostFX';
import { usePhaseStore } from '@/hooks/usePhase';
import { ReactNode } from 'react';

export const AppCanvas = ({ children }: { children: ReactNode }) => {
  const activePhase = usePhaseStore((state) => state.activePhase);

  if (activePhase === 'loading') return null;

  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-space-black">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ fov: 75, position: [0, 0, 10] }}
      >
        <color attach="background" args={['#080410']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 10, 5]} intensity={1.5} />
        <CameraManager />
        {children}
        <PostFX />
        <Preload all />
      </Canvas>
    </div>
  );
};
