'use client';

import { useGateStore } from '@/store/useGateStore';
import { ScheduledLecture } from '@/types';
import { SUBJECT_COLORS_BY_ID } from '@/lib/colors';
import { getTodayKey } from '@/lib/utils';

interface LectureRowProps {
  lecture: ScheduledLecture;
  date: string;
}

export default function LectureRow({ lecture, date }: LectureRowProps) {
  const { lectureProgress, markLecture, unmarkLecture } = useGateStore();
  const isDone = !!lectureProgress[lecture.globalLecId];
  const color = SUBJECT_COLORS_BY_ID[lecture.subjectId] ?? '#4F8CFF';

  function toggle() {
    if (isDone) {
      unmarkLecture(lecture.globalLecId);
    } else {
      markLecture(lecture.globalLecId, date);
    }
  }

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
        isDone ? 'opacity-60' : 'hover:bg-[var(--bg-secondary)]'
      }`}
    >
      {/* Color accent */}
      <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ background: color }} />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isDone ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
          {lecture.chapterName}
        </p>
        <p className="text-xs text-[var(--text-muted)] truncate">{lecture.subjectName}</p>
      </div>

      {/* Lec badge */}
      <span className="text-xs font-mono text-[var(--text-muted)] flex-shrink-0 hidden sm:block">
        Lec {lecture.lecNum}
      </span>

      {/* Checkbox */}
      <button
        onClick={toggle}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
          isDone
            ? 'border-transparent'
            : 'border-slate-300 dark:border-slate-600 hover:border-accent-blue'
        }`}
        style={isDone ? { background: color } : {}}
        aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
      >
        {isDone && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
