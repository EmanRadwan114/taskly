import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen md:gap-y-16px">
      <header className="py-6.5">
        <Container>
          <Logo />
        </Container>
      </header>
      <main className="flex items-center justify-center">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
