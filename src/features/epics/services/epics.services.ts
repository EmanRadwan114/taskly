import {
  BASE_URL,
  FETCH_LIMIT,
  requestHeaders,
} from '@/shared/utils/variables.utils';
import { TEpicsInput } from '../validation/epics.validation';
import { IEpics } from '../types/epics.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';
import { ITask } from '@/features/tasks/types/tasks.types';

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

// ^--------------------- fetch paginated project epics ---------------------
export const fetchPaginatedEpics = async ({
  limit,
  offset,
  projectId,
  searchTerm,
}: {
  limit?: number;
  offset?: number;
  projectId: string;
  searchTerm?: string;
}): Promise<{ response: { data: IEpics[]; meta: IMetaFetchedData } }> => {
  try {
    const response = await fetch(
      `/api/fetch-epics-with-pagination?limit=${limit}&offset=${offset}&projectId=${projectId}&searchTerm=${searchTerm}`
    );

    const result = await response.json();
    if (response.status !== 200) {
      throw new Error(result?.message || 'Failed to fetch epics');
    }

    return result;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to fetch epics';
    throw new Error(errMsg);
  }
};
// ^--------------------- fetch all project epics ---------------------
export const fetchAllEpics = async ({
  projectId,
}: {
  projectId: string;
}): Promise<{ response: { data: IEpics[]; meta: IMetaFetchedData } }> => {
  try {
    const response = await fetch(`/api/fetch-all-epics?projectId=${projectId}`);

    const result = await response.json();
    if (response.status !== 200) {
      throw new Error(result?.message || 'Failed to fetch epics');
    }

    return result;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to fetch epics';
    throw new Error(errMsg);
  }
};

// ^--------------------- fetch Epic by Id ---------------------
export const fetchEpicById = async ({
  projectId,
  epicId,
}: {
  projectId: string;
  epicId: string;
}): Promise<{ response: { data: IEpics[]; meta: IMetaFetchedData } }> => {
  try {
    const response = await fetch(
      `/api/fetch-epic-by-id?projectId=${projectId}&epicId=${epicId}`
    );

    const result = await response.json();
    if (response.status !== 200) {
      throw new Error(result?.message || 'Failed to fetch epic');
    }

    return result;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to fetch epic';
    throw new Error(errMsg);
  }
};

// ^--------------------- fetch Epic tasks ---------------------
export const fetchEpicTasks = async ({
  epicId,
}: {
  epicId: string;
}): Promise<{ response: { data: ITask[]; meta: IMetaFetchedData } }> => {
  try {
    const response = await fetch(`/api/fetch-epic-tasks?epicId=${epicId}`);

    const result = await response.json();
    if (response.status !== 200) {
      throw new Error(result?.message || 'Failed to fetch epic tasks');
    }

    return result;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to fetch epic tasks';
    throw new Error(errMsg);
  }
};
