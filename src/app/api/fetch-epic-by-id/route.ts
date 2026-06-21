import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    const epicId = url.searchParams.get('epicId');

    if (projectId && epicId) {
      const endpointUrl = `rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`;
      const response = await fetchWithAuthServer(endpointUrl);
      return NextResponse.json({ response });
    }
  } catch (error) {
    throw error;
  }
}
