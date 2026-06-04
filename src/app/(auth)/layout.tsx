import Container from '@/shared/components/ui/Container';
import Logo from '@/shared/components/ui/Logo';
import Image from 'next/image';
import authGradientImg from '@/assets/imgs/auth-gradient.png';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex flex-col min-h-screen relative`}>
      <header className="py-6.5 shrink-0">
        <Container>
          <Logo />
        </Container>
      </header>
      <main className="w-full flex flex-col items-center justify-center mb-48px md:my-48px md:max-w-5/6 lg:max-w-4/6 md:mx-auto xl:max-w-1/2 flex-1 md:flex-none">
        <Container className="flex-1 flex flex-col justify-center items-center">
          {children}
        </Container>
      </main>

      <Image
        src={authGradientImg}
        alt="blue radial gradient background"
        className="absolute inset-e-0 bottom-0 -z-10 hidden md:block"
        width={300}
        height={300}
      />
    </div>
  );
}
