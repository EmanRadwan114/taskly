import Container from '@/shared/components/ui/Container';
import Logo from '@/shared/components/ui/Logo';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`flex flex-col min-h-screen md:gap-y-16px relative bg-secondary-background`}
    >
      <header className="py-6.5">
        <Container>
          <Logo />
        </Container>
      </header>
      <main className="w-full flex items-center justify-start sm:justify-center mb-48px md:max-w-5/6 lg:max-w-4/6 md:mx-auto xl:max-w-1/2 h-full">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
