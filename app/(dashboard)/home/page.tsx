import HeroCard from '@/components/home/HeroCard';
import TodaySchedule from '@/components/home/TodaySchedule';
import QuoteCard from '@/components/home/QuoteCard';
import QuickStats from '@/components/home/QuickStats';
import Milestones from '@/components/home/Milestones';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      {/* Header */}
      <div className="mb-2">
        <h1 className="font-bebas text-2xl md:text-3xl gradient-text">KARAN PRABHAT — THE GATE ASPIRANT</h1>
        <p className="text-[var(--text-muted)] text-xs tracking-widest uppercase font-dm mt-0.5">
          TARGET — IIT BOMBAY / IISc
        </p>
      </div>

      {/* Hero card: clock + countdown + today progress */}
      <HeroCard />

      {/* Quick stats row */}
      <QuickStats />

      {/* Two-col grid for schedule + right side */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Today's schedule — wider */}
        <div className="lg:col-span-3">
          <TodaySchedule />
        </div>

        {/* Right column: quote + milestones */}
        <div className="lg:col-span-2 space-y-4">
          <QuoteCard />
          <Milestones />
        </div>
      </div>
    </div>
  );
}
