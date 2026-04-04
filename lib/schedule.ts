import { DaySchedule, ScheduledLecture, ScheduledTest } from '@/types';
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

// ─────────────────────────────────────────────────────────────────────────────
// EXACT DAILY PLAN from Excel — Mar 27 2026 → Aug 9 2026
// No pre-completed lectures. You mark everything yourself.
// ─────────────────────────────────────────────────────────────────────────────
const DAILY_PLAN: Record<string, Record<string, number>> = {
  // MARCH
  "2026-03-27": { basic_cs: 2, fund_c: 2 },
  "2026-03-28": { basic_cs: 2, fund_c: 2 },
  "2026-03-29": { basic_cs: 2, fund_c: 2 },
  "2026-03-30": { basic_cs: 2, fund_c: 2 },
  "2026-03-31": { basic_cs: 2, fund_c: 2 },
  // APRIL
  "2026-04-01": { fund_c: 2 },
  "2026-04-02": { fund_c: 2 },
  "2026-04-03": { fund_c: 1 },
  "2026-04-04": { fund_c: 2 },
  "2026-04-05": { fund_c: 2, prereq_math: 2 },
  "2026-04-06": { fund_c: 1, prereq_math: 2, discrete_math: 1 },
  "2026-04-07": { prereq_math: 2, discrete_math: 2 },
  "2026-04-08": { prereq_math: 2, discrete_math: 2 },
  "2026-04-09": { prereq_math: 2, discrete_math: 2 },
  "2026-04-10": { prereq_math: 2, discrete_math: 2 },
  "2026-04-11": { prereq_math: 2, discrete_math: 2 },
  "2026-04-12": { prereq_math: 2, discrete_math: 2 },
  "2026-04-13": { prereq_math: 2, discrete_math: 2 },
  "2026-04-14": { prereq_math: 2, discrete_math: 2 },
  "2026-04-15": { prereq_math: 2, discrete_math: 2 },
  "2026-04-16": { prereq_math: 2, discrete_math: 2 },
  "2026-04-17": { prereq_math: 1, discrete_math: 2, prob_stats: 1 },
  "2026-04-18": { discrete_math: 2, prob_stats: 2 },
  "2026-04-19": { discrete_math: 2, prob_stats: 2 },
  "2026-04-20": { discrete_math: 2, prob_stats: 2 },
  "2026-04-21": { discrete_math: 2, prob_stats: 2 },
  "2026-04-22": { discrete_math: 2, prob_stats: 2 },
  "2026-04-23": { discrete_math: 2, prob_stats: 2 },
  "2026-04-24": { discrete_math: 2, prob_stats: 2 },
  "2026-04-25": { discrete_math: 2, prob_stats: 2 },
  "2026-04-26": { discrete_math: 2, prob_stats: 2 },
  "2026-04-27": { discrete_math: 2, prob_stats: 2 },
  "2026-04-28": { discrete_math: 2, linear_algebra: 2 },
  "2026-04-29": { discrete_math: 2, linear_algebra: 2 },
  "2026-04-30": { linear_algebra: 2, calculus: 2 },
  // MAY
  "2026-05-01": { linear_algebra: 2, calculus: 2 },
  "2026-05-02": { linear_algebra: 2, calculus: 2 },
  "2026-05-03": { linear_algebra: 2, calculus: 2 },
  "2026-05-04": { linear_algebra: 1, calculus: 3, c_prog: 1 },
  "2026-05-05": { calculus: 2, c_prog: 2 },
  "2026-05-06": { calculus: 2, c_prog: 2 },
  "2026-05-07": { c_prog: 2, data_structures: 2 },
  "2026-05-08": { c_prog: 2, data_structures: 2 },
  "2026-05-09": { c_prog: 2, data_structures: 2 },
  "2026-05-10": { c_prog: 2, data_structures: 2 },
  "2026-05-11": { c_prog: 1 },
  "2026-05-12": { c_prog: 1 },
  "2026-05-13": { c_prog: 1 },
  "2026-05-14": { c_prog: 1 },
  "2026-05-15": { c_prog: 1 },
  "2026-05-16": { c_prog: 1 },
  "2026-05-17": { data_structures: 1 },
  "2026-05-18": { data_structures: 1 },
  "2026-05-19": { data_structures: 1 },
  "2026-05-20": { data_structures: 1 },
  "2026-05-21": { data_structures: 1 },
  "2026-05-22": { data_structures: 1 },
  "2026-05-23": { data_structures: 2, algorithms: 2 },
  "2026-05-24": { data_structures: 2, algorithms: 2 },
  "2026-05-25": { data_structures: 2, algorithms: 2 },
  "2026-05-26": { data_structures: 2, algorithms: 2 },
  "2026-05-27": { data_structures: 2, algorithms: 2 },
  "2026-05-28": { data_structures: 2, algorithms: 2 },
  "2026-05-29": { data_structures: 2, algorithms: 2 },
  "2026-05-30": { algorithms: 2, dbms: 2 },
  "2026-05-31": { algorithms: 2, dbms: 2 },
  // JUNE
  "2026-06-01": { algorithms: 2, dbms: 2 },
  "2026-06-02": { algorithms: 2, dbms: 2 },
  "2026-06-03": { algorithms: 2, dbms: 2 },
  "2026-06-04": { algorithms: 2, dbms: 2 },
  "2026-06-05": { algorithms: 2, dbms: 2 },
  "2026-06-06": { algorithms: 2, dbms: 2 },
  "2026-06-07": { algorithms: 2, dbms: 2 },
  "2026-06-08": { algorithms: 2, toc: 2 },
  "2026-06-09": { algorithms: 2, toc: 2 },
  "2026-06-10": { algorithms: 2, toc: 2 },
  "2026-06-11": { algorithms: 2, toc: 2 },
  "2026-06-12": { algorithms: 2, toc: 2 },
  "2026-06-13": { algorithms: 2, toc: 2 },
  "2026-06-14": { algorithms: 2, toc: 2 },
  "2026-06-15": { algorithms: 2, toc: 2 },
  "2026-06-16": { toc: 2, coa: 2 },
  "2026-06-17": { toc: 2, coa: 2 },
  "2026-06-18": { toc: 2, coa: 2 },
  "2026-06-19": { toc: 2, coa: 2 },
  "2026-06-20": { toc: 2, coa: 2 },
  "2026-06-21": { toc: 2, coa: 2 },
  "2026-06-22": { toc: 1, coa: 2, digital_logic: 1 },
  "2026-06-23": { coa: 2, digital_logic: 2 },
  "2026-06-24": { coa: 2, digital_logic: 2 },
  "2026-06-25": { coa: 2, digital_logic: 2 },
  "2026-06-26": { coa: 2, digital_logic: 2 },
  "2026-06-27": { coa: 2, digital_logic: 2 },
  "2026-06-28": { coa: 2, digital_logic: 2 },
  "2026-06-29": { coa: 2, digital_logic: 2 },
  "2026-06-30": { coa: 2, digital_logic: 2 },
  // JULY
  "2026-07-01": { coa: 2, digital_logic: 2 },
  "2026-07-02": { coa: 2, digital_logic: 2 },
  "2026-07-03": { coa: 2, digital_logic: 2 },
  "2026-07-04": { coa: 2, digital_logic: 2 },
  "2026-07-05": { coa: 2, digital_logic: 2 },
  "2026-07-06": { coa: 2, digital_logic: 2 },
  "2026-07-07": { digital_logic: 2, cn: 2 },
  "2026-07-08": { digital_logic: 2, cn: 2 },
  "2026-07-09": { digital_logic: 2, cn: 2 },
  "2026-07-10": { digital_logic: 2, cn: 2 },
  "2026-07-11": { digital_logic: 2, cn: 2 },
  "2026-07-12": { digital_logic: 2, cn: 2 },
  "2026-07-13": { digital_logic: 2, cn: 2 },
  "2026-07-14": { cn: 2, os: 2 },
  "2026-07-15": { cn: 2, os: 2 },
  "2026-07-16": { cn: 2, os: 2 },
  "2026-07-17": { cn: 2, os: 2 },
  "2026-07-18": { cn: 2, os: 2 },
  "2026-07-19": { cn: 2, os: 2 },
  "2026-07-20": { cn: 2, os: 2 },
  "2026-07-21": { cn: 2, os: 2 },
  "2026-07-22": { cn: 2, os: 2 },
  "2026-07-23": { cn: 2, os: 2 },
  "2026-07-24": { cn: 2, os: 2 },
  "2026-07-25": { cn: 2, os: 2 },
  "2026-07-26": { cn: 2, os: 2 },
  "2026-07-27": { cn: 2, os: 1, compiler: 1 },
  "2026-07-28": { cn: 1, compiler: 2, gen_aptitude: 1 },
  "2026-07-29": { compiler: 2, gen_aptitude: 2 },
  "2026-07-30": { compiler: 2, gen_aptitude: 2 },
  "2026-07-31": { compiler: 2, gen_aptitude: 2 },
  // AUGUST
  "2026-08-01": { compiler: 2, gen_aptitude: 2 },
  "2026-08-02": { compiler: 2, gen_aptitude: 2 },
  "2026-08-03": { compiler: 2, gen_aptitude: 2 },
  "2026-08-04": { compiler: 2, gen_aptitude: 2 },
  "2026-08-05": { compiler: 2, gen_aptitude: 2 },
  "2026-08-06": { gen_aptitude: 2, verbal: 1 },
  "2026-08-07": { gen_aptitude: 2, verbal: 1 },
  "2026-08-08": { gen_aptitude: 2, verbal: 1 },
  "2026-08-09": { gen_aptitude: 1, verbal: 2 },
};

