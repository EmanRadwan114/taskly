import DisplayedProjects from "./DisplayedProjects";
import { FETCH_LIMIT } from "@/shared/utils/variables.utils";
import { fetchWithAuthServer } from "@/shared/utils/functions.server.utils";

export const dynamic = 'force-dynamic'

export default async function FetchedProjects({currentPage}: {currentPage: number}) {
  const LIMIT = FETCH_LIMIT;
  const OFFSET = (currentPage - 1) * LIMIT;

  const endpointUrl = `rest/v1/rpc/get_projects?limit=${LIMIT}&offset=${OFFSET}`;
  const isPaginated = true;
  
  const response = await fetchWithAuthServer(endpointUrl, isPaginated
  );
      
  return <DisplayedProjects projects={response?.data} paginationMetaData={response?.meta} />
}