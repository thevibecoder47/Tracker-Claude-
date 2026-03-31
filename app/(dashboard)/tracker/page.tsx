import OverallStatsGrid from '@/components/tracker/OverallStatsGrid';
import ActivityHeatmap from '@/components/tracker/ActivityHeatmap';
import StreakSection from '@/components/tracker/StreakSection';
import SubjectRings from '@/components/tracker/SubjectRings';

export default function TrackerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-4">
        <h1 className="font-bebas text-2xl md:text-3xl gradient-text">My Tracker</h1>
        <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-mono mt-0.5">
          Your full progress analytics
        </p>
      </div>

      <div className="space-y-4">
        <OverallStatsGrid />
        <ActivityHeatmap />
        <StreakSection />
        <SubjectRings />
      </div>
    </div>
  );
}
