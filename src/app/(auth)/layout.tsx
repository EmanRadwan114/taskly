import Container from '@/shared/components/ui/Container';
import Logo from '@/shared/components/ui/Logo';
import Image from 'next/image';
import authGradientImg from '@/assets/imgs/auth-gradient.png';
import { headers } from 'next/headers';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname');

  return (
    <div
      className={`flex flex-col min-h-screen md:gap-y-16px relative ${pathname?.includes('forget-password') ? 'bg-secondary-background' : ''}`}
    >
      <header className="py-6.5">
        <Container>
          <Logo />
        </Container>
      </header>
      <main className="w-full flex items-center justify-start sm:justify-center mb-48px md:max-w-5/6 lg:max-w-4/6 md:mx-auto xl:max-w-1/2 h-full">
        <Container>{children}</Container>
      </main>
      {!pathname?.includes('forget-password') && (
        <Image
          src={authGradientImg}
          alt="Gradient Background"
          className="absolute inset-e-0 bottom-0 -z-10 hidden md:block"
          width={300}
          height={300}
        />
      )}
    </div>
  );
}
