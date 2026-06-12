import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');
    const projectId = url.searchParams.get('project_id');

    const endpointUrl = `/rest/v1/project_epics?project_id=eq.${projectId}&limit=${limit}&offset=${offset}`;

    const isPaginated = true;

    const response = await fetchWithAuthServer(endpointUrl, isPaginated);

    return NextResponse.json({ response });
  } catch (error) {
    throw error;
  }
}
