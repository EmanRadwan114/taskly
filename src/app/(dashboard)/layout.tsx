import MainLayoutMobile from '@/shared/components/MainLayoutMobile';
import Navbar from '@/shared/components/Navbar';
import Sidebar from '@/shared/components/Sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen hidden lg:flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="lg:flex-1 min-w-0">
          <header>
            <Navbar />
          </header>
          <main className="p-9 flex flex-col relative">{children}</main>
        </div>
      </div>

      <div className="flex flex-col lg:hidden">
        <MainLayoutMobile />
        <main className="pt-8 pb-12 px-6 mb-16">{children}</main>
      </div>
    </>
  );
}
