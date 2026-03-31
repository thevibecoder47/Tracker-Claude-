import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  Timestamp,
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
    // Create default profile
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
