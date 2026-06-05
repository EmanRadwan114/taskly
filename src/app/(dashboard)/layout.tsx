import MainLayoutMobile from '@/shared/components/MainLayoutMobile';
import Navbar from '@/shared/components/Navbar';
import Sidebar from '@/shared/components/Sidebar';

export default function DashboardLayout({
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
        <div className="lg:flex-1">
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
        </div>
      </div>

      <div className="flex flex-col lg:hidden">
        <MainLayoutMobile />
        <main>{children}</main>
      </div>
    </>
  );
}
