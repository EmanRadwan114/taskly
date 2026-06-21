'use client';

import Menu from '@/assets/icons/menu.svg';
import Button from './ui/Button';
import { useAppDispatch, useAppSelector } from '../libs/store/store';
import { useEffect, useState } from 'react';
import LogoutBtn from './ui/LogoutBtn';
import { getNameInitials } from '../utils/functions.client.utils';
import { fetchUserData } from '../libs/store/slices/auth.slice';

interface Props {
  toggleSideBar?: () => void;
}
const Navbar: React.FC<Props> = ({ toggleSideBar }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const isMobileLayout = toggleSideBar !== undefined;

  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  // dispatch user to store
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // handlers
  const toggleSubMenu = () => setIsSubMenuOpen((c) => !c);

  // get user initials
  const userInitials = getNameInitials(user?.name || '');

  // conditional rendering => user loading
  if (!user) {
    return (
      <nav className="sticky inset-s-0 inset-e-0 border-b border-b-black/10 py-3 px-6">
        {/* loading desktop */}
        <div className="hidden lg:flex justify-end gap-4">
          {/* user info loading on desktop*/}
          <div className="hidden lg:flex flex-col items-end gap-1">
            {/* name loading */}
            <div className="bg-slate-light animate-pulse rounded-sm shadow-primary flex items-center justify-center w-20 h-5"></div>
            {/* job title loading */}
            <div className="bg-slate-light animate-pulse rounded-sm shadow-primary flex items-center justify-center w-24 h-4"></div>
          </div>
          {/* avatar loading */}
          <div className="bg-slate-light animate-pulse rounded-lg shadow-primary flex items-center justify-center size-10"></div>
        </div>
        {/* loading mobile */}
        <div className="lg:hidden flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* burger menu on mobile only */}
            <div className="bg-slate-light animate-pulse rounded-lg shadow-primary flex items-center justify-center size-6"></div>
            {/* title on mobile only */}
            <div className="bg-slate-light animate-pulse rounded-lg shadow-primary flex items-center justify-center w-20 h-5"></div>
          </div>
          {/* avatar loading */}
          <div className="bg-slate-light animate-pulse rounded-lg shadow-primary flex items-center justify-center size-10"></div>
        </div>
      </nav>
    );
  }

  // avatar
  const avatar = (
    <div className="relative">
      <div
        className="bg-primary-container rounded-lg shadow-primary flex items-center justify-center size-10 cursor-pointer"
        onClick={toggleSubMenu}
      >
        <span className="uppercase text-white text-body-lg font-bold leading-6">
          {userInitials}
        </span>
      </div>

      {isSubMenuOpen && (
        <div className="absolute inset-e-0 -bottom-14 bg-white shadow-primary p-1 rounded-sm w-50 z-99">
          <LogoutBtn />
        </div>
      )}
    </div>
  );

  // desktop nav
  const desktopNav = (
    <div className="flex justify-end">
      <div className="flex gap-4">
        {/* name */}
        <div className="flex flex-col items-end">
          <h3 className="font-semibold leading-5 text-slate-dark capitalize">
            {user?.name}
          </h3>
          <span className="text-body-xs font-bold letter-spacing-lg leading-5 text-primary uppercase">
            {user?.job_title}
          </span>
        </div>
        {/* avatar */}
        {avatar}
      </div>
    </div>
  );

  //   mobile nav
  const mobileNav = (
    <div className="flex justify-between items-center">
      {/* menu burger */}
      <div className="flex gap-3 items-center">
        <Button
          className="p-1! cursor-pointer!"
          variant="ghost"
          onClick={toggleSideBar}
        >
          <Menu className="text-slate-dark w-5" />
        </Button>
        <h3 className="font-bold text-heading-5 leading-7 letter-spacing-sm uppercase">
          Taskly
        </h3>
      </div>
      {/* avatar */}
      {avatar}
    </div>
  );

  return (
    <nav className="sticky inset-s-0 inset-e-0 border-b border-b-black/10 py-3 px-6">
      {isMobileLayout ? mobileNav : desktopNav}
    </nav>
  );
};

export default Navbar;
