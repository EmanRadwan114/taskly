'use client';

import { useMobile } from '@/shared/hooks/useMobile';
import Menu from '@/assets/icons/menu.svg';

const Navbar: React.FC = ({}) => {
  const { isMobile } = useMobile();

  const avatar = (
    <div className="bg-primary-container rounded-8px shadow-primary flex items-center justify-center size-10">
      <span className="uppercase text-white text-[16px] font-bold leading-6">
        MT
      </span>
    </div>
  );

  // desktop nav
  const desktopNav = (
    <div className="flex justify-end">
      <div className="flex gap-16px">
        {/* name */}
        <div className="flex flex-col items-end">
          <h3 className="font-semibold leading-5 text-slate-dark capitalize">
            Mahmoud Taha
          </h3>
          <span className="text-[10px] font-bold tracking-[1px] leading-5 text-primary uppercase">
            Project Manager
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
        <Menu className="text-slate-dark w-6.5 cursor-pointer p-1" />
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
