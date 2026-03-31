export interface Milestone {
  name: string;
  date: string;
}

export const MILESTONES: Milestone[] = [
  { name: "Complete Prerequisites Math", date: "2026-04-10" },
  { name: "Complete Discrete Mathematics", date: "2026-04-30" },
  { name: "Complete C Programming", date: "2026-04-20" },
  { name: "Complete Data Structures", date: "2026-05-31" },
  { name: "Complete Algorithms", date: "2026-06-15" },
  { name: "Complete Theory of Computation", date: "2026-06-30" },
  { name: "Complete Digital Logic", date: "2026-07-10" },
  { name: "Complete COA", date: "2026-07-20" },
  { name: "Revision Phase Begins", date: "2026-08-11" },
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
      let color = '#34d399'; // green
      if (daysLeft <= 10) color = '#f87171'; // red
      else if (daysLeft <= 30) color = '#fbbf24'; // yellow
      return { ...m, daysLeft, color };
    })
    .filter(m => m.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, count);
}
