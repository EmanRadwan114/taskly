import Navbar from '@/shared/components/ui/Navbar';
import Sidebar from '@/shared/components/ui/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 grid-rows-12 lg:grid-cols-9 lg:grid-rows-12 min-h-screen">
      <div className="lg:col-span-2 lg:row-span-12 bg-primary/10 hidden lg:block">
        <Sidebar />
      </div>

      <header className="lg:col-span-8 lg:row-span-1">
        <Navbar />
      </header>

      <main className="lg:col-span-8 lg:col-start-3 lg:row-span-11 lg:row-start-2">
        {children}
      </main>
    </div>
  );
}
