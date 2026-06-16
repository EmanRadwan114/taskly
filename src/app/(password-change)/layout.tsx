import Container from '@/shared/components/ui/Container';
import Logo from '@/shared/components/ui/Logo';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`relative bg-secondary-background min-h-screen`}>
      <div className="md:min-h-[90vh] min-h-screen w-full flex flex-col flex-1 h-full">
        <header className="py-6.5">
          <Container>
            <Logo />
          </Container>
        </header>
        <main className="w-full flex flex-col items-center justify-center pb-12 md:py-12 md:max-w-5/6 lg:max-w-4/6 md:mx-auto xl:max-w-1/2 flex-1">
          <Container className="flex-1 flex flex-col justify-center items-center">
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
}
