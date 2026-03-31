'use client';

import { Sun, Moon } from 'lucide-react';
import { useGateStore } from '@/store/useGateStore';

export default function ThemeToggle() {
  const { theme, setTheme } = useGateStore();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--bg-secondary)] hover:bg-accent-blue/20 transition-colors text-[var(--text-muted)] hover:text-accent-blue"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
