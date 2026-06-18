import EpicModal from '@/features/epics/components/EpicModal';
import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';

export const dynamic = "force-dynamic";

interface Props {
  params: { epicId: string; projectId: string };
}

export default async function Page({ params }: Props) {
  const { epicId, projectId } = await params;

  const endpoint = `rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`;

  const epic = await fetchWithAuthServer(endpoint);

  return <EpicModal epic={epic?.data[0]} />;
}
