import { BASE_URL, requestHeaders } from '@/shared/utils/variables.utils';
import { TProjectInput } from '../validation/project.validation';
import { IProject } from '../types/project.types';
import { IMetaFetchedData } from '@/shared/types/shared.types';

// ^------------------------ create project -------------------------
export const createProject = async ({
  data,
  accessToken,
}: {
  data: TProjectInput;
  accessToken: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/projects`, {
      method: 'POST',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(data),
    });

    if (response.status !== 201) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to create project');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to create project';
    throw new Error(errMsg);
  }
};
// ^------------------------ update project -------------------------
export const updateProject = async ({
  data,
  accessToken,
  projectId,
}: {
  data: TProjectInput;
  accessToken: string;
  projectId: string;
}) => {
  try {
    const response = await fetch(
      `${BASE_URL}/rest/v1/projects?id=eq.${projectId}`,
      {
        method: 'PATCH',
        headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(data),
      }
    );

    if (response.status !== 204) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to update project');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to update project';
    throw new Error(errMsg);
  }
};

// ^--------------------- fetch paginated projects ---------------------
export const fetchPaginatedProjects = async ({
  limit,
  offset,
}: {
  limit?: number;
  offset?: number;
}): Promise<{ response: { data: IProject[]; meta: IMetaFetchedData } }> => {
  try {
    const response = await fetch(
      `/api/fetch-projects?limit=${limit}&offset=${offset}`
    );

    const result = await response.json();
    if (response.status !== 200) {
      throw new Error(result?.message || 'Failed to fetch projects');
    }

    return result;
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to fetch projects';
    throw new Error(errMsg);
  }
};
