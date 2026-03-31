import CalendarGrid from '@/components/calendar/CalendarGrid';

export default function CalendarPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <h1 className="font-bebas text-2xl md:text-3xl gradient-text">Calendar</h1>
        <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-mono mt-0.5">
          Full schedule overview — click any day for details
        </p>
      </div>
      <CalendarGrid />
    </div>
  );
}
