import GlassCard from '@/components/ui/GlassCard';
import { getUpcomingMilestones } from '@/lib/milestones';
import { Flag } from 'lucide-react';

export default function Milestones() {
  const upcoming = getUpcomingMilestones(3);

  return (
    <GlassCard>
      <div className="flex items-center gap-2 mb-4">
        <Flag size={14} className="text-accent-blue" />
        <h2 className="font-semibold text-[var(--text-primary)] text-sm">Upcoming Milestones</h2>
      </div>

      {upcoming.length === 0 ? (
        <p className="text-[var(--text-muted)] text-sm text-center py-4">All milestones completed! 🎉</p>
      ) : (
        <div className="space-y-3">
          {upcoming.map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: m.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--text-primary)] font-medium truncate">{m.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{m.date}</p>
              </div>
              <span
                className="text-xs font-mono font-semibold flex-shrink-0 px-2 py-0.5 rounded-full"
                style={{ color: m.color, background: `${m.color}18` }}
              >
                {m.daysLeft === 0 ? 'Today!' : `${m.daysLeft}d`}
              </span>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
