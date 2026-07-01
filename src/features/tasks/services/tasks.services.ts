import { BASE_URL, requestHeaders } from '@/shared/utils/variables.utils';
import { TTaskInput } from '../validation/tasks.validation';

// ^ ------------------------- Create Task Service ------------------------- //
export const createTask = async ({
  data,
  accessToken,
}: {
  data: TTaskInput & { project_id: string };
  accessToken: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/tasks`, {
      method: 'POST',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(data),
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
// ^ ------------------------- Update Task Service ------------------------- //
export const updateTask = async ({
  data,
  accessToken,
  taskId,
}: {
  data: Partial<TTaskInput>;
  accessToken: string;
  taskId: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/rest/v1/tasks?id=eq.${taskId}`, {
      method: 'PATCH',
      headers: { ...requestHeaders, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(data),
    });

    if (response.status !== 204) {
      const result = await response.json();
      throw new Error(result?.message || 'Failed to update task');
    }
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : 'Failed to update task';
    throw new Error(errMsg);
  }
};
