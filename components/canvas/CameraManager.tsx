'use client';
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { usePhaseStore } from '@/hooks/usePhase';
import gsap from 'gsap';
import * as THREE from 'three';

export const CameraManager = () => {
  const { camera } = useThree();
  const activePhase = usePhaseStore((state) => state.activePhase);
  const currentSceneIndex = usePhaseStore((state) => state.currentSceneIndex);
  const isTransitioning = usePhaseStore((state) => state.isTransitioning);
  const setTransitioning = usePhaseStore((state) => state.setTransitioning);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setTransitioning(true);
    let targetX = 0;
    let targetZ = 10;

    if (activePhase === 'invitation') {
      targetX = 0;
      targetZ = 10;
    } else if (activePhase === 'gate') {
      targetX = 150;
      targetZ = 10;
    } else if (activePhase === 'reveal') {
      targetX = 300;
      targetZ = 15;
    } else if (activePhase === 'journey') {
      targetX = 450 + currentSceneIndex * 125;
      targetZ = 12;
    } else if (activePhase === 'letter') {
      targetX = 1100;
      targetZ = 8;
    }

    gsap.to(camera.position, {
      x: targetX,
      z: targetZ,
      duration: 1.5,
      ease: 'power3.inOut',
      onComplete: () => {
        setTransitioning(false);
      }
    });
  }, [activePhase, currentSceneIndex, camera, setTransitioning]);

  useFrame(() => {
    if (!isTransitioning) {
      // Dynamic mouse parallax
      const strength = 0.5;
      camera.position.x += (mouse.current.x * strength - (camera.position.x - (activePhase === 'journey' ? 450 + currentSceneIndex * 125 : activePhase === 'gate' ? 150 : activePhase === 'reveal' ? 300 : activePhase === 'letter' ? 1100 : 0))) * 0.05;
      camera.position.y += (-mouse.current.y * strength - camera.position.y) * 0.05;
    }
  });

  return null;
};
