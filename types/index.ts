export interface TestTrigger {
  id: string;
  number: number;
  triggerLec: number;
}

export interface Chapter {
  id: string;
  name: string;
  lectures: number;
  tests: TestTrigger[];
}

export interface Subject {
  id: string;
  name: string;
  totalLectures: number;
  preCompleted?: number;
  chapters: Chapter[];
}

export interface ScheduledLecture {
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  lecNum: number;
  globalLecId: string;
}

export interface ScheduledTest {
  testId: string;
  subjectId: string;
  subjectName: string;
  chapterId: string;
  chapterName: string;
  testNum: number;
  label: string;
}

export interface DaySchedule {
  date: string;
  lectures: ScheduledLecture[];
  tests: ScheduledTest[];
  isExamPeriod: boolean;
  isRestDay: boolean;
}

export interface StreakData {
  current: number;
  best: number;
  lastActiveDate: string;
  daysActive: string[];
}

export interface UserProfile {
  name: string;
  theme: 'light' | 'dark';
  createdAt: string;
}

export interface LectureProgress {
  [globalLecId: string]: { completedAt: string; date: string };
}

export interface TestProgress {
  [testId: string]: { date: string };
}

export interface GateStore {
  uid: string | null;
  userProfile: UserProfile | null;
  lectureProgress: LectureProgress;
  testProgress: TestProgress;
  streakData: StreakData | null;
  schedule: Record<string, DaySchedule>;
  theme: 'light' | 'dark';
  setUid: (uid: string | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  markLecture: (globalLecId: string, date: string) => Promise<void>;
  unmarkLecture: (globalLecId: string) => Promise<void>;
  markTest: (testId: string, date: string) => Promise<void>;
  loadProgress: (uid: string) => Promise<void>;
  initSchedule: () => void;
}
