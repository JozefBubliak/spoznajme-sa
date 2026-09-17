import { useState, useEffect } from 'react';

const DEFAULTS = { sound: true, strobe: false };

export function useGameSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('gameSettings');
      return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
    } catch { return DEFAULTS; }
  });

  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }, [settings]);

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return { settings, toggle };
}