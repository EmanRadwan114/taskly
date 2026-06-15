import { fetchWithAuthServer } from '@/shared/utils/functions.server.utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const endpointUrl = `auth/v1/user`;

    const response = await fetchWithAuthServer(endpointUrl);

    return NextResponse.json({ response });
  } catch (error) {
    throw error;
  }
}
