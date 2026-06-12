import React from 'react';
import { IMember } from '../types/members.types';
import Badge from '@/shared/components/ui/Badge';
import DotsIcon from '@/assets/icons/dots.svg';
import Button from '@/shared/components/ui/Button';

interface IProps {
  member: IMember;
}

const MemberItem: React.FC<IProps> = ({ member }) => {
  const roleStyle = {
    viewer: 'bg-slate-lighter text-secondary',
    member: 'bg-surface-high text-secondary',
    owner: 'bg-primary-container text-white',
    admin: 'bg-surface-dark text-slate-md',
  };

  // desktop view
  const desktopView = (
    <tr className="w-full bg-white border-b border-b-slate-lighter last:border-0 hidden lg:table-row">
      {/* member details */}
      <td className="w-1/2 px-9 py-5">
        <div className="flex gap-16px">
          {/* avatar */}
          <div className="flex items-center justify-center rounded-lg size-48px bg-surface-md">
            <span className="text-primary font-bold uppercase">MT</span>
          </div>
          {/* member info */}
          <div>
            <h3 className="font-semibold text-slate-dark capitalize">
              {' '}
              Jordan Diaz{' '}
            </h3>
            <span className="text-label text-secondary">
              {' '}
              jordan.diaz@design.co{' '}
            </span>
          </div>
        </div>
      </td>
      {/* role */}
      <td className="text-center w-1/4 px-9 py-5">
        <Badge
          className={`${roleStyle[member.role]} rounded-full! py-4px! px-12px!`}
        >
          {' '}
          {member.role}{' '}
        </Badge>
      </td>
      {/* action */}
      <td className=" w-1/4 px-9 py-5">
        {member.role !== 'owner' && (
          <Button variant="ghost" className="p-1! justify-end">
            <DotsIcon className="text-secondary w-0.75" />
          </Button>
        )}
      </td>
    </tr>
  );

  // mobile view
  const mobileView = (
    <div className="flex justify-between gap-16px bg-white rounded-8px p-16px lg:hidden">
      {/* details */}
      <div className="flex gap-16px">
        {/* avatar */}
        <div className="flex items-center justify-center w-48px h-48px bg-surface-md rounded-xl">
          <span className="text-primary font-black uppercase">MT</span>
        </div>
        {/* member info */}
        <div>
          <h3 className="font-semibold text-slate-dark capitalize">
            Jordan Diaz
          </h3>
          <span className="text-label text-secondary">
            jordan.diaz@design.co
          </span>
        </div>
      </div>
      {/* actions & role */}
      <div className="flex gap-4px items-start">
        {/* role */}
        <Badge className={`${roleStyle[member.role]}`}>{member.role}</Badge>
        {member.role !== 'owner' && (
          <Button variant="ghost" className="p-1!">
            <DotsIcon className="text-secondary w-0.75" />
          </Button>
        )}
      </div>
    </div>
  );
  return (
    <>
      {mobileView}
      {desktopView}
    </>
  );
};

export default MemberItem;
