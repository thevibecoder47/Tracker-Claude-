'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: string;
  className?: string;
  animated?: boolean;
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  color = '#4F8CFF',
  height = 'h-2',
  className,
  animated = true,
  showLabel = false,
}: ProgressBarProps) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!animated) {
      setDisplayed(value);
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value, animated]);

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden', height)}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.min(100, Math.max(0, displayed))}%`,
            background: color,
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[var(--text-muted)] font-mono mt-1 block text-right">
          {Math.round(value)}%
        </span>
      )}
    </div>
  );
}
