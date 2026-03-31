import GlassCard from '@/components/ui/GlassCard';
import { getDailyQuote } from '@/lib/quotes';

export default function QuoteCard() {
  const quote = getDailyQuote();

  return (
    <GlassCard className="border-l-4 border-accent-purple">
      <p className="text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider mb-2">Daily Motivation</p>
      <p className="text-[var(--text-primary)] text-sm font-medium italic leading-relaxed">
        &ldquo;{quote.text}&rdquo;
      </p>
      <p className="text-[var(--text-muted)] text-xs mt-2 font-medium">— {quote.author}</p>
    </GlassCard>
  );
}
