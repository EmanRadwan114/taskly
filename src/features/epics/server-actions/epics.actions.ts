'use server';

import { cookies } from 'next/headers';
import { ACCESS_TOKEN_KEY } from '@/shared/utils/variables.utils';
import { revalidatePath } from 'next/cache';
import { createEpic } from '../services/epics.services';

// ^ ------------------------- Create Epic Action ------------------------- //
export const CreateEpicAction = async (
  projectId: string | undefined,
  _: unknown,
  formData: FormData
) => {
  // get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

  const values = {
    title: (formData.get('title') as string) || '',
    description: (formData.get('description') as string) || '',
    project_id: (formData.get('project_id') as string) || '',
    assignee_id: (formData.get('assignee_id') as string) || '',
    deadline: (formData.get('deadline') as string) || '',
  };

  try {
    if (!accessToken) return;

    if (values.title && values.project_id) {
      await createEpic({ data: values, accessToken });
      revalidatePath(`/project/${values.project_id}/epics`);
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
