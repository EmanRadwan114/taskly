import EpicModal from '@/features/epics/components/EpicModal';
import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ projectId: string; epicId: string }>;
}

export default async function InterceptedViewEpicPage({ params }: Props) {
  const { epicId, projectId } = await params;

  if (epicId === 'new') {
    redirect(`/project/${projectId}/epics/new`);
  }

  return <EpicModal />;
}
