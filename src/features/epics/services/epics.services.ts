import {
  BASE_URL,
  FETCH_LIMIT,
  requestHeaders,
} from '@/shared/utils/variables.utils';
import { TEpicsInput } from '../validation/epics.validation';
import { IEpics } from '../types/epics.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';

// ^-------------------------Create new epic -------------------------//
export const createEpic = async ({
  data,
  accessToken,
  projectId,
}: {
  data: TEpicsInput;
  accessToken: string;
  projectId: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/epics`, {
      method: 'POST',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ ...data, project_id: projectId }),
    });

    if (response.status !== 201) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to create epic');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to create epic';
    throw new Error(errMsg);
  }
};
// ^-------------------------update epic -------------------------//
export const updateEpic = async ({
  data,
  accessToken,
  epicId,
}: {
  data: Partial<TEpicsInput>;
  accessToken: string;
  epicId: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/epics?id=eq.${epicId}`, {
      method: 'PATCH',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(data),
    });

    if (response.status !== 204) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to update epic');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to update epic';
    throw new Error(errMsg);
  }
};

// ^--------------------- fetch project epics ---------------------
export const fetchEpics = async ({
  limit = FETCH_LIMIT,
  offset = 0,
  projectId,
}: {
  limit: number;
  offset: number;
  projectId: string;
}): Promise<{ data: IEpics[]; meta: IMetaFetchedData }> => {
  try {
    const response = await fetch(
      `/api/fetch-epics?limit=${limit}&offset=${offset}&projectId=${projectId}`
    );

    if (response.status === 204)
      return { data: [], meta: { totalCount: 0, totalPages: 0 } };

    const result = await response.json();

    if (!response.ok)
      throw new Error(result?.message || 'Failed to fetch epics');

    return result?.response;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to fetch epics';
    throw new Error(errMsg);
  }
};
