'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarCell from './CalendarCell';
import DayDetailPanel from './DayDetailPanel';
import GlassCard from '@/components/ui/GlassCard';
import { useGateStore } from '@/store/useGateStore';
import { getDayKey } from '@/lib/utils';

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function CalendarGrid() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const { schedule, lectureProgress, testProgress } = useGateStore();

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }
  function goToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
  }

  // Build grid cells
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();

  const selectedSchedule = selectedDay ? schedule[selectedDay] : undefined;

  return (
    <>
      <GlassCard noPad>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--card-border)]">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)]">
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-3">
            <span className="font-bebas text-lg tracking-wider text-[var(--text-primary)]">{monthName}</span>
            <button
              onClick={goToday}
              className="text-xs px-2.5 py-1 rounded-lg bg-accent-blue/10 text-accent-blue font-medium hover:bg-accent-blue/20 transition-colors"
            >
              Today
            </button>
          </div>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)]">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="calendar-grid px-2 pt-2 pb-1">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-[10px] font-mono font-semibold text-[var(--text-muted)] py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="calendar-grid gap-1 p-2">
          {cells.map((day, i) => {
            const dayKey = day ? getDayKey(day) : null;
            const isToday = day ? getDayKey(day) === getDayKey(today) : false;
            const isCurrentMonth = true;
            return (
              <CalendarCell
                key={i}
                day={day}
                daySchedule={dayKey ? schedule[dayKey] : undefined}
                lectureProgress={lectureProgress}
                testProgress={testProgress}
                isToday={isToday}
                isCurrentMonth={isCurrentMonth}
                onClick={() => dayKey && setSelectedDay(dayKey)}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 px-4 py-3 border-t border-[var(--card-border)]">
          {[
            { color: 'bg-accent-blue', label: 'Lectures' },
            { color: 'bg-accent-orange', label: 'Tests' },
            { color: 'bg-accent-green/60', label: 'Completed' },
            { color: 'bg-yellow-400', label: 'Partial' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${l.color}`} />
              <span className="text-xs text-[var(--text-muted)]">{l.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <DayDetailPanel
        dayKey={selectedDay}
        daySchedule={selectedSchedule}
        onClose={() => setSelectedDay(null)}
      />
    </>
  );
}
