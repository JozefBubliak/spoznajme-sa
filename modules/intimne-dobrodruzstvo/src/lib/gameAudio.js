let ctx = null;
function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function beep(freq, duration, volume = 0.4, type = 'sine') {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration);
  } catch (e) { console.warn('Audio error', e); }
}

export function playStart() {
  beep(523, 0.15, 0.35);
  setTimeout(() => beep(659, 0.15, 0.35), 160);
  setTimeout(() => beep(784, 0.3, 0.4), 320);
}

export function playEnd() {
  beep(784, 0.15, 0.35);
  setTimeout(() => beep(659, 0.15, 0.35), 160);
  setTimeout(() => beep(523, 0.4, 0.4), 320);
}

export function playTick() {
  beep(880, 0.08, 0.15);
}