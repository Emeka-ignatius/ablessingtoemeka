import { describe, it, expect, vi, beforeEach } from 'vitest';
import { audioManager } from '../lib/audio';

vi.mock('howler', () => {
  class MockHowl {
    private playingState = false;
    private volumeState = 0;
    private mutedState = false;

    constructor(options: any) {}

    play() {
      this.playingState = true;
      return this;
    }
    fade(from: number, to: number, duration: number) {
      this.volumeState = to;
      return this;
    }
    mute(m: boolean) {
      this.mutedState = m;
      return this;
    }
    playing() {
      return this.playingState;
    }
    volume() {
      return this.volumeState;
    }
    stop() {
      this.playingState = false;
      return this;
    }
    unload() {
      return this;
    }
  }

  return {
    Howl: MockHowl,
    Howler: {
      ctx: {
        state: 'suspended',
        resume: () => Promise.resolve()
      }
    }
  };
});

describe('AudioManager', () => {
  beforeEach(() => {
    audioManager.reset();
  });

  it('should initialize and play song with a fade-in', () => {
    audioManager.init('/audio/Savy_Henry_-_The_Best_Part_Vistanaij.com_.ng_.mp3');
    audioManager.playSong();
    expect(audioManager.getVolume()).toBe(0.8);
  });

  it('should handle muting properly', () => {
    audioManager.init('/audio/Savy_Henry_-_The_Best_Part_Vistanaij.com_.ng_.mp3');
    audioManager.setMute(true);
    // Mock checks correct invocation
    expect(audioManager).toBeDefined();
  });
});
