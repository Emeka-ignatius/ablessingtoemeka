'use client';
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Howl } from 'howler';

const chimeSound = new Howl({
  src: ['/audio/chime.mp3'], // Assuming this file exists or will be added
  volume: 0.3,
});

export const PolaroidCard = ({ 
  name, 
  imageUrl, 
  initPos, 
  initRot,
  floatIntensity,
  floatSpeed,
  onClick,
  isActive
}: { 
  name: string;
  imageUrl: string;
  initPos: [number, number, number];
  initRot: [number, number, number];
  floatIntensity: number;
  floatSpeed: number;
  onClick: () => void;
  isActive: boolean;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(imageUrl);

  useMemo(() => {
    if (texture.image) {
      const img = texture.image as any;
      const imgAspect = img.width / img.height;
      const planeAspect = 1.0; 

      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      if (imgAspect > planeAspect) {
        texture.repeat.set(planeAspect / imgAspect, 1);
        texture.offset.set((1 - planeAspect / imgAspect) / 2, 0);
      } else {
        texture.repeat.set(1, imgAspect / planeAspect);
        texture.offset.set(0, (1 - imgAspect / planeAspect) / 2);
      }
    }
  }, [texture]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // If active, scale to 1.18, move forward +1.5 on Z
      const targetZ = isActive ? initPos[2] + 1.5 : initPos[2];
      const targetScale = isActive ? 1.18 : 1.0;
      
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, initPos[0], 6 * delta);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, initPos[1], 6 * delta);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 6 * delta);
      
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 6 * delta)
      );
      
      // Zero out tilt if active
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, isActive ? 0 : initRot[0], 6 * delta);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, isActive ? 0 : initRot[2], 6 * delta);
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    onClick();
    chimeSound.play();
  };

  return (
    <Float speed={floatSpeed} rotationIntensity={0} floatIntensity={floatIntensity}>
      <group 
        ref={groupRef}
        position={initPos}
        onClick={handlePointerDown}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'auto';
        }}
      >
        {/* White Polaroid Base */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.5, 3.2]} />
          <meshStandardMaterial color="#FAF3E8" roughness={0.8} />
        </mesh>
        
        {/* Photo Area (Top 75%) */}
        <mesh position={[0, 0.35, 0.01]}>
          <planeGeometry args={[2.2, 2.2]} />
          <meshStandardMaterial map={texture} roughness={0.5} />
        </mesh>

        {/* Name Text below */}
        <Html 
          transform 
          position={[0, -1.1, 0.02]} 
          zIndexRange={[100, 0]}
          scale={0.4}
        >
          <div 
            className="font-serif italic whitespace-nowrap select-none flex items-center justify-center transition-colors duration-300"
            style={{
              color: isActive ? '#C49A52' : '#2A2A2A',
              textShadow: isActive ? '0 0 10px rgba(196, 154, 82, 0.4)' : 'none',
              fontSize: '24px',
            }}
          >
            {name}
          </div>
        </Html>
      </group>
    </Float>
  );
};
