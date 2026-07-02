'use client';

import React from 'react';
import { IMember } from '../types/members.types';
import Badge from '@/shared/components/ui/Badge';
import DotsIcon from '@/assets/icons/dots.svg';
import Button from '@/shared/components/ui/Button';
import TableCol from '@/shared/components/ui/TableCol';
import TableRow from '@/shared/components/ui/TableRow';
import MemberInfo from './MemberInfo';
import { roleStyle } from '../data/members.data';

interface IProps {
  member: IMember;
}

const MemberItemDesktop: React.FC<IProps> = ({ member }) => {
  return (
    <TableRow className="w-full bg-white border-b border-b-slate-lighter last:border-0 hidden md:table-row">
      <TableCol className="w-1/2">
        <MemberInfo member={member} />
      </TableCol>
      {/* role */}
      <TableCol className="text-center w-1/4">
        <Badge
          className={`${roleStyle[member.role]} rounded-full! py-1! px-3!`}
        >
          {member.role}
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
    </TableRow>
  );
};

export default MemberItemDesktop;
