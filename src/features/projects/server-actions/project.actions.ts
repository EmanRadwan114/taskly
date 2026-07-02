'use server';

import { cookies } from 'next/headers';
import { createProject, updateProject } from '../services/project.services';
import { ACCESS_TOKEN_KEY } from '@/shared/utils/variables.utils';

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
    if (!accessToken) {
      return {
        success: false,
        message: 'Session expired, please login again.',
        status: 401,
      };
    }

    if (!isEditMode) {
      await createProject({ data: values, accessToken });
    } else {
      await updateProject({ data: values, accessToken, projectId });
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
