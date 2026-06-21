import EpicModal from '@/features/epics/components/EpicModal';
import DisplayedEpics from '@/features/epics/components/DisplayedEpics';
import LoadingEpics from '@/features/epics/components/LoadingEpics';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <>
      <Suspense fallback={<LoadingEpics />}>
        <DisplayedEpics />
      </Suspense>
      <EpicModal />
    </>
  );
}
