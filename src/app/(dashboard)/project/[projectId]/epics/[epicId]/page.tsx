import EpicModal from '@/features/epics/components/EpicModal';
import DisplayedEpics from '@/features/epics/components/DisplayedEpics';

interface IProps {
  searchParams: Promise<{ page: string }>;
}

export default async function Page({ searchParams }: IProps) {
  const params = await searchParams;

  return (
    <>
      <DisplayedEpics searchParams={params} />
      <EpicModal />
    </>
  );
}
