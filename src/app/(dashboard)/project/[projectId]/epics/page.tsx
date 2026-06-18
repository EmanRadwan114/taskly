import { Suspense } from 'react';
import DisplayedEpics from '@/features/epics/components/DisplayedEpics';
import LoadingEpics from '@/features/epics/components/LoadingEpics';

export default function ProjectPage() {
  return (
    <Suspense fallback={<LoadingEpics />}>
      <DisplayedEpics />
    </Suspense>
  );
}

