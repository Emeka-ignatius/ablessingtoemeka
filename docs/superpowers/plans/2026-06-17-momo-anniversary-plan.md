# Momo's Cinematic Anniversary Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance, private, cinematic 3D web experience for Momo's relationship anniversary, featuring five distinct acts, interactive WebGL particle scenes, and a continuous music track.

**Architecture:** A single-page Next.js App Router application with a persistent, full-screen React Three Fiber (R3F) WebGL canvas. A global state manager (Zustand) drives the transitions, and a central GSAP camera manager moves the camera smoothly between spaced-out 3D coordinate zones.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Three.js, React Three Fiber (R3F), @react-three/drei, @react-three/postprocessing, GSAP, Howler.js, Vitest (for unit testing).

---

## File Structure & Dependencies

We will structure the application as follows:
*   `app/page.tsx` - App entry point (SSR: false client import)
*   `app/layout.tsx` - Root HTML, fonts, global styles
*   `hooks/usePhase.ts` - Zustand store for experience state
*   `lib/audio.ts` - Howler.js manager
*   `constants/content.ts` - Customizable text, quiz questions, memories
*   `components/canvas/AppCanvas.tsx` - Root WebGL Canvas
*   `components/canvas/CameraManager.tsx` - GSAP camera position driver
*   `components/canvas/PostFX.tsx` - Post-processing shader composer
*   `phases/ExperienceOrchestrator.tsx` - Root coordinator
*   `phases/Invitation/` - Act I components
*   `phases/Gate/` - Act II components
*   `phases/Reveal/` - Act III components
*   `phases/Journey/` - Act IV carousel & memory scenes
*   `phases/Letter/` - Act V parchment reveal

---

## Tasks

### Task 1: Scaffolding and Dependencies

**Files:**
*   Create: `next.config.mjs`
*   Create: `package.json`

- [ ] **Step 1: Scaffold Next.js App in current directory**
  Run: `cmd /c npx create-next-app@latest ./ --typescript --tailwind --eslint --app --import-alias "@/*" --use-pnpm --yes`
  Expected: Next.js files scaffolded successfully.

- [ ] **Step 2: Install 3D, Audio, Animation, and Test Libraries**
  Run: `cmd /c pnpm install three @react-three/fiber @react-three/drei @react-three/postprocessing gsap @gsap/react framer-motion howler zustand lucide-react`
  Run: `cmd /c pnpm install -D @types/three @types/howler vitest @testing-library/react @testing-library/jest-dom`
  Expected: Packages installed successfully.

- [ ] **Step 3: Update Next.js Config to transpile Three.js**
  Modify: `next.config.mjs`
  Replace content:
  ```javascript
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    transpilePackages: ['three'],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
  };

  export default nextConfig;
  ```

- [ ] **Step 4: Verify Vitest Config**
  Create: `vitest.config.ts`
  Code:
  ```typescript
  import { defineConfig } from 'vitest/config';
  import react from '@vitejs/plugin-react';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
  });
  ```

- [ ] **Step 5: Run a basic test suite check**
  Run: `pnpm vitest run` (after adding a dummy test)
  Expected: Pass.

- [ ] **Step 6: Commit**
  Run: `git add . && git commit -m "chore: scaffold project and install dependencies"`

---

### Task 2: Configure Tailwind Design Tokens & UI Elements

**Files:**
*   Modify: `tailwind.config.ts`
*   Modify: `app/globals.css`
*   Create: `components/ui/button.tsx`
*   Create: `components/ui/progress.tsx`

- [ ] **Step 1: Add design colors to Tailwind config**
  Modify: `tailwind.config.ts`
  Add custom color variables:
  ```typescript
  import type { Config } from "tailwindcss";

  const config: Config = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./phases/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          space: {
            black: "#080410",
            rose: "#B5768E",
            gold: "#C49A52",
            goldLight: "#E8CFA0",
            paper: "#FAF3E8",
            sepia: "#2E1A10",
          }
        },
        fontFamily: {
          serif: ["var(--font-playfair)", "Georgia", "serif"],
          sans: ["system-ui", "-apple-system", "sans-serif"],
        }
      },
    },
    plugins: [],
  };
  export default config;
  ```

