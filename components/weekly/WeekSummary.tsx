'use client';

import { DaySchedule, LectureProgress, TestProgress } from '@/types';

interface WeekSummaryProps {
  dayKeys: string[];
  schedule: Record<string, DaySchedule>;
  lectureProgress: LectureProgress;
  testProgress: TestProgress;
}

export default function WeekSummary({ dayKeys, schedule, lectureProgress, testProgress }: WeekSummaryProps) {
  let scheduled = 0;
  let completed = 0;
  let tests = 0;

  for (const key of dayKeys) {
    const day = schedule[key];
    if (!day) continue;
    scheduled += day.lectures.length;
    completed += day.lectures.filter(l => !!lectureProgress[l.globalLecId]).length;
    tests += day.tests.length;
  }

  const pct = scheduled > 0 ? Math.round((completed / scheduled) * 100) : 0;

  const chips = [
    { label: 'Scheduled', value: scheduled, color: '#4F8CFF' },
    { label: 'Completed', value: completed, color: '#34D399' },
    { label: 'Tests', value: tests, color: '#FB923C' },
    { label: '% Done', value: `${pct}%`, color: '#A78BFA' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 mb-4">
      {chips.map(c => (
        <div
          key={c.label}
          className="glass-card rounded-xl p-3 text-center"
        >
          <p className="font-bebas text-2xl leading-none" style={{ color: c.color }}>{c.value}</p>
          <p className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5 uppercase">{c.label}</p>
        </div>
      ))}
    </div>
  );
}
