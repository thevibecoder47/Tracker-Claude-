'use client';

import { DaySchedule, LectureProgress, TestProgress } from '@/types';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';

interface MonthStatsProps {
  dayKeys: string[];
  schedule: Record<string, DaySchedule>;
  lectureProgress: LectureProgress;
  testProgress: TestProgress;
}

export default function MonthStats({ dayKeys, schedule, lectureProgress, testProgress }: MonthStatsProps) {
  let lecScheduled = 0;
  let lecCompleted = 0;
  let testsScheduled = 0;
  let testsAttempted = 0;

  for (const k of dayKeys) {
    const d = schedule[k];
    if (!d) continue;
    lecScheduled += d.lectures.length;
    lecCompleted += d.lectures.filter(l => !!lectureProgress[l.globalLecId]).length;
    testsScheduled += d.tests.length;
    testsAttempted += d.tests.filter(t => !!testProgress[t.testId]).length;
  }

  const pct = lecScheduled > 0 ? Math.round((lecCompleted / lecScheduled) * 100) : 0;

  const stats = [
    { label: 'Lec Scheduled', value: lecScheduled, color: '#4F8CFF' },
    { label: 'Lec Completed', value: lecCompleted, color: '#34D399' },
    { label: 'Tests Scheduled', value: testsScheduled, color: '#FB923C' },
    { label: 'Tests Attempted', value: testsAttempted, color: '#A78BFA' },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map(s => (
          <GlassCard key={s.label} className="text-center">
            <p className="font-bebas text-3xl leading-none" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1 uppercase">{s.label}</p>
          </GlassCard>
        ))}
      </div>

      {/* Wide progress bar */}
      <GlassCard>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[var(--text-primary)]">Monthly Completion</span>
          <span className="font-mono text-sm text-accent-blue font-semibold">{pct}%</span>
        </div>
        <ProgressBar value={pct} height="h-3" color="#4F8CFF" />
        <p className="text-xs text-[var(--text-muted)] mt-1.5">{lecCompleted} of {lecScheduled} lectures completed</p>
      </GlassCard>
    </div>
  );
}
