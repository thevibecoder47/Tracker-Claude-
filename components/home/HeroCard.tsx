'use client';

import { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';
import { useGateStore } from '@/store/useGateStore';
import { getDayKey, getGreeting, getDaysToGate, getTodayKey } from '@/lib/utils';

export default function HeroCard() {
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');
  const { schedule, lectureProgress } = useGateStore();

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const todayKey = getTodayKey();
  const todaySchedule = schedule[todayKey];
  const totalToday = todaySchedule?.lectures.length ?? 0;
  const doneToday = todaySchedule?.lectures.filter(l => !!lectureProgress[l.globalLecId]).length ?? 0;
  const todayPct = totalToday > 0 ? Math.round((doneToday / totalToday) * 100) : 0;
  const daysLeft = getDaysToGate();
  const greeting = getGreeting();

  return (
    <GlassCard className="relative overflow-hidden gradient-bg">
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #4F8CFF, transparent)' }} />

      <div className="relative z-10">
        {/* Greeting + date */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <p className="text-[var(--text-muted)] text-sm font-medium">{greeting} 👋</p>
            <p className="text-[var(--text-secondary)] text-sm mt-0.5">{dateStr}</p>
          </div>
          {/* Live clock */}
          <div className="font-mono text-xl font-medium text-accent-blue tabular-nums">
            {time}
          </div>
        </div>

        {/* Countdown */}
        <div className="text-center my-4">
          <p className="font-bebas text-5xl md:text-7xl gradient-text leading-none tracking-wide">
            {daysLeft}
          </p>
          <p className="font-bebas text-lg md:text-xl text-[var(--text-muted)] tracking-widest mt-1">
            DAYS TO GATE 2027
          </p>
        </div>

        {/* Today's progress */}
        <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[var(--text-secondary)]">Today's Progress</span>
            <span className="text-xs font-mono text-accent-blue">
              {doneToday}/{totalToday} lectures
            </span>
          </div>
          <ProgressBar value={todayPct} color="#4F8CFF" height="h-2.5" />
          {totalToday === 0 && (
            <p className="text-xs text-[var(--text-muted)] mt-2">No lectures scheduled today</p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
