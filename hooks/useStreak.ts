import { useGateStore } from '@/store/useGateStore';
import { getDayKey } from '@/lib/utils';

export function useStreak() {
  const { streakData } = useGateStore();

  const current = streakData?.current ?? 0;
  const best = streakData?.best ?? 0;
  const daysActive = streakData?.daysActive ?? [];
  const lastActiveDate = streakData?.lastActiveDate ?? '';

  function isActiveDay(date: Date): boolean {
    return daysActive.includes(getDayKey(date));
  }

  function getLast30Days(): Array<{ key: string; active: boolean; date: Date }> {
    const today = new Date();
    const result: Array<{ key: string; active: boolean; date: Date }> = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = getDayKey(d);
      result.push({ key, active: daysActive.includes(key), date: d });
    }
    return result;
  }

  return {
    current,
    best,
    daysActive,
    lastActiveDate,
    isActiveDay,
    getLast30Days,
  };
}
