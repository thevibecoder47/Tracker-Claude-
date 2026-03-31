import { DaySchedule, LectureProgress, TestProgress, StreakData } from '@/types';
import { SYLLABUS } from './syllabus';

export function getDayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getTodayKey(): string {
  return getDayKey(new Date());
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getDaysToGate(): number {
  const gateDate = new Date('2027-02-01');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  gateDate.setHours(0, 0, 0, 0);
  return Math.ceil((gateDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

export function getWeekRange(date: Date): { start: Date; end: Date } {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const start = new Date(d.setDate(diff));
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export function getWeekDays(weekStart: Date): string[] {
  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    days.push(getDayKey(d));
  }
  return days;
}

export function getMonthDays(year: number, month: number): Date[] {
  const days: Date[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

export function getTotalLectures(): number {
  return SYLLABUS.reduce((acc, s) => acc + s.totalLectures, 0);
}

export function getPreCompletedLectures(): { [subjectId: string]: string[] } {
  const result: { [subjectId: string]: string[] } = {};
  for (const subject of SYLLABUS) {
    if (!subject.preCompleted || subject.preCompleted === 0) continue;
    const ids: string[] = [];
    let globalLec = 0;
    for (const ch of subject.chapters) {
      for (let l = 1; l <= ch.lectures; l++) {
        if (globalLec + l <= subject.preCompleted) {
          ids.push(`${ch.id}_lec${l}`);
        }
      }
      globalLec += ch.lectures;
    }
    result[subject.id] = ids;
  }
  return result;
}

export function calculateStreak(
  lectureProgress: LectureProgress,
  schedule: Record<string, DaySchedule>,
  existingStreak: StreakData | null
): StreakData {
  // Build set of days where user completed at least 1 lecture
  const daysWithActivity = new Set<string>();
  for (const [lecId, data] of Object.entries(lectureProgress)) {
    if (data.date) daysWithActivity.add(data.date);
  }

  const daysActive = Array.from(daysWithActivity).sort();

  // Calculate current streak (consecutive days ending today or yesterday)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = getDayKey(today);

  let current = 0;
  let checkDate = new Date(today);

  // If today has no activity, check from yesterday
  if (!daysWithActivity.has(todayKey)) {
    checkDate.setDate(checkDate.getDate() - 1);
  }

  while (true) {
    const key = getDayKey(checkDate);
    if (daysWithActivity.has(key)) {
      current++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Calculate best streak
  let best = existingStreak?.best ?? 0;
  let tempStreak = 0;
  let prevDate: Date | null = null;

  for (const dayStr of daysActive) {
    const d = new Date(dayStr + 'T00:00:00');
    if (prevDate) {
      const diff = (d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    } else {
      tempStreak = 1;
    }
    if (tempStreak > best) best = tempStreak;
    prevDate = d;
  }

  if (current > best) best = current;

  return {
    current,
    best,
    lastActiveDate: daysActive[daysActive.length - 1] ?? '',
    daysActive,
  };
}

export function getProgressForSubject(
  subjectId: string,
  lectureProgress: LectureProgress
): { completed: number; total: number; percent: number } {
  const subject = SYLLABUS.find(s => s.id === subjectId);
  if (!subject) return { completed: 0, total: 0, percent: 0 };

  const total = subject.totalLectures;
  let completed = subject.preCompleted ?? 0;

  for (const ch of subject.chapters) {
    for (let l = 1; l <= ch.lectures; l++) {
      const id = `${ch.id}_lec${l}`;
      if (lectureProgress[id]) completed++;
    }
  }

  completed = Math.min(completed, total);
  return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
}

export function getOverallProgress(lectureProgress: LectureProgress): number {
  const total = getTotalLectures();
  if (total === 0) return 0;

  let completed = 0;
  for (const subject of SYLLABUS) {
    const prog = getProgressForSubject(subject.id, lectureProgress);
    completed += prog.completed;
  }

  return Math.round((completed / total) * 100);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
