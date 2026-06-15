
import FetchedProjects from '@/features/projects/components/FetchedProjects';
import LoadingProjects from '@/features/projects/components/LoadingProjects';
import { Suspense } from 'react';

interface IProps {
  searchParams: Promise<{
    page?: string;
  }>
}
export default async function ProjectPage({searchParams}: IProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
      
  // use suspense with unique key & seperate fetch logic in order to display loading when currentPage changes
  return <Suspense key={page} fallback={<LoadingProjects />}>
    <FetchedProjects currentPage={page} />
  </Suspense>
}
