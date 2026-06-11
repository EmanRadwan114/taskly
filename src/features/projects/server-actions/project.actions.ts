'use server';

import { cookies } from 'next/headers';
import { createProject, updateProject } from '../services/project.services';
import { ACCESS_TOKEN_KEY } from '@/shared/utils/variables.utils';
import { revalidatePath } from 'next/cache';

// ^ ------------------------- Create Project Action ------------------------- //
export const projectAction = async (
  projectId: string | undefined,
  _: unknown,
  formData: FormData
) => {
  // get access token
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;

  const isEditMode = !!projectId;

  const values = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
  };

  try {
    if (!accessToken) return;

    if (!isEditMode) {
      await createProject({ data: values, accessToken });
      revalidatePath('/project');
    } else {
      await updateProject({ data: values, accessToken, projectId });
      revalidatePath(`/project/${projectId}/epics`);
      revalidatePath(`/project`);
    }

    return {
      success: true,
      message: isEditMode
        ? 'Project updated successfully!'
        : 'Project created successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
};
