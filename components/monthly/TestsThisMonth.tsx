'use client';

import GlassCard from '@/components/ui/GlassCard';
import { DaySchedule, TestProgress, ScheduledTest } from '@/types';
import { useGateStore } from '@/store/useGateStore';
import { formatDateShort } from '@/lib/utils';

interface TestsThisMonthProps {
  dayKeys: string[];
  schedule: Record<string, DaySchedule>;
  testProgress: TestProgress;
}

export default function TestsThisMonth({ dayKeys, schedule, testProgress }: TestsThisMonthProps) {
  const { markTest } = useGateStore();

  const tests: Array<{ test: ScheduledTest; date: string }> = [];
  for (const k of dayKeys) {
    const d = schedule[k];
    if (!d) continue;
    for (const t of d.tests) {
      tests.push({ test: t, date: k });
    }
  }

  if (tests.length === 0) return null;

  return (
    <GlassCard>
      <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-3">Tests This Month</h3>
      <div className="space-y-2">
        {tests.map(({ test, date }) => {
          const attempted = !!testProgress[test.testId];
          return (
            <div
              key={test.testId}
              className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                attempted
                  ? 'border-accent-green/20 bg-accent-green/5 opacity-70'
                  : 'border-accent-orange/20 bg-accent-orange/5'
              }`}
            >
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-accent-orange/20 text-accent-orange rounded-md flex-shrink-0">
                TEST
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate text-[var(--text-primary)]">{test.label}</p>
                <p className="text-[10px] text-[var(--text-muted)]">{formatDateShort(date)}</p>
              </div>
              {attempted ? (
                <span className="text-[10px] font-mono text-accent-green flex-shrink-0">✓ Done</span>
              ) : (
                <button
                  onClick={() => markTest(test.testId, date)}
                  className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-accent-orange/20 text-accent-orange hover:bg-accent-orange/30 transition-colors flex-shrink-0"
                >
                  Mark
                </button>
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
