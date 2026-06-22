import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const LIMIT = Number(url.searchParams.get('limit')) || FETCH_LIMIT;
    const OFFSET = Number(url.searchParams.get('offset')) || 0;
    const projectId = url.searchParams.get('projectId');

    if (projectId) {
      const endpointUrl = `rest/v1/project_tasks?project_id=eq.${projectId}&limit=${LIMIT}&offset=${OFFSET}&order=created_at.asc`;
      const isPaginated = true;
      const response = await fetchWithAuthServer(endpointUrl, isPaginated);
      return NextResponse.json({ response });
    }
  } catch (error) {
    throw error;
  }
}
