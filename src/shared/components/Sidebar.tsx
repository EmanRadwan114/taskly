'use client';

import Logo from './ui/Logo';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import LogoIcon from '@/assets/icons/logo.svg';
import Button from './ui/Button';
import LogoutBtn from './ui/LogoutBtn';
import { useState } from 'react';
import { getAsideLinks } from '../data/sidebar-links';

interface IProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const Sidebar: React.FC<IProps> = ({ isOpen, setIsOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { projectId } = useParams();

  // If isOpen is passed (even as false), we are in the mobile layout.
  const isMobileLayout = isOpen !== undefined;

  // displayed sidebar links
  const displayedSidebarLinks = projectId
    ? getAsideLinks(projectId as string)
    : getAsideLinks().filter((n) => !n.protected);

  // handlers
  const toggleMenuCollapse = () => {
    if (isMobileLayout) return;
    setIsCollapsed((c) => !c);
  };

  const asideNavLinks = (
    <ul className="flex flex-col gap-1">
      {displayedSidebarLinks.map((link) => {
        const isLinkActive = pathname === link.href;
        const Icon = link.icon;
        return (
          <li
            key={link.id}
            className={`rounded-sm group ${isLinkActive ? 'bg-white' : ''} ${isCollapsed ? 'size-12 flex items-center justify-center' : 'py-2.5 px-3'}`}
            onClick={() => {
              setIsOpen?.(false);
            }}
          >
            <Link
              href={link.href}
              className={`${isCollapsed ? 'w-fit' : 'w-full'} flex items-center gap-3 group-hover:text-primary transition-all duration-300 capitalize ${!isMobileLayout ? (isLinkActive ? 'text-primary' : 'text-slate-dark') : isLinkActive ? 'text-primary-container' : 'text-slate-dark/60'}`}
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
      className={`sticky top-0 bottom-0 p-4 h-screen bg-surface-low transition-all duration-300 z-999 ${isCollapsed ? 'w-fit' : 'w-[256px]'}`}
    >
      <div className="flex flex-col gap-y-9 h-full">
        {isCollapsed ? (
          <Link href={'/project'} className="flex items-center justify-center">
            <LogoIcon className="w-4.5 text-primary-container" />
          </Link>
        ) : (
          <Logo />
        )}
        <div className="flex flex-col justify-between flex-1">
          {/* navigation links */}
          {asideNavLinks}

          {/* actions */}
          <div className="flex flex-col gap-1 capitalize">
            <Button
              variant="ghost"
              className="text-slate-dark! leading-5 justify-start gap-3 px-3! py-2.5! hover:text-primary! transition-colors duration-300 group hidden lg:flex"
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
      className={`fixed top-0 bottom-0 inset-s-0 p-4 bg-surface-low transition-all duration-500 z-999 ${isOpen ? 'translate-x-0 w-[256px] visible opacity-100' : '-translate-x-full w-0 invisible opacity-0'}`}
    >
      <div className={`flex flex-col gap-y-9 h-full`}>
        <Logo />

        <div className="flex flex-col justify-between flex-1">
          {/* navigation links */}
          {asideNavLinks}

          {/* actions */}
          <div className="flex flex-col gap-1 capitalize">
            <LogoutBtn />
          </div>
        </div>
      </div>
    </aside>
  );

  return <>{isMobileLayout ? mobileAside : desktopAside}</>;
};

export default Sidebar;
