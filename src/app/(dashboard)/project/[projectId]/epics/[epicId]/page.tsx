import EpicModal from '@/features/epics/components/EpicModal';
import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import DisplayedEpics from '@/features/epics/components/DisplayedEpics';
import LoadingEpics from '@/features/epics/components/LoadingEpics';
import { Suspense } from 'react';

interface Props {
  params: Promise<{ epicId: string; projectId: string }>;
}

export default async function Page({ params }: Props) {
  const { epicId, projectId } = await params;

  const endpoint = `rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`;

  const epic = await fetchWithAuthServer(endpoint);

  return (
    <>
      {/* Render the epics list in the background — mirrors soft-nav behaviour */}
      <Suspense fallback={<LoadingEpics />}>
        <DisplayedEpics />
      </Suspense>
      <EpicModal epic={epic?.data[0]} />
    </>
  );
}
