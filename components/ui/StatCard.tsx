'use client';

import { useEffect, useState } from 'react';
import GlassCard from './GlassCard';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
  suffix?: string;
  animate?: boolean;
  sub?: string;
}

export default function StatCard({ label, value, icon, color = '#4F8CFF', suffix, animate = true, sub }: StatCardProps) {
  const numericValue = typeof value === 'number' ? value : null;
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!animate || numericValue === null) return;
    const steps = 30;
    const increment = numericValue / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayed(numericValue);
        clearInterval(interval);
      } else {
        setDisplayed(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(interval);
  }, [numericValue, animate]);

  const displayValue = numericValue !== null && animate ? displayed : value;

  return (
    <GlassCard className="flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <p className="text-[var(--text-muted)] text-xs font-medium uppercase tracking-wider">{label}</p>
        {icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center opacity-90"
            style={{ background: `${color}20` }}
          >
            <span style={{ color }}>{icon}</span>
          </div>
        )}
      </div>
      <div className="flex items-end gap-1">
        <span className="font-bebas text-3xl leading-none" style={{ color }}>
          {displayValue}
        </span>
        {suffix && <span className="text-[var(--text-muted)] text-sm mb-0.5">{suffix}</span>}
      </div>
      {sub && <p className="text-[var(--text-muted)] text-xs">{sub}</p>}
    </GlassCard>
  );
}
