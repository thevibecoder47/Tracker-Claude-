import { useGateStore } from '@/store/useGateStore';
import { DaySchedule } from '@/types';
import { getDayKey } from '@/lib/utils';

export function useSchedule() {
  const { schedule } = useGateStore();

  function getDaySchedule(date: Date): DaySchedule | undefined {
    return schedule[getDayKey(date)];
  }

  function getTodaySchedule(): DaySchedule | undefined {
    return schedule[getDayKey(new Date())];
  }

  function getWeekSchedule(weekStart: Date): DaySchedule[] {
    const days: DaySchedule[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      const ds = schedule[getDayKey(d)];
      if (ds) days.push(ds);
    }
    return days;
  }

  function getMonthSchedule(year: number, month: number): DaySchedule[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result: DaySchedule[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const key = getDayKey(new Date(year, month, d));
      const ds = schedule[key];
      if (ds) result.push(ds);
    }
    return result;
  }

  return { schedule, getDaySchedule, getTodaySchedule, getWeekSchedule, getMonthSchedule };
}
