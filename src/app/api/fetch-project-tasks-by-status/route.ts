import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    const status = url.searchParams.get('status');

    if (projectId && status) {
      const tasksEndpoint = `rest/v1/project_tasks?project_id=eq.${projectId}&status=eq.${status}`;
      const response = await fetchWithAuthServer(tasksEndpoint);
      return NextResponse.json({ response });
    }
  } catch (error) {
    throw error;
  }
}
