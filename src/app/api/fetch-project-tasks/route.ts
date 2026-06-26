import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit')) || FETCH_LIMIT;
    const offset = Number(url.searchParams.get('offset')) || 0;
    const projectId = url.searchParams.get('projectId');
    const searchTerm = url.searchParams.get('searchTerm');

    const isPaginated = true;

    const tasksEndPoint = `rest/v1/project_tasks?project_id=eq.${projectId}&limit=${limit}&offset=${offset}&order=created_at.asc`;

    const tasksEndPointWithSearch = `rest/v1/project_tasks?project_id=eq.${projectId}&limit=${limit}&offset=${offset}&order=created_at.asc&title=ilike.%25${searchTerm}%25`;

    const endpointUrl = searchTerm ? tasksEndPointWithSearch : tasksEndPoint;

    if (projectId) {
      const response = await fetchWithAuthServer({
        endpoint: endpointUrl,
        isPaginated,
      });
      return NextResponse.json({ response });
    }
  } catch (error) {
    throw error;
  }
}
