import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    const status = url.searchParams.get('status');
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');
    const searchTerm = url.searchParams.get('searchTerm');

    const LIMIT = 6;
    const isPaginated = true;

    const tasksEndPoint = `rest/v1/project_tasks?project_id=eq.${projectId}&status=eq.${status}&limit=${limit}&offset=${offset}&order=created_at.asc`;

    const tasksEndPointWithSearch = `rest/v1/project_tasks?project_id=eq.${projectId}&status=eq.${status}&limit=${limit}&offset=${offset}&order=created_at.asc&title=ilike.%25${searchTerm}%25`;

    const endpointUrl = searchTerm ? tasksEndPointWithSearch : tasksEndPoint;

    if (projectId && status) {
      const response = await fetchWithAuthServer({
        endpoint: endpointUrl,
        isPaginated,
        limit: LIMIT,
      });
      return NextResponse.json({ response });
    }
  } catch (error) {
    throw error;
  }
}
