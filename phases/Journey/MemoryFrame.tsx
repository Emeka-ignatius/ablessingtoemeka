'use client';
import { useState, useRef, useMemo } from 'react';
import { Float, useTexture, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── BASE POLAROID CARD ───────────────────────────────────────────────────
export const PolaroidCard = ({ 
  imageUrl, 
  targetPos, 
  targetRot, 
  onClick 
}: { 
  imageUrl: string;
  targetPos: [number, number, number];
  targetRot: [number, number, number];
  onClick?: () => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(imageUrl);

  // Fix stretching: "cover" the photo area maintaining aspect ratio
  useMemo(() => {
    if (texture.image) {
      const imgAspect = texture.image.width / texture.image.height;
      const planeAspect = 1; // square photo area (3.8 x 3.8)

      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      if (imgAspect > planeAspect) {
        // Image is wider than square — fit height, crop sides
        texture.repeat.set(planeAspect / imgAspect, 1);
        texture.offset.set((1 - planeAspect / imgAspect) / 2, 0);
      } else {
        // Image is taller than square — fit width, crop top/bottom
        texture.repeat.set(1, imgAspect / planeAspect);
        texture.offset.set(0, (1 - imgAspect / planeAspect) / 2);
      }
    }
  }, [texture]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPos[0], 0.12);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPos[1], 0.12);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPos[2], 0.12);

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot[0], 0.12);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot[1], 0.12);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot[2], 0.12);
    }
  });

  return (
    <group 
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (onClick) document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Polaroid Border */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4.2, 5.2, 0.08]} />
        <meshStandardMaterial color="#FAF3E8" roughness={0.8} />
      </mesh>
      {/* Photo Inner Screen */}
      <mesh position={[0, 1.0, 0.05]}>
        <planeGeometry args={[3.8, 3.8]} />
        <meshStandardMaterial map={texture} roughness={0.5} />
      </mesh>
    </group>
  );
};

// ─── INTERACTIVE STACK OF POLAROIDS ──────────────────────────────────────
export const MemoryStack = ({ imageUrls }: { imageUrls: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const n = imageUrls.length;

  const handleShuffle = () => {
    setActiveIndex((prev) => (prev + 1) % n);
  };

  return (
    <group>
      {imageUrls.map((url, idx) => {
        const relativeIndex = (idx - activeIndex + n) % n;
        
        // Front image (relativeIndex === 0) is fully aligned and in front.
        // Images behind alternate offsets and rotations.
        let targetX = 0;
        let targetY = 0;
        let targetZ = 0.6 - relativeIndex * 0.45;
        let targetRotZ = 0;
        let targetRotY = 0;

        if (relativeIndex > 0) {
          const side = idx % 2 === 0 ? 1 : -1;
          targetX = side * 0.22 * relativeIndex;
          targetY = -side * 0.12 * relativeIndex;
          targetRotZ = side * -0.08 * relativeIndex;
          targetRotY = side * -0.04 * relativeIndex;
        }

        return (
          <PolaroidCard
            key={url}
            imageUrl={url}
            targetPos={[targetX, targetY, targetZ]}
            targetRot={[0, targetRotY, targetRotZ]}
            onClick={handleShuffle}
          />
        );
      })}

      {/* "Click Me" label on the Polaroid bottom strip */}
      <Text
        position={[0, -1.6, 0.7]}
        fontSize={0.28}
        color="#B5768E"
        anchorX="center"
        anchorY="middle"
      >
        tap to shuffle ✦
      </Text>
    </group>
  );
};

// ─── EXPORTED MAIN CONTAINER ──────────────────────────────────────────────
export const MemoryFrame = ({ 
  imageUrl, 
  imageUrls 
}: { 
  imageUrl: string; 
  imageUrls?: string[] 
}) => {
  const isStack = imageUrls && imageUrls.length > 1;

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
      {isStack ? (
        <MemoryStack imageUrls={imageUrls} />
      ) : (
        <PolaroidCard 
          imageUrl={imageUrl} 
          targetPos={[0, 0, 0.2]} 
          targetRot={[0, 0, 0]} 
        />
      )}
    </Float>
  );
};
