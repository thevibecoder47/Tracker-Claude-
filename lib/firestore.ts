import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { LectureProgress, TestProgress, StreakData, UserProfile } from '@/types';

export async function markLectureComplete(
  uid: string,
  lectureId: string,
  date: string
): Promise<void> {
  try {
    const ref = doc(db, 'users', uid, 'progress', 'lectures', 'items', lectureId);
    await setDoc(ref, {
      completedAt: new Date().toISOString(),
      date,
    }, { merge: true });
  } catch (err) {
    console.error('markLectureComplete error:', err);
    throw err;
  }
}

export async function unmarkLectureComplete(
  uid: string,
  lectureId: string
): Promise<void> {
  try {
    const ref = doc(db, 'users', uid, 'progress', 'lectures', 'items', lectureId);
    await deleteDoc(ref);
  } catch (err) {
    console.error('unmarkLectureComplete error:', err);
    throw err;
  }
}

export async function markTestAttempted(
  uid: string,
  testId: string,
  date: string
): Promise<void> {
  try {
    const ref = doc(db, 'users', uid, 'progress', 'tests', 'items', testId);
    await setDoc(ref, {
      date,
      attemptedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.error('markTestAttempted error:', err);
    throw err;
  }
}

export async function unmarkTestAttempted(
  uid: string,
  testId: string
): Promise<void> {
  try {
    const ref = doc(db, 'users', uid, 'progress', 'tests', 'items', testId);
    await deleteDoc(ref);
  } catch (err) {
    console.error('unmarkTestAttempted error:', err);
    throw err;
  }
}

export async function getLectureProgress(
  uid: string
): Promise<LectureProgress> {
  try {
    const colRef = collection(db, 'users', uid, 'progress', 'lectures', 'items');
    const snapshot = await getDocs(colRef);
    const result: LectureProgress = {};
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      result[docSnap.id] = {
        completedAt: data.completedAt ?? '',
        date: data.date ?? '',
      };
    });
    return result;
  } catch (err) {
    console.error('getLectureProgress error:', err);
    return {};
  }
}

export async function getTestProgress(
  uid: string
): Promise<TestProgress> {
  try {
    const colRef = collection(db, 'users', uid, 'progress', 'tests', 'items');
    const snapshot = await getDocs(colRef);
    const result: TestProgress = {};
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      result[docSnap.id] = {
        date: data.date ?? '',
      };
    });
    return result;
  } catch (err) {
    console.error('getTestProgress error:', err);
    return {};
  }
}

export async function getStreak(uid: string): Promise<StreakData> {
  try {
    const ref = doc(db, 'users', uid, 'streak', 'data');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      return {
        current: data.current ?? 0,
        best: data.best ?? 0,
        lastActiveDate: data.lastActiveDate ?? '',
        daysActive: data.daysActive ?? [],
      };
    }
    return { current: 0, best: 0, lastActiveDate: '', daysActive: [] };
  } catch (err) {
    console.error('getStreak error:', err);
    return { current: 0, best: 0, lastActiveDate: '', daysActive: [] };
  }
}

