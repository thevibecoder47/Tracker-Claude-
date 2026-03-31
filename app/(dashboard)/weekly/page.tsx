'use client';

import { useState } from 'react';
import WeekNav from '@/components/weekly/WeekNav';
import WeekSummary from '@/components/weekly/WeekSummary';
import DayCard from '@/components/weekly/DayCard';
import { useGateStore } from '@/store/useGateStore';
import { getWeekRange, getWeekDays } from '@/lib/utils';

export default function WeeklyPage() {
  const today = new Date();
  const [weekStart, setWeekStart] = useState<Date>(() => getWeekRange(today).start);
  const { schedule, lectureProgress, testProgress } = useGateStore();

  function goToday() {
    setWeekStart(getWeekRange(today).start);
  }
  function goPrev() {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(prev);
  }
  function goNext() {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  }

  const dayKeys = getWeekDays(weekStart);
  const activeDays = dayKeys.filter(k => {
    const d = schedule[k];
    return d && (d.lectures.length > 0 || d.tests.length > 0);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <h1 className="font-bebas text-2xl md:text-3xl gradient-text">Weekly View</h1>
        <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-mono mt-0.5">
          Day-by-day schedule breakdown
        </p>
      </div>

      <WeekNav
        weekStart={weekStart}
        onPrev={goPrev}
        onNext={goNext}
        onToday={goToday}
      />

      <WeekSummary
        dayKeys={dayKeys}
        schedule={schedule}
        lectureProgress={lectureProgress}
        testProgress={testProgress}
      />

      {activeDays.length === 0 ? (
        <div className="glass-card rounded-card p-10 text-center">
          <p className="text-[var(--text-muted)] text-sm">No lectures scheduled this week.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeDays.map(key => (
            <DayCard
              key={key}
              dayKey={key}
              daySchedule={schedule[key]}
              lectureProgress={lectureProgress}
              testProgress={testProgress}
            />
          ))}
        </div>
      )}
    </div>
  );
}
