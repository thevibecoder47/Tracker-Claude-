'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthNavProps {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onCurrent: () => void;
}

export default function MonthNav({ year, month, onPrev, onNext, onCurrent }: MonthNavProps) {
  const label = new Date(year, month, 1)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    .toUpperCase();

  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <button onClick={onPrev} className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] transition-colors">
        <ChevronLeft size={16} />
      </button>
      <div className="flex items-center gap-3">
        <span className="font-bebas text-xl tracking-wider text-[var(--text-primary)]">{label}</span>
        <button
          onClick={onCurrent}
          className="text-xs px-3 py-1.5 rounded-lg bg-accent-blue/10 text-accent-blue font-medium hover:bg-accent-blue/20 transition-colors"
        >
          Current Month
        </button>
      </div>
      <button onClick={onNext} className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] transition-colors">
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