export async function updateStreak(uid: string, streakData: StreakData): Promise<void> {
  try {
    const ref = doc(db, 'users', uid, 'streak', 'data');
    await setDoc(ref, streakData, { merge: true });
  } catch (err) {
    console.error('updateStreak error:', err);
    throw err;
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile> {
  try {
    const ref = doc(db, 'users', uid, 'profile', 'info');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      return {
        name: data.name ?? 'Karan Prabhat',
        theme: data.theme ?? 'dark',
        createdAt: data.createdAt ?? new Date().toISOString(),
      };
    }
    const defaultProfile: UserProfile = {
      name: 'Karan Prabhat',
      theme: 'dark',
      createdAt: new Date().toISOString(),
    };
    await setDoc(ref, defaultProfile, { merge: true });
    return defaultProfile;
  } catch (err) {
    console.error('getUserProfile error:', err);
    return { name: 'Karan Prabhat', theme: 'dark', createdAt: new Date().toISOString() };
  }
}

export async function setUserTheme(uid: string, theme: 'light' | 'dark'): Promise<void> {
  try {
    const ref = doc(db, 'users', uid, 'profile', 'info');
    await setDoc(ref, { theme }, { merge: true });
  } catch (err) {
    console.error('setUserTheme error:', err);
    throw err;
  }
}

export async function setUserProfile(uid: string, profile: Partial<UserProfile>): Promise<void> {
  try {
    const ref = doc(db, 'users', uid, 'profile', 'info');
    await setDoc(ref, profile, { merge: true });
  } catch (err) {
    console.error('setUserProfile error:', err);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Seeds pre-completed lectures (basic_cs + fund_c) into Firestore
// AND seeds an 8-day streak from Mar 27 – Apr 3 2026.
// Call this ONCE after first login using a "Setup" button in the UI,
// or call from useGateStore.loadProgress if not already seeded.
// ─────────────────────────────────────────────────────────────────────────────
export async function seedPreCompletedData(uid: string): Promise<void> {
  try {
    // Check if already seeded
    const sentinelRef = doc(db, 'users', uid, 'meta', 'seeded');
    const sentinelSnap = await getDoc(sentinelRef);
    if (sentinelSnap.exists()) return; // already done

    const batch: Promise<void>[] = [];

    // basic_cs: all 10 lectures done — dates Mar 27–28 (2 per day)
    const bcsDates = ['2026-03-27', '2026-03-27', '2026-03-28', '2026-03-28',
                      '2026-03-29', '2026-03-29', '2026-03-30', '2026-03-30',
                      '2026-03-31', '2026-03-31'];
    for (let l = 1; l <= 10; l++) {
      const lecId = `bcs_c1_lec${l}`;
      const date = bcsDates[l - 1];
      const ref = doc(db, 'users', uid, 'progress', 'lectures', 'items', lecId);
      batch.push(setDoc(ref, { completedAt: `${date}T10:00:00.000Z`, date }, { merge: true }));
    }

    // fund_c: first 15 lectures done
    // fc_c1: 2 lecs (lec1, lec2) — Mar 27
    // fc_c2: 5 lecs (lec1–5) — Mar 28–29
    // fc_c3: 3 lecs (lec1–3) — Mar 30
    // fc_c4: 4 lecs (lec1–4) — Mar 31–Apr 1
    // fc_c5: 1 lec (lec1) — Apr 1 (partial, rest not done)
    const fundCMap: Array<{ chId: string; lec: number; date: string }> = [
      { chId: 'fc_c1', lec: 1, date: '2026-03-27' },
      { chId: 'fc_c1', lec: 2, date: '2026-03-27' },
      { chId: 'fc_c2', lec: 1, date: '2026-03-28' },
      { chId: 'fc_c2', lec: 2, date: '2026-03-28' },
      { chId: 'fc_c2', lec: 3, date: '2026-03-29' },
      { chId: 'fc_c2', lec: 4, date: '2026-03-29' },
      { chId: 'fc_c2', lec: 5, date: '2026-03-29' },
      { chId: 'fc_c3', lec: 1, date: '2026-03-30' },
      { chId: 'fc_c3', lec: 2, date: '2026-03-30' },
      { chId: 'fc_c3', lec: 3, date: '2026-03-30' },
      { chId: 'fc_c4', lec: 1, date: '2026-03-31' },
      { chId: 'fc_c4', lec: 2, date: '2026-03-31' },
      { chId: 'fc_c4', lec: 3, date: '2026-04-01' },
      { chId: 'fc_c4', lec: 4, date: '2026-04-01' },
      { chId: 'fc_c5', lec: 1, date: '2026-04-02' },
    ];
    for (const item of fundCMap) {
      const lecId = `${item.chId}_lec${item.lec}`;
      const ref = doc(db, 'users', uid, 'progress', 'lectures', 'items', lecId);
      batch.push(setDoc(ref, { completedAt: `${item.date}T10:00:00.000Z`, date: item.date }, { merge: true }));
    }

    // 8-day streak: Mar 27 – Apr 3
    const streakDays = [
      '2026-03-27', '2026-03-28', '2026-03-29', '2026-03-30',
      '2026-03-31', '2026-04-01', '2026-04-02', '2026-04-03',
    ];
    const streakRef = doc(db, 'users', uid, 'streak', 'data');
    // We don't overwrite if a streak already exists — we merge the days in
    const existingStreak = await getStreak(uid);
    const mergedDays = Array.from(new Set([...existingStreak.daysActive, ...streakDays])).sort();

    // Recalculate current streak from today backward
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daySet = new Set(mergedDays);
    let current = 0;
    const checkDate = new Date(today);
    while (true) {
      const key = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
      if (daySet.has(key)) {
        current++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    const best = Math.max(existingStreak.best, current, streakDays.length);
    batch.push(setDoc(streakRef, {
      current,
      best,
      lastActiveDate: mergedDays[mergedDays.length - 1] ?? '',
      daysActive: mergedDays,
    }, { merge: true }));

    // Mark as seeded
    batch.push(setDoc(sentinelRef, { seededAt: new Date().toISOString() }));

    await Promise.all(batch);
    console.log('Pre-completed data seeded successfully.');
  } catch (err) {
    console.error('seedPreCompletedData error:', err);
    throw err;
  }
}
