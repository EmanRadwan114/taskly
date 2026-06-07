'use client';
import Link from 'next/link';
import { asideLinks } from '../data/static-data';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { IUser } from '@/features/auth/types/auth.types';

interface Props {
  user: IUser;
}

const MainLayoutMobile: React.FC<Props> = ({ user }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSideBar = () => {
    setIsSideBarOpen((s) => !s);
  };
  return (
    <>
      <Navbar toggleSideBar={toggleSideBar} user={user} />
      <Sidebar isOpen={isSideBarOpen} />
      <div
        className={`fixed lg:hidden inset-0 transition-all duration-300 ${isSideBarOpen ? 'bg-slate-dark/40 backdrop-blur-xs z-10' : 'bg-none static'}`}
        onClick={toggleSideBar}
      ></div>

      {/* sticky links */}
      {!isSideBarOpen && (
        <section className="fixed w-full bottom-0 z-5 bg-surface-low px-6.5 h-16">
          <div className="h-full flex flex-col justify-center">
            <div className="flex justify-between items-end gap-4px">
              {asideLinks.map((link) => {
                const isLinkActive = pathname?.includes(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    href={link.href}
                    className={` flex flex-col items-center justify-center text-center sm:p-6px hover:text-primary-container gap-4px group-hover:text-primary transition-all duration-300 ${isLinkActive ? 'text-primary-container' : 'text-slate-dark/70'} capitalize`}
                    key={link.id}
                  >
                    <span className={`w-5 transition-transform duration-300`}>
                      <Icon />
                    </span>
                    <span className={`text-[10px] leading-3.75`}>
                      {link.label.split(' ').length > 1
                        ? link.label.split(' ')[1]
                        : link.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MainLayoutMobile;
