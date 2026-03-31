'use client';

import GlassCard from '@/components/ui/GlassCard';
import { useGateStore } from '@/store/useGateStore';
import { getDayKey } from '@/lib/utils';

export default function StreakSection() {
  const { streakData } = useGateStore();

  const current = streakData?.current ?? 0;
  const best = streakData?.best ?? 0;
  const daysActive = streakData?.daysActive ?? [];

  // Build last 30 days
  const last30: Array<{ key: string; active: boolean }> = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = getDayKey(d);
    last30.push({ key, active: daysActive.includes(key) });
  }

  return (
    <GlassCard>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Streak flame */}
        <div className="text-center">
          <p className="font-bebas text-6xl text-accent-orange leading-none">🔥 {current}</p>
          <p className="text-[var(--text-muted)] text-xs font-mono uppercase mt-1">Day Streak</p>
        </div>

        <div className="w-px h-16 bg-[var(--card-border)] hidden sm:block" />

        <div className="text-center">
          <p className="font-bebas text-4xl text-accent-yellow leading-none">{best}</p>
          <p className="text-[var(--text-muted)] text-xs font-mono uppercase mt-1">Best Streak</p>
        </div>

        <div className="flex-1 w-full sm:w-auto">
          <p className="text-xs font-mono text-[var(--text-muted)] mb-2 uppercase">Last 30 Days</p>
          <div className="flex gap-1 flex-wrap">
            {last30.map((d, i) => (
              <div
                key={i}
                title={d.key}
                className="w-4 h-4 rounded-sm transition-colors"
                style={{
                  background: d.active ? '#FB923C' : 'var(--bg-secondary)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
