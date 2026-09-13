let ctx: AudioContext | null = null;

function context() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  context();
}

function tone(freq: number, duration: number, type: OscillatorType, gain = 0.05, delay = 0) {
  const audio = context();
  if (!audio) return;
  const osc = audio.createOscillator();
  const amp = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  amp.gain.value = 0;
  osc.connect(amp);
  amp.connect(audio.destination);
  const t = audio.currentTime + delay;
  amp.gain.setValueAtTime(0, t);
  amp.gain.linearRampToValueAtTime(gain, t + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

export function playCorrect() {
  tone(523.25, 0.12, "sine", 0.04);
  tone(659.25, 0.16, "sine", 0.035, 0.08);
}

export function playWrong() {
  tone(196, 0.18, "triangle", 0.03);
}

export function playComplete() {
  tone(523.25, 0.12, "sine", 0.04);
  tone(659.25, 0.14, "sine", 0.035, 0.1);
  tone(783.99, 0.22, "sine", 0.04, 0.2);
}

export function playClick() {
  tone(880, 0.04, "sine", 0.02);
}
