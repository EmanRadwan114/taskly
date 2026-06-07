'use client';

import Menu from '@/assets/icons/menu.svg';
import Button from './ui/Button';
import { IUser } from '@/features/auth/types/auth.types';
import { useAppDispatch, useAppSelector } from '../libs/store/store';
import { setUser } from '../libs/store/slices/auth.slice';
import { useEffect, useState } from 'react';
import LogoutBtn from './ui/LogoutBtn';
import { useMobile } from '../hooks/shared.hooks';

interface Props {
  toggleSideBar?: () => void;
  user: IUser;
}
const Navbar: React.FC<Props> = ({ toggleSideBar, user }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const { isMobile } = useMobile(1024);

  const dispatch = useAppDispatch();

  // dispatch user to store
  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [user, dispatch]);

  // handlers
  const toggleSubMenu = () => setIsSubMenuOpen((c) => !c);

  // get user initials
  const userInitials =
    user?.name.split(' ').length > 1
      ? user?.name
          .split(' ')
          .slice(0, 2)
          .map((w) => w[0])
          .join('')
      : user?.name.split('').slice(0, 2).join('');

  // avatar
  const avatar = (
    <div className="relative">
      <div
        className="bg-primary-container rounded-8px shadow-primary flex items-center justify-center size-10 cursor-pointer"
        onClick={toggleSubMenu}
      >
        <span className="uppercase text-white text-[16px] font-bold leading-6">
          {userInitials}
        </span>
      </div>

      {isSubMenuOpen && (
        <div className="absolute inset-e-0 -bottom-14 bg-white shadow-primary p-4px rounded-4px w-50 z-9999">
          <LogoutBtn />
        </div>
      )}
    </div>
  );

  // desktop nav
  const desktopNav = (
    <div className="flex justify-end">
      <div className="flex gap-16px">
        {/* name */}
        <div className="flex flex-col items-end">
          <h3 className="font-semibold leading-5 text-slate-dark capitalize">
            {user?.name}
          </h3>
          <span className="text-[10px] font-bold tracking-[1px] leading-5 text-primary uppercase">
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
      <div className="flex gap-12px items-center">
        <Button
          className="p-1! cursor-pointer!"
          variant="ghost"
          onClick={toggleSideBar}
        >
          <Menu className="text-slate-dark w-5" />
        </Button>
        <h3 className="font-bold text-[20px] leading-7 tracking-[-0.5px] uppercase">
          Taskly
        </h3>
      </div>
      {/* avatar */}
      {avatar}
    </div>
  );

  return (
    <nav className="sticky inset-s-0 inset-e-0 border-b border-b-black/10 py-12px px-24px">
      {isMobile ? mobileNav : desktopNav}
    </nav>
  );
};

export default Navbar;
