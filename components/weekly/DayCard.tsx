'use client';

import GlassCard from '@/components/ui/GlassCard';
import LectureRow from '@/components/ui/LectureRow';
import TestCard from '@/components/ui/TestCard';
import CircularRing from '@/components/ui/CircularRing';
import { DaySchedule, LectureProgress, TestProgress } from '@/types';

interface DayCardProps {
  dayKey: string;
  daySchedule: DaySchedule;
  lectureProgress: LectureProgress;
  testProgress: TestProgress;
}

export default function DayCard({ dayKey, daySchedule, lectureProgress, testProgress }: DayCardProps) {
  const date = new Date(dayKey + 'T00:00:00');
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dateNum = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

  const total = daySchedule.lectures.length;
  const done = daySchedule.lectures.filter(l => !!lectureProgress[l.globalLecId]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  return (
    <GlassCard className={isToday ? 'ring-2 ring-accent-blue' : ''}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className={`font-semibold text-sm ${isToday ? 'text-accent-blue' : 'text-[var(--text-primary)]'}`}>
            {dayName}
            {isToday && <span className="ml-2 text-[10px] font-mono bg-accent-blue/10 text-accent-blue px-1.5 py-0.5 rounded-full">TODAY</span>}
          </p>
          <p className="text-xs text-[var(--text-muted)]">{dateNum}</p>
        </div>
        {total > 0 && (
          <CircularRing value={pct} size={44} strokeWidth={5} color="#4F8CFF" fontSize={10} />
        )}
      </div>

      {/* Lectures */}
      {daySchedule.lectures.length === 0 && daySchedule.tests.length === 0 ? (
        <p className="text-xs text-[var(--text-muted)] text-center py-2">Rest day</p>
      ) : (
        <div className="space-y-1">
          {daySchedule.lectures.map(lecture => (
            <LectureRow key={lecture.globalLecId} lecture={lecture} date={dayKey} />
          ))}
          {daySchedule.tests.length > 0 && (
            <>
              {daySchedule.lectures.length > 0 && <div className="h-px bg-[var(--card-border)] my-1.5" />}
              {daySchedule.tests.map(test => (
                <TestCard key={test.testId} test={test} date={dayKey} />
              ))}
            </>
          )}
        </div>
      )}
    </GlassCard>
  );
}