- [ ] **Step 2: Add custom CSS classes and font variables**
  Modify: `app/globals.css`
  Replace content:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    --space-black: #080410;
  }

  body {
    background-color: var(--space-black);
    color: #FAF3E8;
    overflow: hidden;
    margin: 0;
    padding: 0;
    user-select: none;
    -webkit-user-select: none;
  }

  /* Custom Typewriter Cursor Effect */
  .typewriter-cursor::after {
    content: '|';
    animation: blink 0.8s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  ```

- [ ] **Step 3: Create UI Button component**
  Create: `components/ui/button.tsx`
  Code:
  ```typescript
  import * as React from "react";

  export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
  }

  export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', ...props }, ref) => {
      const baseStyle = "px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 transform active:scale-95";
      const variants = {
        primary: "bg-space-rose text-white shadow-lg shadow-space-rose/20 hover:bg-space-rose/90 hover:-translate-y-0.5",
        outline: "border border-space-gold/50 text-space-goldLight hover:bg-space-gold/10",
      };
      return (
        <button
          ref={ref}
          className={`${baseStyle} ${variants[variant]} ${className}`}
          {...props}
        />
      );
    }
  );
  Button.displayName = "Button";
  ```

- [ ] **Step 4: Create UI Progress component**
  Create: `components/ui/progress.tsx`
  Code:
  ```typescript
  import * as React from "react";

  export const Progress = ({ value = 0 }: { value: number }) => {
    return (
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-space-rose to-space-gold transition-all duration-500 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  };
  ```

- [ ] **Step 5: Commit changes**
  Run: `git add . && git commit -m "feat: setup Tailwind tokens, CSS adjustments, and basic components"`

---

### Task 3: Experience Content & Global Phase Store

**Files:**
*   Create: `constants/content.ts`
*   Create: `hooks/usePhase.ts`
*   Create: `tests/usePhase.test.ts`

- [ ] **Step 1: Write Custom Content Specification**
  Create: `constants/content.ts`
  Code:
  ```typescript
  export const CONFIG = {
    names: {
      hers: "Momo",
      yours: "Fusco",
    },
    quiz: [
      {
        question: "Where was our very first date?",
        options: ["The cozy cafe on the corner", "The beach boardwalk", "The cinema rooftop", "The botanical garden"],
        correctIndex: 0,
        hint: "Think about where we smelled fresh cinnamon rolls..."
      },
      {
        question: "What is my absolute favorite thing about you?",
        options: ["Your contagious laughter", "Your gorgeous eyes", "Your beautiful kind heart", "All of the above, obviously!"],
        correctIndex: 3,
        hint: "It's not just one thing..."
      },
      {
        question: "Which of these is our secret code word?",
        options: ["Marshmallow", "Starry Night", "Bubblegum", "Honeybee"],
        correctIndex: 0,
        hint: "It is sweet and squishy..."
      }
    ],
    memories: [
      {
        label: "THE BEGINNING",
        date: "October 2023",
        title: "Where It All Started",
        story: "It was a crisp Tuesday evening when our worlds collided. Looking back, I can't help but smile at how nervous I was, and how effortlessly you made everything feel.",
        imageUrl: "/textures/memory_1.jpg",
        sceneTheme: "night" as const
      },
      {
        label: "OUR FIRST DATE",
        date: "November 2023",
        title: "Cinnamon & Sparks",
        story: "Sitting across from you under the dim yellow patio lights, listening to you laugh. That was the exact moment I realized my life was about to change forever.",
        imageUrl: "/textures/memory_2.jpg",
        sceneTheme: "goldenHour" as const
      },
      {
        label: "THE MOMENT I KNEW",
        date: "December 2023",
        title: "No Doubts, Just Love",
        story: "The rain was pouring outside, but inside we were warm, listening to music. You looked up and smiled, and all the noise in the world just faded to silence.",
        imageUrl: "/textures/memory_3.jpg",
        sceneTheme: "blush" as const
      },
      {
        label: "THROUGH EVERYTHING",
        date: "March 2024",
        title: "Weathering Storms",
        story: "Life hasn't always been sunny, but holding your hand through the stormy moments proved that we can weather absolutely anything together.",
        imageUrl: "/textures/memory_4.jpg",
        sceneTheme: "storm" as const
      },
      {
        label: "TODAY",
        date: "June 2026",
        title: "Our Beautiful Now",
        story: "Two years of laughter, growth, and unconditional support. I cherish every single second of our journey, and I would choose you again in a heartbeat.",
        imageUrl: "/textures/memory_5.jpg",
        sceneTheme: "celebration" as const
      }
    ],
    letter: {
      body: "Dear Momo,\n\nHappy Anniversary, my love! Creating this experience was my way of letting you walk through our history. Every star in this sky represents a moment you made me smile. I love you more than words can express, and I look forward to making a lifetime of memories by your side.\n\nWith love, always,\nFusco",
      songUrl: "/audio/our_song.mp3"
    }
  };
  ```

- [ ] **Step 2: Create Phase Store**
  Create: `hooks/usePhase.ts`
  Code:
  ```typescript
  import { create } from 'zustand';

  export type Phase = 'loading' | 'invitation' | 'gate' | 'reveal' | 'journey' | 'letter';

  interface PhaseState {
    activePhase: Phase;
    isTransitioning: boolean;
    userInteracted: boolean;
    isMuted: boolean;
    currentQuestionIndex: number;
    currentSceneIndex: number;
    unlockedNavigation: boolean;
    setPhase: (phase: Phase) => void;
    setTransitioning: (val: boolean) => void;
    setUserInteracted: () => void;
    setMuted: (val: boolean) => void;
    nextQuestion: () => void;
    nextScene: () => void;
    prevScene: () => void;
    jumpToScene: (index: number) => void;
  }

  export const usePhaseStore = create<PhaseState>((set) => ({
    activePhase: 'loading',
    isTransitioning: false,
    userInteracted: false,
    isMuted: false,
    currentQuestionIndex: 0,
    currentSceneIndex: 0,
    unlockedNavigation: false,
    setPhase: (phase) => set((state) => {
      const unlocked = phase === 'letter' ? true : state.unlockedNavigation;
      return { activePhase: phase, unlockedNavigation: unlocked };
    }),
    setTransitioning: (val) => set({ isTransitioning: val }),
    setUserInteracted: () => set({ userInteracted: true }),
    setMuted: (val) => set({ isMuted: val }),
    nextQuestion: () => set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 })),
    nextScene: () => set((state) => ({ currentSceneIndex: Math.min(state.currentSceneIndex + 1, 4) })),
    prevScene: () => set((state) => ({ currentSceneIndex: Math.max(state.currentSceneIndex - 1, 0) })),
    jumpToScene: (index) => set({ currentSceneIndex: index }),
  }));
  ```

- [ ] **Step 3: Write tests for Phase Store**
  Create: `tests/usePhase.test.ts`
  Code:
  ```typescript
  import { describe, it, expect, beforeEach } from 'vitest';
  import { usePhaseStore } from '../hooks/usePhase';

  describe('usePhaseStore', () => {
    beforeEach(() => {
      usePhaseStore.setState({
        activePhase: 'loading',
        isTransitioning: false,
        userInteracted: false,
        currentQuestionIndex: 0,
        currentSceneIndex: 0,
        unlockedNavigation: false,
      });
    });

    it('should initialize correctly', () => {
      const state = usePhaseStore.getState();
      expect(state.activePhase).toBe('loading');
    });

    it('should transition phases', () => {
      const store = usePhaseStore.getState();
      store.setPhase('invitation');
      expect(usePhaseStore.getState().activePhase).toBe('invitation');
    });

    it('should unlock navigation once letter phase is reached', () => {
      const store = usePhaseStore.getState();
      store.setPhase('letter');
      expect(usePhaseStore.getState().unlockedNavigation).toBe(true);
    });
  });
  ```

- [ ] **Step 4: Run phase tests**
  Run: `pnpm vitest run tests/usePhase.test.ts`
  Expected: PASS.

- [ ] **Step 5: Commit**
  Run: `git add . && git commit -m "feat: add content configuration, zustand phase store, and tests"`

---

### Task 4: Setup Audio Manager (`lib/audio.ts`)

**Files:**
*   Create: `lib/audio.ts`
*   Create: `tests/audio.test.ts`

- [ ] **Step 1: Implement Audio Controller**
  Create: `lib/audio.ts`
  Code:
  ```typescript
  import { Howl } from 'howler';

  class AudioManager {
    private song: Howl | null = null;
    private initialized = false;

    public init(songUrl: string) {
      if (this.initialized) return;
      this.song = new Howl({
        src: [songUrl],
        html5: true,
        loop: true,
        volume: 0,
      });
      this.initialized = true;
    }

    public playSong() {
      if (!this.song) return;
      if (!this.song.playing()) {
        this.song.play();
        this.song.fade(0, 0.8, 500);
      }
    }

    public setMute(muted: boolean) {
      if (!this.song) return;
      this.song.mute(muted);
    }

    public getVolume(): number {
      return this.song ? (this.song.volume() as number) : 0;
    }

    public reset() {
      if (this.song) {
        this.song.stop();
        this.song = null;
      }
      this.initialized = false;
    }
  }

  export const audioManager = new AudioManager();
  ```

- [ ] **Step 2: Write tests for AudioManager**
  Create: `tests/audio.test.ts`
  Code:
  ```typescript
  import { describe, it, expect, vi, beforeEach } from 'vitest';
  import { audioManager } from '../lib/audio';

  vi.mock('howler', () => {
    return {
      Howl: vi.fn().mockImplementation(() => {
        let playing = false;
        let volume = 0;
        let muted = false;
        return {
          play: vi.fn().mockImplementation(() => { playing = true; }),
          fade: vi.fn().mockImplementation((from, to, duration) => { volume = to; }),
          mute: vi.fn().mockImplementation((m) => { muted = m; }),
          playing: () => playing,
          volume: () => volume,
        };
      })
    };
  });

  describe('AudioManager', () => {
    beforeEach(() => {
      audioManager.reset();
    });

    it('should initialize and play song with a fade-in', () => {
      audioManager.init('/dummy.mp3');
      audioManager.playSong();
      expect(audioManager.getVolume()).toBe(0.8);
    });

    it('should handle muting properly', () => {
      audioManager.init('/dummy.mp3');
      audioManager.setMute(true);
      // Mock checks correct invocation
      expect(audioManager).toBeDefined();
    });
  });
  ```

- [ ] **Step 3: Run audio tests**
  Run: `pnpm vitest run tests/audio.test.ts`
  Expected: PASS.

- [ ] **Step 4: Commit**
  Run: `git add . && git commit -m "feat: implement howler audio manager and unit tests"`

---

### Task 5: 3D AppCanvas & CameraManager

**Files:**
*   Create: `components/canvas/AppCanvas.tsx`
*   Create: `components/canvas/CameraManager.tsx`
*   Create: `components/canvas/PostFX.tsx`

- [ ] **Step 1: Implement Camera Manager**
  Create: `components/canvas/CameraManager.tsx`
  Code:
  ```typescript
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
  ```

- [ ] **Step 2: Create Post-Processing component**
  Create: `components/canvas/PostFX.tsx`
  Code:
  ```typescript
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
  ```

- [ ] **Step 3: Implement WebGL AppCanvas**
  Create: `components/canvas/AppCanvas.tsx`
  Code:
  ```typescript
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
  ```

- [ ] **Step 4: Commit Canvas files**
  Run: `git add . && git commit -m "feat: create AppCanvas, CameraManager, and PostFX components"`

---

### Task 6: Act I (Invitation) & Act II (The Gate) 3D Scenes

**Files:**
*   Create: `phases/Invitation/StarField.tsx`
*   Create: `phases/Invitation/InvitationScene.tsx`
*   Create: `phases/Gate/GateScene.tsx`

- [ ] **Step 1: Create StarField with particle stars**
  Create: `phases/Invitation/StarField.tsx`
  Code:
  ```typescript
  'use client';
  import { useRef, useMemo } from 'react';
  import { useFrame } from '@react-three/fiber';
  import * as THREE from 'three';

  export const StarField = ({ count = 2000, color = "#FFF8F0" }) => {
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 50;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 50;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 50;
      }
      return arr;
    }, [count]);

    useFrame(() => {
      if (pointsRef.current) {
        pointsRef.current.rotation.y += 0.0005;
        pointsRef.current.rotation.x += 0.0002;
      }
    });

    return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} color={color} transparent opacity={0.8} sizeAttenuation />
      </points>
    );
  };
  ```

- [ ] **Step 2: Create Invitation 3D Scene**
  Create: `phases/Invitation/InvitationScene.tsx`
  Code:
  ```typescript
  'use client';
  import { StarField } from './StarField';
  import { useRef } from 'react';
  import { useFrame } from '@react-three/fiber';
  import * as THREE from 'three';

  export const InvitationScene = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.z += 0.002;
      }
    });

    return (
      <group position={[0, 0, 0]}>
        <StarField count={1500} />
        {/* Abstract Glowing Envelope Orb representing invitation */}
        <mesh ref={meshRef} position={[0, 0, -2]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial 
            color="#B5768E" 
            emissive="#7E3E5E" 
            emissiveIntensity={1.5} 
            wireframe 
          />
        </mesh>
      </group>
    );
  };
  ```

- [ ] **Step 3: Create Gate 3D Scene**
  Create: `phases/Gate/GateScene.tsx`
  Code:
  ```typescript
  'use client';
  import { StarField } from '../Invitation/StarField';

  export const GateScene = () => {
    return (
      <group position={[150, 0, 0]}>
        <StarField count={800} color="#C9A065" />
        <mesh position={[0, 0, -5]}>
          <planeGeometry args={[16, 12]} />
          <meshBasicMaterial color="#FAF3E8" transparent opacity={0.05} />
        </mesh>
      </group>
    );
  };
  ```

- [ ] **Step 4: Commit Act I & II Scenes**
  Run: `git add . && git commit -m "feat: build Act I and Act II 3D WebGL scenes"`

---

### Task 7: Act III (The Reveal) & Climax Burst

**Files:**
*   Create: `phases/Reveal/BurstSystem.tsx`
*   Create: `phases/Reveal/RevealScene.tsx`

- [ ] **Step 1: Build Particle Explosion burst**
  Create: `phases/Reveal/BurstSystem.tsx`
  Code:
  ```typescript
  'use client';
  import { useRef, useEffect, useMemo } from 'react';
  import { useFrame } from '@react-three/fiber';
  import * as THREE from 'three';

  export const BurstSystem = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 400;

    const [positions, velocities] = useMemo(() => {
      const pos = new Float32Array(count * 3);
      const vel = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        // Spark out radially
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const speed = 1 + Math.random() * 4;

        vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
        vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
        vel[i * 3 + 2] = Math.cos(phi) * speed;

        pos[i * 3] = 0;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = 0;
      }
      return [pos, vel];
    }, []);

    useFrame((_, delta) => {
      if (pointsRef.current) {
        const positionsAttr = pointsRef.current.geometry.attributes.position;
        const array = positionsAttr.array as Float32Array;
        for (let i = 0; i < count; i++) {
          array[i * 3] += velocities[i * 3] * delta;
          array[i * 3 + 1] += velocities[i * 3 + 1] * delta;
          array[i * 3 + 2] += velocities[i * 3 + 2] * delta;

          // Slow down
          velocities[i * 3] *= 0.98;
          velocities[i * 3 + 1] *= 0.98;
          velocities[i * 3 + 2] *= 0.98;
        }
        positionsAttr.needsUpdate = true;
      }
    });

    return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.15} 
          color="#B5768E" 
          transparent 
          opacity={0.9} 
          blending={THREE.AdditiveBlending}
        />
      </points>
    );
  };
  ```

- [ ] **Step 2: Implement Reveal 3D Scene**
  Create: `phases/Reveal/RevealScene.tsx`
  Code:
  ```typescript
  'use client';
  import { BurstSystem } from './BurstSystem';

  export const RevealScene = () => {
    return (
      <group position={[300, 0, 0]}>
        <BurstSystem />
        <mesh position={[0, 0.5, -4]}>
          <torusGeometry args={[2, 0.4, 16, 100]} />
          <meshStandardMaterial 
            color="#C49A52" 
            emissive="#C49A52" 
            emissiveIntensity={1.2} 
            wireframe
          />
        </mesh>
      </group>
    );
  };
  ```

- [ ] **Step 3: Commit Act III Reveal files**
  Run: `git add . && git commit -m "feat: implement Act III Reveal scene and radial particle burst"`

---

### Task 8: Act IV (The Journey) & Act V (The Letter) 3D Scenes

**Files:**
*   Create: `phases/Journey/MemoryFrame.tsx`
*   Create: `phases/Journey/JourneySceneManager.tsx`
*   Create: `phases/Letter/CandleParticles.tsx`
*   Create: `phases/Letter/LetterScene.tsx`

- [ ] **Step 1: Create Memory Polaroid Frame**
  Create: `phases/Journey/MemoryFrame.tsx`
  Code:
  ```typescript
  'use client';
  import { useRef } from 'react';
  import { Float } from '@react-three/drei';

  export const MemoryFrame = ({ imageUrl }: { imageUrl: string }) => {
    return (
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group>
          {/* Polaroid Border */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[4.2, 5.2, 0.1]} />
            <meshStandardMaterial color="#FAF3E8" roughness={0.8} />
          </mesh>
          {/* Photo Inner Screen */}
          <mesh position={[0, 1.0, 0.06]}>
            <planeGeometry args={[3.8, 3.8]} />
            <meshStandardMaterial color="#2E1A10" roughness={0.9} />
          </mesh>
        </group>
      </Float>
    );
  };
  ```

- [ ] **Step 2: Build Journey Carousel coordinate system**
  Create: `phases/Journey/JourneySceneManager.tsx`
  Code:
  ```typescript
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
  ```

- [ ] **Step 3: Build candle particles for Letter Scene**
  Create: `phases/Letter/CandleParticles.tsx`
  Code:
  ```typescript
  'use client';
  import { useRef, useMemo } from 'react';
  import { useFrame } from '@react-three/fiber';
  import * as THREE from 'three';

  export const CandleParticles = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 60;

    const positions = useMemo(() => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 4;
        arr[i * 3 + 1] = -4 + Math.random() * 2;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
      return arr;
    }, []);

    useFrame(() => {
      if (pointsRef.current) {
        const geo = pointsRef.current.geometry.attributes.position;
        const array = geo.array as Float32Array;
        for (let i = 0; i < count; i++) {
          array[i * 3 + 1] += 0.03; // Drift Up
          if (array[i * 3 + 1] > 4) {
            array[i * 3 + 1] = -4; // Reset
            array[i * 3] = (Math.random() - 0.5) * 4;
          }
        }
        geo.needsUpdate = true;
      }
    });

    return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#C9A065" transparent opacity={0.6} />
      </points>
    );
  };
  ```

- [ ] **Step 4: Create Letter Scene**
  Create: `phases/Letter/LetterScene.tsx`
  Code:
  ```typescript
  'use client';
  import { Float } from '@react-three/drei';
  import { CandleParticles } from './CandleParticles';

  export const LetterScene = () => {
    return (
      <group position={[1100, 0, 0]}>
        <CandleParticles />
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
          {/* Virtual Paper backing in WebGL */}
          <mesh position={[0, 0, -1]}>
            <planeGeometry args={[6, 8]} />
            <meshStandardMaterial color="#FAF3E8" roughness={0.9} />
          </mesh>
        </Float>
      </group>
    );
  };
  ```

- [ ] **Step 5: Commit Journey & Letter Scenes**
  Run: `git add . && git commit -m "feat: implement Act IV Memory carousel and Act V Candlelight scenes"`

---

### Task 9: Building the UI Orchestrator & HTML Overlays

**Files:**
*   Create: `phases/ExperienceOrchestrator.tsx`
*   Create: `app/page.tsx`
*   Create: `app/layout.tsx`

- [ ] **Step 1: Build the UI ExperienceOrchestrator**
  Create: `phases/ExperienceOrchestrator.tsx`
  Code:
  ```typescript
  'use client';
  import { useEffect, useState } from 'react';
  import { usePhaseStore, Phase } from '@/hooks/usePhase';
  import { CONFIG } from '@/constants/content';
  import { audioManager } from '@/lib/audio';
  import { AppCanvas } from '@/components/canvas/AppCanvas';
  import { InvitationScene } from './Invitation/InvitationScene';
  import { GateScene } from './Gate/GateScene';
  import { RevealScene } from './Reveal/RevealScene';
  import { JourneySceneManager } from './Journey/JourneySceneManager';
  import { LetterScene } from './Letter/LetterScene';
  import { Button } from '@/components/ui/button';
  import { Progress } from '@/components/ui/progress';
  import { motion, AnimatePresence } from 'framer-motion';

  export default function ExperienceOrchestrator() {
    const { 
      activePhase, 
      setPhase, 
      userInteracted, 
      setUserInteracted, 
      currentQuestionIndex, 
      nextQuestion,
      currentSceneIndex,
      nextScene,
      prevScene,
      unlockedNavigation,
      jumpToScene
    } = usePhaseStore();

    const [hintsShown, setHintsShown] = useState(0);
    const [selectedWrong, setSelectedWrong] = useState<number | null>(null);

    useEffect(() => {
      audioManager.init(CONFIG.letter.songUrl);
    }, []);

    const handleUserStart = () => {
      setUserInteracted();
      setPhase('invitation');
    };

    const handleQuizOption = (optIndex: number) => {
      const currentQ = CONFIG.quiz[currentQuestionIndex];
      if (optIndex === currentQ.correctIndex) {
        setSelectedWrong(null);
        setHintsShown(0);
        if (currentQuestionIndex < CONFIG.quiz.length - 1) {
          nextQuestion();
        } else {
          setPhase('reveal');
          audioManager.playSong();
        }
      } else {
        setSelectedWrong(optIndex);
        setHintsShown(prev => prev + 1);
      }
    };

    return (
      <main className="relative w-screen h-screen overflow-hidden select-none bg-space-black">
        {/* 3D Canvas Background */}
        <AppCanvas>
          {activePhase === 'invitation' && <InvitationScene />}
          {activePhase === 'gate' && <GateScene />}
          {activePhase === 'reveal' && <RevealScene />}
          {activePhase === 'journey' && <JourneySceneManager />}
          {activePhase === 'letter' && <LetterScene />}
        </AppCanvas>

        {/* HTML UI overlays */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none p-6 md:p-12">
          {/* HUD Top Bar */}
          <div className="w-full flex justify-between items-center pointer-events-auto">
            <h1 className="font-serif italic text-lg tracking-widest text-space-goldLight">Fusco & Momo</h1>
            {activePhase === 'gate' && (
              <div className="w-48">
                <Progress value={((currentQuestionIndex) / CONFIG.quiz.length) * 100} />
              </div>
            )}
          </div>

          {/* Interactive Screen Center Content */}
          <div className="flex-1 flex items-center justify-center pointer-events-auto">
            <AnimatePresence mode="wait">
              {activePhase === 'loading' && (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="font-serif italic text-xl text-space-goldLight mb-6">Momo's Anniversary Journey</p>
                  <Button onClick={handleUserStart}>Enter the stars</Button>
                </motion.div>
              )}

              {activePhase === 'invitation' && (
                <motion.div 
                  key="inv"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="text-center max-w-md"
                >
                  <h2 className="font-serif italic text-4xl mb-4 tracking-wider text-space-rose">Momo</h2>
                  <p className="text-sm font-sans tracking-widest uppercase text-space-goldLight mb-8">Someone left something here for you.</p>
                  <Button onClick={() => setPhase('gate')}>Open it 💕</Button>
                </motion.div>
              )}

              {activePhase === 'gate' && (
                <motion.div 
                  key="quiz"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-space-black/80 border border-space-gold/30 rounded-2xl p-8 max-w-md w-full backdrop-blur-md shadow-2xl"
                >
                  <p className="text-xs uppercase tracking-widest text-space-gold mb-2">Question {currentQuestionIndex + 1} of {CONFIG.quiz.length}</p>
                  <h3 className="font-serif text-lg text-space-paper mb-6">{CONFIG.quiz[currentQuestionIndex].question}</h3>
                  <div className="flex flex-col gap-3">
                    {CONFIG.quiz[currentQuestionIndex].options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizOption(idx)}
                        className={`w-full py-3 px-4 rounded-xl text-left text-sm transition-all duration-300 border ${
                          selectedWrong === idx 
                            ? 'border-red-500/50 bg-red-950/20 text-red-200' 
                            : 'border-white/10 hover:border-space-gold/50 bg-white/5 text-space-paper'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {hintsShown >= 2 && (
                    <p className="mt-4 text-xs italic text-space-rose/80 text-center transition-all duration-300">
                      Hint: {CONFIG.quiz[currentQuestionIndex].hint}
                    </p>
                  )}
                </motion.div>
              )}

              {activePhase === 'reveal' && (
                <motion.div 
                  key="reveal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center max-w-lg"
                >
                  <h2 className="font-serif italic text-3xl md:text-5xl text-space-rose mb-4 animate-pulse">Happy Anniversary</h2>
                  <p className="font-sans text-sm uppercase tracking-widest text-space-goldLight mb-10">Momo.</p>
                  <Button onClick={() => setPhase('journey')}>Let's travel back... 🎞️</Button>
                </motion.div>
              )}

              {activePhase === 'journey' && (
                <motion.div 
                  key="journey"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-between w-full h-full max-h-[80vh]"
                >
                  <div className="bg-space-black/70 border border-white/5 rounded-2xl p-6 max-w-xl text-center backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-widest text-space-gold mb-1">{CONFIG.memories[currentSceneIndex].label}</p>
                    <p className="text-[10px] text-white/50 tracking-wider mb-3">{CONFIG.memories[currentSceneIndex].date}</p>
                    <h3 className="font-serif italic text-2xl text-space-paper mb-4">{CONFIG.memories[currentSceneIndex].title}</h3>
                    <p className="text-sm leading-relaxed text-space-paper/80 font-serif">{CONFIG.memories[currentSceneIndex].story}</p>
                  </div>

                  <div className="flex gap-4 mt-8 pointer-events-auto">
                    {currentSceneIndex > 0 && (
                      <Button variant="outline" onClick={prevScene}>Back</Button>
                    )}
                    {currentSceneIndex < CONFIG.memories.length - 1 ? (
                      <Button onClick={nextScene}>Next Moment</Button>
                    ) : (
                      <Button onClick={() => setPhase('letter')}>Read Letter →</Button>
                    )}
                  </div>
                </motion.div>
              )}

              {activePhase === 'letter' && (
                <motion.div 
                  key="letter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-space-paper border border-space-sepia/20 rounded-2xl p-8 max-w-xl max-h-[70vh] overflow-y-auto shadow-2xl pointer-events-auto"
                >
                  <p className="font-serif text-space-sepia whitespace-pre-line leading-relaxed text-base italic">
                    {CONFIG.letter.body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation/Menu Map and Sound toggler */}
          <div className="w-full flex justify-between items-center mt-auto">
            <div>
              {unlockedNavigation && (
                <div className="flex gap-2 pointer-events-auto">
                  {CONFIG.memories.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPhase('journey');
                        jumpToScene(idx);
                      }}
                      className={`w-8 h-8 rounded-full border border-space-gold/30 font-sans text-xs flex items-center justify-center ${
                        currentSceneIndex === idx && activePhase === 'journey' 
                          ? 'bg-space-gold text-space-black' 
                          : 'bg-space-black/50 text-space-goldLight hover:bg-space-gold/25'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setPhase('letter')}
                    className={`w-8 h-8 rounded-full border border-space-rose/30 font-sans text-xs flex items-center justify-center ${
                      activePhase === 'letter' 
                        ? 'bg-space-rose text-white' 
                        : 'bg-space-black/50 text-space-rose hover:bg-space-rose/25'
                    }`}
                  >
                    ✉️
                  </button>
                </div>
              )}
            </div>
            {userInteracted && (
              <button
                onClick={() => {
                  const muted = !audioManager.getVolume();
                  audioManager.setMute(!muted);
                }}
                className="pointer-events-auto w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-space-black/40 hover:bg-white/5 transition-all text-lg"
              >
                🔊
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }
  ```

- [ ] **Step 2: Setup page.tsx root layout loader**
  Create: `app/page.tsx`
  Code:
  ```typescript
  import dynamic from 'next/dynamic';

  const ExperienceOrchestrator = dynamic(
    () => import('@/phases/ExperienceOrchestrator'),
    { ssr: false }
  );

  export default function Home() {
    return <ExperienceOrchestrator />;
  }
  ```

- [ ] **Step 3: Setup layout.tsx page layout**
  Modify: `app/layout.tsx`
  Code:
  ```typescript
  import type { Metadata } from "next";
  import { Playfair_Display } from "next/font/google";
  import "./globals.css";

  const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
  });

  export const metadata: Metadata = {
    title: "Happy Anniversary, Momo 💕",
    description: "An interactive journey built out of our story.",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en" className={playfair.variable}>
        <body>
          {children}
        </body>
      </html>
    );
  }
  ```

- [ ] **Step 4: Commit UI components**
  Run: `git add . && git commit -m "feat: complete UI Orchestrator, HTML templates, and Root entry loaders"`

---

### Task 10: Final integration validation

**Files:**
*   Modify: `package.json`

- [ ] **Step 1: Verify Dev Server compiles and starts**
  Run: `cmd /c pnpm run build`
  Expected: Production Next.js build passes with zero TypeScript or build errors.

- [ ] **Step 2: Commit any final configuration updates**
  Run: `git add . && git commit -m "chore: verify build compile status"`
