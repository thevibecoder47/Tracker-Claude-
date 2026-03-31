'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDayKey } from '@/lib/utils';

interface WeekNavProps {
  weekStart: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function WeekNav({ weekStart, onPrev, onNext, onToday }: WeekNavProps) {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const startLabel = weekStart.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  const endLabel = weekEnd.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <button
        onClick={onPrev}
        className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="text-center">
        <p className="font-bebas text-lg tracking-wide text-[var(--text-primary)]">
          Week of {startLabel} – {endLabel}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToday}
          className="text-xs px-3 py-1.5 rounded-lg bg-accent-blue/10 text-accent-blue font-medium hover:bg-accent-blue/20 transition-colors"
        >
          This Week
        </button>
        <button
          onClick={onNext}
          className="p-2 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-muted)] transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
