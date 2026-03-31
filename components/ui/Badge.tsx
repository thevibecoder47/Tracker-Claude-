import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export default function Badge({ children, color, bg, className, size = 'sm' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-mono font-medium',
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
        className
      )}
      style={{
        color: color ?? '#4F8CFF',
        background: bg ?? 'rgba(79,140,255,0.12)',
      }}
    >
      {children}
    </span>
  );
}
