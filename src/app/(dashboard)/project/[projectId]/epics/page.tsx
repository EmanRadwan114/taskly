
import FetchedEpics from '@/features/epics/components/FetchedEpics';
import LoadingEpics from '@/features/epics/components/LoadingEpics';
import { Suspense } from 'react';

interface IProps {
  searchParams: Promise<{
    page?: string;
  }>, 
  params: Promise<{projectId: string}>
}
export default async function ProjectPage({searchParams, params}: IProps) {
  const currentSearchParams = await searchParams;
  const currentPage = Number(currentSearchParams?.page) || 1;
  const {projectId} = await params;
      
  return <Suspense key={currentPage} fallback={<LoadingEpics />}>
    <FetchedEpics currentPage={currentPage} projectId={projectId} />
  </Suspense>
}
