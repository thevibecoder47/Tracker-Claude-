export interface Milestone {
  name: string;
  date: string;
}

export const MILESTONES: Milestone[] = [
  { name: "Complete Basic of Computer System", date: "2026-03-31" },
  { name: "Complete Fundamentals of C Language", date: "2026-04-06" },
  { name: "Complete Prerequisites Math", date: "2026-04-17" },
  { name: "Complete Discrete Mathematics", date: "2026-04-29" },
  { name: "Complete Probability & Statistics", date: "2026-04-27" },
  { name: "Complete Linear Algebra", date: "2026-05-04" },
  { name: "Complete Calculus & Optimization", date: "2026-05-06" },
  { name: "Complete C Programming", date: "2026-05-16" },
  { name: "Complete Data Structures", date: "2026-05-29" },
  { name: "Complete DBMS", date: "2026-06-07" },
  { name: "Complete Algorithms", date: "2026-06-15" },
  { name: "Complete Theory of Computation", date: "2026-06-22" },
  { name: "Complete COA", date: "2026-07-06" },
  { name: "Complete Digital Logic", date: "2026-07-13" },
  { name: "Complete Computer Networks", date: "2026-07-28" },
  { name: "Complete Operating System", date: "2026-07-27" },
  { name: "Complete Compiler Design", date: "2026-08-05" },
  { name: "Complete General Aptitude", date: "2026-08-09" },
  { name: "Complete Verbal Aptitude", date: "2026-08-09" },
  { name: "Revision Phase Begins", date: "2026-08-10" },
  { name: "GATE 2027 Exam", date: "2027-02-01" },
];

export function getUpcomingMilestones(count = 3): (Milestone & { daysLeft: number; color: string })[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return MILESTONES
    .map(m => {
      const mDate = new Date(m.date);
      mDate.setHours(0, 0, 0, 0);
      const daysLeft = Math.ceil((mDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      let color = '#34d399';
      if (daysLeft <= 10) color = '#f87171';
      else if (daysLeft <= 30) color = '#fbbf24';
      return { ...m, daysLeft, color };
    })
    .filter(m => m.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, count);
}
