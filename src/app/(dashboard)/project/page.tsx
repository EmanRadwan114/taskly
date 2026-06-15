import DisplayedProjects from '@/features/projects/components/DisplayedProjects';
import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';

export default async function ProjectPage() {
  const LIMIT = 0;
  const OFFSET = 0;
  
  const endpointUrl = `rest/v1/rpc/get_projects?limit=${LIMIT}&offset=${OFFSET}`;
  const isPaginated = true;
  
  const response = await fetchWithAuthServer(endpointUrl, isPaginated);
      
  return <DisplayedProjects projects={response?.data} meta={response?.meta} />;
}
