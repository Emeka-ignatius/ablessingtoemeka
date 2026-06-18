import { Howl, Howler } from 'howler';

class AudioManager {
  private song: Howl | null = null;
  private initialized = false;
  private muted = false;

  public init(songUrl: string) {
    if (this.initialized) return;
    console.log("Initializing AudioManager with URL:", songUrl);
    this.song = new Howl({
      src: [songUrl],
      html5: false,
      loop: true,
      volume: 0,
      mute: this.muted,
      onload: () => {
        console.log("AudioManager: Audio file loaded successfully.");
      },
      onloaderror: (id, err) => {
        console.error("AudioManager load error:", err, "for url:", songUrl);
      },
      onplayerror: (id, err) => {
        console.error("AudioManager play error:", err);
        if (this.song) {
          this.song.once('unlock', () => {
            console.log("AudioManager unlocked, playing song...");
            this.song?.play();
            this.song?.fade(0, 0.8, 1000);
          });
        }
      }
    });
    this.initialized = true;
  }

  public playSong() {
    console.log("playSong() called. Song instance exists:", !!this.song);
    if (!this.song) return;

    // Explicitly resume the Howler AudioContext on user interaction
    if (typeof window !== 'undefined' && Howler.ctx && Howler.ctx.state === 'suspended') {
      console.log("Howler AudioContext is suspended, attempting to resume...");
      Howler.ctx.resume().then(() => {
        console.log("Howler AudioContext resumed successfully. State:", Howler.ctx.state);
      }).catch((err) => {
        console.error("Failed to resume Howler AudioContext:", err);
      });
    }

    console.log("Song playing status:", this.song.playing());
    if (!this.song.playing()) {
      const id = this.song.play();
      console.log("song.play() triggered, play ID:", id);
      this.song.fade(0, 0.8, 1000);
    }
  }

  public pauseSong() {
    if (this.song && this.song.playing()) {
      this.song.pause();
    }
  }

  public resumeSong() {
    if (this.song && !this.song.playing()) {
      this.song.play();
    }
  }

  public setMute(muted: boolean) {
    this.muted = muted;
    if (!this.song) return;
    this.song.mute(muted);
  }

  public fadeOutAndStop(duration = 2000) {
    if (this.song) {
      const oldSong = this.song;
      oldSong.fade(oldSong.volume() as number, 0, duration);
      setTimeout(() => {
        oldSong.stop();
        oldSong.unload();
      }, duration);
      this.song = null;
    }
  }

  public crossfadeTo(newSongUrl: string, duration = 2000) {
    if (this.song) {
      const oldSong = this.song;
      oldSong.fade(oldSong.volume() as number, 0, duration);
      setTimeout(() => {
        oldSong.stop();
        oldSong.unload();
      }, duration);
    }

    this.song = new Howl({
      src: [newSongUrl],
      html5: false,
      loop: true,
      volume: 0,
      mute: this.muted,
      onloaderror: (id, err) => {
        console.error("AudioManager load error during crossfade:", err, "for url:", newSongUrl);
      },
      onplayerror: (id, err) => {
        console.error("AudioManager play error during crossfade:", err);
      }
    });
    
    this.song.play();
    this.song.fade(0, 0.8, duration);
    this.initialized = true;
  }

  public getVolume(): number {
    return this.song ? (this.song.volume() as number) : 0;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public reset() {
    if (this.song) {
      this.song.stop();
      this.song.unload();
      this.song = null;
    }
    this.initialized = false;
  }
}

const globalForAudio = globalThis as unknown as { audioManager?: AudioManager };

export const audioManager = globalForAudio.audioManager ?? new AudioManager();

if (process.env.NODE_ENV !== 'production') {
  globalForAudio.audioManager = audioManager;
}
