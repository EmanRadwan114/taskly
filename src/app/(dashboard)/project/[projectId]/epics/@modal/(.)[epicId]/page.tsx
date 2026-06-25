import EpicModal from '@/features/epics/components/EpicModal';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ projectId: string; epicId: string }>;
}

export default async function InterceptedViewEpicPage({ params }: Props) {
  const { epicId } = await params;

  if (epicId === 'new') {
    return null;
  }

  return <EpicModal />;
}
