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
