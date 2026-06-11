import MainLayoutMobile from '@/shared/components/MainLayoutMobile';
import Navbar from '@/shared/components/Navbar';
import Sidebar from '@/shared/components/Sidebar';
import BreadCrumb from '@/shared/components/ui/BreadCrumb';
import { fetchWithAuthServer } from '@/shared/utils/functions.utils';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await fetchWithAuthServer('auth/v1/user');
  const user = result?.data?.user_metadata;

  return (
    <>
      <div className="min-h-screen hidden lg:flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="lg:flex-1">
          <header>
            <Navbar user={user} />
          </header>
          <main className="p-32px flex flex-col">
            <BreadCrumb />
            {children}
          </main>
        </div>
      </div>

      <div className="flex flex-col lg:hidden">
        <MainLayoutMobile user={user} />
        <main className="pt-8 pb-12 px-24px mb-16">{children}</main>
      </div>
    </>
  );
}
