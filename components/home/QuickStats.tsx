'use client';

import { BookOpen, ClipboardCheck, Flame, TrendingUp } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import { useGateStore } from '@/store/useGateStore';
import { getOverallProgress } from '@/lib/utils';

export default function QuickStats() {
  const { lectureProgress, testProgress, streakData } = useGateStore();

  const lecturesDone = Object.keys(lectureProgress).length;
  const testsDone = Object.keys(testProgress).length;
  const streak = streakData?.current ?? 0;
  const overall = getOverallProgress(lectureProgress);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard
        label="Lectures Done"
        value={lecturesDone}
        icon={<BookOpen size={14} />}
        color="#4F8CFF"
        animate
      />
      <StatCard
        label="Tests Attempted"
        value={testsDone}
        icon={<ClipboardCheck size={14} />}
        color="#34D399"
        animate
      />
      <StatCard
        label="Current Streak"
        value={streak}
        suffix="days"
        icon={<Flame size={14} />}
        color="#FB923C"
        animate
      />
      <StatCard
        label="Overall Progress"
        value={overall}
        suffix="%"
        icon={<TrendingUp size={14} />}
        color="#A78BFA"
        animate
      />
    </div>
  );
}
