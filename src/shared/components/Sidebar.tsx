'use client';

import Logo from './ui/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import LogoIcon from '@/assets/icons/logo.svg';
import Button from './ui/Button';
import LogoutBtn from './ui/LogoutBtn';
import { useState } from 'react';
import { asideLinks } from '../data/static-data';
import { useMobile } from '../hooks/shared.hooks';

interface IProps {
  isOpen?: boolean;
}

const Sidebar: React.FC<IProps> = ({ isOpen = false }) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { isMobile } = useMobile(1024);

  // handlers
  const toggleMenuCollapse = () => {
    if (isMobile) return;
    setIsCollapsed((c) => !c);
  };

  const asideNavLinks = (
    <ul className="flex flex-col gap-4px">
      {asideLinks.map((link) => {
        const isLinkActive = pathname?.includes(link.href);
        const Icon = link.icon;
        return (
          <li
            key={link.id}
            className={`rounded-4px group ${isLinkActive ? 'bg-white' : ''} ${isCollapsed ? 'size-48px flex items-center justify-center' : 'py-10px px-12px'}`}
          >
            <Link
              href={link.href}
              className={`${isCollapsed ? 'w-fit' : 'w-full'} flex items-center gap-12px group-hover:text-primary transition-all duration-300 ${isLinkActive ? 'text-primary' : 'text-slate-dark'} capitalize ${isMobile && isLinkActive ? 'text-primary-container' : 'text-slate-dark/60'}`}
            >
              <span
                className={`w-4.5 transition-transform duration-300 ${isCollapsed ? 'group-hover:scale-110 mx-auto' : ''}`}
                title={link.label}
              >
                <Icon />
              </span>
              {!isCollapsed && (
                <span className={`font-medium leading-5`}>{link.label}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  // desktop aside
  const desktopAside = (
    <aside
      className={`sticky top-0 bottom-0 p-16px h-screen bg-surface-low transition-all duration-300 z-999 ${isCollapsed ? 'w-fit' : 'w-[256px]'}`}
    >
      <div className="flex flex-col gap-y-32px h-full">
        {isCollapsed ? (
          <div className="flex items-center justify-center">
            <LogoIcon className="w-4.5 text-primary-container" />
          </div>
        ) : (
          <Logo />
        )}
        <div className="flex flex-col justify-between flex-1">
          {/* navigation links */}
          {asideNavLinks}

          {/* actions */}
          <div className="flex flex-col gap-4px capitalize">
            <Button
              variant="ghost"
              className="text-slate-dark! leading-5 justify-start gap-12px px-12px! py-10px! hover:text-primary! transition-colors duration-300 group hidden lg:flex"
              onClick={toggleMenuCollapse}
            >
              {isCollapsed ? (
                <span title="Expand Menu">
                  <ChevronRightIcon
                    className={`w-2.75 ${isCollapsed ? 'group-hover:scale-110 mx-auto' : ''}`}
                  />
                </span>
              ) : (
                <span title="Collapse Menu">
                  <ChevronLeftIcon
                    className={`w-2.75 ${isCollapsed ? 'group-hover:scale-110 mx-auto' : ''}`}
                  />
                </span>
              )}
              {!isCollapsed && <span>collapse</span>}
            </Button>

            <LogoutBtn isCollapsed={isCollapsed} />
          </div>
        </div>
      </div>
    </aside>
  );

  // mobile aside
  const mobileAside = (
    <aside
      className={`sticky top-0 bottom-0 inset-s-0 p-16px h-screen bg-surface-low transition-all duration-500 z-999 ${isOpen ? 'translate-x-0 w-[256px] visible opacity-100' : '-translate-x-full w-0 invisible opacity-0 text-[0px]'}`}
    >
      <div className={`flex flex-col gap-y-32px h-full`}>
        <Logo />

        <div className="flex flex-col justify-between flex-1">
          {/* navigation links */}
          {asideNavLinks}

          {/* actions */}
          <div className="flex flex-col gap-4px capitalize">
            <LogoutBtn />
          </div>
        </div>
      </div>
    </aside>
  );

  return <>{isMobile ? mobileAside : desktopAside}</>;
};

export default Sidebar;
