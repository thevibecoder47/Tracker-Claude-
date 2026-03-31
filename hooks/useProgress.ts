import { useGateStore } from '@/store/useGateStore';
import { SYLLABUS } from '@/lib/syllabus';
import { getProgressForSubject, getOverallProgress } from '@/lib/utils';

export function useProgress() {
  const { lectureProgress, testProgress, schedule } = useGateStore();

  const overallPercent = getOverallProgress(lectureProgress);

  const totalLectures = SYLLABUS.reduce((a, s) => a + s.totalLectures, 0);
  const completedLectures = SYLLABUS.reduce((acc, subject) => {
    const { completed } = getProgressForSubject(subject.id, lectureProgress);
    return acc + completed;
  }, 0);

  const totalTests = SYLLABUS.reduce(
    (acc, s) => acc + s.chapters.reduce((a, c) => a + c.tests.length, 0),
    0
  );
  const completedTests = Object.keys(testProgress).length;

  function getSubjectProgress(subjectId: string) {
    return getProgressForSubject(subjectId, lectureProgress);
  }

  function getTodayProgress() {
    const today = new Date();
    const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const day = schedule[key];
    if (!day) return { scheduled: 0, completed: 0, percent: 0 };
    const scheduled = day.lectures.length;
    const completed = day.lectures.filter(l => !!lectureProgress[l.globalLecId]).length;
    const percent = scheduled > 0 ? Math.round((completed / scheduled) * 100) : 0;
    return { scheduled, completed, percent };
  }

  return {
    overallPercent,
    totalLectures,
    completedLectures,
    totalTests,
    completedTests,
    getSubjectProgress,
    getTodayProgress,
  };
}
