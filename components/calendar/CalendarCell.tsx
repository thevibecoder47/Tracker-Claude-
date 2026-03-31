'use client';

import { DaySchedule } from '@/types';
import { LectureProgress, TestProgress } from '@/types';
import { cn } from '@/lib/utils';

interface CalendarCellProps {
  day: Date | null;
  daySchedule?: DaySchedule;
  lectureProgress: LectureProgress;
  testProgress: TestProgress;
  isToday: boolean;
  isCurrentMonth: boolean;
  onClick: () => void;
}

export default function CalendarCell({
  day,
  daySchedule,
  lectureProgress,
  testProgress,
  isToday,
  isCurrentMonth,
  onClick,
}: CalendarCellProps) {
  if (!day) {
    return <div className="h-[52px] md:h-[76px]" />;
  }

  const totalLec = daySchedule?.lectures.length ?? 0;
  const doneLec = daySchedule?.lectures.filter(l => !!lectureProgress[l.globalLecId]).length ?? 0;
  const totalTests = daySchedule?.tests.length ?? 0;
  const doneTests = daySchedule?.tests.filter(t => !!testProgress[t.testId]).length ?? 0;
  const hasLectures = totalLec > 0;
  const hasTests = totalTests > 0;
  const allDone = hasLectures && doneLec === totalLec && (!hasTests || doneTests === totalTests);
  const partial = hasLectures && doneLec > 0 && !allDone;

  return (
    <div
      onClick={onClick}
      className={cn(
        'h-[52px] md:h-[76px] border border-[var(--card-border)] rounded-lg p-1 cursor-pointer transition-all hover:border-accent-blue/50 flex flex-col',
        isToday && 'ring-2 ring-accent-blue',
        !isCurrentMonth && 'opacity-30',
        allDone && 'bg-accent-green/10',
        partial && !allDone && 'bg-yellow-500/5',
        daySchedule?.isExamPeriod && 'bg-red-500/5'
      )}
    >
      {/* Day number */}
      <span
        className={cn(
          'text-xs font-medium leading-none w-5 h-5 flex items-center justify-center rounded-full',
          isToday ? 'bg-accent-blue text-white font-bold' : 'text-[var(--text-secondary)]'
        )}
      >
        {day.getDate()}
      </span>

      {/* Dots */}
      <div className="flex gap-0.5 mt-auto px-0.5 pb-0.5 flex-wrap">
        {hasLectures && (
          <div
            className={cn('w-1.5 h-1.5 rounded-full', allDone ? 'bg-accent-green' : partial ? 'bg-yellow-400' : 'bg-accent-blue')}
          />
        )}
        {hasTests && (
          <div className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
        )}
      </div>
    </div>
  );
}
