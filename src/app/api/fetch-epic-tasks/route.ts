import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const epicId = url.searchParams.get('epicId');

    const tasksEndpoint = `rest/v1/project_tasks?epic_id=eq.${epicId}`;

    const response = await fetchWithAuthServer(tasksEndpoint);

    return NextResponse.json({ response });
  } catch (error) {
    throw error;
  }
}
