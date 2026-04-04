import { create } from 'zustand';
import { GateStore, LectureProgress, TestProgress, StreakData, UserProfile, DaySchedule } from '@/types';
import {
  markLectureComplete,
  unmarkLectureComplete,
  markTestAttempted,
  getLectureProgress,
  getTestProgress,
  getStreak,
  updateStreak,
  getUserProfile,
  setUserTheme,
  seedPreCompletedData,
} from '@/lib/firestore';
import { generateSchedule } from '@/lib/schedule';
import { calculateStreak, getDayKey } from '@/lib/utils';

export const useGateStore = create<GateStore>((set, get) => ({
  uid: null,
  userProfile: null,
  lectureProgress: {},
  testProgress: {},
  streakData: null,
  schedule: {},
  theme: 'dark',

  setUid: (uid) => set({ uid }),

  setUserProfile: (profile) => set({ userProfile: profile }),

  setTheme: async (theme) => {
    const { uid } = get();
    set({ theme });
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    if (uid) {
      try {
        await setUserTheme(uid, theme);
      } catch (err) {
        console.error('setTheme error:', err);
      }
    }
  },

  markLecture: async (globalLecId, date) => {
    const { uid, lectureProgress, streakData, schedule } = get();
    if (!uid) return;

    const newProgress: LectureProgress = {
      ...lectureProgress,
      [globalLecId]: { completedAt: new Date().toISOString(), date },
    };
    set({ lectureProgress: newProgress });

    try {
      await markLectureComplete(uid, globalLecId, date);
      const newStreak = calculateStreak(newProgress, schedule, streakData);
      set({ streakData: newStreak });
      await updateStreak(uid, newStreak);
    } catch (err) {
      const rolled = { ...get().lectureProgress };
      delete rolled[globalLecId];
      set({ lectureProgress: rolled });
      console.error('markLecture error:', err);
    }
  },

  unmarkLecture: async (globalLecId) => {
    const { uid, lectureProgress, schedule, streakData } = get();
    if (!uid) return;

    const prev = lectureProgress[globalLecId];
    const newProgress = { ...lectureProgress };
    delete newProgress[globalLecId];
    set({ lectureProgress: newProgress });

    try {
      await unmarkLectureComplete(uid, globalLecId);
      const newStreak = calculateStreak(newProgress, schedule, streakData);
      set({ streakData: newStreak });
      await updateStreak(uid, newStreak);
    } catch (err) {
      if (prev) {
        set({ lectureProgress: { ...get().lectureProgress, [globalLecId]: prev } });
      }
      console.error('unmarkLecture error:', err);
    }
  },

  markTest: async (testId, date) => {
    const { uid, testProgress } = get();
    if (!uid) return;

    const newTestProgress: TestProgress = {
      ...testProgress,
      [testId]: { date },
    };
    set({ testProgress: newTestProgress });

    try {
      await markTestAttempted(uid, testId, date);
    } catch (err) {
      const rolled = { ...get().testProgress };
      delete rolled[testId];
      set({ testProgress: rolled });
      console.error('markTest error:', err);
    }
  },

  loadProgress: async (uid) => {
    try {
      // Seed pre-completed data on first login (no-op if already seeded)
      await seedPreCompletedData(uid);

      const [lectureProgress, testProgress, streakData, userProfile] = await Promise.all([
        getLectureProgress(uid),
        getTestProgress(uid),
        getStreak(uid),
        getUserProfile(uid),
      ]);

      set({
        lectureProgress,
        testProgress,
        streakData,
        userProfile,
        theme: userProfile.theme,
      });

      if (typeof document !== 'undefined') {
        if (userProfile.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    } catch (err) {
      console.error('loadProgress error:', err);
    }
  },

  initSchedule: () => {
    const schedule = generateSchedule();
    set({ schedule });
  },
}));
