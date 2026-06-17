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
