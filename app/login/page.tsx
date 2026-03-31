'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useAuth } from '@/app/layout';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && user) {
      router.push('/home');
    }
  }, [user, loading, router]);

  async function handleGoogleSignIn() {
    setSigning(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/home');
    } catch (err: unknown) {
      setError('Sign-in failed. Please try again.');
      console.error(err);
    } finally {
      setSigning(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[var(--bg-primary)]">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #4F8CFF 0%, transparent 70%)',
            animation: 'float1 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)',
            animation: 'float2 10s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
            animation: 'float3 6s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 30px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(1.1); }
          66% { transform: translate(20px, -30px) scale(0.9); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>

      {/* Login card */}
      <div
        className="glass-card rounded-card shadow-card-dark relative z-10 p-10 w-full max-w-md mx-4 text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-accent-blue/10 border border-accent-blue/20 rounded-full px-4 py-1.5 mb-6">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-accent-blue text-xs font-mono font-medium tracking-wider uppercase">
            GATE 2027 Prep Tracker
          </span>
        </div>

        {/* Title */}
        <h1 className="font-bebas text-4xl md:text-5xl gradient-text mb-1 leading-tight">
          KARAN PRABHAT
        </h1>
        <h2 className="font-bebas text-2xl md:text-3xl gradient-text mb-1">
          THE GATE ASPIRANT
        </h2>
        <p className="text-[var(--text-muted)] text-sm font-dm tracking-widest uppercase mb-8">
          TARGET — IIT BOMBAY / IISc
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-[var(--card-border)]" />
          <span className="text-[var(--text-muted)] text-xs font-mono">SIGN IN TO CONTINUE</span>
          <div className="flex-1 h-px bg-[var(--card-border)]" />
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={signing}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-medium px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {signing ? (
            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          <span>{signing ? 'Signing in...' : 'Continue with Google'}</span>
        </button>

        {error && (
          <p className="mt-4 text-red-400 text-sm">{error}</p>
        )}

        {/* Footer note */}
        <p className="mt-8 text-[var(--text-muted)] text-xs">
          Your progress is saved to the cloud and syncs across all your devices.
        </p>
      </div>
    </div>
  );
}
