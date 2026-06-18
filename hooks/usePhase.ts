import { create } from 'zustand';

export type Phase = 'loading' | 'invitation' | 'gate' | 'reveal' | 'petnames' | 'journey' | 'letter';

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
