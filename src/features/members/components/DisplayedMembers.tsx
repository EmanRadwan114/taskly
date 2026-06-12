'use client';

import { useMobile } from '@/shared/hooks/shared.hooks';
import MemberItem from './MemberItem';

const DisplayedMembers: React.FC = ({}) => {
  // desktop members view
  const desktopMembersView = (
    <table className="w-full hidden lg:table table-fixed border-collapse rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-surface-md/30 text-left">
          <th className="w-1/2 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Member
          </th>
          <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Role
          </th>
          <th className="w-1/4 uppercase text-label-sm text-secondary px-12 py-5 font-semibold">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 6 }).map((_, indx) => (
          <MemberItem
            key={indx}
            member={{
              name: 'Mohamed Taher',
              role: 'admin',
              email: 'taher@mail.com',
            }}
          />
        ))}
      </tbody>
    </table>
  );

  // mobile members view
  const mobileMembersView = (
    <div className="flex lg:hidden flex-col gap-12px">
      {Array.from({ length: 6 }).map((_, indx) => (
        <MemberItem
          key={indx}
          member={{
            name: 'Mohamed Taher',
            role: 'admin',
            email: 'taher@mail.com',
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      {mobileMembersView}
      {desktopMembersView}
    </>
  );
};

export default DisplayedMembers;