// ─────────────────────────────────────────────────────────────────────────────
// Build lecture queue per subject — sequential, no skipping
// ─────────────────────────────────────────────────────────────────────────────
interface LecItem {
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  lecNum: number;
  globalLecId: string;
  triggeredTests: Array<{
    testId: string;
    subjectId: string;
    subjectName: string;
    chapterId: string;
    chapterName: string;
    testNum: number;
    label: string;
  }>;
}

function buildQueue(subjectId: string): LecItem[] {
  const subject = SYLLABUS.find(s => s.id === subjectId);
  if (!subject) return [];
  const queue: LecItem[] = [];
  for (const ch of subject.chapters) {
    for (let l = 1; l <= ch.lectures; l++) {
      const triggeredTests = ch.tests
        .filter(t => t.triggerLec === l)
        .map(t => ({
          testId: t.id,
          subjectId: subject.id,
          subjectName: subject.name,
          chapterId: ch.id,
          chapterName: ch.name,
          testNum: t.number,
          label: `${subject.name} — Test ${t.number}`,
        }));
      queue.push({
        subjectId: subject.id,
        subjectName: subject.name,
        chapterId: ch.id,
        chapterName: ch.name,
        lecNum: l,
        globalLecId: `${ch.id}_lec${l}`,
        triggeredTests,
      });
    }
  }
  return queue;
}

