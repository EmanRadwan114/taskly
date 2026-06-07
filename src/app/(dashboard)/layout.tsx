import MainLayoutMobile from '@/shared/components/MainLayoutMobile';
import Navbar from '@/shared/components/Navbar';
import Sidebar from '@/shared/components/Sidebar';
import { fetchWithAuthServer } from '@/shared/utils/functions.utils';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await fetchWithAuthServer('auth/v1/user');
  const user = result?.user_metadata;

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
          <main>{children}</main>
        </div>
      </div>

      <div className="flex flex-col lg:hidden">
        <MainLayoutMobile user={user} />
        <main>{children}</main>
      </div>
    </>
  );
}
