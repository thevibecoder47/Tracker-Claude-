'use client';

import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';
import { DaySchedule, LectureProgress } from '@/types';
import { getDayKey } from '@/lib/utils';

interface ActivityStripProps {
  year: number;
  month: number;
  schedule: Record<string, DaySchedule>;
  lectureProgress: LectureProgress;
}

export default function ActivityStrip({ year, month, schedule, lectureProgress }: ActivityStripProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Split month into weeks (Sun–Sat boundaries)
  const weeks: Date[][] = [];
  let week: Date[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    week.push(date);
    if (date.getDay() === 6 || d === daysInMonth) {
      weeks.push(week);
      week = [];
    }
  }

  return (
    <GlassCard>
      <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-3">Weekly Activity</h3>
      <div className="space-y-2.5">
        {weeks.map((wk, wi) => {
          let scheduled = 0;
          let completed = 0;
          const startLabel = wk[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const endLabel = wk[wk.length - 1].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          for (const d of wk) {
            const key = getDayKey(d);
            const day = schedule[key];
            if (!day) continue;
            scheduled += day.lectures.length;
            completed += day.lectures.filter(l => !!lectureProgress[l.globalLecId]).length;
          }

          const pct = scheduled > 0 ? Math.round((completed / scheduled) * 100) : 0;

          return (
            <div key={wi}>
              <div className="flex items-center justify-between mb-1 gap-2">
                <span className="text-xs text-[var(--text-muted)] font-mono flex-shrink-0">
                  {startLabel} – {endLabel}
                </span>
                <span className="text-xs font-mono text-accent-blue flex-shrink-0">
                  {completed}/{scheduled}
                </span>
              </div>
              {scheduled > 0 ? (
                <ProgressBar value={pct} height="h-2" color={pct === 100 ? '#34D399' : pct > 50 ? '#4F8CFF' : '#FB923C'} />
              ) : (
                <div className="h-2 rounded-full bg-[var(--bg-secondary)]" />
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
