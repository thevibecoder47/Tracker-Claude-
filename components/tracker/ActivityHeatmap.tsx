'use client';

import { useRef, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { useGateStore } from '@/store/useGateStore';
import { getDayKey } from '@/lib/utils';

const CELL = 12;
const GAP = 2;
const CELL_TOTAL = CELL + GAP;

function getLecCountForDay(
  dateKey: string,
  schedule: Record<string, import('@/types').DaySchedule>,
  lectureProgress: import('@/types').LectureProgress
): number {
  const day = schedule[dateKey];
  if (!day) return 0;
  return day.lectures.filter(l => !!lectureProgress[l.globalLecId]).length;
}

function getColor(count: number, dark: boolean): string {
  if (count === 0) return dark ? '#1e293b' : '#e2e8f0';
  if (count === 1) return 'rgba(79,140,255,0.35)';
  if (count === 2) return 'rgba(79,140,255,0.6)';
  if (count === 3) return 'rgba(79,140,255,0.8)';
  return '#4F8CFF';
}

export default function ActivityHeatmap() {
  const { schedule, lectureProgress, theme } = useGateStore();
  const dark = theme === 'dark';
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Date range: Apr 1 2026 → Feb 1 2027
  const startDate = new Date('2026-04-01');
  const endDate = new Date('2027-02-01');

  // Build columns (each column = one week, Sun→Sat)
  // Find Sunday on or before startDate
  const firstSunday = new Date(startDate);
  const startDay = startDate.getDay(); // 0=Sun
  firstSunday.setDate(firstSunday.getDate() - startDay);

  const columns: Array<Array<Date | null>> = [];
  let cur = new Date(firstSunday);

  while (cur <= endDate) {
    const col: Array<Date | null> = [];
    for (let d = 0; d < 7; d++) {
      const day = new Date(cur);
      day.setDate(cur.getDate() + d);
      if (day < startDate || day > endDate) {
        col.push(null);
      } else {
        col.push(new Date(day));
      }
    }
    columns.push(col);
    cur.setDate(cur.getDate() + 7);
  }

  // Month labels: find first column of each new month
  const monthLabels: Array<{ col: number; label: string }> = [];
  let lastMonth = -1;
  columns.forEach((col, ci) => {
    const firstReal = col.find(d => d !== null);
    if (firstReal && firstReal.getMonth() !== lastMonth) {
      lastMonth = firstReal.getMonth();
      monthLabels.push({
        col: ci,
        label: firstReal.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
  });

  const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  const LEFT_OFFSET = 28;
  const TOP_OFFSET = 20;

  const totalWidth = LEFT_OFFSET + columns.length * CELL_TOTAL;
  const totalHeight = TOP_OFFSET + 7 * CELL_TOTAL;

  function handleMouseEnter(e: React.MouseEvent, date: Date) {
    const key = getDayKey(date);
    const count = getLecCountForDay(key, schedule, lectureProgress);
    const rect = (e.target as SVGElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    setTooltip({
      text: `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} — ${count} lecture${count !== 1 ? 's' : ''} completed`,
      x: rect.left - containerRect.left + CELL / 2,
      y: rect.top - containerRect.top - 8,
    });
  }

  return (
    <GlassCard noPad>
      <div className="px-4 pt-4 pb-2 border-b border-[var(--card-border)]">
        <h3 className="font-semibold text-sm text-[var(--text-primary)]">Activity Heatmap</h3>
        <p className="text-xs text-[var(--text-muted)]">Apr 2026 – Feb 2027</p>
      </div>

      <div ref={containerRef} className="overflow-x-auto p-4 relative">
        <svg
          width={totalWidth}
          height={totalHeight}
          style={{ display: 'block', minWidth: totalWidth }}
        >
          {/* Month labels */}
          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={LEFT_OFFSET + m.col * CELL_TOTAL}
              y={12}
              fontSize={9}
              fill={dark ? '#64748b' : '#94a3b8'}
              fontFamily="JetBrains Mono, monospace"
            >
              {m.label}
            </text>
          ))}

          {/* Weekday labels */}
          {WEEKDAY_LABELS.map((label, i) => (
            label ? (
              <text
                key={i}
                x={0}
                y={TOP_OFFSET + i * CELL_TOTAL + CELL - 2}
                fontSize={8}
                fill={dark ? '#475569' : '#94a3b8'}
                fontFamily="JetBrains Mono, monospace"
              >
                {label}
              </text>
            ) : null
          ))}

          {/* Cells */}
          {columns.map((col, ci) =>
            col.map((day, di) => {
              if (!day) return null;
              const key = getDayKey(day);
              const count = getLecCountForDay(key, schedule, lectureProgress);
              const fill = getColor(count, dark);
              const x = LEFT_OFFSET + ci * CELL_TOTAL;
              const y = TOP_OFFSET + di * CELL_TOTAL;
              return (
                <rect
                  key={`${ci}-${di}`}
                  x={x}
                  y={y}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={fill}
                  style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
                  onMouseEnter={e => handleMouseEnter(e, day)}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })
          )}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute z-10 pointer-events-none bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 shadow-lg whitespace-nowrap -translate-x-1/2 -translate-y-full"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.text}
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Less</span>
          {[0, 1, 2, 3, 4].map(v => (
            <div
              key={v}
              className="rounded-sm"
              style={{ width: CELL, height: CELL, background: getColor(v, dark) }}
            />
          ))}
          <span className="text-[10px] text-[var(--text-muted)] font-mono">More</span>
        </div>
      </div>
    </GlassCard>
  );
}
