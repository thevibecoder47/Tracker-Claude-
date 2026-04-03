import { DaySchedule, ScheduledLecture, ScheduledTest, Subject } from '@/types';
import { SYLLABUS } from './syllabus';

export function getDayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isExamPeriod(date: Date): boolean {
  const d = date.getTime();
  return d >= new Date('2026-05-10').getTime() && d <= new Date('2026-05-23').getTime();
}

interface LecItem {
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  lecNum: number;
  globalLecId: string;
}

interface TestItem {
  testId: string;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  testNum: number;
  label: string;
  triggerLec: number;
}

interface ChapterQueue {
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  lectures: number;
  startLec: number;
  tests: TestItem[];
  lecsDone: number; // how many assigned from this chapter so far
}

export function generateSchedule(): Record<string, DaySchedule> {
  const schedule: Record<string, DaySchedule> = {};

  // Build phase queues
  const phase1Ids = ['prereq_math', 'discrete_math', 'fund_c', 'c_prog'];
  const phase2Ids = ['prob_stats', 'linear_algebra', 'calculus', 'data_structures', 'algorithms'];
  const phase3Ids = ['toc', 'digital_logic', 'coa', 'os'];
  const phase4Ids = ['cn', 'compiler', 'dbms', 'gen_aptitude', 'verbal'];

  // Build lecture queues per subject, skipping pre-completed
  function buildChapterQueues(subjectIds: string[]): ChapterQueue[] {
    const queues: ChapterQueue[] = [];
    for (const sid of subjectIds) {
      const subject: Subject | undefined = SYLLABUS.find(s => s.id === sid);
      if (!subject) continue;
      const preCompleted = subject.preCompleted ?? 0;
      let globalLec = 0;
      for (const ch of subject.chapters) {
        const chStart = globalLec + 1;
        const chEnd = globalLec + ch.lectures;
        // Determine how many lecs in this chapter are pre-completed
        const preInChapter = Math.max(0, Math.min(ch.lectures, preCompleted - globalLec));
        const remainingInChapter = ch.lectures - preInChapter;
        if (remainingInChapter > 0) {
          const startLec = preInChapter + 1; // 1-based within chapter
          const tests: TestItem[] = ch.tests.map(t => ({
            testId: t.id,
            subjectId: subject.id,
            subjectName: subject.name,
            chapterId: ch.id,
            chapterName: ch.name,
            testNum: t.number,
            label: `${subject.name} — Test ${t.number}`,
            triggerLec: t.triggerLec,
          }));
          queues.push({
            subjectId: subject.id,
            subjectName: subject.name,
            chapterId: ch.id,
            chapterName: ch.name,
            lectures: remainingInChapter,
            startLec,
            tests,
            lecsDone: 0,
          });
        }
        globalLec += ch.lectures;
      }
    }
    return queues;
  }

  const phase1Queues = buildChapterQueues(phase1Ids);
  const phase2Queues = buildChapterQueues(phase2Ids);
  const phase3Queues = buildChapterQueues(phase3Ids);
  const phase4Queues = buildChapterQueues(phase4Ids);

  // We'll use a global queue pointer
  let allQueues = [
    ...phase1Queues,
    ...phase2Queues,
    ...phase3Queues,
    ...phase4Queues,
  ];

  // Phase date boundaries
  const phase1End = new Date('2026-04-30').getTime();
  const phase2End = new Date('2026-06-15').getTime();
  const phase3End = new Date('2026-07-15').getTime();

  function getActiveQueuesForDate(date: Date): ChapterQueue[] {
    const t = date.getTime();
    if (t <= phase1End) return phase1Queues.filter(q => q.lectures > q.lecsDone);
    if (t <= phase2End) {
      const p1rem = phase1Queues.filter(q => q.lectures > q.lecsDone);
      const p2 = phase2Queues.filter(q => q.lectures > q.lecsDone);
      return [...p1rem, ...p2];
    }
    if (t <= phase3End) {
      const p1rem = phase1Queues.filter(q => q.lectures > q.lecsDone);
      const p2rem = phase2Queues.filter(q => q.lectures > q.lecsDone);
      const p3 = phase3Queues.filter(q => q.lectures > q.lecsDone);
      return [...p1rem, ...p2rem, ...p3];
    }
    const p1rem = phase1Queues.filter(q => q.lectures > q.lecsDone);
    const p2rem = phase2Queues.filter(q => q.lectures > q.lecsDone);
    const p3rem = phase3Queues.filter(q => q.lectures > q.lecsDone);
    const p4 = phase4Queues.filter(q => q.lectures > q.lecsDone);
    return [...p1rem, ...p2rem, ...p3rem, ...p4];
  }

  // Assign lectures per day
  const start = new Date('2026-04-04');
  const end = new Date('2026-08-13');

  // Track last subject used to avoid 4 consecutive from same
  let lastSubjectId: string | null = null;
  let consecutiveCount = 0;

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = getDayKey(d);
    const examPeriod = isExamPeriod(d);
    const budget = examPeriod ? 1 : 4;

    const dayLectures: ScheduledLecture[] = [];
    const dayTests: ScheduledTest[] = [];

    const activeQueues = getActiveQueuesForDate(new Date(d));
    if (activeQueues.length === 0) {
      schedule[key] = {
        date: key,
        lectures: [],
        tests: [],
        isExamPeriod: examPeriod,
        isRestDay: true,
      };
      continue;
    }

    let remaining = budget;
    let queueIndex = 0;

    // Find a good starting queue (interleave subjects)
    // Sort active queues to put non-last-subject first
    const sorted = [...activeQueues].sort((a, b) => {
      if (a.subjectId === lastSubjectId && b.subjectId !== lastSubjectId) return 1;
      if (b.subjectId === lastSubjectId && a.subjectId !== lastSubjectId) return -1;
      return 0;
    });

    while (remaining > 0) {
      // Check if any tests fire and cap lectures at 3 if so
      const effectiveBudget = dayTests.length > 0 ? Math.min(remaining, 3 - dayLectures.length) : remaining;
      if (effectiveBudget <= 0) break;

      let assigned = false;
      for (let i = 0; i < sorted.length; i++) {
        const q = sorted[(queueIndex + i) % sorted.length];
        if (q.lecsDone >= q.lectures) continue;

        // Avoid too many consecutive from same subject (unless only 1 option)
        if (sorted.filter(x => x.lecsDone < x.lectures).length > 1) {
          if (dayLectures.filter(l => l.subjectId === q.subjectId).length >= 2) continue;
        }

        const lecNumInChapter = q.startLec + q.lecsDone;
        const globalLecId = `${q.chapterId}_lec${lecNumInChapter}`;

        const lecture: ScheduledLecture = {
          subjectId: q.subjectId,
          subjectName: q.subjectName,
          chapterId: q.chapterId,
          chapterName: q.chapterName,
          lecNum: lecNumInChapter,
          globalLecId,
        };

        q.lecsDone++;
        dayLectures.push(lecture);
        remaining--;

        // Check if this lecture triggers any tests
        for (const t of q.tests) {
          if (t.triggerLec === lecNumInChapter) {
            dayTests.push({
              testId: t.testId,
              subjectId: t.subjectId,
              subjectName: t.subjectName,
              chapterId: t.chapterId,
              chapterName: t.chapterName,
              testNum: t.testNum,
              label: t.label,
            });
            // Cap remaining to 3 total lectures if test fires
            if (dayLectures.length >= 3 && !examPeriod) {
              remaining = 0;
            }
          }
        }

        queueIndex = (queueIndex + i + 1) % sorted.length;
        assigned = true;
        break;
      }

      if (!assigned) break;
    }

    schedule[key] = {
      date: key,
      lectures: dayLectures,
      tests: dayTests,
      isExamPeriod: examPeriod,
      isRestDay: dayLectures.length === 0 && dayTests.length === 0,
    };
  }

  return schedule;
}
