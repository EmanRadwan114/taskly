import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const epicId = url.searchParams.get('epicId');

    if (epicId) {
      const tasksEndpoint = `rest/v1/project_tasks?epic_id=eq.${epicId}&order=created_at.asc`;
      const response = await fetchWithAuthServer({ endpoint: tasksEndpoint });
      return NextResponse.json({ response });
    }
  } catch (error) {
    throw error;
  }
}
