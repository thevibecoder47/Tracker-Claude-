'use client';

import { useState } from 'react';
import MonthNav from '@/components/monthly/MonthNav';
import MonthStats from '@/components/monthly/MonthStats';
import SubjectProgressTable from '@/components/monthly/SubjectProgressTable';
import TestsThisMonth from '@/components/monthly/TestsThisMonth';
import ActivityStrip from '@/components/monthly/ActivityStrip';
import { useGateStore } from '@/store/useGateStore';
import { getDayKey } from '@/lib/utils';

export default function MonthlyPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const { schedule, lectureProgress, testProgress } = useGateStore();

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }
  function currentMonth() {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }

  // Build dayKeys for this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayKeys: string[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    dayKeys.push(getDayKey(new Date(year, month, d)));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <h1 className="font-bebas text-2xl md:text-3xl gradient-text">Monthly View</h1>
        <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-mono mt-0.5">
          Monthly progress and analytics
        </p>
      </div>

      <MonthNav
        year={year}
        month={month}
        onPrev={prevMonth}
        onNext={nextMonth}
        onCurrent={currentMonth}
      />

      <div className="space-y-4">
        <MonthStats
          dayKeys={dayKeys}
          schedule={schedule}
          lectureProgress={lectureProgress}
          testProgress={testProgress}
        />

        <SubjectProgressTable
          dayKeys={dayKeys}
          schedule={schedule}
          lectureProgress={lectureProgress}
          testProgress={testProgress}
        />

        <TestsThisMonth
          dayKeys={dayKeys}
          schedule={schedule}
          testProgress={testProgress}
        />

        <ActivityStrip
          year={year}
          month={month}
          schedule={schedule}
          lectureProgress={lectureProgress}
        />
      </div>
    </div>
  );
}
