'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { DaySchedule } from '@/types';
import LectureRow from '@/components/ui/LectureRow';
import TestCard from '@/components/ui/TestCard';
import { formatDate } from '@/lib/utils';

interface DayDetailPanelProps {
  dayKey: string | null;
  daySchedule?: DaySchedule;
  onClose: () => void;
}

export default function DayDetailPanel({ dayKey, daySchedule, onClose }: DayDetailPanelProps) {
  return (
    <AnimatePresence>
      {dayKey && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 glass-card rounded-t-2xl p-5 max-h-[75vh] overflow-y-auto md:max-w-lg md:mx-auto md:left-1/2 md:-translate-x-1/2"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {dayKey ? formatDate(dayKey) : ''}
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  {daySchedule?.isExamPeriod ? '⚠️ Exam Period — Light Schedule' : ''}
                </p>
              </div>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            {(!daySchedule || (daySchedule.lectures.length === 0 && daySchedule.tests.length === 0)) ? (
              <p className="text-[var(--text-muted)] text-sm text-center py-6">
                No schedule for this day.
              </p>
            ) : (
              <div className="space-y-1">
                {daySchedule.lectures.map(lecture => (
                  <LectureRow key={lecture.globalLecId} lecture={lecture} date={dayKey!} />
                ))}
                {daySchedule.tests.length > 0 && (
                  <>
                    {daySchedule.lectures.length > 0 && <div className="h-px bg-[var(--card-border)] my-2" />}
                    {daySchedule.tests.map(test => (
                      <TestCard key={test.testId} test={test} date={dayKey!} />
                    ))}
                  </>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
