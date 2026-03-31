'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ProgressBar from '@/components/ui/ProgressBar';
import { useGateStore } from '@/store/useGateStore';
import { SYLLABUS } from '@/lib/syllabus';
import { SUBJECT_COLORS_BY_ID } from '@/lib/colors';

export default function SubjectAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { lectureProgress, testProgress, markTest, schedule } = useGateStore();

  function toggle(id: string) {
    setOpenId(prev => prev === id ? null : id);
  }

  // Find which tests have been scheduled (to find dates)
  const testDateMap: Record<string, string> = {};
  for (const [dateKey, day] of Object.entries(schedule)) {
    for (const t of day.tests) {
      if (!testDateMap[t.testId]) testDateMap[t.testId] = dateKey;
    }
  }

  return (
    <div className="space-y-2">
      {SYLLABUS.map(subject => {
        const color = SUBJECT_COLORS_BY_ID[subject.id] ?? '#4F8CFF';
        const isOpen = openId === subject.id;

        // Calculate progress
        let completed = subject.preCompleted ?? 0;
        const total = subject.totalLectures;
        for (const ch of subject.chapters) {
          for (let l = 1; l <= ch.lectures; l++) {
            if (lectureProgress[`${ch.id}_lec${l}`]) completed++;
          }
        }
        completed = Math.min(completed, total);
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

        const allTests = subject.chapters.flatMap(ch => ch.tests);
        const testsAttempted = allTests.filter(t => !!testProgress[t.id]).length;

        return (
          <GlassCard key={subject.id} noPad className="overflow-hidden">
            {/* Header row */}
            <button
              onClick={() => toggle(subject.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-[var(--bg-secondary)] transition-colors"
            >
              {/* Color dot */}
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />

              {/* Subject name */}
              <span className="flex-1 font-medium text-sm text-[var(--text-primary)] min-w-0 truncate">
                {subject.name}
              </span>

              {/* Tests badge */}
              {allTests.length > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-orange/15 text-accent-orange flex-shrink-0">
                  {testsAttempted}/{allTests.length} tests
                </span>
              )}

              {/* Fraction */}
              <span className="text-xs font-mono text-[var(--text-muted)] flex-shrink-0">{completed}/{total}</span>

              {/* Inline bar */}
              <div className="w-20 hidden sm:block flex-shrink-0">
                <ProgressBar value={pct} color={color} height="h-1.5" animated={false} />
              </div>

              {/* Chevron */}
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                <ChevronDown size={14} className="text-[var(--text-muted)]" />
              </motion.div>
            </button>

            {/* Expanded content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 border-t border-[var(--card-border)] space-y-3">
                    {/* Mobile progress bar */}
                    <div className="sm:hidden mt-2">
                      <ProgressBar value={pct} color={color} height="h-2" />
                    </div>

                    {subject.chapters.map(ch => {
                      let chDone = 0;
                      let chStart = 1;
                      // Find chapter start offset due to preCompleted
                      let globalOffset = 0;
                      for (const s of subject.chapters) {
                        if (s.id === ch.id) break;
                        globalOffset += s.lectures;
                      }
                      const preInChapter = Math.max(0, Math.min(ch.lectures, (subject.preCompleted ?? 0) - globalOffset));

                      for (let l = 1; l <= ch.lectures; l++) {
                        if (l <= preInChapter || lectureProgress[`${ch.id}_lec${l}`]) chDone++;
                      }
                      const chPct = ch.lectures > 0 ? Math.round((chDone / ch.lectures) * 100) : 0;

                      return (
                        <div key={ch.id}>
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <span className="text-xs text-[var(--text-secondary)] truncate flex-1">{ch.name}</span>
                            <span className="text-[10px] font-mono text-[var(--text-muted)] flex-shrink-0">{chDone}/{ch.lectures}</span>
                          </div>
                          <ProgressBar value={chPct} color={color} height="h-1.5" />

                          {/* Tests for this chapter */}
                          {ch.tests.map(t => {
                            const attempted = !!testProgress[t.id];
                            const testDate = testDateMap[t.id] ?? new Date().toISOString().split('T')[0];
                            return (
                              <div key={t.id} className={`mt-1.5 flex items-center gap-2 pl-2 py-1.5 rounded-lg border text-xs ${
                                attempted
                                  ? 'border-accent-green/20 bg-accent-green/5 opacity-70'
                                  : 'border-accent-orange/20 bg-accent-orange/5'
                              }`}>
                                <span className="font-mono text-[9px] px-1.5 py-0.5 bg-accent-orange/20 text-accent-orange rounded">
                                  T{t.number}
                                </span>
                                <span className="flex-1 text-[var(--text-secondary)] truncate">
                                  {subject.name} — Test {t.number}
                                </span>
                                {attempted ? (
                                  <span className="text-accent-green font-mono text-[9px] pr-2">✓ Done</span>
                                ) : (
                                  <button
                                    onClick={() => markTest(t.id, testDate)}
                                    className="text-[9px] font-medium px-2 py-0.5 mr-1 rounded bg-accent-orange/20 text-accent-orange hover:bg-accent-orange/30 transition-colors"
                                  >
                                    Mark
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        );
      })}
    </div>
  );
}
