import { useScholar } from "@/lib/store";

let ctx: AudioContext | null = null;
let musicTimer: number | null = null;
let musicOn = false;

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

function sfxOn() {
  try {
    return useScholar.getState().sound !== false;
  } catch {
    return true;
  }
}

function tone(freq: number, duration: number, type: OscillatorType, gain = 0.06, delay = 0) {
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
  amp.gain.linearRampToValueAtTime(gain, t + 0.018);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.04);
}

function noise(duration: number, gain: number, freq = 900, delay = 0) {
  const audio = context();
  if (!audio) return;
  const length = Math.max(1, Math.floor(audio.sampleRate * duration));
  const buffer = audio.createBuffer(1, length, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  const src = audio.createBufferSource();
  src.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = freq;
  const amp = audio.createGain();
  amp.gain.value = 0;
  src.connect(filter);
  filter.connect(amp);
  amp.connect(audio.destination);
  const t = audio.currentTime + delay;
  amp.gain.setValueAtTime(0, t);
  amp.gain.linearRampToValueAtTime(gain, t + 0.01);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  src.start(t);
  src.stop(t + duration + 0.02);
}

/** Soft UI tap. */
export function playClick() {
  if (!sfxOn()) return;
  tone(880, 0.05, "sine", 0.035);
  noise(0.04, 0.012, 1800);
}

/** Right answer — bright two-note ding. */
export function playCorrect() {
  if (!sfxOn()) return;
  tone(659.25, 0.1, "sine", 0.07);
  tone(987.77, 0.18, "triangle", 0.05, 0.07);
}

/** Wrong answer — short low thud. */
export function playWrong() {
  if (!sfxOn()) return;
  noise(0.12, 0.04, 320);
  tone(174.61, 0.16, "square", 0.03);
}

/** Session / game complete — little fanfare. */
export function playComplete() {
  if (!sfxOn()) return;
  tone(523.25, 0.12, "sine", 0.055);
  tone(659.25, 0.14, "sine", 0.05, 0.09);
  tone(783.99, 0.16, "sine", 0.05, 0.18);
  tone(1046.5, 0.28, "triangle", 0.045, 0.3);
}

/** Outfit or medal unlocked. */
export function playUnlock() {
  if (!sfxOn()) return;
  tone(784, 0.1, "sine", 0.05);
  tone(988, 0.12, "sine", 0.045, 0.08);
  tone(1175, 0.14, "triangle", 0.04, 0.16);
  tone(1568, 0.22, "sine", 0.035, 0.26);
}

/** Dress-up whoosh. */
export function playWhoosh() {
  if (!sfxOn()) return;
  noise(0.22, 0.05, 1400);
  tone(392, 0.16, "sine", 0.03, 0.02);
  tone(523, 0.12, "triangle", 0.025, 0.08);
}

/** Garden watering. */
export function playWater() {
  if (!sfxOn()) return;
  noise(0.08, 0.04, 2200);
  tone(987, 0.07, "sine", 0.04, 0.04);
  noise(0.07, 0.03, 1800, 0.1);
  tone(1175, 0.09, "sine", 0.03, 0.14);
  noise(0.06, 0.025, 1600, 0.2);
}

/** Match-game tile. */
export function playFlip() {
  if (!sfxOn()) return;
  tone(740, 0.06, "triangle", 0.04);
  noise(0.03, 0.015, 2000);
}

/** PE catch / hit. */
export function playHit() {
  if (!sfxOn()) return;
  noise(0.06, 0.05, 900);
  tone(392, 0.08, "square", 0.025);
}

/** Level-up sparkle. */
export function playLevelUp() {
  if (!sfxOn()) return;
  playComplete();
  tone(1318.5, 0.3, "sine", 0.04, 0.42);
}

function musicPulse() {
  if (!musicOn) return;
  const pentatonic = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
  const note = pentatonic[Math.floor(Math.random() * pentatonic.length)];
  tone(note, 0.55, "sine", 0.018);
  tone(note / 2, 0.7, "triangle", 0.01, 0.04);
}

export function startMusic() {
  musicOn = true;
  unlockAudio();
  if (musicTimer != null) return;
  musicPulse();
  musicTimer = window.setInterval(musicPulse, 1400);
}

export function stopMusic() {
  musicOn = false;
  if (musicTimer != null) {
    window.clearInterval(musicTimer);
    musicTimer = null;
  }
}

export function setMusicEnabled(on: boolean) {
  if (on) startMusic();
  else stopMusic();
}
