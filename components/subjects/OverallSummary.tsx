'use client';

import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';
import CircularRing from '@/components/ui/CircularRing';
import { useGateStore } from '@/store/useGateStore';
import { SYLLABUS } from '@/lib/syllabus';
import { getOverallProgress } from '@/lib/utils';

export default function OverallSummary() {
  const { lectureProgress, testProgress, schedule } = useGateStore();

  const totalLectures = SYLLABUS.reduce((a, s) => a + s.totalLectures, 0);
  const completedLectures = SYLLABUS.reduce((acc, subject) => {
    let done = subject.preCompleted ?? 0;
    for (const ch of subject.chapters) {
      for (let l = 1; l <= ch.lectures; l++) {
        if (lectureProgress[`${ch.id}_lec${l}`]) done++;
      }
    }
    return acc + Math.min(done, subject.totalLectures);
  }, 0);

  // Count total tests from syllabus
  const totalTests = SYLLABUS.reduce((acc, s) => acc + s.chapters.reduce((a, c) => a + c.tests.length, 0), 0);
  const completedTests = Object.keys(testProgress).length;

  const pct = getOverallProgress(lectureProgress);

  return (
    <GlassCard className="flex flex-col sm:flex-row items-center gap-6">
      <div className="flex-shrink-0">
        <CircularRing value={pct} size={100} strokeWidth={10} color="#4F8CFF" fontSize={16} />
      </div>
      <div className="flex-1 w-full">
        <h2 className="font-semibold text-[var(--text-primary)] mb-1">Overall Progress</h2>
        <div className="flex items-center gap-4 mb-3">
          <div>
            <p className="font-bebas text-2xl text-accent-blue leading-none">{completedLectures}<span className="text-base text-[var(--text-muted)]">/{totalLectures}</span></p>
            <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Lectures</p>
          </div>
          <div className="w-px h-8 bg-[var(--card-border)]" />
          <div>
            <p className="font-bebas text-2xl text-accent-orange leading-none">{completedTests}<span className="text-base text-[var(--text-muted)]">/{totalTests}</span></p>
            <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Tests</p>
          </div>
        </div>
        <ProgressBar value={pct} height="h-2.5" color="#4F8CFF" />
        <p className="text-xs text-[var(--text-muted)] mt-1.5">{pct}% of complete syllabus covered</p>
      </div>
    </GlassCard>
  );
}
