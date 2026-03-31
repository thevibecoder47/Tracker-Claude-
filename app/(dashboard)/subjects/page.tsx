import OverallSummary from '@/components/subjects/OverallSummary';
import SubjectAccordion from '@/components/subjects/SubjectAccordion';

export default function SubjectsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-4">
        <h1 className="font-bebas text-2xl md:text-3xl gradient-text">Subjects</h1>
        <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-mono mt-0.5">
          All 19 subjects — chapter-level breakdown
        </p>
      </div>

      <div className="space-y-4">
        <OverallSummary />
        <SubjectAccordion />
      </div>
    </div>
  );
}
