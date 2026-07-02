import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from '@/shared/libs/store/store-provider';
import GlobalNetworkGuard from '@/shared/components/GlobalNetworkGuard';
import GlobalLayout from '@/shared/components/GlobalLayout';
import Providers from '@/shared/libs/tanstack-query/providers';

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
        <ToastContainer className={'ultimate-top-toast'} />
        <StoreProvider>
          <Providers>
            <GlobalNetworkGuard />
            <GlobalLayout />
            <div id="modal-root"></div>

            {children}
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
