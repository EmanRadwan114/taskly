'use client';

import React, { useState } from 'react';
import { IMember } from '../types/members.types';
import Badge from '@/shared/components/ui/Badge';
import DotsIcon from '@/assets/icons/dots.svg';
import Button from '@/shared/components/ui/Button';
import { useMobile } from '@/shared/hooks/shared.hooks';

interface IProps {
  member: IMember;
}

const MemberItem: React.FC<IProps> = ({ member }) => {
  const [avatarBg, _] = useState(Math.round(Math.random() * 255));
  const { isMobile } = useMobile(768);

  const memberInitials =
    member?.metadata.name.split(' ').length > 1
      ? member?.metadata.name
          .split(' ')
          .slice(0, 2)
          .map((w) => w[0])
          .join('')
      : member?.metadata.name.split('').slice(0, 2).join('');

  const roleStyle = {
    viewer: 'bg-slate-lighter text-secondary',
    member: 'bg-surface-high text-secondary',
    owner: 'bg-primary-container text-white',
    admin: 'bg-surface-dark text-slate-md',
  };

  const memberInfo = (
    <div className="flex gap-16px">
      {/* avatar */}
      <div
        className={`flex items-center justify-center rounded-lg size-48px`}
        style={{ backgroundColor: `#${avatarBg}` }}
      >
        <span className="text-surface-low font-bold uppercase">
          {memberInitials}
        </span>
      </div>
      {/* member info */}
      <div>
        <h3 className="font-semibold text-slate-dark capitalize">
          {member?.metadata.name}
        </h3>
        <span className="text-label text-secondary">
          {member?.metadata.email}
        </span>
      </div>
    </div>
  );

  // desktop view
  const desktopView = (
    <>
      {/* member details */}
      <td className="w-1/2 px-9 py-5">{memberInfo}</td>
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
    </>
  );

  // mobile view
  const mobileView = (
    <div className="flex justify-between gap-16px bg-white rounded-8px p-16px md:hidden">
      {memberInfo}
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
  return <>{isMobile ? mobileView : desktopView}</>;
};

export default MemberItem;
