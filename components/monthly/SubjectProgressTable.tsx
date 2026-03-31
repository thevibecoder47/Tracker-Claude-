'use client';

import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';
import { DaySchedule, LectureProgress, TestProgress } from '@/types';
import { SUBJECT_COLORS_BY_ID } from '@/lib/colors';

interface SubjectProgressTableProps {
  dayKeys: string[];
  schedule: Record<string, DaySchedule>;
  lectureProgress: LectureProgress;
  testProgress: TestProgress;
}

interface SubjectRow {
  subjectId: string;
  subjectName: string;
  scheduled: number;
  completed: number;
  tests: number;
  testsAttempted: number;
}

export default function SubjectProgressTable({ dayKeys, schedule, lectureProgress, testProgress }: SubjectProgressTableProps) {
  const subjectMap: Record<string, SubjectRow> = {};

  for (const k of dayKeys) {
    const d = schedule[k];
    if (!d) continue;
    for (const lec of d.lectures) {
      if (!subjectMap[lec.subjectId]) {
        subjectMap[lec.subjectId] = {
          subjectId: lec.subjectId,
          subjectName: lec.subjectName,
          scheduled: 0,
          completed: 0,
          tests: 0,
          testsAttempted: 0,
        };
      }
      subjectMap[lec.subjectId].scheduled++;
      if (lectureProgress[lec.globalLecId]) subjectMap[lec.subjectId].completed++;
    }
    for (const test of d.tests) {
      if (!subjectMap[test.subjectId]) {
        subjectMap[test.subjectId] = {
          subjectId: test.subjectId,
          subjectName: test.subjectName,
          scheduled: 0,
          completed: 0,
          tests: 0,
          testsAttempted: 0,
        };
      }
      subjectMap[test.subjectId].tests++;
      if (testProgress[test.testId]) subjectMap[test.subjectId].testsAttempted++;
    }
  }

  const rows = Object.values(subjectMap)
    .filter(r => r.scheduled > 0)
    .sort((a, b) => b.scheduled - a.scheduled);

  if (rows.length === 0) return null;

  return (
    <GlassCard>
      <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-3">Subject Progress This Month</h3>
      <div className="space-y-3">
        {rows.map(row => {
          const pct = row.scheduled > 0 ? Math.round((row.completed / row.scheduled) * 100) : 0;
          const color = SUBJECT_COLORS_BY_ID[row.subjectId] ?? '#4F8CFF';
          return (
            <div key={row.subjectId}>
              <div className="flex items-center justify-between mb-1 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-xs font-medium text-[var(--text-primary)] truncate">{row.subjectName}</span>
                  {row.tests > 0 && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-accent-orange/15 text-accent-orange flex-shrink-0">
                      {row.testsAttempted}/{row.tests} tests
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)] flex-shrink-0">
                  {row.completed}/{row.scheduled}
                </span>
              </div>
              <ProgressBar value={pct} color={color} height="h-1.5" animated />
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
