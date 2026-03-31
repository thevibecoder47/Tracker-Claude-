import AuthGuard from '@/components/layout/AuthGuard';
import Navbar from '@/components/layout/Navbar';
import TabNav from '@/components/layout/TabNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
        <Navbar />
        <TabNav />
        <main className="flex-1 pb-20 md:pb-6">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
