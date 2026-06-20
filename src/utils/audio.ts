// Lightweight Web Audio system: ambient synth, hover clicks, transitions, chimes.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambient: { osc: OscillatorNode; lfo: OscillatorNode; lfoGain: GainNode } | null = null;
  private enabled = true;

  private ensure() {
    if (this.ctx && this.master) return { ctx: this.ctx, master: this.master };
    if (!this.ctx) {
      const AC = (window.AudioContext || (window as any).webkitAudioContext);
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.4;
      this.master.connect(this.ctx.destination);
    }
    return { ctx: this.ctx!, master: this.master! };
  }

  toggle() {
    this.ensure();
    this.enabled = !this.enabled;
    if (this.master) this.master.gain.value = this.enabled ? 0.4 : 0;
    return this.enabled;
  }

  resume() {
    const { ctx } = this.ensure();
    if (ctx.state === "suspended") ctx.resume();
  }

  startAmbient() {
    const { ctx, master } = this.ensure();
    if (this.ambient) return;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 55;
    const gain = ctx.createGain();
    gain.gain.value = 0.05;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 400;
    osc.connect(filter); filter.connect(gain); gain.connect(master);
    osc.start();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 8;
    lfo.connect(lfoGain).connect(osc.frequency);
    lfo.start();
    this.ambient = { osc, lfo, lfoGain };
  }

  stopAmbient() {
    if (this.ambient) {
      this.ambient.osc.stop();
      this.ambient.lfo.stop();
      this.ambient = null;
    }
  }

  click() {
    const { ctx, master } = this.ensure();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "square";
    o.frequency.setValueAtTime(880, t);
    o.frequency.exponentialRampToValueAtTime(220, t + 0.08);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.06, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + 0.1);
  }

  hover() {
    const { ctx, master } = this.ensure();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(1400, t);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.02, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + 0.06);
  }

  whoosh() {
    const { ctx, master } = this.ensure();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(120, t);
    o.frequency.exponentialRampToValueAtTime(2000, t + 0.6);
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(400, t);
    filter.frequency.exponentialRampToValueAtTime(3000, t + 0.6);
    filter.Q.value = 4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    o.connect(filter).connect(g).connect(master);
    o.start(t); o.stop(t + 0.65);
  }

  chime() {
    const { ctx, master } = this.ensure();
    const t = ctx.currentTime;
    [880, 1320, 1760].forEach((f, i) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t + i * 0.08);
      g.gain.linearRampToValueAtTime(0.08, t + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.6);
      o.connect(g).connect(master);
      o.start(t + i * 0.08); o.stop(t + i * 0.08 + 0.6);
    });
  }

  aiPulse() {
    const { ctx, master } = this.ensure();
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(60, t);
    o.frequency.exponentialRampToValueAtTime(300, t + 1.2);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.2, t + 0.3);
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + 1.5);
  }
}

export const audio = new AudioEngine();
