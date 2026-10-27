// Web Audio API Tanpura Synthesizer for Vedic Chanting (Shruti Drone)

class TanpuraDrone {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.pitch = 'C#';
    this.nodes = [];
    this.intervalId = null;
    this.gainNode = null;
  }

  // Pitch base frequencies (fundamental Sa in Hz)
  static PITCH_FREQUENCIES = {
    'A': 220.00,
    'A#': 233.08,
    'B': 246.94,
    'C': 261.63,
    'C#': 277.18, // Traditional South Indian priest middle pitch
    'D': 293.66,
    'D#': 311.13,
    'G': 196.00,
    'G#': 207.65,
  };

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  start(pitch = 'C#') {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.stop();
    this.pitch = pitch;
    this.isPlaying = true;

    const baseFreq = TanpuraDrone.PITCH_FREQUENCIES[pitch] || 277.18;
    
    // Tanpura 4-string pattern: Pa (1.5x) or Ma (1.33x), Sa (1.0x), Sa (1.0x), Kharaj Sa (0.5x)
    const strings = [
      { ratio: 1.5, name: 'Pa', delay: 0 },
      { ratio: 2.0, name: 'Sa High', delay: 1.1 },
      { ratio: 2.0, name: 'Sa High 2', delay: 2.2 },
      { ratio: 1.0, name: 'Sa Main', delay: 3.3 }
    ];

    const playCycle = () => {
      if (!this.isPlaying) return;
      strings.forEach(str => {
        setTimeout(() => {
          if (this.isPlaying) {
            this.pluckString(baseFreq * str.ratio * 0.5);
          }
        }, str.delay * 1000);
      });
    };

    playCycle();
    this.intervalId = setInterval(playCycle, 4400);
  }

  pluckString(freq) {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Harmonics setup
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);
    
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Warm resonant lowpass filter simulating wooden gourd (tumba)
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(4.0, now);

    // Natural plucked acoustic envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.08); // attack
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8); // long resonant decay

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 4.0);
    osc2.stop(now + 4.0);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setPitch(newPitch) {
    this.pitch = newPitch;
    if (this.isPlaying) {
      this.start(newPitch);
    }
  }
}

export const tanpura = new TanpuraDrone();
