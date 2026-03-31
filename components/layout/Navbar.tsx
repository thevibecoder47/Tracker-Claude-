'use client';

import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/app/layout';
import { useGateStore } from '@/store/useGateStore';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const { theme } = useGateStore();

  async function handleSignOut() {
    await signOut(auth);
    router.push('/login');
  }

  return (
    <nav className="glass-card border-b border-[var(--card-border)] sticky top-0 z-50 px-4 md:px-6 h-14 flex items-center justify-between">
      {/* Left: Title */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-accent-blue flex items-center justify-center">
          <span className="text-white text-xs font-bebas">G</span>
        </div>
        <div className="hidden sm:block">
          <span className="font-bebas text-lg gradient-text tracking-wide">GATE 2027</span>
          <span className="text-[var(--text-muted)] text-xs ml-2 font-mono hidden md:inline">KARAN PRABHAT</span>
        </div>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {user && (
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName ?? 'User'}
                className="w-7 h-7 rounded-full border border-[var(--card-border)]"
              />
            )}
            <button
              onClick={handleSignOut}
              className="text-xs text-[var(--text-muted)] hover:text-red-400 transition-colors font-mono hidden sm:block"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
