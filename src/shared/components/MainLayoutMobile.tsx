'use client';
import Link from 'next/link';
import { getAsideLinks } from '../data/sidebar-links';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

const MainLayoutMobile: React.FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const pathname = usePathname();
  const { projectId } = useParams();

  // displayed sidebar links
  const displayedSidebarLinks = projectId
    ? getAsideLinks(projectId as string)
    : getAsideLinks().filter((n) => !n.protected);

  const toggleSideBar = () => {
    setIsSideBarOpen((s) => !s);
  };
  return (
    <>
      <Navbar toggleSideBar={toggleSideBar} />
      <Sidebar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
      <div
        className={`fixed lg:hidden inset-0 transition-all duration-300 ${isSideBarOpen ? 'bg-slate-dark/40 backdrop-blur-xs z-10' : 'bg-none static'}`}
        onClick={toggleSideBar}
      ></div>

      {/* sticky links */}
      {!isSideBarOpen && (
        <section className="fixed w-full bottom-0 z-5 bg-surface-low px-6.5 h-16">
          <div className="h-full flex flex-col justify-center">
            <div
              className={`flex ${projectId ? 'justify-between gap-1' : 'justify-center gap-12'} items-end `}
            >
              {displayedSidebarLinks.map((link) => {
                const isLinkActive = pathname === link.href.split('?')[0];
                const Icon = link.icon;
                return (
                  <Link
                    href={link.href}
                    className={` flex flex-col items-center justify-center text-center sm:p-1.5 hover:text-primary-container gap-1 group-hover:text-primary transition-all duration-300 ${isLinkActive ? 'text-primary-container' : 'text-slate-dark/70'} capitalize`}
                    key={link.id}
                  >
                    <span className={`w-5 transition-transform duration-300`}>
                      <Icon />
                    </span>
                    <span className={`text-body-xs leading-3.75`}>
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
