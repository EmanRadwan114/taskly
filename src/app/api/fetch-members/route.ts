import { fetchWithAuthServer } from '@/shared/utils/functions.utils';
import { NextResponse } from 'next/server';

// endpoint to fetch projects & project by id
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('project_id');

    const endpointUrl = `rest/v1/get_project_members?project_id=eq.${projectId}`;

    const isPaginated = false;

    const response = await fetchWithAuthServer(endpointUrl, isPaginated);

    return NextResponse.json({ response });
  } catch (error) {
    throw error;
  }
}
