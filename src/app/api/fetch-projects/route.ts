import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';
import { FETCH_LIMIT } from '@/shared/utils/variables.utils';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const LIMIT = Number(url.searchParams.get('limit')) || FETCH_LIMIT;
    const OFFSET = Number(url.searchParams.get('offset')) || 0;

    const endpointUrl = `rest/v1/rpc/get_projects?limit=${LIMIT}&offset=${OFFSET}`;
    const response = await fetchWithAuthServer(endpointUrl);

    return NextResponse.json({ response });
  } catch (error) {
    throw error;
  }
}
