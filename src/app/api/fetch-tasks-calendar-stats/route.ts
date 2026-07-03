import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const isPaginated = false;

    const endpointUrl = `rest/v1/rpc/get_tasks_calendar_stats`;

    const response = await fetchWithAuthServer({
      endpoint: endpointUrl,
      isPaginated,
      options: {
        method: 'POST',
        body: JSON.stringify(body),
      },
    });
    return NextResponse.json({ response });
  } catch (error) {
    throw error;
  }
}