export function generateSchedule(): Record<string, DaySchedule> {
  // Build all queues fresh
  const queues: Record<string, LecItem[]> = {};
  const ptrs: Record<string, number> = {};
  for (const s of SYLLABUS) {
    queues[s.id] = buildQueue(s.id);
    ptrs[s.id] = 0;
  }

  const schedule: Record<string, DaySchedule> = {};

  for (const [dateKey, subjectCounts] of Object.entries(DAILY_PLAN)) {
    const date = new Date(dateKey + 'T00:00:00');
    const examPeriod = isExamPeriod(date);
    const lectures: ScheduledLecture[] = [];
    const tests: ScheduledTest[] = [];

    for (const [subjectId, count] of Object.entries(subjectCounts)) {
      const queue = queues[subjectId];
      if (!queue) continue;
      let ptr = ptrs[subjectId];

      for (let i = 0; i < count; i++) {
        if (ptr >= queue.length) break;
        const item = queue[ptr++];

        lectures.push({
          subjectId: item.subjectId,
          subjectName: item.subjectName,
          chapterId: item.chapterId,
          chapterName: item.chapterName,
          lecNum: item.lecNum,
          globalLecId: item.globalLecId,
        });

        for (const t of item.triggeredTests) {
          tests.push({
            testId: t.testId,
            subjectId: t.subjectId,
            subjectName: t.subjectName,
            chapterId: t.chapterId,
            chapterName: t.chapterName,
            testNum: t.testNum,
            label: t.label,
          });
        }
      }
      ptrs[subjectId] = ptr;
    }

    schedule[dateKey] = {
      date: dateKey,
      lectures,
      tests,
      isExamPeriod: examPeriod,
      isRestDay: lectures.length === 0 && tests.length === 0,
    };
  }

  return schedule;
}
