'use server';

import { cookies } from 'next/headers';
import { ACCESS_TOKEN_KEY } from '@/shared/utils/variables.utils';
import { revalidatePath } from 'next/cache';
import { createEpic } from '../services/epics.services';

// ^ ------------------------- Create Epic Action ------------------------- //
export const createEpicAction = async (
  projectId: string | undefined,
  _: unknown,
  formData: FormData
) => {
  // get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const assignee_id = formData.get('assignee_id') as string;
  const deadline = formData.get('deadline') as string;

  const values: {
    title: string;
    description?: string;
    assignee_id?: string;
    deadline?: string;
  } = {
    title,
  };

  if (description) {
    values.description = description;
  }

  if (assignee_id) {
    values.assignee_id = assignee_id;
  }

  if (deadline) {
    values.deadline = deadline;
  }

  console.log(values, projectId);

  try {
    if (!accessToken) return;

    if (values.title && projectId) {
      await createEpic({ data: values, accessToken, projectId });
      revalidatePath(`/project/${projectId}/epics`);
      revalidatePath('/epics');
    }

    return {
      success: true,
      message: 'Epic created successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
