'use client';

import React, { useState } from 'react';
import { IMember } from '../types/members.types';
import Badge from '@/shared/components/ui/Badge';
import DotsIcon from '@/assets/icons/dots.svg';
import Button from '@/shared/components/ui/Button';
import { useMobile } from '@/shared/hooks/shared.hooks';
import { getNameInitials } from '@/shared/utils/functions.client.utils';
import TableCol from '@/shared/components/ui/TableCol';

interface IProps {
  member: IMember;
}

const MemberItem: React.FC<IProps> = ({ member }) => {
  const [avatarBg, _] = useState(Math.round(Math.random() * 255));
  const { isMobile } = useMobile(768);

  const memberInitials = getNameInitials(member?.metadata.name);

  const roleStyle = {
    viewer: 'bg-slate-lighter text-secondary',
    member: 'bg-surface-high text-secondary',
    owner: 'bg-primary-container text-white',
    admin: 'bg-surface-dark text-slate-md',
  };

  const memberInfo = (
    <div className="flex gap-4">
      {/* avatar */}
      <div
        className={`flex items-center justify-center rounded-lg size-12`}
        style={{ backgroundColor: `#${avatarBg}` }}
      >
        <span className="text-surface-md font-bold uppercase">
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
      <TableCol className="w-1/2">{memberInfo}</TableCol>
      {/* role */}
      <TableCol className="text-center w-1/4">
        <Badge
          className={`${roleStyle[member.role]} rounded-full! py-1! px-3!`}
        >
          {' '}
          {member.role}{' '}
        </Badge>
      </TableCol>
      {/* action */}
      <TableCol className=" w-1/4">
        {member.role !== 'owner' && (
          <Button variant="ghost" className="p-1! justify-end">
            <DotsIcon className="text-secondary w-0.75" />
          </Button>
        )}
      </TableCol>
    </>
  );

  // mobile view
  const mobileView = (
    <div className="flex justify-between gap-4 bg-white rounded-lg p-4 md:hidden">
      {memberInfo}
      {/* actions & role */}
      <div className="flex gap-1 items-start">
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
