import { FETCH_LIMIT } from "@/shared/utils/variables.utils";
import { fetchWithAuthServer } from "@/shared/utils/functions.server.utils";
import DisplayedEpics from "./DisplayedEpics";

export const dynamic = 'force-dynamic'

export default async function FetchedEpics({currentPage, projectId}: {currentPage: number, projectId: string}) {
  const LIMIT = FETCH_LIMIT;
  const OFFSET = (currentPage - 1) * LIMIT;

  const endpointUrl = `rest/v1/project_epics?project_id=eq.${projectId}&limit=${LIMIT}&offset=${OFFSET}`;

  const isPaginated = true;
  
  const response = await fetchWithAuthServer(endpointUrl, isPaginated
  );
      
  return <DisplayedEpics epics={response?.data} paginationMetaData={response?.meta} />
}