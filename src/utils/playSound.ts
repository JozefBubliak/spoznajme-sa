export function playSound(name: 'tick' | 'correct' | 'wrong' | 'win') {
  const sounds: Record<string, string> = {
    tick: '/sounds/tick.mp3',
    correct: '/sounds/correct.mp3',
    wrong: '/sounds/wrong.mp3',
    win: '/sounds/win.mp3',
  };
  const src = sounds[name];
  if (!src) return;
  const audio = new Audio(src);
  audio.play().catch(() => {});
}
