import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    const taskId = url.searchParams.get('taskId');

    if (projectId && taskId) {
      const endpointUrl = `rest/v1/project_tasks?project_id=eq.${projectId}&id=eq.${taskId}`;
      const response = await fetchWithAuthServer({ endpoint: endpointUrl });
      return NextResponse.json({ response });
    }
  } catch (error) {
    throw error;
  }
}
