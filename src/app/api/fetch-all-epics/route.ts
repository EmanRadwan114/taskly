import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');

    if (projectId) {
      const endpointUrl = `rest/v1/project_epics?project_id=eq.${projectId}&order=created_at.asc`;
      const response = await fetchWithAuthServer(endpointUrl);
      return NextResponse.json({ response });
    }
  } catch (error) {
    throw error;
  }
}
