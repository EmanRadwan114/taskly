import { fetchWithAuthServer } from '@/shared/utils/functions.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    const response = await fetchWithAuthServer(
      `rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
      true
    );

    return NextResponse.json({ response });
  } catch (error) {
    throw error;
  }
}
