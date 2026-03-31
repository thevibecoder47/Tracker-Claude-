'use client';

import { BookOpen, ClipboardCheck, TrendingUp, Calendar, Flame, Award } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import { useGateStore } from '@/store/useGateStore';
import { getOverallProgress } from '@/lib/utils';
import { SYLLABUS } from '@/lib/syllabus';

export default function OverallStatsGrid() {
  const { lectureProgress, testProgress, streakData } = useGateStore();

  const lecturesDone = Object.keys(lectureProgress).length;
  const testsDone = Object.keys(testProgress).length;
  const progress = getOverallProgress(lectureProgress);
  const streak = streakData?.current ?? 0;
  const bestStreak = streakData?.best ?? 0;
  const daysLogged = streakData?.daysActive.length ?? 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <StatCard label="Lectures Done" value={lecturesDone} icon={<BookOpen size={14} />} color="#4F8CFF" animate />
      <StatCard label="Tests Attempted" value={testsDone} icon={<ClipboardCheck size={14} />} color="#34D399" animate />
      <StatCard label="Progress" value={progress} suffix="%" icon={<TrendingUp size={14} />} color="#A78BFA" animate />
      <StatCard label="Days Logged" value={daysLogged} icon={<Calendar size={14} />} color="#22D3EE" animate />
      <StatCard label="Current Streak" value={streak} suffix="days" icon={<Flame size={14} />} color="#FB923C" animate />
      <StatCard label="Best Streak" value={bestStreak} suffix="days" icon={<Award size={14} />} color="#FBBF24" animate />
    </div>
  );
}
