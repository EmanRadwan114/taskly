'use client';

import { getNameInitials } from '@/shared/utils/functions.client.utils';
import { IMember } from '../types/members.types';

interface IProps {
  member: IMember;
}

const MemberInfo: React.FC<IProps> = ({ member }) => {
  const avatarBg = Math.round(Math.random() * 255) + 1;
  const memberInitials = getNameInitials(member?.metadata.name);

  return (
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
};

export default MemberInfo;
