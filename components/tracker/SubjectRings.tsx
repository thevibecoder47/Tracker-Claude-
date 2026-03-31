'use client';

import GlassCard from '@/components/ui/GlassCard';
import CircularRing from '@/components/ui/CircularRing';
import { useGateStore } from '@/store/useGateStore';
import { SYLLABUS } from '@/lib/syllabus';
import { SUBJECT_COLORS_BY_ID, SUBJECT_SHORT_BY_ID } from '@/lib/colors';
import { getProgressForSubject } from '@/lib/utils';

export default function SubjectRings() {
  const { lectureProgress } = useGateStore();

  return (
    <GlassCard>
      <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-4">Subject Progress Rings</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {SYLLABUS.map(subject => {
          const { percent } = getProgressForSubject(subject.id, lectureProgress);
          const color = SUBJECT_COLORS_BY_ID[subject.id] ?? '#4F8CFF';
          const shortName = SUBJECT_SHORT_BY_ID[subject.id] ?? subject.id;

          return (
            <div key={subject.id} className="flex flex-col items-center gap-1.5">
              <div
                className="rounded-full p-0.5"
                style={{ boxShadow: `0 0 0 2px ${color}40` }}
              >
                <CircularRing
                  value={percent}
                  size={56}
                  strokeWidth={5}
                  color={color}
                  fontSize={10}
                  showLabel
                />
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] text-center leading-tight">
                {shortName}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
