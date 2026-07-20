import DisplayedEpics from '@/features/epics/components/DisplayedEpics';
import { Suspense } from 'react';

export default async function ProjectPage() {
  return (
    <Suspense>
      <DisplayedEpics />
    </Suspense>
  );
}
