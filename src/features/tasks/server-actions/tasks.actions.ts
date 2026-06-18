'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN_KEY } from '@/shared/utils/variables.utils';
import { createTask } from '../services/tasks.services';
import { TTaskInput } from '../validation/tasks.validation';
import { TaskStatusEnum } from '../types/tasks.types';

// ^ ------------------------- Create Task Action ------------------------- //
export const createTaskAction = async (
  projectId: string,
  _: unknown,
  formData: FormData
) => {
  // get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

  if (!accessToken || !projectId) {
    return {
      success: false,
      message: 'Something went wrong. Please try again later.',
    };
  }

  // form values
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as string;
  const assignee_id = formData.get('assignee_id') as string;
  const due_date = formData.get('due_date') as string;
  const epic_id = formData.get('epic_id') as string;

  const values: TTaskInput & { project_id: string } = {
    title,
    project_id: projectId,
    status: (status as TaskStatusEnum) || TaskStatusEnum.TODO,
    assignee_id: assignee_id || null,
    epic_id: epic_id || null,
  };

  if (description) values.description = description;
  if (due_date) values.due_date = due_date;

  try {
    await createTask({
      data: values,
      accessToken,
    });
    revalidatePath(`/project/${projectId}/tasks`);

    return {
      success: true,
      message: 'Task created successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
