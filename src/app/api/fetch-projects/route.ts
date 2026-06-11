import { fetchWithAuthServer } from '@/shared/utils/functions.utils';
import { NextResponse } from 'next/server';

// endpoint to fetch projects & project by id
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    const endpointUrl = `rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`;

    const isPaginated = true;

    const response = await fetchWithAuthServer(endpointUrl, isPaginated);

    return NextResponse.json({ response });
  } catch (error) {
    throw error;
  }
}
