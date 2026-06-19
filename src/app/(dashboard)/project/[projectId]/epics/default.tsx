import DisplayedEpics from '@/features/epics/components/DisplayedEpics';
import LoadingEpics from '@/features/epics/components/LoadingEpics';
import { Suspense } from 'react';

export default function DefaultEpicsLayout() {
  return (
    <Suspense fallback={<LoadingEpics />}>
      <DisplayedEpics />
    </Suspense>
  );
}
