import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import StoreProvider from '@/shared/libs/store/StoreProvider';
import GlobalNetworkGuard from '@/shared/components/GlobalNetworkGuard';
import GlobalLayout from '@/shared/components/GlobalLayout';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Taskly',
  description: 'Taskly is a project management tool for teams.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <ToastContainer />
          <GlobalNetworkGuard />
          <GlobalLayout />

          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
