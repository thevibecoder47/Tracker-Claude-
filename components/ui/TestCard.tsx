'use client';

import { useGateStore } from '@/store/useGateStore';
import { ScheduledTest } from '@/types';
import { SUBJECT_COLORS_BY_ID } from '@/lib/colors';
import { getTodayKey } from '@/lib/utils';

interface TestCardProps {
  test: ScheduledTest;
  date: string;
}

export default function TestCard({ test, date }: TestCardProps) {
  const { testProgress, markTest } = useGateStore();
  const isAttempted = !!testProgress[test.testId];
  const color = SUBJECT_COLORS_BY_ID[test.subjectId] ?? '#FB923C';

  function handleMark() {
    if (!isAttempted) {
      markTest(test.testId, date);
    }
  }

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 ${
        isAttempted
          ? 'border-accent-green/30 bg-accent-green/5 opacity-70'
          : 'border-accent-orange/30 bg-accent-orange/5'
      }`}
    >
      {/* Test badge */}
      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-accent-orange/20 text-accent-orange flex-shrink-0">
        TEST
      </span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate text-[var(--text-primary)]">{test.label}</p>
        <p className="text-xs text-[var(--text-muted)] truncate">{test.chapterName}</p>
      </div>

      {/* Status */}
      {isAttempted ? (
        <span className="text-xs font-mono text-accent-green flex-shrink-0 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Done
        </span>
      ) : (
        <button
          onClick={handleMark}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-accent-orange/20 text-accent-orange hover:bg-accent-orange/30 transition-colors flex-shrink-0"
        >
          Mark Attempted
        </button>
      )}
    </div>
  );
}
