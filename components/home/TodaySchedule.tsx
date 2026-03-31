'use client';

import GlassCard from '@/components/ui/GlassCard';
import LectureRow from '@/components/ui/LectureRow';
import TestCard from '@/components/ui/TestCard';
import { useGateStore } from '@/store/useGateStore';
import { getTodayKey } from '@/lib/utils';
import { CalendarCheck } from 'lucide-react';

export default function TodaySchedule() {
  const { schedule } = useGateStore();
  const todayKey = getTodayKey();
  const todaySchedule = schedule[todayKey];

  const hasContent = todaySchedule && (
    todaySchedule.lectures.length > 0 || todaySchedule.tests.length > 0
  );

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-[var(--text-primary)]">Today's Schedule</h2>
        {todaySchedule?.isExamPeriod && (
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">
            Exam Period
          </span>
        )}
      </div>

      {!hasContent ? (
        <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
          <CalendarCheck size={32} className="text-[var(--text-muted)] opacity-50" />
          <p className="text-[var(--text-muted)] text-sm">No lectures scheduled for today.</p>
          <p className="text-[var(--text-muted)] text-xs">Enjoy your rest day! 🎉</p>
        </div>
      ) : (
        <div className="space-y-1">
          {todaySchedule.lectures.map(lecture => (
            <LectureRow key={lecture.globalLecId} lecture={lecture} date={todayKey} />
          ))}
          {todaySchedule.tests.length > 0 && (
            <>
              {todaySchedule.lectures.length > 0 && <div className="h-px bg-[var(--card-border)] my-2" />}
              {todaySchedule.tests.map(test => (
                <TestCard key={test.testId} test={test} date={todayKey} />
              ))}
            </>
          )}
        </div>
      )}
    </GlassCard>
  );
}
