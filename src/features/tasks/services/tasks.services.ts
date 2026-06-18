import { BASE_URL, requestHeaders } from '@/shared/utils/variables.utils';
import { TTaskInput } from '../validation/tasks.validation';

// ^ ------------------------- Create Task Service ------------------------- //
export const createTask = async ({
  data,
  projectId,
  accessToken,
}: {
  data: TTaskInput;
  projectId: string;
  accessToken: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/tasks`, {
      method: 'POST',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({
        ...data,
        project_id: projectId,
      }),
    });

    if (response.status !== 201) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to create task');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to create task';
    throw new Error(errMsg);
  }
};
