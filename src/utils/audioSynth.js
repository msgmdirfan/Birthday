// =========================================================================
// DREAMY PIANO & MUSIC BOX WEB AUDIO SYNTHESIZER + SOUND EFFECTS
// Provides soothing, zero-dependency background melody + interactive SFX
// =========================================================================

class DreamyAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.45;
    this.customAudio = null;
    this.useCustomAudio = false;
    this.timerId = null;
    this.stepIndex = 0;

    // Dreamy romantic lullaby notes (Frequencies in Hz: Fmaj7 -> Cmaj7 -> Am9 -> Gsus4)
    this.melodySequence = [
      // Bar 1: Fmaj7 (F3, C4, E4, A4)
      { freq: 174.61, dur: 0.8, vel: 0.5 },
      { freq: 261.63, dur: 0.6, vel: 0.4 },
      { freq: 329.63, dur: 0.7, vel: 0.45 },
      { freq: 440.00, dur: 1.2, vel: 0.6 },
      { freq: 329.63, dur: 0.6, vel: 0.35 },
      { freq: 261.63, dur: 0.6, vel: 0.35 },

      // Bar 2: Cmaj7 (C3, G3, E4, B4)
      { freq: 130.81, dur: 0.8, vel: 0.5 },
      { freq: 196.00, dur: 0.6, vel: 0.4 },
      { freq: 329.63, dur: 0.7, vel: 0.45 },
      { freq: 493.88, dur: 1.2, vel: 0.6 },
      { freq: 392.00, dur: 0.6, vel: 0.35 },
      { freq: 329.63, dur: 0.6, vel: 0.35 },

      // Bar 3: Am9 (A2, E3, C4, G4)
      { freq: 110.00, dur: 0.8, vel: 0.5 },
      { freq: 164.81, dur: 0.6, vel: 0.4 },
      { freq: 261.63, dur: 0.7, vel: 0.45 },
      { freq: 392.00, dur: 1.2, vel: 0.6 },
      { freq: 329.63, dur: 0.6, vel: 0.4 },
      { freq: 261.63, dur: 0.6, vel: 0.35 },

      // Bar 4: Gsus4 -> G (G2, D3, G3, C4, B3)
      { freq: 98.00, dur: 0.8, vel: 0.5 },
      { freq: 146.83, dur: 0.6, vel: 0.4 },
      { freq: 261.63, dur: 0.8, vel: 0.5 },
      { freq: 246.94, dur: 1.4, vel: 0.55 },
      { freq: 196.00, dur: 0.6, vel: 0.35 },
      { freq: 146.83, dur: 0.6, vel: 0.35 },
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(freq, duration = 1.2, velocity = 0.5) {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm tone: combination of sine and soft triangle
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + duration);

      const targetGain = velocity * this.volume * 0.35;
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(targetGain, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + duration);
      oscHarmonic.stop(now + duration);
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  startMelodyLoop() {
    if (this.timerId) return;

    const playNext = () => {
      if (!this.isPlaying) return;

      const note = this.melodySequence[this.stepIndex];
      this.playNote(note.freq, note.dur, note.vel);

      this.stepIndex = (this.stepIndex + 1) % this.melodySequence.length;
      this.timerId = setTimeout(playNext, 620); // ~96 BPM smooth arpeggio
    };

    playNext();
  }

  stopMelodyLoop() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  togglePlay() {
    this.init();

    if (this.useCustomAudio && this.customAudio) {
      if (this.isPlaying) {
        this.customAudio.pause();
        this.isPlaying = false;
      } else {
        this.customAudio.play().catch(e => console.warn(e));
        this.isPlaying = true;
      }
      return this.isPlaying;
    }

    if (this.isPlaying) {
      this.stopMelodyLoop();
      this.isPlaying = false;
    } else {
      this.isPlaying = true;
      this.startMelodyLoop();
    }
    return this.isPlaying;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  loadCustomAudioFile(file) {
    try {
      if (this.customAudio) {
        this.customAudio.pause();
        this.customAudio = null;
      }
      this.stopMelodyLoop();

      const url = URL.createObjectURL(file);
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
      this.customAudio.volume = this.volume;
      this.useCustomAudio = true;
      this.customAudio.play().catch(e => console.warn(e));
      this.isPlaying = true;
      return true;
    } catch (e) {
      console.error("Failed to load custom audio:", e);
      return false;
    }
  }

  // Play soft candle blow out sound (whoosh + smoke)
  playCandleBlow() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.25);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
    } catch (e) {
      // ignore
    }
  }

  // Play celestial celebration chime (when all candles are blown)
  playCelebrationChime() {
    this.init();
    if (!this.ctx) return;
    const chimePitches = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5 to G6
    chimePitches.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 2.0, 0.65);
      }, idx * 120);
    });
  }

  // Play secret card unlock sound
  playUnlockSound() {
    this.init();
    if (!this.ctx) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 0.8, 0.4);
      }, idx * 90);
    });
  }
}

export const audioManager = new DreamyAudioEngine();
