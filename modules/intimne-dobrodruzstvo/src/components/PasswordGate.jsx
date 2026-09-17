import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';

const ACCESS_PASSWORD = '090720';
const STORAGE_KEY = 'spoznajme_sa_access';

export default function PasswordGate({ children }) {
  const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem(STORAGE_KEY) === 'granted');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.trim() === ACCESS_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'granted');

      setIsUnlocked(true);
      setError('');
      return;
    }

    setError('Nesprávne heslo');
    setPassword('');
  };

  if (isUnlocked) {
    return children;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 py-10 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #16060e 0%, #2a1020 42%, #10202a 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(120deg,rgba(235,176,123,0.18),transparent_45%,rgba(95,180,170,0.14))]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(20deg,rgba(192,64,90,0.16),transparent_48%,rgba(245,221,227,0.08))]" />
      </div>

      <motion.form
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-sm rounded-[28px] border border-white/12 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#e8b06f]/15 text-[#e8b06f]">
              <Lock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#b9a0a7]">Súkromný vstup</p>
              <h1
                className="text-2xl font-bold text-[#f5dde3]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Spoznajme sa
              </h1>
            </div>
          </div>
          <Sparkles className="h-5 w-5 text-[#5fb4aa]" />
        </div>

        <label htmlFor="access-password" className="mb-2 block text-sm font-medium text-[#f0cbd3]">
          Zadajte heslo
        </label>
        <input
          id="access-password"
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError('');
          }}
          className="h-12 w-full rounded-2xl border border-white/12 bg-[#10070c]/70 px-4 text-lg tracking-[0.18em] text-[#f5dde3] outline-none transition focus:border-[#e8b06f]/70 focus:ring-2 focus:ring-[#e8b06f]/20"
        />

        <div className="mt-3 h-5 text-sm text-[#ff9caf]">
          {error}
        </div>

        <button
          type="submit"
          className="mt-3 h-12 w-full rounded-2xl border-0 bg-[#e8b06f] px-5 text-sm font-semibold text-[#1a0710] shadow-lg shadow-black/25 transition hover:bg-[#f0c28a]"
        >
          Vstúpiť
        </button>
      </motion.form>
    </div>
  );
}