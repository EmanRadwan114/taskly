import AcceptMemberInvitation from '@/features/members/components/AcceptMemberInvitation';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <AcceptMemberInvitation />
    </Suspense>
  );
}

