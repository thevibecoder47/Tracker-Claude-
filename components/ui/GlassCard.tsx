import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  noPad?: boolean;
}

export default function GlassCard({ children, className, onClick, noPad }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card rounded-card shadow-card dark:shadow-card-dark',
        !noPad && 'p-4 md:p-5',
        onClick && 'cursor-pointer hover:shadow-glow transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
}
