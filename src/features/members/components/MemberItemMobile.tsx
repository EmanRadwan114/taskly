'use client';
import Badge from '@/shared/components/ui/Badge';
import { roleStyle } from '../data/members.data';
import { IMember } from '../types/members.types';
import MemberInfo from './MemberInfo';
import Button from '@/shared/components/ui/Button';
import DotsIcon from '@/assets/icons/dots.svg';

interface IProps {
  member: IMember;
}

const MemberItemMobile: React.FC<IProps> = ({ member }) => {
  return (
    <div className="flex justify-between gap-4 bg-white rounded-lg p-4 md:hidden">
      <MemberInfo member={member} />
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
};

export default MemberItemMobile;
