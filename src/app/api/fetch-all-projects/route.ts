import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const endpointUrl = `rest/v1/rpc/get_projects`;
    const response = await fetchWithAuthServer({ endpoint: endpointUrl });
    return NextResponse.json({ response });
  } catch (error) {
    throw error;
  }
}
