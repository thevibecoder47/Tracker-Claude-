'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, CalendarDays, BarChart2, BookOpen, Activity } from 'lucide-react';

const TABS = [
  { label: 'Home', href: '/home', icon: Home },
  { label: 'Calendar', href: '/calendar', icon: Calendar },
  { label: 'Weekly', href: '/weekly', icon: CalendarDays },
  { label: 'Monthly', href: '/monthly', icon: BarChart2 },
  { label: 'Subjects', href: '/subjects', icon: BookOpen },
  { label: 'My Tracker', href: '/tracker', icon: Activity },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop top tab bar */}
      <div className="glass-card border-b border-[var(--card-border)] hidden md:flex px-6 gap-1 sticky top-14 z-40">
        {TABS.map(tab => {
          const active = pathname === tab.href || pathname.startsWith(tab.href + '/');
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-all relative ${
                active
                  ? 'text-accent-blue font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue rounded-full" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile bottom tab bar */}
      <div className="glass-card border-t border-[var(--card-border)] fixed bottom-0 left-0 right-0 z-50 flex md:hidden px-1 pb-safe">
        {TABS.map(tab => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-all ${
                active ? 'text-accent-blue' : 'text-[var(--text-muted)]'
              }`}
            >
              <tab.icon size={18} />
              <span className="text-[10px] font-medium leading-none">
                {tab.label === 'My Tracker' ? 'Tracker' : tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
